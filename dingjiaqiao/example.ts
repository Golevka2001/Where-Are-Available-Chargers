import {C_result} from "./jwn/chargers_classes";
import {djq2v5} from './converter';
import station_c_list from './djq_stations_list';

// 构造 C_result
const result_obj = new C_result(station_c_list)

// init 可以省略，因为 station_c_list 已经把所需参数全部 init 过了。
await result_obj.init()

// 获取最新的数据
const result = await result_obj.smart_update_get_status()
console.log(result)

// 如果需要转换为 v5 的格式，则需要用下面的转换器
console.log(djq2v5(result))
