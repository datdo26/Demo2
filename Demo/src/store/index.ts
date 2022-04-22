import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {RawContact} from './types';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initContacts: any = {
  byId: {},
  query: {},
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

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
    updateHistory: (
      state,
      actions: PayloadAction<{key: string; value: string; time: string}>,
    ) => {
      let byId = {...state.byId};
      byId[actions.payload.key].actionLog = actions.payload.value;
      byId[actions.payload.key].historyLog = actions.payload.time;
    },

    updateActionCount: (state, actions: PayloadAction<{key: string}>) => {
      let byId = {...state.byId};
      byId[actions.payload.key].totalAction += 1;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, contactSlice.reducer);

export const {update, remove, updateHistory, updateActionCount} =
  contactSlice.actions;

const store = configureStore({
  reducer: {
    contactReducer: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

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

export const updateContactHistory = (
  key: string,
  value: string,
  time: string,
) => {
  return store.dispatch(updateHistory({key, value, time}));
};

export const updateContactActionCount = (key: string) => {
  return store.dispatch(updateActionCount({key}));
};
