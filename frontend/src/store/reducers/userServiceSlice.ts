import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../axios'
import { authState } from "../../types/types"

const initialState: authState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
    avatar: null,
}

export const updateUsername = createAsyncThunk('auth/updateUsername', async (newUsername: string) => {
    try {
      const { data } = await axios.patch('/auth/updateusername', { newUsername });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  
  export const updateEmail = createAsyncThunk('auth/updateEmail', async (newEmail: string) => {
    try {
      const { data } = await axios.patch('/auth/updateemail', { newEmail });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (params: any) => {
    try {
      const { data } = await axios.post('/auth/changeimg', params)
      return data
    } catch (e) {
      console.log(e)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
                  //changeName , Email , Username
                  builder.addCase(updateEmail.pending, (state) => {
                    state.isLoading = true;
                    state.status = null
                  });
                  builder.addCase(updateEmail.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.status = action.payload.message
                  });
                  builder.addCase(updateEmail.rejected, (state, action: any) => {
                    state.isLoading = false;
                    state.status = action.payload.message || 'Произошла ошибка'
                  });
        
                  builder.addCase(updateUsername.pending, (state) => {
                    state.isLoading = true;
                    state.status = null
                  });
                  builder.addCase(updateUsername.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.status = action.payload.message
                  });
                  builder.addCase(updateUsername.rejected, (state, action: any) => {
                    state.isLoading = false;
                    state.status = action.payload.message || 'Произошла ошибка'
                  });
                  //img 
                  builder.addCase(uploadAvatar.pending, (state) => {
                    state.isLoading = true;
                  });
                  builder.addCase(uploadAvatar.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.avatar = action.payload
                  });
                  builder.addCase(uploadAvatar.rejected, (state) => {
                    state.isLoading = false;
                  });                 
}})

export const checkIsAuth = (state: authState) => Boolean(state.token || localStorage.getItem('token'));
export default authSlice.reducer