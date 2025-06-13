import {colors, textStyle} from '../../config/theme';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Responsive from '../../utils/responsive';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.success,
        backgroundColor: colors.white,
      }}
      contentContainerStyle={{
        paddingHorizontal: Responsive.spacing(12),
      }}
      text1Style={{
        ...textStyle.body1,
        color: colors.textPrimary,
      }}
      text2Style={{
        ...textStyle.body2,
        color: colors.textSecondary,
      }}
      text2NumberOfLines={2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.error,
        backgroundColor: colors.white,
      }}
      contentContainerStyle={{paddingHorizontal: Responsive.spacing(12)}}
      text1Style={{
        ...textStyle.body1,
        color: colors.textPrimary,
      }}
      text2Style={{
        ...textStyle.body2,
        color: colors.textSecondary,
      }}
      text2NumberOfLines={2}
    />
  ),
};

export const showToast = (
  type: 'success' | 'error',
  title: string,
  message?: string,
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};
