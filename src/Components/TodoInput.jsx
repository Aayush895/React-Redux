import { useState } from "react";
import { useDispatch } from "react-redux";

function TodoInput() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  function handleTodo(e) {
    setTodo(e.target.value);
  }

  const addTodoActionMethod = (todoText) => ({
    type: "add_todo",
    payload: { todoText: todoText },
  });

  function handleAddTodo(e) {
    e.preventDefault();
    dispatch(addTodoActionMethod(todo));
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input placeholder="Add Todo" value={todo} onChange={handleTodo} />
      <button>Add Todo</button>
    </form>
  );
}

export default TodoInput;
