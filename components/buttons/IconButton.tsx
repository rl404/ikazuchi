import { ReactNode } from "react";

export default function IconButton({
  className = "",
  title = "",
  children,
  onClick,
}: {
  className?: string;
  title?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      title={title}
      className={`flex items-center justify-center rounded p-1 transition-colors hover:bg-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
