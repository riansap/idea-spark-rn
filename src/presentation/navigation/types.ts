export type RootStackParamList = {
    MainTabs: undefined;
    AIGenerate: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    CreateTask: undefined;
    Profile: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}