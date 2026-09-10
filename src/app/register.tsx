import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  Image,
  ImageBackground,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Droplets,
  ChevronDown,
  X,
  CheckCircle2,
  MapPin,
  UserRound,
  Phone,
  Heart,
} from "lucide-react-native";

const RED = "#E31B36";
const DARK = "#650D1D";
const BLACK = "#17181C";
const MUTED = "#777980";
const WHITE = "#FFFFFF";
const BG = "#F6F7F8";
const SOFT = "#FFF0F2";
const BORDER = "#E3E3E5";

const ICON =
  "https://uploads.onecompiler.io/43rkxu7ad/1787086611363/1000247098.png";

const DONORS_STORAGE_KEY = "BLOOD_CONNECT_DONORS";

const BLOOD = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENDER = ["Male", "Female", "Other"];

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

type Drop = "blood" | "gender" | "state" | "district" | null;

export default function Register() {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setEligibilityVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);


  const [eligibilityVisible, setEligibilityVisible] = useState(false);
  const [eligibilityLanguage, setEligibilityLanguage] = useState<"EN" | "TA" | "HN">("EN");

  const eligibilityContent = {
    EN: {
      title: "🩸 Blood Donation Eligibility",
      lines: [
        "🧑 Age: 18–65 years",
        "⚖️ Weight: Minimum 45 kg",
        "❤️ Health: Must be in good general health",
        "🩸 Hemoglobin (Hb): Minimum 12.5 g/dL",
        "🌡️ Should not have fever or an active infection at the time of donation",
        "🩺 A blood bank will check basic health parameters such as BP, pulse, temperature, and Hb before donation.",
        "🔄 For whole blood donation, an appropriate interval is required between donations; the blood bank will confirm when you are eligible again.",
      ],
      button: "Continue",
    },
    TA: {
      title: "🩸 இரத்ததான தகுதிகள்",
      lines: [
        "🧑 வயது: 18–65 வயது",
        "⚖️ எடை: குறைந்தபட்சம் 45 கிலோ",
        "❤️ உடல்நிலை: பொதுவாக நல்ல உடல்நிலையில் இருக்க வேண்டும்",
        "🩸 ஹீமோகுளோபின் (Hb): குறைந்தபட்சம் 12.5 g/dL",
        "🌡️ இரத்ததானம் செய்யும் நேரத்தில் காய்ச்சல் அல்லது செயலில் உள்ள தொற்று இருக்கக்கூடாது",
        "🩺 இரத்த வங்கி BP, நாடித்துடிப்பு, வெப்பநிலை மற்றும் Hb போன்ற அடிப்படை உடல்நல அளவுகளை பரிசோதிக்கும்.",
        "🔄 முழு இரத்ததானங்களுக்கு இடையில் தேவையான இடைவெளி இருக்க வேண்டும்; மீண்டும் எப்போது தகுதி பெறுவீர்கள் என்பதை இரத்த வங்கி உறுதி செய்யும்.",
      ],
      button: "தொடரவும்",
    },
    HN: {
      title: "🩸 रक्तदान की पात्रता",
      lines: [
        "🧑 आयु: 18–65 वर्ष",
        "⚖️ वजन: न्यूनतम 45 किलोग्राम",
        "❤️ स्वास्थ्य: सामान्य रूप से स्वस्थ होना चाहिए",
        "🩸 हीमोग्लोबिन (Hb): न्यूनतम 12.5 g/dL",
        "🌡️ रक्तदान के समय बुखार या सक्रिय संक्रमण नहीं होना चाहिए",
        "🩺 रक्त बैंक BP, नाड़ी, तापमान और Hb जैसे बुनियादी स्वास्थ्य मानकों की जाँच करेगा।",
        "🔄 पूर्ण रक्तदान के बीच उचित अंतराल आवश्यक है; दोबारा कब रक्तदान कर सकते हैं, इसकी पुष्टि रक्त बैंक करेगा।",
      ],
      button: "जारी रखें",
    },
  };

const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const mobile = width < 760;

  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [blood, setBlood] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [drop, setDrop] = React.useState<Drop>(null);

  const options =
    drop === "blood"
      ? BLOOD
      : drop === "gender"
      ? GENDER
      : drop === "state"
      ? STATES
      : drop === "district"
      ? DIST[state] || []
      : [];

  const select = (value: string) => {
    if (drop === "blood") setBlood(value);
    if (drop === "gender") setGender(value);

    if (drop === "state") {
      setState(value);
      setDistrict("");
    }

    if (drop === "district") setDistrict(value);

    setDrop(null);
  };

  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSuccess, setAlertSuccess] = React.useState(false);

  const showThemeAlert = (
    title: string,
    message: string,
    success = false
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertSuccess(success);
    setAlertVisible(true);
  };

  const submit = async () => {
    if (!name.trim()) {
      return showThemeAlert("Required", "Please enter your full name.");
    }
    if (!age.trim()) {
      return showThemeAlert("Required", "Please enter your age.");
    }

    const numericAge = Number(age);
    if (!Number.isFinite(numericAge) || numericAge < 18 || numericAge > 65) {
      return showThemeAlert(
        "Invalid Age",
        "Please enter a valid donor age between 18 and 65."
      );
    }

    if (!blood) {
      return showThemeAlert("Required", "Please select your blood group.");
    }
    if (!gender) {
      return showThemeAlert("Required", "Please select your gender.");
    }
    if (phone.length !== 10) {
      return showThemeAlert("Invalid Phone", "Enter a valid 10-digit phone number.");
    }
    if (!city.trim()) {
      return showThemeAlert("Required", "Please enter your city.");
    }
    if (!state) {
      return showThemeAlert("Required", "Please select your state.");
    }
    if (!district) {
      return showThemeAlert("Required", "Please select your district.");
    }

    try {
      const saved = await AsyncStorage.getItem(DONORS_STORAGE_KEY);
      const donors = saved ? JSON.parse(saved) : [];

      const duplicate = Array.isArray(donors) &&
        donors.some((donor: any) => donor.phone === phone);

      if (duplicate) {
        return showThemeAlert(
          "Already Registered",
          "This phone number is already registered as a donor."
        );
      }

      const newDonor = {
        id: Date.now().toString(),
        name: name.trim(),
        age: numericAge,
        blood,
        gender,
        phone,
        city: city.trim(),
        state,
        district,
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        DONORS_STORAGE_KEY,
        JSON.stringify([...(Array.isArray(donors) ? donors : []), newDonor])
      );

      showThemeAlert(
        "Registration Successful",
        "Thank you for registering as a blood donor.",
        true
      );
    } catch (error) {
      console.error("Donor registration save error:", error);
      showThemeAlert(
        "Save Failed",
        "Unable to save the donor registration. Please try again."
      );
    }
  };





  return (
    <View style={styles.page}>
      <Modal
        visible={eligibilityVisible}
        transparent
        statusBarTranslucent={true}
        animationType="fade"
        onRequestClose={() => setEligibilityVisible(false)}
      >
        <View style={styles.eligibilityOverlay}>
          <View style={styles.eligibilityModal}>
            <View style={styles.eligibilityTopAccent} />
            {/* Refined premium header — same Blood Connect visual language */}
            <View style={styles.eligibilityTopRow}>
              <View style={styles.eligibilityTopIconOuter}>
                <View style={styles.eligibilityTopIcon}>
                  <Droplets size={21} color={WHITE} />
                </View>
              </View>

              <View style={styles.eligibilityTopText}>
                <Text style={styles.eligibilityEyebrow}>BLOOD CONNECT 2.O</Text>
                <Text style={styles.eligibilityTopTitle}>Donation Eligibility</Text>
              </View>

              <Pressable
                style={styles.eligibilityClose}
                onPress={() => setEligibilityVisible(false)}
                hitSlop={8}
              >
                <X size={17} color={BLACK} />
              </Pressable>
            </View>

            <View style={styles.eligibilityDivider} />

            <View style={styles.languageButtons}>
              <Pressable
                style={[
                  styles.languageButton,
                  eligibilityLanguage === "EN" && styles.languageButtonActive,
                ]}
                onPress={() => setEligibilityLanguage("EN")}
              >
                <Text
                  style={[
                    styles.languageCode,
                    eligibilityLanguage === "EN" && styles.languageCodeActive,
                  ]}
                >
                  EN
                </Text>
                <Text
                  style={[
                    styles.languageName,
                    eligibilityLanguage === "EN" && styles.languageNameActive,
                  ]}
                >
                  English
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.languageButton,
                  eligibilityLanguage === "TA" && styles.languageButtonActive,
                ]}
                onPress={() => setEligibilityLanguage("TA")}
              >
                <Text
                  style={[
                    styles.languageCode,
                    eligibilityLanguage === "TA" && styles.languageCodeActive,
                  ]}
                >
                  தமிழ்
                </Text>
                <Text
                  style={[
                    styles.languageName,
                    eligibilityLanguage === "TA" && styles.languageNameActive,
                  ]}
                >
                  Tamil
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.languageButton,
                  eligibilityLanguage === "HN" && styles.languageButtonActive,
                ]}
                onPress={() => setEligibilityLanguage("HN")}
              >
                <Text
                  style={[
                    styles.languageCode,
                    eligibilityLanguage === "HN" && styles.languageCodeActive,
                  ]}
                >
                  HN
                </Text>
                <Text
                  style={[
                    styles.languageName,
                    eligibilityLanguage === "HN" && styles.languageNameActive,
                  ]}
                >
                  हिन्दी
                </Text>
              </Pressable>
            </View>

            <View style={styles.eligibilityTitleRow}>
              <View style={styles.eligibilityTitleIcon}>
                <CheckCircle2 size={18} color={RED} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.eligibilityTitle}>
                  {eligibilityContent[eligibilityLanguage].title}
                </Text>
                <Text style={styles.eligibilitySubtitle}>
                  Please review before continuing
                </Text>
              </View>
            </View>

            <ScrollView
              style={styles.eligibilityScroll}
              contentContainerStyle={styles.eligibilityContent}
              showsVerticalScrollIndicator={false}
            >
              {eligibilityContent[eligibilityLanguage].lines.map((line, index) => (
                <View
                  key={`${eligibilityLanguage}-${index}`}
                  style={styles.eligibilityItem}
                >
                  <View style={styles.eligibilityItemIcon}>
                    <Text style={styles.eligibilityItemNumber}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={styles.eligibilityLine}>{line}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.eligibilityBottom}>
              <View style={styles.eligibilityHint}>
                <CheckCircle2 size={14} color="#24A957" />
                <Text style={styles.eligibilityHintText}>
                  Final eligibility is confirmed by the blood bank.
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.eligibilityContinue,
                  pressed && styles.eligibilityContinuePressed,
                ]}
                onPress={() => setEligibilityVisible(false)}
              >
                <Text style={styles.eligibilityContinueText}>
                  {eligibilityContent[eligibilityLanguage].button}
                </Text>
                <Text style={styles.eligibilityContinueArrow}>→</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: insets.bottom + 35,
          },
        ]}
      >
        {/* REGISTER HERO — SAME RESPONSIVE BEHAVIOR AS FIND DONORS */}
        <ImageBackground
          source={require("../../assets/images/registerbg.png")}
          style={[
            styles.hero,
            mobile ? styles.heroMobile : styles.heroDesktop,
            {
              // registerbg.png is 3:2. Keep that exact ratio on mobile
              // so the complete artwork is visible without side-cropping.
              height: mobile
                ? width / 1.5
                : Math.min(Math.max(width * 0.43, 420), 620),
            },
          ]}
          imageStyle={styles.heroBackgroundImage}
          resizeMode={mobile ? "contain" : "cover"}
        >
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
            <ArrowLeft size={21} color={WHITE} />
          </TouchableOpacity>
        </ImageBackground>

        {/* FORM */}
        <View style={styles.form}>
          <View style={styles.formHeader}>
            <View>
              <Text style={styles.eyebrow}>DONOR DETAILS</Text>
              <Text style={styles.formTitle}>Add Your Information</Text>
            </View>

            <View style={styles.formIcon}>
              <UserRound size={21} color={RED} />
            </View>
          </View>

          <Text style={styles.sectionLabel}>PERSONAL INFORMATION</Text>

          <Field
            label="Full Name"
            value={name}
            set={setName}
            ph="Enter your full name"
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Field
                label="Age"
                value={age}
                set={setAge}
                ph="Age"
                kb="number-pad"
              />
            </View>

            <View style={styles.half}>
              <DropField
                label="Blood Group"
                value={blood || "Select blood group"}
                placeholder={!blood}
                onPress={() => setDrop("blood")}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <DropField
                label="Gender"
                value={gender || "Select gender"}
                placeholder={!gender}
                onPress={() => setDrop("gender")}
              />
            </View>

            <View style={styles.half}>
              <PhoneField
                value={phone}
                set={(value) =>
                  setPhone(value.replace(/\D/g, "").slice(0, 10))
                }
              />
            </View>
          </View>

          <Text style={styles.sectionLabel}>LOCATION</Text>

          <Field
            label="City"
            value={city}
            set={setCity}
            ph="Enter your city"
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <DropField
                label="State"
                value={state || "Select state"}
                placeholder={!state}
                onPress={() => setDrop("state")}
              />
            </View>

            <View style={styles.half}>
              <DropField
                label="District"
                value={district || "Select district"}
                placeholder={!district}
                disabled={!state}
                onPress={() => state && setDrop("district")}
              />
            </View>
          </View>

          <View style={styles.note}>
            <MapPin size={17} color={RED} />

            <Text style={styles.noteText}>
              Your location helps people find suitable donors in their area.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.register}
            activeOpacity={0.86}
            onPress={submit}
          >
            <View style={styles.registerIcon}>
              <Droplets size={19} color={RED} />
            </View>

            <Text style={styles.registerText}>Register as Donor</Text>

            <View style={styles.registerArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancel}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* MOTIVATION CARD */}
        <View style={styles.motivation}>
          <View style={styles.motivationIcon}>
            <Heart size={22} color={RED} fill={RED} />
          </View>

          <View style={styles.motivationContent}>
            <Text style={styles.motivationTitle}>Every Drop Matters</Text>

            <Text style={styles.motivationText}>
              A simple act of kindness can help someone during an emergency or
              medical treatment.
            </Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Image
            source={{ uri: ICON }}
            style={styles.footerIcon}
            resizeMode="contain"
          />

          <Text style={styles.footerB}>BLOOD CONNECT 2.O</Text>

          <Text style={styles.footerT}>
            Created by G.R.KARTHIKEYAN
          </Text>

          <Text style={styles.footerSub}>Technology for Humanity ❤️</Text>
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
              {
                marginTop: insets.top,
                marginBottom: insets.bottom,
              },
            ]}
          >
            <View style={styles.modalHead}>
              <View>
                <Text style={styles.modalEyebrow}>SELECT OPTION</Text>
                <Text style={styles.modalTitle}>
                  {drop === "blood"
                    ? "Blood Group"
                    : drop === "gender"
                    ? "Gender"
                    : drop === "state"
                    ? "State"
                    : "District"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.close}
                onPress={() => setDrop(null)}
              >
                <X size={18} color={BLACK} />
              </TouchableOpacity>
            </View>

            {options.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  Please select a state first.
                </Text>
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
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
                      color={RED}
                      style={{
                        transform: [{ rotate: "-90deg" }],
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* BLOOD CONNECT THEMED ALERT */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.themeAlertOverlay}>
          <View style={styles.themeAlertCard}>
            <View
              style={[
                styles.themeAlertIcon,
                alertSuccess
                  ? styles.themeAlertSuccess
                  : styles.themeAlertError,
              ]}
            >
              <Text style={styles.themeAlertIconText}>
                {alertSuccess ? "✓" : "!"}
              </Text>
            </View>

            <Text style={styles.themeAlertBrand}>BLOOD CONNECT 2.O</Text>
            <Text style={styles.themeAlertTitle}>{alertTitle}</Text>
            <Text style={styles.themeAlertMessage}>{alertMessage}</Text>

            <TouchableOpacity
              style={styles.themeAlertButton}
              activeOpacity={0.85}
              onPress={() => {
                setAlertVisible(false);
                if (alertSuccess) {
                  router.back();
                }
              }}
            >
              <Text style={styles.themeAlertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </View>
  );
}

function Field({
  label,
  value,
  set,
  ph,
  kb,
}: {
  label: string;
  value: string;
  set: (value: string) => void;
  ph: string;
  kb?: any;
}) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={set}
        placeholder={ph}
        placeholderTextColor="#999"
        keyboardType={kb}
        selectionColor={RED}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, focused && styles.inputFocused]}
      />
    </View>
  );
}

function PhoneField({
  value,
  set,
}: {
  value: string;
  set: (value: string) => void;
}) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View>
      <Text style={styles.label}>Phone Number</Text>

      <View
        style={[
          styles.input,
          styles.phoneInput,
          focused && styles.inputFocused,
        ]}
      >
        <Text style={styles.countryCode}>+91</Text>

        <View style={styles.phoneDivider} />

        <TextInput
          value={value}
          onChangeText={set}
          placeholder="10-digit number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          selectionColor={RED}
          maxLength={10}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.phoneTextInput}
        />
      </View>
    </View>
  );
}

function DropField({
  label,
  value,
  placeholder,
  disabled,
  onPress,
}: {
  label: string;
  value: string;
  placeholder?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[styles.input, styles.drop, disabled && styles.disabled]}
        disabled={disabled}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.dropText,
            placeholder && styles.placeholderText,
          ]}
        >
          {value}
        </Text>

        <ChevronDown size={18} color={BLACK} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  languageButtonActive: {
    backgroundColor: RED,
    borderColor: RED,
    shadowColor: RED,
    shadowOpacity: 0.20,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  eligibilityOverlay: {
    flex: 1,
    backgroundColor: "rgba(31, 4, 10, 0.74)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  eligibilityModal: {
    width: "100%",
    maxWidth: 430,
    maxHeight: "86%",
    backgroundColor: WHITE,
    borderRadius: 27,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#F1D4D9",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 12 },
    elevation: 18,
  },

  eligibilityTopAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: RED,
  },

  eligibilityTopRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
  },

  eligibilityTopIconOuter: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  eligibilityTopIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: RED,
    shadowOpacity: 0.20,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  eligibilityTopText: {
    flex: 1,
  },

  eligibilityEyebrow: {
    color: RED,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  eligibilityTopTitle: {
    color: BLACK,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },

  eligibilityClose: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#F7F7F8",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E9E9EC",
  },

  eligibilityDivider: {
    height: 1,
    backgroundColor: "#EEEEF0",
    marginTop: 13,
    marginBottom: 12,
  },

  languageButtons: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 15,
    padding: 4,
    borderRadius: 18,
    backgroundColor: "#F6F6F8",
    borderWidth: 1,
    borderColor: "#E9E9EC",
  },

  languageButton: {
    flex: 1,
    minHeight: 51,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "transparent",
  },

  languageCode: {
    color: BLACK,
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 17,
  },

  languageCodeActive: {
    color: WHITE,
  },

  languageName: {
    color: MUTED,
    fontSize: 8,
    fontWeight: "700",
    marginTop: 1,
  },

  languageNameActive: {
    color: "rgba(255,255,255,.82)",
  },

  eligibilityTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFCFD",
    borderWidth: 1,
    borderColor: "#EEEEF0",
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
  },

  eligibilityTitleIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  eligibilityTitle: {
    color: BLACK,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
  },

  eligibilitySubtitle: {
    color: MUTED,
    fontSize: 9,
    marginTop: 2,
    fontWeight: "600",
  },

  eligibilityScroll: {
    maxHeight: 330,
  },

  eligibilityContent: {
    paddingBottom: 2,
  },

  eligibilityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9E9EC",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.025,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  eligibilityItemIcon: {
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  eligibilityItemNumber: {
    color: RED,
    fontSize: 10,
    fontWeight: "900",
  },

  eligibilityLine: {
    flex: 1,
    color: "#34343A",
    fontSize: 11.5,
    lineHeight: 17.5,
    fontWeight: "600",
  },

  eligibilityBottom: {
    borderTopWidth: 1,
    borderTopColor: "#EEEEF0",
    paddingTop: 10,
    marginTop: 2,
  },

  eligibilityHint: {
    minHeight: 35,
    borderRadius: 12,
    backgroundColor: "#F0FBF4",
    borderWidth: 1,
    borderColor: "#D9F1E1",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  eligibilityHintText: {
    flex: 1,
    color: "#4D6655",
    fontSize: 8.5,
    lineHeight: 13,
    fontWeight: "700",
    marginLeft: 7,
  },

  eligibilityContinue: {
    minHeight: 54,
    borderRadius: 17,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: RED,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },

  eligibilityContinuePressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  eligibilityContinueText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "900",
  },

  eligibilityContinueArrow: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 9,
    marginTop: -1,
  },

  themeAlertOverlay: {
    flex: 1,
    backgroundColor: "rgba(101, 13, 29, 0.72)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  themeAlertCard: {
    width: "100%",
    maxWidth: 390,
    backgroundColor: WHITE,
    borderRadius: 25,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F2C5CC",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },

  themeAlertIcon: {
    width: 58,
    height: 58,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
  },

  themeAlertSuccess: {
    backgroundColor: "#EAF8EF",
  },

  themeAlertError: {
    backgroundColor: SOFT,
  },

  themeAlertIconText: {
    color: RED,
    fontSize: 27,
    fontWeight: "900",
  },

  themeAlertBrand: {
    color: RED,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 5,
  },

  themeAlertTitle: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },

  themeAlertMessage: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
  },

  themeAlertButton: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  themeAlertButtonText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: "900",
  },


  page: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    flexGrow: 1,
  },

  // HERO — matched to the Find Donors responsive image presentation
  hero: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#5C0919",
    position: "relative",
  },

  heroMobile: {
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: "#5C0919",
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

  // FORM
  form: {
    width: "92%",
    alignSelf: "center",
    marginTop: 24,
    backgroundColor: WHITE,
    borderRadius: 27,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ECECEF",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 7,
    },
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 19,
  },

  eyebrow: {
    color: RED,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  formTitle: {
    color: BLACK,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 4,
  },

  formIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F2D5D9",
  },

  sectionLabel: {
    color: MUTED,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 10,
  },

  label: {
    color: BLACK,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  half: {
    flex: 1,
    minWidth: 0,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E7E7EA",
    borderRadius: 16,
    backgroundColor: "#FBFBFC",
    paddingHorizontal: 14,
    color: BLACK,
    fontSize: 13,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.025,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  inputFocused: {
    borderColor: RED,
    borderWidth: 1.5,
    backgroundColor: WHITE,
    shadowColor: RED,
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  phoneInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  countryCode: {
    color: BLACK,
    fontSize: 13,
    fontWeight: "900",
  },

  phoneDivider: {
    width: 1,
    height: 24,
    backgroundColor: BORDER,
    marginHorizontal: 10,
  },

  phoneTextInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 0,
    color: BLACK,
    fontSize: 13,
  },

  drop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropText: {
    flex: 1,
    color: BLACK,
    fontSize: 12.5,
    marginRight: 7,
  },

  placeholderText: {
    color: "#777",
  },

  disabled: {
    opacity: 0.45,
  },

  note: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: SOFT,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 15,
  },

  noteText: {
    flex: 1,
    color: MUTED,
    fontSize: 10.5,
    lineHeight: 16,
    marginLeft: 9,
  },

  register: {
    minHeight: 59,
    borderRadius: 18,
    backgroundColor: RED,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    shadowColor: RED,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 7,
  },

  registerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },

  registerText: {
    flex: 1,
    color: WHITE,
    fontSize: 14,
    fontWeight: "900",
    marginLeft: 11,
  },

  registerArrow: {
    width: 36,
    alignItems: "center",
  },

  arrowText: {
    color: WHITE,
    fontSize: 25,
    fontWeight: "500",
  },

  cancel: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: "700",
  },

  // MOTIVATION
  motivation: {
    width: "92%",
    alignSelf: "center",
    marginTop: 16,
    padding: 18,
    borderRadius: 22,
    backgroundColor: SOFT,
    borderWidth: 1,
    borderColor: "#F0D0D5",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: RED,
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  motivationIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: RED,
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  motivationContent: {
    flex: 1,
    marginLeft: 12,
  },

  motivationTitle: {
    color: RED,
    fontSize: 14,
    fontWeight: "900",
  },

  motivationText: {
    color: MUTED,
    fontSize: 10.5,
    lineHeight: 17,
    marginTop: 4,
  },

  // FOOTER
  footer: {
    alignItems: "center",
    paddingTop: 27,
  },

  footerIcon: {
    width: 48,
    height: 48,
  },

  footerB: {
    color: BLACK,
    fontSize: 11,
    fontWeight: "900",
    marginTop: 7,
  },

  footerT: {
    color: MUTED,
    fontSize: 9,
    marginTop: 4,
  },

  footerSub: {
    color: MUTED,
    fontSize: 9,
    marginTop: 5,
    paddingBottom: 5,
  },

  // MODAL
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modal: {
    width: "100%",
    maxWidth: 500,
    maxHeight: "78%",
    backgroundColor: WHITE,
    borderRadius: 23,
    padding: 20,
    elevation: 12,
  },

  modalHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  modalEyebrow: {
    color: RED,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  modalTitle: {
    color: BLACK,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 3,
  },

  close: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },

  option: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionText: {
    fontSize: 13,
    fontWeight: "700",
    color: BLACK,
  },

  empty: {
    paddingVertical: 25,
    alignItems: "center",
  },

  emptyText: {
    color: MUTED,
    fontSize: 12,
  },
});
