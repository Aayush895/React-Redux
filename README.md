# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Redux

Redux is a state management tool that was introduced as back then when react was new there was no way to manage states that were pretty complex.

Core Redux has 5 most important functions that we will be using most frequently in the industry. Those functions are:

- compose
- applyMiddleware (This method will not be used frequently)
- createStore (This method will only be used when created the store for a reducer)
- combineReducer
- bindActionCreator

These 5 functions constitute the entire redux-core library.

# Redux core apis descriptions:

- compose:  Composes functions from right to left. This method takes multiple functions as arguments and returns a single function that has combined those multiple functions together. Sample code on how to use this method is as follows: 

```js
const composedFunction = compose(func1, func2, func3, func4);
console.log(composedFunction(input)) // If you have an argument that you want to pass which would be accepted by these functions
```

- createStore: It is used to create a store. Store in redux is similar to context in contextApi. In ContextApi, we used to store our states in the context similarly, we use the store here to store the states that we will be using to update the data through redux. We also store other things in the store and those things are actions & reducers. So overall, store is something that brings together the state, actions, and reducers that make up your app. The store has several responsibilities:

  - Holds the current application state inside
  - Allows access to the current state via store.getState();
  - Allows state to be updated via store.dispatch(action);
  - Registers listener callbacks via store.subscribe(listener);
  - Handles unregistering of listeners via the unsubscribe function returned by store.subscribe(listener).
  - `createStore` method also returns us 4 different function. Those functions are `dispatch`, `subscribe`, `getState`, `replaceReducer`.

It's important to note that `you'll only have a single store in a Redux application`. When you want to split your data handling logic, you'll use reducer composition and create multiple reducers that can be combined together, instead of creating separate stores. 

The `createStore` method accepts a reducer function and an `initial State` of the application.

- `action` object argument in the reducer function: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a type property identifying it and, optionally, other properties with additional information.

NOTE: In reducer functions, we normally return the updated state instead of calling setState function.

## Methods returned by the createStore method:

As mentioned above these are the following functions returned by the `createStore` function: 

- `dispatch`: This function takes only a single argument which is an `action` object. By convention, this object must have the `type` of action that we are going to perform and a `payload` that contains all the necessary details that we want to update in the state.

- `subscribe`: This method takes a callback function as an argument and is called everytime the state is updated in out application

- `getState`: Helps us to retrieve the current state of the application

- `replaceReducer`: If we have a modified reducer that we want to replace with the current one being used in the createStore function then we can do so with this method.

NOTE: The important methods that are used in the production are the first 3 functions i.e: `dispatch`, `subscribe`, `getState`

# Issues with passing `action objects` directly inside the dispatch method: 

There is an issue with the `action objects`(Raw action object being passed inside the method) that are being passed directly in the dispatch method. The issue is that if there are multiple dispatch methods for let's say `add_todo` action and imagine if we want to modify the payload that we are sending, then we will have to find all the dispatch functions of action type `add_todo` and will have to modify the payload. The simple fix for this issue is to simply transition from passing `action objects` in the dispatch method to `action methods` in the dispatch method. These `action methods` are nothing but these `action objects` wrapped in a function and returning these `action objects` instead of manually passing the objects as the arguments. What it does is that instead of finding all the dispatch methods, all we have to do is simply modify the object being returned by these `action methods` and we are done thus saving us a lot of time and manual repetetive labour.

- bindActionCreator: Now there is another problem with the use of dispatch. Assume our entire application is mostly made from redux, then that means we will have to pass the dispatch function to the components that are in need of dispatching an action in order to update the state. Then there is a possibility that some people might pass there own actions inside the dispatch that we do not want. It will cause an unexpected behaviour or errors in our application. So in order to restrict the access of dispatch method we use this method.
The method takes an object that consists of all the `action methods`(or action creators) and the dispatch the method as arguments. This method binds the `action methods` with the dispatch method thereby removing the necessity of passing the `action methods` inside the dispatch method. Now we can directly call the methods without the dispatch method.

- combineReducers: If you have more than one reducer functions and want to use it then you cannot do so since the `createStore` function takes only one single reducer function. So `combineReducer` as the name suggests takes multiple reducers and combines them into one single reducer so that we can pass it in the `createStore` function and use multiple reducers as the need arises in the application.