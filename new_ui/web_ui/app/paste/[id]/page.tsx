"use client";

import { title } from "@/components/primitives";
import { useRouter } from "next/navigation";

export default function IndividualPastePage({ params }: { params: { id: string } }) {
  console.log(params);
  const paste_id = params.id;
	return (
		<div>
			<h1 className={title()}>Individual Paste: {paste_id} </h1>
		</div>
	);
}
