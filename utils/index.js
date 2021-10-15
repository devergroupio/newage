import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import CONFIG from './config';
import { errorWithText } from '../utils/functions';

export const createApolloClient = () => {
  const link = new HttpLink({
    uri: CONFIG.HSR_ENDPOINT,
    headers: {
      'x-hasura-admin-secret': CONFIG.HSR_ADMIN_SECRET,
    },
  });
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      errorWithText('Sorry, something went wrong!, please try again later');
    }
    if (networkError) {
      errorWithText('Network error Occured! Please connect right network ');
    }
  });
  return new ApolloClient({
    link: concat(errorLink, link),
    cache: new InMemoryCache(),
  });
};
