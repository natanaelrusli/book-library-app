import React from "react";

const ProgressBar = ({ progress }: { progress: number }) => {
  if (progress === 0) return null;

  return (
    <>
      <div className='h-3 w-full bg-red'>
        <div
          style={{
            width: `${progress}%`,
          }}
          className={`h-full bg-blue-100`}
        />
      </div>

      {progress > 0 && <p>{progress} %</p>}
    </>
  );
};

export default ProgressBar;
