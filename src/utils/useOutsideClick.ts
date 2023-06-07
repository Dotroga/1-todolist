import React, {useEffect} from "react";

export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, handler:
  (v: boolean) => void, attached = true) => {
  useEffect(() => {
    if (!attached) return;
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setTimeout(() => {
          handler(false);
        });
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler, attached]);
};