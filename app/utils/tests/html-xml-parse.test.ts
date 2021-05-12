import 'whatwg-fetch';
import { analyzeHtmlXml } from '../html-xml-parse';
import {
  mockHtml,
  mockHtmlJson,
  mockXml,
  mockXmlJson,
} from './parse.test.constant';

describe('Parse Html and Xml to Json', () => {
  it('Parse Html to Json', () => {
    expect(analyzeHtmlXml(mockHtml)).toStrictEqual(mockHtmlJson);
  });

  it('Parse Xml to Json', () => {
    expect(analyzeHtmlXml(mockXml)).toStrictEqual(mockXmlJson);
  });
});
