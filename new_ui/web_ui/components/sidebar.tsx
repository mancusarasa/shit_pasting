"use client";
import NextLink from "next/link";
import {
  HomeIcon,
  SettingsIcon,
  PowerIcon,
  ProfileIcon,
  NewPasteIcon,
  MyPastesIcon,
  MyFeedIcon
} from "@/components/icons";

export const Sidebar = () => {
  return (
    <section className="h-screen w-64 fixed left-0 top-0 bg-gray-800 overflow-y-auto">
      <nav className="mt-16">
        <ul>
          <li>
            <NextLink href={'/'} className="flex items-center px-6 py-3 text-white hover:bg-gray-700">
              <HomeIcon className="w-5 h-5 mr-3" />
              <span>Home</span>
            </NextLink>
          </li>
          <li>
            <NextLink href={'/compose'} className="flex items-center px-6 py-3 text-white hover:bg-gray-700">
              <NewPasteIcon className="w-5 h-5 mr-3" />
              <span>New Paste</span>
            </NextLink>
          </li>
          <li>
            <NextLink href={'/feed'} className="flex items-center px-6 py-3 text-white hover:bg-gray-700">
              <MyPastesIcon className="w-5 h-5 mr-3" />
              <span>My Pastes</span>
            </NextLink>
          </li>
          <li>
            <NextLink href={'/my_pastes'} className="flex items-center px-6 py-3 text-white hover:bg-gray-700">
              <MyFeedIcon className="w-5 h-5 mr-3" />
              <span>Feed</span>
            </NextLink>
          </li>
        </ul>
      </nav>
    </section>
  )
}
