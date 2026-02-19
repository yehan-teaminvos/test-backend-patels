export type ProductSort =
  | "Default Sorting"
  | "corporate"
  | "private"
  | "workshops";

export interface GalleryImage {
  src: string;
  alt: string;
  name?: string;
}

export const ProductData: Record<ProductSort, GalleryImage[]> = {
  "Default Sorting": [
    {
      src: "/event/gallery/wedding1.avif",
      alt: "Wedding Gallery Image 1",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding2.avif",
      alt: "Wedding Gallery Image 2",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding3.avif",
      alt: "Wedding Gallery Image 3",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding4.avif",
      alt: "Wedding Gallery Image 4",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding5.avif",
      alt: "Wedding Gallery Image 5",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding6.avif",
      alt: "Wedding Gallery Image 6",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding7.avif",
      alt: "Wedding Gallery Image 7",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding8.avif",
      alt: "Wedding Gallery Image 8",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding9.avif",
      alt: "Wedding Gallery Image 9",
      name: "Blush Harmony",
    },
  ],
  corporate: [
    {
      src: "/event/gallery/wedding1.avif",
      alt: "Corporate Gallery Image 1",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding2.avif",
      alt: "Corporate Gallery Image 2",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding3.avif",
      alt: "Corporate Gallery Image 3",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding4.avif",
      alt: "Corporate Gallery Image 4",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding5.avif",
      alt: "Corporate Gallery Image 5",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding6.avif",
      alt: "Wedding Gallery Image 6",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding7.avif",
      alt: "Wedding Gallery Image 7",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding8.avif",
      alt: "Wedding Gallery Image 8",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/wedding9.avif",
      alt: "Wedding Gallery Image 9",
      name: "Blush Harmony",
    },
  ],
  private: [
    {
      src: "/event/gallery/private1.avif",
      alt: "Private Celebration Gallery Image 1",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/private2.avif",
      alt: "Private Celebration Gallery Image 2",
      name: "Blush Harmony",
    },
    {
      src: "/event/gallery/private3.avif",
      alt: "Private Celebration Gallery Image 3",
    },
    {
      src: "/event/gallery/private4.avif",
      alt: "Private Celebration Gallery Image 4",
    },
    {
      src: "/event/gallery/private5.avif",
      alt: "Private Celebration Gallery Image 5",
    },
  ],
  workshops: [
    {
      src: "/event/gallery/workshop1.avif",
      alt: "Workshop Gallery Image 1",
    },
    {
      src: "/event/gallery/workshop2.avif",
      alt: "Workshop Gallery Image 2",
    },
    {
      src: "/event/gallery/workshop3.avif",
      alt: "Workshop Gallery Image 3",
    },
    {
      src: "/event/gallery/workshop4.avif",
      alt: "Workshop Gallery Image 4",
    },
    {
      src: "/event/gallery/workshop5.avif",
      alt: "Workshop Gallery Image 5",
    },
  ],
};
