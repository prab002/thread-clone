"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";


interface params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export const updateUser = async ({

  userId,
  username,
  name,
  image,
  bio,
  path,
}: params): Promise<void> => {
  connectToDb();

  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        image,
        bio,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};