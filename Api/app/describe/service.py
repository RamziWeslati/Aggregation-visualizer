from typing import List

from .repository import get_rows_by_value

class DescribeService:
    @staticmethod
    def get_rows_by_value(column: str, value: str) -> List[str]:
        aggregations = get_rows_by_value(column, value)
        return aggregations