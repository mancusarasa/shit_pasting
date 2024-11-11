"use client";

import { useState, useEffect} from "react";
import { title } from "@/components/primitives";
import { Paste } from "@/types/paste";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/input";
import { getPaste } from "@/actions/getPaste";

export default function IndividualPastePage({ params }: { params: { id: string } }) {

  const [paste, setPaste] = useState<Paste | null>(null);

  const loadPaste = async() => {
    const response = await getPaste(params.id);
    if (response.status === 404) {
      console.log("not found");
    } else if (response.status === 200) {
      const newPaste: Paste = response.data;
      setPaste(newPaste);
    }
  };

  useEffect(() => {
    loadPaste();
  }, [params.id]);

	return (
		<div>
      <div>
        { (paste !== null) && <h1 className="flex justify-start text-base">{paste.title}</h1>}
      </div>
      <div>
        { (paste !== null) && <Textarea variant="faded" minRows={8} isDisabled={true} size="sm" defaultValue={paste.paste_text}> </Textarea>}
      </div>
		</div>
	);
}
