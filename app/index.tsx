import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Brain,
  BookOpen,
  TrendingUp,
  ChevronDown,
  Sparkles,
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

function useScrollAnimation() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { fadeAnim, slideAnim, startAnimation };
}

function Button({
  text,
  onPress,
  variant = "primary",
}: {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
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
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          variant === "secondary" && styles.buttonSecondary,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            variant === "secondary" && styles.buttonTextSecondary,
          ]}
        >
          {text}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function HeroSection() {
  const { fadeAnim, slideAnim, startAnimation } = useScrollAnimation();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startAnimation();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [startAnimation, pulseAnim]);

  const handleCTA = () => {
    Linking.openURL("https://app.athenixflow.com");
  };

  return (
    <View style={styles.heroContainer}>
      <LinearGradient
        colors={[COLORS.white, COLORS.sage]}
        style={styles.heroGradient}
      >
        <Animated.View
          style={[
            styles.heroContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.logoContainer,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={styles.logoPlaceholder}>
              <Sparkles size={isMobile ? 48 : 64} color={COLORS.gold} />
            </View>
          </Animated.View>

          <Text style={styles.heroTitle}>Trade Smarter with Athenix</Text>
          <Text style={styles.heroSubtitle}>
            Experience the AI-powered trading companion that analyzes markets,
            teaches strategy, and evolves with you.
          </Text>

          <View style={styles.heroButtonContainer}>
            <Button text="Launch Athenix App" onPress={handleCTA} />
          </View>

          <Text style={styles.heroSubtext}>
            Available worldwide • Designed for precision traders
          </Text>

          <Animated.View style={styles.scrollIndicator}>
            <ChevronDown size={24} color={COLORS.gold} />
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  const { fadeAnim, slideAnim } = useScrollAnimation();

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, [delay, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.featureCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.featureIconContainer}>
        <Icon size={32} color={COLORS.gold} />
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </Animated.View>
  );
}

function FeaturesSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What Makes Athenix Different</Text>
      <View style={styles.featuresContainer}>
        <FeatureCard
          icon={Brain}
          title="AI Market Intelligence"
          description="Athenix continuously scans live forex and stock data, detecting institutional footprints, liquidity zones, and market structure shifts with unmatched accuracy."
          delay={0}
        />
        <FeatureCard
          icon={BookOpen}
          title="Smart Education Hub"
          description="Learn dynamically. Athenix adapts its lessons and insights from your usage patterns and trading performance."
          delay={200}
        />
        <FeatureCard
          icon={TrendingUp}
          title="Adaptive Insights"
          description="Each question and trade refines Athenix's intelligence, making it your personal, evolving market strategist."
          delay={400}
        />
      </View>
    </View>
  );
}

function AboutSection() {
  const { fadeAnim, slideAnim, startAnimation } = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => startAnimation(), 300);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  return (
    <Animated.View
      style={[
        styles.section,
        styles.aboutSection,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.aboutTitleContainer}>
        <Text style={styles.sectionTitle}>Built for Traders Who Think Ahead</Text>
        <View style={styles.goldUnderline} />
      </View>
      <Text style={styles.aboutText}>
        Athenix blends institutional-grade logic with adaptive AI. It interprets
        liquidity, timing, and psychology to clarify market structure. From forex
        to stocks, Athenix transforms complexity into actionable insight.
      </Text>
    </Animated.View>
  );
}

function TestimonialCard({
  quote,
  author,
  delay,
}: {
  quote: string;
  author: string;
  delay: number;
}) {
  const { fadeAnim, slideAnim } = useScrollAnimation();

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
  }, [delay, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.testimonialCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.testimonialQuote}>&ldquo;{quote}&rdquo;</Text>
      <Text style={styles.testimonialAuthor}>— {author}</Text>
    </Animated.View>
  );
}

function TestimonialsSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What Traders Say</Text>
      <View style={styles.testimonialsContainer}>
        <TestimonialCard
          quote="Athenix feels like a professional trading desk in my browser."
          author="Marcus O."
          delay={0}
        />
        <TestimonialCard
          quote="The Education Hub explains market logic better than any mentor I've had."
          author="Vanessa T."
          delay={200}
        />
        <TestimonialCard
          quote="Finally, an AI that understands smart money and structure."
          author="Daniel E."
          delay={400}
        />
      </View>
    </View>
  );
}

function PricingCard({
  title,
  price,
  features,
  description,
  delay,
}: {
  title: string;
  price: string;
  features: string[];
  description: string;
  delay: number;
}) {
  const { fadeAnim, slideAnim } = useScrollAnimation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
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

  const handleCTA = () => {
    Linking.openURL("https://app.athenixflow.com");
  };

  return (
    <Animated.View
      style={[
        styles.pricingCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleCTA}
        style={styles.pricingCardContent}
      >
        <Text style={styles.pricingTitle}>{title}</Text>
        <Text style={styles.pricingPrice}>{price}</Text>
        <View style={styles.pricingFeatures}>
          {features.map((feature, index) => (
            <Text key={index} style={styles.pricingFeature}>
              • {feature}
            </Text>
          ))}
        </View>
        <Text style={styles.pricingDescription}>{description}</Text>
        <View style={styles.pricingButton}>
          <Text style={styles.buttonText}>Start Now</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

function PricingSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Choose Your Plan</Text>
      <View style={styles.pricingContainer}>
        <PricingCard
          title="Lite"
          price="$20/month"
          features={["10 Analysis Tokens", "70 Education Tokens"]}
          description="For beginners learning the ropes."
          delay={0}
        />
        <PricingCard
          title="Pro"
          price="$60/month"
          features={["30 Analysis Tokens", "150 Education Tokens"]}
          description="For active traders combining technical and fundamental analysis."
          delay={200}
        />
        <PricingCard
          title="Elite"
          price="$120/month"
          features={["70 Analysis Tokens", "300 Education Tokens"]}
          description="For professionals seeking priority AI response and maximum insights."
          delay={400}
        />
      </View>
    </View>
  );
}

function CTASection() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleCTA = () => {
    Linking.openURL("https://app.athenixflow.com");
  };

  return (
    <View style={styles.ctaSection}>
      <LinearGradient
        colors={[COLORS.charcoal, "#2A2A2A"]}
        style={styles.ctaGradient}
      >
        <Text style={styles.ctaTitle}>Your Edge Starts with Intelligence.</Text>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Button text="Launch Athenix App" onPress={handleCTA} />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

function Footer({ onLinkPress }: { onLinkPress: (section: string) => void }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.footerLogoContainer}>
          <View style={styles.footerLogo}>
            <Sparkles size={40} color={COLORS.gold} />
          </View>
        </View>

        <View style={styles.footerColumns}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>About</Text>
            <Text style={styles.footerText}>
              Athenix is an AI-driven trading and education platform helping
              traders master liquidity, structure, and precision.
            </Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>Legal</Text>
            <Pressable onPress={() => onLinkPress("privacy")}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Pressable>
            <Pressable onPress={() => onLinkPress("terms")}>
              <Text style={styles.footerLink}>Terms of Use</Text>
            </Pressable>
            <Pressable onPress={() => onLinkPress("disclaimer")}>
              <Text style={styles.footerLink}>Disclaimer</Text>
            </Pressable>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerColumnTitle}>Contact</Text>
            <Pressable
              onPress={() => Linking.openURL("mailto:help@athenixflow.com")}
            >
              <Text style={styles.footerLink}>help@athenixflow.com</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footerCopyright}>
          © 2025 Athenix. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

