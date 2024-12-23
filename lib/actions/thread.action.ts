"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";


interface Props {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({
    text,
    author,
    communityId,
    path,
}: Props) {
    try {
        connectToDb();
        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id },
        });

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

export const fetchPosts = async ( pageNumber = 1, pageSize = 20) => {
    connectToDb();

    //calculate the number of post to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery= Thread.find({parentId: {$in: [null, undefined]}})
    .sort({createdAt: "desc"})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({path: "author", model: User})
    .populate({
        path: "children",
        populate: {path: "author", model: User,select: "_id name parentId image"

    }
}
)
const totalPostsCount = await Thread.countDocuments({parentId: {$in: [null, undefined]}})

const posts = await postsQuery.exec();
const isNext = totalPostsCount > skipAmount + posts.length;

return {posts, isNext}
} 

export async function fetchThreadById(id: string) {
    connectToDb();

    try {
        const thread = await Thread.findById(id)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ],
               
            }).exec();

        return thread;
    } catch (error: any) {
        throw new Error(`Failed to fetch thread: ${error.message}`);
    }
}

export async function addCommentToThread(threadId: string, commentText: string, customUserId: string, path: string) {
    connectToDb();

    try {
        // Find the user by custom ID to get the ObjectId
        const user = await User.findOne({ customUserId: customUserId });
        if (!user) {
            throw new Error("User not found");
        }

        const originalThread = await Thread.findById(threadId);
        if (!originalThread) {
            throw new Error("Thread not found");
        }

        const commentThread = new Thread({
            text: commentText,
            author: user._id, // Use the MongoDB ObjectId here
            parentId: threadId,
        });

        const savedCommentThread = await commentThread.save();
        originalThread.children.push(savedCommentThread._id);
        await originalThread.save();

        revalidatePath(path);
        
    } catch (error: any) {
        throw new Error(`Failed to add comment to thread: ${error.message}`);
    }
}