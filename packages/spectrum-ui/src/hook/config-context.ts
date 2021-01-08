import React from 'react';

export type CSSModule = {
    [className: string]: string
};

export type ThemeConfig = {
    [key in Theme | Scale | 'global']?: CSSModule;
}

export type Theme = 'light' | 'dark' | 'darkest' | 'lightest';

export type Scale = 'medium' | 'large';

export interface ConfigContextProps {
    theme: Theme;
    themeConfig: ThemeConfig;
    scale: Scale;
    locale: string;
    quiet: boolean;
    emphasized: boolean;
    disabled: boolean;
    required: boolean;
    readOnly: boolean;
}

const ConfigContext = React.createContext<ConfigContextProps>(null as any);

if (process.env.NODE_ENV !== 'production') {
    ConfigContext.displayName = 'ConfigContext';
}

export default ConfigContext;
