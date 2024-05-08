//manejo de estado para personajes
import React from 'react';
import { FC, ReactNode, createContext, useReducer, useContext} from "react";
import SportField from "../../domain/entities/sportfield";
import SportFieldResult from "../../domain/entities/sportFieldsResult";
import SportFieldsRepositoryImp from "../../infraestructure/repositories/sportFieldsRepositoryImp";
import SportFieldsDatasourceImp from "../../infraestructure/datasources/sportFieldsDatasourceImp";


//estructura decontext

interface ContextDefinition{
    loading:  boolean,
    sportFields: SportField[],

    getSportFields:()=>void;
}

const sportFieldsContext = createContext ( {} as ContextDefinition);


interface SportFieldsState {
    loading:  boolean,
    sportFields : SportField[],
}

//definir los tipos de acciones que podra ejecutar el context

type SportFieldsActionType = 
{ type: 'Set Loading', payload: boolean}
| {type: 'Set Data', payload: SportFieldResult}
    
//iniciar el state

const InitialState : SportFieldsState = {
    
    loading:  false,
    sportFields: [],
}

function sportFieldReducer(
    state: SportFieldsState,
    action: SportFieldsActionType){
        switch (action.type){
            case 'Set Loading':
                return{...state, loading: action.payload};
            case 'Set Data':
                return {
                    ...state,
                    sportFields:action.payload.sportField,
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

const SportFieldsProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( sportFieldReducer, InitialState);

    //acciones

    const getSportFields = async () => {
        const repository = new SportFieldsRepositoryImp(
            new SportFieldsDatasourceImp()
        );

//cambiar el estado a loaging

        dispatch({
            type: 'Set Loading',
            payload: true,
        })

        const apiResult = await repository.getSportFields();

        dispatch({
            type: 'Set Data',
            payload: apiResult,
        })
    }

    return(
        <sportFieldsContext.Provider value ={{
            ...state,
            getSportFields
        }}>
        {children}
        </sportFieldsContext.Provider>
    )
};

    function useSportFieldsState(){
        const context = useContext(sportFieldsContext);
        if(context === undefined){
            throw new Error ("useSportFieldsState debe ser usado" + "con un sportFieldsProvider");
        }

        return context;
    }

export {SportFieldsProvider, useSportFieldsState}