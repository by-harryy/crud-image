/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { z } from "zod";
import { del, put } from "@vercel/blob";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImageById } from "./data";

export type FormState = {
  error?: {
    title?: string[];
    image?: string[];
  };
  message?: string;
};

const uploadSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "image must less than 4",
    }),
});

const EditSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must less than 4MB",
    })
    .optional(),
});

export const uploadImage = async (
  prevState: unknown,
  formData: FormData
): Promise<FormState> => {
  const validateFields = uploadSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { title, image } = validateFields.data;
  const { url } = await put(image.name, image, {
    addRandomSuffix: true,
    access: "public",
    multipart: true,
  });
  try {
    await prisma.upload.create({
      data: {
        title,
        image: url,
      },
    });
  } catch (error) {
    return {
      message: "failed to create data: " + error,
    };
  }

  revalidatePath("/");
  redirect("/");
};

export const updateImage = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = EditSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = await getImageById(id);
  if (!data) return { message: "No Data Found" };

  const { title, image } = validatedFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imagePath = url;
  }

  try {
    await prisma.upload.update({
      data: {
        title,
        image: imagePath,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update data: " + error };
  }

  revalidatePath("/");
  redirect("/");
};

export const deleteImage = async (id: string) => {
  const data = await getImageById(id);
  if (!data) return;

  await del(data.image);
  try {
    await prisma.upload.delete({
      where: { id },
    });
  } catch (err) {
    return;
  }

  revalidatePath("/");
};
