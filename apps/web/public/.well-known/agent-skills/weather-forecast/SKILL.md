# Weather Forecast Skill

Get weather forecast for a specific SEU campus.

## Endpoint

```
GET /api/weather/{campusId}
```

## Parameters

| Parameter | Type | Required | Values |
|---|---|---|---|
| campusId | string | yes | `jiulonghu`, `sipailou`, `dingjiaqiao` |

## Response

Returns JSON with hourly weather data including skycon (weather condition) icons and a human-readable description.

## Example

```bash
curl https://chargers.dpdns.org/api/weather/jiulonghu
```
