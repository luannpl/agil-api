import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2cliente.js";
import { BadRequestError } from "../errors/HttpErrors.js";

export const uploadFile = async (
  bucket: string,
  fileName: string,
  buffer: Buffer,
  contentType: string
): Promise<string> => {
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    });

    await r2.send(command);

    if (process.env.R2_PUBLIC_URL) {
      return `${process.env.R2_PUBLIC_URL}/${fileName}`;
    }

    return `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucket}/${fileName}`;
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    throw new BadRequestError("Erro ao fazer upload do arquivo no R2");
  }
};

export const deleteFile = async (
  bucket: string,
  fileName: string
): Promise<void> => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: fileName,
    });

    await r2.send(command);
  } catch (error) {
    console.error("Erro ao remover arquivo:", error);
    throw new BadRequestError("Erro ao remover arquivo do R2");
  }
};
