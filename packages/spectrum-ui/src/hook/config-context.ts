import { createContext } from 'react';

export type ThemeColor = 'light' | 'dark';

/**
 * todo: support mid color
 *
 * export type Theme = ThemeColor | `${ThemeColor}est` | `mid${ThemeColor}`;
 */
export type Theme = ThemeColor | `${ThemeColor}est`;

export type Scale = 'medium' | 'large';

/**
 * font family config
 *
 * auto: auto select font family in device
 *     en: source sans pro, roboto
 *     hans: source sans hans, noto sans cjk
 * noto sans: use google open source font
 *     en: roboto
 *     hans: noto sans cjk
 * source sans: adobe opensource fonts
 *     en: source sans pro
 *     hans: source sans hans
 * adobe clean: adobe restricted fonts, only for the exclusive use of Adobe products and software
 *     en: adobe clean
 *     hans: adobe clean han
 * others: custom font family config
 */
export type FontFamily = 'auto' | 'noto sans' | 'adobe clean' | 'source sans' | string;

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
    locale: string;
    fontFamily: FontFamily;
}

const ConfigContext = createContext<ConfigContextProps>(null as any);

if (process.env.NODE_ENV !== 'production') {
    ConfigContext.displayName = 'ConfigContext';
}

export default ConfigContext;
