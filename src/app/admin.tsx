import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  MapPin,
  Activity,
  UserPlus,
  Search,
  LogOut,
} from "lucide-react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const RED = "#E31B36";
const RED_DARK = "#AE1229";
const RED_DEEP = "#7A0E1F";
const DARK = "#650D1D";
const DARK_DEEP = "#3C0713";
const WHITE = "#FFFFFF";
const BLACK = "#17181C";
const MUTED = "#71737B";
const BG = "#F6F7F8";
const BORDER = "#EDEDEF";
const SOFT = "#FFF0F2";

export default function AdminScreen() {
  return (
    <SafeAreaProvider>
      <AdminContent />
    </SafeAreaProvider>
  );
}

function AdminContent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_DEEP} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 30 },
        ]}
      >
        <LinearGradient
          colors={[DARK_DEEP, DARK, RED_DEEP]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 14 }]}
        >
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.85}
            onPress={() => router.back()}
          >
            <ArrowLeft size={22} color={BLACK} />
          </TouchableOpacity>

          <View style={styles.headerIcon}>
            <ShieldCheck size={30} color={WHITE} />
          </View>

          <Text style={styles.headerTitle}>ADMIN PANEL</Text>
          <Text style={styles.headerSubtitle}>
            BLOOD COMMUNITY NETWORK
          </Text>

          <View style={styles.adminBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.adminBadgeText}>ADMIN ACCESS</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.eyebrow}>DASHBOARD</Text>
          <Text style={styles.title}>Manage Blood Connect</Text>
          <Text style={styles.description}>
            Monitor donors, coverage and platform activity from one place.
          </Text>

          <View style={styles.statsGrid}>
            <StatCard
              icon={<Users size={25} color={RED} />}
              value="0+"
              label="Registered Donors"
            />
            <StatCard
              icon={<MapPin size={25} color={RED} />}
              value="0"
              label="Districts"
            />
            <StatCard
              icon={<Activity size={25} color={RED} />}
              value="0"
              label="States & UTs"
            />
            <StatCard
              icon={<UserPlus size={25} color={RED} />}
              value="0"
              label="New Donors"
            />
          </View>

          <Text style={styles.sectionLabel}>ADMIN TOOLS</Text>

          <AdminAction
            icon={<Users size={23} color={RED} />}
            title="Manage Donors"
            description="View and manage registered donor records."
          />

          <AdminAction
            icon={<Search size={23} color={RED} />}
            title="Search Donors"
            description="Find donor records using blood group and location."
          />

          <AdminAction
            icon={<Activity size={23} color={RED} />}
            title="Platform Statistics"
            description="View donor and location statistics."
          />

          <View style={styles.noteCard}>
            <ShieldCheck size={22} color={RED} />
            <View style={styles.noteText}>
              <Text style={styles.noteTitle}>Admin authentication</Text>
              <Text style={styles.noteDescription}>
                This screen is the admin dashboard UI. Connect your existing
                authentication and database here before using it for real
                donor management.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.85}
            onPress={() => router.replace("/")}
          >
            <LogOut size={19} color={RED} />
            <Text style={styles.logoutText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function AdminAction({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <TouchableOpacity style={styles.actionCard} activeOpacity={0.85}>
      <View style={styles.actionIcon}>{icon}</View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
      <View style={styles.arrowCircle}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  scroll: {
    flexGrow: 1,
  },

  header: {
    minHeight: 330,
    paddingHorizontal: 22,
    paddingBottom: 34,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  backButton: {
    position: "absolute",
    left: 18,
    top: 18,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },

  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.22)",
    backgroundColor: "rgba(255,255,255,.10)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  headerTitle: {
    color: WHITE,
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 1,
    marginTop: 20,
  },

  headerSubtitle: {
    color: "rgba(255,255,255,.68)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: 6,
  },

  adminBadge: {
    marginTop: 20,
    height: 32,
    paddingHorizontal: 13,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.18)",
    backgroundColor: "rgba(255,255,255,.07)",
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#45C76A",
    marginRight: 7,
  },

  adminBadgeText: {
    color: "rgba(255,255,255,.78)",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },

  eyebrow: {
    color: RED,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  title: {
    color: BLACK,
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "900",
    marginTop: 6,
  },

  description: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 9,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 22,
  },

  statCard: {
    width: "48%",
    minHeight: 135,
    backgroundColor: WHITE,
    borderRadius: 19,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
  },

  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    color: RED_DARK,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 10,
  },

  statLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },

  sectionLabel: {
    color: BLACK,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginTop: 18,
    marginBottom: 11,
  },

  actionCard: {
    minHeight: 78,
    borderRadius: 18,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    flex: 1,
    marginLeft: 12,
  },

  actionTitle: {
    color: BLACK,
    fontSize: 14,
    fontWeight: "900",
  },

  actionDescription: {
    color: MUTED,
    fontSize: 10.5,
    lineHeight: 16,
    marginTop: 3,
  },

  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },

  arrow: {
    color: RED,
    fontSize: 22,
    lineHeight: 25,
    fontWeight: "700",
  },

  noteCard: {
    marginTop: 15,
    borderRadius: 18,
    padding: 15,
    backgroundColor: "#FFF8F9",
    borderWidth: 1,
    borderColor: "#FFD6DC",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  noteText: {
    flex: 1,
    marginLeft: 11,
  },

  noteTitle: {
    color: BLACK,
    fontSize: 12,
    fontWeight: "900",
  },

  noteDescription: {
    color: MUTED,
    fontSize: 10.5,
    lineHeight: 16,
    marginTop: 4,
  },

  logoutButton: {
    minHeight: 52,
    borderRadius: 15,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#FFD1D7",
    marginTop: 18,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  logoutText: {
    color: RED,
    fontSize: 13,
    fontWeight: "900",
  },
});