function LegalSection({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  return (
    <View style={styles.legalSection}>
      <Text style={styles.legalTitle}>{title}</Text>
      <Text style={styles.legalEffective}>
        {id === "disclaimer" ? "" : "Effective January 1, 2025"}
      </Text>
      <Text style={styles.legalContent}>{content}</Text>
    </View>
  );
}

export default function App() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const privacyRef = useRef<View>(null);
  const termsRef = useRef<View>(null);
  const disclaimerRef = useRef<View>(null);

  const scrollToSection = (section: string) => {
    const refs: Record<string, any> = {
      privacy: privacyRef,
      terms: termsRef,
      disclaimer: disclaimerRef,
    };

    if (refs[section]?.current) {
      refs[section].current.measureLayout(
        scrollViewRef.current,
        (x: number, y: number) => {
          scrollViewRef.current?.scrollTo({ y, animated: true });
        }
      );
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />

      <View ref={privacyRef} collapsable={false}>
        <LegalSection
          id="privacy"
          title="Privacy Policy"
          content="Athenix respects your privacy and is committed to protecting your data. We collect account info (email, name), activity logs, and analytics solely to improve your experience. Data is encrypted and never sold or shared. You can view, modify, or delete your data via account settings or by contacting help@athenixflow.com. Cookies are used for session management and analytics. Continued use implies consent to updated policies."
        />
      </View>

      <View ref={termsRef} collapsable={false}>
        <LegalSection
          id="terms"
          title="Terms of Use"
          content="Athenix provides AI-assisted market analysis and education. It is not financial advice. Subscriptions renew monthly and may be cancelled anytime. Tokens are digital credits that reset each billing cycle. Data usage complies with privacy laws. Users must not misuse the service or share credentials. Results are not guaranteed. Violations may lead to suspension. Governed by applicable international law. Contact help@athenixflow.com for issues."
        />
      </View>

      <View ref={disclaimerRef} collapsable={false}>
        <LegalSection
          id="disclaimer"
          title="Disclaimer"
          content="Athenix offers educational, AI-generated insights. Market outcomes depend solely on user decisions. No results are guaranteed."
        />
      </View>

      <Footer onLinkPress={scrollToSection} />
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
  heroContainer: {
    minHeight: Dimensions.get("window").height,
  },
  heroGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: isMobile ? 20 : 40,
    paddingVertical: 60,
  },
  heroContent: {
    alignItems: "center",
    maxWidth: 900,
    width: "100%",
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: isMobile ? 120 : 160,
    height: isMobile ? 120 : 160,
    borderRadius: isMobile ? 60 : 80,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  heroTitle: {
    fontSize: isMobile ? 36 : isTablet ? 48 : 64,
    fontWeight: "700" as const,
    color: COLORS.charcoal,
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: isMobile ? 16 : 20,
    color: COLORS.charcoal,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: isMobile ? 24 : 32,
    opacity: 0.8,
  },
  heroButtonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: isMobile ? 32 : 48,
    paddingVertical: isMobile ? 14 : 18,
    borderRadius: 30,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: isMobile ? 16 : 18,
    fontWeight: "600" as const,
    textAlign: "center",
  },
  buttonTextSecondary: {
    color: COLORS.gold,
  },
  heroSubtext: {
    fontSize: 14,
    color: COLORS.charcoal,
    opacity: 0.6,
    textAlign: "center",
  },
  scrollIndicator: {
    marginTop: 60,
    opacity: 0.5,
  },
  section: {
    paddingHorizontal: isMobile ? 20 : 40,
    paddingVertical: isMobile ? 60 : 80,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: isMobile ? 32 : isTablet ? 40 : 48,
    fontWeight: "700" as const,
    color: COLORS.charcoal,
    textAlign: "center",
    marginBottom: 50,
    letterSpacing: -0.5,
  },
  featuresContainer: {
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 30 : 40,
    maxWidth: 1200,
    width: "100%",
  },
  featureCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: isMobile ? 30 : 40,
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.sage,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.sage,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: isMobile ? 20 : 24,
    fontWeight: "600" as const,
    color: COLORS.charcoal,
    marginBottom: 15,
  },
  featureDescription: {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.charcoal,
    opacity: 0.7,
    lineHeight: isMobile ? 22 : 26,
  },
  aboutSection: {
    backgroundColor: COLORS.sage,
  },
  aboutTitleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  goldUnderline: {
    width: isMobile ? 80 : 120,
    height: 4,
    backgroundColor: COLORS.gold,
    marginTop: 15,
    borderRadius: 2,
  },
  aboutText: {
    fontSize: isMobile ? 16 : 20,
    color: COLORS.charcoal,
    textAlign: "center",
    lineHeight: isMobile ? 28 : 36,
    maxWidth: 800,
    opacity: 0.8,
  },
  testimonialsContainer: {
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 30 : 40,
    maxWidth: 1200,
    width: "100%",
  },
  testimonialCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: isMobile ? 30 : 40,
    borderWidth: 2,
    borderColor: COLORS.gold,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 6,
  },
  testimonialQuote: {
    fontSize: isMobile ? 16 : 18,
    color: COLORS.charcoal,
    lineHeight: isMobile ? 26 : 30,
    marginBottom: 20,
    fontStyle: "italic",
  },
  testimonialAuthor: {
    fontSize: 14,
    color: COLORS.gold,
    fontWeight: "600" as const,
  },
  pricingContainer: {
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 30 : 40,
    maxWidth: 1200,
    width: "100%",
  },
  pricingCard: {
    flex: 1,
  },
  pricingCardContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: isMobile ? 30 : 40,
    borderWidth: 2,
    borderColor: COLORS.gold,
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    height: "100%",
  },
  pricingTitle: {
    fontSize: isMobile ? 24 : 28,
    fontWeight: "700" as const,
    color: COLORS.charcoal,
    marginBottom: 10,
  },
  pricingPrice: {
    fontSize: isMobile ? 32 : 40,
    fontWeight: "700" as const,
    color: COLORS.gold,
    marginBottom: 25,
  },
  pricingFeatures: {
    marginBottom: 20,
    gap: 12,
  },
  pricingFeature: {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.charcoal,
    lineHeight: 24,
  },
  pricingDescription: {
    fontSize: 14,
    color: COLORS.charcoal,
    opacity: 0.7,
    marginBottom: 30,
    lineHeight: 22,
  },
  pricingButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaSection: {
    minHeight: isMobile ? 300 : 400,
  },
  ctaGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: isMobile ? 20 : 40,
    paddingVertical: isMobile ? 60 : 80,
  },
  ctaTitle: {
    fontSize: isMobile ? 32 : isTablet ? 40 : 48,
    fontWeight: "700" as const,
    color: COLORS.gold,
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  footer: {
    backgroundColor: COLORS.charcoal,
    paddingHorizontal: isMobile ? 20 : 40,
    paddingVertical: 60,
  },
  footerContent: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  footerLogoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  footerLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.charcoal,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.gold,
  },
  footerColumns: {
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 40 : 60,
    marginBottom: 50,
  },
  footerColumn: {
    flex: 1,
  },
  footerColumnTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: COLORS.gold,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
    lineHeight: 22,
  },
  footerLink: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
    lineHeight: 28,
  },
  footerCopyright: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.6,
    textAlign: "center",
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.sage,
  },
  legalSection: {
    paddingHorizontal: isMobile ? 20 : 40,
    paddingVertical: 60,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.sage,
  },
  legalTitle: {
    fontSize: isMobile ? 28 : 36,
    fontWeight: "700" as const,
    color: COLORS.charcoal,
    marginBottom: 10,
  },
  legalEffective: {
    fontSize: 14,
    color: COLORS.charcoal,
    opacity: 0.6,
    marginBottom: 20,
  },
  legalContent: {
    fontSize: isMobile ? 14 : 16,
    color: COLORS.charcoal,
    lineHeight: isMobile ? 24 : 28,
    opacity: 0.8,
  },
});
