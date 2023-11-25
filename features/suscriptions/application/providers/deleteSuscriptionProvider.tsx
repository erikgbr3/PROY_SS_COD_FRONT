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
  deleteSuscription: (onDeleted: Function) => void,
  setSuscription: (suscription: Suscription) => void,
}

const DeleteSuscriptionContext = createContext({} as ContextDefinition);

interface DeleteSuscripttionState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  suscription: Suscription,
  errors: any,
}

type DeleteSuscriptionActionType = 
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

const initialState: DeleteSuscripttionState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  suscription: new Suscription(
    0,
    0,
    undefined,
  ),
  errors: {},
}

function DeleteSuscriptionReducer(
  state: DeleteSuscripttionState,
  action: DeleteSuscriptionActionType
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

const DeleteSuscriptionProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(DeleteSuscriptionReducer, initialState);
  
  function setSuscriptionProp(property: string, value: any) {
    dispatch({
      type: 'Set Suscription',
      payload: {
        ...state.suscription,
        [property]: value,
      }
    });
  }

  async function deleteSuscription(onDeleted: Function) {
    const SuscriptionRepository = new SuscriptionRepositoryImp(
      new SuscriptionDatasourceImp
    )
    dispatch({
      type: 'Set Saving',
      payload: true,
    });

    const result = await SuscriptionRepository.DeleteSuscription(state.suscription);
    if (result.suscription) {
      dispatch({
        type: 'Set Success',
        payload: {
          success: true,
          suscription: result.suscription,
          message: result.message,
        }
      });

      onDeleted(state.suscription);
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

  function setSuscription(suscription: Suscription){
    dispatch({
      type: 'Set Suscription',
      payload: suscription,
    })
  }

  return (
    <DeleteSuscriptionContext.Provider value={{
      ...state,
      setSuscriptionProp,
      deleteSuscription,
      setSuscription,
    }}
    >
      {children}
    </DeleteSuscriptionContext.Provider>
  );
}

function useDeleteSuscriptionState() {
  const context = useContext(DeleteSuscriptionContext);
  if (context === undefined) {
    throw new Error("useDeleteSuscriptionState debe ser usado " + " con un DeleteSuscriptionProvider");
  }
  return context;
}

export { DeleteSuscriptionProvider, useDeleteSuscriptionState};