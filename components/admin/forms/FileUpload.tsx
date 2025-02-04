"use client";

import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { AppConfig } from "@/lib/config";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";

const { publicKey, urlEndpoint } = AppConfig.env.imagekit;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${AppConfig.env.apiEndpoint}/api/auth/imagekit`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw new Error("Authentication failed: Unknown error occurred");
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value: string;
}

const FileUpload = ({
  onFileChange,
  type,
  accept,
  placeholder,
  variant,
  folder,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ url: string; name: string } | null>({
    url: value,
    name: value,
  });
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const renderVideo = () => {
    if (file && type === "video" && showVideo) {
      return (
        <video width='1200' height='240' controls>
          <source src={file.url} type='video/mp4'></source>
        </video>
      );
    } else {
      return (
        <Button
          className='bg-primary-admin text-white hover:bg-primary-admin'
          onClick={() => setShowVideo(!showVideo)}
        >
          Show Video
        </Button>
      );
    }
  };

  const onError = (error: UploadError) => {
    console.log(error);
    toast({
      title: `${type} Upload failed`,
      description: error.message,
      variant: "destructive",
    });
  };
  const onSuccess = (res: { url: string; name: string }) => {
    setFile(res);
    onFileChange(res.url);
    toast({
      title: `${type} upload success`,
      description: `${res.name} image upload success`,
    });
  };

  const onValidate = (file: File): boolean => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "The file size is larger than 20MB.",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "The file size is larger than 50MB.",
          variant: "destructive",
        });

        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        className={"hidden"}
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src='/icons/upload.svg'
          alt='upload-icon'
          width={20}
          height={20}
          className={"object-contain"}
        />
        <p className={cn("text-base", styles.placeholder)}>
          {placeholder || "Upload a File"}
        </p>

        {file && (
          <p className='upload-filename ml-6 max-w-36 truncate'>{file.name}</p>
        )}
      </button>

      <ProgressBar progress={progress} />

      {file && <p className={cn("upload-filename", styles.text)}>{file.url}</p>}

      {file &&
        (type === "image" && value ? (
          <IKImage
            alt={file.name}
            src={file.url}
            width={200}
            height={300}
            className='mb-6 max-w-[200px] object-contain'
          />
        ) : (
          type === "video" && value && renderVideo()
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;
