from flask_restful import Resource
from flask import request, jsonify
from database import db
from models.Product import Product


class Products_resource(Resource):
    
    def post(self):
        name = request.json['name']
        price = request.json['price']
        stock = request.json['stock']
        description = request.json['description']
        
        product = Product(name=name, price=price, stock=stock, description=description)
        
        db.session.add(product)
        db.session.commit()
        return jsonify({'Mensaje': 'Producto creado correctamente'})
        
    #este get es para obtener todos los productos
    def get(self):
        products = db.session.query(Product).all()
        print('Product', products)
        result = []
        for product in products:
            result.append({
                'id': product.id,
                'name': product.name,  
                'price': product.price,
                'stock': product.stock,
                'description': product.description
            })
        response = jsonify(result)
        response.status_code = 200
        return response

class Product_resource(Resource):

    def put(self, productId):

        product = Product.query.get_or_404(productId)
        product.name = request.json.get('name',product.name)
        product.description = request.json.get('description',product.description)
        product.price = request.json.get('price',product.price)
        product.stock = request.json.get('stock',product.stock)
        
        print( product.name, product.description, product.price, product.stock)
        
        db.session.commit()
        return jsonify({'mensaje': 'Producto editado con exito'})

    def delete(self, productId):
        product = Product.query.get(productId)
        
        db.session.delete(product)
        db.session.commit()
        return jsonify({'mensaje': 'Producto eliminado con exito'})