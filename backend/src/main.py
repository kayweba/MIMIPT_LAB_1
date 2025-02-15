import secrets
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from database import Base, engine, SessionLocal
from schemas import ToDo, ToDoCreate
from models import ToDo as TodoModel

# Create the database
Base.metadata.create_all(engine)

methods = ["GET", "POST", "PUT", "DELETE"]
origins = [
    "http://localhost:5173",
]


security = HTTPBasic()

app = FastAPI(dependencies=[Depends(security)])
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=["*"],
)
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def get_current_username(
        credentials: Annotated[HTTPBasicCredentials, Depends(security)],
):
    current_username_bytes = credentials.username.encode("utf8")
    correct_username_bytes = b"stanleyjobson"
    is_correct_username = secrets.compare_digest(
        current_username_bytes, correct_username_bytes
    )
    current_password_bytes = credentials.password.encode("utf8")
    correct_password_bytes = b"swordfish"
    is_correct_password = secrets.compare_digest(
        current_password_bytes, correct_password_bytes
    )
    print(credentials.username)
    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )

    return credentials.username


@app.get("/auth")
def read_current_user(username: Annotated[str, Depends(get_current_username)]) -> JSONResponse:
    response = JSONResponse(
        content={"username": username},
        headers={
            "WWW-Authenticate": "Basic",
            "Content-Type": "application/json",
            "Cache-Control": "no-store,no-cache, must-revalidate, post-check=0, pre-check=0",
        }
    )
    print('HELLO WORLD')
    return response

@app.get("/")
def root():
    return "todooo"


@app.post("/todo", response_model=ToDo, status_code=status.HTTP_201_CREATED)
def create_todo(todo: ToDoCreate, session: Session = Depends(get_session)):
    # create an instance of the ToDo database model
    tododb = TodoModel(task=todo.task)

    # add it to the session and commit it
    session.add(tododb)
    session.commit()
    session.refresh(tododb)

    # return the todo object
    return tododb


@app.get("/todo/{id}", response_model=ToDo)
def read_todo(id: int, session: Session = Depends(get_session)):
    # get the todo item with the given id
    todo = session.query(TodoModel).get(id)

    # check if todo item with given id exists. If not, raise exception and return 404 not found response
    if not todo:
        raise HTTPException(status_code=404, detail=f"todo item with id {id} not found")

    return todo


@app.put("/todo/{id}", response_model=ToDo)
def update_todo(id: int, task: str, session: Session = Depends(get_session)):
    # get the todo item with the given id
    todo = session.query(TodoModel).get(id)

    # update todo item with the given task (if an item with the given id was found)
    if todo:
        todo.task = task
        session.commit()

    # check if todo item with given id exists. If not, raise exception and return 404 not found response
    if not todo:
        raise HTTPException(status_code=404, detail=f"todo item with id {id} not found")

    return todo


@app.delete("/todo/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(id: int, session: Session = Depends(get_session)):
    # get the todo item with the given id
    todo = session.query(TodoModel).get(id)

    # if todo item with given id exists, delete it from the database. Otherwise raise 404 error
    if todo:
        session.delete(todo)
        session.commit()
    else:
        raise HTTPException(status_code=404, detail=f"todo item with id {id} not found")

    return None


@app.get("/todos", response_model=List[ToDo])
def read_todo_list(session: Session = Depends(get_session)):
    # get all todo items
    todo_list = session.query(TodoModel).all()

    return todo_list


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8001)
