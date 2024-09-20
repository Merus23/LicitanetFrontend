import React from "react";

type Props = {
  innerDivClassName?: string;
  children: React.ReactNode;
  handleCloseModal: () => void;
};

export default function Modal({
  children,
  handleCloseModal,
  innerDivClassName = "h-5/5 w-11/12",
}: Props) {
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleCloseModal}
      >
        <div
          className={`${innerDivClassName} bg-white p-6 rounded-lg shadow-lg overflow-hidden relative `}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 rounded-full w-6 h-6 text-red-600 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
