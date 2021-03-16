import React from 'react';

interface Props {
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, onClose }) => (
  <div className="px-8 py-10 sm:px-12 sm:py-12 sm:pb-16">
    <div className="lg:max-w-4xl lg:mx-auto">
      <button
        className="absolute top-0 right-0 px-4 py-2 m-1 subtle-focus"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <span aria-hidden className="text-xl">
          &times;
        </span>
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
