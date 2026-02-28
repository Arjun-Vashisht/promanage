const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="
      fixed inset-0
      bg-black/50 backdrop-blur-sm
      flex items-center justify-center
      z-50
      transition-opacity
    ">

      <div className="
        relative
        w-full max-w-md
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        rounded-xl
        shadow-xl
        border border-gray-200 dark:border-gray-800
        p-6
        animate-[fadeIn_0.2s_ease-out]
      ">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-gray-400 dark:text-gray-500
            hover:text-gray-600 dark:hover:text-gray-300
            transition
          "
        >
          ✕
        </button>

        {children}

      </div>
    </div>
  );
};

export default Modal;
