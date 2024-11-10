"use client";

import React from "react";

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
import { getPastes } from "@/actions/getPastes";
import { useInView } from 'react-intersection-observer';

export default function MyPastesPage() {

  const router = useRouter();
  const {state, dispatch} = useContext(AuthContext);
  const [pastes, setPastes] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0,
    trackVisibility: true,
    delay: 100,
    initialInView: true
  });
  const columns = [
    { key: "title", label: "Title" },
    { key: "creation_date", label: "Creation date"},
    { key: "expiration_date", label: "Expiration date"},
  ];

  const loadMorePastes = async () => {
    const response = await getPastes(offset, state.auth_token);
    if (response.status === 403) {
      dispatch({event_type: "logged_out"});
      router.push("/login");
      router.refresh();
    } else if (response.status === 200) {
      const newerPastes: any[] = response.data.pastes;
      setOffset(offset + newerPastes.length);
      setPastes([...pastes, ...newerPastes]);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMorePastes();
    }
  }, [offset, inView]);

	return (
		<div>
			{/*<h1 className={title()}>MyPastes</h1>*/}
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
      <div ref={ref}>Loading...</div>
		</div>
	);
}
