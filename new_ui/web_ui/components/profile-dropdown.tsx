import NextLink from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

export const ProfileDropdown = () => {
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            name="A"
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <NextLink href="/myProfile">
              <p className="font-semibold">Admin</p>
              <p className="font-semibold">View profile</p>
            </NextLink>
          </DropdownItem>
          <DropdownItem>
            <NextLink href="/settings">
              <p>Settings</p>
            </NextLink>
          </DropdownItem>
          <DropdownItem>
            <NextLink href="/logout">
              <p class="text-red-600">Log Out</p>
            </NextLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
