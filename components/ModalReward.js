import React, { useContext, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useApolloClient } from '@apollo/react-hooks';
import { errorSomething } from '../utils/functions';

import { BUY_BUNDLE } from '../graphql/mutation';

import RootContext from './RootContext';
import moment from 'moment';

const Content = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 500px;
  width: 500px;
  margin: auto;
`;
const Title = styled.Text`
  font-family: 'AutourOne-Regular';
  align-items: center;
  color: #f387bb;
  font-size: 32px;
  text-align: center;
`;
const Desc = styled.Text`
  width: 476px;
  height: 45px;
  font-family: 'AutourOne-Regular';
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
  padding: 10px;
  background-color: #f9cbdd;
  border-radius: 3px;
  color: #3d4878;
`;
const PercentImage = styled.ImageBackground`
  width: 296.58px;
  height: 285.5px;
  align-items: center;
  justify-content: center;
`;
const TextPercent = styled.Text`
  font-size: 38px;
  color: #fff;
  font-weight: bold;
  font-family: 'AutourOne-Regular';
`;
const ViewButton = styled.View`
  flex-direction: row;
`;
const ButtonCancle = styled.TouchableOpacity`
  background-color: #fff;
  align-items: center;
  padding: 10px;
  width: 228px;
  border: 1px solid #f9cbdd;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  color: #3d4878;
`;
const ButtonConfirm = styled.TouchableOpacity`
  background-color: #f387bb;
  align-items: center;
  padding: 10px;
  width: 228px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
`;
const TextCancle = styled.Text`
  color: #3d4878;
  font-family: 'AutourOne-Regular';
`;
const TextSubmit = styled.Text`
  color: #fff;
  font-family: 'AutourOne-Regular';
`;

const ModalReward = ({ visible, reward, closeVisible }) => {
  const [loading, setLoading] = useState(false);
  const apolloClient = useApolloClient();
  const navigation = useNavigation();
  const { customer, buyBundle } = useContext(RootContext);
  const pickBundle = async () => {
    setLoading(true);
    const newPointUser =
      customer.current_point && customer.current_point - reward.cost;
    const history = {
      customer_id: customer.id,
      created_at: moment(),
      point: -reward.cost,
      desc: reward.description,
    };
    const { errors } = await apolloClient.mutate({
      mutation: BUY_BUNDLE,
      variables: {
        id: customer.id && customer.id,
        objectCustomer: {
          current_point: newPointUser,
        },
        objectHistory: {
          customer_id: customer.id,
          point: -reward.cost,
          desc: reward.description,
        },
      },
    });
    if (errors) {
      errorSomething();

      setLoading(false);
    } else {
      buyBundle(newPointUser, history);
      setLoading(false);
      closeVisible();
      navigation.navigate('ThankYou', {
        reward,
      });
    }
  };

  return (
    <View>
      <Modal
        coverScreen
        isVisible={visible}
        hasBackdrop
        onBackdropPress={closeVisible}
        style={styles.modal}
        animationIn="fadeIn"
        animationInTiming={0.3}>
        <Content>
          <Title>HOSSING BUNDLE</Title>
          <Desc>
            You are picking {reward.cost && reward.cost} points bundle
          </Desc>
          <PercentImage
            style={styles.imageBackground}
            source={require('../assets/images/bgModalReward.png')}>
            <TextPercent>
              {reward.description && reward.description}
            </TextPercent>
          </PercentImage>
          <ViewButton>
            <ButtonCancle
              activeOpacity={0.7}
              disabled={loading ? true : false}
              onPress={closeVisible}>
              <TextCancle>CANCLE</TextCancle>
            </ButtonCancle>
            <ButtonConfirm activeOpacity={0.7} onPress={pickBundle}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <TextSubmit>CONFIRM</TextSubmit>
              )}
            </ButtonConfirm>
          </ViewButton>
        </Content>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: { alignContent: 'center', justifyContent: 'center' },
  imageBackground: {
    marginVertical: 15,
  },
});

export default ModalReward;
