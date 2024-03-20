import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { users } from "../utils/data";

function MenuList({ user, onClick }) {
  const handleLogOut = () => {};
  return (
    <div>
      <Menu as="div" className="inline-block text-left">
        <div className="flex">
          <Menu.Button className="inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20">
            <div className="leading-[80px] flex flex-col items-center">
              <p className="text-sm font-semibold">
                {user?.firstName ?? user?.name}
              </p>
              <span className="text-sm text-blue-600">
                {user?.jobTitle ?? user?.email}
              </span>
            </div>
            <img
              src={user?.profileUrl}
              alt="user profile"
              className="h-10 w-10 rounded-full object-cover "
            />
            <BiChevronDown
              className=" w-8 h-8 text-slate-600"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
      </Menu>
    </div>
  );
}

const Navbar = () => {
  const user = users[1];
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative bg-[#f7fdfd] z-50">
        <nav className="container mx-auto flex items-center justify-between p-5">
          <div>
            <Link to="/" className="text-blue-600 font-bold text-xl">
              Job<span className="text-[#1677cccb]">Finder</span>
            </Link>
          </div>

          <ul className="hidden lg:flex gap-10 text-base">
            <li>
              <Link to="/find-jobs">Find Job</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/upload-job">Upload Job</Link>
            </li>
            <li>
              <Link to="/about-us">About</Link>
            </li>
          </ul>
          <div className="hidden lg:block">
            {!user?.token ? (
              <Link to="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
                />
              </Link>
            ) : (
              <div>
                <MenuList user={user} />
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
