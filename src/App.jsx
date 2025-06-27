import { useSelector } from "react-redux";
import TodoInput from "./Components/TodoInput";


function App() {
  const todoList = useSelector((state) => state)
  console.log(todoList)
  return (
    <div>
      <TodoInput />
    </div>
  );
}

export default App