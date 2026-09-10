import { LinearGradient } from "expo-linear-gradient";
import { Heart } from "lucide-react-native";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DonationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DonationModal({
  visible,
  onClose,
}: DonationModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={() => {}}>
          <LinearGradient
            colors={["#D91E36", "#8C1224"]}
            style={styles.header}
          >
            <Heart color="#fff" size={40} />
            <Text style={styles.title}>Become a Blood Donor ❤️</Text>
          </LinearGradient>

          <View style={styles.body}>
            <Text style={styles.description}>
              Every blood donation can save up to three lives.
              {"\n\n"}
              Join our Blood Connect community and help people during
              emergencies.
            </Text>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modal: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },

  body: {
    padding: 24,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#D91E36",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  closeText: {
    textAlign: "center",
    marginTop: 18,
    color: "#888",
    fontSize: 15,
  },
});