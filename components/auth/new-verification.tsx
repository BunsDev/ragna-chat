"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

export const runtime = "edge";

export const NewVerification = () => {
  const token = useSearchParams().get("token");
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const onSubmit = useCallback(() => {
    if (error || success) return;
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper headerLabel="Confirming your verification">
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader className="dark:invert" />}
        {success && <p className="text-emerald-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </CardWrapper>
  );
};
