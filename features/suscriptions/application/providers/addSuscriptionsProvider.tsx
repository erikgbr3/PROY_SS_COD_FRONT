import React, { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Suscription from "../../domain/entities/suscription";
import SuscriptionRepositoryImp from "../../infraestructure/repositories/suscriptionsRepositoryImp";
import SuscriptionDatasourceImp from "../../infraestructure/datasources/suscriptionsDatasourceImp";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  suscription: Suscription,
  errors: any,

  setSuscriptionProp: (property: string, value: any) => void,
  saveSuscription: (onSaved: Function) => void,
}

const AddSuscriptionContext = createContext({} as ContextDefinition);

interface AddSuscripttionState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  suscription: Suscription,
  errors: any,
}

type AddSuscriptionActionType = 
{type: "Set Loading"; payload: boolean}
| {type: "Set Saving"; payload: boolean}
| {type: "Set Success"; payload: {
    success: boolean,
    suscription?: Suscription,
    message: string,
  } }
| {type: "Set Suscription"; payload: Suscription}
| {type: "Set Message"; payload: string | null}
| {type: "Set Errors"; payload: {
    message: string,
    errors: any,
} };

const initialState: AddSuscripttionState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  suscription: new Suscription(
    0,
    0,
    undefined
  ),
  errors: {},
}

function AddSuscriptionReducer(
  state: AddSuscripttionState,
  action: AddSuscriptionActionType
) {
  switch (action.type) {
    case "Set Message":
      return{
        ...state,
        message: action.payload
      };
    
      case "Set Loading":
        return { 
          ...state,
           loading: action.payload 
          };

      case "Set Saving":
        return {
          ...state,
          saving: action.payload,
        };

      case "Set Suscription":
        return {
          ...state,
          device: action.payload,
        };

      case "Set Errors":
        return {
          ...state,
          errors: action.payload.errors || {},
          message: action.payload.message,
          saving: false,
        };

        case "Set Success":
        return {
          ...state,
          success: action.payload.success,
          message: action.payload.message,
          errors: {},
          saving: false,
          //device: action.payload.device || state.device,
        };

      default:
        return state;
  }
}

type Props = {
  children?: ReactNode;
}

const AddSuscriptionProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(AddSuscriptionReducer, initialState);
  
  function setSuscriptionProp(property: string, value: any) {
    dispatch({
      type: 'Set Suscription',
      payload: {
        ...state.suscription,
        [property]: value,
      }
    });
  }

  async function saveSuscription(onSaved: Function) {
    const SuscriptionRepository = new SuscriptionRepositoryImp(
      new SuscriptionDatasourceImp
    )
    dispatch({
      type: 'Set Saving',
      payload: true,
    });

    const result = await SuscriptionRepository.AddSuscriptions(state.suscription);
    if (result.suscription) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          suscription: result.suscription,
          message: result.message,
        }
      });

      onSaved(state.suscription);
      return;
    }

    let errors : any = {};

    result.errors?.forEach((item) => {
      errors[item.field] = item.error;
    });

    dispatch({
      type: 'Set Errors',
      payload: {
        message: result.message,
        errors,
      }
    });

  }

  return (
    <AddSuscriptionContext.Provider value={{
      ...state,
      setSuscriptionProp,
      saveSuscription,
    }}
    >
      {children}
    </AddSuscriptionContext.Provider>
  );
}

function useAddSuscriptionState() {
  const context = useContext(AddSuscriptionContext);
  if (context === undefined) {
    throw new Error("useAddSuscriptionState debe ser usado " + " con un AddSuscriptionProvider");
  }
  return context;
}

export { AddSuscriptionProvider, useAddSuscriptionState};