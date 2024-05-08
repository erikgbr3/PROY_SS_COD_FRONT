import React, { FC, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import SportField from "../../domain/entities/sportfield";
import AddSportFieldsResult from "../../domain/entities/addSportFieldResult";
import SportFieldsRepositoryImp from "../../infraestructure/repositories/sportFieldsRepositoryImp";
import SportFieldsDatasourceImp from "../../infraestructure/datasources/sportFieldsDatasourceImp";
import SportFieldResult from "../../domain/entities/sportFieldsResult";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string,
  sportField: SportField,
  sportFieldSelected: SportField | null,
  sportFieldSelectedDeleted: SportField | null,
  sportFields: SportField[],
  errors: any,
  getSportFields: () => void,
  setSportFieldProp: (property: string, value: any) => void,
  setSportFieldSelected: (sportField: SportField | null) => void,
  setSportFieldSelectedDeleted: (sportField: SportField | null) => void,
  saveSportField: () => void,
  onUpdatedSportField: (sportField: SportField) => void,
  onDeleteSportField: (sportField: SportField) => void,
}

const AddSportFieldsContext = createContext({} as ContextDefinition);

interface AddSportFieldsState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string,
  sportField: SportField,
  sportFieldSelected: SportField | null,
  sportFieldSelectedDeleted: SportField | null,
  sportFields: SportField[],
  errors: any
}

type AddSportFieldsActionType =
  { type: 'set Loading', payload: boolean }
  | { type: 'set Saving', payload: boolean }
  | { type: 'set SportField', payload: SportField }
  | { type: 'set SportField Selected', payload: SportField | null }
  | { type: 'set SportField Selected Deleted', payload: SportField | null }
  | { type: 'set Data', payload: SportFieldResult }
  | { type: 'set Message', payload: string | undefined }
  | { type: 'set Errors', payload: any }
  | {
    type: 'set Success', payload: {
      success: boolean,
      sportField?: SportField,
      message: string
    }
  };


const initialState: AddSportFieldsState = {
  loading: false,
  saving: false,
  success: false,
  message: '',
  sportField: new SportField('', ''),
  sportFieldSelected: null,
  sportFieldSelectedDeleted: null,
  sportFields: [],
  errors: {},
};



function AddSportFieldsReducer(state: AddSportFieldsState, action: AddSportFieldsActionType) {
  switch (action.type) {
    case 'set Loading':
      return { ...state, loading: action.payload }
    case 'set Saving':
      return {
        ...state,
        saving: action.payload,
      };
    case 'set SportField':
      return {
        ...state,
        sportField: action.payload
      };
    case 'set Data':
      return {
        ...state,
        sportFields: action.payload.sportField,
        loading: false,
      }
    case 'set Message':
      return {
        ...state,
        message: action.payload
      };
    case 'set Errors':
      return {
        ...state,
        errors: action.payload || {}
      }
    case 'set Success':
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
        saving: false,
      }
    case 'set SportField Selected':
      return {
        ...state,
        sportFieldSelected: action.payload
      }
    case 'set SportField Selected Deleted':
      return {
        ...state,
        sportFieldSelectedDeleted: action.payload
      }
    default:
      return state
  }
}

type Props = {
  children?: ReactNode;
};

const AddSportFieldsProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthState();
  const { token } = useAuthState();
  initialState.sportField = new SportField('', '', user.id || 0);

  const [state, dispatch] = useReducer(AddSportFieldsReducer, initialState);
  function setSportFieldProp(property: string, value: any) {
    dispatch({
      type: 'set SportField',
      payload: {
        ...state.sportField,
        [property]: value,
      }
    })
  }

  async function saveSportField() {
    //enviar los datos al backend
    const repository = new SportFieldsRepositoryImp(
      new SportFieldsDatasourceImp()
    );

    dispatch({
      type: 'set Saving',
      payload: true,
    });
    const result = await repository.addSportField(state.sportField);
    if (result.sportFields) {
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

      const updatedSportFields = [...state.sportFields, result.sportFields]; // Agregar la liga al array actual
      dispatch({
        type: 'set Data',
        payload: { sportField: updatedSportFields }
      });

      dispatch({
        type: 'set SportField',
        payload: initialState.sportField
      })
    }

    let errors: any = {};
    result.errors?.forEach((item) => {
      errors[item.field] = item.error;
    })

    dispatch({
      type: 'set Errors',
      payload: errors
    })

    dispatch({
      type: 'set Message',
      payload: result.message,
    });

    dispatch({
      type: 'set Saving',
      payload: false,
    });

    return;
  }

  async function getSportFields() {
    const repository = new SportFieldsRepositoryImp(
      new SportFieldsDatasourceImp()
    );

    dispatch({
      type: 'set Loading',
      payload: true
    });

    const apiResult = await repository.getSportFields();

    dispatch({
      type: 'set Data',
      payload: apiResult
    });
  }

  function setSportFieldSelected(sportField: SportField | null) {
    console.log("campo elegido",sportField);
    dispatch({
      type: 'set SportField Selected',
      payload: sportField
    })
  }

  function setSportFieldSelectedDeleted(sportField: SportField | null) {
    console.log("campo a eliminar", sportField);
    dispatch({
      type: 'set SportField Selected Deleted',
      payload: sportField
    })
  }

  function onUpdatedSportField(sportField: SportField) {
    const sportFieldsClone = [...state.sportFields]
    const index = sportFieldsClone.findIndex((item) => item.id == sportField.id);
    sportFieldsClone.splice(index, 1, sportField)
    dispatch({
      type: 'set Data',
      payload: {
        sportField: sportFieldsClone,
      }
    });
    setSportFieldSelected(null)
  }

  function onDeleteSportField(sportField: SportField){
    const sportFieldsClone = [...state.sportFields]
    const index = sportFieldsClone.findIndex((item) => item.id == sportField.id);
    if (index !== -1) {
      sportFieldsClone.splice(index, 1);
      dispatch({
        type: 'set Data',
        payload: {
          sportField: sportFieldsClone,
        },
      });
    }
    setSportFieldSelected(null)
  }

  return (
    <AddSportFieldsContext.Provider value={{
      ...state,
      setSportFieldProp,
      saveSportField,
      getSportFields,
      setSportFieldSelected,
      setSportFieldSelectedDeleted,
      onUpdatedSportField,
      onDeleteSportField
    }}>
      {children}
    </AddSportFieldsContext.Provider>
  )

}

function useAddSportFieldsState() {
  const context = useContext(AddSportFieldsContext);
  if (context === undefined) {
    throw new Error("UseAddSportFieldsState debe ser usado");
  }
  return context;
}

export { AddSportFieldsProvider, useAddSportFieldsState }

