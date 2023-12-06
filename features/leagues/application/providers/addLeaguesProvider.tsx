import React, { FC, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import League from "../../domain/entities/league";
import leaguesRepositoryImp from "../../infraestructure/repositories/leaguesRepositoryImp";
import leaguesDatasourceImp from "../../infraestructure/datasources/leaguesDatasourceImp";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import LeaguesResult from "../../domain/entities/leaguesResult";


interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string,
  league: League,
  leagueSelected: League | null,
  leagueSelectedDeleted: League | null,
  leagues: League[],
  errors: any,
  getLeagues: () => void,
  setLeagueProp: (property: string, value: any) => void,
  setLeagueSelected: (league: League | null) => void,
  setLeagueSelectedDeleted: (league: League | null) => void,
  saveLeague: () => void,
  onUpdatedLeague: (league: League) => void,
  onDeleteLeague: (league: League) => void,
}

const AddLeaguesContext = createContext({} as ContextDefinition);

interface AddLeaguesState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string,
  league: League,
  leagueSelected: League | null,
  leagueSelectedDeleted: League | null,
  leagues: League[],
  errors: any
}

type AddLeaguesActionType =
  { type: 'set Loading', payload: boolean }
  | { type: 'set Saving', payload: boolean }
  | { type: 'set League', payload: League }
  | { type: 'set League Selected', payload: League | null }
  | { type: 'set League Selected Deleted', payload: League | null }
  | { type: 'set Data', payload: LeaguesResult }
  | { type: 'set Message', payload: string | undefined }
  | { type: 'set Errors', payload: any }
  | {
    type: 'set Success', payload: {
      success: boolean,
      league?: League,
      message: string
    }
  };


const initialState: AddLeaguesState = {
  loading: false,
  saving: false,
  success: false,
  message: '',
  league: new League('', '', '', '', '', 2),
  leagueSelected: null,
  leagueSelectedDeleted: null,
  leagues: [],
  errors: {},
};



function AddLeaguesReducer(state: AddLeaguesState, action: AddLeaguesActionType) {
  switch (action.type) {
    case 'set Loading':
      return { ...state, loading: action.payload }
    case 'set Saving':
      return {
        ...state,
        saving: action.payload,
      };
    case 'set League':
      return {
        ...state,
        league: action.payload
      };
    case 'set Data':
      return {
        ...state,
        leagues: action.payload.leagues,
        loading: false,
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
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        saving: false,
      }
    case 'set League Selected':
      return {
        ...state,
        leagueSelected: action.payload
      }
    case 'set League Selected Deleted':
      return {
        ...state,
        leagueSelectedDeleted: action.payload
      }
    default:
      return state
  }
}

type Props = {
  children?: ReactNode;
};

const AddLeaguesProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthState();
  const { token } = useAuthState();
  initialState.league = new League('', '', '', '', '', user.id || 0);

  const [state, dispatch] = useReducer(AddLeaguesReducer, initialState);
  function setLeagueProp(property: string, value: any) {
    dispatch({
      type: 'set League',
      payload: {
        ...state.league,
        [property]: value,
      }
    })
  }

  async function saveLeague() {
    //enviar los datos al backend
    const repository = new leaguesRepositoryImp(
      new leaguesDatasourceImp()
    );

    dispatch({
      type: 'set Saving',
      payload: true,
    });
    const result = await repository.addLeague(state.league);
    if (result.league) {
      dispatch({
        type: 'set Success',
        payload: {
          success: true,
          message: result.message,
        }
      })

      dispatch({
        type: 'set Message',
        payload: result.message,
      });

      const updatedLeagues = [...state.leagues, result.league]; // Agregar la liga al array actual
      dispatch({
        type: 'set Data',
        payload: { leagues: updatedLeagues }
      });

      dispatch({
        type: 'set League',
        payload: initialState.league
      })
    }

    let errors: any = {};
    result.errors?.forEach((item) => {
      errors[item.field] = item.error;
    })

    dispatch({
      type: 'set Errors',
      payload: errors
    })

    dispatch({
      type: 'set Message',
      payload: result.message,
    });

    dispatch({
      type: 'set Saving',
      payload: false,
    });

    return;
  }

  async function getLeagues() {
    const repository = new leaguesRepositoryImp(
      new leaguesDatasourceImp()
    );

    dispatch({
      type: 'set Loading',
      payload: true
    });

    const apiResult = await repository.getLeaguesAdmin(token);

    dispatch({
      type: 'set Data',
      payload: apiResult
    });
  }

  function setLeagueSelected(league: League | null) {
    console.log("liga Elegida",league);
    dispatch({
      type: 'set League Selected',
      payload: league
    })
  }

  function setLeagueSelectedDeleted(league: League | null) {
    console.log("Liga a Eliminar", league);
    dispatch({
      type: 'set League Selected Deleted',
      payload: league
    })
  }

  function onUpdatedLeague(league: League) {
    const leaguesClone = [...state.leagues]
    const index = leaguesClone.findIndex((item) => item.id == league.id);
    leaguesClone.splice(index, 1, league)
    dispatch({
      type: 'set Data',
      payload: {
        leagues: leaguesClone,
      }
    });
    setLeagueSelected(null)
  }

  function onDeleteLeague(league: League){
    const leaguesClone = [...state.leagues]
    const index = leaguesClone.findIndex((item) => item.id == league.id);
    if (index !== -1) {
      leaguesClone.splice(index, 1);
      dispatch({
        type: 'set Data',
        payload: {
          leagues: leaguesClone,
        },
      });
    }
    setLeagueSelected(null)
  }

  return (
    <AddLeaguesContext.Provider value={{
      ...state,
      setLeagueProp,
      saveLeague,
      getLeagues,
      setLeagueSelected,
      setLeagueSelectedDeleted,
      onUpdatedLeague,
      onDeleteLeague
    }}>
      {children}
    </AddLeaguesContext.Provider>
  )

}

function useAddLeaguesState() {
  const context = useContext(AddLeaguesContext);
  if (context === undefined) {
    throw new Error("UseAddLeaguesState debe ser usado");
  }
  return context;
}

export { AddLeaguesProvider, useAddLeaguesState }

