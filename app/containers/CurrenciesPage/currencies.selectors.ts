import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './currencies.reducer';

const selectCurrencies = (state: ApplicationRootState) =>
  state.currencies || initialState;

const makeSelectCurrencies = () =>
  createSelector(selectCurrencies, subState => subState.currenciesData);

const makeSelectLoading = () =>
  createSelector(selectCurrencies, subState => subState.loading);

const makeSelectError = () =>
  createSelector(selectCurrencies, subState => subState.error);

export {
  selectCurrencies,
  makeSelectCurrencies,
  makeSelectLoading,
  makeSelectError,
};
