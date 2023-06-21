// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";


const API = "https://jsonplaceholder.typicode.com";

// Define our single API slice object
export const albumSlice = createApi(
{
	reducerPath: "albums",
	baseQuery: (args) =>
		fetch(`${API}/${args}`)
			.then((response) => response.json())
			.then((json) => ({ data: json })),

	// The "endpoints" represent operations and requests for this server
	endpoints: (builder) =>
	({
		// The `getAlbums` endpoint is a "query" operation that returns data
		getAllAlbums: builder.query(
		{
			query: (arg?: null) => {console.log("anything"); return`albums`},
			// query: (id: number) => `album?id=${id}`,
			// transformResponse: (res) => res,
		}),
		getAlbum: builder.query(
		{
			query: (id: number) => `albums?id=${id}`,
			// transformResponse: (res) => res,
		}),

		getAllUsers: builder.query(
		{
			query: (arg?: null) => `users`,
			transformResponse: (res: any[]): Record<number, any> => Object.fromEntries(res.map((u) => [u.id, u])),
		}),
		getUser: builder.query(
		{
			query: (id: number) => `users?id=${id}`,
		}),

		getPhotos: builder.query(
		{
			query: (albumId: number) => `photos?albumId=${albumId}`,
		}),
	}),
});

// Export the auto-generated hook for the `getAlbums` query endpoint
export const { useGetAllAlbumsQuery, useGetAllUsersQuery, useGetPhotosQuery } = albumSlice;
