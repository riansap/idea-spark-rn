export const Routes = {
    Splash: {
        name: 'Splash',
        screens: {
            Splash: 'Splash',
        },
    },
    Auth: {
        name: 'Auth',
        screens: {
            SignIn: 'SignIn',
            SignUp: 'SignUp',
        },
    },
    MainTabs: {
        name: 'MainTabs',
        screens: {
            Home: 'Home',
            Create: 'Create',
            Profile: 'Profile',
        },
    },
} as const;
