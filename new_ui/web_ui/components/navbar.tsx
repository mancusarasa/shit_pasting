import {
  HomeIcon,
  SettingsIcon,
  PowerIcon,
  ProfileIcon,
  NewPasteIcon,
  MyPastesIcon,
  MyFeedIcon
} from "@/components/icons";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import React from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	return (
		<NextUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle />
				<NavbarBrand as="li">
					<NextLink
            className="flex items-center gap-1"
            href={"/"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
      <NavbarMenu>
        <NavbarMenuItem key="home">
          <NextLink
            href={"/"}
            className="flex items-center hover:underline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HomeIcon className="w-5 h-5 mr-3" />
            <span>Home</span>
          </NextLink>
        </NavbarMenuItem>
        <NavbarMenuItem key="compose">
          <NextLink
            href={"/compose"}
            className="flex items-center hover:underline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <NewPasteIcon className="w-5 h-5 mr-3" />
            <span>New Paste</span>
          </NextLink>
        </NavbarMenuItem>
        <NavbarMenuItem key="my_pastes">
          <NextLink
            href={"/my_pastes"}
            className="flex items-center hover:underline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MyPastesIcon className="w-5 h-5 mr-3" />
            <span>My Pastes</span>
          </NextLink>
        </NavbarMenuItem>
        <NavbarMenuItem key="feed">
          <NextLink
            href={"/feed"}
            className="flex items-center hover:underline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MyFeedIcon className="w-5 h-5 mr-3" />
            <span>Feed</span>
          </NextLink>
        </NavbarMenuItem>
      </NavbarMenu>
		</NextUINavbar>
	);
};
