import { BaseProps } from '../../common/base-component';
import { PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';
import Body, { TypographyBodyProps } from '../Typography/body';
import './style';

export interface IllustratedMessageDescriptionProps extends BaseProps, TypographyBodyProps {

}

const IllustratedMessageDescription = (props: PropsWithChildren<IllustratedMessageDescriptionProps>) => {
    const { children, className, style, ...extra } = props;

    const mergedClass = useMemo(() => {
        return classNames('spectrum-IllustratedMessage-description', className);
    }, [className]);

    return (
        <Body className={mergedClass} style={style} {...extra}>
            {children}
        </Body>
    );
};


export default IllustratedMessageDescription;
