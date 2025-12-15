import { createClient } from "@/utils/supabase/server";
import { LoginButton } from "./LoginButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  className?: string;
  showText?: boolean;
}

export async function AuthButton({
  variant = "outline",
  size = "default",
  className,
  showText = true,
}: AuthButtonProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Button variant={variant} size={size} className={className} asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    );
  }

  return (
    <LoginButton variant={variant} size={size} className={className}>
      {showText ? "Get Started with Google" : undefined}
    </LoginButton>
  );
}

