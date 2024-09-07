import NextLink from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import {
  ProfileIcon,
  SettingsIcon,
  LogoutIcon
} from "@/components/icons";

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
          <DropdownItem key="profile">
            <NextLink className="flex" href="/myProfile">
              <ProfileIcon className="w-5 h-5 mr-3"/>
              <p>My profile</p>
            </NextLink>
          </DropdownItem>
          <DropdownItem>
            <NextLink className="flex" href="/settings">
              <SettingsIcon className="w-5 h-5 mr-3" />
              <p>Settings</p>
            </NextLink>
          </DropdownItem>
          <DropdownItem>
            <NextLink className="flex" href="/logout">
              <LogoutIcon className="w-5 h-5 mr-3"/>
              <p class="text-red-600">Log Out</p>
            </NextLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
