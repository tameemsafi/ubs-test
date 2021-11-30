import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type FiltersSliceState = {
  spendRangeValue: number
}

const initialState: FiltersSliceState = {
  spendRangeValue: 0,
}

export const FiltersSlice = createSlice({
  name: 'FiltersSlice',
  initialState,
  reducers: {
    setSpendRangeValue(state, action: PayloadAction<number>) {
      state.spendRangeValue = action.payload
    },
  },
})

export const { setSpendRangeValue } = FiltersSlice.actions

export const selectSpendRangeValue = (state: RootState) =>
  state.FiltersReducers.spendRangeValue

export default FiltersSlice.reducer
