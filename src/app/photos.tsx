import { useGetPhotosQuery } from "./redux/slices/x-data"
import { ImageList, ImageListItem, ImageListItemBar, ListSubheader } from "@mui/material";


type ViewerProps = { albumId: number };
export function PhotoViewer({ albumId }: ViewerProps): JSX.Element
{
	const photos: any[] | undefined = useGetPhotosQuery(albumId).data;
	return (
	(
		<ImageList sx={{ width: 500, height: 450 }}>
			<ImageListItem key="Subheader" cols={2}>
				{/* <ListSubheader component="div">December</ListSubheader> */}
			</ImageListItem>

			{  photos?.map((photo) => 
				<ImageListItem key={photo.img}>
				<img
					src={`${photo.thumbnailUrl}`}
					srcSet={`${photo.thumbnailUrl} 2x`}
					alt={photo.title}
					loading="lazy" />

				<ImageListItemBar
					title={photo.title}
					subtitle={`ID: ${photo.id}`}
				/>
				</ImageListItem>
			)}
		</ImageList>
	));
}