import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './analysis.reducer';

const selectAnalysis = (state: ApplicationRootState) =>
  state.analysis || initialState;

const makeSelectContent = () =>
  createSelector(selectAnalysis, subState => subState.contentData);

const makeSelectLoading = () =>
  createSelector(selectAnalysis, subState => subState.loading);

const makeSelectError = () =>
  createSelector(selectAnalysis, subState => subState.error);

export {
  selectAnalysis,
  makeSelectContent,
  makeSelectLoading,
  makeSelectError,
};
