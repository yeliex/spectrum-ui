import React from 'react';
import ConfigContext from './config-context';

const useConfig = () => {
    return React.useContext(ConfigContext);
};

export default useConfig;
