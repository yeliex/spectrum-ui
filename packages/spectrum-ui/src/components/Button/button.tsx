import { type AnchorHTMLAttributes, ReactNode } from 'react';
import ButtonGroup from '../ButtonGroup';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';
import { ComponentStatusProps } from '../../hook/config-context';
import useComponentStatus from '../../hook/use-component-status';
import useClassNames from '../../hook/use-classnames';
import useExtraAttribute from '../../hook/use-extra-attribute';

export type ButtonType = 'cta' | 'primary' | 'secondary' | 'warning' | 'overBackground';

export interface ButtonProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement>, Partial<ComponentStatusProps> {
    type?: ButtonType;
    size?: 'S' | 'M' | 'L' | 'XL';
    children: ReactNode;
}

function Button(props: ButtonProps) {
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
        return classNames('spectrum-Button', {
            'spectrum-Button--cta': type === 'cta',
            'spectrum-Button--primary': type === 'primary',
            'spectrum-Button--secondary': type === 'secondary',
            'spectrum-Button--warning': type === 'warning',
            'spectrum-Button--overBackground': type === 'overBackground',
            'spectrum-Button-quiet': quiet,
        }, `spectrum-Button--size${size}`, className);
    }, componentStatus, [className, type, quiet, size]);

    return (
        <button
            className={mergedClass}
            style={style}
            disabled={disabled}
            {...extraAttr}
        >
            {children}
        </button>
    );
}

Button.Group = ButtonGroup;

export default Button;
