"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/Appcontext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { authenticated, loading } = useContext(AppContext);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");

    }
  }, [authenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A090C]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;