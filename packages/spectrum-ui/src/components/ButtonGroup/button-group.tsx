import { PropsWithChildren } from 'react';

export interface ButtonGroupProps {

}

const ButtonGroup = (props: PropsWithChildren<ButtonGroupProps>) => {
    console.log(props);
    return (
        <div>
            {props.children}
        </div>
    );
};

export default ButtonGroup;
