from flask_restful import Resource
from flask import request, jsonify
from database import db
from models.User import User

class User_List(Resource):
    
    def post(self):
        
        emal = request.json['email']
        role = request.json['role']
        
        
        user = User(emal=emal, role=role)
        
        db.session.add(user)
        db.session.commit()
        return jsonify({'Mensaje': 'Producto creado correctamente'})
    
    def get(self):
        users = db.session.query(User).all()
        print('user', users)
        result = []
        for user in users:
            result.append({
                'email': user.email,  
                'role': user.role
            })
        response = jsonify(result)
        response.status_code = 200
        return response
