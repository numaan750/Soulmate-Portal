"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/Appcontext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  // BAAD MEIN:
  const { authenticated, authLoading } = useContext(AppContext);

  useEffect(() => {
    if (!authLoading && !authenticated) {
      router.replace("/login");
    }
  }, [authenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A090C]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A090C]">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
