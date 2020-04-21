import React, {useState, useEffect} from 'react';
import { AppLoading } from 'expo';
import {Provider} from 'react-redux'
import * as eva from '@eva-design/eva'
import {ApplicationProvider, IconRegistry, Layout, Text} from "@ui-kitten/components";
import store from "./store/config/store";
import {View} from 'react-native'
import MainNav from "./components/Tabs";
import {EvaIconsPack} from "@ui-kitten/eva-icons";

const App = () => {
        return (
            <Provider store={store}>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <View style={{flex:1}}>
                    <MainNav/>
                    </View>
                </ApplicationProvider>
            </Provider>
        );
}

export default App

