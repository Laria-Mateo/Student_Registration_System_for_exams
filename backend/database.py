
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:12345@localhost:5433/StudentSystemDataBase"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

localSession = sessionmaker(autoflush=False, autocommit=False, bind=engine)

Base = declarative_base()

