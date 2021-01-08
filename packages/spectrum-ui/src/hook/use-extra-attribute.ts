import { omit } from 'lodash';
import { ComponentStatusProps, InputComponentStatusProps } from './config-context';

type PropsKey = keyof ComponentStatusProps & keyof InputComponentStatusProps;

const useExtraAttribute = <T extends {}>(props: T): Pick<T, PropsKey> => {
    return omit(props, [
        'quiet',
        'disabled',
        'scale',
        'theme',
        'emphasized',
    ]) as any;
};

export default useExtraAttribute;
