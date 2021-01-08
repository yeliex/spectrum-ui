import { useMemo, createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import classNames from 'classnames';
import './style';

export interface TypographyHeadingProps extends TypographyTextBaseProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const SizeToLevel = {
    XXXL: 1,
    XXL: 1,
    XL: 1,
    L: 2,
    M: 3,
    S: 4,
    XS: 5,
    XXS: 6,
};

const LevelToSize = {
    1: 'XL',
    2: 'L',
    3: 'M',
    4: 'S',
    5: 'XS',
    6: 'XSS',
};

const TypographyHeading = (props: PropsWithChildren<TypographyHeadingProps>) => {
    const {
        children,
        level: inputLevel,
        node,
        size: inputSize,
        weight = 'normal',
        serif,
        emphasis,
        strong,
        className: inputClassName,
        style,
    } = props;

    const [size, level] = useMemo(() => {
        if (!inputLevel && !inputSize) {
            return ['XL', 1];
        }

        if (inputLevel && !inputSize) {
            return [LevelToSize[inputLevel], inputLevel];
        }

        if (!inputLevel && inputSize) {
            return [inputSize, SizeToLevel[inputSize]];
        }

        return [inputSize!, inputLevel!];
    }, [inputSize, inputLevel]);

    const className = useMemo(() => {
        return classNames(
            'spectrum-Heading',
            `spectrum-Heading--size${size.toUpperCase()}`,
            // todo: merge color of size and height
            size.endsWith('L') && weight !== 'normal' ?
                `spectrum-Heading-size${size.toUpperCase()}-${weight}` : undefined,
            {
                'spectrum-Heading--serif': serif,
                'spectrum-Heading-emphasized': emphasis,
                'spectrum-Heading-strong': strong,
            },
            inputClassName,
        );
    }, [size, weight, serif, strong, inputClassName, emphasis]);

    return createElement(
        node as string || `h${level}`,
        {
            className,
            style,
        },
        children,
    );
};

export default TypographyHeading;
