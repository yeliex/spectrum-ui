import React, { createElement, PropsWithChildren } from 'react';
import { TypographyTextBaseProps } from './typography';
import Style from './style';
import classNames from 'classnames';

export interface TypographyHeadingProps extends TypographyTextBaseProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
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
        centered,
    } = props;

    const [size, level] = React.useMemo(() => {
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

    const className = React.useMemo(() => {
        return classNames(
            Style.spectrumHeading,
            `${Style.spectrumHeading}--size${size.toUpperCase()}`,
            // todo: merge color of size and height
            size.endsWith('L') && weight !== 'normal' ?
                `${Style.spectrumHeading}-size${size.toUpperCase()}-${weight}` : undefined,
            {
                [Style.spectrumHeadingSerif]: serif,
                [Style.spectrumHeadingEmphasis]: emphasis,
                [Style.spectrumHeadingStrong]: strong,
                [Style.spectrumTypographyCenter]: centered,
            },
            inputClassName,
        );
    }, [size, weight, serif, strong, centered, inputClassName, emphasis]);

    return createElement(node as string || `h${level}`,
        {
            className,
            style,
        },
        children,
    );
};

export default TypographyHeading;
