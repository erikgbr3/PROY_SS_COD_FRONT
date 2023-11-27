import React, { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Suscription from "../../domain/entities/suscription";
import SuscriptionRepositoryImp from "../../infraestructure/repositories/suscriptionsRepositoryImp";
import SuscriptionDatasourceImp from "../../infraestructure/datasources/suscriptionsDatasourceImp";

//definir la estructura que tendra mi context
interface ContextDefinition {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  suscription: Suscription,
  errors: any,

  // acciones que tendrá mi context
  setSuscriptionProp: (property: string, value: any) => void,
  saveSuscription: (onSaved: Function) => void,
  setSuscription: (suscription: Suscription) => void,
}

//crear el objeto context de react
const EditSuscriptionContext = createContext({} as ContextDefinition);

interface EditSuscriptionState {
  //definición del estado
  loading: boolean;
  saving: boolean,
  success: boolean,
  message?: string | null,
  suscription: Suscription,
  errors: any,
}

//definir los tipos de acciones que podra ejecutar el context / providers
type EditSuscriptionActionType =
  { type: "Set Loading"; payload: boolean }
  | { type: "Set Saving"; payload: boolean }
  | {
    type: "Set Success"; payload: {
      success: boolean,
      suscription?: Suscription,
      message: string,
    }
  }
  | { type: "Set Suscription"; payload: Suscription }
  | { type: "Set Message"; payload: string | null }
  | {
    type: "Set Errors"; payload: {
      message: string,
      errors: any,
    }
  };

//inicializar el state
const initialState: EditSuscriptionState = {
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
};

function EditSuscriptionReducer(
  state: EditSuscriptionState,
  action: EditSuscriptionActionType
) {
  switch (action.type) {
    //manipular el estado con base a las acciones
    case "Set Message":
      return {
        ...state,
        message: action.payload
      };
    case "Set Loading":
      return { ...state, loading: action.payload };
    case "Set Saving":
      return {
        ...state,
        saving: action.payload,
      }
    case "Set Suscription":
      return {
        ...state,
        suscription: action.payload,
      }
    case "Set Errors":
      return {
        ...state,
        errors: action.payload.errors || {},
        message: action.payload.message,
        saving: false,
      }
    case "Set Success":
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        errors: {},
        saving: false,
        //device: action.payload.device || state.device,
      }
    default:
      return state;
  }
};

type Props = {
  children?: ReactNode;
};

const EditSuscriptionProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EditSuscriptionReducer, initialState);

  function setSuscriptionProp(property: string, value: any) {
    // mandar el valor al estado device
    dispatch({
      type: 'Set Suscription',
      payload: {
        ...state.suscription,
        [property]: value,
      }
    });
  }


  async function saveSuscription(onSaved: Function) {
    const SuscriptionsRepository = new SuscriptionRepositoryImp(
      new SuscriptionDatasourceImp
    )
    // envir los datos al backend
    dispatch({
      type: 'Set Saving',
      payload: true,
    });

    console.log(state.suscription);


    const result = await SuscriptionsRepository.AddSuscriptions(state.suscription);
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

    let errors: any = {};

    result.errors?.forEach((item) => {
      errors[item.field] = item.error;
    });

    dispatch({
      type: 'Set Errors',
      payload: {
        message: result.message,
        errors,
      },
    });

    /*test para cerrar al guardar//quitar de acá
    
onSaved(null);*/
  }

  function setSuscription(suscription: Suscription) {
    dispatch({
      type: 'Set Suscription',
      payload: suscription
    })
  }

  return (
    <EditSuscriptionContext.Provider value={{
      ...state,

      //funciones
      setSuscriptionProp,
      saveSuscription,
      setSuscription,
    }}
    >
      {children}
    </EditSuscriptionContext.Provider>
  );
}

function useEditSuscriptionState() {
  const context = useContext(EditSuscriptionContext);
  if (context === undefined) {
    throw new Error("useEditSuscriptionState debe ser usado " + " con un EditSuscriptionProvider");
  }
  return context;
}

export { EditSuscriptionProvider, useEditSuscriptionState };


