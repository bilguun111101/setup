/// <reference types="redux-persist/types/persistreducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").EmptyObject & {
    auth: import("@goodtechsoft/xs-auth-native").Auth;
    post: import("@goodtechsoft/xs-post-native").IGeneral;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("redux").EmptyObject & {
    auth: import("@goodtechsoft/xs-auth-native").Auth;
    post: import("@goodtechsoft/xs-post-native").IGeneral;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction>]>>;
declare const persistor: import("redux-persist").Persistor;
export { store, persistor };
//# sourceMappingURL=index.d.ts.map