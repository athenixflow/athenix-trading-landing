import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import {
  Brain,
  BookOpen,
  Target,
  Radio,
  CreditCard,
  BookMarked,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
} from "lucide-react-native";

const COLORS = {
  gold: "#C5A24A",
  sage: "#C1C6C0",
  charcoal: "#1A1A1A",
  white: "#FFFFFF",
  goldLight: "#D4B566",
  goldDark: "#B08F3A",
};

const { width } = Dimensions.get("window");
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;

interface Feature {
  id: number;
  icon: any;
  title: string;
  importance: string;
  steps: string[];
}

const features: Feature[] = [
  {
    id: 1,
    icon: Brain,
    title: "AI Market Analysis",
    importance:
      "Helps the user instantly get accurate forex and stock analysis using Athenix's technical and fundamental engine.",
    steps: [
      "Go to AI Assistant.",
      "Select a currency pair or stock symbol.",
      "Choose timeframe.",
      'Toggle "Include Fundamental Analysis" if desired.',
      "Press Generate.",
      "Review Entry, Stop Loss, Take Profit, and RRR.",
      "Analysis tokens deduct automatically.",
    ],
  },
  {
    id: 2,
    icon: BookOpen,
    title: "Education Hub",
    importance:
      "Provides ongoing education automatically generated from Knowledge Base + AI learning, helping users improve their trading skills.",
    steps: [
      "Visit the Education Hub.",
      "Browse available modules.",
      "Click lessons to read AI-generated content.",
      "Ask follow-up questions about any analysis.",
      "Education tokens are deducted per request.",
      "Lessons update automatically based on user patterns.",
    ],
  },
  {
    id: 3,
    icon: Target,
    title: "Trade Setup Panel",
    importance:
      "Shows users clean, structured analysis results with actionable entries, SL, TP, and RRR.",
    steps: [
      "After an AI analysis, open the Trade Setup panel.",
      "View Entry, SL, TP, RRR.",
      "Save or journal the trade.",
      "Use the setup during your trading session.",
    ],
  },
  {
    id: 4,
    icon: Radio,
    title: "Signals Feed",
    importance:
      "Allows users to view signals posted by admin-approved contributors for trading ideas.",
    steps: [
      "Open the Signals page.",
      "Browse recent signals posted by authorized signal providers.",
      "Each signal shows symbol, direction, entry, SL, TP.",
      "All subscribed users can access signals.",
    ],
  },
  {
    id: 5,
    icon: CreditCard,
    title: "Subscription & Tokens System",
    importance:
      "Gives users scalable access to analysis + education based on their subscription plan.",
    steps: [
      "Visit the Subscription Page.",
      "Choose Lite, Pro, or Elite.",
      "Tokens are credited instantly.",
      "Buy extra tokens anytime; $5 = 20 analysis tokens or 500 education tokens.",
    ],
  },
  {
    id: 6,
    icon: BookMarked,
    title: "Trade Journal",
    importance:
      "Allows users to save analysis and track progress over time.",
    steps: [
      'After an analysis, click "Add to Journal."',
      "Add notes (optional).",
      "Save.",
      "Access all journal entries in the Journal page.",
    ],
  },
  {
    id: 7,
    icon: MessageSquare,
    title: "User Feedback Loop (AI Improvement System)",
    importance:
      "Allows users to rate each AI response so Athenix learns and improves continuously.",
    steps: [
      'After each analysis, select "Was this analysis helpful?"',
      "Choose Yes or No.",
      "If No, type what was wrong.",
      "AI uses feedback to refine future responses.",
    ],
  },
];

function useScrollAnimation() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { fadeAnim, slideAnim, startAnimation };
}

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const { fadeAnim, slideAnim } = useScrollAnimation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, [delay, fadeAnim, slideAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.featureCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.featureCardContent}
      >
        <LinearGradient
          colors={[COLORS.white, COLORS.sage + "20"]}
          style={styles.cardGradient}
        >
          <View style={styles.featureHeader}>
            <View style={styles.iconContainer}>
              <feature.icon size={28} color={COLORS.gold} strokeWidth={2} />
            </View>
            <View style={styles.featureNumber}>
              <Text style={styles.featureNumberText}>
                {feature.id.toString().padStart(2, "0")}
              </Text>
            </View>
          </View>

          <Text style={styles.featureTitle}>
            Feature {feature.id}: {feature.title}
          </Text>

          <View style={styles.importanceContainer}>
            <Text style={styles.importanceLabel}>Why It&apos;s Important:</Text>
            <Text style={styles.importanceText}>{feature.importance}</Text>
          </View>

          <View style={styles.stepsContainer}>
            <Text style={styles.stepsLabel}>How to Use:</Text>
            {feature.steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.cardFooter}>
            <ChevronRight size={20} color={COLORS.gold} />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

