import React from 'react';
import styled from '@emotion/native';

const Reward = styled.View`
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
`;
const ItemWrapper = styled.TouchableOpacity`
  margin-bottom: 15px;
  // box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.75);
  border: 2px solid #f9f9f9;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? 'pink' : '#f9f9f9')};
`;

const RewardWrapper = styled.View`
  padding: 5px 15px;
  align-items: center;
  flex-direction: row;
  /* justify-content: space-between; */
`;

const TextCircle = styled.Text`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  background-color: ${(props) =>
    props.active ? 'transparent' : 'transparent'};
  font-family: 'AutourOne-Regular';
  border-radius: 20px;
  color: black;
  text-align: center;
  padding-top: 12.5px;
`;

const TextDescWrapper = styled.Text`
  font-family: 'AutourOne-Regular';
  margin-left: 20px;
`;
const TextDesc = styled.Text`
  color: ${(props) => (props.active ? '#fff' : 'black')};
`;
const ItemReward = ({ dataUser, reward, onSelectReward, openModal }) => {
  const { description, cost } = reward;
  const { current_point } = dataUser;
  const active = current_point && current_point >= cost ? true : false;

  const openModalReward = () => {
    onSelectReward(reward);
    openModal();
  };
  return (
    <Reward>
      <ItemWrapper
        activeOpacity={0.7}
        active={active}
        onPress={openModalReward}
        disabled={!current_point ? true : current_point >= cost ? false : true}>
        <RewardWrapper>
          <TextCircle active={active}>{cost}</TextCircle>
          {/* <TextPercent>-{percent}%</TextPercent> */}
          <TextDescWrapper>
            Bundle {cost} points:{' '}
            <TextDesc active={active}>{description}</TextDesc>
          </TextDescWrapper>
        </RewardWrapper>
      </ItemWrapper>
    </Reward>
  );
};
export default ItemReward;
