export type GalleryCategory =
  | "weddings"
  | "corporate"
  | "private"
  | "workshops";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  span?: "row-2" | "col-2-row-2";
}

export const galleryData: Record<GalleryCategory, GalleryImage[]> = {
  weddings: [
    {
      src: "/event/gallery/wedding1.avif",
      alt: "Wedding Gallery Image 1",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/wedding2.avif",
      alt: "Wedding Gallery Image 2",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/wedding3.avif",
      alt: "Wedding Gallery Image 3",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
    {
      src: "/event/gallery/wedding4.avif",
      alt: "Wedding Gallery Image 4",
      width: 873,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/wedding5.avif",
      alt: "Wedding Gallery Image 5",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/wedding6.avif",
      alt: "Wedding Gallery Image 6",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
    {
      src: "/event/gallery/wedding7.avif",
      alt: "Wedding Gallery Image 7",
      width: 874,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/wedding8.avif",
      alt: "Wedding Gallery Image 8",
      width: 874,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/wedding9.avif",
      alt: "Wedding Gallery Image 9",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
  ],
  corporate: [
    {
      src: "/event/gallery/wedding1.avif",
      alt: "Corporate Gallery Image 1",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/wedding2.avif",
      alt: "Corporate Gallery Image 2",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/wedding3.avif",
      alt: "Corporate Gallery Image 3",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
    {
      src: "/event/gallery/wedding4.avif",
      alt: "Corporate Gallery Image 4",
      width: 873,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/wedding5.avif",
      alt: "Corporate Gallery Image 5",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/wedding6.avif",
      alt: "Wedding Gallery Image 6",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
    {
      src: "/event/gallery/wedding7.avif",
      alt: "Wedding Gallery Image 7",
      width: 874,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/wedding8.avif",
      alt: "Wedding Gallery Image 8",
      width: 874,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/wedding9.avif",
      alt: "Wedding Gallery Image 9",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
  ],
  private: [
    {
      src: "/event/gallery/private1.avif",
      alt: "Private Celebration Gallery Image 1",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/private2.avif",
      alt: "Private Celebration Gallery Image 2",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/private3.avif",
      alt: "Private Celebration Gallery Image 3",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
    {
      src: "/event/gallery/private4.avif",
      alt: "Private Celebration Gallery Image 4",
      width: 873,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/private5.avif",
      alt: "Private Celebration Gallery Image 5",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
  ],
  workshops: [
    {
      src: "/event/gallery/workshop1.avif",
      alt: "Workshop Gallery Image 1",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/workshop2.avif",
      alt: "Workshop Gallery Image 2",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
    {
      src: "/event/gallery/workshop3.avif",
      alt: "Workshop Gallery Image 3",
      width: 427,
      height: 458,
      className: "w-full h-full object-cover md:row-span-2",
      span: "row-2",
    },
    {
      src: "/event/gallery/workshop4.avif",
      alt: "Workshop Gallery Image 4",
      width: 873,
      height: 458,
      className: "w-full h-full object-cover md:col-span-2 md:row-span-2",
      span: "col-2-row-2",
    },
    {
      src: "/event/gallery/workshop5.avif",
      alt: "Workshop Gallery Image 5",
      width: 427,
      height: 270,
      className: "w-full h-[270px] object-cover",
    },
  ],
};
