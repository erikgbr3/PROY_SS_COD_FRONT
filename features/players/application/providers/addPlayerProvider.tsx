import React from "react";
import { FC, ReactNode, createContext, useContext, useReducer, useState } from "react";
import Player from "../../domain/entities/player";
import PlayersRepositoryImp from "../../infraestructure/repositories/playersRepositoryImp";
import PlayersDatasourceImp from "../../infraestructure/datasources/playersDataSourceImp";

interface ContextDefinition{
  loading: boolean,
  saving: boolean,
  success: boolean,
  message: string | null,
  player: Player,
  errors: any,

  setPlayerProp: (property: string, value: any) => void,
  savePlayer: () => void,
}

const AddPlayerContext = createContext({} as ContextDefinition);

interface AddPlayerState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message: string | null,
  player: Player, 
  errors: any
  
}

type AddPlayerActionType = 
{ type: 'Set Loading', payload: boolean } 
| { type: 'Set Saving', payload: boolean }
| { type: 'Set Success', payload: { 
  success: boolean, 
  player?: Player,
  message: string,

} }
| { type: 'Set Player', payload: Player }
| { type: 'Set Message', payload: string | null}
| { type: 'Set Errors', payload: {
  message: string,
  errors: any,
}}
;

const InitialState : AddPlayerState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  player: new Player(
    '',
    '',
    '',
    '',
    '',
    '2441903426',
    '',
    1,
    undefined,
  ),
  errors: {}
}

function AddPlayerReducer(
  state: AddPlayerState,
  action: AddPlayerActionType) {
    switch (action.type) {
      case 'Set Loading':
        return { ...state, loading: action.payload};

      case 'Set Saving':
        return {
            ...state,
            saving: action.payload,
        }
      
      case 'Set Player':
        return {
          ...state,
          player: action.payload,

        }

      case "Set Message":
        return {
          ...state,
          message: action.payload
        }

      case "Set Errors":
        return {
          ...state,
          errors: action.payload.errors || {},
          message: action.payload.message,
          saving: false,
        }

      case "Set Success":
        return {
          ...state,
          success: action.payload.success,
          message: action.payload.message,
          errors: {},
          saving: false,
          //player: action.payload.player || state.player,
        }
    
      default:
        return state;
    }
  }

  type Props = {
    children?: ReactNode,
}

const AddPlayerProvider : FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer( AddPlayerReducer, InitialState );

    function setPlayerProp(property: string, value: any) {

      dispatch({
        type: 'Set Player',
        payload: {
          ...state.player,
          [property]: value,
        }
      })
    }

    async function savePlayer() {
      const playersRepository = new PlayersRepositoryImp(
        new PlayersDatasourceImp()
      ); 
      
      dispatch({
        type: 'Set Saving',
        payload: true,
      });

      const result = await playersRepository.addPlayer(state.player);
      if(result.player) {
        dispatch({
          type: 'Set Success',
          payload: {
            success: true,
            player: result.player,
            message: result.message,
          }
        });
        return;
      }

      let errors : any = {};

      result.errors?.forEach((item) => {
        errors[item.field] = item.error;
      });

      dispatch({
        type: 'Set Errors',
        payload: {
          message: result.message,
          errors,
        },
      });
 
    } 

    return(
        <AddPlayerContext.Provider value={{
            ...state,
            setPlayerProp,
            savePlayer,
        }}>
            {children}
        </AddPlayerContext.Provider>
    )
}

function useAddPlayerState() {
    const context = useContext(AddPlayerContext);
    if( context === undefined) {
        throw new Error ("usePlayerSate debe ser usado" + " con un AddPlayerProvider");
    }
    
    return context;
}

export {AddPlayerProvider, useAddPlayerState};