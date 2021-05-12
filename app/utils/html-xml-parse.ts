import parser from 'fast-xml-parser';
import he from 'he';

const ParseOptions = {
  attributeNamePrefix: '@_',
  attrNodeName: 'attr',
  textNodeName: '#text',
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata',
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  arrayMode: false, // "strict"
  attrValueProcessor: val => he.decode(val, { isAttributeValue: true }),
  tagValueProcessor: val => he.decode(val),
  stopNodes: ['parse-me-as-string'],
};

export const analyzeHtmlXml = data => parser.parse(data, ParseOptions);
