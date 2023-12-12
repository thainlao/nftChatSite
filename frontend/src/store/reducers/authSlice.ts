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

export const registerUser = createAsyncThunk('auth/registerUser', 
    async({username, password, email}: any) => {
        try {
            const { data } = await axios.post('/auth/registration', {
                username, password, email
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (e) {
            console.log(e)
        }
})

export const loginUser = createAsyncThunk('auth/loginUse', 
    async({password, email}: any) => {
        try {
            const { data } = await axios.post('/auth/login', {
              password, email
            })
            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (e) {
            console.log(e)
        }
})

export const getMe = createAsyncThunk('auth/getMe', 
  async() => {
    try {
      const { data } = await axios.get('/auth/getuser')
      return data
    } catch (e) {
      console.log(e)
    }
})

export const addEthWallet = createAsyncThunk('auth/addEtherWallet',
  async({wallet}: any) => {
    try {
      const { data } = await axios.post('/auth/addethwallet', {wallet})
      return data
    } catch (e) {
      console.log(e)
    }
  }
)

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email: string) => {
    try {
      const { data } = await axios.post('/auth/requestreset', {email})
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ resetToken, newPassword }: { resetToken: any, newPassword: string }) => {
    try {
      const { data } = await axios.post("/auth/resetpassword", { resetToken, newPassword });
      return data
    } catch (error) {
      throw error;
    }
  }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.token = null;
        state.user = null;
        state.isLoading = false;
        state.status = null;
      }
    },
    extraReducers: (builder) => {
        //Register
          builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
          });
          builder.addCase(registerUser.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });

          //login
          builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
          });
          builder.addCase(loginUser.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });
          //get me
          builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
          });
          builder.addCase(getMe.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });
          //requestpaaword
          builder.addCase(requestPasswordReset.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(requestPasswordReset.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
          });
          builder.addCase(requestPasswordReset.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });
          //resetPassword
          builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.status = null
          });
          builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message
          });
          builder.addCase(resetPassword.rejected, (state, action: any) => {
            state.isLoading = false;
            state.status = action.payload.message || 'Произошла ошибка'
          });
}})

export const checkIsAuth = (state: authState) => Boolean(state.token);
export const {logout} = authSlice.actions
export default authSlice.reducer