import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="full" position="sticky">
			<NavbarContent>
				<NavbarBrand as="li">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">Shit Pasting</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
      <NavbarContent as="div" justify="end">
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
        <ProfileDropdown />
      </NavbarContent>
		</NextUINavbar>
	);
};
