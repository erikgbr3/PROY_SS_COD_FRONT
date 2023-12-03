import React from 'react';
import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Match from "../../domain/entities/match";
import MatchesRepositoryImp from "../../infraestructure/repositories/matchesRepositoryImp";
import MatchesDatasourceImp from "../../infraestructure/datasources/matchesDatasourceImp";
import Club from "../../domain/entities/club";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message: string | null,
  match: Match,
  homeTeamName: string,
  visitorTeamName: string,
  clubs: Club[],
  errors: any,

  setMatchProp: (property: string, value: any) => void,
  saveMatch: (onSaved: Function) => void,
  setMatch: (match: Match) => void,
}

const EditMatchContext = createContext({} as ContextDefinition);

interface EditMatchState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message: string | null,
  match: Match, 
  homeTeamName: string,
  visitorTeamName: string,
  errors: any,
}

type EditMatchActionType = 
{ type: 'Set Loading', payload: boolean } 
| { type: 'Set Saving', payload: boolean }
| { type: 'Set Success', payload: {
  success: boolean,
  match?: Match,
  message: string,
}}
| { type: 'Set Match', payload: Match }
| { type: 'Set Message', payload: string | null}
| { type: 'Set HomeTeamName', payload: string}
| { type: 'Set VisitorTeamName', payload: string}
| { type: 'Set Errors', payload: {
  message: string,
  errors: any
}}
;

const InitialState : EditMatchState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
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
  errors: {},
}


function EditMatchReducer(
  state: EditMatchState,
  action: EditMatchActionType) {
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

          case "Set Message":
              return {
                ...state,
                message: action.payload
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
    clubs: Club[],
}

const EditMatchProvider : FC<Props> = ({children, clubs}) => {
  console.log('Clubs in AddMatchProvider:', clubs);
    const [state, dispatch] = useReducer( EditMatchReducer, InitialState );

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

    async function saveMatch(onSaved: Function) {
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

        const result = await matchesRepository.addMatch(state.match);
        if(result.match) {
          dispatch({
            type: 'Set Success',
            payload: {
              success: true,
              match: result.match,
              message: result.message,
            }
          });

          onSaved(state.match)
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
        
        onSaved(state.match);

    } catch (error) {
     
      console.error('Ocurrio un error:', error);
  
      dispatch({
        type: 'Set Errors',
        payload: {
          message: 'An error occurred while saving the match.',
          errors: {}, // You might want to update this based on the actual error.
        }
      });
    }
  }

    function setMatch (match: Match) {
      dispatch({
        type: 'Set Match',
        payload: match
      })
    }

    return(
        <EditMatchContext.Provider value={{
            ...state,
            clubs,
            setMatchProp,
            saveMatch,
            setMatch,
        }}>
            {children}
        </EditMatchContext.Provider>
    )
}

function useEditMatchState() {
    const context = useContext(EditMatchContext);
    if( context === undefined) {
        throw new Error ("EditMatchSate debe ser usado" + " con un EditMatchProvider");
    }

    console.log('Clubs in useAddMatchState:', context.clubs);
    
    return context;
}

export {EditMatchProvider, useEditMatchState};