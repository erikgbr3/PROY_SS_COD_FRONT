import { FC, ReactNode, createContext, useContext, useReducer } from "react";
import Auth from "../../domain/entities/auth";
import AuthRepositoryImp from "../../infraestructure/repositories/authRepositoryImp";
import AuthDatasourceImp from "../../infraestructure/datasources/authDatasourceImp";
import User from "../../../users/domain/entities/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ... (importaciones)

interface ContextDefinition {
  success: boolean,
  auth: Auth,
  message?: string ,
  token: string,
  user: User,
  errors: any,
  error: boolean,
  setAuthProp: (property: string, value: any) => void,
  signIn: () => Promise<void>,
  signOut: () => void,
}

const AuthContext = createContext({} as ContextDefinition);

interface AuthState {
  success: boolean,
  auth: Auth,
  message?: string ,
  token: string,
  user: User,
  error: boolean,
  errors: any,
}

type AuthActionType =
  | { type: 'set Auth', payload: Auth }
  | { type: 'set Message', payload: string | undefined }
  | { type: 'set Token', payload: string }
  | { type: 'set Error', payload: boolean}
  | { type: 'set Errors', payload: any }
  | { type: 'set Success', payload: boolean }
  | { type: 'set User', payload: User };

const initialState: AuthState = {
  success: false,
  auth: new Auth('', ''),
  message: '',
  token: '',
  user: new User('', '', '', 0),
  error: false,
  errors: {}
};

function AuthReducer(state: AuthState, action: AuthActionType) {
  switch (action.type) {
    case 'set Auth':
      return {
        ...state,
        auth: action.payload,
      };
    case 'set Token':
      return {
        ...state,
        token: action.payload,
      };
    case 'set Success':
      return {
        ...state,
        success: action.payload
      }
    case 'set User':
      return {
        ...state,
        user: action.payload
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
    case 'set Error':
      return{
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

type Props = {
  children?: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setAuthProp = (property: string, value: any) => {
    dispatch({
      type: 'set Auth',
      payload: {
        ...state.auth,
        [property]: value,
      },
    });
  };

  const signIn = async () => {
    try {
      const repository = new AuthRepositoryImp(new AuthDatasourceImp());
      const result = await repository.login(state.auth);

      console.log("result", result);

      if (result.token) {
        dispatch({
          type: 'set Token', payload: result.token
        });

        dispatch({
          type: 'set User',
          payload: result.user
        });

        dispatch({
          type: 'set Success',
          payload: true,
        })

        dispatch({
          type: 'set Message',
          payload: '',
        });

        return;
      }

      dispatch({
        type: 'set Success',
        payload: false,
      })

      dispatch({
        type: 'set Error',
        payload: true
      })

      let errors:any = {};
      result.errors?.forEach((item) =>{
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
        type: 'set Error',
        payload: false
      })

    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  const signOut = () => {
    // lógica de cierre de sesión, limpiar el token y cualquier otro estado relevante
    dispatch({ type: 'set Token', payload: '' });
    // También puedes limpiar localStorage aquí si es necesario
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setAuthProp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthState() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState debe ser usado dentro de AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthState };
