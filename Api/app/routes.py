def register_routes(api, app, root="api"):
	"""registers route with the api"""
	from .aggregate import register_routes as attach_aggregator
	from .describe import register_routes as attach_describer

	#Add routes
	attach_aggregator(api, app, root)
	attach_describer(api, app, root)