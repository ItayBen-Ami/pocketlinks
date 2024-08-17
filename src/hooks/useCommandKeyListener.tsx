import { useEffect } from "react";

export default function useCommandKeyListener({
  key,
  callback,
}: {
  key: string;
  callback: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, callback]);
}
