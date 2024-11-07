"use client";

import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/auth-context";
import { title } from "@/components/primitives";

export default function MyPastesPage() {

  const router = useRouter();
  const {state, dispatch} = useContext(AuthContext);
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    const fetchPastes = async () => {
      const host = process.env.NEXT_PUBLIC_PASTE_SERVICE_HOST;
      const port = process.env.NEXT_PUBLIC_PASTE_SERVICE_PORT;
      const pasteServiceUrl = `http://${host}:${port}/my_pastes`;
      return await fetch(pasteServiceUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.auth_token}`
        }
      }).then(response => {
        return response.json().then(data => ({
          status: response.status,
          data: data
        }));
      }).then(result => {
        if (result.status === 403) {
          dispatch({event_type: "logged_out"});
          router.push("/login");
          router.refresh();
        } else if (result.status === 200) {
            setPastes(result.data.pastes);
        }
      }).catch(error => {
        throw error;
      });
    };
    fetchPastes();
  }, []);

	return (
		<div>
			<h1 className={title()}>MyPastes</h1>
		</div>
	);
}
