import React from "react";
import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Player from "../../domain/entities/player";
import { createErrorHandler } from "expo/build/errors/ExpoErrorManager";
import PlayersRepositoryImp from "../../infraestructure/repositories/playersRepositoryImp";
import PlayersDatasourceImp from "../../infraestructure/datasources/playersDataSourceImp";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message: string | null,
  player: Player,
  errors: any,

  setPlayerProp: (property: string, value: any) => void,
  savePlayer: (onSaved: Function) => void,
  setPlayer: (player: Player) => void,
}

const EditPlayerContext = createContext({} as ContextDefinition);

interface EditPlayerState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message: string | null,
  player: Player ,
  errors: any,
}

type EditPlayerActionType = 
{ type: 'Set Loading', payload: boolean } 
| { type: 'Set Saving', payload: boolean }
| { type: 'Set Success', payload: {
  success: boolean,
  player?: Player,
  message: string,
}}
| { type: 'Set Player', payload: Player }
| { type: 'Set Message', payload: string | null}
| { type: 'Set Errors', payload: {
  message: string,
  errors: any
}}
;

const InitialState : EditPlayerState = {
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
    '',
    '',
    0,
    undefined,
  ),
  errors: {},
}

function EditPlayerReducer(
  state: EditPlayerState,
  action: EditPlayerActionType) {
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

          case 'Set Errors':
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

  const EditPlayerProvider : FC<Props> = ({children}) => {
   const [state, dispatch] = useReducer(EditPlayerReducer, InitialState);
   
   function setPlayerProp(property: string, value: any) {

    dispatch({
      type: 'Set Player',
      payload: {
        ...state.player,
        [property]: value,
      }
    })
   }

   async function savePlayer(onSaved:Function) {
    const playersRepostory = new PlayersRepositoryImp(
      new PlayersDatasourceImp()
    );

    dispatch({
      type: 'Set Saving',
      payload: true,
    });

    console.log(state.player);

    const result = await playersRepostory.addPlayer(state.player);
    if(result.player) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          player: result.player,
          message: result.message,
        }
      });

      onSaved(state.player)
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
      }
    });

    onSaved(state.player);
   } 

   function setPlayer(player: Player) {
    dispatch({
      type: 'Set Player',
      payload: player,
    })
   }

   return(
    <EditPlayerContext.Provider value={{
      ...state,
      setPlayerProp,
      savePlayer,
      setPlayer
    }}
    
    >
      {children}
    </EditPlayerContext.Provider> 
   ) 
  }

  function useEditPlayerState() {
    const context = useContext(EditPlayerContext);
    if( context === undefined) {
        throw new Error ("EditPlayerSate debe ser usado" + " con un EditPlayerProvider");
    }

    return context;
}

export {EditPlayerProvider, useEditPlayerState};


