"use client";

import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/auth-context";
import { title } from "@/components/primitives";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue
} from "@nextui-org/react";

export default function MyPastesPage() {

  const router = useRouter();
  const {state, dispatch} = useContext(AuthContext);
  const [pastes, setPastes] = useState([]);
  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "creation_date",
      label: "Creation date",
    },
    {
      key: "expiration_date",
      label: "Expiration date",
    },
  ];

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
      <Table>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={pastes}>
          {(item) => (
              <TableRow key={item['paste_id']}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
          )}
        </TableBody>
      </Table>
		</div>
	);
}
