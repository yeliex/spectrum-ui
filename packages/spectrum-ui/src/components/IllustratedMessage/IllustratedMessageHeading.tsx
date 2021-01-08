import { BaseProps } from '../../common/base-component';
import { PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';
import Heading, { TypographyHeadingProps } from '../Typography/heading';
import './style';

export interface IllustratedMessageHeadingProps extends BaseProps, TypographyHeadingProps {

}

const IllustratedMessageHeading = (props: PropsWithChildren<IllustratedMessageHeadingProps>) => {
    const { children, className, style, level = 1, ...extra } = props;

    const mergedClass = useMemo(() => {
        return classNames('spectrum-IllustratedMessage-heading', className);
    }, [className]);

    return (
        <Heading level={level} className={mergedClass} style={style} {...extra}>
            {children}
        </Heading>
    );
};


export default IllustratedMessageHeading;
