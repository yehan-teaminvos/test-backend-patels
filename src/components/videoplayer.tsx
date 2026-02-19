"use client";

import { useState } from "react";
import Image from "next/image";
import { CirclePlay } from "lucide-react";

type VideoPlayerProps = {
  thumbnail: string;
  videoSrc: string;
  type?: "local" | "youtube";
  className?: string;
  overlayClass?: string;
};

export default function VideoPlayer({
  thumbnail,
  videoSrc,
  type = "local",
  className = "",
  overlayClass = "",
}: VideoPlayerProps) {
  const [play, setPlay] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {!play ? (
        <button
          onClick={() => setPlay(true)}
          className="relative w-full aspect-video group"
          aria-label="Play video"
        >
          <Image
            src={thumbnail}
            alt="Video thumbnail"
            fill
            priority
            className="object-cover"
          />

          <div className={`absolute inset-0 bg-black/40 ${overlayClass}`} />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center group-hover:scale-110 transition">
              <CirclePlay
                strokeWidth={0.5}
                className="w-16 h-16 text-white font-light"
              />
            </div>
          </div>
        </button>
      ) : type === "youtube" ? (
        <iframe
          className="w-full aspect-video rounded-xl"
          src={`${videoSrc}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <video controls autoPlay className="w-full rounded-xl">
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
