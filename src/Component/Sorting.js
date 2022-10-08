import React from "react";

const Sorting = ({ employ, setEmploys }) => {  
    const handleSort = (e) => {
        const sortType = e.target.value;
        const sorted = [...employ].sort((a, b) => {
        if (sortType === "asc") {
            return a.name.localeCompare(b.name);
        } else if (sortType === "desc") {
            return b.name.localeCompare(a.name);
        }
        });
        setEmploys(sorted);
    };
    
    return (
        <div className="sort">
        <label>Sort By Name : </label>
        <select onChange={handleSort} >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
        </div>
    );
} 
export default Sorting;