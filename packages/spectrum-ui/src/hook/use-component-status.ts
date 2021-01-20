import React from 'react';
import { defaults } from 'lodash';
import ConfigContext, { ComponentStatusProps, InputComponentStatusProps } from './config-context';

function useComponentStatus<T extends Partial<ComponentStatusProps>>(inputConfig: T): ComponentStatusProps
function useComponentStatus<T extends Partial<ComponentStatusProps & InputComponentStatusProps>>(inputConfig: T): ComponentStatusProps & InputComponentStatusProps
function useComponentStatus<T extends Partial<ComponentStatusProps & InputComponentStatusProps>>(inputConfig: T): ComponentStatusProps & InputComponentStatusProps {
    const outerConfig = React.useContext(ConfigContext);

    const {
        quiet: inputQuiet,
        emphasized: inputEmphasized,
        readOnly: inputReadOnly,
        required: inputRequired,
        disabled: inputDisabled,
        scale: inputScale,
        theme: inputTheme,
    } = inputConfig;

    const {
        quiet,
        emphasized,
        readOnly,
        required,
        disabled,
        scale,
        theme,
    } = outerConfig;

    return React.useMemo(() => {
        return defaults({
            quiet: inputQuiet,
            emphasized: inputEmphasized,
            readOnly: inputReadOnly,
            required: inputRequired,
            disabled: inputDisabled,
            scale: inputScale,
            theme: inputTheme,
        }, {
            quiet,
            emphasized,
            readOnly,
            required,
            disabled,
            scale,
            theme,
        });
    }, [
        inputConfig,
        outerConfig,
        inputQuiet,
        inputEmphasized,
        inputReadOnly,
        inputRequired,
        inputDisabled,
        inputScale,
        inputTheme,
        quiet,
        emphasized,
        readOnly,
        required,
        disabled,
        scale,
        theme,
    ]);
}

export default useComponentStatus;
