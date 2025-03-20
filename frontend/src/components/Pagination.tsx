"use client"
import { FC } from "react";
import usePostStore from "@/store/usePostStore";

const Pagination: FC = () => {
    const { posts, totalPages, currentPage, setPage } = usePostStore();

    if (posts.length === 0) {
        return <></>
    }

    return (
        <div className="flex justify-center items-center mt-4 gap-x-4">
            <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="bg-blue-500 cursor-pointer text-white py-1 px-4 rounded"
            >
                {"<"}
            </button>
            <span>
                {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="bg-blue-500 cursor-pointer text-white py-1 px-4 rounded"
            >
                {">"}
            </button>
        </div>
    );
};

export default Pagination;
