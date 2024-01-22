import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
export type { accType, anyTypeList, bType, toCampaignType, toProfileType } from "../store/dataSlice";


export const store = configureStore({
  reducer: {
    data: dataSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


