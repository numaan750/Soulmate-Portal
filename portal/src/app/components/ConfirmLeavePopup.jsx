"use client";

const ConfirmLeavePopup = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center p-4">
      <div className="bg-[#2A2D3A] rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-white">Leave Chat?</h3>

        <p className="text-gray-300 mb-6">
          Your chat will be cleared if you leave this page. Are you sure you
          want to continue?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 cursor-pointer px-6 py-3 bg-gray-600 rounded-full hover:bg-gray-500 text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer px-6 py-3 bg-red-500 rounded-full hover:bg-red-600 text-white"
          >
            Yes, Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLeavePopup;
