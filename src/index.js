import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCBuSTR0ywWkgyeJGgSZrd1xanNy7HpowQ",
    authDomain: "datamatch-bootcamp-15bc3.firebaseapp.com",
    databaseURL: "https://datamatch-bootcamp-15bc3-default-rtdb.firebaseio.com",
    projectId: "datamatch-bootcamp-15bc3",
    storageBucket: "datamatch-bootcamp-15bc3.appspot.com",
    messagingSenderId: "149089437153",
    appId: "1:149089437153:web:36766758108beca5807ea0"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
})
  
// Create store with reducers and initial state (optional)
const store = createStore(rootReducer)

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
