from flask import current_app
from typing import List

from ..db import get_db

def get_column_grouped_aggregations(column: str, agg_column: str) -> List[str]:
    """Queries db to get data matching a given value of a given column"""
    config = current_app.config

    table_name = config['TABLE_NAME']
    db = get_db()

    # SQL AVG ignores NULL values
    aggregations = db.execute(f"""SELECT `{column}`, AVG({agg_column}) , COUNT(*)
                                FROM {table_name}
                                WHERE `{column}` IS NOT NULL
                                GROUP BY `{column}`"""
                        ).fetchall()

    return aggregations

def get_agg_columns(agg_column) -> List[str]:
    config = current_app.config

    table_name = config['TABLE_NAME']
    db = get_db()
    columns = db.execute(f"""
                        SELECT name
                        FROM pragma_table_info('{table_name}')
                        WHERE name <> '{agg_column}'
                        """).fetchall() # TODO add error handeling
    # Raise exception if len(columns) == 0
    return columns