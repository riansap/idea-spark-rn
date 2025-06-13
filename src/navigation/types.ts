import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Welcome: undefined;
    Splash: undefined;
    SignIn: undefined;
    SignUp: undefined;
    MainTabs: undefined;
    AIGenerate: undefined;

};

export type MainTabParamList = {
    Home: undefined;
    CreateTask: undefined;
    Profile: undefined;
};

export type StackNavigationProps<T extends keyof RootStackParamList> = {
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
};

export type TabNavigationProps<T extends keyof MainTabParamList> = {
    navigation: BottomTabNavigationProp<RootStackParamList & MainTabParamList, T>; // Merge RootStack + MainTab
    route: RouteProp<RootStackParamList & MainTabParamList, T>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
