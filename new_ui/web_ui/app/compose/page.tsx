"use client";

import { PressEvent } from "@react-types/shared";
import { title } from "@/components/primitives";
import { Textarea } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import {
  Select,
  SelectSection,
  SelectItem
} from "@nextui-org/react";

export default function ComposePage() {

  const expirationOptions = [
    {key: "day", label: "One day"},
    {key: "month", label: "One month"},
    {key: "year", label: "One year"},
    {key: "never", label: "Never"},
  ];

  const handleSave = async (event: PressEvent) => {
    console.log('hola');
  }

	return (
    <div>
      <div>
        <h4 className="flex justify-start text-base">Type your shit below:</h4>
        <Spacer y={1} />
        <Textarea
            key="title"
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
            key="title"
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
