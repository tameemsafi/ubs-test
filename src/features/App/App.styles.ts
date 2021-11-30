import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const ErrorMessage = styled.p`
  color: red;
`

export const LoadingMessage = styled.p`
  color: black;
`

export const LeftSide = styled.div`
  margin-right: 30px;
  width: 350px;
  border-right: 1px solid black;
`

export const RightSide = styled.div`
  width: calc(100% - 350px);
`
