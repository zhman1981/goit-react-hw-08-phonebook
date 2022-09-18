import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
            headers.set('authorization', `Bearer ${token}`)
            }

            return headers
         },
    }),
    tagTypes: ['Contacts'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/contacts',
            providesTags: ['Contacts'],
        }),
        addContact: builder.mutation({
            query: values => ({
                url: '/contacts',
                method: 'POST',
                body: values,
            }),
            invalidatesTags: ['Contacts'],
        }),
        deleteContact: builder.mutation({
            query: id => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts'],
        }),
    }),
});

export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation } = contactsApi;