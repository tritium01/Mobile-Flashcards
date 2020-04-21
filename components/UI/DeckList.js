import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Card, Text} from '@ui-kitten/components';
import {getDecks, getUserPermission} from "../../utils/api";
import {addUserPermission, receiveDecks} from "../../store/actions";
import {getToken, setLocalNotification} from "../../utils/helpers";
import {Foundation} from "@expo/vector-icons";
import{colors} from "../../utils/colors";




const DeckList = ({navigation}) => {
    const decks = useSelector(state => state.decks)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
    setLocalNotification()
    getToken()
        .then(() => {
            getUserPermission()
                .then((token)=> dispatch(addUserPermission(token)))
        })
    getDecks()
        .then((decks)=> dispatch(receiveDecks(decks)))
        .then(()=> setLoading(false))
    }, [getDecks, getToken])


    if(loading){
        return (
            <View style={styles.container}>
            <ActivityIndicator size='large' color={colors.primary}/>
            </View>
        )
    }

    if(Object.keys(decks).length === 0){
        return (
            <View style={{flex:1 , justifyContent: 'center', alignItems: 'center'}}>
                <Foundation name='folder-add' size={80}/>
                <Text>Please add your first card!</Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
            {Object.values(decks).map(deck=> {
                return(
                    <View style={styles.container} key={deck.title}>

                        <Card  appearance='filled' style={styles.card} onPress={()=> navigation.push(
                            'Deck',
                            {id: deck.title,
                            name: deck.title}
                        )}>
                            <View>
                            <View>
                            <Text style={{textAlign: 'center', color: colors.body}}>
                                {deck.title}
                            </Text>

                            <Text style={{textAlign: 'center', color: colors.subBody}}>
                                {`${deck.questions.length} cards`}
                            </Text>
                            </View>
                            </View>
                        </Card>
                    </View>


                )
            })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    card: {
        marginTop: 10,
        width: '85%',
        height: 80,
        justifyContent: 'center',
        alignContent: 'center',
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 8,
        elevation: 5,
    },
    icon: {
        width: 32,
        height: 32,
    },
})

export default DeckList;
