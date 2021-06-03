from flask import current_app
from typing import List

from ..db import get_db

def get_rows_by_value(column, value) -> List[str]:
    """Queries db to get data matching a given value of a given column"""
    config = current_app.config

    table_name = config['TABLE_NAME']
    db = get_db()

    columns = db.execute(
        f"SELECT * FROM {table_name} WHERE `{column}`='{value}' LIMIT 100"
    )

    # fetch column names / ( can be added to config for small system enhancement ) 
    column_names = [col_name for col_name,*_ in columns.description]
    columns_values = columns.fetchall() # TODO add error handeling
    # Raise exception if len(columns) == 0

    return _format_columns_by_name(column_names, columns_values)


def _format_columns_by_name(column_names, columns_values):                      # TODO move this to utils
    """helper function to format column names into a cursor.fetchall() result"""
    return [
            { name: value for name, value in zip(column_names, column_values) } 
            for column_values in columns_values
        ]
