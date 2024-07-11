"use client";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect } from "react";

const DownloadApp = () => {
  const router = useRouter();
  useEffect(() => {
    const apkUrl = "/inec-press.apk";
    window.location.href = apkUrl;
    router?.push("/");
  }, []);
};

export default DownloadApp;
