import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">GovGuide</h1>
            <UserButton afterSignOutUrl="/"></UserButton>
          </div>
          <p className="max-w-xl mt-2 text-lg text-slate-800">
            Join our community and decode complex policies and legislation
            effortlessly with AI assistance.
          </p>
          <div className="flex mt-2">
            {/* {isAuth && <Button>Get Started</Button>} */}
          </div>
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Get Started
                  <LogIn className="w-4 h-4 ml-2"></LogIn>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
