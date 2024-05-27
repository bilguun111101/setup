import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer } from "@goodtechsoft/xs-auth-native";
import { postReducer } from "@goodtechsoft/xs-post-native";
const persistConfig = {
  key: "root",
  storage: AsyncStorage
};
const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });
  }
});
const persistor = persistStore(store);
export { store, persistor };
//# sourceMappingURL=index.js.map