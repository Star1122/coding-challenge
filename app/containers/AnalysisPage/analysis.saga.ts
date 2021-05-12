import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './analysis.constants';

import {
  setContentDataAction,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from './analysis.actions';
import { getUrlContentRequest } from './analysis.api';
import { ContentDto } from './analysis.dto';
import { analyzeHtmlXml } from '../../utils/html-xml-parse';

export function* getHtmlContent(action) {
  try {
    yield put(setRequestStartedAction());
    const responseData = (yield call(getUrlContentRequest, action.payload.data)) as ContentDto;

    const data = analyzeHtmlXml(responseData.data);
    yield put(setContentDataAction({ data }));
    yield put(setRequestSucceededAction());
  } catch (error) {
    yield put(setRequestFailedAction(error));
  }
}

export function* getXmlContent(action) {
  try {
    yield put(setRequestStartedAction());
    const data = analyzeHtmlXml(action.payload.data);
    yield put(setContentDataAction({ data }));
    yield put(setRequestSucceededAction());
  } catch (error) {
    yield put(setRequestFailedAction(error));
  }
}

export default function* analysisData() {
  yield takeLatest(ActionTypes.LOAD_HTML_CONTENT, getHtmlContent);
  yield takeLatest(ActionTypes.LOAD_XML_CONTENT, getXmlContent);
}
