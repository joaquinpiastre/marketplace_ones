from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from resources.buy import Buy, Buys
from database import db, FULL_URL_DB
from resources.auth.routes import auth
from flask_restful import Api
from resources.Product import Products_resource, Product_resource
from resources.User import User_List



app = Flask(__name__) 
api = Api(app)
CORS(app)  

app.config['SQLALCHEMY_DATABASE_URI'] = FULL_URL_DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#inicializar db
db.init_app(app)


# configurar flask migrate 
migrate= Migrate()
migrate.init_app(app, db)

app.register_blueprint(auth) # Blueprint

api.add_resource(Products_resource, '/products') #Resource
api.add_resource(Product_resource, '/product/<int:productId>') #Resource
api.add_resource(User_List, '/users') #Resource
api.add_resource(Buys, '/buys') #Resource
api.add_resource(Buy, '/buy/<int:id>') #Resource





if __name__ == '__main__':
    app.run(debug=True)