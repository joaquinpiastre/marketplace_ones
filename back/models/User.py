from database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250))
    password = db.Column(db.String(250))
    role = db.Column(db.String(250))

    User_sales = db.relationship('Sales', backref='user', cascade="all, delete-orphan")

    def __str__ (self):
        return(
            f'id: {self.id}, '
            f'emal: {self.email}, '
            f'password: {self.password}, '
            f'role: {self.role}'
        )
       
