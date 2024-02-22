from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import crud
import models
from database import engine, Base, localSession
from schemas import UserData, UserDni, MesaId, MesaExamenData, InscripcionData

app = FastAPI()


models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


def get_db():
    db = localSession()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Hi, my name is FastAPI"}


@app.get("/api/alumnos/", response_model=list[UserData])
def get_alumnos( db: Session = Depends(get_db)):
    alumnos = crud.get_alumnos(db = db)
    return alumnos

@app.get("/api/alumnos/{alumno_dni}", response_model=UserData)
def update_alumno(alumno_dni: int, db: Session = Depends(get_db)):
    alumno = crud.get_alumno_by_dni(db=db, alumno_dni=alumno_dni)
    if alumno is None:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    return alumno


@app.post("/api/alumnos/", response_model=UserData)
def create_alumno(alumno: UserData, db: Session = Depends(get_db)):
    return crud.create_alumno(db=db, alumno=alumno)

@app.put("/api/alumnos/{alumno_dni}", response_model=UserData)
def update_alumno(alumno_dni: int, alumno_data: UserData, db: Session = Depends(get_db)):
    updated_alumno = crud.update_alumno(db=db, alumno_dni=alumno_dni, alumno_data=alumno_data)
    if updated_alumno is None:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    return updated_alumno

@app.delete("/api/alumnos/{alumno_dni}", response_model=UserData)
def delete_alumno(alumno_dni: int, db: Session = Depends(get_db)):
    deleted_alumno = crud.delete_alumno(db=db, alumno_dni=alumno_dni)
    if deleted_alumno is None:
        raise HTTPException(status_code=404, detail="Alumno no encontrado")
    return deleted_alumno

@app.get("/api/mesa_examen/", response_model=list[MesaExamenData])
def get_mesas( db: Session = Depends(get_db)):
    mesas = crud.get_mesas(db = db)
    return mesas

@app.get("/api/mesa_examen/{mesa_id}", response_model=MesaExamenData)
def get_mesa_examen(mesa_id: int, db: Session = Depends(get_db)):
    mesa = crud.get_mesa_examen_by_id(db, mesa_id=mesa_id)
    if mesa is None:
        raise HTTPException(status_code=404, detail="Mesa de examen no encontrada")
    return mesa

@app.post("/api/mesa_examen/", response_model=MesaExamenData)
def create_mesa_examen(mesaData: MesaExamenData, db: Session = Depends(get_db)):
    return crud.create_mesa_examen(db=db, mesaData=mesaData)

@app.put("/api/mesa_examen/{mesa_id}", response_model=MesaExamenData)
def update_mesa_examen(mesa_id: int, mesa_data: MesaExamenData, db: Session = Depends(get_db)):
    updated_mesa = crud.update_mesa_examen(db=db, mesa_id=mesa_id, mesa_data=mesa_data)
    if updated_mesa is None:
        raise HTTPException(status_code=404, detail="Mesa de examen no encontrada")
    return updated_mesa

@app.delete("/api/mesa_examen/{mesa_id}", response_model=MesaExamenData)
def delete_mesa_examen(mesa_id: int, db: Session = Depends(get_db)):
    deleted_mesa = crud.delete_mesa_examen(db=db, mesa_id=mesa_id)
    if deleted_mesa is None:
        raise HTTPException(status_code=404, detail="Mesa de examen no encontrada")
    return deleted_mesa

@app.get("/api/inscripciones/", response_model=list[InscripcionData])
def get_inscripciones(db: Session = Depends(get_db)):
    inscripciones = crud.get_inscripciones(db=db)
    return inscripciones

@app.post("/api/inscribir/{alumno_dni}/{mesa_id}")
def inscribir_alumno(alumno_dni: int, mesa_id: int, db: Session = Depends(get_db)):
    inscripcion = crud.inscribir_alumno_en_mesa(db=db, alumno_dni=alumno_dni, mesa_id=mesa_id)
    if inscripcion is None:
        raise HTTPException(status_code=404, detail="Alumno o mesa de examen no encontrados o inscripción duplicada")
    return inscripcion

@app.delete("/api/eliminar_inscripcion/{alumno_dni}/{mesa_id}")
def eliminar_inscripcion(alumno_dni: int, mesa_id: int, db: Session = Depends(get_db)):
    inscripcion_eliminada = crud.eliminar_inscripcion(db=db, alumno_dni=alumno_dni, mesa_id=mesa_id)
    if inscripcion_eliminada is None:
        raise HTTPException(status_code=404, detail="La inscripción no existe")
    return inscripcion_eliminada