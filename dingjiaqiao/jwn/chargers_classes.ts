import * as T_types from "./chargers_types.ts";
import { jinWeiNiaoGetBaseInfo, jinWeiNiaoGetChargerStatus } from "./jwn.ts";

// 结果缓存有效期，单位秒
const RESULT_CACHE_TTL: number = 60;
// 结果更新时间限制，单位秒
const RESULT_UPDATE_TIMEOUT: number = 10;

export class C_charger {
  public base_info: T_types.T_base_info;
  private in_status: T_types.T_charger | null = null;
  private update_id: number = Math.random();
  public name: string | null = null;

  constructor(base_info: T_types.T_base_info) {
    this.base_info = base_info;
    this.name = base_info.name ?? null;
  }

  public async init(ck?: string | null, pid?: string | number | null) {
    const true_ck: string | null = ck ?? this.base_info.ck;
    const true_pid: string | number | null | undefined = pid ??
        this.base_info.pid;

    if (true_ck == null) {
      throw "ck is null!";
    }

    this.base_info = await jinWeiNiaoGetBaseInfo(true_ck, true_pid);
    this.in_status = null;
  }

  public is_inited() {
    if (
        this.base_info.devType == null || this.base_info.devType == null ||
        this.base_info.sn == null
    ) {
      return false;
    } else {
      return true;
    }
  }

  public async update() {
    if (
        this.base_info.devType == null || this.base_info.devType == null ||
        this.base_info.sn == null
    ) {
      throw "please init this charger before updating!";
    }
    const update_id = Math.random();
    this.update_id = update_id;

    const new_in_status = await jinWeiNiaoGetChargerStatus(
        this.base_info,
        this.base_info.name,
    );
    if (update_id === this.update_id) {
      this.in_status = new_in_status;
    }
    return this.in_status?.available_count ?? 0;
  }

  public get_status() {
    if (this.in_status == null) {
      throw "please update this charger before get status!";
    } else {
      return this.in_status;
    }
  }
}

export class C_station {
  public name: string;
  public description: string | null | undefined = null;
  public location_lat: number | null | undefined;
  public location_lon: number | null | undefined;
  public chargers: Array<C_charger> = [];
  public available_count: number = 0;
  public total_count: number = 0;

  constructor(
      name: string,
      description: string | null,
      chargers: Array<
          C_charger | T_types.T_base_info
      >,
      location_lat?: number | null,
      location_lon?: number | null,
  ) {
    this.name = name;
    this.description = description;
    this.location_lat = location_lat;
    this.location_lon = location_lon;

    for (const charger in chargers) {
      let new_charger: C_charger | null = null;

      if (chargers[charger] instanceof C_charger) {
        new_charger = chargers[charger];
      } else {
        new_charger = new C_charger(chargers[charger]);
      }

      if (new_charger == null) {
        throw "Unknown input type (2)";
      }

      this.chargers.push(new_charger);
    }
  }

  public async init(full?: boolean) {
    for (const charger in this.chargers) {
      const new_charger = this.chargers[charger];
      if (full || !new_charger.is_inited()) {
        try {
          await new_charger.init();
        } catch {
          console.log(
              `Charger(ck:${new_charger.base_info.ck}) init failed.`,
          );
        }
      }
    }
  }

  public async update(): Promise<
      { available_count: number; total_count: number }
  > {
    const update_promise_array: Array<Promise<number>> = [];
    for (const charger in this.chargers) {
      update_promise_array.push(this.chargers[charger].update());
    }
    let available_count = 0;
    let total_count = 0;
    await Promise.all(update_promise_array).then((values) => {
      for (const i in values) {
        available_count += values[i];
        total_count += 10;
      }
    });
    this.available_count = available_count;
    this.total_count = total_count;
    return { available_count: available_count, total_count: total_count };
  }

  public get_status() {
    return {
      name: this.name,
      description: this.description,
      available_count: this.available_count,
      total_count: this.chargers.length,
      chargers: this.chargers.map((charger) => charger.get_status()),
    } as T_types.T_station;
  }
}

export class C_result {
  public last_update_time: number | null = null;
  public code: number | null = null;
  public tips?: Array<T_types.T_tip> = [];
  public stations: Array<C_station> = [];
  public available_count: number = 0;
  public total_count: number = 0;

  private last_update_start_time: number | null = null;

