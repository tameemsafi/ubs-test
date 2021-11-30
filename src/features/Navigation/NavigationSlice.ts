import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type NavigationSliceState = {
  selectedId: string | null
  visibleIds: string[]
}

const initialState: NavigationSliceState = {
  selectedId: null,
  visibleIds: [],
}

export const NavigationSlice = createSlice({
  name: 'NavigationSlice',
  initialState,
  reducers: {
    toggleSelectId(state, action: PayloadAction<string>) {
      if (state.selectedId === action.payload) {
        state.selectedId = null
      } else {
        state.selectedId = action.payload
      }
    },
    toggleVisibleId(state, action: PayloadAction<string>) {
      const index = state.visibleIds.indexOf(action.payload)

      if (index !== -1) {
        state.visibleIds.splice(index, 1)
      } else {
        state.visibleIds.push(action.payload)
      }
    },
  },
})

export const { toggleSelectId, toggleVisibleId } = NavigationSlice.actions

export const selectSelectedId = (state: RootState) =>
  state.NavigationReducer.selectedId
export const selectVisibleIds = (state: RootState) =>
  state.NavigationReducer.visibleIds

export default NavigationSlice.reducer
