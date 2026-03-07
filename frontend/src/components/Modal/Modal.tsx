import { X } from "lucide-react";
import type { ReactNode } from "react";
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={handleInnerClick}
        className={`
          bg-white rounded-xl shadow p-7 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-0.5 right-0.5 p-1 rounded-lg text-gray-400  hover:bg-gray-50 hover:text-gray-600 mb-2"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
