import { useMemo, type PropsWithChildren } from 'react';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';
import './style';

export interface SideNavigationItemProps extends BaseProps {
    active?: boolean;
    selected?: boolean;
    disabled?: boolean;
}

const SideNavigationItem = (props: PropsWithChildren<SideNavigationItemProps>) => {
    const {
        children,
        className: inputClassName,
        style,
        active,
        disabled,
        selected,
    } = props;

    const className = useMemo(() => {
        return classNames('spectrum-SideNav-item',{
            'is-selected': selected,
            'is-active': active,
            'is-disabled': disabled,
        }, inputClassName);
    }, [selected, active, disabled, inputClassName]);

    return (
        <li className={className} style={style}>
            {children}
        </li>
    );
};

export default SideNavigationItem;
