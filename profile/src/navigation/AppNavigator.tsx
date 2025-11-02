import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

import HomeScreen from '../screens/HomeScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import AddressInfoScreen from '../screens/AddressInfoScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'User Profiles', headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="BasicInfo"
          component={BasicInfoScreen}
          options={{ title: 'Basic Info', headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="AddressInfo"
          component={AddressInfoScreen}
          options={{ title: 'Address Info', headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ title: 'Summary', headerBackTitleVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;