import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCALE_FACTOR = SCREEN_WIDTH / 320;

class Responsive {
    static w(width: number) {
        return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * width) / 100);
    }

    static h(height: number) {
        return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * height) / 100);
    }

    static fs(size: number) {
        const newSize = size * SCALE_FACTOR;
        if (Platform.OS === 'ios') {
            return Math.round(PixelRatio.roundToNearestPixel(newSize));
        }
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }

    static radius(size: number) {
        return PixelRatio.roundToNearestPixel(size * SCALE_FACTOR);
    }

    static spacing(size: number) {
        return PixelRatio.roundToNearestPixel(size * SCALE_FACTOR);
    }
}

export default Responsive;
