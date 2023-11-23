import { FC, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { Alert } from "react-native";
import SportField from "../../domain/entities/sportfield";
import SportFieldsRepositoryImp from "../../infraestructure/repositories/sportFieldsRepositoryImp";
import SportFieldsDatasourceImp from "../../infraestructure/datasources/sportFieldsDatasourceImp";

interface ContextDefinition{
  loading: boolean,
  saving: boolean,
  message: string | null,
  sportField: SportField,
  errors: any,
  setSportFieldProp: (property: string, value: any) => void,
  saveSportField:() => void,
}

const AddSportFieldContext = createContext({} as ContextDefinition);

interface AddSportFieldState{
  loading:boolean,
  saving: boolean,
  message: string | null,
  sportField: SportField,
  errors: any
}

type AddSportFieldActionType = 
{type: 'set Loading', payload: boolean}
| {type: 'set Saving', payload: boolean}
| {type: 'set SportField', payload: SportField}
| {type: 'set Message', payload: string | null}
| {type: 'set Errors', payload: any};


const initialState : AddSportFieldState = {
  loading: false,
  saving: false,
  message: null,
  sportField: new SportField('','', undefined),
  errors: {},
};

function AddSportFieldReducer(state: AddSportFieldState, action: AddSportFieldActionType){
  switch(action.type){
    case 'set Loading':
      return {...state, loading: action.payload}
    case 'set Saving': 
      return{
        ...state,
        saving: action.payload,
      };
    case 'set SportField':
      return {
        ...state,
        sportField: action.payload
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

const AddSportFieldProvider:FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(AddSportFieldReducer, initialState);

  function setSportFieldProp(property: string, value: any){
    dispatch({
      type: 'set SportField',
      payload:{
        ...state.sportField,
        [property]: value,
      }
    })
  }

  async function saveSportField(){
    //enviar los datos al backend
    const repository = new SportFieldsRepositoryImp(
      new SportFieldsDatasourceImp()
    );

    dispatch({
      type: 'set Saving',
      payload: true,
    });
      const result = await repository.addSportField(state.sportField);
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
    <AddSportFieldContext.Provider value={{
      ...state,
      setSportFieldProp,
      saveSportField
    }}>
      {children}
    </AddSportFieldContext.Provider>
  )

}

function useAddSportFieldState(){
  const context = useContext(AddSportFieldContext);
  if(context === undefined){
    throw new Error("UseAddSportFieldState debe ser usado");
  }
  return context;
}

export {AddSportFieldProvider, useAddSportFieldState}

