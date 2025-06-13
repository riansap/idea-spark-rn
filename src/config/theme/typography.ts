import Responsive from '../../utils/responsive';

export const fonts = {
    Black: 'Roboto-Black',
    Bold: 'Roboto-Bold',
    Medium: 'Roboto-Medium',
    Regular: 'Roboto-Regular',
    Light: 'Roboto-Light',
    SemiBold: 'Roboto-SemiBold',
};

export const fontSize = {
    xs: Responsive.fs(12),
    sm: Responsive.fs(14),
    md: Responsive.fs(16),
    lg: Responsive.fs(18),
    xl: Responsive.fs(20),
    xxl: Responsive.fs(24),
    xxxl: Responsive.fs(32),
    display: Responsive.fs(40),
};

// Enhanced text styles with proper typography scaling
export const textStyle = {
    display: {
        fontFamily: fonts.Black,
        fontSize: fontSize.display,
        lineHeight: fontSize.display * 1.2,
        letterSpacing: -0.5,
    },
    h1: {
        fontFamily: fonts.Bold,
        fontSize: fontSize.xxxl,
        lineHeight: fontSize.xxxl * 1.2,
        letterSpacing: -0.3,
    },
    h2: {
        fontFamily: fonts.Bold,
        fontSize: fontSize.xxl,
        lineHeight: fontSize.xxl * 1.25,
    },
    h3: {
        fontFamily: fonts.SemiBold,
        fontSize: fontSize.xl,
        lineHeight: fontSize.xl * 1.3,
        letterSpacing: -0.1,
    },
    subtitle1: {
        fontFamily: fonts.Medium,
        fontSize: fontSize.lg,
        lineHeight: fontSize.lg * 1.5,
        letterSpacing: 0.1,
    },
    subtitle2: {
        fontFamily: fonts.Medium,
        fontSize: fontSize.md,
        lineHeight: fontSize.md * 1.5,
        letterSpacing: 0.1,
    },
    body1: {
        fontFamily: fonts.Regular,
        fontSize: fontSize.md,
        lineHeight: fontSize.md * 1.6,
        letterSpacing: 0.15,
    },
    body2: {
        fontFamily: fonts.Regular,
        fontSize: fontSize.sm,
        lineHeight: fontSize.sm * 1.6,
        letterSpacing: 0.1,
    },
    button: {
        fontFamily: fonts.Medium,
        fontSize: fontSize.md,
        lineHeight: fontSize.md * 1.4,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    caption: {
        fontFamily: fonts.Regular,
        fontSize: fontSize.xs,
        lineHeight: fontSize.xs * 1.7,
        letterSpacing: 0.25,
        overline: {
            fontFamily: fonts.Medium,
            fontSize: fontSize.xs,
            lineHeight: fontSize.xs * 1.6,
            letterSpacing: 1,
            textTransform: 'uppercase',
        },
        link: {
            fontFamily: fonts.Medium,
            fontSize: fontSize.sm,
            lineHeight: fontSize.sm * 1.5,
            letterSpacing: 0.15,
            textDecorationLine: 'underline',
        },
    },
};
