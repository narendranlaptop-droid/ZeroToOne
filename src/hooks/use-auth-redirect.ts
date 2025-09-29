"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthRedirect(role?: "admin" | "student" | "scorer" | "operator") {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
    } else if (role && user.role !== role) {
      router.push("/dashboard"); // Or an unauthorized page
    }

  }, [user, loading, router, role]);

  return { user, loading };
}
