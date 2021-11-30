import { configureStore } from '@reduxjs/toolkit'
import { AppApi } from './features/App/AppApi'
import NavigationReducer from './features/Navigation/NavigationSlice'
import FiltersReducers from './features/Filters/FiltersSlice'

export const store = configureStore({
  reducer: {
    [AppApi.reducerPath]: AppApi.reducer,
    NavigationReducer,
    FiltersReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AppApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
