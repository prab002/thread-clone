
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CommentValidation } from "@/lib/validation/threadValidation";
import { addCommentToThread, createThread } from "@/lib/actions/thread.action";
import Image from "next/image";

interface PostThreadProps {
  userId: string;
}

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({threadId, currentUserImg, currentUserId}:Props) => {
    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm<z.infer<typeof CommentValidation>>({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: "",
        accountId: currentUserId,
      },
    });
  
    // Handle form submission
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread(threadId, values.thread, currentUserId, pathname);
  
      form.reset();
    };

    return (
        <Form {...form}>
        <form 
          className="comment-form "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel className="">
                 <Image src={currentUserImg} alt="user_image" width={24} height={24} className="rounded-full object-cover"/>
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input type="text" placeholder="Comment..." className="text-light-1 outline-none no-focus" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
  
          <Button type="submit" className="comment-form_btn">
           Reply
          </Button>
        </form>
      </Form>
       
    )
}

export default Comment;