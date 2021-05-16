import React from 'react';
import 'react-native-gesture-handler';
import styled from '@emotion/native';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ApolloProvider from './components/ApolloProvider';
import ScanPage from './components/ScanPage';
import { RootProvider } from './components/RootContext';
import ThankYou from './components/ThankYou';

const { Screen, Navigator } = createStackNavigator();

const Layout = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: 200px;
  height: 200px;
`;
const LogoWraper = styled.View`
  flex: 2;
  margin: 0 auto;
  align-items: center;
`;
const Heading1 = styled.Text`
  margin-top: 0;
  color: #3d4878;
  font-family: 'AutourOne-Regular';
  padding: 20px 20px 0px;
  text-align: center;
  font-size: 32px;
`;
const Heading2 = styled.Text`
  color: #3d4878;
  font-family: 'AutourOne-Regular';
  text-transform: uppercase;
  text-align: center;
  font-size: 32px;
`;
const ScanButtonWrapper = styled.ImageBackground`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 83px;
  padding: 10px;
`;

const ScanBtn = styled.TouchableHighlight`
  background: #f397bb;
  border-radius: 50px;
  align-items: center;
  padding-top: 5px;
  height: 60px;
  width: 100%;
`;
const ScanText = styled.Text`
  font-size: 36px;
  font-family: 'AutourOne-Regular';
  color: white;
`;
const LogoHeader = styled.ImageBackground`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

const LandingPage = ({ navigation }) => {
  const navigateToScan = () => {
    navigation.navigate('ScanPage');
  };
  return (
    <Layout>
      <StatusBar hidden={true} />
      <LogoWraper>
        <Logo source={require('./assets/images/logo.png')} />
      </LogoWraper>

      <Heading1>Checkpoint once per day</Heading1>
      <Heading2>for achieving stunning reward</Heading2>
      <ScanButtonWrapper source={require('./assets/images/scan_btn.png')}>
        <ScanBtn
          underlayColor={'rgba(243, 151, 187, 0.8)'}
          onPress={navigateToScan}>
          <ScanText>Scan</ScanText>
        </ScanBtn>
      </ScanButtonWrapper>
    </Layout>
  );
};

export default () => {
  return (
    <ApolloProvider>
      <RootProvider>
        <NavigationContainer>
          <Navigator initialRouteName="Landing" headerMode="none">
            <Screen
              options={{
                title: '',
                headerRight: (props) => (
                  <LogoHeader
                    {...props}
                    source={require('./assets/images/logo.png')}
                  />
                ),
              }}
              name="Landing"
              component={LandingPage}
            />
            <Screen
              options={{
                title: 'Scan QRCode',
                headerRight: (props) => (
                  <LogoHeader
                    {...props}
                    source={require('./assets/images/logo.png')}
                  />
                ),
              }}
              name="ScanPage"
              component={ScanPage}
            />
            <Screen
              options={{
                title: '',
                headerRight: (props) => (
                  <LogoHeader
                    {...props}
                    source={require('./assets/images/logo.png')}
                  />
                ),
              }}
              name="ThankYou"
              component={ThankYou}
            />
          </Navigator>
        </NavigationContainer>
      </RootProvider>
    </ApolloProvider>
  );
};
