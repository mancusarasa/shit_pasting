"use client";

import { useState } from "react";
import { register } from "@/actions/register";
import { Input } from "@heroui/react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Spacer } from "@heroui/spacer";
import { MailIcon, PasswordIcon } from "@/components/icons";
import { PressEvent } from "@react-types/shared";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otherPassword, setOtherPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (event: PressEvent) => {
    const result = await register(username, password);
    if (result.status === 201) {
      router.push("/regSuccess");
      router.refresh();
    } else {
      // show registration error?
    }
  }

	return (
		<div>
      <Card className="p-4 max-w-md">
        <CardBody>
          <p className= "font-bold mb-5">Create your account</p>
          <Input
            classNames={{
              inputWrapper: [ "mb-1.5" ]
            }}
            fullWidth={true}
            type="text"
            label="Username"
            placeholder="Username"
            startContent={<MailIcon fill="currentColor"/>}
            onValueChange={
              (value: string) => setUsername(value)
            }
            size="lg"
            variant="underlined"
          />
          <Spacer y={1}/>
          <Input
            classNames={{
              inputWrapper: [ "mb-1.5" ]
            }}
            type="password"
            fullWidth={true}
            label="Password"
            placeholder="Password"
            startContent={<PasswordIcon fill="currentColor"/>}
            onValueChange={
              (value: string) => setPassword(value)
            }
            size="lg"
            variant="underlined"
          />
          <Spacer y={1}/>
          <Input
            classNames={{
              inputWrapper: [ "mb-1.5" ]
            }}
            type="password"
            fullWidth={true}
            label="Confirm your password"
            placeholder="Confirm your password"
            startContent={<PasswordIcon fill="currentColor"/>}
            onValueChange={
              (value: string) => setOtherPassword(value)
            }
            size="sm"
            variant="underlined"
          />
          <Spacer y={1}/>
          <Button
            size="sm"
            onPress={(e) => handleRegister(e)}
          >
            Go!
          </Button>
        </CardBody>
      </Card>
      <div className="flex justify-center">
        <div className="text-sm">
          Already have an account? <Link size="sm" href="/login">Go to login!</Link>
        </div>
      </div>
		</div>
	);
}
