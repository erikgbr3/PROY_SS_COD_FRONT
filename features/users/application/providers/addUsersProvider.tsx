import React from 'react';
import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import User from "../../domain/entities/user";
import usersRepositoryImp from "../../infraestructure/repositories/usersRepositoryImp";
import usersDatasourceImp from "../../infraestructure/datasources/usersDatasourceImp";
import { Alert } from "react-native";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string,
  user: User,
  errors: any,
  setUserProp: (property: string, value: any) => void,
  saveUser: () => void,
}

const AddUsersContext = createContext({} as ContextDefinition);

interface AddUsersState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string,
  user: User,
  errors: any,
}

type AddUsersActionType =
  { type: 'set Loading', payload: boolean }
  | { type: 'set Saving', payload: boolean }
  | { type: 'set User', payload: User }
  | { type: 'set Message', payload: string | undefined }
  | { type: 'set Errors', payload: any }
  | {type: 'set Success', payload: {
    success: boolean,
    user?: User,
    message: string
  }};

const initialState: AddUsersState = {
  loading: false,
  saving: false,
  success: false,
  message: '',
  user: new User('', '', '', 0),
  errors: {},
}

function AddUsersReducer(state: AddUsersState, action: AddUsersActionType) {
  switch (action.type) {
    case 'set Loading':
      return { ...state, loading: action.payload }
    case 'set Saving':
      return {
        ...state,
        saving: action.payload,
      };
    case 'set User':
      return {
        ...state,
        user: action.payload
      }
    case 'set Message':
      return {
        ...state,
        message: action.payload
      };
    case 'set Errors':
      return {
        ...state,
        errors: action.payload || {}
      }
    case 'set Success':
      return{
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        saving: false,
      }
    default:
      return state
  }
}

type Props = {
  children?: ReactNode;
};

const AddUsersProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(AddUsersReducer, initialState)
  function setUserProp(property: string, value: any){
    dispatch({
      type: 'set User',
      payload:{
        ...state.user,
        [property]: value,
      }
    })
  }

  async function saveUser(){
    const repository = new usersRepositoryImp(
      new usersDatasourceImp()
    );
     dispatch({
      type: 'set Saving',
      payload: true,
    });
      const result = await repository.addUser(state.user);     
      console.log("result", result);

      if(result.user){
        dispatch({
          type: 'set Success',
          payload: {
            success: true,
            message: result.message
          }
        })

        dispatch({
          type: 'set Message',
          payload: result.message,
        });

        return;
      }

      dispatch({
        type: 'set Success',
        payload: {
          success: false,
          message: result.message
        }
      })
       
      dispatch({
        type: 'set Message',
        payload: result.message,
      });

      let errors:any = {};
      result.errors?.forEach((item) =>{
        errors[item.field] = item.error;
      })

      dispatch({
        type: 'set Errors',
        payload: errors
      })
  
      dispatch({
        type: 'set Saving',
        payload: false,
      });

      return;
  }

  return (
    <AddUsersContext.Provider value={{
      ...state,
      setUserProp,
      saveUser,
    }}>
      {children}
    </AddUsersContext.Provider>
  )
}


function useAddUsersState(){
  const context = useContext(AddUsersContext);
  if(context === undefined){
    throw new Error("UseAddUsersState debe ser usado");
  }
  return context;
}

export {AddUsersProvider, useAddUsersState}

