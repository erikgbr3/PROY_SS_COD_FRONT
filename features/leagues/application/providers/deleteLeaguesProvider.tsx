import React, { ReactNode, FC, createContext, useReducer, useContext } from "react";
import League from "../../domain/entities/league";
import leaguesRepositoryImp from "../../infraestructure/repositories/leaguesRepositoryImp";
import leaguesDatasourceImp from "../../infraestructure/datasources/leaguesDatasourceImp";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import { useAddLeaguesState } from "./addLeaguesProvider";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  league: League,
  errors: any,
  setLeagueProp: (property: string, value: any) => void,
  deleteLeague: (onDeleted: Function) => void,
  setLeague: (league: League) => void,
}

const DeleteLeagueContext = createContext({} as ContextDefinition)

interface DeleteLeagueState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  league: League,
  errors: any
}

type DeleteLeagueActionType =
  { type: 'Set Loading'; payload: boolean }
  | { type: 'Set Saving'; payload: boolean }
  | {
    type: 'Set Success'; payload: {
      success: boolean,
      league?: League,
      message: string
    }
  }
  | { type: 'Set League'; payload: League }
  | { type: 'Set Message'; payload: string | null }
  | {
    type: 'Set Errors'; payload: {
      message: string,
      errors: any
    }
  }

const initialState: DeleteLeagueState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  league: new League('', '', '', '', '', 2),
  errors: {}
}

function DeleteLeagueReducer(state: DeleteLeagueState, action: DeleteLeagueActionType) {
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
    case 'Set League':
      return {
        ...state,
        league: action.payload
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

const DeleteLeagueProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthState();
  const { leagueSelected } = useAddLeaguesState();
  const id = leagueSelected?.id;
  initialState.league = new League('', '', '', '', '', user.id || 0, leagueSelected?.id || 0);
  const [state, dispatch] = useReducer(DeleteLeagueReducer, initialState);
  function setLeagueProp(property: string, value: any) {
    dispatch({
      type: 'Set League',
      payload: {
        ...state.league,
        [property]: value,
      }
    })
  }

  async function deleteLeague(onDeleted: Function) {
    const repository = new leaguesRepositoryImp(
      new leaguesDatasourceImp()
    );
    dispatch({
      type: 'Set Saving',
      payload: true,
    })

    const result = await repository.deleteLeague(state.league);
    onDeleted(state.league);


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

  function setLeague(league: League) {
    dispatch({
      type: 'Set League',
      payload: league
    })
  }

  return (
    <DeleteLeagueContext.Provider value={{
      ...state,
      setLeagueProp,
      deleteLeague,
      setLeague,
    }}>
      {children}
    </DeleteLeagueContext.Provider>
  )
}

function useDeleteLeaguesState() {
  const context = useContext(DeleteLeagueContext);
  if (context === undefined) {
    throw new Error('UseDeleteLeagueState debe ser usado con un DeleteLeagueProvider');
  }
  return context;
}

export { DeleteLeagueProvider, useDeleteLeaguesState }
