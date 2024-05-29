from sqlalchemy import URL, create_engine
url_object = URL.create(
    "mysql+pymysql",
    username="root",
    password="",  # plain (unescaped) text
    host="localhost",
    database="BETH",
)

# Create the engine using the URL object
engine = create_engine(url_object)