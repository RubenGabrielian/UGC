import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <Card className="w-full max-w-md border-zinc-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Authentication Error</CardTitle>
          <CardDescription className="mt-2">
            We couldn&apos;t complete your login. This might happen if:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-zinc-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">•</span>
              <span>The authentication link expired or was already used</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">•</span>
              <span>There was a temporary issue with the authentication service</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">•</span>
              <span>Your browser blocked the authentication request</span>
            </li>
          </ul>
          <div className="pt-4">
            <Button asChild className="w-full">
              <Link href="/login">Try Again</Link>
            </Button>
          </div>
          <p className="text-center text-xs text-zinc-500">
            If the problem persists, please contact support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

