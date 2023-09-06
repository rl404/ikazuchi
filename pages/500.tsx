import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Custom500() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
}
