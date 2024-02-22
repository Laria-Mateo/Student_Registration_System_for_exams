from sqlalchemy import Column, String, Integer, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class MesaExamen(Base):
    __tablename__ = 'mesaExamen'
    
    id = Column(Integer, primary_key=True, index=True)
    nombreAsignatura = Column(String(30), index=True, unique=True)
    fecha = Column(Date, index=True)
    inscripciones = relationship("Inscripcion", back_populates="mesa_examen")


class Alumno(Base):
    __tablename__ = 'alumnos'
    
    dni = Column(Integer, primary_key=True, index=True, unique=True)
    nombre = Column(String(30), index=True, unique=False)
    apellido = Column(String(30), index=True, unique=False)
    inscripciones = relationship("Inscripcion", back_populates="alumno")
    
class Inscripcion(Base):
    __tablename__ = 'inscripcion'
    
    id = Column(Integer, primary_key=True, index=True)
    id_alumno = Column(Integer, ForeignKey('alumnos.dni'))
    id_mesa_examen = Column(Integer, ForeignKey('mesaExamen.id'))
    
    
    alumno = relationship("Alumno", back_populates="inscripciones")
    
    mesa_examen = relationship("MesaExamen", back_populates="inscripciones")

    
    __table_args__ = (
        UniqueConstraint('id_alumno', 'id_mesa_examen', name='_alumno_mesa_uc'),
    )