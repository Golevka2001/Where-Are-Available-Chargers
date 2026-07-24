# Campus List Skill

List all available SEU campuses and their IDs.

## Endpoint

```
GET /api/campuses
```

## Response

Returns JSON with a `campuses` array. Each entry has `id` (string) and `name` (Chinese name).

## Example

```bash
curl https://chargers.dpdns.org/api/campuses
```
