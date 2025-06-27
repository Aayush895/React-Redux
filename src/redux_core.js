import { bindActionCreators, compose, createStore } from "redux";

function removeSpaces(string) {
  return string.split(' ').join('');
}

function repeatString(string) {
  return string + string;
}

function convertToUpper(string) {
  return string.toUpperCase();
}

const input = 'abc def'
const composedFunction = compose(removeSpaces, repeatString, convertToUpper);
// console.log(composedFunction(input))

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

const { dispatch, subscribe, getState, replaceReducer } = createStore(todoReducer, [])

subscribe(() => console.log('LOGGING STATE: ', getState()));
// dispatch({ type: 'add_todo', payload: { todoText: 'todo 1' } });
// dispatch({ type: 'add_todo', payload: { todoText: 'todo 2' } });
// dispatch({ type: 'delete_todo', payload: { todoId: '1' } });

// There is an issue with the action objects that are being passed in the dispatch method. The issue is that if there are multiple dispatch methods for let's say `add_todo` action and imagine if we want to modify the payload that we are sending, then we will have to find all the dispatch functions of action type `add_todo` and will have to modify the payload. The simple fix for this issue is to simply transition from passing `action objects` in the dispatch method to `action methods` in the dispatch method. These `action methods` are nothing but these `action objects` wrapped in a function and returning these `action objects` instead of manually passing the objects as the arguments. What it does is that instead of finding all the dispatch methods, all we have to do is simply modify the object being returned by these `action methods` and we are done thus saving us a lot of time and manual repetetive labour. The code will look like this:


const addTodoActionMethod = (todoText) => ({ type: 'add_todo', payload: { todoText: todoText } });
const deleteTodoActionMethod = (todoId) => ({ type: 'delete_todo', payload: { todoId: todoId } });

dispatch(addTodoActionMethod('todo 1'));
dispatch(addTodoActionMethod('todo 2'));
dispatch(deleteTodoActionMethod(1));

const actions = bindActionCreators({ addTodoActionMethod, deleteTodoActionMethod }, dispatch);
actions.addTodoActionMethod('todo 3');
actions.addTodoActionMethod('todo 4');
actions.deleteTodoActionMethod(3);
