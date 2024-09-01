'use client';

import { Card, CardBody } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { MailIcon, PasswordIcon } from "@/components/icons";
import { PressEvent } from "@react-types/shared";
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: PressEvent) => {
    const host = process.env.NEXT_PUBLIC_AUTH_SERVICE_HOST;
    const port = process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT;
    const authServiceUrl = `http://${host}:${port}/login`;
    await fetch(authServiceUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(response => {
      return response.json();
    }).then (jsonValue => {
      console.log(jsonValue);
    })
    // .catch(error => {
    //   console.log('caught something?');
    //   setError(error);
    // });
  };

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
