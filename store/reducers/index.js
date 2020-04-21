import { combineReducers } from 'redux';
import {decks} from './decks'
import {permissions} from "./permissions";

export default combineReducers({
    decks,
    permissions
});
