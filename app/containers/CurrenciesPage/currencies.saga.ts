import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './currencies.constants';

import {
  setCurrenciesDataAction,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from './currencies.actions';
import { getCurrenciesRequest } from './currencies.api';
import { CurrencyDto } from './currencies.dto';

export function* getCurrencies() {
  try {
    yield put(setRequestStartedAction());
    const data = (yield call(getCurrenciesRequest)) as CurrencyDto;
    yield put(setCurrenciesDataAction(data));
    yield put(setRequestSucceededAction());
  } catch (error) {
    yield put(setRequestFailedAction(error));
  }
}

export default function* currenciesData() {
  yield takeLatest(ActionTypes.LOAD_CURRENCIES, getCurrencies);
}
