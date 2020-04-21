import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native'
import {Card, Input} from "@ui-kitten/components";
import {Layout} from "@ui-kitten/components";
import {addCardToDeck} from "../../utils/api";
import {useDispatch} from "react-redux";
import {addDeckCard} from "../../store/actions";
import {Button} from "./elements/Button";

const AddCard = ({navigation: {goBack}, route}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch();

    const {id} = route.params

    const handleQuestion = (e) => {
        setQuestion(e)
    }
    const handleAnswer = (e) => {
        setAnswer(e)
    }
    const handleSubmit = (e) => {
        e.preventDefault(e)
        addCardToDeck(id, question, answer)
            .then(()=> dispatch(addDeckCard(id,{
                question: question,
                answer: answer
            })))
            .then(()=> goBack())
    }
    return (
        <Layout style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
            <Input onChangeText={(e)=> handleQuestion(e)} placeholder='Question' style={{marginBottom: 20, width: '80%'}}/>
            <Input onChangeText={(e)=> handleAnswer(e)} placeholder='Answer' style={{marginBottom: 20, width: '80%'}}/>
            <View style={{}}>
            <Button onPress={(e)=> handleSubmit(e)}>
                <Text>Add Card</Text>
            </Button>
            </View>
        </Layout>
    );
};

export default AddCard;
