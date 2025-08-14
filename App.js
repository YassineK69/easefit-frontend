import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import HomeScreen from './screens/HomeScreen';
import GraphsScreen from './screens/GraphsScreen';
import ListScreen from './screens/ListScreen';
import NewActivityScreen from './screens/NewActivityScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import CustomTabBarBackground from './components/CustomTabBarBackground';
import user from './reducers/user';
import activities from './reducers/activities';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user, activities },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return (
              <Image
                source={require('./assets/images/logo3.png')}
                style={{ width: 100, height: 100, tintColor: color, resizeMode: 'contain', paddingTop:20 }} />
            );
          } else if (route.name === 'Profile') {
              return <FontAwesome name="user" size={size} color={color} />;
          } else if (route.name === 'Graphs'){
              return <FontAwesome name="bar-chart-o" size={size} color={color} />;
          }
        },
         tabBarStyle: {
          backgroundColor: 'transparent', 
          borderTopWidth: 0,
          elevation: 0, 
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: '#ec6e5b',
        tabBarInactiveTintColor: '#335561',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Graphs"
        component={GraphsScreen}
        options={
          {
            tabBarBackground: () => <CustomTabBarBackground />,
          } // voir si integration d'un background tabbar ou laisser blanc 
        }
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarBackground: () => <CustomTabBarBackground />,
        }}
      />
      <Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
   
    tabBarStyle: {
      backgroundColor: 'rgba(0,0,0,0.5)', // transparence
      borderTopWidth: 0,
      elevation: 0,
      height: 90,
      position: 'absolute', 
    },
    tabBarActiveTintColor: '#ec6e5b', // texte actif blanc
    tabBarInactiveTintColor: '#ccc', // texte inactif gris clair
  }}
/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="NewActivity" component={NewActivityScreen} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
