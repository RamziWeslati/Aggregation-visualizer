from flask import request
from flask_restx import Namespace, Resource
from flask.wrappers import Response

from .service import DescribeService

api = Namespace('describe_api', description='Api to describe data and fetch high level information')

@api.route("/values")
class ColumnMapping(Resource):
    """
    A class to handle by column value select http requests

    Attributes
    ----------
    None

    Methods
    -------
    get():
        fetchs data matching a given value of a given column
    """
    def get(self) -> Response:
        """
        fetchs data matching a given value of a given column

        Request Parameters
        ----------
        column: string
            column to match data on
        value
            value to check data against

        Returns
        -------
        Respone[List[dict]]: 
        """
        column = request.args.get('column')
        value = request.args.get('value')
        # TODO validate request params
        return DescribeService.get_rows_by_value(column, value)