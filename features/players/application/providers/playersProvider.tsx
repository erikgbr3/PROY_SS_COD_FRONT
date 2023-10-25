import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Player from "../../domain/entities/player";
import PlayerResult from "../../domain/entities/playerResult";
import PlayersRepositoryImp from "../../infraestructure/repositories/playersRepositoryImp";
import PlayersDatasourceImp from "../../infraestructure/datasources/playersDataSourceImp";

interface ContextDefinition {
    loading: boolean,
    players: Player[],

    getPlayers: () => void,
}

const PlayersContext = createContext({} as ContextDefinition);

interface PlayersState {
    loading: boolean,
    players: Player[],
}

type PlayersActionType = 
{ type: 'Set Loading', payload: boolean } 
| { type: 'Set Data', payload: PlayerResult };

const InitialState : PlayersState = {
    loading: false,
    players: [],
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
        
            default:
                return state;
        }
    }

type Props = {
    children?: ReactNode
}

const PlayersProvider : FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer( PlayersReducer, InitialState );

    const getPlayers = async () => {
        const repository = new PlayersRepositoryImp(
            new PlayersDatasourceImp()
        );

        dispatch({
            type: 'Set Loading',
            payload: true,
        })

        const apiResult = await repository.getPlayers();

        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    }

    return(
        <PlayersContext.Provider value={{
            ...state,

            getPlayers,
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