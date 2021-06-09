# base route to access common crud operations
BASE_ROUTE = "describe"

def register_routes(api, app, root="api"):
	from .controller import api as describe_api
	api.add_namespace(describe_api, path=f"/{root}/{BASE_ROUTE}")