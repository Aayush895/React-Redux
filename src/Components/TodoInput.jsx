import { useDispatch } from 'react-redux'

function TodoInput({todo, setTodo}) {
  const dispatch = useDispatch()

  const addTodoActionMethod = (todoText) => ({
    type: 'add_todo',
    payload: { todoText: todoText },
  })

  function handleTodo(e) {
    setTodo(e.target.value)
  }

  function handleAddTodo(e) {
    e.preventDefault()
    dispatch(addTodoActionMethod(todo))
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input placeholder="Add Todo" onChange={handleTodo} value={todo} />
      <button>Add Todo</button>
    </form>
  )
}

export default TodoInput
