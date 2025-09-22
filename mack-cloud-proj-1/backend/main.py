from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pet(BaseModel):
    nome: str
    tipo: str
    idade: int
    raca: str

pets_data = [
    Pet(nome="Rex", tipo="Cachorro", idade=5, raca="Labrador"),
    Pet(nome="Miau", tipo="Gato", idade=3, raca="Persa"),
    Pet(nome="Nina", tipo="Cachorro", idade=2, raca="Poodle"),
    Pet(nome="Felix", tipo="Gato", idade=7, raca="Siamês"),
    Pet(nome="Bolt", tipo="Cachorro", idade=4, raca="Bulldog"),
    Pet(nome="Luna", tipo="Gato", idade=1, raca="Maine Coon"),
    Pet(nome="Max", tipo="Cachorro", idade=6, raca="Beagle"),
    Pet(nome="Whiskers", tipo="Gato", idade=5, raca="Abissínio"),
    Pet(nome="Fido", tipo="Cachorro", idade=3, raca="Golden Retriever"),
    Pet(nome="Chester", tipo="Cachorro", idade=8, raca="Pitbull")
]

@app.get("/pets", response_model=List[Pet])
async def get_pets():
    return pets_data
