// "use client";
import GalleryTabs from "components/components/GalleryTabs";
import { fetchData } from "components/lib/fetchData";
import Image from "next/image";
import Link from "next/link";
import bgImage from "../../public/photography-bg.jpg";

export default async function Home() {
  const galleryData = await fetchData();
  return (
    <div className="relative flex min-h-screen flex-col text-white bg-sky-950 lg:p-0 p-5">
      <Image
        priority
        className="fixed object-cover bg-center left-0 top-0 h-screen z-0"
        src={bgImage}
        alt="background-image"
        placeholder="blur"
      />

      <div className="fixed left-0 top-0 w-full h-full z-5 from-stone-900 bg-gradient-to-t"></div>

      <header className="fixed w-screen top-0 z-10 flex justify-between items-center sm:py-3 px-6 h-24
      sm:flex-row flex-col py-7">
        <span className="uppercase">Photography Portfolio</span>
        <Link
          href="/contacts"
          className="rounded-3xl bg-white text-stone-700 px-5 py-2 hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>

      <main className="relative z-5 mx-auto max-w-5xl mt-24">
        <GalleryTabs {...galleryData} />
      </main>

      <footer className="relative z-20 mt-auto flex justify-center items-center py-3 px-6 h-24">
        Photography Portfolio
      </footer>
    </div>
  );
}
