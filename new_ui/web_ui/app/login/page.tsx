import { title } from "@/components/primitives";

// import React from 'react';
// import { Text, Row } from '@nextui-org/react';

import { Card, CardBody } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";

import { MailIcon, PasswordIcon } from "@/components/icons";

export default function LoginPage() {
	return (
		<div>
			<Card
				variant="bordered"
				className="p-5 max-w-md"
			>
				<CardBody>
					<p className="font-bold mb-5">Login</p>
					<Input
						classNames={{
							inputWrapper: [ "mb-1.5" ]
						}}
						clearable
            fullWidth
            size="lg"
						placeholder="Username"
						variant="underlined"
						startContent={<MailIcon fill="currentColor"/>}
					/>
					<Spacer y={1} />
					<Input
						classNames={{
							inputWrapper: [ "mb-1.5" ]
						}}
						clearable
						underlined
            fullWidth
            size="lg"
						placeholder="Password"
						variant="underlined"
						startContent={<PasswordIcon fill="currentColor"/>}
					/>
					<Checkbox>Remember me?</Checkbox>
					<Spacer y={1} />
					<Button>Sign in</Button>
				</CardBody>
			</Card>
		</div>
	);
}
