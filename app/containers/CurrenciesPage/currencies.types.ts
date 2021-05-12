import { CurrencyDto } from './currencies.dto';
import ActionTypes from './currencies.constants';
import { AxiosError } from 'axios';

interface CurrenciesState {
  readonly loading: boolean;
  readonly success: boolean;
  readonly error?: AxiosError;
  readonly currenciesData?: CurrencyDto;
}

export interface SetCurrenciesAction {
  type: typeof ActionTypes.SET_CURRENCIES;
  payload: {
    data: CurrencyDto;
  };
}

export interface LoadCurrenciesAction {
  type: typeof ActionTypes.LOAD_CURRENCIES;
}

export interface SetRequestStartedAction {
  type: typeof ActionTypes.REQUEST_STARTED;
}

export interface SetRequestSucceededAction {
  type: typeof ActionTypes.REQUEST_SUCCEEDED;
}

export interface SetRequestFailedAction {
  type: typeof ActionTypes.REQUEST_FAILED;
  payload: { data: AxiosError };
}

export interface ClearRequestFailedAction {
  type: typeof ActionTypes.CLEAR_REQUEST_FAILED;
}

type ContainerState = CurrenciesState;

type ContainerActions =
  | SetCurrenciesAction
  | LoadCurrenciesAction
  | SetRequestStartedAction
  | SetRequestSucceededAction
  | SetRequestFailedAction
  | ClearRequestFailedAction;

export { ContainerState, ContainerActions };
