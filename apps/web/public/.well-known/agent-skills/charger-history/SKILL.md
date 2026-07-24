# Charger History Skill

Query historical charger usage data with configurable time ranges.

## Endpoint

```
GET /api/history/{campusId}?range=24h
```

## Parameters

| Parameter | Type | Required | Values |
|---|---|---|---|
| campusId | string | yes | `jiulonghu`, `sipailou`, `dingjiaqiao` |
| range | string | no | `1h`, `6h`, `24h` (default), `7d` |
| start | integer | no | Custom start time (Unix ms, requires `end`) |
| end | integer | no | Custom end time (Unix ms, requires `start`) |

## Response

Returns JSON with a `data` array of timestamped snapshots containing `total_count`, `available_count`, and `fault_count`.

## Example

```bash
curl "https://chargers.dpdns.org/api/history/sipailou?range=6h"
```
