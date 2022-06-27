import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from 'ApolloClient/client';
import App from './App';

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
