import React from 'react';
import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Match from "../../domain/entities/match";
import MatchResult from "../../domain/entities/matchResult";
import MatchesRepositoryImp from "../../infraestructure/repositories/matchesRepositoryImp";
import MatchesDatasourceImp from "../../infraestructure/datasources/matchesDatasourceImp";
import { useAuthState } from '../../../auth/application/providers/authProvider';

interface ContextDefinition {
    loading: boolean,
    matches: Match[],
    matchSelected: Match | null,
    matchSelectedDeleted: Match | null

    getMatches: () => void,
    setMatchSelected: (match: Match | null) => void,
    setMatchSelectedDeleted: (match: Match | null) => void,
    onUpdatedMatch: (match: Match) => void,
    onDeleteMatch: (match: Match) => void,
}

const MatchesRefereeContext = createContext({} as ContextDefinition);

interface MatchesRefereeState {
    loading: boolean,
    matches: Match[], 
    matchSelected: Match | null,
    matchSelectedDeleted: Match | null,
}

type MatchesActionType = 
{ type: 'Set Loading', payload: boolean } 
| { type: 'Set Data', payload: MatchResult }
| { type: 'Set Match Selected', payload: Match | null}
| { type: 'Set Match Selected Deleted', payload: Match | null}
;

const InitialState : MatchesRefereeState = {
    loading: false,
    matches: [],
    matchSelected: null,
    matchSelectedDeleted: null,
}

function matchesRefereeReducer(
    state: MatchesRefereeState,
    action: MatchesActionType) {
        switch (action.type) {
            case 'Set Loading':
                return { ...state, loading: action.payload};

            case 'Set Data':
                return {
                    ...state,
                    matches: action.payload.matches,
                    loading: false,
                };

            case 'Set Match Selected':
                return {
                    ...state,
                    matchSelected: action.payload,
                };
            
            case 'Set Match Selected Deleted':
                return {
                    ...state,
                    matchSelectedDeleted: action.payload
                }
        
            default:
                return state;
        }
    }

type Props = {
    children?: ReactNode
}

const MatchesRefereeProvider : FC<Props> = ({children}) => {
  const { token } = useAuthState();
    const [state, dispatch] = useReducer( matchesRefereeReducer, InitialState );

    const getMatches = async () => {
        const repository = new MatchesRepositoryImp(
            new MatchesDatasourceImp()
        );

        dispatch({
            type: 'Set Loading',
            payload: true,
        })

        const apiResult = await repository.getMatchesReferee(token);
        console.log("refe", apiResult);
        console.log("tok", token);
        
        

        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    }

    function setMatchSelected (match: Match | null) {
        console.log(match);
        
        dispatch({
            type: 'Set Match Selected',
            payload: match,
        });
    }

    function setMatchSelectedDeleted(match: Match | null) {
        console.log("Partido a eliminar", match);
        dispatch({
            type: 'Set Match Selected Deleted',
            payload: match
        })
    }

    function onUpdatedMatch(match: Match) {
        const matchesClone = [...state.matches];
        const index = matchesClone.findIndex((item) => item.id == match.id);
        matchesClone.splice(index, 1, match);

        dispatch({
            type: 'Set Data',
            payload: {
                matches: matchesClone,
            }
        });

        setMatchSelected(null);
    }

    function onDeleteMatch(match: Match) {
        const matchesClone = state.matches.filter(item => item.id !== match.id);
    
        dispatch({
            type: 'Set Data',
            payload: {
                matches: matchesClone,
            }
        });
    
        setMatchSelectedDeleted(null);
    }

    return(
        <MatchesRefereeContext.Provider value={{
            ...state,

            getMatches,
            setMatchSelected,
            setMatchSelectedDeleted,
            onUpdatedMatch,
            onDeleteMatch
        }}>
            {children}
        </MatchesRefereeContext.Provider>
    )
}

function useMatchesRefereeState() {
    const context = useContext(MatchesRefereeContext);
    if( context === undefined) {
        throw new Error ("useMatchesSate debe ser usado" + " con un MatchesRefereeProvider");
    }

    return context;
}

export {MatchesRefereeProvider, useMatchesRefereeState};