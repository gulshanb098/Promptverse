"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (status === "authenticated") {
      return;
    }
    if (status === "unauthenticated" && pathname !== "/") {
      router.replace("/");
    }
  }, [status, router, pathname, mounted]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
