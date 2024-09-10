import { signIn, providerMap } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { BackButton } from "@/components/BackButton";

export default async function SignInPage() {
    return (
        <div className="flex flex-col items-center max-w-screen-2xl mx-auto h-screen justify-center">
            <Card className="w-[350px]">
                <CardHeader className="flex items-center">
                    <p className="font-extrabold text-l lg:text-2xl bg-gradient-to-r from-indigo-500 from-1% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text">
                        NONTONSKUY
                    </p>
                </CardHeader>

                <CardContent className="flex flex-col gap-2">
                    {Object.values(providerMap).map((provider) => (
                        <form
                            key={provider.id}
                            action={async () => {
                                "use server";
                                await signIn(provider.id, { redirectTo: "/" });
                            }}
                        >
                            {provider.id === "discord" ? (
                                <Button type="submit" className="w-full gap-2">
                                    <FaDiscord size={20} fill="#7289da" />
                                    <span>Sign in with {provider.name}</span>
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full gap-2">
                                    <FaGithub size={20} />
                                    <span>Sign in with {provider.name}</span>
                                </Button>
                            )}
                        </form>
                    ))}
                </CardContent>
            </Card>
            <div className="absolute top-8 left-8 ">
                <BackButton />
            </div>
        </div>
    );
}
