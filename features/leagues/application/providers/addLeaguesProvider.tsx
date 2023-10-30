import { FC, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import League from "../../domain/entities/league";
import leaguesRepositoryImp from "../../infraestructure/repositories/leaguesRepositoryImp";
import leaguesDatasourceImp from "../../infraestructure/datasources/leaguesDatasourceImp";
import { Alert } from "react-native";

interface ContextDefinition{
  loading: boolean,
  saving: boolean,
  message: string | null,
  league: League,
  errors: any,
  setLeagueProp: (property: string, value: any) => void,
  saveLeague:() => void,
}

const AddLeaguesContext = createContext({} as ContextDefinition);

interface AddLeaguesState{
  loading:boolean,
  saving: boolean,
  message: string | null,
  league: League,
  errors: any
}

type AddLeaguesActionType = 
{type: 'set Loading', payload: boolean}
| {type: 'set Saving', payload: boolean}
| {type: 'set League', payload: League}
| {type: 'set Message', payload: string | null}
| {type: 'set Errors', payload: any};


const initialState : AddLeaguesState = {
  loading: false,
  saving: false,
  message: null,
  league: new League('','','','','',2),
  errors: {},
};

function AddLeaguesReducer(state: AddLeaguesState, action: AddLeaguesActionType){
  switch(action.type){
    case 'set Loading':
      return {...state, loading: action.payload}
    case 'set Saving': 
      return{
        ...state,
        saving: action.payload,
      };
    case 'set League':
      return {
        ...state,
        league: action.payload
      };
    case 'set Message':
      return{
        ...state, 
        message: action.payload
      };
    case 'set Errors':
      return{
        ...state,
        errors: action.payload || {}
      }
    default: 
      return state
  }
}

type Props = {
  children?: ReactNode;
};

const AddLeaguesProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(AddLeaguesReducer, initialState);

  function setLeagueProp(property: string, value: any){
    dispatch({
      type: 'set League',
      payload:{
        ...state.league,
        [property]: value,
      }
    })
  }

  async function saveLeague(){
    //enviar los datos al backend
    const repository = new leaguesRepositoryImp(
      new leaguesDatasourceImp()
    );

    dispatch({
      type: 'set Saving',
      payload: true,
    });
      const result = await repository.addLeague(state.league);
      console.log("provider", result);
      
      dispatch({
        type: 'set Message',
        payload: result.message,
      });

      let errors:any = {};
      result.errors?.forEach((item) =>{
        errors[item.field] = item.error;
      })

      dispatch({
        type: 'set Errors',
        payload: errors
      })
  
      // Mostrar alerta con el mensaje del estado
      Alert.alert('Mensaje', result.message, [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => console.log('OK Pressed')},
      ]);
    
      dispatch({
        type: 'set Saving',
        payload: false,
      });
  }
  
  return(
    <AddLeaguesContext.Provider value={{
      ...state,
      setLeagueProp,
      saveLeague
    }}>
      {children}
    </AddLeaguesContext.Provider>
  )

}

function useAddLeaguesState(){
  const context = useContext(AddLeaguesContext);
  if(context === undefined){
    throw new Error("UseAddLeaguesState debe ser usado");
  }
  return context;
}

export {AddLeaguesProvider, useAddLeaguesState}