  constructor(
      stations_c: Array<T_types.T_station_c | C_station>,
      tips?: Array<T_types.T_tip>,
  ) {
    this.tips = tips;
    for (const station of stations_c) {
      if (station instanceof C_station) {
        this.stations.push(station);
      } else {
        this.stations.push(
            new C_station(
                station.name,
                station.description ?? null,
                station.chargers,
                station.location_lat,
                station.location_lon,
            ),
        );
      }
    }
  }

  public init(full?: boolean) {
    for (const station of this.stations) {
      station.init(full);
    }
  }

  public async update(): Promise<
      { available_count: number; total_count: number }
  > {
    const update_promise_array: Array<
        Promise<{ available_count: number; total_count: number }>
    > = [];
    const last_update_start_time = new Date().getDate();

    this.last_update_start_time = last_update_start_time;

    for (const station of this.stations) {
      update_promise_array.push(station.update());
    }

    let available_count = 0;
    let total_count = 0;

    await Promise.all(update_promise_array).then(
        (values: Array<{ available_count: number; total_count: number }>) => {
          for (const i in values) {
            available_count += values[i].available_count;
            total_count += values[i].total_count;
          }
        },
    );

    if (this.last_update_start_time === last_update_start_time) {
      this.last_update_time = new Date().getTime();
      this.available_count = available_count;
      this.total_count = total_count;
    }

    return {
      available_count: this.available_count,
      total_count: this.total_count,
    };
  }

  public get_status() {
    if (this.last_update_time == null) {
      return {
        code: 500,
        tips: this.tips,
        last_update_time: 0,
        available_count: 0,
        total_count: 0,
        status: [],
      } as T_types.T_result;
    } else {
      return {
        code: 200,
        tips: this.tips,
        last_update_time: this.last_update_time,
        available_count: this.available_count,
        total_count: this.total_count,
        status: this.stations.map((station) => station.get_status()),
      } as T_types.T_result;
    }
  }

  public async smart_update_get_status(): Promise<T_types.T_result> {
    if (
        // 存在有效期内结果 -> 直接返回结果
        this.last_update_time != null &&
        new Date().getTime() - this.last_update_time < RESULT_CACHE_TTL * 1000
    ) {
      return this.get_status();
    } else if (
        // 不存在结果，或结果过期 且并不是正在更新 -> 更新
        (this.last_update_time == null) ||
        (this.last_update_start_time != null &&
            new Date().getTime() - this.last_update_start_time >
            RESULT_UPDATE_TIMEOUT * 1000)
    ) {
      // 更新时需要注意超时问题
      return await Promise.race([
        (async () => {
          await this.update();
          return this.get_status();
        })(),
        new Promise<T_types.T_result>((resolve, _) => {
          setTimeout(() => {
            resolve({
              code: 502,
              fault_info: "服务器超时 (RESULT_UPDATE_TIMEOUT)",
              tips: this.tips,
              last_update_time: 0,
              available_count: 0,
              total_count: 0,
              status: [],
            } as T_types.T_result);
          }, RESULT_UPDATE_TIMEOUT * 1000);
        }),
      ]);
    } else {
      // 如果以上情况都不符合，一般是另一个更新正在运行，要等更新完成
      let is_finished = false;
      return await Promise.race([
        (async () => {
          while (!is_finished) {
            await new Promise((resolve, _) => {
              setTimeout(() => {
                if (
                    this.last_update_time != null &&
                    new Date().getTime() - this.last_update_time <
                    RESULT_CACHE_TTL * 1000
                ) {
                  is_finished = true;
                }
                resolve(null);
              }, 100); // 每0.1s检查一下是否完成更新了
            });
          }
          return this.get_status();
        })(),
        // 下面是超时部分
        new Promise<T_types.T_result>((resolve, _) => {
          setTimeout(
              () => {
                is_finished = true;
                resolve({
                  code: 501,
                  fault_info: "服务器超时 (RESULT_WAIT_TIMEOUT)",
                  tips: this.tips,
                  last_update_time: 0,
                  status: [],
                  available_count: 0,
                  total_count: 0,
                } as T_types.T_result);
              },
              RESULT_UPDATE_TIMEOUT * 1000 +
              (this.last_update_start_time ?? new Date().getTime()) -
              new Date().getTime(),
          );
        }),
      ]);
    }
  }
}
