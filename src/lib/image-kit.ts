import "server-only";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGE_KIT_URL!,
});

export async function uploadToImageKit(
  file: File,
  folderName = "default-folder"
): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName: file.name,
      folder: folderName,
    });

    return result.url ?? "";
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return "";
  }
}
