from database import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))
    price = db.Column(db.String(250))
    stock = db.Column(db.String(250))
    description = db.Column(db.String(250))
    
    Product_sales = db.relationship('Sales', backref='product', cascade="all, delete-orphan")
    
    def __str__ (self):
        return (
            f'id: {self.id}, '
            f'name: {self.name}, '
            f'price: {self.price}, '
            f'stock: {self.stock}, '
            f'description: {self.description}'
        )
    
    
    