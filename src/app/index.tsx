import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  Image,
  Easing,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import type { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Menu,
  X,
  Home,
  Heart,
  Droplets,
  Sparkles,
  HandHeart,
  ArrowRight,
  Users,
  MapPin,
  Activity,
  CheckCircle2,
  Info,
  Zap,
  Search,
  ShieldCheck,
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const MENU_WIDTH = Math.min(width * 0.91, 430);

const RED = "#E31B36";
const RED_DARK = "#AE1229";
const RED_DEEP = "#7A0E1F";
const DARK = "#650D1D";
const DARK_DEEP = "#3C0713";
const WHITE = "#FFFFFF";
const BLACK = "#17181C";
const MUTED = "#71737B";
const BG = "#F6F7F8";
const SOFT = "#FFF0F2";
const BORDER = "#EDEDEF";
const ACCENT = "#FF6479";

const ICON = require("../../assets/images/icon.png");

// ------------------------------------------------------
// One-time launch animation
// ------------------------------------------------------

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <HomeContent />
    </SafeAreaProvider>
  );
}

function HomeContent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const launchPlayer = useVideoPlayer(
    require("../../assets/images/bg.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
      player.playbackRate = 0.5; // 50% speed
    }
  );

  const [menu, setMenu] = useState(false);
  const menuX = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const menuOverlayOpacity = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    if (menu) return;

    menuX.stopAnimation();
    menuOverlayOpacity.stopAnimation();

    // Render first, then start the animation on the next frame.
    // This avoids the menu appearing suddenly on Android/iOS.
    setMenu(true);

    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(menuX, {
          toValue: 0,
          duration: 320,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(menuOverlayOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: Platform.OS !== "web",
        }),
      ]).start();
    });
  };

  const closeMenu = () => {
    if (!menu) return;

    menuX.stopAnimation();
    menuOverlayOpacity.stopAnimation();

    Animated.parallel([
      Animated.timing(menuX, {
        toValue: -MENU_WIDTH,
        duration: 260,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.timing(menuOverlayOpacity, {
        toValue: 0,
        duration: 210,
        easing: Easing.in(Easing.quad),
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start(({ finished }) => {
      if (finished) setMenu(false);
    });
  };
  const [showSupportQR, setShowSupportQR] = useState(false);
  const [showLaunch, setShowLaunch] = useState(true);

  // Play the MP4 only while the launch page is visible.
  useEffect(() => {
    if (showLaunch) {
      launchPlayer.play();
    } else {
      launchPlayer.pause();
    }

    return () => {
      launchPlayer.pause();
    };
  }, [showLaunch, launchPlayer]);

  const launchOpacity = useRef(
    new Animated.Value(1)
  ).current;

  const launchScale = useRef(
    new Animated.Value(0.65)
  ).current;

  const launchTextOpacity = useRef(
    new Animated.Value(0)
  ).current;


  const dot1 = useRef(new Animated.Value(0.35)).current;
  const dot2 = useRef(new Animated.Value(0.35)).current;
  const dot3 = useRef(new Animated.Value(0.35)).current;

  // ------------------------------------------------------
  // Heartbeat / pulse-rate animation (CTA heart + live tag dot)
  // ------------------------------------------------------
  const heartScale = useRef(new Animated.Value(1)).current;
  const pulseRing = useRef(new Animated.Value(0)).current;
  const tagPulse = useRef(new Animated.Value(1)).current;
  const tagPulseOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let running = true;

    const beat = () => {
      if (!running) return;
      Animated.sequence([
        // "lub"
        Animated.timing(heartScale, {
          toValue: 1.22,
          duration: 130,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 130,
          easing: Easing.in(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
        // "dub"
        Animated.timing(heartScale, {
          toValue: 1.14,
          duration: 110,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 160,
          easing: Easing.in(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.delay(650),
      ]).start(({ finished }) => {
        if (finished && running) beat();
      });
    };

    const ring = () => {
      if (!running) return;
      pulseRing.setValue(0);
      Animated.timing(pulseRing, {
        toValue: 1,
        duration: 1300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }).start(({ finished }) => {
        if (finished && running) {
          setTimeout(ring, 350);
        }
      });
    };

    const livePulse = () => {
      if (!running) return;
      Animated.sequence([
        Animated.parallel([
          Animated.timing(tagPulse, {
            toValue: 1.5,
            duration: 550,
            easing: Easing.out(Easing.ease),
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.timing(tagPulseOpacity, {
            toValue: 0,
            duration: 550,
            easing: Easing.out(Easing.ease),
            useNativeDriver: Platform.OS !== "web",
          }),
        ]),
        Animated.timing(tagPulse, {
          toValue: 1,
          duration: 0,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(tagPulseOpacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.delay(500),
      ]).start(({ finished }) => {
        if (finished && running) livePulse();
      });
    };

    beat();
    ring();
    livePulse();

    return () => {
      running = false;
      heartScale.stopAnimation();
      pulseRing.stopAnimation();
      tagPulse.stopAnimation();
      tagPulseOpacity.stopAnimation();
    };
  }, [heartScale, pulseRing, tagPulse, tagPulseOpacity]);

  useEffect(() => {
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    let dotsRunning = true;

    const makeDotLoop = (
      value: Animated.Value,
      delay: number
    ) => {
      const loop = () => {
        if (!dotsRunning) return;

        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 350,
            easing: Easing.out(Easing.ease),
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.timing(value, {
            toValue: 0.35,
            duration: 350,
            easing: Easing.in(Easing.ease),
            useNativeDriver: Platform.OS !== "web",
          }),
        ]).start(({ finished }) => {
          if (finished && dotsRunning) {
            loop();
          }
        });
      };

      loop();
    };

    makeDotLoop(dot1, 0);
    makeDotLoop(dot2, 160);
    makeDotLoop(dot3, 320);

    Animated.parallel([
      Animated.spring(launchScale, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.timing(launchTextOpacity, {
        toValue: 1,
        duration: 700,
        delay: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();

    closeTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(launchOpacity, {
          toValue: 0,
          duration: 650,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(launchScale, {
          toValue: 1.06,
          duration: 650,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setShowLaunch(false);
        }
      });
    }, 20000);

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
      dotsRunning = false;
      dot1.stopAnimation();
      dot2.stopAnimation();
      dot3.stopAnimation();
    };
  }, [
    launchOpacity,
    launchScale,
    launchTextOpacity,
    dot1,
    dot2,
    dot3,
  ]);

  const go = (path: string) => {
    setMenu(false);
    router.push(path as any);
  };

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle={showLaunch ? "dark-content" : "light-content"}
        backgroundColor="transparent"
        translucent
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 50 },
        ]}
      >
        {/* HERO */}
        <LinearGradient
          colors={[DARK, DARK_DEEP]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.glow} />
          <View style={styles.glowSecondary} />

          {/* Floating blood-drop particles */}
          <BloodDrop left="12%" delay={0} size={12} />
          <BloodDrop left="30%" delay={900} size={9} />
          <BloodDrop left="52%" delay={1700} size={14} />
          <BloodDrop left="74%" delay={500} size={10} />
          <BloodDrop left="88%" delay={1300} size={11} />

          <View style={[styles.top, { paddingTop: insets.top + 4 }]}>
            <TouchableOpacity
              style={styles.menuBtn}
              activeOpacity={0.8}
              onPress={openMenu}
            >
              <Menu size={22} color={RED} />
            </TouchableOpacity>

            <View style={styles.brand}>
              <Image
                source={ICON}
                style={styles.logo}
                resizeMode="contain"
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.brandTitle}>BLOOD CONNECT 2.O</Text>
                <Text style={styles.brandSub}>COMMUNITY NETWORK</Text>
              </View>
            </View>
          </View>

          <View style={styles.tag}>
            <View style={styles.dotWrap}>
              <Animated.View
                style={[
                  styles.dotPulseRing,
                  {
                    opacity: tagPulseOpacity,
                    transform: [{ scale: tagPulse }],
                  },
                ]}
              />
              <View style={styles.dot} />
            </View>
            <Text style={styles.tagText}>CONNECT • DONATE • SAVE</Text>
          </View>

          <Text style={styles.heroTitle}>
            Every Drop{"\n"}
            <Text style={styles.heroHighlight}>Can Save a Life.</Text>
          </Text>

          <Text style={styles.heroText}>
            Connecting blood donors with people in need across India.
            Together, we can make every second count.
          </Text>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push("/register")}
          >
            <LinearGradient
              colors={[RED, RED_DARK]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primary}
            >
              <View style={styles.btnIcon}>
                <Droplets size={22} color={RED} />
              </View>

              <Text style={styles.primaryText}>Register as Donor</Text>
              <ArrowRight size={22} color={WHITE} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondary}
            activeOpacity={0.85}
            onPress={() => router.push("/find-donors")}
          >
            <View style={styles.secondaryIcon}>
              <Heart size={19} color={WHITE} />
            </View>

            <Text style={styles.secondaryText}>Find Donors</Text>

            <ArrowRight size={20} color={WHITE} />
          </TouchableOpacity>

          <View style={styles.trust}>
            <View style={styles.trustIcon}>
              <CheckCircle2 size={15} color="#45C76A" />
            </View>
            <Text style={styles.trustText}>
              Built to make donor discovery faster and simpler
            </Text>
          </View>
        </LinearGradient>

        {/* STATS - ONE COMBINED CARD */}
        <View>
          <View style={styles.stats}>
            <Stat
              icon={<Users size={21} color={RED} />}
              n="0+"
              t="Registered Donors"
            />

            <View style={styles.statDivider} />

            <Stat
              icon={<MapPin size={21} color={RED} />}
              n="0"
              t="Districts Covered"
            />

            <View style={styles.statDivider} />

            <Stat
              icon={<Activity size={21} color={RED} />}
              n="0"
              t="States & UTs"
            />
          </View>
        </View>

        {/* HOW IT WORKS */}
        <View>
          <View style={styles.section}>
            <Text style={styles.eyebrow}>HOW IT WORKS</Text>

            <Text style={styles.sectionTitle}>
              One Platform.{"\n"}
              <Text style={{ color: RED }}>Many Ways to Help.</Text>
            </Text>

            <Text style={styles.desc}>
              Blood Connect makes it simple to donate blood, find donors and
              support people during emergencies.
            </Text>

            <View style={styles.grid}>
              <Card
                icon={<Droplets size={27} color={RED} />}
                title="Register as Donor"
                text="Join India's growing community of voluntary blood donors and help save lives."
                onPress={() => router.push("/register")}
              />

              <Card
                icon={<Heart size={27} color={RED} />}
                title="Find Donors"
                text="Find blood donors by blood group, state and district when you need help."
                onPress={() => router.push("/find-donors")}
              />

              <Card
                icon={<Sparkles size={27} color={RED} />}
                title="Donation Benefits"
                text="Learn about blood donation and its positive impact on the community."
                onPress={() => router.push("/benefits")}
              />
            </View>
          </View>
        </View>

        {/* WHY BLOOD CONNECT */}
        <View>
          <View style={styles.sectionCompact}>
            <Text style={styles.eyebrow}>WHY BLOOD CONNECT?</Text>

            <View style={styles.infoCard}>
              <InfoRow
                icon={<Zap size={21} color={RED} />}
                title="Fast Connection"
                text="Quickly connect people who need blood with suitable donors."
              />

              <View style={styles.divider} />

              <InfoRow
                icon={<Search size={21} color={RED} />}
                title="Easy Search"
                text="Search donors using blood group, state and district."
              />

              <View style={styles.divider} />

              <InfoRow
                icon={<Heart size={21} color={RED} />}
                title="Help Save Lives"
                text="Every donation can make a meaningful difference to someone in need."
              />
            </View>
          </View>
        </View>

        {/* DONOR CTA */}
        <View>
          <LinearGradient
            colors={[RED, RED_DEEP]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cta}
          >
            <View style={styles.ctaGlow} />

            <View style={styles.ctaIconWrap}>
              <Animated.View
                style={[
                  styles.ctaPulseRing,
                  {
                    opacity: pulseRing.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.55, 0],
                    }),
                    transform: [
                      {
                        scale: pulseRing.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.9],
                        }),
                      },
                    ],
                  },
                ]}
              />

              <View style={styles.ctaIconRing}>
                <Animated.View style={{ transform: [{ scale: heartScale }] }}>
                  <Heart size={26} color={WHITE} fill={WHITE} />
                </Animated.View>
              </View>
            </View>

            <Text style={styles.ctaSmall}>MAKE A DIFFERENCE</Text>

            <Text style={styles.ctaTitle}>Every Drop Matters.</Text>

            <Text style={styles.ctaText}>
              Your small act of kindness can help someone when they need it most.
            </Text>

            <TouchableOpacity
              style={styles.ctaBtn}
              activeOpacity={0.85}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.ctaBtnText}>Become a Donor</Text>
              <ArrowRight size={18} color={RED} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* FOOTER */}
        <View>
          <View style={styles.footer}>
            <View style={styles.footerDivider} />

            <Image
              source={ICON}
              style={styles.footerIcon}
              resizeMode="contain"
            />

            <Text style={styles.footerBrand}>BLOOD CONNECT 2.O</Text>

            <Text style={styles.footerText}>
              Created by G.R.KARTHIKEYAN
            </Text>

            <Text style={styles.footerSub}>
              Technology for Humanity ❤️
            </Text>

            <Text style={styles.footerCopyright}>
              © 2026 Blood Connect 2.0
            </Text>
          </View>
        </View>
      </Animated.ScrollView>

      {/* PREMIUM SIDE MENU */}
      <Modal
        visible={menu}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.menuOverlay}>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.menuBackdrop,
              { opacity: menuOverlayOpacity },
            ]}
          />

          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={closeMenu}
          />

          <Animated.View
            style={[
              styles.menuPanel,
              {
                paddingTop: insets.top + 10,
                transform: [{ translateX: menuX }],
              },
            ]}
          >
            {/* MENU HEADER */}
            <LinearGradient
              colors={[DARK_DEEP, DARK, RED_DEEP]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuHeader}
            >
              <View style={styles.menuHeaderTop}>
                <View style={styles.menuLogoRing}>
                  <Image
                    source={ICON}
                    style={styles.menuLogo}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.menuBrandText}>
                  <Text style={styles.menuName}>
                    BLOOD CONNECT 2.O
                  </Text>
                  <Text style={styles.menuSub}>
                    BLOOD COMMUNITY NETWORK
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.menuClose}
                  activeOpacity={0.8}
                  onPress={closeMenu}
                >
                  <X size={20} color={WHITE} />
                </TouchableOpacity>
              </View>

              <View style={styles.menuWelcome}>
                <View style={styles.menuLiveDot} />
                <Text style={styles.menuWelcomeText}>
                  CONNECT • DONATE • SAVE
                </Text>
              </View>
            </LinearGradient>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.menuScroll}
            >
              {/* MAIN */}
              <Text style={styles.menuSectionTitle}>MAIN MENU</Text>

              <MenuItem
                icon={<Home size={21} color={WHITE} />}
                title="Home"
                subtitle="Blood Connect home"
                active
                onPress={closeMenu}
              />

              <MenuItem
                icon={<Droplets size={21} color={RED} />}
                title="Register as Donor"
                subtitle="Become a life saver"
                onPress={() => go("/register")}
              />

              <MenuItem
                icon={<Heart size={21} color={RED} />}
                title="Find Blood Donors"
                subtitle="Search donors quickly"
                onPress={() => go("/find-donors")}
              />

              <MenuItem
                icon={<Sparkles size={21} color={RED} />}
                title="Donation Benefits"
                subtitle="Learn about donation"
                onPress={() => go("/benefits")}
              />

              <MenuItem
                icon={<ShieldCheck size={21} color={RED} />}
                title="Admin Panel"
                subtitle="Platform management"
                onPress={() => go("/admin")}
              />

              <MenuItem
                icon={<Info size={21} color={RED} />}
                title="About Blood Connect"
                subtitle="About this platform"
                onPress={() => go("/about")}
              />

              {/* SUPPORT */}
              <Text style={[styles.menuSectionTitle, { marginTop: 18 }]}>
                SUPPORT
              </Text>

              <Pressable
                style={({ pressed, hovered }) => [
                  styles.supportMenuCard,
                  hovered && styles.supportMenuHover,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={closeMenu}
              >
                <View style={styles.supportIcon}>
                  <HandHeart size={22} color={RED} />
                </View>

                <View style={styles.supportText}>
                  <Text style={styles.supportTitle}>
                    Support This Platform
                  </Text>
                  <Text style={styles.supportSubtitle}>
                    Help us grow the community
                  </Text>
                </View>

                <ArrowRight size={19} color={RED} />
              </Pressable>

              {/* FOOTER */}
              <View style={styles.menuFooter}>
                <View style={styles.menuFooterLine} />

                <Text style={styles.menuFooterBrand}>
                  BLOOD COMMUNITY NETWORK
                </Text>

                <Text style={styles.menuFooterText}>
                  Every Drop Counts ❤️
                </Text>

                <Text style={styles.menuFooterVersion}>
                  BLOOD CONNECT 2.O • 2026
                </Text>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* ONE-TIME PREMIUM LAUNCH SCREEN */}
      {showLaunch && (
        <Animated.View
          style={[
            styles.launchScreen,
            {
              opacity: launchOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(60,7,19,0.28)", "rgba(122,14,31,0.18)", "rgba(60,7,19,0.28)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.launchGradient}
          >
            <VideoView
              player={launchPlayer}
              style={styles.launchBackground}
              contentFit="cover"
              nativeControls={false}
            />

            <View style={styles.launchOverlay} />
            <View style={styles.launchGlowOne} />
            <View style={styles.launchGlowTwo} />

            <Animated.View
              style={[
                styles.launchContent,
                {
                  transform: [{ scale: launchScale }],
                },
              ]}
            >
              <View style={styles.launchLogoRing}>
                <Image
                  source={ICON}
                  style={styles.launchLogo}
                  resizeMode="contain"
                />
              </View>

              <Animated.View
                style={[
                  styles.launchTextWrap,
                  {
                    opacity: launchTextOpacity,
                  },
                ]}
              >
                <Text style={styles.launchTitle}>BLOOD CONNECT 2.O</Text>

                <Text style={styles.launchSubtitle}>
                  Connecting donors. Saving lives.
                </Text>

                <View style={styles.launchStatus}>
                  <View style={styles.launchStatusDot} />
                  <Text style={styles.launchStatusText}>COMMUNITY NETWORK</Text>
                </View>

                <View style={styles.launchDots}>
                  <Animated.View
                    style={[
                      styles.launchDot,
                      {
                        opacity: dot1,
                        transform: [
                          {
                            translateY: dot1.interpolate({
                              inputRange: [0.35, 1],
                              outputRange: [0, -5],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.launchDot,
                      {
                        opacity: dot2,
                        transform: [
                          {
                            translateY: dot2.interpolate({
                              inputRange: [0.35, 1],
                              outputRange: [0, -5],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.launchDot,
                      {
                        opacity: dot3,
                        transform: [
                          {
                            translateY: dot3.interpolate({
                              inputRange: [0.35, 1],
                              outputRange: [0, -5],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                </View>

                <Text style={styles.launchLoadingText}>Loading...</Text>
              </Animated.View>
            </Animated.View>

            <Text style={styles.launchFooter}>EVERY DROP COUNTS ❤️</Text>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
}

// ------------------------------------------------------
// COMPONENTS
// ------------------------------------------------------

/**
 * A single blood drop that continuously falls and fades within the hero,
 * looping forever with a per-instance delay so they don't fall in sync.
 */
function BloodDrop({
  left,
  delay,
  size = 10,
}: {
  left: string;
  delay: number;
  size?: number;
}) {
  const fall = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let running = true;

    const loop = () => {
      if (!running) return;
      fall.setValue(0);
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(fall, {
          toValue: 1,
          duration: 2600,
          easing: Easing.in(Easing.quad),
          useNativeDriver: Platform.OS !== "web",
        }),
      ]).start(({ finished }) => {
        if (finished && running) loop();
      });
    };

    loop();

    return () => {
      running = false;
      fall.stopAnimation();
    };
  }, [fall, delay]);

  const translateY = fall.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 210],
  });

  const opacity = fall.interpolate({
    inputRange: [0, 0.12, 0.8, 1],
    outputRange: [0, 0.85, 0.85, 0],
  });

  const scale = fall.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.1],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.bloodDrop,
        {
          left,
          width: size,
          height: size * 1.3,
          borderRadius: size,
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    />
  );
}

function Stat({
  icon,
  n,
  t,
}: {
  icon: React.ReactNode;
  n: string;
  t: string;
}) {
  return (
    <View style={styles.stat}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statN}>{n}</Text>
      <Text style={styles.statT}>{t}</Text>
    </View>
  );
}

function Card({
  icon,
  title,
  text,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.card,
        hovered && styles.cardHover,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardIcon}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.explore}>Explore</Text>
        <View style={styles.cardArrow}>
          <ArrowRight size={14} color={RED} />
        </View>
      </View>
    </Pressable>
  );
}

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{icon}</View>
      <View style={styles.infoText}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoDescription}>{text}</Text>
      </View>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  active,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed, hovered }) => [
        active ? styles.menuActiveItem : styles.menuItem,
        !active && hovered && styles.menuItemHover,
        pressed && styles.menuItemPressed,
      ]}
    >
      <View style={active ? styles.menuItemIconActive : styles.menuItemIcon}>
        {icon}
      </View>

      <View style={styles.menuItemText}>
        <Text style={active ? styles.menuActiveTitle : styles.menuItemTitle}>
          {title}
        </Text>
        <Text
          style={
            active ? styles.menuActiveSubtitle : styles.menuItemSubtitle
          }
        >
          {subtitle}
        </Text>
      </View>

      {active ? (
        <View style={styles.activePill}>
          <Text style={styles.activePillText}>HOME</Text>
        </View>
      ) : (
        <View style={styles.menuArrow}>
          <ArrowRight size={16} color="#A5A6AD" />
        </View>
      )}
    </Pressable>
  );
}

// ------------------------------------------------------
// STYLES
// ------------------------------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  scroll: {
    paddingTop: 0,
    paddingBottom: 50,
    flexGrow: 1,
  },

  // HERO
  hero: {
    minHeight: 650,
    backgroundColor: DARK,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 75,
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 165,
    right: -120,
    top: 20,
    backgroundColor: "rgba(255,255,255,.06)",
  },

  glowSecondary: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    left: -90,
    bottom: -60,
    backgroundColor: "rgba(255,100,121,.10)",
  },

  // Falling blood-drop particle
  bloodDrop: {
    position: "absolute",
    top: 90,
    backgroundColor: "#FF6479",
    borderTopLeftRadius: 0,
    transform: [{ rotate: "45deg" }],
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },

  brand: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 13,
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    marginRight: 10,
  },

  brandTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "900",
  },

  brandSub: {
    color: "rgba(255,255,255,.65)",
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 2,
  },

  tag: {
    alignSelf: "flex-start",
    marginTop: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.18)",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  dotWrap: {
    width: 8,
    height: 8,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  dotPulseRing: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6479",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6479",
  },

  tagText: {
    color: "rgba(255,255,255,.8)",
    fontSize: 10,
    fontWeight: "800",
  },

  heroTitle: {
    color: WHITE,
    fontSize: width < 380 ? 38 : 42,
    lineHeight: width < 380 ? 43 : 47,
    fontWeight: "900",
    marginTop: 32,
  },

  heroHighlight: {
    color: "#FF6479",
  },

  heroText: {
    color: "rgba(255,255,255,.78)",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 20,
    maxWidth: 600,
  },

  primary: {
    minHeight: 62,
    borderRadius: 17,
    marginTop: 28,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#E31B36",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  btnIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  primaryText: {
    flex: 1,
    color: WHITE,
    fontWeight: "900",
    fontSize: 15,
  },

  secondary: {
    minHeight: 60,
    borderRadius: 17,
    marginTop: 12,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.18)",
    flexDirection: "row",
    alignItems: "center",
  },

  secondaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    flex: 1,
    color: WHITE,
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 12,
  },

  trust: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 23,
  },

  trustIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(69,199,106,.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  trustText: {
    color: "rgba(255,255,255,.65)",
    fontSize: 11,
    marginLeft: 10,
    flex: 1,
  },

  // STATS
  // One combined card containing all three statistics.
  stats: {
    width: "92%",
    alignSelf: "center",
    marginTop: -35,
    minHeight: 115,
    paddingHorizontal: 6,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7E7E9",

    // 3D / floating card effect
    elevation: 9,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 7,
    },

    overflow: "hidden",
  },

  stat: {
    flex: 1,
    minHeight: 101,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE,
    position: "relative",
  },

  statIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },

  statN: {
    color: RED_DARK,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 1,
  },

  statT: {
    color: "#555762",
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 1,
  },

  statDivider: {
    width: 1,
    height: 58,
    alignSelf: "center",
    backgroundColor: "#E5E5E7",
  },

  // SECTIONS
  section: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  sectionCompact: {
    paddingHorizontal: 20,
    paddingTop: 38,
  },

  eyebrow: {
    color: RED,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  sectionTitle: {
    color: BLACK,
    fontSize: width < 380 ? 27 : 30,
    lineHeight: width < 380 ? 31 : 34,
    fontWeight: "900",
    marginTop: 8,
  },

  desc: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },

  // QUICK ACTIONS
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 27,
  },

  quickCard: {
    width: (width - 55) / 2,
    minHeight: 155,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#E6E6E7",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  quickIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  quickTitle: {
    color: BLACK,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 12,
  },

  quickText: {
    color: MUTED,
    fontSize: 10.5,
    lineHeight: 16,
    marginTop: 5,
    paddingRight: 4,
  },

  quickArrow: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },

  emergencyCard: {
    width: "92%",
    alignSelf: "center",
    marginTop: 30,
    minHeight: 82,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#FFD1D7",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  emergencyIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  emergencyContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  emergencyTitle: {
    color: BLACK,
    fontSize: 14,
    fontWeight: "900",
  },

  emergencyText: {
    color: MUTED,
    fontSize: 10.5,
    lineHeight: 16,
    marginTop: 4,
  },

  // HOW IT WORKS CARDS
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 27,
  },

  card: {
    width: width > 650 ? (width - 70) / 3 : (width - 55) / 2,
    minWidth: 150,
    minHeight: 205,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: BORDER,
    elevation: 3,
    shadowColor: "#E31B36",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  cardHover: {
    transform: [{ translateY: -4 }, { scale: 1.015 }],
    borderColor: "#FFD1D7",
    shadowColor: RED,
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },

  cardPressed: {
    transform: [{ translateY: -1 }, { scale: 0.985 }],
    opacity: 0.94,
  },

  cardIcon: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    color: BLACK,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 17,
  },

  cardText: {
    color: MUTED,
    fontSize: 10.5,
    lineHeight: 17,
    marginTop: 7,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  explore: {
    color: RED,
    fontSize: 11,
    fontWeight: "800",
    flex: 1,
  },

  cardArrow: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  // INFO
  infoCard: {
    marginTop: 15,
    borderRadius: 20,
    padding: 17,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#E6E6E7",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoIcon: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },

  infoText: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: BLACK,
  },

  infoDescription: {
    fontSize: 11,
    lineHeight: 17,
    color: MUTED,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#E7E7E8",
    marginVertical: 15,
  },

  // CTA
  cta: {
    width: "92%",
    alignSelf: "center",
    marginTop: 45,
    borderRadius: 27,
    padding: 28,
    alignItems: "center",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#7A0E1F",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  ctaGlow: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    right: -80,
    top: -100,
    backgroundColor: "rgba(255,255,255,.07)",
  },

  ctaIconWrap: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  ctaPulseRing: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: WHITE,
  },

  ctaIconRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.22)",
  },

  ctaSmall: {
    color: "rgba(255,255,255,.7)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginTop: 14,
  },

  ctaTitle: {
    color: WHITE,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 6,
    textAlign: "center",
  },

  ctaText: {
    color: "rgba(255,255,255,.78)",
    fontSize: 11.5,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 300,
  },

  ctaBtn: {
    minHeight: 47,
    borderRadius: 13,
    backgroundColor: WHITE,
    paddingHorizontal: 17,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  ctaBtnText: {
    color: RED,
    fontWeight: "900",
  },

  // FOOTER
  footer: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 15,
  },

  footerDivider: {
    width: "88%",
    height: 1,
    backgroundColor: "#E7E7E8",
    marginBottom: 26,
  },

  footerIcon: {
    width: 50,
    height: 50,
  },

  footerBrand: {
    color: BLACK,
    fontSize: 11,
    fontWeight: "900",
    marginTop: 7,
  },

  footerText: {
    color: MUTED,
    fontSize: 9,
    marginTop: 4,
  },

  footerSub: {
    color: MUTED,
    fontSize: 9,
    marginTop: 5,
  },

  footerCopyright: {
    color: "#999",
    fontSize: 9,
    marginTop: 10,
  },

  // PREMIUM SIDE MENU
  menuOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },

  menuBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(9, 5, 8, 0.58)",
  },

  menuPanel: {
    width: MENU_WIDTH,
    height: "100%",
    backgroundColor: "#FAFAFB",
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    elevation: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 22,
    shadowOffset: {
      width: 8,
      height: 0,
    },
  },

  menuHeader: {
    minHeight: 180,
    paddingHorizontal: 18,
    paddingBottom: 18,
    justifyContent: "flex-end",
  },

  menuHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuLogoRing: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.20)",
    alignItems: "center",
    justifyContent: "center",
  },

  menuLogo: {
    width: 44,
    height: 44,
    borderRadius: 13,
  },

  menuBrandText: {
    flex: 1,
    marginLeft: 12,
  },

  menuName: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  menuSub: {
    color: "rgba(255,255,255,.60)",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1.1,
    marginTop: 4,
  },

  menuClose: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  menuWelcome: {
    alignSelf: "flex-start",
    height: 30,
    paddingHorizontal: 11,
    borderRadius: 15,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.15)",
    backgroundColor: "rgba(255,255,255,.07)",
  },

  menuLiveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#45C76A",
    marginRight: 7,
  },

  menuWelcomeText: {
    color: "rgba(255,255,255,.76)",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },

  menuScroll: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 24,
  },

  menuSectionTitle: {
    color: "#96979E",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginLeft: 5,
    marginBottom: 9,
  },

  menuItem: {
    minHeight: 67,
    borderRadius: 17,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#ECECEF",
    paddingHorizontal: 11,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  menuItemHover: {
    backgroundColor: "#FFF1F3",
    borderColor: "#FFC8CF",
    transform: [{ translateX: 4 }],
    shadowColor: RED,
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  menuItemPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  menuActiveItem: {
    minHeight: 67,
    borderRadius: 17,
    backgroundColor: RED,
    paddingHorizontal: 11,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: RED,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  menuItemIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  menuItemIconActive: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  menuItemText: {
    flex: 1,
    marginLeft: 12,
  },

  menuItemTitle: {
    color: BLACK,
    fontSize: 13.5,
    fontWeight: "900",
  },

  menuItemSubtitle: {
    color: "#888A92",
    fontSize: 9.5,
    marginTop: 3,
  },

  menuActiveTitle: {
    color: WHITE,
    fontSize: 13.5,
    fontWeight: "900",
  },

  menuActiveSubtitle: {
    color: "rgba(255,255,255,.70)",
    fontSize: 9.5,
    marginTop: 3,
  },

  menuArrow: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#F5F5F6",
    alignItems: "center",
    justifyContent: "center",
  },

  activePill: {
    height: 25,
    paddingHorizontal: 9,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  activePillText: {
    color: WHITE,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  supportMenuCard: {
    minHeight: 72,
    borderRadius: 18,
    paddingHorizontal: 12,
    backgroundColor: "#FFF4F5",
    borderWidth: 1,
    borderColor: "#FFD6DC",
    flexDirection: "row",
    alignItems: "center",
  },

  supportMenuHover: {
    backgroundColor: "#FFECEF",
    borderColor: "#FFB8C2",
    transform: [{ translateX: 4 }],
  },

  supportIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },

  supportText: {
    flex: 1,
    marginLeft: 12,
  },

  supportTitle: {
    color: RED_DARK,
    fontSize: 13,
    fontWeight: "900",
  },

  supportSubtitle: {
    color: "#9A6B71",
    fontSize: 9.5,
    marginTop: 3,
  },

  menuFooter: {
    alignItems: "center",
    paddingTop: 26,
  },

  menuFooterLine: {
    width: "88%",
    height: 1,
    backgroundColor: "#E5E5E7",
    marginBottom: 20,
  },

  menuFooterBrand: {
    color: BLACK,
    fontSize: 9.5,
    fontWeight: "900",
    letterSpacing: 1.1,
  },

  menuFooterText: {
    color: MUTED,
    fontSize: 9,
    marginTop: 5,
  },

  menuFooterVersion: {
    color: "#B0B1B7",
    fontSize: 8,
    fontWeight: "700",
    marginTop: 8,
    letterSpacing: 0.5,
  },

  // PREMIUM LAUNCH SCREEN
  launchScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    elevation: 999999,
    backgroundColor: DARK_DEEP,
    overflow: "hidden",
  },

  launchBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  launchOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(45, 4, 12, 0.16)",
  },

  launchGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  launchGlowOne: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "rgba(255,255,255,0.035)",
    top: -125,
    right: -115,
  },

  launchGlowTwo: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,100,121,0.12)",
    bottom: -120,
    left: -110,
  },

  launchContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  launchLogoRing: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.055)",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 12,
  },


  launchLogo: {
    width: 132,
    height: 132,
    alignSelf: "center",
  },

  launchTextWrap: {
    alignItems: "center",
    marginTop: 28,
  },

  launchTitle: {
    fontSize: width < 380 ? 23 : 27,
    fontWeight: "900",
    color: WHITE,
    letterSpacing: 0.8,
    textAlign: "center",
  },

  launchSubtitle: {
    marginTop: 9,
    fontSize: 13,
    color: "rgba(255,255,255,0.72)",
    fontWeight: "600",
    textAlign: "center",
  },

  launchStatus: {
    marginTop: 20,
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.055)",
    flexDirection: "row",
    alignItems: "center",
  },

  launchStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FF6479",
    marginRight: 7,
  },

  launchStatusText: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  launchDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 18,
    marginTop: 16,
    gap: 6,
  },

  launchDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FF6479",
  },

  launchLoadingText: {
    marginTop: 3,
    color: "rgba(255,255,255,0.48)",
    fontSize: 9,
    fontWeight: "600",
  },

  launchFooter: {
    position: "absolute",
    bottom: 28,
    color: "rgba(255,255,255,0.48)",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
});
