import React from 'react'
import { CapabilityItem } from '../App/AppApi'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectSelectedId,
  selectVisibleIds,
  toggleVisibleId,
  toggleSelectId,
} from './NavigationSlice'
import {
  TreeList,
  TreeItem,
  TreeItemName,
  TreeItemInner,
  TreeItemCaret,
} from './Navigation.styles'

type Props = {
  capabilities?: CapabilityItem[]
  parentId?: string
  isChild?: boolean
}

export const CapabilityTree = ({ capabilities, parentId, isChild }: Props) => {
  const selectedId = useAppSelector(selectSelectedId)
  const visibleIds = useAppSelector(selectVisibleIds)
  const dispatch = useAppDispatch()

  const items = capabilities?.filter((cap) =>
    parentId ? cap.parentId === parentId : !cap.parentId
  )

  if (!items) {
    return null
  }

  return (
    <TreeList isChild={isChild}>
      {items.map((cap) => {
        const isVisible = visibleIds.indexOf(cap.id) !== -1
        const childItems = capabilities?.filter(
          (childCap) => childCap.parentId === cap.id
        )

        return (
          <TreeItem key={cap.id}>
            <TreeItemInner>
              {childItems && childItems.length > 0 && (
                <TreeItemCaret
                  data-testid={`open-${cap.name}`}
                  onClick={() => dispatch(toggleVisibleId(cap.id))}
                >
                  {isVisible ? '(close)' : '(open)'}
                </TreeItemCaret>
              )}
              <TreeItemName
                data-testid={`${
                  selectedId !== cap.id ? 'select' : 'unselect'
                }-${cap.name}`}
                onClick={() => dispatch(toggleSelectId(cap.id))}
                isSelected={selectedId === cap.id}
              >
                {cap.name}
              </TreeItemName>
            </TreeItemInner>

            {isVisible && (
              <CapabilityTree
                capabilities={capabilities}
                parentId={cap.id}
                isChild
              />
            )}
          </TreeItem>
        )
      })}
    </TreeList>
  )
}
