"use client";

import { ZoomOut } from "lucide-react";
import Image from "next/image";
import React from "react";

const EnlargedImage = ({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) => {
  if (!src) return null;

  return (
    <div className='absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/60 p-12'>
      <button
        className='absolute right-3 top-3 flex cursor-pointer items-center gap-3 text-lg font-bold text-white hover:text-red-600'
        onClick={onClose}
      >
        <ZoomOut />
        Close
      </button>
      <Image
        className='size-full object-contain'
        src={src}
        alt='image'
        width={1900}
        height={1600}
      />
    </div>
  );
};

export default EnlargedImage;
