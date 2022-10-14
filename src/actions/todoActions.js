import * as ActionTypes from './types'



export const getTodos = ()=>{

    return {type: ActionTypes.GET_TODO_START,loading:true}
}

export const getTodosSuccess = (todos)=>{
    console.log("todosuccess",todos);
    return {type: ActionTypes.GET_TODO_SUCCESS,todos: todos,loading:false}
}

export const getUserEror = (error)=>{
    return {type: ActionTypes.GET_TODO_SUCCESS,error}
}

export const addUserStart=(users)=>{
    return {type:ActionTypes.ADD_USER_START,users}
}

export const addUserSuccess=(users)=>{
    return {type:ActionTypes.ADD_USER_SUCCESS,users}
}