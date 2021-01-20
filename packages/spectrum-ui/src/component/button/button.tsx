import React, { AnchorHTMLAttributes } from 'react';
import ButtonGroup from '../button-group';
import Style from './style';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';
import { ComponentStatusProps } from '../../hook/config-context';
import useComponentStatus from '../../hook/use-component-status';
import useClassNames from '../../hook/use-classnames';
import useExtraAttribute from '../../hook/use-extra-attribute';

export type ButtonType = 'cta' | 'primary' | 'secondary' | 'warning' | 'overBackground';

export interface IButtonProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement>, Partial<ComponentStatusProps> {
    type?: ButtonType;
    size?: 'S' | 'M' | 'L' | 'XL'
    children: React.ReactNode;
}

function Button(props: IButtonProps) {
    const {
        className,
        type = 'primary',
        size = 'M',
        style,
        children,
        ...extra
    } = props;

    const componentStatus = useComponentStatus(props);

    const extraAttr = useExtraAttribute(extra);

    const { quiet, disabled } = componentStatus;

    const mergedClass = useClassNames(() => {
        return classNames(Style.spectrumButton, {
            [Style.spectrumButtonCta]: type === 'cta',
            [Style.spectrumButtonPrimary]: type === 'primary',
            [Style.spectrumButtonSecondary]: type === 'secondary',
            [Style.spectrumButtonWarning]: type === 'warning',
            [Style.spectrumButtonOverBackground]: type === 'overBackground',
            [Style.spectrumButtonQuiet]: quiet,
        }, `${Style.spectrumButton}--size${size}`, className);
    }, componentStatus, [className, type, quiet, disabled, size]);

    return (
        <button
            className={mergedClass}
            style={style}
            {...extraAttr}
        >
            {children}
        </button>
    );
}

Button.Group = ButtonGroup;

export default Button;
