import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styles/styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import AnalysisPage from 'containers/AnalysisPage/Loadable';
import CurrenciesPage from 'containers/CurrenciesPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React Test App"
        defaultTitle="React Test App"
      >
        <meta name="description" content="React application" />
      </Helmet>
      <Header />
      <Switch>
        <Route path="/currencies" component={CurrenciesPage} />
        <Route path="/analysis" component={AnalysisPage} />
        <Redirect path="" to="/currencies" />
        <Redirect path="**" to="/currencies" />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
export default hot(App);
