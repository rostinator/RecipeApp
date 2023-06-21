import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
    HeartIcon as HeartIconSolid,
    CogIcon as CogIconSolid,
    HomeIcon as HomeIconSolid
} from 'react-native-heroicons/solid';
import {
    HeartIcon as HeartIconOutline,
    CogIcon as CogIconOutline,
    HomeIcon as HomeIconOutline
} from 'react-native-heroicons/outline';
import SettingScreen from "./screens/SettingScreen";
import {themeColors} from "./theme";
import FavouriteScreen from "./screens/FavouriteScreen";
import RecipeScreen from "./screens/RecipeScreen";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={TabNavigation}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Favourite'
                    component={FavouriteScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name='Setting'
                    component={SettingScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name='recipe'
                    component={RecipeScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => menuIcon(route, focused),
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: themeColors.lightBg
                },
            })}
        >
            <Tab.Screen name='home' component={HomeScreen}/>
            <Tab.Screen name='favourite' component={FavouriteScreen}/>
            <Tab.Screen name='setting' component={SettingScreen}/>
        </Tab.Navigator>
    )
}

const menuIcon = (route, focused) => {
    let menuIcon;
    switch (route.name) {
        case 'home':
            menuIcon = focused ? <HomeIconSolid size='38' color='white'/> :
                <HomeIconOutline strokeWidth={2} size='30' color='white'/>
            break
        case 'favourite':
            menuIcon = focused ? <HeartIconSolid size='38' color='white'/> :
                <HeartIconOutline strokeWidth={2} size='30' color='white'/>
            break
        case 'setting':
            menuIcon = focused ? <CogIconSolid size='38' color='white'/> :
                <CogIconOutline strokeWidth={2} size='30' color='white'/>
            break
    }

    return (
        menuIcon
    )
}