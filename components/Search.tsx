import React from 'react';

// eslint-disable-next-line react/display-name
const Search = React.forwardRef<HTMLInputElement>((props, ref) => {
   return <input ref={ref} type="search" />;
});

export default Search;
