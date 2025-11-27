import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <div className="search-container">
         <input 
            type="text" 
            className="search-input" 
            placeholder="Cari berdasarkan nama lembaga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
         {/* SVG Search Icon */}
         <svg className="search-icon" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M9.69356 12.5352C12.4234 11.375 13.6959 8.22157 12.5357 5.49173C11.3756 2.7619 8.22212 1.48941 5.49228 2.64957C2.76244 3.80972 1.48996 6.96318 2.65011 9.69302C3.81027 12.4229 6.96373 13.6953 9.69356 12.5352Z" stroke="black" strokeWidth="1.2"/><path d="M11.3902 11.3896L15.5556 15.5556" stroke="black" strokeWidth="1.2"/></g></svg>
    </div>
);

export default SearchBar;