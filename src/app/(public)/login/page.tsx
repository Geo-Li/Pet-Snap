"use client";

// system packages
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// --firebase
import { signInWithGoogle } from "@/lib/auth/google";
import { saveUserData } from "@/server/realtime/users";
// assets
import { Space_Grotesk } from "next/font/google";
import GoogleIcon from "@/app/_assets/GoogleIcon";
import { PhoneIcon } from "lucide-react";
// shadcn components
import { Button } from "@/components/ui/button";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space_grotesk",
});

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google login success", user);
      await saveUserData(user);
      router.push("/forum");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div
      className={cn(
        "h-screen w-full bg-stone-50 font-space_grotesk",
        space_grotesk.variable,
      )}
    >
      <div className="flex h-full flex-row items-center justify-center gap-[10dvw]">
        <div className="">
          <h2 className="text-3xl font-semibold">Login to Pet Snap!</h2>
          <h4 className="text-xl font-medium">
            For now, we only support Google login
            <br />
            Please read the README on GitHub first!
          </h4>
        </div>

        <div className="flex items-center rounded-md bg-white p-10 shadow-xl">
          <div className="flex flex-col justify-center space-y-5">
            <h2 className="text-xl text-emerald-300">Login</h2>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              size="icon"
              className="flex h-auto w-auto items-center justify-center bg-stone-100 px-4 py-2 hover:bg-stone-200"
            >
              <GoogleIcon className="scale-125" />
              <span className="ml-2 text-xl font-normal text-stone-900">
                Sign in with Google
              </span>
            </Button>

            {/* <Button
              variant="outline"
              size="icon"
              className="flex h-auto w-auto items-center justify-center bg-green-400 px-4 py-2 hover:bg-green-500"
            >
              <PhoneIcon className="scale-125 stroke-white" />
              <span className="ml-2 text-xl font-normal text-white">
                Sign in with OTP (Phone)
              </span>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
