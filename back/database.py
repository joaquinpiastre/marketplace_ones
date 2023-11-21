from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

USER_DB = "postgres"
PASS_DB = "125250500"
URL_DB = "localhost"
NAME_DB = "Marketplace"
FULL_URL_DB = f"postgresql://{USER_DB}:{PASS_DB}@{URL_DB}/{NAME_DB}"