import React from 'react'
import { useGetDataQuery } from '../App/AppApi'
import { Wrapper, Title } from './Navigation.styles'
import { CapabilityTree } from './CapabilityTree'

export const Navigation = () => {
  const { data, isLoading, isError } = useGetDataQuery()

  if (isLoading || isError) {
    return null
  }

  return (
    <Wrapper>
      <Title>Navigation</Title>
      <CapabilityTree capabilities={data?.capabilities} />
    </Wrapper>
  )
}
