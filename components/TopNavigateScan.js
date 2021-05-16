import React, { useState } from 'react';
import styled from '@emotion/native';
import { useNavigation } from '@react-navigation/native';

const BtnWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 15px;
  align-items: center;
`;
const Button = styled.TouchableOpacity`
  font-family: 'AutourOne-Regular';
  padding: 5px 15px 5px;
`;
const Text = styled.Text`
  font-family: 'AutourOne-Regular';
  font-size: 18px;
  color: ${(props) => (props.active ? '#f397bb' : '#ccc')};
`;
const ViewButton = styled.View`
  border-bottom-width: 1px;
  border-color: ${(props) => (props.active ? '#f397bb' : 'transparent')};
`;
const TopNavigateScan = () => {
  const [navigate, setNavigate] = useState('Reward');
  const navigation = useNavigation();
  const navigateToReward = () => {
    setNavigate('Reward');
    navigation.navigate('Reward');
  };
  const navigateToHisTory = () => {
    setNavigate('History');
    navigation.navigate('History');
  };
  return (
    <BtnWrapper>
      <ViewButton active={navigate === 'Reward' ? true : false}>
        <Button onPress={navigateToReward}>
          <Text active={navigate === 'Reward' ? true : false}>Reward</Text>
        </Button>
      </ViewButton>
      <ViewButton active={navigate === 'History' ? true : false}>
        <Button onPress={navigateToHisTory}>
          <Text active={navigate === 'History' ? true : false}>History</Text>
        </Button>
      </ViewButton>
    </BtnWrapper>
  );
};

export default React.memo(TopNavigateScan);
