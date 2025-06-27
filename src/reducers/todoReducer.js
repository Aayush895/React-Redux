import { bindActionCreators } from "redux"

function todoReducer(state, action) {
  if (action.type == 'add_todo') {
    return [...state, {
      name: action.payload.todoText,
      isFinished: false,
      id: state.length == 0 ? 1 : state[state.length - 1].id + 1
    }]
  } else if (action.type == 'delete_todo') {
    return state.filter(todo => todo?.id != action.payload.todoId)
  } else if (action.type == 'edit_todo') {
    const todo = action.payload.todo
    const updateTodoText = action.payload.todoText
    return state.map(t => {
      if (t.id == todo.id) {
        t.text = updateTodoText
      }
    })
  }

  return state;
}

export default todoReducer