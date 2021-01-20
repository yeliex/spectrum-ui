import React from 'react';

export type CSSModule = {
    [className: string]: string
};

export type ThemeConfig = {
    [key in Theme | Scale | 'global']?: CSSModule;
}

export type Theme = 'light' | 'dark' | 'darkest' | 'lightest';

export type Scale = 'medium' | 'large';

export interface ComponentStatusProps {
    quiet: boolean;
    disabled: boolean;
    scale: Scale;
    theme: Theme;
    emphasized: boolean;
}

export interface InputComponentStatusProps {
    required: boolean;
    readOnly: boolean;
}

export interface ConfigContextProps extends ComponentStatusProps, InputComponentStatusProps {
    themeConfig: ThemeConfig;
    locale: string;
}

const ConfigContext = React.createContext<ConfigContextProps>(null as any);

if (process.env.NODE_ENV !== 'production') {
    ConfigContext.displayName = 'ConfigContext';
}

export default ConfigContext;
