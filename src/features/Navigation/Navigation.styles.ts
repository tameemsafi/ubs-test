import styled from 'styled-components'

export const Wrapper = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 30px;
  padding: 5px 15px 30px 15px;
`

export const Title = styled.h2`
  margin: 0 0 15px 0;
  padding: 0;
`

export const TreeList = styled.ul<{ isChild?: boolean }>`
  padding: 0;
  padding-left: ${(props) => (props.isChild ? 15 : 0)}px;
  margin: 0;
`

export const TreeItem = styled.li`
  list-style: none;
  padding: 3px 0;
`

export const TreeItemInner = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`

export const TreeItemCaret = styled.button`
  border: none;
  padding: none;
  background-color: transparent;
  position: absolute;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`

export const TreeItemName = styled.button<{ isSelected?: boolean }>`
  border: none;
  padding: none;
  background-color: transparent;
  padding-left: 55px;

  ${(props) => (props.isSelected ? 'text-decoration: underline;' : '')}

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`
