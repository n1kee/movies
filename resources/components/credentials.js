import React from 'react';

export const CredentialsContext = React.createContext({
    userName: null,
    updateCredentials: name => {},
});
