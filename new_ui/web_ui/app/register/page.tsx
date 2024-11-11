import { title } from "@/components/primitives";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";

export default function SettingsPage() {
	return (
		<div>
      <Card
        className="p-4 max-w-md"
      >
        <CardBody>
          <div>Create your account</div>
          <div>
            <Input
              type="text"
              label="Username"
              size="sm"
              variant="faded"
            />
            <Input
              type="password"
              label="Password"
              size="sm"
              variant="faded"
            />
            <Input
              type="password"
              label="Confirm your password"
              size="sm"
              variant="faded"
            />
            <Button
              size="sm"
            >
              Go!
            </Button>
          </div>
        </CardBody>
      </Card>
		</div>
	);
}
