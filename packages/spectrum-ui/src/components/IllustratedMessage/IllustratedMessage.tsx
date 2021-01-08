import { BaseProps } from '../../common/base-component';
import { PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';
import IllustratedMessageDescription from './IllustratedMessageDescription';
import IllustratedMessageHeading from './IllustratedMessageHeading';
import './style';

export interface IllustratedMessageProps extends BaseProps {

}

const IllustratedMessage = (props: PropsWithChildren<IllustratedMessageProps>) => {
    const { children, className, style } = props;

    const mergedClass = useMemo(() => {
        return classNames('spectrum-IllustratedMessage', className);
    }, [className]);

    return (
        <section className={mergedClass} style={style}>
            {children}
        </section>
    );
};

IllustratedMessage.Description = IllustratedMessageDescription;

IllustratedMessage.Heading = IllustratedMessageHeading;

export default IllustratedMessage;
