import collections
from flask import current_app
from typing import List

from .repository import get_column_grouped_aggregations, get_agg_columns

class AggService:
    @staticmethod
    def get_column_aggregations(column: str) -> List[str]:
        config = current_app.config
        aggregations = get_column_grouped_aggregations(column, config['AGG_COLUMN'])
        return _format_aggregations(aggregations)

    @staticmethod
    def get_agg_columns() -> List[str]:
        config = current_app.config
        columns = get_agg_columns(config['AGG_COLUMN'])
        return [col for col, in columns]
    
def _format_aggregations(aggregations):
    """helper function to format data aggregated by config.agg_column"""
    config = current_app.config

    return [{
        'value': value,
        'count': count,
        'average ' + config['AGG_COLUMN']: avg
    } for value, avg, count in aggregations]