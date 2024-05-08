import React, { ReactNode, FC, createContext, useReducer, useContext } from "react";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import SportField from "../../domain/entities/sportfield";
import SportFieldsRepositoryImp from "../../infraestructure/repositories/sportFieldsRepositoryImp";
import SportFieldsDatasourceImp from "../../infraestructure/datasources/sportFieldsDatasourceImp";
import { useAddSportFieldsState } from "./addSportFieldProvider";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  sportField: SportField,
  errors: any,
  setSportFieldProp: (property: string, value: any) => void,
  deleteSportField: (onDeleted: Function) => void,
  setSportField: (sportField: SportField) => void,
}

const DeleteSportFieldContext = createContext({} as ContextDefinition)

interface DeleteSportFieldState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  sportField: SportField,
  errors: any
}

type DeleteSportFieldActionType =
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

const initialState: DeleteSportFieldState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  sportField: new SportField('', ''),
  errors: {}
}

function DeleteSportFieldReducer(state: DeleteSportFieldState, action: DeleteSportFieldActionType) {
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

const DeleteSportFieldProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthState();
  const { sportFieldSelected } = useAddSportFieldsState();
  const id = sportFieldSelected?.id;
  initialState.sportField = new SportField('', '', user.id || 0, );
  const [state, dispatch] = useReducer(DeleteSportFieldReducer, initialState);
  function setSportFieldProp(property: string, value: any) {
    dispatch({
      type: 'Set SportField',
      payload: {
        ...state.sportField,
        [property]: value,
      }
    })
  }

  async function deleteSportField(onDeleted: Function) {
    const repository = new SportFieldsRepositoryImp(
      new SportFieldsDatasourceImp()
    );
    dispatch({
      type: 'Set Saving',
      payload: true,
    })

    const result = await repository.deleteSportField(state.sportField);
    onDeleted(state.sportField);


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
    <DeleteSportFieldContext.Provider value={{
      ...state,
      setSportFieldProp,
      deleteSportField,
      setSportField,
    }}>
      {children}
    </DeleteSportFieldContext.Provider>
  )
}

function useDeleteSportFieldsState() {
  const context = useContext(DeleteSportFieldContext);
  if (context === undefined) {
    throw new Error('UseDeleteSportFieldState debe ser usado con un DeleteSportFieldProvider');
  }
  return context;
}

export { DeleteSportFieldProvider, useDeleteSportFieldsState }
