from UserManagment import db

class Client(db.Model):
        __tablename__="Clients"
        Id= db.Column(db.Integer, primary_key=True)
        Name=db.Column(db.String(256), nullable=True)
        Client_Type=db.Column(db.String(256), nullable=True)
        company_id = db.Column(db.Integer, db.ForeignKey('Company.Id'), nullable=False)

        Company = db.relationship("Company", back_populates="Client")
        # Case_Id=db.Column(db.Integer, primary_key=True)