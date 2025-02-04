"use client";

import React from "react";
import { Button } from "./ui/button";

const VideoPlayer = ({
  videoUrl,
  show = true,
}: {
  videoUrl: string;
  show?: boolean;
}) => {
  const [shouldShow, setShouldShow] = React.useState(show);

  if (!shouldShow)
    return (
      <div
        style={{
          height: "240px",
        }}
        className='flex flex-col items-center justify-center gap-2 rounded-md bg-primary-admin font-bold text-white shadow-md'
      >
        <p>Trailer Video</p>
        <Button
          variant='outline'
          className='text-primary-admin'
          onClick={() => setShouldShow(true)}
        >
          Load Video
        </Button>
      </div>
    );

  return (
    <video
      width='1200'
      height='240'
      controls
      className='w-full rounded-md border-2 border-primary-admin shadow-md'
    >
      <source src={videoUrl} type='video/mp4'></source>
    </video>
  );
};

export default VideoPlayer;
