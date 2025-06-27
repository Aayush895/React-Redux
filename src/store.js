import { createStore } from 'redux'
import todoReducer from './reducers/Todoreducer'

const store = createStore(todoReducer, [])

export default store;