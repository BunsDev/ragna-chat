import { Logo } from "@/components/logo";
import { Button } from "../ui/button";
import Link from "next/link";

export const TryNavbar = () => {
  return (
    <header>
      <div className="flex">
        <div className="mx-auto">
          <Link className="cursor-pointer" href={"/"}>
            <Logo />
          </Link>
        </div>
        <Button asChild>
          <Link href={"/auth/login"}>Login</Link>
        </Button>
      </div>
    </header>
  );
};
