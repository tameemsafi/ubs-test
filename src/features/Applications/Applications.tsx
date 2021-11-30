import React from 'react'
import { useGetDataQuery } from '../App/AppApi'
import { useAppSelector } from '../../hooks'
import { selectSelectedId } from '../Navigation/NavigationSlice'
import { selectSpendRangeValue } from '../Filters/FiltersSlice'
import {
  Wrapper,
  ApplicationItem,
  ApplicationTitle,
  ApplicationSpend,
} from './Applications.styles'

export const Applications = () => {
  const selectedId = useAppSelector(selectSelectedId)
  const spendRangeValue = useAppSelector(selectSpendRangeValue)
  const { data, isLoading, isError } = useGetDataQuery()

  if (!data || isLoading || isError) {
    return null
  }

  return (
    <Wrapper>
      {data.applications
        ?.filter((app) =>
          selectedId ? app.capIds.indexOf(selectedId) !== -1 : true
        )
        .filter((app) => app.spend <= spendRangeValue)
        .map(({ id, name, spend }) => (
          <ApplicationItem key={id} data-testid="application-item">
            <ApplicationTitle>{name}</ApplicationTitle>
            <ApplicationSpend>Total spend: ${spend / 100}</ApplicationSpend>
          </ApplicationItem>
        ))}
    </Wrapper>
  )
}
