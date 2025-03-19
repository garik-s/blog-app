"use client"
import { useState } from 'react';
import usePostStore from '@/store/usePostStore';

const Search = () => {
    const { setSearchQuery, setPage } = usePostStore();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setSearchQuery(e.target.value);
        setPage(1);
    };

    return (
        <div className="mb-4" >
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by title"
                className="p-2 border rounded"
            />
        </div>
    );
};

export default Search;
