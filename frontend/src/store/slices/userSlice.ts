import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { AuthData } from "../../../utils/types";


const initialState: AuthData={
    user:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<AuthData['user']>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
        },
    }
})

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;