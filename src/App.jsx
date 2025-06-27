import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoInput from './Components/TodoInput'

function App() {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()
  const todoList = useSelector((state) => state)

  const deleteTodoActionMethod = (todoId) => ({
    type: 'delete_todo',
    payload: { todoId: todoId },
  })

  function handleDeleteTodo(id) {
    dispatch(deleteTodoActionMethod(id))
  }

  return (
    <div>
      <TodoInput todo={todo} setTodo={setTodo} />
      {todoList.length != 0 ? (
        todoList.map((todoItem) => {
          return (
            <div key={todoItem?.id}>
              <p>{todoItem?.name}</p>
              <button>Edit</button>
              <button onClick={() => handleDeleteTodo(todoItem?.id)}>
                Delete Todo
              </button>
            </div>
          )
        })
      ) : (
        <p>There are no todos</p>
      )}
    </div>
  )
}

export default App
