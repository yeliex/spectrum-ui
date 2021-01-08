import { useContext } from 'react';
import ConfigContext from './config-context';

const useConfig = () => {
    return useContext(ConfigContext);
};

export default useConfig;
