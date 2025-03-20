"use client";
import { useState, useEffect } from "react";
import usePostStore from "@/store/usePostStore";
import { useDebounce } from "@/hooks/useDebounce";

const Search = () => {
    const { setSearchQuery, setPage } = usePostStore();
    const [searchTerm, setSearchTerm] = useState<string>("");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        setSearchQuery(debouncedSearchTerm);
        setPage(1);
    }, [debouncedSearchTerm, setSearchQuery, setPage]);

    return (
        <div className="mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title"
                className="p-2 border rounded w-full"
            />
        </div>
    );
};

export default Search;
