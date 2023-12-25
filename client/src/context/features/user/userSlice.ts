"use client"

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '@/utils/supabase';
import { UserProps } from '@/types/supabase.interface';


type RequestState = 'pending' | 'fulfilled' | 'rejected';

interface UserState {
  user: UserProps | null;
  requestState: RequestState;
}

const initialState: UserState = {
  user: null,
  requestState: 'pending'
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (name, { rejectWithValue }) => {

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) return rejectWithValue(authError.message);

    const { data: userFetchData, error: userFetchError } = await supabase.rpc("get_user", { user_id_input: authData.user.id });
    if (userFetchError) return rejectWithValue(userFetchError);

    return userFetchData[0];
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.requestState = "fulfilled";
      state.user = action.payload;
    })
    builder.addCase(fetchUser.pending, (state) => {
      state.requestState = "pending";
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.requestState = "rejected";
      state.user = null;
    })
  },
})

export const { } = userSlice.actions
export default userSlice.reducer
