"use client";
import { Tab } from "@headlessui/react";
import { tabs } from "components/lib/fetchData";
import { Photo } from "components/types";
import { Gallery } from "./Gallery";

type GalleryTabsProps = {
  oceans: Photo[];
  forests: Photo[];
  allPhotos: Photo[];
};

export default function GalleryTabs({
  oceans,
  forests,
  allPhotos,
}: GalleryTabsProps) {
  return (
    <Tab.Group>
      <Tab.List className="flex justify-center items-center gap-4 mb-4">
        {tabs.map(({ key, display }) => (
          <Tab key={key} className="p-2">
            {({ selected }) => (
              <span
                className={`uppercase text-lg ${
                  selected ? "text-white" : "text-stone-600"
                }`}
              >
                {display}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map(({ key }) => (
          <Tab.Panel key={key} className="overflow-auto">
            <Gallery
              photos={
                key === "all" ? allPhotos : key === "oceans" ? oceans : forests
              }
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
