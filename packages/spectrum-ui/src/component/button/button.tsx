import React, { AnchorHTMLAttributes } from 'react';
import ButtonGroup from '../button-group';
import Style from '@spectrum-css/button/dist/index-vars.css';
import './index.less';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';

export type ButtonType = 'cta' | 'primary';

export interface IButtonProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    type?: ButtonType;
    size?: 'S' | 'M' | 'L' | 'XL'
    children: React.ReactNode;
}

function Button(props: IButtonProps) {
    const { className, type = 'primary', size = 'M', style, children } = props;

    const mergedClass = React.useMemo(() => {
        return classNames(Style.spectrumButton, {
            [Style.spectrumButtonCta]: type === 'cta',
            [Style.spectrumButtonPrimary]: type === 'primary',
        }, `${Style.spectrumButton}--size${size}`, className);
    }, [className, type]);

    return (
        <button
            className={mergedClass}
            style={style}
        >
            <span className={Style.spectrumButtonLabel}>{children}</span>
        </button>
    );
}

Button.Group = ButtonGroup;

export default Button;
