from sqlalchemy.orm import Session

from models import MesaExamen,Alumno, Inscripcion
from schemas import UserData, MesaExamenData

def get_alumnos(db: Session):
    return db.query(Alumno).all()

def get_alumno_by_dni(db: Session, alumno_dni: int):
    return db.query(Alumno).filter(Alumno.dni == alumno_dni).first()
    

def create_alumno(db: Session, alumno: UserData):
    
    db_alumno = Alumno(dni=alumno.dni, nombre=alumno.nombre, apellido=alumno.apellido)
    
    db.add(db_alumno)
    db.commit()
    db.refresh(db_alumno)  

    return db_alumno

def update_alumno(db: Session, alumno_dni: int, alumno_data: UserData):
    db_alumno = get_alumno_by_dni(db, alumno_dni)
    if db_alumno:
        db_alumno.nombre = alumno_data.nombre
        db_alumno.apellido = alumno_data.apellido
        db.commit()
        db.refresh(db_alumno)
        return db_alumno
    return None


def delete_alumno(db: Session, alumno_dni: int):
    db_alumno = get_alumno_by_dni(db, alumno_dni)
    if db_alumno:
        db.delete(db_alumno)
        db.commit()
        return db_alumno
    return None

def get_mesas(db: Session):
    return db.query(MesaExamen).all()

def get_mesa_examen_by_id(db: Session, mesa_id: int):
     return db.query(MesaExamen).filter(MesaExamen.id == mesa_id).first()

def create_mesa_examen(db: Session, mesaData: MesaExamenData):
    
    new_mesa = MesaExamen(id=mesaData.id, nombreAsignatura=mesaData.nombreAsignatura, fecha=mesaData.fecha)
    db.add(new_mesa)
    db.commit()
    db.flush(new_mesa)
    return new_mesa        

def update_mesa_examen(db: Session, mesa_id: int, mesa_data: MesaExamenData):
    db_mesa = get_mesa_examen_by_id(db, mesa_id)
    if db_mesa:
        db_mesa.nombreAsignatura = mesa_data.nombreAsignatura
        db_mesa.fecha = mesa_data.fecha
        db.commit()
        db.refresh(db_mesa)
        return db_mesa
    return None


def delete_mesa_examen(db: Session, mesa_id: int):
    db_mesa = get_mesa_examen_by_id(db, mesa_id)
    if db_mesa:
        db.delete(db_mesa)
        db.commit()
        return db_mesa
    return None

def get_inscripciones(db: Session):
    return db.query(Inscripcion).all()

def inscribir_alumno_en_mesa(db: Session, alumno_dni: int, mesa_id: int):
    db_alumno = get_alumno_by_dni(db, alumno_dni)
    db_mesa = get_mesa_examen_by_id(db, mesa_id)
    
    if db_alumno is None or db_mesa is None:
        return None
    
    inscripcion_existente = db.query(Inscripcion).filter_by(id_alumno=db_alumno.dni, id_mesa_examen=db_mesa.id).first()
    
    if inscripcion_existente:
        return None
    
    nueva_inscripcion = Inscripcion(id_alumno=db_alumno.dni, id_mesa_examen=db_mesa.id)
    db.add(nueva_inscripcion)
    db.commit()
    db.refresh(nueva_inscripcion)
    
    return nueva_inscripcion


def eliminar_inscripcion(db: Session, alumno_dni: int, mesa_id: int):
    db_alumno = get_alumno_by_dni(db, alumno_dni)
    db_mesa = get_mesa_examen_by_id(db, mesa_id)
    
    if db_alumno is None or db_mesa is None:
        return None
    
    inscripcion = db.query(Inscripcion).filter_by(id_alumno=db_alumno.dni, id_mesa_examen=db_mesa.id).first()
    
    if inscripcion:
        db.delete(inscripcion)
        db.commit()
        return inscripcion
    else:
        return None