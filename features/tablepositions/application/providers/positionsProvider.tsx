import React, { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Position from "../../domain/entities/tableposition";
import PositionResult from "../../domain/entities/tablePositionResult";
import { useRoute } from "@react-navigation/native";
import PositionRepositoryImp from "../../infraestructure/repositories/positionsRepositoryImp";
import PositionsDatasourceImp from "../../infraestructure/datasources/positionsDatasourceImp";

interface ContextDefinition{
  loading: boolean,
  positions: Position[],
  getPositions: (leagueId: number) => void;
}

const PositionsContext = createContext({} as ContextDefinition);

interface PositionsState{
  loading: boolean, 
  positions: Position[],
}

type PositionsActionType = 
{ type: 'set Data', payload: PositionResult}
| {type: 'set Loading', payload: boolean }

const initialState : PositionsState = {
  loading: false, 
  positions: []
}

function PositionsReducer(state: PositionsState, action: PositionsActionType){
  switch(action.type){
    case 'set Loading':
      return {
        ...state, 
        loading: action.payload}
    case "set Data":
      return{
        ...state,
        positions: action.payload.positions
      }
    default:
      return state;
  }
}

type Props = {
  children?: ReactNode;
};

const PositionsProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(PositionsReducer, initialState)
  const getPositions = async(leagueId:number) => {
    const repository = new PositionRepositoryImp(
      new PositionsDatasourceImp()
    );

    dispatch({
      type: 'set Loading',
      payload: true,
    });

    const result = await repository.getPositions(leagueId);
    dispatch({
      type:'set Data',
      payload: result
    })
  }

  return(
    <PositionsContext.Provider value={{
      ...state,
      getPositions
    }}>
      {children}
    </PositionsContext.Provider>
  )
}

function usePositionsState(){
  const context = useContext(PositionsContext);
  if(context == undefined){
    throw new Error("UseLeaguesState debe ser usado");
  }
  return context;
}

export {PositionsProvider, usePositionsState}