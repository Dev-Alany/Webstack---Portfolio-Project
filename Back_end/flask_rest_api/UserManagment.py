from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = "Users"
    User_Id = db.Column(db.Integer, primary_key=True)
    Username = db.Column(db.String(256), nullable=True)
    First_name = db.Column(db.String(256), nullable=True)
    Last_name = db.Column(db.String(256), nullable=True)
    User_Email = db.Column(db.String(256), nullable=True)
    Phone_number = db.Column(db.String(256), nullable=True)
    Status = db.Column(db.String(50), default="Active")

    def __repr__(self):
        return f'{self.First_name}'

