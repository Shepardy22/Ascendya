// app.config.js
export default {
    name: "Ascendya",
    slug: "Ascendya",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        edgeToEdgeEnabled: true,
        package: "com.yurinunes.Ascendya"
    },
    web: {
        favicon: "./assets/favicon.png",
        bundler: "metro",
        output: "single"
    },
    plugins: [
        "expo-font"
    ],
    extra: {
        eas: {
            projectId: "41261eee-e49c-4bd3-95a3-e745cf41db91"
        }
    }
};
