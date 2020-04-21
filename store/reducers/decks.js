import {RECEIVE_DECKS, SAVE_DECK_TITLE, ADD_DECK, ADD_CARD_TO_DECK, ADD_RESULT_TO_DECK, REMOVE_DECK} from "../actions";

const initialData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export const decks = (state= {}, action) => {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case SAVE_DECK_TITLE:
            return {
                ...state,
                ...state.decks,
                ...action.title

            }

        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }

        case ADD_CARD_TO_DECK:
            return {
                ...state,
                    [action.title]: {
                        ...state[action.title],
                        questions: state[action.title].questions.concat([action.card])
                    }

            }

        case ADD_RESULT_TO_DECK:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    results: state[action.title].results.concat([action.result])
                }

            }

        case REMOVE_DECK:
            return {
                ...action.decks
            }

        default:
            return state
    }


}
