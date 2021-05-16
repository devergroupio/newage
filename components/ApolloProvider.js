import React from 'react';
import { createApolloClient } from '../utils';
import { ApolloProvider } from '@apollo/react-hooks';
const client = createApolloClient();

const Provider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
