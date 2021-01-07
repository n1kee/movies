import React from 'react';

export const AppContext = React.createContext({
    isLoading: false,
    imgHost: null,
    userName: null,
    updateGlobals: state => {},
});
