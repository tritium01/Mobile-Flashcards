import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Card, Layout} from '@ui-kitten/components'
import {addResultToDeck} from "../../utils/api";
import {saveResult} from "../../store/actions";
import {useDispatch} from "react-redux";
import {Button} from "./elements/Button";
import {useNavigation} from '@react-navigation/native'
import {Entypo} from "@expo/vector-icons";


const QuizResult = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const result = props.result
    useEffect(() => {
        addResultToDeck(props.title, result)
        .then(() => {
            dispatch(saveResult(props.title, result))
        })
    }, [])
    const iconHandler = () => {
        if(result > 90) {
            return 'emoji-happy'
        } else if (result < 90 && result > 60) {
            return 'emoji-neutral'
        } else {
            return 'emoji-sad'
        }
    }

    return (
        <Layout style={styles.container}>
            <Card style={styles.card}>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Entypo name={iconHandler()} size={80}/>
                </View>
                <View style={{alignItems: 'center', marginBottom: 30,}}>
                <Text style={{textAlign: "center"}}>{`You scored ${result}%`}</Text>
                </View>
                <Button onPress={() => props.reset()} style={{marginBottom: 10}}>
                    <Text>Try Again</Text>
                </Button>
                <Button onPress={()=> navigation.navigate('Deck')}>
                    <Text>Go back</Text>
                </Button>
            </Card>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: '60%',
        justifyContent: 'space-evenly',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default QuizResult;
