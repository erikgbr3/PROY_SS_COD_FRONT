import React, { FC, ReactNode, createContext, useReducer, useContext } from "react";
import Suscription from "../../domain/entities/suscription";
import SuscriptionResult from "../../domain/entities/suscriptionResult";
import SuscriptionRepositoryImp from "../../infraestructure/repositories/suscriptionsRepositoryImp";
import SuscriptionDatasourceImp from "../../infraestructure/datasources/suscriptionsDatasourceImp";

interface ContextDefinition {
    loading: boolean,
    suscription: Suscription[],
    suscriptionSelected: Suscription | null;
    suscriptionSelectedDelete: Suscription | null;

    getSuscriptions: () => void;
    setSuscriptionSelected: (suscription: Suscription | null) => void;
    setSuscriptionDelected: (suscription: Suscription | null) => void;
    onUpdatedSuscription: (suscription: Suscription) => void;
    onSavedSuscription: (newsuscription: Suscription) => void;
    onDeleteSuscription: (suscription: Suscription) => void;
}

const SuscriptionsContext = createContext({} as ContextDefinition);

interface SuscriptionsState {
    loading: boolean,
    suscription: Suscription[],
    suscriptionSelected: Suscription | null;
    suscriptionSelectedDelete: Suscription | null;
}

type SuscriptionsActionType =
    | { type: 'Set Loading', payload: boolean }
    | { type: 'Set Data', payload: SuscriptionResult }
    | { type: 'Set Suscription Selected', payload: Suscription | null }
    | { type: 'Set Suscription Selected Deleted', payload: Suscription | null}

const initialState: SuscriptionsState = {
    loading: false,
    suscription: [],
    suscriptionSelected: null,
    suscriptionSelectedDelete: null,

}

function suscriptionsReducer(state: SuscriptionsState, action: SuscriptionsActionType) {
    switch (action.type) {
        
        case 'Set Loading':
            return { ...state, loading: action.payload }
        case 'Set Data':
            return {
                ...state,
                suscriptions: action.payload.suscriptions,
                loading: false,
                
            }
        case 'Set Suscription Selected':
            return {
                ...state,
                suscriptionSelected: action.payload,
            }
        case 'Set Suscription Selected Deleted':
            return {
                ...state,
                suscriptionSelectedDelete: action.payload,
            }

        default:
            return state;
    }
}

type Props = {
    children?: ReactNode
}

//implementar el proveedor de estado para devices
const SuscriptionsProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(suscriptionsReducer, initialState);

    //acciones
    const getSuscriptions = async () => {
        const repository = new SuscriptionRepositoryImp(
            new SuscriptionDatasourceImp()
        );

        //cambiar el state a loading
        dispatch({
            type: 'Set Loading',
            payload: true,
        });

        //llamar al repositorio  y obtener el resultado
        const apiResult = await repository.getSuscriptions();

        //mandar a establecer los datos en el estado
        dispatch({
            type: 'Set Data',
            payload: apiResult,
        });
    };
    function setSuscriptionSelected(suscription: Suscription | null) {
        //console.log(device);

        dispatch({
            type: 'Set Suscription Selected',
            payload: suscription,
        });
    }

    function setSuscriptionDelected (suscription: Suscription | null) {
        console.log("Suscription:", suscription);
        dispatch({
            type: 'Set Suscription Selected Deleted',
            payload: suscription,
        });

    }

    function onUpdatedSuscription(suscription: Suscription) {
       
        const suscriptionsClone = [...state.suscription];
        const index = suscriptionsClone.findIndex((item) => item.id == suscription.id);
        suscriptionsClone.splice(index, 1, suscription);


        dispatch({
            type: 'Set Data',
            payload: {
                suscriptions: suscriptionsClone,
            }
        });

        setSuscriptionSelected(null)
    }


    async function onSavedSuscription(){
        const repository = new SuscriptionRepositoryImp(
            new SuscriptionDatasourceImp()
        );

        dispatch({
            type: 'Set Loading',
            payload: true,
        });

        const dateOn = await repository.getSuscriptions();

        dispatch({
            type: 'Set Data',
            payload: dateOn,
        });
    };

      function onDeleteSuscription(suscription: Suscription) {
        const suscriptionsCloneDelete = [...state.suscription];
        const index = suscriptionsCloneDelete.findIndex((item) => item.id === suscription.id);
      
        if (index !== -1) {
          suscriptionsCloneDelete.splice(index, 1);
          dispatch({
            type: 'Set Data',
            payload: {
              suscriptions: suscriptionsCloneDelete,
            },
          });
        }
        
        // Cierra el modal u realiza cualquier otra acción necesaria
        // (puedes manejar esto según tus necesidades)
        setSuscriptionSelected(null);
      }
      
      


    //retornar la estructura del provider
    return (
        <SuscriptionsContext.Provider value={{
            ...state,
            getSuscriptions,
            setSuscriptionSelected,
            setSuscriptionDelected,
            onUpdatedSuscription,
            onSavedSuscription,
            onDeleteSuscription,
        }}>
            {children}
        </SuscriptionsContext.Provider>
    )
};

//para usar el provider y el state
//lo ideal es generar una funcion hook

function useSuscriptionsState() {
    const context = useContext(SuscriptionsContext);
    if (context === undefined) {
        throw new Error("useSuscriptionsState debe ser usado " +
            " con un SuscriptionsProvider");
    }
    return context;
}


export { SuscriptionsProvider, useSuscriptionsState };