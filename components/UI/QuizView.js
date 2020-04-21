import React, {useState} from 'react';
import {View, StyleSheet } from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {Layout, Card, Text, Button} from "@ui-kitten/components";
import {Entypo} from "@expo/vector-icons";
import QuizResult from "./QuizResult";
import {setLocalNotification, clearLocalNotification} from "../../utils/helpers";


const QuizView = ({navigation, route}) => {
    const [counter, setCounter] = useState(0)
    const [side, setSide] = useState(true)
    const [score, setScore] = useState(0)
    const dispatch = useDispatch()
    const deck = useSelector(state => state.decks[route.params.id])
    const questions = (deck.questions.length > 0 ? deck.questions[counter] !== undefined ? deck.questions[counter] : 'finished' : [])


    const checker = (value) => {
        if(counter <= deck.questions.length - 1){
            if(value === 'correct'){
                setScore(score + 1)
            }
            setCounter(counter + 1)
            setSide(true)

        }
    }
    const resultCalc = () => {
        return (score / deck.questions.length) * 100
    }
    const handleResetChild = () => {
        setCounter(0)
        setScore(0)
    }


    if (questions.length === 0){
        return(
        <View style={styles.container}>
            <Entypo name='add-to-list' size={80}/>
            <Text>Please add a Flash card before starting</Text>
        </View>
        )
    }


    if (questions === 'finished'){
        clearLocalNotification()
        setLocalNotification()

        return <QuizResult result={resultCalc()} title={route.params.id} reset={handleResetChild} navigation={navigation}/>
    }


    if(side === true) {
        return (
            <Layout style={styles.container}>
                <View>
                    <Text>{`${counter + 1}/${deck.questions.length}`}</Text>
                </View>
                <Card style={styles.card}>
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Text styles={styles.text} category='h3'>
                        {`${questions.question}`}
                    </Text>
                    </View>
                    <View style={{width: "100%", justifyContent: 'center', alignSelf: 'center'}}>
                        <Button onPress={() => setSide(false)} style={styles.button}>
                            <Text>Show Answer</Text>
                        </Button>
                    </View>
                </Card>
            </Layout>

        );
    } else if (side === false) {
        return (
            <Layout style={styles.container}>
                <View>
                    <Text>{`${counter + 1}/${deck.questions.length}`}</Text>
                </View>
                <Card style={styles.card} onPress={() => setSide(true)}>

                    <View>
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Text styles={styles.text} category='h3'>
                        {`${questions.answer}`}
                    </Text>
                    </View>
                    <View style={{width: '100%', alignSelf: 'center'}}>
                        <Button onPress={() => checker('correct')} style={styles.button}>
                            <Text>Correct</Text>
                        </Button>
                        <Button onPress={() => checker('incorrect')} status='danger' style={styles.button}>
                            <Text>Incorrect</Text>
                        </Button>
                    </View>
                    </View>
                </Card>
            </Layout>
        )
    }

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'

    },
    card: {
    height: '80%',
    width: '70%',
    justifyContent: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    },
    button: {
        paddingHorizontal: 40,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
})

export default QuizView;
