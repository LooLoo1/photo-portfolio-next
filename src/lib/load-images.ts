export async function loadImages(q: string) {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY!;
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${q}`,
    {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
    }
  );
  const data = await res.json();

  return data;
}
