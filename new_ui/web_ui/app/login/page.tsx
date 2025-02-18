"use client";

import { Card, CardBody } from "@heroui/card";
import { Spacer } from "@heroui/spacer";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { MailIcon, PasswordIcon } from "@/components/icons";
import { PressEvent } from "@react-types/shared";
import { AuthContext } from "@/components/auth-context";
import { login } from "@/actions/login";
import { Link } from "@heroui/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (event: PressEvent) => {
    const result = await login(username, password, rememberMe);
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
        className="p-4 max-w-md"
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
          <Checkbox
            onValueChange={
              (isSelected: boolean) => setRememberMe(isSelected)
            }
          >
            Remember me?
          </Checkbox>
          <Spacer y={1} />
          <Button
            onPress={(e) => handleLogin(e)}
          >
            Sign in
            </Button>
        </CardBody>
      </Card>
      <div className="flex justify-center">
        <div className="text-sm">
          Not a member? <Link size="sm" href="/register">Sign up!</Link>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
