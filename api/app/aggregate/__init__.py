# base route to access common aggregation operations
BASE_ROUTE = "agg"

def register_routes(api, app, root="api"):
	from .controller import api as aggregator_api
	api.add_namespace(aggregator_api, path=f"/{root}/{BASE_ROUTE}")