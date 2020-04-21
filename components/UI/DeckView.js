import React, {useState} from 'react'
import {FontAwesome} from "@expo/vector-icons";
import {View, StyleSheet, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "./elements/Button";
import {colors} from '../../utils/colors'
import {Card, Layout} from "@ui-kitten/components";
import {removeDeck} from "../../utils/api";
import {removeDeckAction} from "../../store/actions";
import {ActivityIndicator} from "react-native";

const DeckView = ({route, navigation}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {id} = route.params;
    const deck = useSelector(state => state.decks[id]);
    const result = deck === undefined ? 'hola' : deck.results[deck.results.length - 1];
    const handleSubmit = async () => {
        setLoading(true);
        try {
            removeDeck(id)
                .then((decks)=> dispatch(removeDeckAction(decks)))
            navigation.popToTop();
        } catch (e) {
            console.log(e);
            setLoading(false);
        }




    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return(
        <Layout style={styles.container}>
            <View style={{paddingBottom: 15}}>
            <Text style={styles.title}>{result !== undefined ?`You got ${result}% in your previous try` : ''}</Text>
            </View>
            <Card style={styles.card} disabled={true}>
            <FontAwesome name='remove' style={{alignSelf: 'flex-end'}} size={32} onPress={()=> handleSubmit()} underlayColor='green' activeOpacity={0.70}/>
            <View style={styles.textContainer}>
            <Text style={styles.Title}>
                {deck.title}
            </Text>
            <Text style={styles.subTitle}>
                {`${deck.questions.length} cards`}
            </Text>
            </View>
            <View>
                <Button onPress={()=> navigation.navigate(
                    'New Card',
                    {id}
                )} style={{marginBottom: 10}}>
                    <Text>Add Card</Text>
                </Button>
                <Button onPress={() => navigation.navigate(
                    'Quiz',
                    {id,
                    name: `Quiz on ${deck.title}`}
                )}>
                    <Text>Start Quiz</Text>
                </Button>
            </View>
            </Card>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    card: {
        height: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    iconContainer: {
        justifyContent: 'flex-end'
    },
    textContainer: {
        flex:1,
        padding: 15,
        marginTop: '33%',
        marginBottom: '33%'
    },
    Title: {
        textAlign: 'center',
        fontSize: 22,
        color: colors.body
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.subBody
    },
    text: {
        textAlign: 'center'
    }
})

export default DeckView
