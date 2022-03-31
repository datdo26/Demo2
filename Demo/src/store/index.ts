import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import {RawContact} from "./types";
import {useSelector} from "react-redux";

const initContacts: RawContact[] = []

const contactSlice = createSlice({
    name: 'contact',
    initialState: initContacts,
    reducers: {
        update: (state, actions: PayloadAction<RawContact>) => {
            const oldContacts = state;
            const newContact = actions.payload;
            const existIndex = oldContacts.findIndex(item => item.id === newContact.id);
            if (existIndex > -1) {
                oldContacts[existIndex] = newContact;
                return oldContacts
            }
            return [
                newContact,
                ...oldContacts
            ]
        },
        remove: (state, actions: PayloadAction<RawContact>) => {
            return state
        }
    }
})

export const {update, remove} = contactSlice.actions

export const store = configureStore({
    reducer: {
        contactReducer: contactSlice.reducer
    }
})

export const updateContactActions = (_contact: RawContact) => {
    store.dispatch(update(_contact))
}

export const removeContactActions = (_contact: RawContact) => {
    store.dispatch(remove(_contact))
}

export const useContacts = () => {
    return useSelector(state => state.contactReducer)
}
