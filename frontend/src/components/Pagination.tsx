"use client"

import { FC } from "react";
import usePostStore from "@/store/usePostStore";

const Pagination: FC = () => {

    const { totalPages, currentPage, searchQuery, fetchPosts, setPage } = usePostStore();
    
    const handlePageChange = async (newPage: number) => {
        setPage(newPage);
        await fetchPosts(newPage, searchQuery);
    };

    return (
        <div className="flex justify-center items-center mt-4 gap-x-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="bg-blue-500 cursor-pointer text-white p-2 rounded"
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="bg-blue-500 cursor-pointer text-white p-2 rounded"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
