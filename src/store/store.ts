import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { projectsSlice } from './projects/projectsSlice';
import storage from 'redux-persist/lib/storage';
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
import { authSlice } from './auth/authSlice';

const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage,
};

const rootReducer = combineReducers({ projects: projectsSlice.reducer, auth: authSlice.reducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
