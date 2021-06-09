from flask_restx import Namespace, Resource
from flask.wrappers import Response

from .service import AggService

api = Namespace('aggregator_api', description='Api to aggregate agg_column by a given column and a given value')

@api.route('/<string:column>/aggregations')
@api.param('column', 'column to group by')
class AggMapping(Resource):
    """
    A class to handle aggregation http requests

    Resquest Parameters
    ----------
    column: string
        column to group by

    Methods
    -------
    get(column):
        fetchs data gourped by column and aggregated by config.agg_column 
    """
    def get(self, column: str) -> Response:
        return AggService.get_column_aggregations(column)


@api.route('/columns')
class ColumnsMapping(Resource):
    """
    A class to handle candidate group by columns http requests

    Attributes
    ----------
    None

    Methods
    -------
    get():
        fetchs all candidate group by columns ( i.e columns expect config.agg_column )
    """
    def get(self) -> Response:
        return AggService.get_agg_columns()