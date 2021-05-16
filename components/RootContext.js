import React, { useReducer, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import { FETCH_PLUS_POINT } from '../graphql/query';
import { errorSomething } from '../utils/functions';

const initalState = {
  customer: {},
  histories: [],
  reward: [],
  plus_point: null,
  buyBundle: null,
  setHistories: null,
  setInitialState: null,
  setCustomer: null,
};

const RootContext = React.createContext(initalState);
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CUSTOMER': {
      return { ...state, customer: action.payload };
    }
    case 'SET_HISTORIES': {
      return { ...state, histories: action.payload };
    }
    case 'BUY_BUNDLE': {
      const { new_point_customer, history } = action.payload;
      const newCustomer = {
        ...state.customer,
        current_point: new_point_customer,
      };
      if (state.histories.length !== 0) {
        return {
          ...state,
          histories: [history, ...state.histories],
          customer: newCustomer,
        };
      } else {
        return {
          ...state,
          customer: newCustomer,
        };
      }
    }
    case 'SET_PLUS_POINT': {
      return { ...state, plus_point: action.payload };
    }
    case 'SET_STATE_INITIAL': {
      return {
        ...state,
        customer: {},
        histories: [],
      };
    }
    default:
      return state;
  }
};
export const RootProvider = (props) => {
  const apolloClient = useApolloClient();
  const [state, dispatch] = useReducer(rootReducer, initalState);
  const setCustomer = (dataCustomer) => {
    dispatch({
      type: 'SET_CUSTOMER',
      payload: dataCustomer,
    });
  };
  const addNewHistory = (history) => {
    dispatch({
      type: 'ADD_NEW_HISTORY',
      payload: history,
    });
  };
  const buyBundle = (new_point_customer, history) => {
    dispatch({
      type: 'BUY_BUNDLE',
      payload: {
        new_point_customer,
        history,
      },
    });
  };
  const setHistories = (data) => {
    dispatch({
      type: 'SET_HISTORIES',
      payload: data,
    });
  };
  const setInitialState = () => {
    dispatch({
      type: 'SET_STATE_INITIAL',
    });
  };
  const getPlusPoint = async () => {
    const { data, errors } = await apolloClient.query({
      query: FETCH_PLUS_POINT,
    });
    if (errors) {
      errorSomething();
    } else {
      const { config } = data;
      dispatch({
        type: 'SET_PLUS_POINT',
        payload: config[0].plus_point ? config[0].plus_point : 10,
      });
    }
  };
  useEffect(() => {
    if (!state.plus_point) {
      getPlusPoint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.plus_point]);
  return (
    <RootContext.Provider
      value={{
        ...state,
        setCustomer,
        addNewHistory,
        buyBundle,
        setHistories,
        setInitialState,
      }}>
      {props.children}
    </RootContext.Provider>
  );
};

export default RootContext;
