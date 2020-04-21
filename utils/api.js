import {DATA_STORAGE_KEY, PERMISSION_KEY} from "./keys";
import {AsyncStorage} from "react-native";


export const setUserPermission = async (key) => {
    //asks user for permission in order to use push notification. In this project local notifications are used but for future practice push key was stored
    try {
        await AsyncStorage.setItem(PERMISSION_KEY, key)
    } catch (e) {
        console.log(e)
    }
}

export const getUserPermission = async () => {

    try {
        return  await AsyncStorage.getItem(PERMISSION_KEY)
    }catch (e) {
        console.log(e)
    }
}

export const addDeckContainer = async(title) => {
    //makes a new deck takes in title of deck
    try {
        return await AsyncStorage.mergeItem(DATA_STORAGE_KEY , JSON.stringify({
            [title]: {
                title,
                questions: [],
                results: []
            }
        }))
    }catch (e) {
        console.warn(e.message)
    }
}
export const getDecks = async () => {
    // get full deck with titles questions and answers
    try {
   return  JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
    }catch (e) {
    console.log(e)
    }
}

export const removeDeck = async(title) => {
    //Removes specific deck from decks
    try {
        const deck = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
        delete deck[title]
        await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(deck))
        return JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
    }catch (e) {
        console.log(e)
    }
}


export const addCardToDeck = async (title, question, answer) => {
    //takes in title and card and will add card to question key for the deck associated with title
    try {
    const deck = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
    deck[title].questions.push({question: question, answer: answer})
    await AsyncStorage.removeItem(DATA_STORAGE_KEY)
    }catch (e) {

    }
}

export const addResultToDeck = async (title, result) => {
    //takes in title and card and will add card to question key for the deck associated with title
    try {
        const deck = JSON.parse(await AsyncStorage.getItem(DATA_STORAGE_KEY))
        deck[title].results.push(result)
        await AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify(deck))
    }catch (e) {

    }
}
