"use client";

import { AuthContext } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { PressEvent } from "@react-types/shared";
import { title } from "@/components/primitives";
import { createPaste } from "@/actions/createPaste";
import { Textarea, Input } from "@heroui/input";
import { Spacer } from "@heroui/spacer";
import {
  Button,
  Select,
  SelectSection,
  SelectItem
} from "@heroui/react";

export default function ComposePage() {

  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteText, setPasteText] = useState("");
  const {state, dispatch} = useContext(AuthContext);
  const router = useRouter();

  const expirationOptions = [
    {key: "day", label: "One day"},
    {key: "month", label: "One month"},
    {key: "year", label: "One year"},
    {key: "never", label: "Never"},
  ];

  const handleSave = async (event: PressEvent) => {
    const response = await createPaste(
      pasteTitle,
      pasteText,
      state.auth_token
    );
    if (response.status === 403) {
      dispatch({event_type: "logged_out"});
      router.push("/login");
      router.refresh();
    } else if (response.status === 200) {
      const newPaste: {paste_id: string} = response.data;
      router.push(`/paste/${newPaste.paste_id}`);
      router.refresh();
    }
  }

	return (
    <div>
      <div>
        <h4 className="flex justify-start text-base">Type your shit below:</h4>
        <Spacer y={1} />
        <Textarea
            key="title"
            value={pasteText}
            onValueChange={setPasteText}
            size="sm"
            minRows={8}
            variant="faded"
            placeholder="Enter your text..."
          />
      </div>
      <Spacer y={4} />
      <div>
        <h4 className="flex justify-start text-base">Extra options</h4>
        <hr/>
        <Spacer y={2} />
        <Input
            key="pasteTitle"
            value={pasteTitle}
            onValueChange={setPasteTitle}
            label={<h4 className="text-base">Name/Title:</h4>}
            size="sm"
            variant="faded"
            labelPlacement="outside-left"
            classNames={{
              label: "flex justify-start text-base ps-0"
            }}
          />
        <Spacer y={2} />
        <div className="flex justify-start">
          <Select
            label={<h4 className="text-base">Expiration:</h4>}
            size="sm"
            labelPlacement="outside-left"
            className="max-w-72"
          >
            {expirationOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>
        <Spacer y={2} />
        <div className="flex justify-start">
          <Button
            color="default"
            size="sm"
            radius="sm"
            onPress={(e) => handleSave(e)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
	);
}
