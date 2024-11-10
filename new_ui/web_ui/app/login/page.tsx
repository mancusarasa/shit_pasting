"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { MailIcon, PasswordIcon } from "@/components/icons";
import { PressEvent } from "@react-types/shared";
import { AuthContext } from "@/components/auth-context";
import { login } from "@/actions/login";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (event: PressEvent) => {
    const host = process.env.NEXT_PUBLIC_AUTH_SERVICE_HOST;
    const port = process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT;
    const authServiceUrl = `http://${host}:${port}/login`;
    const result = await login(username, password);
    if (result.status === 200) {
      dispatch({
        event_type: "logged_in",
        auth_token: result.data.auth_token
      });
      router.push("/");
      router.refresh();
    } else {
      // show authentication error?
    }
  }

  return (
    <div>
      <Card
        className="p-5 max-w-md"
      >
        <CardBody>
          <p className="font-bold mb-5">Login</p>
          <Input
            classNames={{
              inputWrapper: [ "mb-1.5" ]
            }}
            fullWidth={true}
            size="lg"
            placeholder="Username"
            variant="underlined"
            startContent={<MailIcon fill="currentColor"/>}
            onValueChange={
              (value: string) => setUsername(value)
            }
          />
          <Spacer y={1} />
          <Input
            classNames={{
              inputWrapper: [ "mb-1.5" ]
            }}
            type="password"
            fullWidth={true}
            size="lg"
            placeholder="Password"
            variant="underlined"
            startContent={<PasswordIcon fill="currentColor"/>}
            onValueChange={
              (value: string) => setPassword(value)
            }
          />
          <Checkbox>Remember me?</Checkbox>
          <Spacer y={1} />
          <Button
            onPress={(e) => handleLogin(e)}
          >
            Sign in
            </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export const dynamic = "force-dynamic";
