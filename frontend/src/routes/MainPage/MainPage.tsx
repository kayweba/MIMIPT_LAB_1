import { useContext, useEffect, useState } from 'react';
import todosService from '../../services/todosService';
import { TodoItem, Todos } from '../../models/Todos';
import cls from './MainPage.module.scss';
import { AuthContext } from '../../context/AuthContext';

export function MainPage() {
  const [todos, setTodos] = useState<Todos>([]);
  const [newTodoValue, setNewTodoValue] = useState<string>('');
  const { userData } = useContext(AuthContext);
  const [cacheControlValue, setCacheControlValue] = useState<string | null>(null)

  useEffect(() => {
    const makeRequest = async () => {
      const res = await todosService.getAll(userData);
      setCacheControlValue(res.headers.get('Cache-Control'))
      setTodos(await res.json());
    };
    makeRequest();
  }, [userData]);

  const addTodo = async () => {
    if (newTodoValue) {
      const res = await todosService.addTodo(userData, newTodoValue);
      const json = (await res.json()) as TodoItem;
      const updatedTodos = [...todos, { id: json.id, task: json.task }];
      setTodos(updatedTodos);
      setNewTodoValue('')
    }
  };

  const removeTodo = async (id: number) => {
    const res = await todosService.removeTodo(userData, id);
    if (res.status === 204) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      prompt('Не удалось удалось удалить элемент!');
    }
  };

  const updateTodo = async (id: number) => {
    const currentEditTodoValue = todos.find((todo) => todo.id === id)?.task;
    const newValue = prompt('Введите новое значение: ', currentEditTodoValue);

    if (currentEditTodoValue !== newValue && newValue !== null) {
      const res = await todosService.updateTodo(userData, id, newValue);
      const json = (await res.json()) as TodoItem;

      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, task: json.task };
          }
          return todo;
        })
      );
    }
  };

  return (
    <div className={cls.todosContainer}>
      <div>
      <p>Cache-Control: {cacheControlValue}</p>
        <div className={cls.addTodoWrapper}>
          <input
            value={newTodoValue}
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
              <button
                onClick={() => updateTodo(todo.id)}
                className={cls.updateTodoBtn}
              >
                Изменить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
