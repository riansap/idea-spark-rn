export const Routes = {
    Stack: {
        name: 'Stack',
        screens: {
            Welcome: 'Welcome',
            Splash: 'Splash',
            SignIn: 'SignIn',
            SignUp: 'SignUp',
            AiGenerate: 'AiGenerate',
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
