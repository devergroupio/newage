import React from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: #3d4878;
  align-items: center;
  justify-content: center;
`;

const ImageThank = styled.Image`
  width: 287.5px;
  height: 260.6px;
`;
const TextDone = styled.Text`
  color: #fff;
  font-family: 'AutourOne-Regular';
  font-size: 35px;
  margin: 20px 0px;
`;
const BtnDone = styled.TouchableOpacity`
  width: 231px;
  height: 42px;
  border-radius: 5px;
  background-color: #f397bb;
  align-items: center;
  justify-content: center;
`;
const TextBtnDone = styled.Text`
  color: #fff;
  font-family: 'AutourOne-Regular';
  font-size: 24px;
`;
const ThankYou = ({ navigation, route }) => {
  const { reward } = route.params;
  const navigateToScanPage = () => navigation.navigate('ScanPage');
  return (
    <Container>
      <ImageThank source={require('../assets/images/thank_you.png')} />
      <TextDone>You have {reward.description}</TextDone>
      <BtnDone activeOpacity={0.6} onPress={navigateToScanPage}>
        <TextBtnDone>Done</TextBtnDone>
      </BtnDone>
    </Container>
  );
};

export default ThankYou;
