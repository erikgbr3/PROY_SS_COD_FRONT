import React,{ FC, ReactNode, createContext, useContext, useReducer } from "react";
import Player from "../../domain/entities/player";
import PlayerResult from "../../domain/entities/playerResult";
import PlayersRepositoryImp from "../../infraestructure/repositories/playersRepositoryImp";
import PlayersDatasourceImp from "../../infraestructure/datasources/playersDataSourceImp";

interface ContextDefinition {
    loading: boolean;
    players: Player[];
    playerSelected: Player | null;

    getPlayers: (clubId:number) => void;
    setPlayerSelected: (player: Player | null) => void;
}

const PlayersContext = createContext({} as ContextDefinition);

interface PlayersState {
    loading: boolean,
    players: Player[],
    playerSelected: Player | null,
}

type PlayersActionType = 
{ type: 'Set Loading', payload: boolean } 
| { type: 'Set Data', payload: PlayerResult }
| { type: 'Set Player Selected', payload: Player | null }
;

const InitialState : PlayersState = {
    loading: false,
    players: [],
    playerSelected: null,
}

function PlayersReducer(
    state: PlayersState,
    action: PlayersActionType) {
        switch (action.type) {
            case 'Set Loading':
                return { ...state, loading: action.payload};

            case 'Set Data':
                return {
                    ...state,
                    players: action.payload.players,
                    loading: false,
                }

            case "Set Player Selected":
                return {
                    ...state,
                    playerSelected: action.payload,
                }
        
            default:
                return state;
        }
    }

type Props = {
    children?: ReactNode
}

const PlayersProvider : FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer( PlayersReducer, InitialState );

    const getPlayers = async (clubId:number) => {
        const repository = new PlayersRepositoryImp(
            new PlayersDatasourceImp()
        );

        dispatch({
            type: 'Set Loading',
            payload: true,
        })

        const apiResult = await repository.getPlayers(clubId);

        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    }

    function setPlayerSelected (player: Player | null) {
        dispatch({
            type: 'Set Player Selected',
            payload: player,
        })
    }

    return(
        <PlayersContext.Provider value={{
            ...state,

            getPlayers,
            setPlayerSelected,
        }}>
            {children}
        </PlayersContext.Provider>
    )
}

function usePlayersState() {
    const context = useContext(PlayersContext);
    if( context === undefined) {
        throw new Error ("useMatchesSate debe ser usado" + " con un MatchesProvider");
    }

    return context;
}

export {PlayersProvider, usePlayersState};