import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import SignInScreen from "@/app/signin";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const session = localStorage.getItem("astral_session");
        if (session) {
          router.replace("/chat");
        }
      } catch (err) {
        // localStorage not available, stay on signin
      }
    };
    checkAuth();
  }, []);

  return <SignInScreen />;
}
