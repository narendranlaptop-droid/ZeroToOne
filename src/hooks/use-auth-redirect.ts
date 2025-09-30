"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { UserRole } from "@/lib/types";

export function useAuthRedirect(allowedRoles?: UserRole | UserRole[]) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (allowedRoles) {
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      if (!roles.includes(user.role)) {
        router.push("/dashboard"); // Or an unauthorized page
      }
    }
  }, [user, loading, router, allowedRoles]);

  return { user, loading };
}
