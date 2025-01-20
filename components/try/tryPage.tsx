"use client";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export const TryPageComponent = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className="text-muted-foreground text-sm font-semibold text-center">
            Generating chat for you
          </h1>
        </CardHeader>
        <CardContent>
          <BarLoader className="mx-auto dark:invert" />
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-sm font-semibold text-center mx-auto">
            Please wait...
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
