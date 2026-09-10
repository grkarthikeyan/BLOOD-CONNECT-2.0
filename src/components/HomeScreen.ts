import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Heart,
  Droplets,
  UsersRound,
  MapPin,
  Activity,
  Sparkles,
  ShieldCheck,
  Settings,
  CheckCircle2,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  red: "#D91E36",
  darkRed: "#4D0815",
  white: "#FFFFFF",
  black: "#17181C",
  muted: "#777A82",
  softRed: "#FFF0F2",
  border: "#E6E7EA",
  heroText: "#E8C9CF",
};

export default function HomeScreen() {
  const router = useRouter();

  const openRegister = () => {
    router.push("/register");
  };

  const openFindDonors = () => {
    router.push("/find-donors");
  };

  const showSettings = () => {
    Alert.alert("Settings", "Settings page will be available soon.");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.darkRed}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HERO ================= */}

        <LinearGradient
          colors={["#26050C", "#7B1027", "#30060E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          {/* Header */}

          <View style={styles.header}>
            <View style={styles.brandContainer}>
              <View style={styles.logoBox}>
                <Droplets
                  size={28}
                  color={COLORS.white}
                  fill={COLORS.red}
                  strokeWidth={2.5}
                />
              </View>

              <View>
                <Text style={styles.brandTitle}>
                  BLOOD CONNECT
                </Text>

                <Text style={styles.brandSubtitle}>
                  COMMUNITY NETWORK
                </Text>
              </View>
            </View>

            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>2.O</Text>
            </View>
          </View>

          {/* Badge */}

          <View style={styles.heroBadge}>
            <View style={styles.heroDot} />

            <Text style={styles.heroBadgeText}>
              CONNECT  •  DONATE  •  SAVE
            </Text>
          </View>

          {/* Hero title */}

          <Text style={styles.heroTitle}>
            Every Drop{"\n"}
            <Text style={styles.heroTitleRed}>
              Can Save a Life.
            </Text>
          </Text>

          <Text style={styles.heroDescription}>
            Connecting blood donors with people in need across
            India. Together, we can make every second count.
          </Text>

          {/* Register */}

          <TouchableOpacity
            style={styles.registerButton}
            activeOpacity={0.88}
            onPress={openRegister}
          >
            <View style={styles.registerIcon}>
              <Droplets
                size={24}
                color={COLORS.red}
                fill={COLORS.red}
              />
            </View>

            <Text style={styles.registerButtonText}>
              Register as Donor
            </Text>

            <ArrowRight
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>

          {/* Find Donors */}

          <TouchableOpacity
            style={styles.findDonorsButton}
            activeOpacity={0.88}
            onPress={openFindDonors}
          >
            <View style={styles.findDonorsLeft}>
              <Heart
                size={23}
                color={COLORS.white}
                strokeWidth={2}
              />

              <Text style={styles.findDonorsText}>
                Find Donors
              </Text>
            </View>

            <ArrowRight
              size={21}
              color={COLORS.white}
            />
          </TouchableOpacity>

          {/* Trust line */}

          <View style={styles.trustLine}>
            <CheckCircle2
              size={16}
              color="#F7B6C0"
            />

            <Text style={styles.trustText}>
              Built to make donor discovery faster and simpler
            </Text>
          </View>
        </LinearGradient>

        {/* ================= SETTINGS ================= */}

        <TouchableOpacity
          style={styles.settingsButton}
          activeOpacity={0.85}
          onPress={showSettings}
        >
          <Settings
            size={25}
            color={COLORS.white}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        {/* ================= STATS ================= */}

        <View style={styles.statsCard}>
          <StatItem
            icon={
              <UsersRound
                size={23}
                color={COLORS.red}
              />
            }
            value="0+"
            label="Registered Donors"
          />

          <View style={styles.statDivider} />

          <StatItem
            icon={
              <MapPin
                size={23}
                color={COLORS.red}
              />
            }
            value="0"
            label="Districts Covered"
          />

          <View style={styles.statDivider} />

          <StatItem
            icon={
              <Activity
                size={23}
                color={COLORS.red}
              />
            }
            value="0"
            label="States & UTs"
          />
        </View>

        {/* ================= HOW IT WORKS ================= */}

        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>
            HOW IT WORKS
          </Text>

          <Text style={styles.sectionTitle}>
            One Platform.
          </Text>

          <Text style={styles.sectionTitleRed}>
            Many Ways to Help.
          </Text>

          <Text style={styles.sectionDescription}>
            Blood Connect makes it simple to donate blood, find
            donors and support people during emergencies.
          </Text>
        </View>

        {/* ================= FEATURE CARDS ================= */}

        <View style={styles.featureGrid}>
          <FeatureCard
            title="Register as Donor"
            description="Join India's growing community of voluntary blood donors and help save lives."
            icon={
              <Droplets
                size={23}
                color={COLORS.red}
              />
            }
            onPress={openRegister}
          />

          <FeatureCard
            title="Find Donors"
            description="Find blood donors by blood group, state and district when you need help."
            icon={
              <Heart
                size={23}
                color={COLORS.red}
              />
            }
            onPress={openFindDonors}
          />

          <FeatureCard
            title="Donation Benefits"
            description="Learn about blood donation and its positive impact on the community."
            icon={
              <Sparkles
                size={23}
                color={COLORS.red}
              />
            }
            onPress={() =>
              Alert.alert(
                "Donation Benefits",
                "Donation benefits information will be available soon."
              )
            }
          />

          <FeatureCard
            title="Admin Panel"
            description="Manage donors and monitor the Blood Connect network securely."
            icon={
              <ShieldCheck
                size={23}
                color={COLORS.red}
              />
            }
            onPress={() =>
              Alert.alert(
                "Admin Panel",
                "Admin panel will be available soon."
              )
            }
          />
        </View>

        {/* ================= MAKE A DIFFERENCE ================= */}

        <LinearGradient
          colors={[COLORS.red, "#EA334A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.differenceCard}
        >
          <View style={styles.differenceCircle} />

          <View style={styles.differenceIcon}>
            <Heart
              size={29}
              color={COLORS.white}
              fill={COLORS.white}
            />
          </View>

          <Text style={styles.differenceEyebrow}>
            MAKE A DIFFERENCE
          </Text>

          <Text style={styles.differenceTitle}>
            Your One Drop{"\n"}
            Can Help Someone.
          </Text>

          <Text style={styles.differenceText}>
            Become a donor today and be there when someone
            needs you most.
          </Text>

          <TouchableOpacity
            style={styles.differenceButton}
            activeOpacity={0.86}
            onPress={openRegister}
          >
            <Text style={styles.differenceButtonText}>
              Become a Donor
            </Text>

            <ArrowRight
              size={19}
              color={COLORS.red}
            />
          </TouchableOpacity>
        </LinearGradient>

        {/* ================= FOOTER ================= */}

        <View style={styles.footer}>
          <View style={styles.footerBrandRow}>
            <View style={styles.footerLogo}>
              <Droplets
                size={17}
                color={COLORS.white}
                fill={COLORS.red}
              />
            </View>

            <Text style={styles.footerBrand}>
              BLOOD CONNECT 2.O
            </Text>
          </View>

          <Text style={styles.footerMessage}>
            Every drop counts. Every donor matters. ❤️
          </Text>

          <Text style={styles.createdBy}>
            Created by{" "}
            <Text style={styles.creatorName}>
              G.R.KARTHIKEYAN
            </Text>
          </Text>

          <Text style={styles.copyright}>
            © 2026 Blood Connect 2.O
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

/* ================= STAT ITEM ================= */

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statItem}>
      <View style={styles.statIcon}>
        {icon}
      </View>

      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

/* ================= FEATURE CARD ================= */

function FeatureCard({
  title,
  description,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.featureCard}
      activeOpacity={0.88}
      onPress={onPress}
    >
      <View style={styles.featureTop}>
        <View style={styles.featureIcon}>
          {icon}
        </View>
      </View>

      <Text style={styles.featureTitle}>
        {title}
      </Text>

      <Text style={styles.featureDescription}>
        {description}
      </Text>

      <View style={styles.exploreRow}>
        <Text style={styles.exploreText}>
          Explore
        </Text>

        <ArrowRight
          size={15}
          color={COLORS.red}
        />
      </View>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F9",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* Hero */

  hero: {
    minHeight: 790,
    paddingTop: 48,
    paddingHorizontal: 27,
    paddingBottom: 125,
    overflow: "hidden",
  },

  heroCircleOne: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    right: -115,
    top: 62,
    backgroundColor: "rgba(255,255,255,0.055)",
  },

  heroCircleTwo: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    left: -135,
    bottom: 20,
    backgroundColor: "rgba(255,255,255,0.045)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 39,
  },

  brandContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  logoBox: {
    width: 63,
    height: 63,
    borderRadius: 19,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  brandTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },

  brandSubtitle: {
    color: "#DFAEB7",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginTop: 3,
  },

  versionBadge: {
    width: 52,
    height: 40,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  versionText: {
    color: "#F6DDE1",
    fontSize: 13,
    fontWeight: "800",
  },

  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    marginBottom: 31,
  },

  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6D7E",
    marginRight: 9,
  },

  heroBadgeText: {
    color: "#F2D4D9",
    fontSize: 9.5,
    fontWeight: "900",
    letterSpacing: 0.9,
  },

  heroTitle: {
    color: COLORS.white,
    fontSize: width < 380 ? 42 : 45,
    lineHeight: width < 380 ? 48 : 51,
    fontWeight: "900",
    letterSpacing: -1.5,
    marginBottom: 22,
  },

  heroTitleRed: {
    color: "#FF6175",
  },

  heroDescription: {
    color: COLORS.heroText,
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 380,
    marginBottom: 36,
  },

  registerButton: {
    height: 76,
    borderRadius: 20,
    backgroundColor: "#E21D3A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 15,
    elevation: 8,
  },

  registerIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  registerButtonText: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },

  findDonorsButton: {
    height: 73,
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "rgba(255,255,255,0.22)",
    backgroundColor: "rgba(255,255,255,0.045)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 17,
  },

  findDonorsLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  findDonorsText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 12,
  },

  trustLine: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 27,
    paddingLeft: 2,
  },

  trustText: {
    flex: 1,
    color: "#D4B5BC",
    fontSize: 10.5,
    marginLeft: 8,
  },

  /* Settings */

  settingsButton: {
    position: "absolute",
    top: 350,
    right: 20,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#1685F5",
    borderWidth: 5,
    borderColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 9,
  },

  /* Stats */

  statsCard: {
    marginHorizontal: 20,
    marginTop: -34,
    minHeight: 166,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 21,
    paddingHorizontal: 8,
    elevation: 8,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  statIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.softRed,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  statValue: {
    color: COLORS.black,
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 3,
  },

  statLabel: {
    color: "#85878D",
    fontSize: 9.5,
    textAlign: "center",
  },

  statDivider: {
    width: 1,
    height: 76,
    backgroundColor: "#E5E5E8",
  },

  /* Section */

  section: {
    marginHorizontal: 20,
    marginTop: 61,
    marginBottom: 27,
  },

  sectionEyebrow: {
    color: "#A12A3B",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.8,
    marginBottom: 11,
  },

  sectionTitle: {
    color: COLORS.black,
    fontSize: 31,
    lineHeight: 35,
    fontWeight: "900",
  },

  sectionTitleRed: {
    color: "#C62A40",
    fontSize: 31,
    lineHeight: 35,
    fontWeight: "900",
  },

  sectionDescription: {
    color: COLORS.muted,
    fontSize: 13.5,
    lineHeight: 21,
    marginTop: 17,
  },

  /* Feature cards */

  featureGrid: {
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  featureCard: {
    width: "48.2%",
    minHeight: 278,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 19,
    marginBottom: 18,
    elevation: 3,
  },

  featureTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  featureIcon: {
    width: 61,
    height: 61,
    borderRadius: 18,
    backgroundColor: COLORS.softRed,
    alignItems: "center",
    justifyContent: "center",
  },

  featureTitle: {
    color: COLORS.black,
    fontSize: 13.5,
    fontWeight: "900",
    marginBottom: 11,
  },

  featureDescription: {
    color: COLORS.muted,
    fontSize: 10.8,
    lineHeight: 17,
    minHeight: 66,
  },

  exploreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
  },

  exploreText: {
    color: "#B72B40",
    fontSize: 10.5,
    fontWeight: "900",
    marginRight: 4,
  },

  /* CTA */

  differenceCard: {
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 30,
    minHeight: 390,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    overflow: "hidden",
  },

  differenceCircle: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    right: -90,
    top: -90,
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  differenceIcon: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  differenceEyebrow: {
    color: "#FFDCE1",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 10,
  },

  differenceTitle: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 13,
  },

  differenceText: {
    color: "#FFDDE2",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    maxWidth: 310,
    marginBottom: 25,
  },

  differenceButton: {
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  differenceButtonText: {
    color: COLORS.red,
    fontSize: 12.5,
    fontWeight: "900",
    marginRight: 8,
  },

  /* Footer */

  footer: {
    alignItems: "center",
    paddingTop: 35,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },

  footerBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  footerLogo: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  footerBrand: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "900",
  },

  footerMessage: {
    color: COLORS.muted,
    fontSize: 10.5,
    marginBottom: 12,
    textAlign: "center",
  },

  createdBy: {
    color: "#92949A",
    fontSize: 10,
    marginBottom: 7,
  },

  creatorName: {
    color: COLORS.red,
    fontSize: 10.5,
    fontWeight: "900",
    letterSpacing: 0.3,
  },

  copyright: {
    color: "#A5A6AA",
    fontSize: 9,
  },
});
