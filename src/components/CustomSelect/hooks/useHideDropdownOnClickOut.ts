import { useEffect, useRef } from "react";

export const useHideDropdownOnClickOut = (
  hideAction: (isVisible: boolean) => void
) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutOfOptions = (event: MouseEvent) => {
      dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        hideAction(false);
    };
    document.addEventListener("click", handleClickOutOfOptions);
    return () => {
      document.removeEventListener("click", handleClickOutOfOptions);
    };
  }, []);

  return { dropdownRef };
};
