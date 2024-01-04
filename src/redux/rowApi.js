import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const rowApi = createApi({
  reducerPath: 'rowApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://185.244.172.108:8081/'}),
  endpoints: (build) => ({

    createEntity: build.mutation({
      query: () => ({
        url: 'v1/outlay-rows/entity/create',
        method: 'POST',
      })
    }),
    getTreeRows: build.query({
      query: (eID) => `/v1/outlay-rows/entity/${eID}/row/list`
    }),

    createRow: build.mutation({
      query: ({body, eID}) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body,
      })
    }),
    updateRow: build.mutation({
      query: ({body, eID, rID}) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        method: 'POST',
        body,
      })
    }),
    deleteRow: build.mutation({
      query: ({eID, rID}) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
        method: 'DELETE',

      })
    }),

  })

})

export const {
  useCreateEntityMutation,
  useGetTreeRowsQuery,
  useDeleteRowMutation,
  useUpdateRowMutation,
  useCreateRowMutation
} = rowApi;