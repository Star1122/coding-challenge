import { ContentDto } from './analysis.dto';
import ActionTypes from './analysis.constants';
import { AxiosError } from 'axios';

interface AnalysisState {
  readonly loading: boolean;
  readonly success: boolean;
  readonly error?: AxiosError;
  readonly contentData?: ContentDto;
}

export interface SetAnalysisAction {
  type: typeof ActionTypes.SET_CONTENT;
  payload: {
    data: ContentDto;
  };
}

export interface LoadHtmlContentAction {
  type: typeof ActionTypes.LOAD_HTML_CONTENT;
  payload: { data: string };
}

export interface LoadXmlContentAction {
  type: typeof ActionTypes.LOAD_XML_CONTENT;
  payload: { data: string };
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

type ContainerState = AnalysisState;

type ContainerActions =
  | SetAnalysisAction
  | LoadHtmlContentAction
  | SetRequestStartedAction
  | SetRequestSucceededAction
  | SetRequestFailedAction
  | ClearRequestFailedAction;

export { ContainerState, ContainerActions };
