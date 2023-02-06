import React from "react";
import './App.css';
import Countries from './pages/Countries';
import thunkMiddleware from 'redux-thunk'
import countriesReducer from './pages/Countries/reducers/countries.js';
import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {Route, Routes, NavLink} from "react-router-dom";
import AddEditCountry from "./components/AddEditCountry";


const resultReducer = combineReducers({
    countries: countriesReducer,
});
const store = createStore(
    resultReducer,
    applyMiddleware(thunkMiddleware)
);


function App() {
    return (

        <div className="main">
            <div>
                <h2>Countries List</h2>
            </div>
            <div>
                <NavLink to="/" exact="true">Countries List</NavLink>
                <NavLink to="/addEditCountry">Add Country</NavLink>
            </div>
            <div>
                <Provider store={store}>
                    <Routes>
                        <Route exact path='/' element={<Countries/>}/>
                        <Route exact path='/addEditCountry' element={<AddEditCountry/>}/>
                        <Route path='/addEditCountry/:id' element={<AddEditCountry/>}/>
                    </Routes>
                </Provider>
            </div>
        </div>

    )
        ;
}

export default App;
