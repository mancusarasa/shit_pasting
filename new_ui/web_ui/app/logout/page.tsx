"use client"

import { useContext } from "react";
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/auth-context";

export default function LogoutPage() {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    dispatch({event_type: "logged_out"});
    router.push("/");
    router.refresh();
  }, [router, dispatch]);

  return <div></div>;
}
