from UserManagment import db
from clientManagement import Client

class Company(db.Model):
        __tablename__="Company"
        Id=db.Column(db.Integer, primary_key=True)
        Company_name=db.Column(db.String(256), nullable=True)
        

        Client=db.relationship("Client", back_populates="Company")

class IndustrySector(db.Model):
        __tablename__="IndustrySector"
        Id=db.Column(db.Integer, primary_key=True)
        Sector_name=db.Column(db.String(256), nullable=True)
        
