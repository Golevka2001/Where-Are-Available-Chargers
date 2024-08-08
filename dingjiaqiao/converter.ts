import { T_result } from './jwn/chargers_types';

export function djq2v5(djq: T_result) {
    const result = {
        code: djq.code,
        last_update_time: djq.last_update_time,
        status: {
            available_count: djq.available_count,
            total_count: djq.total_count,
            stations: []
        }
    }

    for(const station of djq.status){
        const chargers_status = []
        for (const charger of station.chargers) {
            const socket_status = []
            for (const socket of charger.sockets) {
                socket_status.push(socket.status)
            }
            chargers_status.push({
                name: charger.name,
                fault_info: charger.fault_info,
                available_count: charger.available_count,
                sockets: socket_status,
            })
        }
        result.status.stations.push({
            name: station.name,
            description: station.description,
            available_count: station.available_count,
            total_count: station.total_count,
            chargers: chargers_status,
        })
    }

    return result;
}
