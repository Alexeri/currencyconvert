import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import logo from "@/assets/dent.jpg";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Github, HandCoins } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <header >
        <MaxWidthWrapper>
          <div className="borber-b border-gray-200 ">
            <div className="flex h-24 items-center justify-between">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/" className="flex items-center">
                  
                  <HandCoins className="h-[2.5rem] w-[2.5rem]"/>
                  
                </Link>
              </div>
              <div className="flex">
                <ModeToggle />
                <Link href="/">
                <Button size="icon" className="ml-2">
                  <Github className="h-[1.2rem] w-[1.2rem]"></Github>
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
