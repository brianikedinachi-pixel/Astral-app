import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import SignInScreen from "@/app/signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const K_SESSION = "astral_session";

export default function HomeScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await AsyncStorage.getItem(K_SESSION);
        if (session) {
          setHasSession(true);
          // Small delay to ensure proper navigation transition
          setTimeout(() => {
            router.replace("/chat");
          }, 100);
        } else {
          setHasSession(false);
          setIsChecking(false);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setHasSession(false);
        setIsChecking(false);
      }
    };
    checkAuth();
  }, [router]);

  // If checking auth or navigating to chat, show loading screen
  if (isChecking || hasSession) {
    return (
      <ScreenContainer containerClassName="bg-background">
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color="#00eaff" size="large" />
          <Text style={{ color: "#8fd6ff", marginTop: 12, fontSize: 14 }}>
            {hasSession ? "Loading chat..." : "Initializing..."}
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  // Not authenticated, show sign in screen
  return <SignInScreen />;
}
