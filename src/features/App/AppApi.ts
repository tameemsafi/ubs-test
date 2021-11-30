import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { nanoid } from '@reduxjs/toolkit'

export type CapabilityItem = {
  id: string
  name: string
  parentId?: string
}

export type ApplicationItem = {
  id: string
  name: string
  spend: number
  capIds: string[]
}

export type AppDataResponse = {
  capabilities: CapabilityItem[]
  applications: ApplicationItem[]
  minSpend: number
  maxSpend: number
}

export type AppDataApiResponse = {
  id: string
  name: string
  spend: number
  BCAP1: string
  BCAP2: string
  BCAP3: string
}

const addCapabilityToListIfDoesNotExist = (
  list: CapabilityItem[],
  name: string,
  parentName?: string
) => {
  const found = list.find((item) => item.name === name)
  const foundParent = parentName
    ? list.find((item) => item.name === parentName)
    : null

  if (!found) {
    list.push({
      id: nanoid(),
      name,
      parentId: foundParent?.id,
    })
  }
}

export const AppApi = createApi({
  reducerPath: 'AppApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getData: builder.query<AppDataResponse, void>({
      query: () => '/data',
      transformResponse: (response: AppDataApiResponse[]) => {
        let capabilities: CapabilityItem[] = []

        response.forEach((item) => {
          addCapabilityToListIfDoesNotExist(capabilities, item.BCAP1)
          addCapabilityToListIfDoesNotExist(
            capabilities,
            item.BCAP2,
            item.BCAP1
          )
          addCapabilityToListIfDoesNotExist(
            capabilities,
            item.BCAP3,
            item.BCAP2
          )
        })

        // Create array of applications with included capability ids
        const applications: ApplicationItem[] = response.map((item) => {
          const capIds: string[] = [
            capabilities.find((cap) => cap.name === item.BCAP1)?.id,
            capabilities.find((cap) => cap.name === item.BCAP2)?.id,
            capabilities.find((cap) => cap.name === item.BCAP3)?.id,
          ].filter(Boolean) as string[]

          return {
            id: item.id,
            name: item.name,
            spend: item.spend,
            capIds,
          }
        })

        const sortedApplications = applications.sort(
          (a, b) => a.spend - b.spend
        )

        return {
          capabilities,
          applications,
          minSpend: sortedApplications[0].spend,
          maxSpend: sortedApplications[sortedApplications.length - 1].spend,
        }
      },
    }),
  }),
})

export const { useGetDataQuery } = AppApi
