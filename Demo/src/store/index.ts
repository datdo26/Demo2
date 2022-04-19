import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {RawContact} from './types';
import {RootStateOrAny, useSelector} from 'react-redux';

const initContacts: any = {
  byId: {},
  query: {},
  byName: {},
};
const _ = require('lodash');

const contactSlice = createSlice({
  name: 'contact',
  initialState: initContacts,
  reducers: {
    update: (state, actions: PayloadAction<RawContact>) => {
      const oldContacts = state;
      const newContact = actions.payload;
      let data = {};
      if (!data[newContact.id]) {
        data[newContact.id] = newContact;
      } else {
        data[newContact.id] = {};
        data[newContact.id] = newContact;
      }
      return {
        ...oldContacts,
        byId: {
          ...state.byId,
          ...data,
        },
        query: {
          ...state.query,
          // @ts-ignore
          all: [...new Set([...(state?.query['all'] || []), newContact.id])],
          // all: [...state?.query['all'] || [], ...[newContact.id]]
        },
      };
    },
    remove: (state, actions: PayloadAction<{key: string}>) => {
      let query = {...state.query};
      let all = [...query['all']];
      const _delete = all.filter(x => x != actions.payload.key);
      return {
        ...state,
        query: {
          ...state.query,
          all: _delete,
        },
      };
    },
  },
});

export const {update, remove} = contactSlice.actions;

export const store = configureStore({
  reducer: {
    contactReducer: contactSlice.reducer,
  },
});

export const updateContactActions = (_contact: RawContact) => {
  return store.dispatch(update(_contact));
};

export const removeContactActions = (key: string) => {
  return store.dispatch(remove({key}));
};

export const useContacts = (id: string) => {
  return useSelector((state: RootStateOrAny) => state.contactReducer.byId[id]);
};

export const useContactIds = (query: string) => {
  return useSelector(
    (state: RootStateOrAny) => state.contactReducer.query[query],
  );
};
