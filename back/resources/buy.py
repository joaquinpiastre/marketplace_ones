from flask_restful import Resource
from flask import request, jsonify
from models.Product import Product
from database import db 
from models.User import User
from models.Sales import Sales


class Buys(Resource):
      
    def post(self):
        data = request.get_json()
        userId = data.get('userId')
        productId = data.get('productId')
        
        user = User.query.get(userId)
        product = Product.query.get(productId)

        sale = Sales(user=user, product=product)
        
        db.session.add(sale)
        db.session.commit()
        return jsonify({'mensaje': 'Compra agregada con éxito.'})

    def get(self):
        sales = db.session.query(Sales).all()
        result = []
        for sale in sales:
            result.append({'id':sale.id})
        response = jsonify(result)
        response.status_code = 200 
        return response

class Buy(Resource):

    def get(self, id):

        user = User.query.get(id)
        print(user)
        sales = Sales.query.filter_by(user=user).all()

        result = []
        for sale in sales:
            buy = Product.query.get(sale.product_id)
            result.append({
                "id": buy.id,
                "name": buy.name,
                "description": buy.description,
                "price": buy.price,
            })
        return result

    
    def delete(self, id):
        product = Product.query.get(id)
        sale = Sales.query.filter_by( product=product).first()
        
        db.session.delete(sale)
        db.session.commit()
        return jsonify({'mensaje': 'producto eliminada con éxito.'})