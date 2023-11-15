import { createContext, ReactNode, FC, useReducer, useContext } from "react";
import Club from "../../domain/entities/club";
import ClubsRepositoryImp from "../../infraestructure/repositories/clubsRepositoryImp";
import ClubsDatasourceImp from "../../infraestructure/datasources/clubsDatasourceImp";
import { Alert } from "react-native";

interface ContextDefinition{
    loading: boolean,
    saving: boolean,
    message: string | null,
    club: Club,
    errors: any,
    setClubProp: (property: string, value: any) => void,
    saveClub:() => void,
  }
  
  const AddClubContext = createContext({} as ContextDefinition);
  
  interface AddClubState{
    loading:boolean,
    saving: boolean,
    message: string | null,
    club: Club,
    errors: any
  }
  
  type AddClubActionType = 
  {type: 'set Loading', payload: boolean}
  | {type: 'set Saving', payload: boolean}
  | {type: 'set Club', payload: Club}
  | {type: 'set Message', payload: string | null}
  | {type: 'set Errors', payload: any};
  
  
  const initialState : AddClubState = {
    loading: false,
    saving: false,
    message: null,
    club: new Club('','',0,0, undefined),
    errors: {},
  };
  
  function AddClubReducer(state: AddClubState, action: AddClubActionType){
    switch(action.type){
      case 'set Loading':
        return {...state, loading: action.payload}
      case 'set Saving': 
        return{
          ...state,
          saving: action.payload
        };
      case 'set Club':
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
  
  const AddClubProvider:FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(AddClubReducer, initialState);
  
    function setClubProp(property: string, value: any){
      dispatch({
        type: 'set Club',
        payload:{
          ...state.club,
          [property]: value,
        }
      })
    }
  
    async function saveClub(){
      //enviar los datos al backend
      const repository = new ClubsRepositoryImp(
        new ClubsDatasourceImp()
      );
  
      dispatch({
        type: 'set Saving',
        payload: true,
      });
        const result = await repository.addClub(state.club);
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
      <AddClubContext.Provider value={{
        ...state,
        setClubProp,
        saveClub
      }}>
        {children}
      </AddClubContext.Provider>
    )
  
  }
  
  function useAddClubState(){
    const context = useContext(AddClubContext);
    if(context === undefined){
      throw new Error("UseAddClubState debe ser usado");
    }
    return context;
  }
  
  export {AddClubProvider, useAddClubState}
  
  