import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from 'containers/App';

import '!file-loader?name=[name].[ext]!./images/favicon.ico';

import { HelmetProvider } from 'react-helmet-async';

import configureStore from './configureStore';

const openSansObserver = new FontFaceObserver('Open Sans', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app') as HTMLElement;

const ConnectedApp = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ConnectedRouter>
  </Provider>
);
const render = () => {
  ReactDOM.render(<ConnectedApp />, MOUNT_NODE);
};

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}
