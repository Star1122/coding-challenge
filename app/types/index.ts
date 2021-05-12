import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';

import { ContainerState as CurrenciesState } from 'containers/CurrenciesPage/currencies.types';
import { ContainerState as AnalysisState } from 'containers/AnalysisPage/analysis.types';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;

  runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: Saga;
  mode?: SagaInjectionModes;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly currencies: CurrenciesState;
  readonly analysis: AnalysisState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly

  // for testing purposes
  readonly test: any;
}

export interface OriginObject {
  [key: string]: string | number
}

export interface DefaultResponseDTO<T> {
  message: string;
  data: T;
}

export interface TagPath {
  path: string[];
  mostCommonTagUse: number;
}

export interface AnalyzedResult {
  tagsArray: any[],
  maxUsedTags: string[],
  longestPaths: TagPath[]
}
