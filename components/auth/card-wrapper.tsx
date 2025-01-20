import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { siteConfig } from "@/config";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "lucide-react";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  showTnC?: boolean;
  showOAuth?: boolean;
}
export const CardWrapper = ({
  children,
  headerLabel = `Start using ${siteConfig.name} for yourself or your team`,
  showTnC = false,
  showOAuth = false,
}: CardWrapperProps) => {
  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground text-sm font-semibold text-center">
          {headerLabel}
        </p>
      </CardHeader>
      <CardContent>
        {children}
        {showOAuth && (
          <div className="flex flex-col gap-y-2 max-w-md">
            <h3 className="text-muted-foreground text-sm my-2 font-semibold text-center">
              OR
            </h3>
            <div className="flex justify-center gap-2 items-center">
              <Button
                variant={"outline"}
                onClick={async () =>
                  await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT })
                }
                className="w-full"
              >
                <FcGoogle />
                &nbsp;Google
              </Button>
              <Button
                variant={"outline"}
                onClick={async () =>
                  await signIn("apple", { redirectTo: DEFAULT_LOGIN_REDIRECT })
                }
                className="w-full"
              >
                <FaApple />
                &nbsp;Apple
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {showTnC && (
        <CardFooter className="flex flex-col gap-y-2 max-w-md">
          <h3 className="text-muted-foreground text-sm font-semibold self-start">
            Accept terms and conditions
          </h3>
          <p className="text-sm">
            {`By continuing you agree to ${siteConfig.name}'s `}
            <Link className="underline" href="/">
              Consumer Terms
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/">
              Usage policy
            </Link>
            , and acknowledge their{" "}
            <Link className="underline" href="/">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      )}
    </Card>
  );
};
