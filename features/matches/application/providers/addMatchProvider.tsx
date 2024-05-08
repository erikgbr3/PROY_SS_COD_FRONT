import React from 'react';
import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Match from "../../domain/entities/match";
import MatchesRepositoryImp from "../../infraestructure/repositories/matchesRepositoryImp";
import MatchesDatasourceImp from "../../infraestructure/datasources/matchesDatasourceImp";
import Club from "../../domain/entities/club";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  message?: string,
  match: Match,
  homeTeamName: string,
  visitorTeamName: string,
  clubs: Club[]

  setMatchProp: (property: string, value: any) => void,
  saveMatch: () => void,

}

const AddMatchContext = createContext({} as ContextDefinition);

interface AddMatchState {
  loading: boolean,
  saving: boolean,
  message?: string,
  match: Match, 
  homeTeamName: string,
  visitorTeamName: string,

}

type AddMatchActionType = 
{ type: 'Set Loading', payload: boolean } 
| { type: 'Set Saving', payload: boolean }
| { type: 'Set Match', payload: Match }
| { type: 'Set HomeTeamName', payload: string}
| { type: 'Set VisitorTeamName', payload: string};

const InitialState : AddMatchState = {
  loading: false,
  saving: false,
  message: undefined,
  match: new Match(
    0,
    0, 
    '',
    '',
    0,
    undefined,
    undefined,
    undefined,
    0,
    0
  ),
  homeTeamName: '',
  visitorTeamName: '',
}


function AddMatchReducer(
  state: AddMatchState,
  action: AddMatchActionType) {
      switch (action.type) {
          case 'Set Loading':
              return { ...state, loading: action.payload};

          case 'Set Saving':
              return {
                  ...state,
                  saving: action.payload,
              }
          case 'Set Match':
            return {
              ...state,
              match: action.payload,

            }

          case 'Set HomeTeamName':
            return{
              ...state,
              homeTeamName: action.payload,
            }

          case "Set VisitorTeamName":
            return{
              ...state,
              visitorTeamName: action.payload,
            }
      
          default:
              return state;
      }
  }

  type Props = {
    children?: ReactNode,
    clubs: Club[],
}

const AddMatchProvider : FC<Props> = ({children, clubs}) => {
  console.log('Clubs in AddMatchProvider:', clubs);
    const [state, dispatch] = useReducer( AddMatchReducer, InitialState );

    function setMatchProp(property: string, value: any) {

      if (property === 'homeTeamName') {
        // Actualiza homeTeamName
        dispatch({
          type: 'Set HomeTeamName',
          payload: value,
        });
      }

      if (property === 'visitorTeamName') {
        // Actualiza homeTeamName
        dispatch({
          type: 'Set VisitorTeamName',
          payload: value,
        });
      }

      dispatch({
        type: 'Set Match',
        payload: {
          ...state.match,
          [property]: value,
        }
      })
    }

    async function saveMatch() {
      const matchesRepository = new MatchesRepositoryImp(
        new MatchesDatasourceImp()
      ); 
      
      try {
        dispatch({
          type: 'Set Saving',
          payload: true,
        });

        if (!state.match.homeTeamId) {
          // Equipo local no tiene an ID, so you should check if clubs is defined
          if (clubs) {
            const selectedClub = clubs.find((club) => club.name === state.homeTeamName);
    
            if (selectedClub) {
              state.match.homeTeamId = selectedClub.id;
            } else {
              console.error('Club no encontrado');
              return;
            }
          } else {
            console.error('Clubs is undefined');
            return;
          }
        }

        if (!state.match.visitorTeamId) {
          // Same check for visitorTeamName
          if (clubs) {
            const selectedClub = clubs.find((club) => club.name === state.visitorTeamName);
    
            if (selectedClub) {
              state.match.visitorTeamId = selectedClub.id;
            } else {
              console.error('Club no encontrado');
              return;
            }
          } else {
            console.error('Clubs is undefined');
            return;
          }
        }

        const savedMatch = await matchesRepository.addMatch(state.match);
        console.log(savedMatch);

        dispatch({
          type: 'Set Saving',
          payload: false,
        });
      } catch (error) {
        console.error('Error al guardar el partido:', error);
        dispatch({
          type: 'Set Saving',
          payload: false,
        });
      }

      
    }

    return(
        <AddMatchContext.Provider value={{
            ...state,
            clubs,
            setMatchProp,
            saveMatch,
        }}>
            {children}
        </AddMatchContext.Provider>
    )
}

function useAddMatchState() {
    const context = useContext(AddMatchContext);
    if( context === undefined) {
        throw new Error ("useMatchSate debe ser usado" + " con un AddMatchProvider");
    }

    console.log('Clubs in useAddMatchState:', context.clubs);
    
    return context;
}

export {AddMatchProvider, useAddMatchState};