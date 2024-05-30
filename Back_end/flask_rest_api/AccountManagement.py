from UserManagment import db

class Banks(db.Model):
    __tablename__ = "Banks"
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(256), nullable=True)
    Swift_Code = db.Column(db.String(256), nullable=True)
    Financial_Code = db.Column(db.String(256), nullable=True)
    Mobile = db.Column(db.String(256), nullable=True)
    Email = db.Column(db.String(256), nullable=True)

    branches = db.relationship('BankBranches', back_populates='bank')
    accounts = db.relationship('BankAccounts', back_populates='bank')


class BankBranches(db.Model):
    __tablename__ = "BankBranches"
    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(256), nullable=True)
    Branch_Code = db.Column(db.String(256), nullable=True)
    Branch_Swift_Code = db.Column(db.String(256), nullable=True)
    Bank_Id = db.Column(db.Integer, db.ForeignKey('Banks.Id'), nullable=False)

    bank = db.relationship('Banks', back_populates='branches')
    accounts = db.relationship('BankAccounts', back_populates='branch')


class BankAccounts(db.Model):
    __tablename__ = "BankAccounts"
    Id = db.Column(db.Integer, primary_key=True)
    Account_Name = db.Column(db.String(256), nullable=True)
    Account_Number = db.Column(db.Integer, nullable=True)
    Account_Description = db.Column(db.String(256), nullable=True)
    Bank_Id = db.Column(db.Integer, db.ForeignKey('Banks.Id'), nullable=False)
    Branch_Id = db.Column(db.Integer, db.ForeignKey('BankBranches.Id'), nullable=False)

    bank = db.relationship('Banks', back_populates='accounts')
    branch = db.relationship('BankBranches', back_populates='accounts')


class PaymentType(db.Model):
    __tablename__ = "PaymentType"
    Id = db.Column(db.Integer, primary_key=True)
    Type = db.Column(db.String(256), nullable=True)