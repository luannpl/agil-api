import { BadRequestError } from "../errors/HttpErrors";
import { supabase } from "./supabase";

export const uploadFile = async (
  bucket: string,
  fileName: string,
  buffer: Buffer,
  contentType: string
) => {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, { contentType, upsert: true });

  if (error) {
    throw new BadRequestError("Erro ao fazer upload do arquivo");
  }

  return `https://vxkqmhgtbqvffwbgzxyq.supabase.co/storage/v1/object/public/${bucket}/${fileName}`;
};

export const deleteFile = async (bucket: string, fileName: string) => {
  const { error } = await supabase.storage.from(bucket).remove([fileName]);
  if (error) {
    throw new BadRequestError("Erro ao remover arquivo do bucket");
  }
};