function Header() {
  const router = useRouter();
  const { fadeAnim, slideAnim, startAnimation } = useScrollAnimation();

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <Animated.View
      style={[
        styles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={[COLORS.gold, COLORS.goldDark]}
        style={styles.headerGradient}
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={COLORS.white} />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Features & How It Works</Text>
          <Text style={styles.headerSubtitle}>
            Master every tool in your trading arsenal
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

export default function FeaturesPage() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introSection}>
          <Text style={styles.introText}>
            Each feature is designed to give you an edge in the markets. Learn
            how to use them effectively.
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              delay={index * 100}
            />
          ))}
        </View>

        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[COLORS.charcoal, "#2A2A2A"]}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Ready to Start Trading Smarter?</Text>
            <Text style={styles.ctaText}>
              All these features are available in your subscription plan.
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerGradient: {
    paddingVertical: isMobile ? 20 : 30,
    paddingHorizontal: isMobile ? 20 : 40,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: isMobile ? 20 : 40,
    top: isMobile ? 20 : 30,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.goldDark,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    alignItems: "center",
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: isMobile ? 24 : isTablet ? 32 : 36,
    fontWeight: "700" as const,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.9,
  },
  introSection: {
    paddingHorizontal: isMobile ? 20 : 40,
    paddingVertical: isMobile ? 30 : 40,
    alignItems: "center",
  },
  introText: {
    fontSize: isMobile ? 16 : 18,
    color: COLORS.charcoal,
    textAlign: "center",
    lineHeight: isMobile ? 24 : 28,
    opacity: 0.8,
    maxWidth: 600,
  },
  featuresGrid: {
    paddingHorizontal: isMobile ? 20 : 40,
    gap: isMobile ? 24 : 32,
  },
  featureCard: {
    width: "100%",
  },
  featureCardContent: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: COLORS.gold + "30",
  },
  cardGradient: {
    padding: isMobile ? 24 : 32,
  },
  featureHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: isMobile ? 56 : 64,
    height: isMobile ? 56 : 64,
    borderRadius: isMobile ? 28 : 32,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  featureNumber: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featureNumberText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: COLORS.white,
  },
  featureTitle: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: "700" as const,
    color: COLORS.charcoal,
    marginBottom: 20,
    lineHeight: isMobile ? 28 : 32,
  },
  importanceContainer: {
    backgroundColor: COLORS.gold + "15",
    padding: isMobile ? 16 : 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.gold,
  },
  importanceLabel: {
    fontSize: isMobile ? 14 : 16,
    fontWeight: "600" as const,
    color: COLORS.gold,
    marginBottom: 8,
  },
  importanceText: {
    fontSize: isMobile ? 14 : 15,
    color: COLORS.charcoal,
    lineHeight: isMobile ? 22 : 24,
    opacity: 0.85,
  },
  stepsContainer: {
    gap: 12,
  },
  stepsLabel: {
    fontSize: isMobile ? 14 : 16,
    fontWeight: "600" as const,
    color: COLORS.charcoal,
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 4,
  },
  stepNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: COLORS.white,
  },
  stepText: {
    flex: 1,
    fontSize: isMobile ? 14 : 15,
    color: COLORS.charcoal,
    lineHeight: isMobile ? 22 : 24,
    opacity: 0.8,
  },
  cardFooter: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.sage,
    alignItems: "flex-end",
  },
  ctaSection: {
    marginTop: 40,
    marginHorizontal: isMobile ? 20 : 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  ctaGradient: {
    paddingVertical: isMobile ? 40 : 60,
    paddingHorizontal: isMobile ? 24 : 40,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: isMobile ? 24 : 32,
    fontWeight: "700" as const,
    color: COLORS.gold,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  ctaText: {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.9,
  },
});
