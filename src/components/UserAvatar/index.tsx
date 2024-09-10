import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoLogOutOutline } from "react-icons/io5";
import { ModeToggle } from "../ModeToggle";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { CgProfile } from "react-icons/cg";
import { link } from "fs";

const menuOptions = [
    {
        name: "Dashboard",
        icon: <CgProfile />,
        link: "/dashboard",
    },
    {
        name: "Rated Movies",
        icon: <CgProfile />,
        link: "/rated/movies",
    },
    {
        name: "Rated Shows",
        icon: <CgProfile />,
        link: "/rated/shows",
    },
    {
        name: "Likes",
        icon: <CgProfile />,
        link: "/likes",
    },
    {
        name: "Watchlist",
        icon: <CgProfile />,
        link: "/watchlist",
    },
];

export default async function UserAvatar() {
    const session = await auth();
    return (
        <div>
            {session ? (
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar>
                            <AvatarImage src={session?.user?.image ?? ""} />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-3">
                        <h4 className="font-medium leading-none">
                            {session.user?.name}
                        </h4>
                        <Separator />
                        {menuOptions.map((option) => (
                            <Link href={option.link} key={option.name}>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white cursor-pointer">
                                    {option.icon}
                                    <p className="text-sm text-muted-foreground hover:text-white">
                                        {option.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                        <Separator />
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <Button
                                variant={"destructive"}
                                size={"sm"}
                                type="submit"
                            >
                                <div className="flex items-center gap-1">
                                    <div>Sign Out</div>
                                    <IoLogOutOutline className="w-5 h-5" />
                                </div>
                            </Button>
                        </form>
                    </PopoverContent>
                </Popover>
            ) : (
                <Link href={"/auth/signin"}>
                    <Button size={"sm"} variant={"outline"}>
                        Sign in
                    </Button>
                </Link>
            )}
        </div>
    );
}
