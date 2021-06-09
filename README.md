# Aggregation-visualizer
This repository holds an API and a web application to visualize data aggregated by a configurable column

# Configuration
##### Configure API
Setup `enviorment variables`, fetched in the `Api/config.py`
```bash
export DB_PATH=<sqlite-db-path> # required
export TABLE_NAME=<SQL-table-name> # defaulted to `census_learn_sql`
export AGG_COLUMN=<column-to-agg-by> # defualted to `age`
```

##### Configure frontend server
Setup proxy:
Configure `proxy` in `frontend/package.json` to point to the API, defaulted to `localhost:5000/api`

# Run
##### run API

```bash
export FLASK_APP=app
pip install -r Api/requirements.txt
cd Api && python -m flask run
```
##### run frontend server

```bash
cd frontend
npm install
npm start
```
# Test
##### run frontend unit & snapshot tests

```
cd frontend
npm install --save-dev
npm test
```
