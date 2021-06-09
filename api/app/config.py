import os
from typing import List, Type

class MissingConfig(Exception):
    """custom exception to handle missing required config"""
    pass

agg_column = os.environ.get('AGG_COLUMN', None)
db_path = os.environ.get('DB_PATH', None)
table_name = os.environ.get('TABLE_NAME', None)

# check required config
if db_path is None:
    raise MissingConfig('Missing DB_PATH env var, must provide sqlite database path')

if agg_column is None:
    print('Missing AGG_COLUMN env var, defaulting to `age`')
    agg_column = 'age'

if table_name is None:
    print('Missing TABLE_NAME env var, defaulting to `census_learn_sql`')
    table_name = 'census_learn_sql'

# define configuration classes

class BaseConfig:
    """common configuration having:
        - APP_TITLE: string
            application title to be registered in application factory
        - AGG_COLUMN: string
            column to aggregate, current aggregation ( count / average)
        - DB_PATH: string
            path to sqlite database holding the data
        - TABLE_NAME: string
            sql table to group by and aggregated on
    """
    CONFIG_NAME = "base"
    APP_TITLE = 'Aggregator'
    AGG_COLUMN= agg_column
    DB_PATH = db_path
    TABLE_NAME = table_name # TODO only define this in dev & prod


class DevelopmentConfig(BaseConfig):
    CONFIG_NAME = "dev"
    VERSION = 'dev'

class TestingConfig(BaseConfig):
    CONFIG_NAME = "test"
    VERSION = 'test'

class ProductionConfig(BaseConfig):
    CONFIG_NAME = "prod"
    VERSION = '0.1.0'

EXPORT_CONFIGS: List[Type[BaseConfig]] = [
    DevelopmentConfig,
    TestingConfig,
    ProductionConfig,
]

# imported in application factory
config_by_name = {cfg.CONFIG_NAME: cfg for cfg in EXPORT_CONFIGS}