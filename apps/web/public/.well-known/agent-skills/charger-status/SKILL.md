# Charger Status Skill

Query real-time EV charger socket status for Southeast University campuses.

## Endpoint

```
GET /api/get_status/{campusId}
```

## Parameters

| Parameter | Type | Required | Values |
|---|---|---|---|
| campusId | string | yes | `jiulonghu`, `sipailou`, `dingjiaqiao` |

## Response

Returns JSON with `total_count`, `available_count`, and per-station `chargers` array where each socket is `0` (free), `1` (in use), or `2` (fault).

## Example

```bash
curl https://chargers.dpdns.org/api/get_status/sipailou
```
