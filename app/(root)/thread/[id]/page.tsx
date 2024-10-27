import { currentUser } from "@clerk/nextjs/server";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@/lib/actions/thread.action";

const page =async ({params}:{params:{id:string}})=>{
    if(!params.id) return null;


    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id);

    return (
<section className="relative">
    <div>
        <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user?.id || ""}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
        />
    </div>
</section>
    )
}

export default page;