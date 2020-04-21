import React, {useState} from 'react';
import {View} from 'react-native'
import {Input, Layout, Text} from "@ui-kitten/components";
import {Button} from "./elements/Button";
import {addDeckContainer, getDecks} from "../../utils/api";
import {useDispatch} from "react-redux";
import {addDeck} from "../../store/actions";
import {AsyncStorage} from 'react-native'


const NewDeck = ({navigation: {navigate}}) => {
    const [input, setInput] = useState('')
    const enabled = input === ''
    const dispatch = useDispatch();
    const handleInput = (e) => {
        setInput(e)
    }


    const handleSubmit =  (e) => {
        e.preventDefault()

        addDeckContainer(input)
            .then(()=> {
                dispatch(addDeck({
                    [input]: {
                        title: input,
                        questions: [],
                        results: []
                    }
                }))
            })
        navigate('Deck List')
        setInput('')
    }

    return (

        <Layout style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
            <View style={{ paddingBottom: 10, textAlign: 'center'}}>
                <Text category="h6">Title</Text>
            </View>
            <View style={{width: '80%', marginBottom: '5%'}}>
                <Input
                    size="medium"
                    textStyle={{fontSize: 25, textAlign: 'center'}}
                    placeholder="Programming 101"
                    value={input}
                    onChangeText={(e)=> handleInput(e)}/>
            </View>

            <Button onPress={(e) => handleSubmit(e)} disabled={enabled}>
                <Text>Create Deck</Text>
            </Button>

        </Layout>
    );
};

export default NewDeck;
