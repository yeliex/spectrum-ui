import { forwardRef, cloneElement, isValidElement, useMemo, PropsWithChildren } from 'react';
import { BaseProps } from '../../common/base-component';
import classNames from 'classnames';
import './style';

export interface SideNavigationItemLinkProps extends BaseProps {
    focused?: boolean;
    // todo: add icon support
}

const SideNavigationItem = forwardRef((props: PropsWithChildren<SideNavigationItemLinkProps>, ref) => {
    const {
        children,
        className: inputClassName,
        style,
        focused,
        ...extra
    } = props;

    const className = useMemo(() => {
        return classNames('spectrum-SideNav-itemLink', {
            'focus-ring': focused,
        }, inputClassName);
    }, [focused, inputClassName]);

    if (isValidElement(children)) {
        return cloneElement(children, {
            ref,
            ...extra,
            className: classNames(className, children.props.className),
            style: {
                ...children.props.style,
                ...style,
            },
        });
    }

    return (
        <a className={className} style={style} {...extra}>{children}</a>
    );
});

export default SideNavigationItem;
