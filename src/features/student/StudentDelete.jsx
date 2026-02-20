import React from 'react';
import { FaExclamationTriangle, FaTimes, FaTrash } from 'react-icons/fa';

const StudentDelete = ({ isOpen, onClose, onConfirm, studentName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100"
                role="dialog"
                aria-modal="true"
            >

                <div className="bg-red-50 p-6 flex flex-col items-center justify-center border-b border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500 animate-pulse">
                        <FaExclamationTriangle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center">
                        Haqiqatan ham o'chirmoqchimisiz?
                    </h3>
                </div>

                <div className="p-6 text-center">
                    <p className="text-gray-600 mb-2">
                        Siz <span className="font-bold text-gray-900">"{studentName}"</span> ismli talabani tizimdan butunlay o'chirmoqchisiz.
                    </p>
                    <p className="text-sm text-red-500 font-medium">
                        Bu amalni ortga qaytarib bo'lmaydi!
                    </p>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-center sm:justify-end">
                    <button
                        onClick={onClose}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaTimes />
                        Bekor qilish
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaTrash />
                        O'chirish
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StudentDelete;
