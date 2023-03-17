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


Base.metadata.create_all(engine)
