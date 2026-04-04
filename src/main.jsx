import React from 'react';
import ReactDOM from 'react-dom/client';
import { IonApp } from '@ionic/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './app/globals.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import StoreProvider from './components/state/store-provider';
import { SocketProvider } from './components/state/socket.provider';
import Layout from './components/layout/layout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <IonApp>
        <StoreProvider>
          <SocketProvider>
            <Layout>
              <App />
            </Layout>
          </SocketProvider>
        </StoreProvider>
      </IonApp>
    </BrowserRouter>
  </React.StrictMode>
);
