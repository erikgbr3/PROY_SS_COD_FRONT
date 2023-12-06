import React, { ReactNode, FC, createContext, useReducer, useContext } from "react";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import SportFieldsRepositoryImp from "../../infraestructure/repositories/sportFieldsRepositoryImp";
import SportFieldsDatasourceImp from "../../infraestructure/datasources/sportFieldsDatasourceImp";
import { useAddSportFieldsState } from "./addSportFieldProvider";
import SportField from "../../domain/entities/sportfield";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  sportField: SportField,
  errors: any,
  setSportFieldProp: (property: string, value: any) => void,
  saveSportField: (onSaved: Function) => void,
  setSportField: (sportField: SportField) => void,
}

const EditSportFieldContext = createContext({} as ContextDefinition)

interface EditSportFieldState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  sportField: SportField,
  errors: any
}

type EditSportFieldActionType =
  { type: 'Set Loading'; payload: boolean }
  | { type: 'Set Saving'; payload: boolean }
  | {
    type: 'Set Success'; payload: {
      success: boolean,
      sportField?: SportField,
      message: string
    }
  }
  | { type: 'Set SportField'; payload: SportField }
  | { type: 'Set Message'; payload: string | null }
  | {
    type: 'Set Errors'; payload: {
      message: string,
      errors: any
    }
  }

const initialState: EditSportFieldState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  sportField: new SportField('', ''),
  errors: {}
}

function EditSportFieldReducer(state: EditSportFieldState, action: EditSportFieldActionType) {
  switch (action.type) {
    case 'Set Message':
      return {
        ...state,
        message: action.payload
      }
    case 'Set Loading':
      return {
        ...state,
        loading: action.payload
      }
    case 'Set Saving':
      return {
        ...state,
        saving: action.payload
      }
    case 'Set SportField':
      return {
        ...state,
        sportField: action.payload
      }
    case 'Set Errors':
      return {
        ...state,
        errors: action.payload.errors || {},
        message: action.payload.message,
        saving: false
      }
    case 'Set Success':
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        errors: {},
        saving: false
      }
    default:
      return state
  }
}

type Props = {
  children?: ReactNode;
}

const EditSportFieldProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthState();
  const { sportFieldSelected } = useAddSportFieldsState();
  console.log("ligaSelec", sportFieldSelected?.id);
  const id = sportFieldSelected?.id;
  initialState.sportField = new SportField('', '', user.id || 0,);
  const [state, dispatch] = useReducer(EditSportFieldReducer, initialState);
  function setSportFieldProp(property: string, value: any) {
    dispatch({
      type: 'Set SportField',
      payload: {
        ...state.sportField,
        [property]: value,
      }
    })
  }

  async function saveSportField(onSaved: Function) {
    const repository = new SportFieldsRepositoryImp(
      new SportFieldsDatasourceImp()
    );
    dispatch({
      type: 'Set Saving',
      payload: true,
    })

    const result = await repository.editSportField(id || 0, state.sportField);
    console.log("result Editar", state.sportField.id);
    console.log("result", result);

    onSaved(state.sportField);


    let errors: any = {};
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

  function setSportField(sportField: SportField) {
    dispatch({
      type: 'Set SportField',
      payload: sportField
    })
  }

  return (
    <EditSportFieldContext.Provider value={{
      ...state,
      setSportFieldProp,
      saveSportField,
      setSportField,
    }}>
      {children}
    </EditSportFieldContext.Provider>
  )
}

function useEditSportFieldsState() {
  const context = useContext(EditSportFieldContext);
  if (context === undefined) {
    throw new Error('UseEditSportFieldState debe ser usado con un EditSportFieldProvider');
  }
  return context;
}

export { EditSportFieldProvider, useEditSportFieldsState }
