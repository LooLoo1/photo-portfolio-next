export async function loadImages(q: string) {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY!;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${q}`,
    {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },

      // cache: "force-cache", ///< SSG
      // cache: "no-store", ///< SSR
      // next:{
      //   revalidate: 20, ///< ISR
      // }
    }
  );
  const data = await res.json();

  return data;
}
