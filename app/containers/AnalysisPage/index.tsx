import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { createStructuredSelector } from 'reselect';

import { analyzeTags } from '../../utils/json-parse';
import { useInjectReducer, useInjectSaga } from '../../utils/redux-injectors';
import { makeSelectContent, makeSelectError, makeSelectLoading } from './analysis.selectors';
import { loadHtmlContentAction, loadXmlContentAction } from './analysis.actions';
import reducer from './analysis.reducer';
import saga from './analysis.saga';
import { AnalyzedResult } from '../../types';

import H1 from 'components/H1';
import Toggle from 'components/Toggle';
import AnalyzeButton from './components/AnalyzeButton';
import ButtonLoadingIndicator from './components/ButtonLoadingIndicator';
import List from './components/List';
import ListItem from './components/ListItem';
import ListItemTitle from './components/ListItemTitle';
import Span from './components/Span';
import UploadButton from './components/UploadButton';
import UrlInput from './components/UrlInput';
import Wrapper from './components/Wrapper';

const key = 'analysis';

const stateSelector = createStructuredSelector({
  content: makeSelectContent(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const modes = [
  'xml',
  'html',
];

export default function FeaturePage() {
  const { content, loading } = useSelector(stateSelector);
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState<'xml' | 'html'>('html');
  const [xmlContent, setXmlContent] = useState('');
  const [analyzedResult, setAnalyzedResult] = useState<AnalyzedResult>();
  const [uploadXml, setUploadXml] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setAnalyzedResult(analyzeTags(content?.data || {}));
  }, [content]);

  const dispatch = useDispatch();

  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  const analyze = async () => {
    if (mode === 'html' && url) {
      dispatch(loadHtmlContentAction(url));
    } else if (mode === 'xml' && xmlContent) {
      dispatch(loadXmlContentAction(xmlContent));
    }
  };

  const selectFile = async (e) => {
    if (e.target.files && e.target.files.length) {
      const file: File = e.target.files[0];
      const innerText = await file.text();
      setUploadXml(file.name);
      setXmlContent(innerText);
    }
  };

  const openFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <Helmet>
        <title>Analysis</title>
        <meta name="description" content="Analysis" />
      </Helmet>

      <H1>
        Analysis
        <Span>
          <Toggle
            value={mode}
            values={modes}
            onToggle={(e) => setMode(e.target.value)}
          />
        </Span>
      </H1>
      <Wrapper>
        {mode === 'html' && (
          <UrlInput
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Input url web page to analyze"
            disabled={loading}
          />
        )}
        {mode === 'xml' && (
          <>
            <input ref={inputRef} type="file" onChange={selectFile} accept="application/xml" hidden={true} />
            <UploadButton disabled={loading} onClick={openFile}>
              {uploadXml
                ? uploadXml
                : 'Click to Open Xml file'
              }
            </UploadButton>
          </>
        )}
        <AnalyzeButton onClick={analyze} disabled={loading}>
          {loading
            ? <ButtonLoadingIndicator />
            : 'Analyze'
          }
        </AnalyzeButton>
      </Wrapper>
      <List>
        <ListItem>
          <ListItemTitle>
            All unique tags used in the document
          </ListItemTitle>
          <p>
            {analyzedResult?.tagsArray.map((tag) => tag[0]).join(', ')}
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
            The most commonly used tag
          </ListItemTitle>
          <p>
            {analyzedResult?.maxUsedTags.join(', ')}
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
            The longest path in the document tree where the most popular tag is used the most times
          </ListItemTitle>
          {analyzedResult?.longestPaths.map(longestPath => (
            <p key={longestPath.path.join('.')}>
              {longestPath.path.join('.')}
            </p>
          ))}
        </ListItem>
      </List>
    </div>
  );
}
