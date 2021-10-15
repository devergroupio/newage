import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import styled from '@emotion/native';

const ContentModal = styled.View`
  padding: 20px 30px;
  background-color: #3d4878;
  max-width: 600px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;
const Title = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'AutourOne-Regular';
  margin-bottom: 10px;
`;
const TextSorry = styled.Text`
  margin-bottom: 20px;

  color: white;
  font-size: 25px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'AutourOne-Regular';
`;
const TextFix = styled.Text`
  margin: 10px 0;
  color: #fff;
  font-size: 18px;
  text-align: center;
  font-family: 'AutourOne-Regular';
`;
const BtnBack = styled.TouchableOpacity`
  background-color: black;
  width: 200px;
  height: 40px;
  justify-content: center;
  border-radius: 5px;
  margin-top: 20px;
`;
const TextBack = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
  font-family: 'AutourOne-Regular';
`;

const ModalIsueeQRCode = ({ visible, closeVisible }) => {
  return (
    <Modal
      coverScreen
      isVisible={visible}
      hasBackdrop
      onBackdropPress={closeVisible}
      style={styles.modal}
      animationIn="fadeIn"
      animationInTiming={0.3}>
      <ContentModal>
        <TextSorry>we apologize for this problem!</TextSorry>
        <Title>troubleshooting guide</Title>
        <TextFix>1. Reset app and run again!</TextFix>
        <TextFix>2. Contact to your staff!</TextFix>
        <BtnBack onPress={closeVisible}>
          <TextBack>Back</TextBack>
        </BtnBack>
      </ContentModal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { alignContent: 'center', justifyContent: 'center' },
  imageBackground: {
    marginVertical: 15,
  },
});

export default ModalIsueeQRCode;
