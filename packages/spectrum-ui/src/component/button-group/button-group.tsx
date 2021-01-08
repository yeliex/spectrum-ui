import React, { PropsWithChildren } from 'react';
import Style from '@spectrum-css/buttongroup/dist/index-vars.css';
import './index.less';

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
