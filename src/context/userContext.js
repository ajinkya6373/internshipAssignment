import {createContext,useReducer,useContext}from 'react'
import userReducer from "./userReducer"

const INITIAL_STATE = {
    users:[],
  };

export const UserContext = createContext();

export const UserContextProvider =({children})=> {
    return (
        <UserContext.Provider value={useReducer(userReducer,INITIAL_STATE)}>
            {children}
        </UserContext.Provider>
    )
}

export const useStateValue = ()=> useContext(UserContext)