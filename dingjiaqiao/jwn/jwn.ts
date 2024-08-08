import {
    socket_status,
    T_base_info,
    T_charger,
    T_socket,
} from './chargers_types.ts';

const base_req_headers = {
    'Accept-Language': 'zh-CN, en-US',
    'User-Agent':
        'Mozilla/5.0 (Linux; Android 14; PGT-AN00 Build/HONORPGT-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.120 Mobile Safari/537.36 XWEB/1220099 MMWEBSDK/20240404 MMWEBID/4975 MicroMessenger/8.0.49.2600(0x2800315A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
};

/**
 * 将网页链接中的 ck/pid 参数转换为请求金维鸟 API 的 gpsId/sn/devType 参数。
 * 返回一个 T_base_info 。请注意此函数不保证转换成功，亦未处理异常情况。
 *
 * @param {string} ck 链接中的 ck 参数。
 * @param {string} [pid] 链接中的 pid 参数，可选，但不保证此参数为空时可以转换成功。
 * @returns {T_base_info}
 */
export async function jinWeiNiaoGetBaseInfo(
    ck: string,
    pid: string | number | null = null,
): Promise<T_base_info> {
    return await fetch(
        `http://wx.jwnzn.com/njjwn/parseck.action?ck=${ck}${
            pid == null ? '' : '&pid=' + String(pid)
        }` +
        {
            headers: base_req_headers,
        },
    ).then((rsp) => rsp.text())
        .then((rsptext) => {
            const rsp_raw_name = (rsptext.replaceAll(/\r?\n|(?<!\n)\r/g, '').match(
                /<div class="payment-top-left">\s*<div>(.+?)<\/div>/,
            ) ?? [])[1];
            const rsp_devType = (rsptext.match(/devType:\s?"?(\d+)"?/) ?? [])[1];
            const rsp_pid = (rsptext.match(/pid:\s?"?(\d+)"?/) ?? [])[1];
            const rsp_sn = (rsptext.match(/sn:\s?"?(\d+)"?/) ?? [])[1];
            const rsp_gpsId = (rsptext.match(/gpsId:\s?"?(\d+)"?/) ?? [])[1];

            return {
                raw_name: rsp_raw_name,
                sn: rsp_sn,
                ck: ck,
                gpsId: rsp_gpsId,
                devType: rsp_devType,
                pid: (rsp_pid == null ? undefined : pid),
            } as T_base_info;
        });
}

/**
 * 将一个网页链接（string or URL）转换 ck pid。
 * 返回一个 T_base_info 。请注意此函数不保证转换成功，亦未处理异常情况。
 *
 * @param {string | URL} link 链接。 e.g. `http://wx.jwnzn.com/njjwn/parseck.action?ck=073514e00000&pid=27`
 * @returns {Object{ck: string, pid?: string | number | null}}
 */
export function jinWeiNiaoGeParamsFromLink(
    link: string | URL,
) {
    const jwnURL: URL = (link instanceof URL) ? link : new URL(link);
    const jwnURLSearchParams = jwnURL.searchParams;
    const ck: string | null = jwnURLSearchParams.get('ck');
    const pid: string | number | null = jwnURLSearchParams.get('pid');

    if (ck == null) {
        throw 'CK is null.';
    }

    return { ck: ck, pid: pid ?? undefined } as T_base_info;
}

/**
 * 获取充电桩（有10个插座的那种）的实时情况。返回 T_charger
 *
 * @param jwn_baseinfo 充电桩的基本信息。
 * @param {string} [name] 充电桩的友好名称 - 可选，建议传递 “1号桩” 一类的简名。
 * @param {number} [timeout] 时间限制 - 0表示不限制，单位秒。默认8s。
 * @returns {T_charger}
 */
