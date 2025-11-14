import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Head from "expo-router/head";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <>
      <Head>
        <title>Athenix - AI-Powered Trading Companion</title>
        <meta name="description" content="Experience the AI-powered trading companion that analyzes markets, teaches strategy, and evolves with you." />
        <link rel="icon" href="https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/xcz35k558ht0y522dai0f" />
        <link rel="shortcut icon" href="https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/xcz35k558ht0y522dai0f" />
        <meta property="og:title" content="Athenix - AI-Powered Trading Companion" />
        <meta property="og:description" content="Experience the AI-powered trading companion that analyzes markets, teaches strategy, and evolves with you." />
        <meta property="og:image" content="https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/xcz35k558ht0y522dai0f" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Athenix - AI-Powered Trading Companion" />
        <meta name="twitter:description" content="Experience the AI-powered trading companion that analyzes markets, teaches strategy, and evolves with you." />
        <meta name="twitter:image" content="https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/xcz35k558ht0y522dai0f" />
      </Head>
      <Stack screenOptions={{ headerBackTitle: "Back" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="features" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
