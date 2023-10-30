//manejo de estado para personajes

import { FC, ReactNode, createContext, useReducer, useContext, useEffect} from "react";
import Club from "../../domain/entities/club";
import ClubsResult from "../../domain/entities/clubsResult";
import MatchesRepositoryImp from "../../infraestructure/repositories/matchesRepositoryImp";
import MatchesDatasourceImp from "../../infraestructure/datasources/matchesDatasourceImp";

//estructura decontext

interface ContextDefinition{
    loading:  boolean,
    clubs:Club[],

    getClubs:()=>void;
}

const clubsContext = createContext ( {} as ContextDefinition);


interface ClubsState {
    loading:  boolean,
    clubs : Club[],
}

//definir los tipos de acciones que podra ejecutar el context

type ClubsActionType = 
{ type: 'Set Loading', payload: boolean}
| {type: 'Set Data', payload: ClubsResult}
    
//iniciar el state

const InitialState : ClubsState = {
    
    loading:  false,
    clubs: [],
}

function clubReducer(
    state: ClubsState,
    action: ClubsActionType){
        switch (action.type){
            case 'Set Loading':
                return{...state, loading: action.payload};
            case 'Set Data':
                return {
                    ...state,
                    clubs:action.payload.club,
                    loading: false
                }
                default:
                    return state;
        }
}
    //implementar el proveedor para Characters

type Props = {
        children?: ReactNode
}

const ClubsProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( clubReducer, InitialState);

    const getClubs = async () => {
        try {
            const reposirtory = new MatchesRepositoryImp(new MatchesDatasourceImp());
      
            dispatch({
              type: 'Set Loading',
              payload: true,
            });
      
            const apiResult = await reposirtory.getClubs();
            console.log('Clubs in ClubsProvider:', apiResult); // Agrega esta línea para depuración
      
            dispatch({
              type: 'Set Data',
              payload: apiResult,
            });
          } catch (error) {
            console.error('Error fetching clubs:', error);
            // Resto del código
          }
    };

    useEffect(() => {
        getClubs();
    }, []);

    return(
        <clubsContext.Provider value ={{
            ...state,
            getClubs
        }}>
        {children}
        </clubsContext.Provider>
    )
};

    function useClubsState(){
        const context = useContext(clubsContext);
        if(context === undefined){
            throw new Error ("useClubsState debe ser usado" + "con un clubsProvider");
        }

        return context;
    }

export {ClubsProvider, useClubsState}