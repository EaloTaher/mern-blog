import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const path = useLocation().pathname;
  const { currentuser } = useSelector((state) => state.user);
  return (
    <Navbar className=" border-b-2">
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1  bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-600 rounded-lg text-white">
          Ealam's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentuser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentuser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentuser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <Dropdown.Divider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/">
          <Navbar.Link active={path === "/"} as={"div"}>
            Home
          </Navbar.Link>
        </Link>

        <Link to="/about">
          <Navbar.Link active={path === "/about"} as={"div"}>
            About
          </Navbar.Link>
        </Link>

        <Link to="/projects">
          <Navbar.Link active={path === "/projects"} as={"div"}>
            Projects
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
