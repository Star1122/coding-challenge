import 'whatwg-fetch';
import { AnalyzedResult } from '../../types';
import { analyzeTags } from '../json-parse';
import { mockXmlJson, mockXmlJsonAnalysis } from './parse.test.constant';

describe('Parse Json of tag tree', () => {
  it('Parse Tag Tree', () => {
    const mockData = mockXmlJson;

    const res: AnalyzedResult = mockXmlJsonAnalysis;

    expect(analyzeTags(mockData)).toStrictEqual(res);
  });
});
