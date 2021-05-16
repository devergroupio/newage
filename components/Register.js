import React, { useState, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import { errorSomething } from '../utils/functions';
import moment from 'moment';

import {
  UPDATE_CUSTOMER,
  CREATE_NEW_CUSTOMER_BEEN_DELETED,
} from '../graphql/mutation';

import RootContext from './RootContext';

const RegisterWrapper = styled.View`
  background-color: #fff;
  width: 700px;
  margin: 0px auto;
  border-radius: 10px;
  padding-bottom: 15px;
`;
const Header = styled.ImageBackground`
  width: 700px;
  height: 156px;
  align-items: center;
  justify-content: center;
  top: -7px;
`;
const Text = styled.Text`
  font-size: 52px;
  font-family: 'AutourOne-Regular';
  color: #f397bb;
  align-items: center;
`;
const InputForm = styled.TextInput`
  background-color: #fff;
  border: 1px solid #3366ff;
  border-radius: 2px;
  padding-left: 10px;
  color: #f397bb;
  font-size: 20px;
  font-family: 'AutourOne-Regular';
`;
const Label = styled.Text`
  font-family: 'AutourOne-Regular';
  font-size: 18px;
  color: #f397bb;
  margin: 5px 0px;
`;
const FormView = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const FormControl = styled.View`
  width: 50%;
  padding: 10px;
`;
const ButtonSubmit = styled.TouchableOpacity`
  margin: 30px 0 0 40px;
  background-color: #f397bb;
  width: 228px;
  height: 50px;
  border-radius: 20px;
  align-items: center;
  padding-top: 10px;
`;
const TextSubmit = styled.Text`
  color: #fff;
  font-family: 'AutourOne-Regular';
  font-size: 22px;
`;
const showToastErrorSubmit = () => {
  // eslint-disable-next-line no-alert
  alert('Please enter the all infos customer to sign up!!!');
};
const Register = ({
  visible,
  onCloseModal,
  id_customer,
  loginCustomer,
  available,
}) => {
  const { plus_point } = useContext(RootContext);
  const [infoUser, SetInfoUser] = useState({
    last_name: '',
    first_name: '',
    phone_number: '',
  });
  const apolloClient = useApolloClient();
  const onChangeInput = (value, key) => {
    SetInfoUser((prev) => ({ ...prev, [key]: value }));
  };
  const onRegister = async () => {
    const { first_name, last_name, phone_number } = infoUser;
    if (first_name === '' || last_name === '' || phone_number === '') {
      showToastErrorSubmit();
    } else {
      loginCustomer({
        id: id_customer,
        actived_at: moment(),
        current_point: plus_point,
        last_name,
        first_name,
        phone_number,
        created_at: moment(),
      });
      if (available) {
        const { errors } = await apolloClient.mutate({
          mutation: UPDATE_CUSTOMER,
          variables: {
            id: id_customer,
            object: {
              id: id_customer,
              first_name,
              last_name,
              phone_number,
              current_point: plus_point,
              actived_at: moment(),
            },
            objectHistory: {
              customer_id: id_customer,
              point: plus_point,
              desc: 'Earn point per day',
            },
          },
        });
        if (errors) {
          errorSomething();
        }
      } else {
        const { errors } = await apolloClient.mutate({
          mutation: CREATE_NEW_CUSTOMER_BEEN_DELETED,
          variables: {
            object: {
              id: id_customer,
              first_name,
              last_name,
              phone_number,
              current_point: plus_point,
              actived_at: moment(),
            },
            objectHistory: {
              customer_id: id_customer,
              point: plus_point,
              desc: 'Earn point per day',
            },
          },
        });
        if (errors) {
          errorSomething();
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView>
      <Modal
        coverScreen
        isVisible={visible}
        hasBackdrop
        onBackdropPress={onCloseModal}
        style={styles.modal}
        animationIn="fadeIn"
        animationInTiming={0.3}>
        <RegisterWrapper>
          <Header source={require('../assets/images/header_register.png')}>
            <Text>Registration</Text>
          </Header>
          <FormView>
            <FormControl>
              <Label>First Name</Label>
              <InputForm
                value={infoUser.first_name}
                onChangeText={(text) => onChangeInput(text, 'first_name')}
                allowFontScaling
                placeholder="First name"
              />
            </FormControl>

            <FormControl>
              <Label>Last Name</Label>
              <InputForm
                value={infoUser.last_name}
                onChangeText={(text) => onChangeInput(text, 'last_name')}
                allowFontScaling
                placeholder="Last name"
              />
            </FormControl>
            <FormControl>
              <Label>Number Phone </Label>
              <InputForm
                value={infoUser.phone_number}
                onChangeText={(text) => onChangeInput(text, 'phone_number')}
                keyboardType="phone-pad"
                allowFontScaling
                placeholder="Number phone"
              />
            </FormControl>
            <FormControl>
              <ButtonSubmit activeOpacity={0.7} onPress={onRegister}>
                <TextSubmit>Submit</TextSubmit>
              </ButtonSubmit>
            </FormControl>
          </FormView>
        </RegisterWrapper>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  modal: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
