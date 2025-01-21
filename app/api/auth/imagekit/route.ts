import ImageKit from "imagekit";
import { AppConfig } from "@/lib/config";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: AppConfig.env.imagekit.publicKey,
  privateKey: AppConfig.env.imagekit.privateKey,
  urlEndpoint: AppConfig.env.imagekit.urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
