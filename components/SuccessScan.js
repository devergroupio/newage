import React from 'react';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  top: -50px;
`;
const WrapperImage = styled.ImageBackground`
  width: 822px;
  height: 314px;
  align-items: center;
  justify-content: center;
`;
const TextRedeemed = styled.Text`
  color: #3d4878;
  font-size: 38px;
  font-family: 'AutourOne-Regular';
  top: 50px;
`;
const WrapperPoint = styled.ImageBackground`
  width: 175px;
  height: 238px;
  align-items: center;
  top: 100px;
`;
const TextPoint = styled.Text`
  font-size: 48px;
  font-family: 'AutourOne-Regular';
  color: black;
  top: 60px;
`;
const BtnHome = styled.TouchableOpacity`
  background-color: black;
  width: 231px;
  height: 42px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  top: 110px;
`;
const TextHome = styled.Text`
  font-size: 26px;
  color: #fff;
  font-family: 'AutourOne-Regular';
`;
const SuccessScan = ({ visible, closeVisible, plus_point }) => {
  return (
    <Modal
      coverScreen
      isVisible={visible}
      hasBackdrop
      onBackdropPress={closeVisible}
      style={styles.modal}
      backdropOpacity={1}
      animationIn="fadeIn"
      backdropColor="#3d4878"
      animationInTiming={0.3}>
      <Container>
        <WrapperImage source={require('../assets/images/modal_redeem.png')}>
          <TextRedeemed>You have just redeemed</TextRedeemed>
          <WrapperPoint source={require('../assets/images/wrapper_point.png')}>
            <TextPoint>{plus_point}</TextPoint>
          </WrapperPoint>
        </WrapperImage>
        <BtnHome activeOpacity={0.6} onPress={closeVisible}>
          <TextHome>Home</TextHome>
        </BtnHome>
      </Container>
    </Modal>
  );
};

export default SuccessScan;

const styles = StyleSheet.create({
  modal: { alignContent: 'center', justifyContent: 'center' },
});
