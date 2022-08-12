import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{

    },
});


export default userSlice.reducer