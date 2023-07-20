import { Photo } from "components/types";
import lqip from "lqip-modern";
import { loadImages } from "./load-images";

export const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "oceans",
    display: "Oceans",
    query: "ocean",
  },
  {
    key: "forests",
    display: "Forests",
    query: "forest",
  },
];

// async function getDataUrl(url: string) {
//   const imgData = await fetch(url);

//   const arrayBufferData = await imgData.arrayBuffer();
//   const lqipData = await lqip(Buffer.from(arrayBufferData));

//   return lqipData.metadata.dataURIBase64;
// }

export async function fetchData() {
  const queryPromises = tabs
    .filter((tab) => tab.query && typeof tab.query === "string")
    .map(async ({ query }) => await loadImages(query!));
  const responses = await Promise.all(queryPromises);

  const photos: Record<string, Photo[]> = {};

  responses.forEach((response, index) => {
    const { results = [] }: { results: any[] } = response;
    const photosForTab = results.map((result) => ({
      src: result.urls.regular,
      thumb: result.urls.thumb,
      width: result.width,
      height: result.height,
      alt: result.alt_description || "",
      likes: result.likes,
      blurDataURL: "",
    }));

    const tab = tabs[index + 1];
    photos[tab.key] = photosForTab;
  });

//   const photosArr: Photo[] = [...photos.oceans, ...photos.forests];
//   const photosArrWithDataUrl: Photo[] = [];

//   for (const photo of photosArr) {
//     const blurDataURL = await getDataUrl(photo.src);
//     photosArrWithDataUrl.push({ ...photo, blurDataURL });
//   }

  const { oceans, forests } = photos;

  const all = [...oceans, ...forests];
  const allPhotos = all.sort((a, b) => b.likes - a.likes);

  return { oceans, forests, allPhotos };
}