export async function jinWeiNiaoGetChargerStatus(
    jwn_baseinfo: T_base_info | undefined | null,
    name: string | null | undefined = undefined,
    timeout: number = 8,
): Promise<T_charger> {
    if (jwn_baseinfo == null) {
        throw 'JWN Baseinfo: null or undefind';
    }

    if (
        jwn_baseinfo.gpsId == null || jwn_baseinfo.devType == null ||
        jwn_baseinfo.sn == null
    ) {
        return {
            ck: jwn_baseinfo.ck,
            pid: jwn_baseinfo.pid,
            raw_name: null,
            name: name,
            fault_info: '更新状态失败 (INIT_NULL_ERR)',
            available_count: 0,
            sockets: [],
        } as T_charger;
    }

    const status_api_endpoint =
        'http://wx.jwnzn.com/njjwn/eleProductList.action?queryValue=' +
        encodeURIComponent(
            `gpsId:${jwn_baseinfo.gpsId};devType:${jwn_baseinfo.devType};sn:${jwn_baseinfo.sn};`,
        );

    const this_header = {};
    Object.assign(this_header, base_req_headers);

    // 这里原本有一段获取 JSESSION 的逻辑，后来发现可能用不上

    const api_fetch_promise = fetch(
        status_api_endpoint,
        {
            headers: this_header,
        },
    ).then((rsp) => rsp.json()).then((rspObj) => {
        if (rspObj?.code != null) {
            return {
                ck: jwn_baseinfo.ck,
                pid: jwn_baseinfo.pid,
                raw_name: jwn_baseinfo.raw_name,
                name: name,
                fault_info: '更新状态失败 (RSP_CODE_ERR)',
                available_count: 0,
                sockets: [],
            } as T_charger;
        } else {
            const this_charger: T_charger = {
                ck: jwn_baseinfo.ck,
                pid: jwn_baseinfo.pid,
                raw_name: jwn_baseinfo.raw_name ?? null,
                name: name,
                fault_info: null,
                available_count: 0,
                sockets: [],
            };
            for (const socket in rspObj.list) {
                const this_socket_raw = rspObj.list[socket];
                if (
                    this_socket_raw?.statusId === 0 || this_socket_raw?.statusId === '0' // 空闲
                ) {
                    ++this_charger.available_count;
                    this_charger.sockets.push({
                        status: socket_status.free,
                        end_timestamp: null,
                    } as T_socket);
                } else if (
                    this_socket_raw?.statusId === 1 || this_socket_raw?.statusId === '1' // 工作
                ) {
                    this_charger.sockets.push({
                        status: socket_status.busy,
                        end_timestamp: isNaN(parseInt(this_socket_raw?.endTime))
                            ? null
                            : new Date().getTime() + parseInt(this_socket_raw?.endTime),
                        // 服务端返回的 endTime 是一个毫秒为单位的剩余时间，但是没有基准时间。
                        // 因此做一个本地计算。
                    } as T_socket);
                } else { // 故障
                    this_charger.sockets.push({
                        status: socket_status.fault,
                        end_timestamp: null,
                    } as T_socket);
                }
            }
            return this_charger;
        }
    })
        .catch((_) => {
            return {
                ck: jwn_baseinfo.ck,
                pid: jwn_baseinfo.pid,
                raw_name: jwn_baseinfo.raw_name,
                name: name,
                fault_info: '更新状态失败 (FETCH_ERROR)',
                available_count: 0,
                sockets: [],
            } as T_charger;
        });

    if (timeout <= 0) {
        return await api_fetch_promise;
    } else {
        return await Promise.race([
            api_fetch_promise,
            new Promise<T_charger>((resolve, _) => {
                setTimeout(() => {
                    resolve({
                        ck: jwn_baseinfo.ck,
                        pid: jwn_baseinfo.pid,
                        raw_name: jwn_baseinfo.raw_name,
                        name: name,
                        fault_info: '更新状态失败 (FETCH_TIMEOUT)',
                        available_count: 0,
                        sockets: [],
                    } as T_charger);
                }, timeout * 1000);
            }),
        ]);
    }
}
