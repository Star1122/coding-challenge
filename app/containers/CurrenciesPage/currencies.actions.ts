import ActionTypes from './currencies.constants';
import { CurrencyDto } from './currencies.dto';
import { AxiosError } from 'axios';
import {
  ClearRequestFailedAction,
  LoadCurrenciesAction,
  SetCurrenciesAction,
  SetRequestFailedAction,
  SetRequestStartedAction,
  SetRequestSucceededAction,
} from './currencies.types';

export const setCurrenciesDataAction = (
  data: CurrencyDto,
): SetCurrenciesAction => ({
  type: ActionTypes.SET_CURRENCIES,
  payload: { data },
});

export const loadCurrenciesAction = (): LoadCurrenciesAction => ({
  type: ActionTypes.LOAD_CURRENCIES,
});

export const setRequestStartedAction = (): SetRequestStartedAction => ({
  type: ActionTypes.REQUEST_STARTED,
});

export const setRequestSucceededAction = (): SetRequestSucceededAction => ({
  type: ActionTypes.REQUEST_SUCCEEDED,
});

export const setRequestFailedAction = (
  data: AxiosError,
): SetRequestFailedAction => ({
  type: ActionTypes.REQUEST_FAILED,
  payload: { data },
});

export const clearRequestFailedAction = (): ClearRequestFailedAction => ({
  type: ActionTypes.CLEAR_REQUEST_FAILED,
});
