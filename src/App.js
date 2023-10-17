import "./App.css";
import { useState, useEffect } from "react";
import Todo from "./сomponents/todo/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error("Ошибка: ", error.message));
  }, []);

  const addTodo = () => {
    const newTodo = {
      title: input,
      completed: false,
      id: Date.now(),
      selected: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleSelect = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo
      )
    );
  };

  const completeSelected = () => {
    setTodos(
      todos.map((todo) => {
        if (!todo.completed) {
          return { ...todo, completed: true, selected: false };
        }
        return todo;
      })
    );
  };

  const undoSelected = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.completed) {
          return { ...todo, completed: false, selected: false };
        }
        return todo;
      })
    );
  };

  const filteredTodos =
    search.length >= 3
      ? todos.filter((todo) => todo.title.includes(search))
      : todos;

  return (
    <div className="app-container">
      <div className="left-column">
        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add TODO title"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        {filteredTodos.map(
          (todo) =>
            !todo.completed && (
              <Todo
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                selected={todo.selected}
                toggleComplete={() => toggleComplete(todo.id)}
                toggleSelect={() => toggleSelect(todo.id)}
              />
            )
        )}
        <button onClick={completeSelected}>COMPLETE</button>
      </div>
      <div className="right-column">
        <div className="search-container">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
        {filteredTodos.map(
          (todo) =>
            todo.completed && (
              <Todo
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                selected={todo.selected}
                toggleComplete={() => toggleComplete(todo.id)}
                toggleSelect={() => toggleSelect(todo.id)}
              />
            )
        )}
        <button onClick={undoSelected}>UNDO</button>
      </div>
    </div>
  );
}

export default App;
