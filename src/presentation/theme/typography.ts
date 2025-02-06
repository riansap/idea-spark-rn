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
};

// Common text styles
export const textStyle = {
    heading1: {
        fontFamily: fonts.Bold,
        fontSize: fontSize.xxxl,
    },
    heading2: {
        fontFamily: fonts.Bold,
        fontSize: fontSize.xxl,
    },
    body: {
        fontFamily: fonts.Regular,
        fontSize: fontSize.md,
    },
    caption: {
        fontFamily: fonts.Regular,
        fontSize: fontSize.xs,
    },
};
