import React from 'react'
import { Navigation } from '../Navigation'
import { Applications } from '../Applications'
import { Filters } from '../Filters'
import { useGetDataQuery } from './AppApi'
import {
  Wrapper,
  LoadingMessage,
  ErrorMessage,
  LeftSide,
  RightSide,
} from './App.styles'

export const App = () => {
  const { isLoading, isError } = useGetDataQuery()

  if (isLoading) {
    return <LoadingMessage>Loading data...</LoadingMessage>
  }

  if (isError) {
    return <ErrorMessage>Error loading data</ErrorMessage>
  }

  return (
    <Wrapper>
      <LeftSide>
        <Navigation />
        <Filters />
      </LeftSide>
      <RightSide>
        <Applications />
      </RightSide>
    </Wrapper>
  )
}
