"use client";

import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { AppConfig } from "@/lib/config";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";

const { publicKey, urlEndpoint } = AppConfig.env.imagekit;

const authenticator = async () => {
  try {
    const response = await fetch(
      `${AppConfig.env.apiEndpoint}/api/auth/imagekit`,
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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ url: string; name: string } | null>(null);

  const onError = (error: UploadError) => {
    console.log(error);
    toast({
      title: "Upload failed",
      description: error.message,
      variant: "destructive",
    });
  };
  const onSuccess = (res: { url: string; name: string }) => {
    setFile(res);
    onFileChange(res.url);
    toast({
      title: "Image upload success",
      description: `${res.name} image upload success`,
    });
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
        fileName="test-upload.png"
      />

      <button
        className={"upload-btn"}
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
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className={"object-contain"}
        />
        <p className={"text-base"}>Upload a File</p>

        {file && <p className={"upload-filename"}>{file.name}</p>}
      </button>

      {file && (
        <IKImage alt={file.name} src={file.url} width={500} height={300} />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
