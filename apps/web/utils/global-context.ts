import React from 'react';

const GlobalContext = React.createContext({
	authenticated: false,
	update: (authenticated: { authenticated: boolean }) => {},
});

export default GlobalContext;
