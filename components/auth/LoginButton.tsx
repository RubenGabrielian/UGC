"use client";

import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/app/auth/actions";
import Image from "next/image";
import { useTransition } from "react";

interface LoginButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  className?: string;
  children?: React.ReactNode;
}

export function LoginButton({
  variant = "outline",
  size = "default",
  className,
  children,
}: LoginButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      try {
        const result = await loginWithGoogle();
        if (result?.url) {
          window.location.href = result.url;
        }
      } catch (error) {
        console.error("Login error:", error);
        // You could add toast notification here
      }
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogin}
      disabled={isPending}
    >
      <Image
        src="/img/google.webp"
        alt="Google"
        width={16}
        height={16}
        className="mr-2 h-4 w-4"
      />
      {children || (isPending ? "Loading..." : "Get Started with Google")}
    </Button>
  );
}

