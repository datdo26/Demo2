import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {RawContact} from './types';
import {RootStateOrAny, useSelector} from 'react-redux';

export const groupByKey = (data: any, key: any) => {
  return data.reduce(function (acc: any, item: any) {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});
};

const initContacts: any = {
  byId: {},
  query: []
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: initContacts,
  reducers: {
    update: (state, actions: PayloadAction<RawContact>) => {
      const oldContacts = state;
      const newContact = actions.payload;
      let data={};
      if(!data[newContact.id]){
        data[newContact.id]=newContact
      }
      else {
        data[newContact.id]={}
        data[newContact.id]=newContact;
      }
        return {...oldContacts,
        byId:{
        ...state.byId,
         ...data
        },
        query: {
          ...state.query,
          all:[ ...state?.query['all'] || [],...[newContact.id] ]
        }
      }
    },
    remove: (state, actions:any ) =>{
      return state.byId.id.filter(x => x.id !== actions.payload)
          // .filter(x => x.id !== actions.payload);
    }
  },
});

export const {update, remove} = contactSlice.actions;

export const store = configureStore({
  reducer: {
    contactReducer: contactSlice.reducer,
  },
});

export const updateContactActions = (_contact: RawContact) => {
  store.dispatch(update(_contact));
};

export const removeContactActions = (_contact: RawContact) => {
  store.dispatch(remove(_contact));
};

export const useContacts = (id: string) => {
  return useSelector((state: RootStateOrAny) => state.contactReducer.byId[id]);
};

export const useContactIds = (query: string) => {
  return useSelector((state: RootStateOrAny) => state.contactReducer.query[query]);
};


