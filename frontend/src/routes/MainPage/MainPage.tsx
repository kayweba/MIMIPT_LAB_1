import { useEffect, useState } from 'react';
import todosService from '../../services/todosService';
import { TodoItem, Todos } from '../../models/Todos';
import cls from './MainPage.module.scss';

export function MainPage() {
  const [todos, setTodos] = useState<Todos>([]);
  const [newTodoValue, setNewTodoValue] = useState<string>();

  useEffect(() => {
    const makeRequest = async () => {
      const res = await todosService.getAll();
      setTodos(await res.json());
    };
    makeRequest();
  }, []);

  const addTodo = async () => {
    if (newTodoValue) {
      const res = await todosService.addTodo(newTodoValue);
      const json = (await res.json()) as TodoItem;
      const updatedTodos = [...todos, { id: json.id, task: json.task }];
      setTodos(updatedTodos);
    }
  };

  const removeTodo = async (id: number) => {
    const res = await todosService.removeTodo(id);
    if (res.status === 204) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      prompt('Не удалось удалось удалить элемент!')
    }
  };

  const updateTodo = async (id: number) => {
    const currentEditTodoValue = todos.find(todo => todo.id === id)?.task
    const newValue = prompt('Введите новое значение: ', currentEditTodoValue)

    if (currentEditTodoValue !== newValue && newValue !== null) {
      const res = await todosService.updateTodo(id, newValue)
      const json = await res.json() as TodoItem

      setTodos(todos.map(todo => {
        if (todo.id === id) {
          return {...todo, task: json.task}
        }
        return todo
      }))
    }
  }

  return (
    <div className={cls.todosContainer}>
      <div>
        <div className={cls.addTodoWrapper}>
          <input
            onChange={(event) => setNewTodoValue(event.currentTarget.value)}
            placeholder="Введите todo-шку"
          />
          <button onClick={addTodo} className={cls.addTodoBtn}>
            Добавить
          </button>
        </div>
        {todos.map((todo) => {
          return (
            <div className={cls.todoItemWrapper} key={todo.id}>
              <p>
                {todo.id}.{todo.task}
              </p>
              <button
                onClick={() => removeTodo(todo.id)}
                className={cls.removeTodoBtn}
              >
                Удалить
              </button>
              <button onClick={() => updateTodo(todo.id)} className={cls.updateTodoBtn}>
                Изменить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
