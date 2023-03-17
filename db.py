from datetime import timedelta

from flask_jwt_extended import create_access_token
from passlib.hash import pbkdf2_sha256
from sqlalchemy import String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

engine = create_engine('sqlite:///storage.db', echo=True)

class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(255))
    password: Mapped[str] = mapped_column(String(500))
    
    def __init__(self, name: str, email: str, password: str):
      self.name = name
      self.email = email
      self.password = pbkdf2_sha256.hash(password)
    
    def get_token(self, expire_time=24):
       expire_delta = timedelta(expire_time)
       token = create_access_token(
          identity=self.id, expires_delta=expire_delta
        )
       return token
    
    @classmethod
    def authenticate(cls, email, password):
       user = cls.query.filter(cls.email == email).one()
       if not pbkdf2_sha256.verify(password, user.password):
          raise Exception("No user with this password")
       return user


Base.metadata.create_all(engine)
