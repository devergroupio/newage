import React, { useState, useContext } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styled from '@emotion/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './Register';
import RootContext from './RootContext';
import { errorSomething, errorQRNotElle } from '../utils/functions';
import { FETCH_USER_BY_ID } from '../graphql/query';
import { EARN_POINT_PER_DAY } from '../graphql/mutation';
import ListReward from './ListReward';
import History from './History';
import TopNavigateScan from './TopNavigateScan';
import SuccessScan from './SuccessScan';
import ModalIssueQRCode from './ModalIsueeQRCode';

const Stack = createStackNavigator();

const Market = styled.ImageBackground`
  width: 200px;
  height: 200px;
`;

const TextPoint = styled.Text`
  color: #c782d3;
  font-size: ${(props) => (props.point > 999 ? '60px' : '72px')};
  width: 179px;
  height: 78px;
  margin-top: 80px;
  text-align: center;
  font-family: 'AutourOne-Regular';
`;

const ViewQRCode = styled.View`
  width: 100%;
  height: 300px;
`;
const TextScanCode = styled.Text`
  font-size: 20px;
  font-family: 'AutourOne-Regular';
  text-align: center;
  color: black;
`;

const ScanPage = ({ navigation }) => {
  const apolloClient = useApolloClient();
  const { customer, setCustomer, plus_point, setInitialState } =
    useContext(RootContext);
  const [register, setRegister] = useState({
    visible: false,
    customer_id: null,
    available: true,
  });
  const [modalRedeem, setModalRedeem] = useState(false);
  const [modalIssue, setModalIssue] = useState(false);
  const getDataUser = async (data) => {
    const { store_id, customer_id } = data;

    if (store_id === 'newage') {
      // eslint-disable-next-line no-shadow
      const { data, errors } = await apolloClient.query({
        query: FETCH_USER_BY_ID,
        variables: {
          id: customer_id,
          dayStart: moment().startOf('day'),
          dayEnd: moment().endOf('day'),
        },
        fetchPolicy: 'no-cache',
      });
      if (errors) {
        errorSomething();
      } else {
        const { customer_by_pk, customer_history } = data;
        if (customer_by_pk) {
          if (!customer_by_pk.actived_at) {
            setRegister({ visible: true, customer_id, available: true });
          } else {
            if (customer_history.length === 0) {
              earnPointPerDayForCustomer(
                customer_by_pk?.id,
                customer_by_pk.current_point ? customer_by_pk.current_point : 0,
              );
              setModalRedeem(true);
            }
            setCustomer({
              ...customer_by_pk,
              current_point:
                customer_history.length === 0
                  ? customer_by_pk?.current_point + plus_point
                  : customer_by_pk?.current_point,
            });
          }
        } else {
          setRegister({
            visible: true,
            customer_id: customer_id,
            available: false,
          });
        }
      }
    } else {
      errorQRNotElle();
    }
  };
  const earnPointPerDayForCustomer = async (id, current_point) => {
    const newPoint = current_point + plus_point;
    const { errors } = await apolloClient.mutate({
      mutation: EARN_POINT_PER_DAY,
      variables: {
        id,
        objectCustomer: {
          current_point: newPoint,
        },
        objectHistory: {
          customer_id: id,
          desc: 'Earn point per day',
          point: plus_point,
        },
      },
    });
    if (errors) {
      errorSomething();
    }
  };
  const onSuccess = (e) => {
    if (e.data) {
      if (JSON.parse(e.data)) {
        getDataUser(JSON.parse(e.data));
      }
    }
  };
  // eslint-disable-next-line no-shadow
  const loginCustomer = (customer) => {
    setCustomer(customer);
    setRegister({ visible: false, customer_id: null, available: true });
    setModalRedeem(true);
  };

  const openModalIssue = () => {
    setModalIssue(true);
  };

  const logoutCustomer = () => {
    navigation.goBack();
    setInitialState();
  };
  const closeModalRedeem = () => setModalRedeem(false);
  const closeModalIssue = () => {
    setModalIssue(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.mainWrapper}>
        <View style={styles.layoutScan}>
          <SuccessScan
            visible={modalRedeem}
            closeVisible={closeModalRedeem}
            plus_point={plus_point}
          />
          <ModalIssueQRCode
            visible={modalIssue}
            closeVisible={closeModalIssue}
          />
          {!customer.actived_at ? (
            <>
              <ViewQRCode>
                <QRCodeScanner
                  cameraType="front"
                  reactivate={true}
                  onRead={onSuccess}
                  reactivateTimeout={3000}
                  customMarker={
                    <Market source={require('../assets/images/market.png')} />
                  }
                  showMarker
                  containerStyle={styles.containerCamera}
                  cameraStyle={styles.camera}
                />
                <TextScanCode>Scan your code here</TextScanCode>
              </ViewQRCode>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.issueBtn}
                onPress={openModalIssue}>
                <Text style={styles.textIssueBtn}>Issue with QR Code?</Text>
              </TouchableOpacity>
              {register.visible && (
                <Register
                  onCloseModal={() =>
                    setRegister((prev) => ({
                      ...prev,
                      visible: false,
                      customer_id: null,
                    }))
                  }
                  visible={register.visible}
                  id_customer={register.customer_id}
                  loginCustomer={loginCustomer}
                  available={register.available}
                />
              )}
            </>
          ) : (
            <SafeAreaView style={styles.infoUserWrapper}>
              <ImageBackground
                style={styles.imageUser}
                source={require('../assets/images/circlePink.png')}>
                <TextPoint point={customer.current_point}>
                  {customer.current_point}
                </TextPoint>
              </ImageBackground>
              <View style={styles.viewInfoUser}>
                <Text style={styles.textName}>
                  {customer.first_name + ' ' + customer.last_name}
                </Text>
                <View style={styles.viewPhoneText}>
                  <Text style={styles.textPhone}>{customer.phone_number}</Text>
                </View>
                <Text style={styles.textDate}>
                  Date Created:{' '}
                  {moment(customer.created_at).isSame('days')
                    ? 'Today'
                    : moment(customer.created_at).format('MM DD YYYY ')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnLogout}
                activeOpacity={0.6}
                onPress={logoutCustomer}>
                <Text style={styles.textLogout}>Logout</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )}
        </View>
        <View style={styles.layoutReward}>
          <TopNavigateScan />
          <Stack.Navigator headerMode="none">
            <Stack.Screen
              name="Reward"
              children={() => <ListReward dataUser={customer} />}
            />
            <Stack.Screen
              name="History"
              children={() => <History customer={customer} />}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ScanPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainWrapper: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
  },
  layoutScan: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  layoutReward: {
    flex: 2,
  },
  containerCamera: {
    alignItems: 'center',
  },
  camera: {
    width: 250,
    height: 250,
    overflow: 'hidden',
  },
  viewCameraContent: {
    flex: 1,
    height: 300,
  },
  issueBtn: {
    width: 226,
    alignItems: 'center',
    height: 24,
    backgroundColor: '#3D4878',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    paddingTop: 4,
    marginTop: 30,
  },
  textIssueBtn: {
    color: '#fff',
    fontFamily: 'AutourOne-Regular',
    fontSize: 12,
  },
  tabIndicator: {
    backgroundColor: 'black',
  },
  tabBar: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  tab: {
    flexDirection: 'row',
  },
  rewardBtn: {
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 15,
    borderColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,

    elevation: 2,
  },
  viewReward: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardBtnActive: {
    backgroundColor: '#F9F9F9',
  },
  pointCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    fontFamily: 'AutourOne-Regular',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 12.5,
  },
  textPercent: {
    fontFamily: 'AutourOne-Regular',
  },
  textDescription: {
    fontFamily: 'AutourOne-Regular',
    color: '#ccc',
    fontSize: 12,
  },
  textBundle: {
    fontFamily: 'AutourOne-Regular',
  },
  infoUserWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  imageUser: {
    width: 226,
    height: 230,
    alignItems: 'center',
  },
  viewInfoUser: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textInsideimage: {
    color: '#C782D3',
    fontSize: 72,
    width: 179,
    height: 78,
    marginTop: 80,
    textAlign: 'center',
    fontFamily: 'AutourOne-Regular',
  },
  textPhone: {
    width: 115,
    height: 15,
    fontFamily: 'AutourOne-Regular',
    color: '#3D4878',
    paddingLeft: 5,
    fontSize: 12,
  },
  textName: {
    color: '#3D4878',
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'AutourOne-Regular',
  },
  textDate: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'AutourOne-Regular',
  },
  btnLogout: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: 168,
    height: 38,
    alignItems: 'center',
    paddingTop: 7,
    marginTop: 30,
  },
  textLogout: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'AutourOne-Regular',
  },
  iconPhone: { width: 15, height: 15, marginRight: 4 },
  market: {
    width: 190,
    height: 190,
    borderColor: 'pink',
    borderRadius: 10,
  },
  viewPhoneText: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 17,
  },
});
