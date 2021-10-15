import React, { useState } from 'react';
import ModalReward from './ModalReward';
import ItemReward from './ItemReward';
import styled from '@emotion/native';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_REWARDS } from '../graphql/query';
import { ActivityIndicator, View } from 'react-native';
const FlatList = styled.FlatList`
  padding-top: 15px;
  padding-right: 15px;
  background-color: #fff;
`;

const ListReward = ({ dataUser }) => {
  const { data, loading, error } = useQuery(FETCH_REWARDS, {
    fetchPolicy: 'cache-and-network',
  });

  const [selectedReward, setSelectedReward] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const onSelectReward = (reward) => setSelectedReward(reward);
  const openModalReward = () => setVisibleModal(true);

  const closeModalReward = () => setVisibleModal(false);

  if (!data || loading || error) {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const { reward: rewards } = data;
  return (
    <>
      <FlatList
        data={rewards}
        keyExtractor={(item) => `${item.id}`}
        // eslint-disable-next-line no-shadow
        renderItem={(data) => {
          const { item } = data;
          return (
            <ItemReward
              dataUser={dataUser}
              onSelectReward={onSelectReward}
              openModal={openModalReward}
              reward={item}
            />
          );
        }}
      />
      {visibleModal && (
        <ModalReward
          reward={selectedReward}
          visible={visibleModal}
          closeVisible={closeModalReward}
        />
      )}
    </>
  );
};

export default ListReward;
