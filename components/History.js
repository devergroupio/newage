import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/native';
import { useApolloClient } from '@apollo/react-hooks';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';

import RootContext from './RootContext';
import { errorSomething, errorWithText } from '../utils/functions';
import { FETCH_HISTORIES } from '../graphql/query';

const HistoryWrapper = styled.View`
  background-color: #fff;
  flex: 1;
  justify-content: center;
`;

const ContentNull = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ImageNull = styled.Image`
  width: 182px;
  height: 181px;
`;
const TextNull = styled.Text`
  font-size: 34px;
  color: #666666;
  text-align: center;
  margin: 10px 0px;
  font-family: 'AutourOne-Regular';
`;
const BtnRetry = styled.TouchableOpacity`
  width: 208px;
  height: 34px;
  background-color: #3d4878;
  border-radius: 50px;
  box-shadow: 3px 3px 6px rgba(248, 227, 251, 0.8);
  align-items: center;
  padding-top: 2px;
`;
const TextRetry = styled.Text`
  color: #fff;
  font-family: 'AutourOne-Regular';
  font-size: 22px;
`;
const ViewHistory = styled.FlatList`
  padding: 15px 15px 0 0;
`;
const HistoryItemWrapper = styled.View`
  padding: 5px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  min-height: 60px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0px 6px 0px rgba(0, 0, 0, 0.75);
`;
const ViewTime = styled.View`
  min-width: 124px;
`;
const TextTime = styled.Text`
  font-family: 'AutourOne-Regular';
  font-size: 12px;
  color: #444444;
`;
const TextTimeAgo = styled.Text`
  font-family: 'AutourOne-Regular';
  font-size: 8px;
  color: #444444;
`;

const TextDesc = styled.Text`
  max-width: 342;
  font-size: 16px;
  color: #666666;
  font-family: 'AutourOne-Regular';
`;

const TextPoint = styled.Text`
  color: ${(props) => (props.status === 'plus' ? '#f397bb' : '#646D93')};
  font-size: 17px;
  font-family: 'AutourOne-Regular';
`;

const History = () => {
  const apolloClient = useApolloClient();
  const { histories, setHistories, customer } = useContext(RootContext);
  const [loading, setLoading] = useState(false);
  const fetchDataHistory = async (id) => {
    if (id) {
      setLoading(true);
      const { data, errors } = await apolloClient.query({
        query: FETCH_HISTORIES,
        variables: {
          id,
        },
      });
      if (errors) {
        errorSomething();
        setLoading(false);
      } else {
        const { customer_history } = data;
        setLoading(false);
        setHistories(customer_history);
      }
    } else {
      setLoading(false);
      errorWithText('Please Scan QR Code first!');
    }
  };
  const retryFetchData = () => {
    fetchDataHistory(customer.id);
  };

  useEffect(() => {
    if (histories.length === 0 && customer.actived_at) {
      fetchDataHistory(customer.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [histories, customer]);

  return (
    <HistoryWrapper>
      {loading ? (
        <ActivityIndicator size="large" color="pink" />
      ) : !customer.actived_at ? (
        <ContentNull>
          <ImageNull source={require('../assets/images/null_history.png')} />
          <TextNull>You have no data</TextNull>
          <BtnRetry onPress={retryFetchData}>
            <TextRetry>Retry</TextRetry>
          </BtnRetry>
        </ContentNull>
      ) : (
        <ViewHistory
          data={histories}
          keyExtractor={(item, index) => `${index}`}
          renderItem={(history) => {
            const { item, index } = history;
            return (
              <HistoryItemWrapper key={index}>
                <ViewTime>
                  <TextTime>
                    {moment(item.created_at).format('h:mm A MM.DD.YYYY')}
                  </TextTime>
                  <TextTimeAgo>
                    {moment.utc(item.created_at).fromNow()}
                  </TextTimeAgo>
                </ViewTime>
                {item.desc && <TextDesc>{item.desc}</TextDesc>}
                {item.point < 0 ? (
                  <TextPoint status="decr">{item.point} Points</TextPoint>
                ) : (
                  <TextPoint status="plus">+{item.point} Points</TextPoint>
                )}
              </HistoryItemWrapper>
            );
          }}
        />
      )}
    </HistoryWrapper>
  );
};

export default History;
