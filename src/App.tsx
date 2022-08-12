import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";


import {AddPollPage} from "./Components/AddPollPage/AddPollPage";

export const App = () => {
    return (
        <BrowserRouter basename="/admin-tc">
            <Routes>
                <Route path="/add-polls" element={
                    <RequireAuth>
                        <AddPollPage/>
                    </RequireAuth>
                }/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}