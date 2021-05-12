import ActionTypes from './analysis.constants';
import { ContentDto } from './analysis.dto';
import { AxiosError } from 'axios';
import {
  ClearRequestFailedAction,
  LoadHtmlContentAction,
  LoadXmlContentAction,
  SetAnalysisAction,
  SetRequestFailedAction,
  SetRequestStartedAction,
  SetRequestSucceededAction,
} from './analysis.types';

export const setContentDataAction = (data: ContentDto): SetAnalysisAction => ({
  type: ActionTypes.SET_CONTENT,
  payload: { data },
});

export const loadHtmlContentAction = (url: string): LoadHtmlContentAction => ({
  type: ActionTypes.LOAD_HTML_CONTENT,
  payload: { data: url },
});

export const loadXmlContentAction = (data: string): LoadXmlContentAction => ({
  type: ActionTypes.LOAD_XML_CONTENT,
  payload: { data },
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
