import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { selectSpendRangeValue, setSpendRangeValue } from './FiltersSlice'
import {
  Wrapper,
  Title,
  SubTitle,
  SpendingSlider,
  SpendingSliderTextWrapper,
  SpendingSliderText,
} from './Filters.styles'
import { useGetDataQuery } from '../App/AppApi'

export const Filters = () => {
  const { data, isLoading, isError } = useGetDataQuery()
  const spendRangeValue = useAppSelector(selectSpendRangeValue)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data?.maxSpend) {
      dispatch(setSpendRangeValue(data?.maxSpend))
    }
  }, [data, dispatch])

  if (!data || isLoading || isError) {
    return null
  }

  return (
    <Wrapper>
      <Title>Filters</Title>
      <SubTitle>Spending</SubTitle>
      <SpendingSlider
        type="range"
        data-testid="spending-filter-input"
        min={data.minSpend}
        max={data.maxSpend}
        value={spendRangeValue}
        onChange={(event) =>
          dispatch(setSpendRangeValue(event.target.valueAsNumber))
        }
      />
      <SpendingSliderTextWrapper>
        <SpendingSliderText>${data.minSpend / 100}</SpendingSliderText>
        <SpendingSliderText>${data.maxSpend / 100}</SpendingSliderText>
      </SpendingSliderTextWrapper>
    </Wrapper>
  )
}
