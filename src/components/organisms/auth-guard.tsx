"use client";

import { IUser, PAGE_ROUTES } from "@/common/types";
import useStore from "@/hooks/useStore";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { refreshToken } from "@/api/user";

interface IAuthGuard {
  children: ReactNode;
}

const AuthGuard: FC<IAuthGuard> = ({ children }) => {
  const [authenticating, setAuthenticating] = useState(true);

  const { store, handleLogOut, updateStore } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const { mutateAsync: handleRefreshTokenFunc, isPending } = useMutation({
    mutationFn: (token: string) => refreshToken({ refreshToken: token }),
    onSuccess: (res) => {
      if (res.data) {
        updateStore({
          auth: {
            token: res.data?.token,
            currentUser: store?.auth?.currentUser as IUser,
          },
        });
      }
    },
  });
  const accessTokenExpireTime = new Date(
    store?.auth?.token?.accessToken?.expiresIn!
  );
  const refreshTokenExpireTime = new Date(
    store?.auth?.token?.refreshToken?.expiresIn!
  );
  const refreshTokenString = store?.auth?.token?.refreshToken?.token;
  const currentDate = new Date();

  useEffect(() => {
    if (store.isLocalStorageLoaded) {
      if (
        accessTokenExpireTime < currentDate &&
        refreshTokenExpireTime < currentDate
      ) {
        handleLogOut();
      }
      if (
        accessTokenExpireTime < currentDate &&
        refreshTokenExpireTime > currentDate
      ) {
        handleRefreshTokenFunc(refreshTokenString!);
      }
      if (store.auth) {
        if (store.auth?.currentUser?.profileStatus === "complete") {
          router.push(PAGE_ROUTES.DASHBOARD_PAGE);
        } else {
          router.push(PAGE_ROUTES.PROFILE_INFO_PAGE);
        }
      } else if (
        pathname.includes("dashboard") ||
        pathname.includes("application")
      ) {
        router.push(PAGE_ROUTES.LOGIN_PAGE);
      } else if (pathname.includes("verify-otp")) {
        if (!store.registeredUser?.email) {
          router.push(PAGE_ROUTES.REGISTER_PAGE);
        }
      }
      //  else if (pathname.includes("register")) {
      //   if (store.registeredUser?.email) {
      //     router.push(PAGE_ROUTES.VERIFY_OTP_PAGE);
      //   }
      // }

      setTimeout(() => setAuthenticating(false), 1000);
    }
  }, [
    pathname,
    router,
    store.auth,
    store.isLocalStorageLoaded,
    store.registeredUser?.email,
  ]);

  if (authenticating || isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
