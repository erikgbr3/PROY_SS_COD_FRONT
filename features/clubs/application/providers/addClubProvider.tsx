import React, { createContext, ReactNode, FC, useReducer, useContext } from "react";
import Club from "../../domain/entities/club";
import ClubsRepositoryImp from "../../infraestructure/repositories/clubsRepositoryImp";
import ClubsDatasourceImp from "../../infraestructure/datasources/clubsDatasourceImp";
import { Alert } from "react-native";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import ClubsResult from "../../domain/entities/clubsResult";

interface ContextDefinition{
    loading: boolean,
    success: boolean,
    saving: boolean,
    message: string | null,
    club: Club,
    clubs: Club[],
    errors: any,
    clubsSelected: Club | null,  
    clubSelected: Club | null,
    clubSelectedDeleted: Club | null,

    setClubProp: (property: string, value: any) => void,
    saveClub:() => void,
    getClubs:() => void,
    setClubSelected:(club: Club | null)=>void,
    onUpdatedClub:(club:Club) => void,
    setClubSelectedDeleted: (club: Club | null) => void,
    onDeleteClub: (club: Club) => void,
  }
  
  const AddClubContext = createContext({} as ContextDefinition);
  
  interface AddClubState{
    loading:boolean,
    saving: boolean,
    success: boolean,
    message: string | null,
    club: Club,
    clubs: Club[],
    errors: any,
    clubsSelected: Club | null,
    clubSelected: Club | null,
    clubSelectedDeleted: Club | null,
  }
  
  type AddClubActionType = 
  {type: 'set Loading', payload: boolean}
  | {type: 'set Saving', payload: boolean}
  | { type: 'set Club Selected', payload: Club | null }
  | { type: 'set Club Selected Deleted', payload: Club | null }
  | {type: 'set Club', payload: Club}
  | {type: 'set Data', payload: ClubsResult }
  | {type: 'set Message', payload: string | null}
  | {type: 'set Errors', payload: any}
  | {type: 'Set Club Selected', payload: Club | null}
  | {
    type: 'set Success', payload: {
      success: boolean,
      club?: Club,
      message: string
    }
  };
  
  
  const initialState : AddClubState = {
    loading: false,
    saving: false,
    success: false,
    message: null,
    clubSelected: null,
    clubSelectedDeleted: null,
    club: new Club('','',undefined),
    clubs: [],
    errors: {},
    clubsSelected: null,
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
      case 'Set Club Selected':
        return {
            ...state,
            clubsSelected: action.payload,
        };
      case 'set Club Selected':
        return {
          ...state,
          clubSelected: action.payload
        }
      case 'set Club Selected Deleted':
        return {
          ...state,
          clubSelectedDeleted: action.payload
        }  
      default: 
        return state
    }
  }
  
  type Props = {
    children?: ReactNode;
  };
  
  const AddClubProvider:FC<Props> = ({children}) => {

    const { user } = useAuthState();
    const {token} = useAuthState();
    console.log(user);
    initialState.club = new Club('', '', undefined, user.id || 0);
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

        const updatedClubs = [...state.clubs, result.club]; // Agregar la liga al array actual
      // dispatch({
      //   type: 'set Data',
      //   payload: { clubs: updatedClubs }
      // });

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
    
        // Mostrar alerta con el mensaje del estado
        // Alert.alert('Mensaje', result.message, [
        //   {
        //     text: 'Cancelar',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        //   },
        //   {text: 'Aceptar', onPress: () => console.log('OK Pressed')},
        // ]);
      
        dispatch({
          type: 'set Saving',
          payload: false,
        });
        return;
    }
      async function getClubs(){    
        const repository = new ClubsRepositoryImp(
          new ClubsDatasourceImp()
        );

        dispatch({
          type: 'set Loading',
          payload: true
        });
    
        console.log("este es el token",token);
        const apiResult = await repository.getClubsAdmin(token);
        console.log("Api",apiResult);
        
    
        dispatch({
          type: 'set Data',
          payload: apiResult
        });
      }

      function setClubSelected (club: Club | null){
        console.log(club);
        dispatch({
            type: 'Set Club Selected',
            payload: club,
        });
    }

    function setClubSelectedDeleted(club: Club | null) {
      console.log("Liga a Eliminar", club);
      dispatch({
        type: 'set Club Selected Deleted',
        payload: club
      })
    }

    function onUpdatedClub(club: Club) {
      const clubsClone = [...state.clubs]
      const index = clubsClone.findIndex((item) => item.id == club.id);
      clubsClone.splice(index, 1, club)
      dispatch({
        type: 'set Data',
        payload: {
          clubs: clubsClone,
        }
      });
      setClubSelected(null)
    }

    function onDeleteClub(club: Club){
      const clubsClone = [...state.clubs]
      const index = clubsClone.findIndex((item) => item.id == club.id);
      if (index !== -1) {
        clubsClone.splice(index, 1);
        dispatch({
          type: 'set Data',
          payload: {
            clubs: clubsClone,
          },
        });
      }
      setClubSelected(null)
    }
    return(

      <AddClubContext.Provider value={{
        ...state,
        setClubProp,
        saveClub,
        getClubs,
        setClubSelected,
        setClubSelectedDeleted,
        onUpdatedClub,
        onDeleteClub,
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
  
  