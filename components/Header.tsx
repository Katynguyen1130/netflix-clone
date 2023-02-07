import Image from "next/image";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { images } from "../assets/logo/images";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import BasicMenu from "./BasicMenu";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"} py-0`}>
      <div className="flex justify-between w-full">
        <div className="flex items-center space-x-2 md:space-x-10 h-full w-full">
          <div className="w-[100px]">
            <Image src={images.logo} alt={""} className="cursor-pointer" priority={true} />
          </div>
          <BasicMenu />

          <ul className="  flex invisible md:visible  space-x-4  ">
            <li className="headerLink">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          <SearchIcon className=" md:flex w-6 h-6 " />
          <p className=" inline invisible sm:visible "> Kids</p>
          <BellIcon className=" w-6 h-6  " />
          <Link href="/account">
            <div className="cursor-pointer  w-8 h-8">
              <Image src={images.avatar} alt={""} className="rounded-lg" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
