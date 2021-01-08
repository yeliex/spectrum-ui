import React, { PropsWithChildren } from 'react';
import Style from './style';

export interface ButtonGroupProps {

}

const ButtonGroup = (props: PropsWithChildren<ButtonGroupProps>) => {
    console.log(props);
    return (
        <div className={Style.spectrumButtonGroup}>
            {props.children}
        </div>
    );
};

export default ButtonGroup;
