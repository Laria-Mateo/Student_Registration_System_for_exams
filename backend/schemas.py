from pydantic import BaseModel
from datetime import datetime

class UserData(BaseModel): #Esquema de datos para FastAPI
    dni: int
    nombre: str
    apellido: str

class UserDni(UserData):
    dni: int

class MesaId(BaseModel): 
    id: int

class MesaExamenData(BaseModel): 
    id: int
    nombreAsignatura: str
    fecha: datetime

class InscripcionData(BaseModel):
    id: int
    id_alumno: int
    id_mesa_examen: int
