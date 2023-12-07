import React, { createContext, ReactNode, FC, useReducer, useContext } from "react";
import Club from "../../domain/entities/club";
import ClubsRepositoryImp from "../../infraestructure/repositories/clubsRepositoryImp";
import ClubsDatasourceImp from "../../infraestructure/datasources/clubsDatasourceImp";
import { Alert } from "react-native";
import ClubsResult from "../../domain/entities/clubsResult";
import { useAuthState } from "../../../auth/application/providers/authProvider";

interface ContextDefinition{
    loading: boolean,
    saving: boolean,
    success: boolean,
    message: string | null,
    club: Club,
    clubs: Club[],
    errors: any,
    setClubProp: (property: string, value: any) => void,
    saveClub:(onSaved:Function) => void,
    setClub: (club:Club)=>void,
  }
  
  const EditClubContext = createContext({} as ContextDefinition);
  
  interface EditClubState{
    loading:boolean,
    success: boolean,
    saving: boolean,
    message: string | null,
    club: Club,
    clubs: Club[],
    errors: any
  }
  
  type EditClubActionType = 
  {type: 'set Loading', payload: boolean}
  | {type: 'set Saving', payload: boolean}
  | {type: 'set Club', payload: Club}
  | {type: 'set Data', payload: ClubsResult }
  | {type: 'set Message', payload: string | null}
  | {type: 'set Errors', payload: any}
  | {
    type: 'set Success', payload: {
      success: boolean,
      club?: Club,
      message: string
    }
  }; 
  
  
  const initialState : EditClubState = {
    loading: false,
    success: false,
    saving: false,
    message: null,
    clubs: [],
    club: new Club('','',undefined),
    errors: {},
  };
  
  function EditClubReducer(state: EditClubState, action: EditClubActionType){
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
          club: action.payload
        };
      case 'set Data':
        return {
          ...state,
          clubs: action.payload.clubs,
          loading: false,
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
        };
      case 'set Success':
        return {
          ...state,
          success: action.payload.success,
          message: action.payload.message,
          saving: false,
        };  
      default: 
        return state
    }
  }
  
  type Props = {
    children?: ReactNode;
  };
  
  const EditClubProvider:FC<Props> = ({children}) => {
    const { user } = useAuthState();
    const {token} = useAuthState();
    console.log(user);
    initialState.club = new Club('', '', undefined, user.id || 0);
    const [state, dispatch] = useReducer(EditClubReducer, initialState);
  
    function setClubProp(property: string, value: any){
      dispatch({
        type: 'set Club',
        payload:{
          ...state.club,
          [property]: value,
        }
      })
    }
  
    async function saveClub(onSaved:Function){
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

        if (result.club) {
          dispatch({
            type: 'set Success',
            payload: {
              success: true,
              message: result.message,
            }
          })  
        
        dispatch({
          type: 'set Message',
          payload: result.message,
        });

      const updatedClubs = [...state.clubs, result.club]; // Agregar club al array actual
        dispatch({
          type: 'set Data',
          payload: { clubs: updatedClubs }
        });

      dispatch({
        type: 'set Club',
        payload: initialState.club
      })
    }
  
        let errors:any = {};
        result.errors?.forEach((item) =>{
          errors[item.field] = item.error;
        })
  
        dispatch({
          type: 'set Errors',
          payload: errors
        })
    
        //Mostrar alerta con el mensaje del estado
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

      return;
    }
    // async function saveClub(onSaved: Function) {
    //   const repository = new ClubsRepositoryImp(
    //     new ClubsDatasourceImp()
    //   );
    //   dispatch({
    //     type: 'set Saving',
    //     payload: true,
    //   })
  
    //   const result = await repository.editClub(id || 0, state.club);
    //   console.log("result Editar", state.club.id);
    //   console.log("result", result);
  
    //   onSaved(state.club);
  
  
    //   let errors: any = {};
    //   result.errors?.forEach((item) => {
    //     errors[item.field] = item.error;
    //   });
  
    //   dispatch({
    //     type: 'set Errors',
    //     payload: {
    //       message: result.message,
    //       errors,
    //     }
    //   });
    // }

    function setClub(club:Club){
        dispatch({
            type: 'set Club',
            payload: club
          });
    }
    
    return(
      <EditClubContext.Provider value={{
        ...state,
        setClubProp,
        saveClub,
        setClub
      }}>
        {children}
      </EditClubContext.Provider>
    )
  
  }
  
  function useEditClubState(){
    const context = useContext(EditClubContext);
    if(context === undefined){
      throw new Error("UseEditClubState debe ser usado");
    }
    return context;
  }
  
  export {EditClubProvider, useEditClubState}
  
  