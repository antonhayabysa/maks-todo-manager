import React from "react";
import "./Todo.css";

function Todo({ title, completed, selected, toggleComplete, toggleSelect }) {
  return (
    <div className="todo-item">
      <input type="checkbox" checked={completed} onChange={toggleComplete} />
      <span>{title}</span>
    </div>
  );
}

export default Todo;
