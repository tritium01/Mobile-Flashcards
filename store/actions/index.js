export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const ADD_RESULT_TO_DECK = 'ADD_RESULT_TO_DECK'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_USER_PERMISSION = 'ADD_USER_PERMISSION'

export const addUserPermission = (token) => {
    return{
        type: ADD_USER_PERMISSION,
        token,
    }
}

export const removeDeckAction = (decks) => {
    return{
        type: REMOVE_DECK,
        decks
    }
}

export const receiveDecks = (decks) => {
    return{
        type: RECEIVE_DECKS,
        decks,
    }
}

export const addDeck = (deck) => {
    return{
        type: ADD_DECK,
        deck,
    }
}

export const addDeckCard = (title, card) => {
    return {
        type: ADD_CARD_TO_DECK,
        title,
        card
    }
}

export const saveTitle = (title) => {
    return {
        type: SAVE_DECK_TITLE,
        title
    }
}

export const saveResult =  (title, result) => {
    return {
        type: ADD_RESULT_TO_DECK,
        title,
        result
    }
}
