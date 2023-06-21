"use client";

import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useDispatch } from "./redux/hooks";
import { useGetAllAlbumsQuery, useGetAllUsersQuery } from "./redux/slices/x-data";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useState } from "react";
import { PhotoViewer } from "./photos";


type Album = { id: number, userId: number, title: string };
type User = { id: number, name: string };

export default function Home(): JSX.Element
{
	return (
	(
		<Provider store={store}>
			<Albums></Albums>
		</Provider>
	))
}


export function Albums(): JSX.Element
{
	const [isOpen, setOpen] = useState(false);
	const [albumId, setAlbumId] = useState(-1);

	const dispatch = useDispatch(); 
	const albums: Album[] | undefined = useGetAllAlbumsQuery(null).data;
	const users: Record<number, User> | undefined = useGetAllUsersQuery(null).data;

	function viewAlbum(id: number): void
	{
		setAlbumId(id);
		setOpen(true);
	}

	return (
	(
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
				<div className="mt-12 mb-20 text-5xl font-semibold">
					Albums
				</div>
				{/* <Image
					className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
					src="/next.svg"
					alt="Next.js Logo"
					width={180}
					height={37}
					priority /> */}
			</div>

			{/* albums: {JSON.stringify(albums)} */}

			<div className="mb-32 grid text-center  lg:mb-0 lg:grid-cols-3 lg:text-left xl:grid-cols-4">
				{  albums?.map((album) =>
					<button
						key={album.id}
						className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
						onClick={() => viewAlbum(album.id)}>

						<h2 className="mb-3 text-2xl font-semibold flex">
							<span className="max-w-[85%] inline overflow-hidden">
								<p className="truncate m-0 ">{album.title}</p></span>
							<span className="ms-2 inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
								{"->"}
							</span>
						</h2>
						<p className="m-0 max-w-[30ch] text-sm opacity-50">
							Created by {users && users[album.userId]?.name}.
						</p>
					</button>
				)}
			</div>


			<Dialog open={isOpen} onClose={() => setOpen(false)}>
				<DialogTitle>{albums?.find((a) => a.id == albumId)?.title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<PhotoViewer albumId={albumId}></PhotoViewer>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</main>
	));
}
