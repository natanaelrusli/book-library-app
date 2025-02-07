import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const downloadImage = (url: string, fileName?: string) => {
  fetch(url, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName || "image.png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((err) => {
      console.error("Download error:", err);
    });
};

export const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const constructUrl = (
  baseUrl: string,
  params: { [key: string]: string | number | undefined }
): string => {
  const url = new URL(baseUrl, window.location.origin);
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      url.searchParams.set(key, String(params[key]));
    }
  });
  return url.toString();
};
