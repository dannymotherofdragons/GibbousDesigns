import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*  Scrolls to 0,0 on every pathname change unless the URL already has
    a hash (because hash-links should control their own scrolling).          */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // only run when we changed route (pathname) and there's no #hash target
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null; // this component renders nothing
}
