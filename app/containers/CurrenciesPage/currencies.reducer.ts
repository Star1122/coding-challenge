import ActionTypes from './currencies.constants';
import { ContainerState, ContainerActions } from './currencies.types';

export const initialState: ContainerState = {
  loading: false,
  success: false,
};

function currenciesReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.REQUEST_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.SET_CURRENCIES: {
      return {
        ...state,
        loading: false,
        currenciesData: action.payload.data,
      };
    }
    case ActionTypes.REQUEST_SUCCEEDED: {
      return {
        ...state,
        loading: false,
        success: true,
        error: undefined,
      };
    }
    case ActionTypes.REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.data,
      };
    }
    case ActionTypes.CLEAR_REQUEST_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: undefined,
      };
    }
    default:
      return state;
  }
}

export default currenciesReducer;
