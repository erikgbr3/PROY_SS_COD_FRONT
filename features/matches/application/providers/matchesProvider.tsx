import React from 'react';
import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Match from "../../domain/entities/match";
import MatchResult from "../../domain/entities/matchResult";
import MatchesRepositoryImp from "../../infraestructure/repositories/matchesRepositoryImp";
import MatchesDatasourceImp from "../../infraestructure/datasources/matchesDatasourceImp";

interface ContextDefinition {
    loading: boolean,
    matches: Match[],
    matchSelected: Match | null,
    matchSelectedDeleted: Match | null

    getMatches: (leagueId: number) => void,
    setMatchSelected: (match: Match | null) => void,
    setMatchselectedDeleted: (match: Match | null) => void,
    onUpdatedMatch: (match: Match) => void,
    onDeleteMatch: (match: Match) => void,
}

const MatchesContext = createContext({} as ContextDefinition);

interface MatchesState {
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

const InitialState : MatchesState = {
    loading: false,
    matches: [],
    matchSelected: null,
    matchSelectedDeleted: null,
}

function matchesReducer(
    state: MatchesState,
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
                    matchSelectedDelete: action.payload
                }
        
            default:
                return state;
        }
    }

type Props = {
    children?: ReactNode
}

const MatchesProvider : FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer( matchesReducer, InitialState );

    const getMatches = async (leagueId: number) => {
        const repository = new MatchesRepositoryImp(
            new MatchesDatasourceImp()
        );

        dispatch({
            type: 'Set Loading',
            payload: true,
        })

        const apiResult = await repository.getMatches(leagueId);

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

    function setMatchselectedDeleted(match: Match | null) {
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

    return(
        <MatchesContext.Provider value={{
            ...state,

            getMatches,
            setMatchSelected,
            setMatchselectedDeleted,
            onUpdatedMatch,
            onDeleteMatch
        }}>
            {children}
        </MatchesContext.Provider>
    )
}

function useMatchesState() {
    const context = useContext(MatchesContext);
    if( context === undefined) {
        throw new Error ("useMatchesSate debe ser usado" + " con un MatchesProvider");
    }

    return context;
}

export {MatchesProvider, useMatchesState};