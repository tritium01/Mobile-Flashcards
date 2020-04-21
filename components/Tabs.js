import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons'
import {colors} from "../utils/colors";
import DeckList from "./UI/DeckList";
import NewDeck from "./UI/NewDeck";
import DeckView from "./UI/DeckView";
import QuizView from "./UI/QuizView";
import AddCard from "./UI/AddCard";
import QuizResult from "./UI/QuizResult";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTransition = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    }
}

const Tabs = () => {
    return(

        <Tab.Navigator
        screenOptions={({route})=> ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Deck List') {
                    iconName = focused
                        ? 'ios-book'
                        : 'ios-list';
                } else if (route.name === 'New Deck') {
                    iconName = focused ? 'ios-add' : 'ios-add';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: colors.accent,
        }}
        >
            <Tab.Screen name="Deck List" component={DeckList}/>
            <Tab.Screen name="New Deck" component={NewDeck}/>
        </Tab.Navigator>


    )
}


const MainNav = () => {
    return(
        <NavigationContainer
        screenOptions={{

        }}
        >
            <Stack.Navigator
            screenOptions={{
                transitionSpec:{
                    open: MyTransition,
                    close: MyTransition
                }
            }}
            >
                <Stack.Screen name='Home' component={Tabs} />
                <Stack.Screen name='Deck' component={DeckView} options={({route}) => ({title: route.params.name})}/>
                <Stack.Screen name='Quiz' component={QuizView} options={({route}) => ({title: route.params.name})}/>
                <Stack.Screen name='Quiz Result' component={QuizResult}/>
                <Stack.Screen name='New Card' component={AddCard} options={{transitionSpec:{open: MyTransition, close: MyTransition}}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNav
