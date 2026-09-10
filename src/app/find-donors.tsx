import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Image,
  ImageBackground,
  StatusBar,
  Linking,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Heart,
  Search,
  ChevronDown,
  X,
  UserRound,
  Phone,
  MapPin,
  Droplets,
  Users,
  Filter,
} from "lucide-react-native";

const R = "#D91E36";
const D = "#650D1D";
const B = "#17181C";
const G = "#777980";
const W = "#FFFFFF";
const BG = "#F6F7F8";
const SOFT = "#FFF0F2";
const BD = "#E4E4E6";

const ICON =
  "https://uploads.onecompiler.io/43rkxu7ad/1787086611363/1000247098.png";

const DONORS_STORAGE_KEY = "BLOOD_CONNECT_DONORS";

const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];
const DIST: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Ananthapuramu",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "Dr. B.R. Ambedkar Konaseema",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Krishna",
    "Kurnool",
    "Markapuram",
    "Nandyal",
    "Ntr",
    "Palnadu",
    "Parvathipuram Manyam",
    "Polavaram",
    "Prakasam",
    "Sri Potti Sriramulu Nellore",
    "Sri Sathya Sai",
    "Srikakulam",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "Kadapa"
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Bichom",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Keyi Panyor",
    "Kra Daadi",
    "Kurung Kumey",
    "Leparada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang"
  ],
  "Assam": [
    "Bajali",
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Marigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tamulpur",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
    "Sribhumi"
  ],
  "Bihar": [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur (Bhabua)",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Pashchim Champaran",
    "Patna",
    "Purba Champaran",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali"
  ],
  "Chhattisgarh": [
    "Balod",
    "Balodabazar-Bhatapara",
    "Balrampur-Ramanujganj",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dakshin Bastar Dantewada",
    "Dhamtari",
    "Durg",
    "Gariyaband",
    "Gaurela-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabeerdham",
    "Khairagarh-Chhuikhadan-Gandai",
    "Kondagaon",
    "Korba",
    "Korea",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur(M C B)",
    "Mohla-Manpur-Ambagarh Chouki",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sakti",
    "Sarangarh-Bilaigarh",
    "Sukma",
    "Surajpur",
    "Surguja",
    "Kanker"
  ],
  "Goa": [
    "Kushavati",
    "North Goa",
    "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Arvalli",
    "Banas Kantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhotaudepur",
    "Dahod",
    "Dangs",
    "Devbhumi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kachchh",
    "Kheda",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
    "Vav-Tharad"
  ],
  "Haryana": [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hansi",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul And Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una"
  ],
  "Jharkhand": [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Saraikela Kharsawan",
    "Simdega",
    "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkote",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru South",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapura",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Vijayanagara",
    "Yadgir"
  ],
  "Kerala": [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
  ],
  "Madhya Pradesh": [
    "Agar-Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa (East Nimar)",
    "Khargone (West Nimar)",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Mauganj",
    "Morena",
    "Narmadapuram",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
    "Pandhurna"
  ],
  "Maharashtra": [
    "Ahilyanagar",
    "Akola",
    "Amravati",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Chhatrapati Sambhajinagar",
    "Dharashiv",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "Eastern West Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saitual",
    "Serchhip",
    "Siaha"
  ],
  "Nagaland": [
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto",
    "Meluri"
  ],
  "Odisha": [
    "Angul",
    "Boudh",
    "Balangir",
    "Bargarh",
    "Balasore",
    "Bhadrak",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh"
  ],
  "Punjab": [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar",
    "Sangrur",
    "Shahid Bhagat Singh Nagar",
    "Sri Muktsar Sahib",
    "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer",
    "Alwar",
    "Balotra",
    "Banswara",
    "Baran",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Deeg",
    "Dholpur",
    "Didwana-Kuchamana",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Khairthal-Tijara",
    "Kota",
    "Kotputli-Behror",
    "Nagaur",
    "Pali",
    "Phalodi",
    "Pratapgarh",
    "Rajsamand",
    "Salumbar",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur"
  ],
  "Sikkim": [
    "Gangtok",
    "Gyalshing",
    "Mangan",
    "Namchi",
    "Pakyong",
    "Soreng"
  ],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "The Nilgiris",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahbubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura"
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi"
  ],
  "Uttarakhand": [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi"
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Paschim Bardhaman",
    "Purba Bardhaman",
    "Birbhum",
    "Cooch Behar",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Maldah",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "South 24 Parganas",
    "Uttar Dinajpur",
    "Dakshin Dinajpur",
    "Paschim Medinipur",
    "Purba Medinipur",
    "Siliguri"
  ],
  "Andaman and Nicobar Islands": [
    "Nicobars",
    "North and Middle Andaman",
    "South Andaman"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli",
    "Daman",
    "Diu"
  ],
  "Delhi": [
    "Central",
    "Central North",
    "East",
    "New Delhi",
    "North",
    "North East",
    "North West",
    "Old Delhi",
    "Outer North",
    "South",
    "South East",
    "South West",
    "West"
  ],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Ladakh": [
    "Kargil",
    "Leh"
  ],
  "Lakshadweep": [
    "Lakshadweep"
  ],
  "Puducherry": [
    "Karaikal",
    "Mahe",
    "Puducherry",
    "Yanam"
  ]
};

type Donor = {
  id: string | number;
  name: string;
  age: number;
  blood: string;
  gender: string;
  phone: string;
  city: string;
  district: string;
  state: string;
};

type Drop = "state" | "district" | "blood" | null;

function callDonor(phone?: string) {
  if (!phone) {
    Alert.alert("Phone number unavailable", "This donor has no phone number.");
    return;
  }

  const digits = String(phone).replace(/[^\d+]/g, "");
  const number = digits.startsWith("+")
    ? digits
    : digits.length === 10
    ? `+91${digits}`
    : digits;

  Linking.openURL(`tel:${number}`).catch(() => {
    Alert.alert("Unable to call", "Your device could not open the phone app.");
  });
}

export default function FindDonors() {
  return (
    <FindDonorsContent />
  );
}

function FindDonorsContent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const mobile = width < 760;

  const [state, setState] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [blood, setBlood] = React.useState("");
  const [drop, setDrop] = React.useState<Drop>(null);
  const [searched, setSearched] = React.useState(false);
  const [donors, setDonors] = React.useState<Donor[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      let active = true;

      const loadDonors = async () => {
        try {
          const saved = await AsyncStorage.getItem(DONORS_STORAGE_KEY);
          const parsed = saved ? JSON.parse(saved) : [];

          if (active) {
            setDonors(Array.isArray(parsed) ? parsed : []);
          }
        } catch (error) {
          console.error("Donor load error:", error);
          if (active) setDonors([]);
        }
      };

      loadDonors();

      return () => {
        active = false;
      };
    }, [])
  );

  const districts = state ? DIST[state] || [] : [];

  const coveredStates = React.useMemo(
    () => new Set(donors.map((donor) => donor.state).filter(Boolean)).size,
    [donors]
  );

  const options =
    drop === "state"
      ? STATES
      : drop === "district"
      ? districts
      : drop === "blood"
      ? BLOOD
      : [];

  const results = donors.filter(
    (d) =>
      (!state || d.state === state) &&
      (!district || d.district === district) &&
      (!blood || d.blood === blood)
  );

  const select = (value: string) => {
    if (drop === "state") {
      setState(value);
      setDistrict("");
    }

    if (drop === "district") {
      setDistrict(value);
    }

    if (drop === "blood") {
      setBlood(value);
    }

    setDrop(null);
  };

  const clearFilters = () => {
    setState("");
    setDistrict("");
    setBlood("");
    setSearched(false);
  };

  return (
    <View style={styles.page}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* ONE SINGLE PAGE SCROLL */}
      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={[
          styles.pageContent,
          { paddingBottom: insets.bottom + 45 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
      {/* FIND DONORS HERO — LOCAL BACKGROUND IMAGE */}
      <ImageBackground
        source={require("../../assets/images/findbg.png")}
        style={[
          styles.hero,
          mobile ? styles.heroMobile : styles.heroDesktop,
          {
            height: mobile
              ? Math.min(Math.max(width * 0.72, 270), 335)
              : Math.min(Math.max(width * 0.43, 420), 620),
          },
        ]}
        imageStyle={styles.heroBackgroundImage}
        resizeMode="cover"
      >
        {/* Back button stays above the background artwork */}
        <TouchableOpacity
          style={[
            styles.heroBackButton,
            {
              top: Math.max(insets.top + 10, 14),
            },
          ]}
          activeOpacity={0.85}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={21} color={W} />
        </TouchableOpacity>
      </ImageBackground>

      {/* SEARCH AREA */}
        <View style={[styles.stats, mobile && styles.statsMobile]}>
          <Stat
            icon={<Users size={21} color={R} />}
            value={String(donors.length)}
            label="Available Donors"
          />

          <View style={styles.statLine} />

          <Stat
            icon={<MapPin size={21} color={R} />}
            value={String(coveredStates)}
            label="States Covered"
          />
        </View>

        <View style={[styles.section, mobile && styles.sectionMobile]}>
          <Text style={styles.eyebrow}>DONOR SEARCH</Text>

          <Text style={styles.sectionTitle}>
            Search Donors{"\n"}
            <Text style={{ color: R }}>Across India.</Text>
          </Text>

          <Text style={styles.desc}>
            Select your location and blood group to find suitable registered
            donors.
          </Text>
        </View>

        <View
          style={[
            styles.filters,
            mobile && styles.filtersMobile,
          ]}
        >
          <View style={styles.filterHeading}>
            <View style={styles.filterIcon}>
              <Filter size={20} color={R} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.filterTitle}>Search Filters</Text>
              <Text style={styles.filterSub}>
                Choose one or more filters
              </Text>
            </View>
          </View>

          <FilterField
            label="State / Union Territory"
            value={state || "All States & UTs"}
            onPress={() => setDrop("state")}
          />

          <FilterField
            label="District"
            value={district || "All Districts"}
            disabled={!state}
            onPress={() => state && setDrop("district")}
          />

          <FilterField
            label="Blood Group"
            value={blood || "All Blood Groups"}
            onPress={() => setDrop("blood")}
          />

          <TouchableOpacity
            style={styles.searchButton}
            activeOpacity={0.85}
            onPress={() => setSearched(true)}
          >
            <Search size={20} color={W} />
            <Text style={styles.searchText}>Search Donors</Text>
          </TouchableOpacity>

          {(state || district || blood) && (
            <TouchableOpacity
              style={styles.clearButton}
              activeOpacity={0.8}
              onPress={clearFilters}
            >
              <X size={17} color={R} />
              <Text style={styles.clearText}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* RESULTS */}
        <View style={[styles.resultsHeader, mobile && styles.resultsHeaderMobile]}>
          <View>
            <Text style={styles.eyebrow}>RESULTS</Text>
            <Text style={styles.resultsTitle}>Available Donors</Text>
          </View>

          <View style={[styles.badge, mobile && styles.badgeMobile]}>
            <Text style={styles.badgeText}>
              {searched ? results.length : 0} Found
            </Text>
          </View>
        </View>

        {mobile ? (
          <View style={styles.mobileResults}>
            {searched && results.length ? (
              results.map((donor) => (
                <DonorCard donor={donor} key={donor.id} />
              ))
            ) : (
              <Empty searched={searched} />
            )}
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tableScrollContent}
          >
            <View style={styles.table}>
              <View style={styles.tableHead}>
              <Text style={[styles.th, { width: 42 }]}>#</Text>
              <Text style={[styles.th, { width: 150 }]}>NAME</Text>
              <Text style={[styles.th, { width: 70 }]}>AGE</Text>
              <Text style={[styles.th, { width: 95 }]}>BLOOD</Text>
              <Text style={[styles.th, { width: 105 }]}>GENDER</Text>
              <Text style={[styles.th, { width: 120 }]}>LOCATION</Text>
              <Text style={[styles.th, { width: 120 }]}>CONTACT</Text>
            </View>

            {searched && results.length ? (
              results.map((donor, index) => (
                <View style={styles.tableRow} key={donor.id}>
                  <Text style={[styles.cell, { width: 42 }]}>
                    {index + 1}
                  </Text>

                  <Text
                    style={[
                      styles.cell,
                      { width: 150, fontWeight: "900" },
                    ]}
                  >
                    {donor.name}
                  </Text>

                  <Text style={[styles.cell, { width: 70 }]}>
                    {donor.age}
                  </Text>

                  <View style={{ width: 95 }}>
                    <Text style={styles.bloodPill}>{donor.blood}</Text>
                  </View>

                  <Text style={[styles.cell, { width: 105 }]}>
                    {donor.gender}
                  </Text>

                  <View style={{ width: 120 }}>
                    <Text style={styles.locationText}>{donor.city}</Text>
                    <Text style={styles.districtText}>
                      {donor.district}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.contactButton}
                    activeOpacity={0.8}
                    onPress={() => callDonor(donor.phone)}
                  >
                    <Phone size={15} color={R} />
                    <Text style={styles.contactText}>Call</Text>
                  </TouchableOpacity>
                </View>
              ))
              ) : (
                <Empty searched={searched} />
              )}
            </View>
          </ScrollView>
        )}

        {/* INFO */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Heart size={22} color={R} fill={R} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Every Drop Matters</Text>
            <Text style={styles.infoText}>
              A nearby donor can make a huge difference during an emergency.
              Use the filters to quickly narrow down your search.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Image
            source={{ uri: ICON }}
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
        </View>
      </ScrollView>

      {/* DROPDOWN MODAL */}
      <Modal
        visible={drop !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setDrop(null)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setDrop(null)}
          />

          <View
            style={[
              styles.modal,
              mobile && styles.modalMobile,
            ]}
          >
            <View style={styles.modalHead}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalEyebrow}>SELECT</Text>
                <Text style={styles.modalTitle}>
                  {drop === "state"
                    ? "State / Union Territory"
                    : drop === "district"
                    ? "District"
                    : "Blood Group"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.close}
                onPress={() => setDrop(null)}
              >
                <X size={19} color={B} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 480 }}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.option}
                  activeOpacity={0.8}
                  onPress={() => select(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>

                  <ChevronDown
                    size={17}
                    color={R}
                    style={{
                      transform: [{ rotate: "-90deg" }],
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function FilterField({
  label,
  value,
  disabled,
  onPress,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.filterField}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[
          styles.select,
          disabled && styles.disabledSelect,
        ]}
        disabled={disabled}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text
          style={[
            styles.selectText,
            !value.includes("All") && styles.selectedText,
          ]}
          numberOfLines={1}
        >
          {value}
        </Text>

        <ChevronDown size={18} color={disabled ? "#AAA" : B} />
      </TouchableOpacity>
    </View>
  );
}

function DonorCard({ donor }: { donor: any }) {
  return (
    <View style={styles.donorCard}>
      <View style={styles.avatar}>
        <UserRound size={23} color={R} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{donor.name}</Text>

        <View style={styles.locationRow}>
          <MapPin size={12} color={G} />
          <Text style={styles.loc}>
            {donor.city}, {donor.district}
          </Text>
        </View>

        <View style={styles.meta}>
          <Text style={styles.pill}>{donor.age} yrs</Text>

          <Text
            style={[
              styles.pill,
              {
                color: R,
                backgroundColor: SOFT,
              },
            ]}
          >
            {donor.blood}
          </Text>

          <Text style={styles.pill}>{donor.gender}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.phoneButton}
        activeOpacity={0.75}
        onPress={() => callDonor(donor.phone)}
      >
        <Phone size={17} color={R} />
      </TouchableOpacity>
    </View>
  );
}

function Empty({ searched }: { searched: boolean }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Search size={25} color={R} />
      </View>

      <Text style={styles.emptyText}>
        {searched ? "No donors found" : "Find donors near you"}
      </Text>

      <Text style={styles.emptySub}>
        {searched
          ? "Try changing your state, district or blood group."
          : "Select filters above and press Search Donors."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: BG,
  },

  mainScroll: {
    flex: 1,
    backgroundColor: BG,
  },

  pageContent: {
    flexGrow: 1,
    width: "100%",
    alignItems: "stretch",
  },

  hero: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: D,
    position: "relative",
  },

  heroMobile: {
    width: "100%",
    alignSelf: "stretch",
  },

  heroDesktop: {
    width: "100%",
    maxWidth: 1400,
    alignSelf: "center",
  },

  heroBackgroundImage: {
    width: "100%",
    height: "100%",
  },

  heroBackButton: {
    position: "absolute",
    left: 14,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.34)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  stats: {
    width: "92%",
    maxWidth: 1100,
    alignSelf: "center",
    marginTop: -24,
    minHeight: 110,
    backgroundColor: W,
    borderRadius: 23,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 4 },
  },

  statsMobile: {
    width: "90%",
    minHeight: 108,
    marginTop: -22,
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    color: B,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 5,
  },

  statLabel: {
    color: G,
    fontSize: 8.5,
    textAlign: "center",
    marginTop: 2,
  },

  statLine: {
    width: 1,
    height: 54,
    backgroundColor: BD,
  },

  section: {
    width: "92%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingTop: 32,
  },

  sectionMobile: {
    width: "90%",
    paddingTop: 30,
  },

  eyebrow: {
    color: R,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  sectionTitle: {
    color: B,
    fontSize: 29,
    lineHeight: 33,
    fontWeight: "900",
    marginTop: 7,
  },

  desc: {
    color: G,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
  },

  filters: {
    width: "92%",
    maxWidth: 1100,
    alignSelf: "center",
    marginTop: 18,
    backgroundColor: W,
    borderRadius: 22,
    padding: 19,
    borderWidth: 1,
    borderColor: BD,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },

  filtersMobile: {
    width: "92%",
    padding: 15,
    marginTop: 14,
    borderRadius: 20,
  },

  filterHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  filterIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  filterTitle: {
    color: B,
    fontSize: 15,
    fontWeight: "900",
  },

  filterSub: {
    color: G,
    fontSize: 9.5,
    marginTop: 2,
  },

  filterField: {
    marginBottom: 13,
  },

  label: {
    color: B,
    fontSize: 11.5,
    fontWeight: "800",
    marginBottom: 7,
  },

  select: {
    minHeight: 53,
    borderWidth: 1,
    borderColor: BD,
    borderRadius: 13,
    paddingHorizontal: 13,
    backgroundColor: "#FCFCFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  disabledSelect: {
    opacity: 0.5,
  },

  selectText: {
    flex: 1,
    color: G,
    fontSize: 12.5,
    fontWeight: "600",
    marginRight: 8,
  },

  selectedText: {
    color: B,
    fontWeight: "800",
  },

  searchButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: R,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 2,
  },

  searchText: {
    color: W,
    fontSize: 13,
    fontWeight: "900",
    marginLeft: 8,
  },

  clearButton: {
    height: 43,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#F1C7CC",
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 9,
  },

  clearText: {
    color: R,
    fontSize: 11,
    fontWeight: "900",
    marginLeft: 6,
  },

  resultsHeader: {
    width: "92%",
    maxWidth: 1100,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  resultsHeaderMobile: {
    width: "90%",
    marginTop: 26,
    marginBottom: 14,
    alignItems: "center",
  },

  resultsTitle: {
    color: B,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 5,
  },

  badge: {
    minWidth: 88,
    height: 40,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: R,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeMobile: {
    minWidth: 82,
    height: 38,
    paddingHorizontal: 12,
  },

  badgeText: {
    color: W,
    fontSize: 11,
    fontWeight: "900",
  },

  mobileResults: {
    width: "100%",
    alignItems: "center",
  },

  donorCard: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: W,
    borderWidth: 1,
    borderColor: BD,
    borderRadius: 19,
    padding: 14,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  avatar: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  name: {
    color: B,
    fontSize: 14,
    fontWeight: "900",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  loc: {
    color: G,
    fontSize: 9.5,
    marginLeft: 4,
  },

  meta: {
    flexDirection: "row",
    marginTop: 6,
  },

  pill: {
    color: G,
    backgroundColor: "#F1F1F2",
    fontSize: 8.5,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    marginRight: 5,
  },

  phoneButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },

  tableScrollContent: {
    paddingHorizontal: 4,
    minWidth: "100%",
    justifyContent: "center",
  },

  table: {
    width: 720,
    alignSelf: "center",
    backgroundColor: W,
    borderRadius: 22,
    padding: 17,
    minHeight: 320,
    borderWidth: 1,
    borderColor: BD,
  },

  tableHead: {
    minHeight: 48,
    borderRadius: 13,
    backgroundColor: "#F1F1F2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
  },

  th: {
    color: "#64666C",
    fontSize: 10,
    fontWeight: "900",
  },

  tableRow: {
    minHeight: 65,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
  },

  cell: {
    color: "#303238",
    fontSize: 11,
  },

  bloodPill: {
    color: R,
    fontSize: 10,
    fontWeight: "900",
    backgroundColor: SOFT,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  locationText: {
    color: B,
    fontSize: 10.5,
    fontWeight: "800",
  },

  districtText: {
    color: G,
    fontSize: 8.5,
    marginTop: 2,
  },

  contactButton: {
    width: 110,
    minHeight: 38,
    borderRadius: 11,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  contactText: {
    color: R,
    fontSize: 10,
    fontWeight: "900",
    marginLeft: 5,
  },

  empty: {
    minHeight: 245,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
  },

  emptyText: {
    color: G,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  emptySub: {
    color: "#AAA",
    fontSize: 10.5,
    marginTop: 6,
    textAlign: "center",
  },

  infoCard: {
    width: "92%",
    maxWidth: 760,
    alignSelf: "center",
    marginTop: 22,
    borderRadius: 19,
    backgroundColor: SOFT,
    borderWidth: 1,
    borderColor: "#F1D2D6",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: W,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  infoTitle: {
    color: R,
    fontSize: 14,
    fontWeight: "900",
  },

  infoText: {
    color: G,
    fontSize: 10.5,
    lineHeight: 16,
    marginTop: 3,
  },

  footer: {
    alignItems: "center",
    paddingTop: 28,
  },

  footerIcon: {
    width: 48,
    height: 48,
  },

  footerBrand: {
    color: B,
    fontSize: 11,
    fontWeight: "900",
    marginTop: 6,
  },

  footerText: {
    color: G,
    fontSize: 9,
    marginTop: 4,
  },

  footerSub: {
    color: G,
    fontSize: 9,
    marginTop: 4,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },

  modal: {
    width: 520,
    maxWidth: "100%",
    maxHeight: "82%",
    backgroundColor: W,
    borderRadius: 24,
    padding: 19,
  },

  modalMobile: {
    width: "100%",
    maxHeight: "82%",
    borderRadius: 22,
  },

  modalHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  modalEyebrow: {
    color: R,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  modalTitle: {
    color: B,
    fontSize: 19,
    fontWeight: "900",
    marginTop: 2,
  },

  close: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },

  option: {
    minHeight: 51,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: BD,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionText: {
    flex: 1,
    color: B,
    fontSize: 12.5,
    fontWeight: "700",
    marginRight: 8,
  },
});
