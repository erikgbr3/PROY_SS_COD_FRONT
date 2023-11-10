import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import League from "../../domain/entities/league";
import LeaguesResult from "../../domain/entities/leaguesResult";
import leaguesRepositoryImp from "../../infraestructure/repositories/leaguesRepositoryImp";
import leaguesDatasourceImp from "../../infraestructure/datasources/leaguesDatasourceImp";

interface ContextDefinition{
  loading: boolean,
  leagues: League[],
  leagueSelected: League | null,
  getLeagues:() => void;
  setLeagueSelected: (league: League | null) => void;
}

const LeaguesContext = createContext({} as ContextDefinition);

interface LeaguesState{
  loading:boolean,
  leagueSelected: League | null,
  leagues: League[]
}

type LeaguesActionType = 
{type: 'set Loading', payload: boolean}
|{type: 'set Data', payload: LeaguesResult}
|{type: 'set league selected', payload: League | null};

const initialState : LeaguesState = {
  loading:false,
  leagues: [],
  leagueSelected: null,
}

function LeaguesReducer(state: LeaguesState, action: LeaguesActionType){
  switch(action.type){
    case 'set Loading':
      return {...state, loading: action.payload}
    case 'set Data': 
      return{
        ...state,
        leagues: action.payload.leagues,
        loading: false,
      }
    case 'set league selected':
      return {
        ...state,
        leagueSelected: action.payload
       }
    default: 
      return state
  }
}

type Props = {
  children?: ReactNode;
};

const LeaguesProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(LeaguesReducer, initialState);
  
  const getLeagues = async () => {
    const repository = new leaguesRepositoryImp(
      new leaguesDatasourceImp()
    );

    dispatch({
      type: 'set Loading',
      payload: true
    });

    const apiResult = await repository.getLeagues();

    dispatch({
      type: 'set Data',
      payload: apiResult
    });
  }

  function setLeagueSelected (league: League | null){
    dispatch({
      type: 'set league selected',
      payload: league
    });
  }

  return(
    <LeaguesContext.Provider value={{
      ...state,
      getLeagues,
      setLeagueSelected,
    }}>
      {children}
    </LeaguesContext.Provider>
  )

}

function useLeaguesState(){
  const context = useContext(LeaguesContext);
  if(context === undefined){
    throw new Error("UseLeaguesState debe ser usado");
  }
  return context;
}

export {LeaguesProvider, useLeaguesState}