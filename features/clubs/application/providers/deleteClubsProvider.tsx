import React, { ReactNode, FC, createContext, useReducer, useContext } from "react";
import { useAuthState } from "../../../auth/application/providers/authProvider";
import Club from "../../domain/entities/club";
import { useAddClubState } from "./addClubProvider";
import ClubsRepositoryImp from "../../infraestructure/repositories/clubsRepositoryImp";
import ClubsDatasourceImp from "../../infraestructure/datasources/clubsDatasourceImp";

interface ContextDefinition {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  club: Club,
  errors: any,
  setClubProp: (property: string, value: any) => void,
  deleteClub: (onDeleted: Function) => void,
  setClub: (club: Club) => void,
}

const DeleteClubContext = createContext({} as ContextDefinition)

interface DeleteClubState {
  loading: boolean,
  saving: boolean,
  success: boolean,
  message?: string | null,
  club: Club,
  errors: any
}

type DeleteClubActionType =
  { type: 'Set Loading'; payload: boolean }
  | { type: 'Set Saving'; payload: boolean }
  | {
    type: 'Set Success'; payload: {
      success: boolean,
      club?: Club,
      message: string
    }
  }
  | { type: 'Set Club'; payload: Club }
  | { type: 'Set Message'; payload: string | null }
  | {
    type: 'Set Errors'; payload: {
      message: string,
      errors: any
    }
  }

const initialState: DeleteClubState = {
  loading: false,
  saving: false,
  success: false,
  message: null,
  club: new Club('', '', undefined),
  errors: {}
}

function DeleteClubReducer(state: DeleteClubState, action: DeleteClubActionType) {
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
    case 'Set Club':
      return {
        ...state,
        club: action.payload
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

const DeleteClubProvider: FC<Props> = ({ children }) => {
  const { user } = useAuthState();
  const { clubsSelected } = useAddClubState();
  const id = clubsSelected?.id;
  initialState.club = new Club('', '', undefined, user.id || 0, clubsSelected?.id || 0);
  const [state, dispatch] = useReducer(DeleteClubReducer, initialState);
  function setClubProp(property: string, value: any) {
    dispatch({
      type: 'Set Club',
      payload: {
        ...state.club,
        [property]: value,
      }
    })
  }

  async function deleteClub(onDeleted: Function) {
    const repository = new ClubsRepositoryImp(
      new ClubsDatasourceImp()
    );
    dispatch({
      type: 'Set Saving',
      payload: true,
    })

    const result = await repository.deleteClub(state.club);
    onDeleted(state.club);


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

  function setClub(club: Club) {
    dispatch({
      type: 'Set Club',
      payload: club
    })
  }

  return (
    <DeleteClubContext.Provider value={{
      ...state,
      setClubProp,
      deleteClub,
      setClub,
    }}>
      {children}
    </DeleteClubContext.Provider>
  )
}

function useDeleteClubsState() {
  const context = useContext(DeleteClubContext);
  if (context === undefined) {
    throw new Error('UseDeleteClubState debe ser usado con un DeleteClubProvider');
  }
  return context;
}

export { DeleteClubProvider, useDeleteClubsState }
