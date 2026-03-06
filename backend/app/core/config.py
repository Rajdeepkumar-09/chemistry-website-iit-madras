# backend/app/core/config.py
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-secret-key-change-me')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True
    # The 'or' guarantees that if DATABASE_URL is missing or blank, it uses SQLite
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///chemistry_local.db'

class ProductionConfig(Config):
    DEBUG = False
    # In production, you'd use a live database URL
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URL')

# A dictionary to easily grab the right config
config_by_name = dict(
    dev=DevelopmentConfig,
    prod=ProductionConfig
)