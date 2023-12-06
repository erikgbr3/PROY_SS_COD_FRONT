import React, { ReactNode, FC, createContext, useReducer, useContext } from "react";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import Match from "../../domain/entities/match";
import { useAddMatchState } from "./addMatchProvider";
import { useMatchesState } from "./matchesProvider";
import MatchesRepositoryImp from "../../infraestructure/repositories/matchesRepositoryImp";
import MatchesDatasourceImp from "../../infraestructure/datasources/matchesDatasourceImp";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  match: Match,
  errors: any,

  setMatchProp: (property: string, value: any) => void,
  deleteMatch: (onDeleted: Function) => void,
  setMatch: (match: Match) => void,
}

const DeleteMatchContext = createContext({} as ContextDefinition)

interface DeleteMatchState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  match: Match,
  errors: any
}

type DeleteMatchActionType =
  { type: 'Set Loading'; payload: boolean }
  | { type: 'Set Saving'; payload: boolean }
  | {
    type: 'Set Success'; payload: {
      success: boolean,
      match?: Match,
      message: string
    }
  }
  | { type: 'Set Match'; payload: Match }
  | { type: 'Set Message'; payload: string | null }
  | {
    type: 'Set Errors'; payload: {
      message: string,
      errors: any
    } 
  }

const initialState: DeleteMatchState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  match: new Match(0, 0, '', '', 0, ''),
  errors: {}
}

function DeleteMatchReducer(
  state: DeleteMatchState, 
  action: DeleteMatchActionType
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
    case 'Set Match':
      return {
        ...state,
        match: action.payload
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

const DeleteMatchProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(DeleteMatchReducer, initialState);

  function setMatchProp(property: string, value: any) {
    dispatch({
      type: 'Set Match',
      payload: {
        ...state.match,
        [property]: value,
      }
    })
  }

  async function deleteMatch(onDeleted: Function) {
    const repository = new MatchesRepositoryImp(
      new MatchesDatasourceImp()
    );
    dispatch({
      type: 'Set Saving',
      payload: true,
    })

    const result = await repository.deleteMatch(state.match);

    if(result.match) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          match: result.match,
          message: result.message,
        }
      });

      onDeleted(state.match)
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

  function setMatch(match: Match) {
    dispatch({
      type: 'Set Match',
      payload: match
    })
  }

  return (
    <DeleteMatchContext.Provider value={{
      ...state,

      setMatchProp,
      deleteMatch,
      setMatch,
    }}>
      {children}
    </DeleteMatchContext.Provider>
  )
}

function useDeleteMatchesState() {
  const context = useContext(DeleteMatchContext);
  if (context === undefined) {
    throw new Error('UseDeleteLeagueState debe ser usado con un DeleteLeagueProvider');
  }
  return context;
}

export { DeleteMatchProvider, useDeleteMatchesState }
