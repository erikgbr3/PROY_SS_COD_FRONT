import React, { ReactNode, FC, createContext, useReducer, useContext } from "react";
import Player from "../../domain/entities/player";
import PlayersRepositoryImp from "../../infraestructure/repositories/playersRepositoryImp";
import PlayersDatasourceImp from "../../infraestructure/datasources/playersDataSourceImp";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  player: Player,
  errors: any,

  setPlayerProp: (property: string, value: any) => void,
  deletePlayer: (onDeleted: Function) => void,
  setPlayer: (player: Player) => void,
}

const DeletePlayerContext = createContext({} as ContextDefinition);

interface DeletePlayerState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  player: Player,
  errors: any
}

type DeletePlayerActionType =
  { type: 'Set Loading'; payload: boolean }
  | { type: 'Set Saving'; payload: boolean }
  | {
    type: 'Set Success'; payload: {
      success: boolean,
      player?: Player,
      message: string
    }
  }
  | { type: 'Set Player'; payload: Player }
  | { type: 'Set Message'; payload: string | null }
  | {
    type: 'Set Errors'; payload: {
      message: string,
      errors: any
    } 
  };

  const initialState: DeletePlayerState = {
    loading: false,
    saving: false,
    success: false,
    message: null,
    player: new Player('', '', '', '', '', '', 'o', 0, undefined),
    errors: {}
  }
  
  function DeletePlayerReducer(
    state: DeletePlayerState, 
    action: DeletePlayerActionType
    ) {
    switch (action.type) {
      case 'Set Message':
        return {
          ...state,
          message: action.payload
        }
      case 'Set Loading':
        return {
          ...state,
          loading: action.payload
        }
      case 'Set Saving':
        return {
          ...state,
          saving: action.payload
        }
      case 'Set Player':
        return {
          ...state,
          player: action.payload
        }
      case 'Set Errors':
        return {
          ...state,
          errors: action.payload.errors || {},
          message: action.payload.message,
          saving: false
        }
      case 'Set Success':
        return {
          ...state,
          success: action.payload.success,
          message: action.payload.message,
          errors: {},
          saving: false
        }
      default:
        return state
    }
  }

  type Props = {
    children?: ReactNode;
  }

  const DeletePlayerProvider : FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(DeletePlayerReducer, initialState);

    function setPlayerProp(property: string, value: any) {
      dispatch({
        type: 'Set Player',
        payload: {
          ...state.player,
          [property]: value,
        }
      })
    }

    async function deletePlayer(onDeleted:Function) {
      const repository = new PlayersRepositoryImp(
        new PlayersDatasourceImp()
      );
      dispatch({
        type: 'Set Saving',
        payload: true,
      })

      const result = await repository.deletePlayer(state.player);

      if(result.player) {
        dispatch({
          type: 'Set Success',
          payload: {
            success: true,
            player: result.player,
            message: result.message,
          }
        });

        onDeleted(state.player)
        return;
      }

      let errors: any = {};

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
    }

    function setPlayer(player: Player) {
      dispatch({
        type: 'Set Player',
        payload: player,
      })
    }

    return (
      <DeletePlayerContext.Provider value={{
        ...state,
        setPlayerProp,
        deletePlayer,
        setPlayer
      }}
      >
        {children}
      </DeletePlayerContext.Provider>
    )
  }

  function useDeletePlayerState() {
    const context = useContext(DeletePlayerContext);
    if (context === undefined) {
      throw new Error('UseDeletePlayerState debe ser usado con un DeletePlayerProvider');
    }
    return context;
  }
  
  export { DeletePlayerProvider, useDeletePlayerState }


