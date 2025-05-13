import { toast } from "react-toastify";
import Template1 from "../components/featured/resumeTemplates/Template1";
import Template2 from "../components/featured/resumeTemplates/Template2";
import axios from "axios";





export const uploadFile = async (file, fieldName) => {
  if (!file) return null;

  try {
    const fileData = new FormData();
    fileData.append(fieldName, file);

    const response = await axios.post("http://192.168.1.208:2000/api/upload/document", fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data[fieldName];
  } catch (error) {
    console.error(`Error uploading ${fieldName}:`, error);
    toast.error(`Failed to upload ${fieldName}`);
    return null;
  }
};



export function formatDateInNumber(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
  const year = date.getFullYear();

  // Format day and month to ensure two digits
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  // Construct the final formatted date string
  return `${formattedDay}/${formattedMonth}/${year}`;
}

export const companyLogo = [
  {
    img: "/images/home/scroller-img_1.png",
  },
];
export const jobCatData = [
  {
    img: "/images/home/finance.png",
    name: "Finance",
    job: "1598 jobs",
  },
  {
    img: "/images/home/Marketing.png",
    name: "Marketing",
    job: "1598 jobs",
  },
  {
    img: "/images/home/HR.png",
    name: "Human Resources",
    job: "1598 jobs",
  },
  {
    img: "/images/home/industry.png",
    name: "Industry",
    job: "1598 jobs",
  },
  {
    img: "/images/home/Design & cr.png",
    name: "Design & Creative",
    job: "1598 jobs",
  },
  {
    img: "/images/home/Content_writer.png",
    name: "Content Writing",
    job: "1598 jobs",
  },
  {
    img: "/images/home/Development.png",
    name: "Development & IT",
    job: "1598 jobs",
  },
  {
    img: "/images/home/Video editing.png",
    name: "Video Editing",
    job: "1598 jobs",
  },
  {
    img: "/images/home/Project management.png",
    name: "Project Management",
    job: "1598 jobs",
  },
  {
    img: "/images/home/accounts.png",
    name: "Accounts",
    job: "1598 jobs",
  },
  {
    img: "/images/home/organization.png",
    name: "Organization",
    job: "1598 jobs",
  },
  {
    img: "/images/home/networking.png",
    name: "Networking",
    job: "1598 jobs",
  },
];

export const SkillList = [
  "JavaScript",
  "Java",
  "Python",
  "C#",
  "C++",
  "Ruby",
  "Swift",
  "Objective-C",
  "PHP",
  "HTML",
  "CSS",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "plumber",
  "Express.js",
  "Django",
  "Flask",
  "Spring",
  "Ruby on Rails",
  "ASP.NET",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "SQL Server",
  "Git",
  "GitHub",
  "GitLab",
  "Jira",
  "Confluence",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "Docker",
  "Kubernetes",
  "Linux",
  "Windows",
  "iOS",
  "Android",
  "RESTful APIs",
  "GraphQL",
  "Redux",
  "VueX",
  "Webpack",
  "Jenkins",
  "Travis CI",
  "Agile",
  "Scrum",
  "Kanban",
  "UX/UI Design",
  "Photoshop",
  "Sketch",
  "Figma",
  "Adobe XD",
  "Wireframing",
  "Prototyping",
  "Machine Learning",
  "Data Science",
  "TensorFlow",
  "PyTorch",
  "NLP (Natural Language Processing)",
  "Blockchain",
  "Smart Contracts",
  "Cybersecurity",
  "Penetration Testing",
  "Network Administration",
  "DevOps",
  "Site Reliability Engineering (SRE)",
  "QA Testing",
  "Selenium",
  "JIRA",
  "Postman",
  "REST Assured",
  "Communication Skills",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Adaptability",
  "Creativity",
  "Leadership",
  "Teamwork",
  "Project Management",
  "Customer Service",
  "Sales",
  "Marketing",
  "Negotiation",
  "Financial Analysis",
  "Data Analysis",
  "Research",
  "Public Speaking",
  "Event Planning",
  "Writing",
  "Editing",
  "Multilingualism",
  "Translation",
  "Teaching",
  "Training",
  "Mentoring",
  "Coaching",
  "Human Resources",
  "Recruitment",
  "Employee Relations",
  "Conflict Resolution",
  "Health and Safety",
  "Quality Control",
  "Manufacturing",
  "Supply Chain Management",
  "Logistics",
  "Retail",
  "Hospitality",
  "Culinary Arts",
  "Graphic Design",
  "Video Production",
  "Photography",
  "Fashion Design",
  "Interior Design",
  "Architecture",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Environmental Science",
  "Meteorology",
  "Agriculture",
  "Forestry",
  "Veterinary Medicine",
  "Pharmacy",
  "Nursing",
  "Medicine",
  "Dentistry",
  "Physical Therapy",
  "Psychology",
  "Social Work",
  "Counseling",
  "Law",
  "Legal Research",
  "Paralegal",
  "Investment Banking",
  "Financial Planning",
  "Actuarial Science",
  "Real Estate",
  "Insurance",
  "Information Security",
  "System Administration",
  "Artificial Intelligence",
  "Virtual Reality",
  "Augmented Reality",
  "Robotics",
  "Biomedical Engineering",
  "Renewable Energy",
  "Astronomy",
  "Space Exploration",
  "Geology",
  "Paleontology",
  "Anthropology",
  "Sociology",
  "Political Science",
  "Economics",
  "International Relations",
  "History",
  "Archaeology",
  "Philosophy",
  "Religious Studies",
  "Linguistics",
  "Literature",
  "Music",
  "Performing Arts",
  "Sports",
  "Fitness Training",
  "Yoga Instruction",
  "Dance",
  "Gaming",
  "Programming",
  "Database Administration",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Computing",
  "Quality Assurance",
  "Technical Writing",
  "Editing and Publishing",
  "Content Creation",
  "SEO (Search Engine Optimization)",
  "Digital Marketing",
  "Social Media Management",
  "E-commerce",
  "Data Entry",
  "Administrative Support",
  "Virtual Assistance",
  "Education",
  "Research and Development",
  "Public Relations",
  "Nonprofit Management",
  "Fundraising",
  "Event Management",
  "Tourism",
  "Healthcare Administration",
  "Pharmaceuticals",
  "Biomedical Research",
  "Chemical Research",
  "Environmental Research",
  "Market Research",
  "Laboratory Techniques",
  "Manufacturing Operations",
  "Supply Chain",
  "Logistics Management",
  "Retail Management",
  "Customer Relationship Management",
  "Hospitality Management",
  "Restaurant Management",
  "Public Health",
  "Epidemiology",
  "Nutrition",
  "Fitness Instruction",
  "Social Media Marketing",
  "Content Strategy",
  "Brand Management",
  "Digital Advertising",
  "Market Analysis",
  "Salesforce Administration",
  "Data Warehousing",
  "Business Analysis",
  "Customer Relationship Management (CRM)",
  "Risk Management",
  "Financial Planning and Analysis (FP&A)",
  "Taxation",
  "Audit and Compliance",
  "Contract Management",
  "Legal Writing",
  "Intellectual Property Law",
  "Corporate Law",
  "Labor Law",
  "Family Law",
  "International Law",
  "Patent Law",
  "Legal Research and Writing",
  "Mental Health Counseling",
  "School Counseling",
  "Career Counseling",
  "Social Services",
  "Public Administration",
  "Government Affairs",
  "Public Policy",
  "Political Campaigning",
  "Foreign Policy",
  "Diplomacy",
  "International Development",
  "Interpreting",
  "Language Teaching",
  "Curriculum Development",
  "Educational Technology",
  "Online Teaching",
  "Adult Education",
  "Corporate Training",
  "Technical Training",
  "Instructional Design",
  "Learning and Development",
  "Employee Training",
  "Safety Training",
  "Operations Management",
  "Process Improvement",
  "Six Sigma",
  "Lean Manufacturing",
  "Supply Chain Optimization",
  "Inventory Management",
  "Retail Merchandising",
  "Visual Merchandising",
  "Store Management",
  "Retail Buying",
  "E-commerce Management",
  "Textile Design",
  "Merchandising",
  "Pattern Making",
  "Technical Drawing",
  "Sustainable Fashion",
  "Space Planning",
  "Furniture Design",
  "3D Rendering",
  "Architectural Design",
  "Building Information Modeling (BIM)",
  "Urban Planning",
  "Landscape Architecture",
  "Construction Management",
  "Structural Engineering",
  "Geotechnical Engineering",
  "Environmental Engineering",
  "Materials Science",
  "Renewable",
  "Wind Energy",
  "Solar Energy",
  "Astrophysics",
];

export const telCode = [
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    code: "UK",
    dial_code: "+44",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    code: "US",
    dial_code: "+1",
  },
  {
    name: "India",
    flag: "🇮🇳",
    code: "IN",
    dial_code: "+91",
  },
  {
    name: "Zimbabwe",
    flag: "🇿🇼",
    code: "ZW",
    dial_code: "+263",
  },
  {
    name: "Zambia",
    flag: "🇿🇲",
    code: "ZM",
    dial_code: "+260",
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    code: "ZA",
    dial_code: "+27",
  },

  {
    name: "Afghanistan",
    flag: "🇦🇫",
    code: "AF",
    dial_code: "+93",
  },
  {
    name: "Åland Islands",
    flag: "🇦🇽",
    code: "AX",
    dial_code: "+358",
  },
  {
    name: "Albania",
    flag: "🇦🇱",
    code: "AL",
    dial_code: "+355",
  },
  {
    name: "Algeria",
    flag: "🇩🇿",
    code: "DZ",
    dial_code: "+213",
  },
  {
    name: "American Samoa",
    flag: "🇦🇸",
    code: "AS",
    dial_code: "+1684",
  },
  {
    name: "Andorra",
    flag: "🇦🇩",
    code: "AD",
    dial_code: "+376",
  },
  {
    name: "Angola",
    flag: "🇦🇴",
    code: "AO",
    dial_code: "+244",
  },
  {
    name: "Anguilla",
    flag: "🇦🇮",
    code: "AI",
    dial_code: "+1264",
  },
  {
    name: "Antarctica",
    flag: "🇦🇶",
    code: "AQ",
    dial_code: "+672",
  },
  {
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    code: "AG",
    dial_code: "+1268",
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    code: "AR",
    dial_code: "+54",
  },
  {
    name: "Armenia",
    flag: "🇦🇲",
    code: "AM",
    dial_code: "+374",
  },
  {
    name: "Aruba",
    flag: "🇦🇼",
    code: "AW",
    dial_code: "+297",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    code: "AU",
    dial_code: "+61",
  },
  {
    name: "Austria",
    flag: "🇦🇹",
    code: "AT",
    dial_code: "+43",
  },
  {
    name: "Azerbaijan",
    flag: "🇦🇿",
    code: "AZ",
    dial_code: "+994",
  },
  {
    name: "Bahamas",
    flag: "🇧🇸",
    code: "BS",
    dial_code: "+1242",
  },
  {
    name: "Bahrain",
    flag: "🇧🇭",
    code: "BH",
    dial_code: "+973",
  },
  {
    name: "Bangladesh",
    flag: "🇧🇩",
    code: "BD",
    dial_code: "+880",
  },
  {
    name: "Barbados",
    flag: "🇧🇧",
    code: "BB",
    dial_code: "+1246",
  },
  {
    name: "Belarus",
    flag: "🇧🇾",
    code: "BY",
    dial_code: "+375",
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    code: "BE",
    dial_code: "+32",
  },
  {
    name: "Belize",
    flag: "🇧🇿",
    code: "BZ",
    dial_code: "+501",
  },
  {
    name: "Benin",
    flag: "🇧🇯",
    code: "BJ",
    dial_code: "+229",
  },
  {
    name: "Bermuda",
    flag: "🇧🇲",
    code: "BM",
    dial_code: "+1441",
  },
  {
    name: "Bhutan",
    flag: "🇧🇹",
    code: "BT",
    dial_code: "+975",
  },
  {
    name: "Bolivia, Plurinational State of bolivia",
    flag: "🇧🇴",
    code: "BO",
    dial_code: "+591",
  },
  {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    code: "BA",
    dial_code: "+387",
  },
  {
    name: "Botswana",
    flag: "🇧🇼",
    code: "BW",
    dial_code: "+267",
  },
  {
    name: "Bouvet Island",
    flag: "🇧🇻",
    code: "BV",
    dial_code: "+47",
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    code: "BR",
    dial_code: "+55",
  },
  {
    name: "British Indian Ocean Territory",
    flag: "🇮🇴",
    code: "IO",
    dial_code: "+246",
  },
  {
    name: "Brunei Darussalam",
    flag: "🇧🇳",
    code: "BN",
    dial_code: "+673",
  },
  {
    name: "Bulgaria",
    flag: "🇧🇬",
    code: "BG",
    dial_code: "+359",
  },
  {
    name: "Burkina Faso",
    flag: "🇧🇫",
    code: "BF",
    dial_code: "+226",
  },
  {
    name: "Burundi",
    flag: "🇧🇮",
    code: "BI",
    dial_code: "+257",
  },
  {
    name: "Cambodia",
    flag: "🇰🇭",
    code: "KH",
    dial_code: "+855",
  },
  {
    name: "Cameroon",
    flag: "🇨🇲",
    code: "CM",
    dial_code: "+237",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    code: "CA",
    dial_code: "+1",
  },
  {
    name: "Cape Verde",
    flag: "🇨🇻",
    code: "CV",
    dial_code: "+238",
  },
  {
    name: "Cayman Islands",
    flag: "🇰🇾",
    code: "KY",
    dial_code: "+345",
  },
  {
    name: "Central African Republic",
    flag: "🇨🇫",
    code: "CF",
    dial_code: "+236",
  },
  {
    name: "Chad",
    flag: "🇹🇩",
    code: "TD",
    dial_code: "+235",
  },
  {
    name: "Chile",
    flag: "🇨🇱",
    code: "CL",
    dial_code: "+56",
  },
  {
    name: "China",
    flag: "🇨🇳",
    code: "CN",
    dial_code: "+86",
  },
  {
    name: "Christmas Island",
    flag: "🇨🇽",
    code: "CX",
    dial_code: "+61",
  },
  {
    name: "Cocos (Keeling) Islands",
    flag: "🇨🇨",
    code: "CC",
    dial_code: "+61",
  },
  {
    name: "Colombia",
    flag: "🇨🇴",
    code: "CO",
    dial_code: "+57",
  },
  {
    name: "Comoros",
    flag: "🇰🇲",
    code: "KM",
    dial_code: "+269",
  },
  {
    name: "Congo",
    flag: "🇨🇬",
    code: "CG",
    dial_code: "+242",
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    flag: "🇨🇩",
    code: "CD",
    dial_code: "+243",
  },
  {
    name: "Cook Islands",
    flag: "🇨🇰",
    code: "CK",
    dial_code: "+682",
  },
  {
    name: "Costa Rica",
    flag: "🇨🇷",
    code: "CR",
    dial_code: "+506",
  },
  {
    name: "Cote d'Ivoire",
    flag: "🇨🇮",
    code: "CI",
    dial_code: "+225",
  },
  {
    name: "Croatia",
    flag: "🇭🇷",
    code: "HR",
    dial_code: "+385",
  },
  {
    name: "Cuba",
    flag: "🇨🇺",
    code: "CU",
    dial_code: "+53",
  },
  {
    name: "Cyprus",
    flag: "🇨🇾",
    code: "CY",
    dial_code: "+357",
  },
  {
    name: "Czech Republic",
    flag: "🇨🇿",
    code: "CZ",
    dial_code: "+420",
  },
  {
    name: "Denmark",
    flag: "🇩🇰",
    code: "DK",
    dial_code: "+45",
  },
  {
    name: "Djibouti",
    flag: "🇩🇯",
    code: "DJ",
    dial_code: "+253",
  },
  {
    name: "Dominica",
    flag: "🇩🇲",
    code: "DM",
    dial_code: "+1767",
  },
  {
    name: "Dominican Republic",
    flag: "🇩🇴",
    code: "DO",
    dial_code: "+1849",
  },
  {
    name: "Ecuador",
    flag: "🇪🇨",
    code: "EC",
    dial_code: "+593",
  },
  {
    name: "Egypt",
    flag: "🇪🇬",
    code: "EG",
    dial_code: "+20",
  },
  {
    name: "El Salvador",
    flag: "🇸🇻",
    code: "SV",
    dial_code: "+503",
  },
  {
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    code: "GQ",
    dial_code: "+240",
  },
  {
    name: "Eritrea",
    flag: "🇪🇷",
    code: "ER",
    dial_code: "+291",
  },
  {
    name: "Estonia",
    flag: "🇪🇪",
    code: "EE",
    dial_code: "+372",
  },
  {
    name: "Ethiopia",
    flag: "🇪🇹",
    code: "ET",
    dial_code: "+251",
  },
  {
    name: "Falkland Islands (Malvinas)",
    flag: "🇫🇰",
    code: "FK",
    dial_code: "+500",
  },
  {
    name: "Faroe Islands",
    flag: "🇫🇴",
    code: "FO",
    dial_code: "+298",
  },
  {
    name: "Fiji",
    flag: "🇫🇯",
    code: "FJ",
    dial_code: "+679",
  },
  {
    name: "Finland",
    flag: "🇫🇮",
    code: "FI",
    dial_code: "+358",
  },
  {
    name: "France",
    flag: "🇫🇷",
    code: "FR",
    dial_code: "+33",
  },
  {
    name: "French Guiana",
    flag: "🇬🇫",
    code: "GF",
    dial_code: "+594",
  },
  {
    name: "French Polynesia",
    flag: "🇵🇫",
    code: "PF",
    dial_code: "+689",
  },
  {
    name: "French Southern Territories",
    flag: "🇹🇫",
    code: "TF",
    dial_code: "+262",
  },
  {
    name: "Gabon",
    flag: "🇬🇦",
    code: "GA",
    dial_code: "+241",
  },
  {
    name: "Gambia",
    flag: "🇬🇲",
    code: "GM",
    dial_code: "+220",
  },
  {
    name: "Georgia",
    flag: "🇬🇪",
    code: "GE",
    dial_code: "+995",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    code: "DE",
    dial_code: "+49",
  },
  {
    name: "Ghana",
    flag: "🇬🇭",
    code: "GH",
    dial_code: "+233",
  },
  {
    name: "Gibraltar",
    flag: "🇬🇮",
    code: "GI",
    dial_code: "+350",
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    code: "GR",
    dial_code: "+30",
  },
  {
    name: "Greenland",
    flag: "🇬🇱",
    code: "GL",
    dial_code: "+299",
  },
  {
    name: "Grenada",
    flag: "🇬🇩",
    code: "GD",
    dial_code: "+1473",
  },
  {
    name: "Guadeloupe",
    flag: "🇬🇵",
    code: "GP",
    dial_code: "+590",
  },
  {
    name: "Guam",
    flag: "🇬🇺",
    code: "GU",
    dial_code: "+1671",
  },
  {
    name: "Guatemala",
    flag: "🇬🇹",
    code: "GT",
    dial_code: "+502",
  },
  {
    name: "Guernsey",
    flag: "🇬🇬",
    code: "GG",
    dial_code: "+44",
  },
  {
    name: "Guinea",
    flag: "🇬🇳",
    code: "GN",
    dial_code: "+224",
  },
  {
    name: "Guinea-Bissau",
    flag: "🇬🇼",
    code: "GW",
    dial_code: "+245",
  },
  {
    name: "Guyana",
    flag: "🇬🇾",
    code: "GY",
    dial_code: "+592",
  },
  {
    name: "Haiti",
    flag: "🇭🇹",
    code: "HT",
    dial_code: "+509",
  },
  {
    name: "Heard Island and Mcdonald Islands",
    flag: "🇭🇲",
    code: "HM",
    dial_code: "+672",
  },
  {
    name: "Holy See (Vatican City State)",
    flag: "🇻🇦",
    code: "VA",
    dial_code: "+379",
  },
  {
    name: "Honduras",
    flag: "🇭🇳",
    code: "HN",
    dial_code: "+504",
  },
  {
    name: "Hong Kong",
    flag: "🇭🇰",
    code: "HK",
    dial_code: "+852",
  },
  {
    name: "Hungary",
    flag: "🇭🇺",
    code: "HU",
    dial_code: "+36",
  },
  {
    name: "Iceland",
    flag: "🇮🇸",
    code: "IS",
    dial_code: "+354",
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    code: "ID",
    dial_code: "+62",
  },
  {
    name: "Iran, Islamic Republic of Persian Gulf",
    flag: "🇮🇷",
    code: "IR",
    dial_code: "+98",
  },
  {
    name: "Iraq",
    flag: "🇮🇶",
    code: "IQ",
    dial_code: "+964",
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    code: "IE",
    dial_code: "+353",
  },
  {
    name: "Isle of Man",
    flag: "🇮🇲",
    code: "IM",
    dial_code: "+44",
  },
  {
    name: "Israel",
    flag: "🇮🇱",
    code: "IL",
    dial_code: "+972",
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    code: "IT",
    dial_code: "+39",
  },
  {
    name: "Jamaica",
    flag: "🇯🇲",
    code: "JM",
    dial_code: "+1876",
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    code: "JP",
    dial_code: "+81",
  },
  {
    name: "Jersey",
    flag: "🇯🇪",
    code: "JE",
    dial_code: "+44",
  },
  {
    name: "Jordan",
    flag: "🇯🇴",
    code: "JO",
    dial_code: "+962",
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
    code: "KZ",
    dial_code: "+7",
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    code: "KE",
    dial_code: "+254",
  },
  {
    name: "Kiribati",
    flag: "🇰🇮",
    code: "KI",
    dial_code: "+686",
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    flag: "🇰🇵",
    code: "KP",
    dial_code: "+850",
  },
  {
    name: "Korea, Republic of South Korea",
    flag: "🇰🇷",
    code: "KR",
    dial_code: "+82",
  },
  {
    name: "Kosovo",
    flag: "🇽🇰",
    code: "XK",
    dial_code: "+383",
  },
  {
    name: "Kuwait",
    flag: "🇰🇼",
    code: "KW",
    dial_code: "+965",
  },
  {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    code: "KG",
    dial_code: "+996",
  },
  {
    name: "Laos",
    flag: "🇱🇦",
    code: "LA",
    dial_code: "+856",
  },
  {
    name: "Latvia",
    flag: "🇱🇻",
    code: "LV",
    dial_code: "+371",
  },
  {
    name: "Lebanon",
    flag: "🇱🇧",
    code: "LB",
    dial_code: "+961",
  },
  {
    name: "Lesotho",
    flag: "🇱🇸",
    code: "LS",
    dial_code: "+266",
  },
  {
    name: "Liberia",
    flag: "🇱🇷",
    code: "LR",
    dial_code: "+231",
  },
  {
    name: "Libyan Arab Jamahiriya",
    flag: "🇱🇾",
    code: "LY",
    dial_code: "+218",
  },
  {
    name: "Liechtenstein",
    flag: "🇱🇮",
    code: "LI",
    dial_code: "+423",
  },
  {
    name: "Lithuania",
    flag: "🇱🇹",
    code: "LT",
    dial_code: "+370",
  },
  {
    name: "Luxembourg",
    flag: "🇱🇺",
    code: "LU",
    dial_code: "+352",
  },
  {
    name: "Macao",
    flag: "🇲🇴",
    code: "MO",
    dial_code: "+853",
  },
  {
    name: "Macedonia",
    flag: "🇲🇰",
    code: "MK",
    dial_code: "+389",
  },
  {
    name: "Madagascar",
    flag: "🇲🇬",
    code: "MG",
    dial_code: "+261",
  },
  {
    name: "Malawi",
    flag: "🇲🇼",
    code: "MW",
    dial_code: "+265",
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    code: "MY",
    dial_code: "+60",
  },
  {
    name: "Maldives",
    flag: "🇲🇻",
    code: "MV",
    dial_code: "+960",
  },
  {
    name: "Mali",
    flag: "🇲🇱",
    code: "ML",
    dial_code: "+223",
  },
  {
    name: "Malta",
    flag: "🇲🇹",
    code: "MT",
    dial_code: "+356",
  },
  {
    name: "Marshall Islands",
    flag: "🇲🇭",
    code: "MH",
    dial_code: "+692",
  },
  {
    name: "Martinique",
    flag: "🇲🇶",
    code: "MQ",
    dial_code: "+596",
  },
  {
    name: "Mauritania",
    flag: "🇲🇷",
    code: "MR",
    dial_code: "+222",
  },
  {
    name: "Mauritius",
    flag: "🇲🇺",
    code: "MU",
    dial_code: "+230",
  },
  {
    name: "Mayotte",
    flag: "🇾🇹",
    code: "YT",
    dial_code: "+262",
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    code: "MX",
    dial_code: "+52",
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    flag: "🇫🇲",
    code: "FM",
    dial_code: "+691",
  },
  {
    name: "Moldova",
    flag: "🇲🇩",
    code: "MD",
    dial_code: "+373",
  },
  {
    name: "Monaco",
    flag: "🇲🇨",
    code: "MC",
    dial_code: "+377",
  },
  {
    name: "Mongolia",
    flag: "🇲🇳",
    code: "MN",
    dial_code: "+976",
  },
  {
    name: "Montenegro",
    flag: "🇲🇪",
    code: "ME",
    dial_code: "+382",
  },
  {
    name: "Montserrat",
    flag: "🇲🇸",
    code: "MS",
    dial_code: "+1664",
  },
  {
    name: "Morocco",
    flag: "🇲🇦",
    code: "MA",
    dial_code: "+212",
  },
  {
    name: "Mozambique",
    flag: "🇲🇿",
    code: "MZ",
    dial_code: "+258",
  },
  {
    name: "Myanmar",
    flag: "🇲🇲",
    code: "MM",
    dial_code: "+95",
  },
  {
    name: "Namibia",
    flag: "🇳🇦",
    code: "NA",
    dial_code: "+264",
  },
  {
    name: "Nauru",
    flag: "🇳🇷",
    code: "NR",
    dial_code: "+674",
  },
  {
    name: "Nepal",
    flag: "🇳🇵",
    code: "NP",
    dial_code: "+977",
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    code: "NL",
    dial_code: "+31",
  },
  {
    name: "Netherlands Antilles",
    flag: "",
    code: "AN",
    dial_code: "+599",
  },
  {
    name: "New Caledonia",
    flag: "🇳🇨",
    code: "NC",
    dial_code: "+687",
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    code: "NZ",
    dial_code: "+64",
  },
  {
    name: "Nicaragua",
    flag: "🇳🇮",
    code: "NI",
    dial_code: "+505",
  },
  {
    name: "Niger",
    flag: "🇳🇪",
    code: "NE",
    dial_code: "+227",
  },
  {
    name: "Nigeria",
    flag: "🇳🇬",
    code: "NG",
    dial_code: "+234",
  },
  {
    name: "Niue",
    flag: "🇳🇺",
    code: "NU",
    dial_code: "+683",
  },
  {
    name: "Norfolk Island",
    flag: "🇳🇫",
    code: "NF",
    dial_code: "+672",
  },
  {
    name: "Northern Mariana Islands",
    flag: "🇲🇵",
    code: "MP",
    dial_code: "+1670",
  },
  {
    name: "Norway",
    flag: "🇳🇴",
    code: "NO",
    dial_code: "+47",
  },
  {
    name: "Oman",
    flag: "🇴🇲",
    code: "OM",
    dial_code: "+968",
  },
  {
    name: "Pakistan",
    flag: "🇵🇰",
    code: "PK",
    dial_code: "+92",
  },
  {
    name: "Palau",
    flag: "🇵🇼",
    code: "PW",
    dial_code: "+680",
  },
  {
    name: "Palestinian Territory, Occupied",
    flag: "🇵🇸",
    code: "PS",
    dial_code: "+970",
  },
  {
    name: "Panama",
    flag: "🇵🇦",
    code: "PA",
    dial_code: "+507",
  },
  {
    name: "Papua New Guinea",
    flag: "🇵🇬",
    code: "PG",
    dial_code: "+675",
  },
  {
    name: "Paraguay",
    flag: "🇵🇾",
    code: "PY",
    dial_code: "+595",
  },
  {
    name: "Peru",
    flag: "🇵🇪",
    code: "PE",
    dial_code: "+51",
  },
  {
    name: "Philippines",
    flag: "🇵🇭",
    code: "PH",
    dial_code: "+63",
  },
  {
    name: "Pitcairn",
    flag: "🇵🇳",
    code: "PN",
    dial_code: "+64",
  },
  {
    name: "Poland",
    flag: "🇵🇱",
    code: "PL",
    dial_code: "+48",
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    code: "PT",
    dial_code: "+351",
  },
  {
    name: "Puerto Rico",
    flag: "🇵🇷",
    code: "PR",
    dial_code: "+1939",
  },
  {
    name: "Qatar",
    flag: "🇶🇦",
    code: "QA",
    dial_code: "+974",
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    code: "RO",
    dial_code: "+40",
  },
  {
    name: "Russia",
    flag: "🇷🇺",
    code: "RU",
    dial_code: "+7",
  },
  {
    name: "Rwanda",
    flag: "🇷🇼",
    code: "RW",
    dial_code: "+250",
  },
  {
    name: "Reunion",
    flag: "🇷🇪",
    code: "RE",
    dial_code: "+262",
  },
  {
    name: "Saint Barthelemy",
    flag: "🇧🇱",
    code: "BL",
    dial_code: "+590",
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    flag: "🇸🇭",
    code: "SH",
    dial_code: "+290",
  },
  {
    name: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    code: "KN",
    dial_code: "+1869",
  },
  {
    name: "Saint Lucia",
    flag: "🇱🇨",
    code: "LC",
    dial_code: "+1758",
  },
  {
    name: "Saint Martin",
    flag: "🇲🇫",
    code: "MF",
    dial_code: "+590",
  },
  {
    name: "Saint Pierre and Miquelon",
    flag: "🇵🇲",
    code: "PM",
    dial_code: "+508",
  },
  {
    name: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    code: "VC",
    dial_code: "+1784",
  },
  {
    name: "Samoa",
    flag: "🇼🇸",
    code: "WS",
    dial_code: "+685",
  },
  {
    name: "San Marino",
    flag: "🇸🇲",
    code: "SM",
    dial_code: "+378",
  },
  {
    name: "Sao Tome and Principe",
    flag: "🇸🇹",
    code: "ST",
    dial_code: "+239",
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    code: "SA",
    dial_code: "+966",
  },
  {
    name: "Senegal",
    flag: "🇸🇳",
    code: "SN",
    dial_code: "+221",
  },
  {
    name: "Serbia",
    flag: "🇷🇸",
    code: "RS",
    dial_code: "+381",
  },
  {
    name: "Seychelles",
    flag: "🇸🇨",
    code: "SC",
    dial_code: "+248",
  },
  {
    name: "Sierra Leone",
    flag: "🇸🇱",
    code: "SL",
    dial_code: "+232",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    code: "SG",
    dial_code: "+65",
  },
  {
    name: "Slovakia",
    flag: "🇸🇰",
    code: "SK",
    dial_code: "+421",
  },
  {
    name: "Slovenia",
    flag: "🇸🇮",
    code: "SI",
    dial_code: "+386",
  },
  {
    name: "Solomon Islands",
    flag: "🇸🇧",
    code: "SB",
    dial_code: "+677",
  },
  {
    name: "Somalia",
    flag: "🇸🇴",
    code: "SO",
    dial_code: "+252",
  },

  {
    name: "South Sudan",
    flag: "🇸🇸",
    code: "SS",
    dial_code: "+211",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    flag: "🇬🇸",
    code: "GS",
    dial_code: "+500",
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    code: "ES",
    dial_code: "+34",
  },
  {
    name: "Sri Lanka",
    flag: "🇱🇰",
    code: "LK",
    dial_code: "+94",
  },
  {
    name: "Sudan",
    flag: "🇸🇩",
    code: "SD",
    dial_code: "+249",
  },
  {
    name: "Suriname",
    flag: "🇸🇷",
    code: "SR",
    dial_code: "+597",
  },
  {
    name: "Svalbard and Jan Mayen",
    flag: "🇸🇯",
    code: "SJ",
    dial_code: "+47",
  },
  {
    name: "Eswatini",
    flag: "🇸🇿",
    code: "SZ",
    dial_code: "+268",
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    code: "SE",
    dial_code: "+46",
  },
  {
    name: "Switzerland",
    flag: "🇨🇭",
    code: "CH",
    dial_code: "+41",
  },
  {
    name: "Syrian Arab Republic",
    flag: "🇸🇾",
    code: "SY",
    dial_code: "+963",
  },
  {
    name: "Taiwan",
    flag: "🇹🇼",
    code: "TW",
    dial_code: "+886",
  },
  {
    name: "Tajikistan",
    flag: "🇹🇯",
    code: "TJ",
    dial_code: "+992",
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    flag: "🇹🇿",
    code: "TZ",
    dial_code: "+255",
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    code: "TH",
    dial_code: "+66",
  },
  {
    name: "Timor-Leste",
    flag: "🇹🇱",
    code: "TL",
    dial_code: "+670",
  },
  {
    name: "Togo",
    flag: "🇹🇬",
    code: "TG",
    dial_code: "+228",
  },
  {
    name: "Tokelau",
    flag: "🇹🇰",
    code: "TK",
    dial_code: "+690",
  },
  {
    name: "Tonga",
    flag: "🇹🇴",
    code: "TO",
    dial_code: "+676",
  },
  {
    name: "Trinidad and Tobago",
    flag: "🇹🇹",
    code: "TT",
    dial_code: "+1868",
  },
  {
    name: "Tunisia",
    flag: "🇹🇳",
    code: "TN",
    dial_code: "+216",
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    code: "TR",
    dial_code: "+90",
  },
  {
    name: "Turkmenistan",
    flag: "🇹🇲",
    code: "TM",
    dial_code: "+993",
  },
  {
    name: "Turks and Caicos Islands",
    flag: "🇹🇨",
    code: "TC",
    dial_code: "+1649",
  },
  {
    name: "Tuvalu",
    flag: "🇹🇻",
    code: "TV",
    dial_code: "+688",
  },
  {
    name: "Uganda",
    flag: "🇺🇬",
    code: "UG",
    dial_code: "+256",
  },
  {
    name: "Ukraine",
    flag: "🇺🇦",
    code: "UA",
    dial_code: "+380",
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    code: "AE",
    dial_code: "+971",
  },

  {
    name: "Uruguay",
    flag: "🇺🇾",
    code: "UY",
    dial_code: "+598",
  },
  {
    name: "Uzbekistan",
    flag: "🇺🇿",
    code: "UZ",
    dial_code: "+998",
  },
  {
    name: "Vanuatu",
    flag: "🇻🇺",
    code: "VU",
    dial_code: "+678",
  },
  {
    name: "Venezuela, Bolivarian Republic of Venezuela",
    flag: "🇻🇪",
    code: "VE",
    dial_code: "+58",
  },
  {
    name: "Vietnam",
    flag: "🇻🇳",
    code: "VN",
    dial_code: "+84",
  },
  {
    name: "Virgin Islands, British",
    flag: "🇻🇬",
    code: "VG",
    dial_code: "+1284",
  },
  {
    name: "Virgin Islands, U.S.",
    flag: "🇻🇮",
    code: "VI",
    dial_code: "+1340",
  },
  {
    name: "Wallis and Futuna",
    flag: "🇼🇫",
    code: "WF",
    dial_code: "+681",
  },
  {
    name: "Yemen",
    flag: "🇾🇪",
    code: "YE",
    dial_code: "+967",
  },
];

export const noticePeriods = [
  { title: "15 Days or less", value: "15 days or less" },
  { title: "1 Month", value: "1 month" },
  { title: "2 Months", value: "2 months" },
  { title: "3 Months", value: "3 months" },
  { title: "More Than 3 Months", value: "more than 3 months" },
];

export const inputData = [
  {
    title: "Sort by",
    img: "/images/jobs/arw.png",
    child: ["Recommended", "Relevant", "Recently Posted"],
  },
  {
    title: "Job type",
    img: "/images/jobs/arw.png",

    child: ["pune", "mumbai", "chennai"],
  },
  {
    title: "Date posted",
    img: "/images/jobs/arw.png",
    child: ["Anytime", "Past Month", "Past Week"],
  },
  {
    title: "Industry",
    img: "/images/jobs/arw.png",
    child: [
      "Other",
      "IT/ Computers - Software",
      "Banking/ Accounting/Financial Services",
      "Internet/ E-commerce",
      "Education/ Training",
      "Entertainment/ Media/ Publishing",
      "IT/Computers - Hardware & Networking",
      "Engineering & Design",
      "FMCG",
      "Automotive/Automobile/Ancillaries",
    ],
  },
  {
    title: "Salary",
    img: "/images/jobs/arw.png",
    child: [
      "$ 0-1 Lakhs",
      "$ 0-1 Lakhs",
      "$ 0-1 Lakhs",
      "$ 0-1 Lakhs",
      "$ 0-1 Lakhs",
      "$ 0-1 Lakhs",
      "Not Specified",
    ],
  },
  {
    title: "Experience",
    img: "/images/jobs/arw.png",
    child: [
      "0-1 Years",
      "0-1 Years",
      "0-1 Years",
      "0-1 Years",
      "0-1 Years",
      "0-1 Years",
      "0-1 Years",
    ],
  },
  {
    title: "Education",
    img: "/images/jobs/arw.png",
    child: [
      "Bachelor Of Technology (B.Tech/B.E)",
      "Bachelor Of Computer Application (B.C.A)",
      "Bachelor of Design (B.Des.)",
      "Master of Science (MS/M.Sc)",
      "Masters in Technology (M.Tech/M.E)",
      "Bachelor Of Technology (B.Tech/B.E)",
      "Bachelor Of Technology (B.Tech/B.E)",
      "Bachelor Of Technology (B.Tech/B.E)",
      "Bachelor Of Technology (B.Tech/B.E)",
      "Bachelor Of Technology (B.Tech/B.E)",
    ],
  },

  {
    title: "Job mode",
    img: "/images/jobs/arw.png",
    child: [
      "On-site",
      "On-site",
      "On-site",
      "On-site",
      "On-site",
      "On-site",
      "On-site",
    ],
  },
];

export const City = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Surat",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivali",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Howrah",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Guwahati",
  "Chandigarh",
  "Solapur",
  "Hubballi-Dharwad",
  "Bareilly",
  "Moradabad",
  "Mysuru",
  "Gurgaon",
  "Aligarh",
  "Jalandhar",
  "Tiruchirappalli",
  "Bhubaneswar",
  "Salem",
  "Mira-Bhayandar",
  "Warangal",
  "Thiruvananthapuram",
  "Bhiwandi",
  "Saharanpur",
  "Guntur",
  "Amravati",
  "Bikaner",
  "Noida",
  "Jamshedpur",
  "Bhilai",
  "Cuttack",
  "Kochi",
  "Udaipur",
  "Bhavnagar",
  "Dehradun",
  "Asansol",
  "Nanded",
  "Ajmer",
  "Jamnagar",
  "Ujjain",
  "Sangli",
  "Loni",
  "Jhansi",
  "Pondicherry",
  "Nellore",
  "Jammu",
  "Belagavi",
  "Raurkela",
  "Mangaluru",
  "Tirunelveli",
  "Malegaon",
  "Gaya",
  "Tiruppur",
  "Davanagere",
  "Kozhikode",
  "Akola",
  "Kurnool",
  "Bokaro",
  "Rajahmundry",
  "Ballari",
  "Agartala",
  "Bhagalpur",
  "Latur",
  "Dhule",
  "Korba",
  "Bhilwara",
  "Brahmapur",
  "Mysuru",
  "Muzaffarpur",
  "Ahmednagar",
  "Kollam",
  "Raghunathganj",
  "Bilaspur",
  "Shahjahanpur",
  "Thrissur",
  "Alwar",
  "Kakinada",
  "Nizamabad",
  "Sagar",
  "Tumkur",
  "Hisar",
  "Rohtak",
  "Panipat",
  "Darbhanga",
  "Kharagpur",
  "Aizawl",
  "Ichalkaranji",
  "Tirupati",
  "Karnal",
  "Bathinda",
  "Rampur",
  "Shivamogga",
  "Ratlam",
  "Modinagar",
  "Durg",
  "Shillong",
  "Imphal",
  "Hapur",
  "Ranipet",
  "Anantapur",
  "Arrah",
  "Karimnagar",
  "Parbhani",
  "Etawah",
  "Bharatpur",
  "Begusarai",
  "New Delhi",
  "Chhapra",
  "Kadapa",
  "Ramagundam",
  "Pali",
  "Satna",
  "Vizianagaram",
  "Katihar",
  "Hardwar",
  "Sonipat",
  "Nagercoil",
  "Thanjavur",
  "Murwara",
  "Naihati",
  "Sambhal",
  "Nadiad",
  "Yamunanagar",
  "English Bazar",
  "Eluru",
  "Munger",
  "Panchkula",
  "Raayachuru",
  "Panvel",
  "Deoghar",
  "Ongole",
  "Nandyal",
  "Morena",
  "Bhiwani",
  "Porbandar",
  "Palakkad",
  "Anand",
  "Purnia",
  "Baharampur",
  "Barmer",
  "Morvi",
  "Orai",
  "Bahraich",
  "Sikar",
  "Vellore",
  "Alappuzha",
  "Shahjanpur",
  "Karnal",
  "Hosur",
  "Adityapur",
  "Ambernath",
  "Bhusawal",
  "Barasat",
  "Khammam",
  "Azhikode",
  "Bharatpur",
  "Kharagpur",
  "Beed",
  "Bettiah",
  "Madhyamgram",
  "Mango",
  "Kanchipuram",
  "Nehru Nagar",
  "Bhilai",
  "Deoria",
  "Bidar",
  "Tiruchengode",
  "Gangawati",
  "Suratgarh",
  "Haldia",
  "Hoskote",
  "Dibrugarh",
  "Arambagh",
  "Kalpetta",
  "Karimganj",
  "Malappuram",
  "Palwal",
  "Sangrur",
  "Unnao",
  "Palanpur",
  "Baranagar",
  "Gudivada",
  "Akot",
  "Vatakara",
  "Tenali",
  "Sirsilla",
  "Pusad",
  "Motihari",
  "Pudukkottai",
  "Guntakal",
  "Dharmavaram",
  "Jorhat",
  "Batala",
  "Jhunjhunu",
  "Chittoor",
  "Palitana",
  "Ranaghat",
  "Sambalpur",
];

export const templates = [
  {
    title: "Template1",
    imgUrl: "/images/templates/template1.png",
    index: 1,
    fontFamily: "Lato",
    themeColor: "#414042",
    formFields: ["hobbies"],
  },
  {
    title: "Template2",
    imgUrl: "/images/templates/template2.png",
    index: 2,
    fontFamily: "Barlow",
    themeColor: "#F7902B",
    formFields: ["languages"],
  },
  {
    title: "Template3",
    imgUrl: "/images/templates/template3.png",
    index: 3,
    fontFamily: "Inter",
    themeColor: "#414042",
    formFields: ["language", "hobbies"],
  },
  {
    title: "Template4",
    imgUrl: "/images/templates/template4.png",
    index: 4,
    fontFamily: "Montserrat",
    themeColor: "#00AEEF",
    formFields: ["language", "hobbies"],
  },
  {
    title: "Template5",
    imgUrl: "/images/templates/template5.png",
    index: 5,
    fontFamily: "Kanit",
    themeColor: "#316059",
    formFields: ["language"],
  },
  {
    title: "Template6",
    imgUrl: "/images/templates/template6.png",
    index: 6,
    fontFamily: "Lato",
    themeColor: "#FFC20E",
    formFields: ["language", "hobbies"],
  },
  {
    title: "Template7",
    imgUrl: "/images/templates/template7.png",
    index: 7,
    fontFamily: "Montserrat",
    themeColor: "#0077F9",
    formFields: ["course", "hobbies", "language"],
  },
  {
    title: "Template8",
    imgUrl: "/images/templates/template8.png",
    index: 8,
    fontFamily: "Montserrat",
    themeColor: "#646464",
  },
  {
    title: "Template9",
    imgUrl: "/images/templates/template9.png",
    index: 9,
    fontFamily: "Montserrat",
    themeColor: "#FFD740",
  },
  {
    title: "Template10",
    imgUrl: "/images/templates/template10.png",
    index: 10,
    fontFamily: "Inter",
    themeColor: "#F2BE5C",
    formFields: ["course", "language", "tools"],
  },
  {
    title: "Template11",
    imgUrl: "/images/templates/template11.png",
    index: 11,
    fontFamily: "Montserrat",
    themeColor: "#E6E7E8",
    formFields: ["language", "hobbies"],
  },
  {
    title: "Template12",
    imgUrl: "/images/templates/template12.png",
    index: 12,
    fontFamily: "Lato",
    themeColor: "#0C2438",
    formFields: ["language", "hobbies"],
  },
  {
    title: "Template13",
    imgUrl: "/images/templates/template13.png",
    index: 13,
    fontFamily: "Poppins",
    themeColor: "#0E6CC2",
    formFields: ["language", "hobbies"],
  },
  {
    title: "Template14",
    imgUrl: "/images/templates/template14.png",
    index: 14,
    fontFamily: "Inter",
    themeColor: "#242424",
    formFields: ["language", "hobbies", "course"],
  },
  {
    title: "Template15",
    imgUrl: "/images/templates/template15.png",
    index: 15,
    fontFamily: "Inter",
    themeColor: "#716D6D",
    formFields: ["hobbies", "course"],
  },
  {
    title: "Template16",
    imgUrl: "/images/templates/template53.png",
    index: 16,
    fontFamily: "Inter",
    themeColor: "#545554",
    formFields: ["language"],
  },
  {
    title: "Template17",
    imgUrl: "/images/templates/template17.png",
    index: 17,
    fontFamily: "Montserrat",
    themeColor: "#D1D2D3",
    formFields: ["language", "hobbies", "course"],
  },
  {
    title: "Template18",
    imgUrl: "/images/templates/template18.png",
    index: 18,
    fontFamily: "Montserrat",
    themeColor: "#242424",
    formFields: ["language"],
  },
  {
    title: "Template19",
    imgUrl: "/images/templates/template19.png",
    index: 19,
    fontFamily: "Inter",
    themeColor: "#000000",
    formFields: ["socialLinks", "hobbies"],
  },
  {
    title: "Template20",
    imgUrl: "/images/templates/template20.png",
    index: 20,
    fontFamily: "Montserrat",
    themeColor: "#303030",
    formFields: ["hobbies", "course", "language"],
  },
  {
    title: "Template21",
    imgUrl: "/images/templates/template21.png",
    index: 21,
    fontFamily: "Montserrat",
    themeColor: "#494949",
  },
  {
    title: "Template22",
    imgUrl: "/images/templates/template22.png",
    index: 22,
    fontFamily: "Inter",
    themeColor: "#000000",
  },
  {
    title: "Template23",
    imgUrl: "/images/templates/template23.png",
    index: 23,
    fontFamily: "Inter",
    themeColor: "#000000",
  },
  {
    title: "Template24",
    imgUrl: "/images/templates/template24.png",
    index: 24,
    fontFamily: "Poppins",
    themeColor: "#FBEDE4",
  },
  {
    title: "Template25",
    imgUrl: "/images/templates/template25.png",
    index: 25,
    fontFamily: "Montserrat",
    themeColor: "#414042",
  },
  {
    title: "Template26",
    imgUrl: "/images/templates/template26.png",
    index: 26,
    fontFamily: "Montserrat",
    themeColor: "#414042",
  },
  {
    title: "Template27",
    imgUrl: "/images/templates/template27.png",
    index: 27,
    fontFamily: "Inter",
    themeColor: "#CB3122",
  },
  {
    title: "Template28",
    imgUrl: "/images/templates/template28.png",
    index: 28,
    fontFamily: "Inter",
    themeColor: "#2AB6BB",
  },
  {
    title: "Template29",
    imgUrl: "/images/templates/template29.png",
    index: 29,
    fontFamily: "Montserrat",
    themeColor: "#324955",
  },
  {
    title: "Template30",
    imgUrl: "/images/templates/template30.png",
    index: 30,
    fontFamily: "Montserrat",
    themeColor: "#0054A6",
  },
  {
    title: "Template31",
    imgUrl: "/images/templates/template31.png",
    index: 31,
    fontFamily: "Poppins",
    themeColor: "#227CFF",
  },
  {
    title: "Template32",
    imgUrl: "/images/templates/template32.png",
    index: 32,
    fontFamily: "Lato",
    themeColor: "#0072BC",
  },
  {
    title: "Template33",
    imgUrl: "/images/templates/template33.png",
    index: 33,
    fontFamily: "Kanit",
    themeColor: "#414042",
  },
  {
    title: "Template34",
    imgUrl: "/images/templates/template34.png",
    index: 34,
    fontFamily: "Poppins",
    themeColor: "#6C83B7",
  },
  {
    title: "Template35",
    imgUrl: "/images/templates/template35.png",
    index: 35,
    fontFamily: "Lato",
    themeColor: "#B3977F",
  },
  {
    title: "Template36",
    imgUrl: "/images/templates/template36.png",
    index: 36,
    fontFamily: "Lato",
    themeColor: "#F15A29",
  },
  {
    title: "Template37",
    imgUrl: "/images/templates/template37.png",
    index: 37,
    fontFamily: "Inter",
    themeColor: "#3956A3",
  },
  {
    title: "Template38",
    imgUrl: "/images/templates/template38.png",
    index: 38,
    fontFamily: "Lato",
    themeColor: "#C49A6C",
  },
  {
    title: "Template39",
    imgUrl: "/images/templates/template39.png",
    index: 39,
    fontFamily: "Lato",
    themeColor: "#030203",
  },
  {
    title: "Template40",
    imgUrl: "/images/templates/template40.png",
    index: 40,
    fontFamily: "Lato",
    themeColor: "#47484C",
  },
  {
    title: "Template41",
    imgUrl: "/images/templates/template41.png",
    index: 41,
    fontFamily: "Inter",
    themeColor: "#EDEDEE",
  },
  {
    title: "Template42",
    imgUrl: "/images/templates/template42.png",
    index: 42,
    fontFamily: "Lato",
    themeColor: "#414042",
  },
  {
    title: "Template43",
    imgUrl: "/images/templates/template43.png",
    index: 43,
    fontFamily: "Montserrat",
    themeColor: "#F9D3D0",
  },
  {
    title: "Template44",
    imgUrl: "/images/templates/template44.png",
    index: 44,
    fontFamily: "Inter",
    themeColor: "#C7EAFB",
  },
  {
    title: "Template45",
    imgUrl: "/images/templates/template45.png",
    index: 45,
    fontFamily: "Lato",
    themeColor: "#9E071C",
  },
  {
    title: "Template46",
    imgUrl: "/images/templates/template46.png",
    index: 46,
    fontFamily: "Lato",
    themeColor: "#00AEEF",
  },
  {
    title: "Template47",
    imgUrl: "/images/templates/template47.png",
    index: 47,
    fontFamily: "Poppins",
    themeColor: "#27AAE1",
    formFields: ["hobbies"],
  },
  {
    title: "Template48",
    imgUrl: "/images/templates/template48.png",
    index: 48,
    fontFamily: "Montserrat",
    themeColor: "#F7941D",
  },
  {
    title: "Template49",
    imgUrl: "/images/templates/template49.png",
    index: 49,
    fontFamily: "Poppins",
    themeColor: "#27AAE1",
  },
  {
    title: "Template50",
    imgUrl: "/images/templates/template50.png",
    index: 50,
    fontFamily: "Inter",
    themeColor: "#1C75BC",
  },
  {
    title: "Template51",
    imgUrl: "/images/templates/template51.png",
    index: 51,
    fontFamily: "Inter",
    themeColor: "#F1D61B",
  },
  {
    title: "Template52",
    imgUrl: "/images/templates/template52.png",
    index: 52,
    fontFamily: "Lato",
    themeColor: "#304A9F",
  },
  {
    title: "Template53",
    imgUrl: "/images/templates/template53.png",
    index: 53,
    fontFamily: "Montserrat",
    themeColor: "#AC5428",
  },
  {
    title: "Template54",
    imgUrl: "/images/templates/template54.png",
    index: 54,
    fontFamily: "Montserrat",
    themeColor: "#83C3C9",
  },
  {
    title: "Template55",
    imgUrl: "/images/templates/template55.png",
    index: 55,
    fontFamily: "Montserrat",
    themeColor: "#FC9206",
  },
  {
    title: "Template56",
    imgUrl: "/images/templates/template56.png",
    index: 56,
    fontFamily: "Montserrat",
    themeColor: "#56C8E2",
  },
];
export const details = [
  {
    profilePath: "/images/services/profile.png",
    firstName: "(First Name) ",
    lastName: "(Last Name) ",
    designation: "Product Designer",
    email: "Clientmailid111@gmail.com",
    mobileNumber: "+27 87661234567",
    location: "Pune",
  },
  {
    profilePath: "/images/services/profile.png",
    firstName: "(First Name) ",
    lastName: "(Last Name) ",
    designation: "Product Designer",
    email: "Clientmailid112@gmail.com",
    mobileNumber: "+27 87661234568",
    location: "Mumbai",
  },
  {
    profilePath: "/images/services/profile.png",
    firstName: "(First Name) ",
    lastName: "(Last Name) ",
    designation: "Product Designer",
    email: "Clientmailid113@gmail.com",
    mobileNumber: "+27 87661234569",
    location: "Delhi",
  },
  {
    profilePath: "/images/services/profile.png",
    firstName: "(First Name) ",
    lastName: "(Last Name) ",
    designation: "Product Designer",
    email: "Clientmailid114@gmail.com",
    mobileNumber: "+27 87661234570",
    location: "Bangalore",
  },
  {
    profilePath: "/images/services/profile.png",
    firstName: "(First Name) ",
    lastName: "(Last Name) ",
    designation: "Product Designer",
    email: "Clientmailid115@gmail.com",
    mobileNumber: "+27 87661234571",
    location: "Chennai",
  },
  {
    profilePath: "/images/services/profile.png",
    firstName: "(First Name) ",
    lastName: "(Last Name) ",
    designation: "Product Designer",
    email: "Clientmailid116@gmail.com",
    mobileNumber: "+27 87661234572",
    location: "Hyderabad",
  },
];

export const plans = [
  // {
  //   duration: "1 Day",
  //   index: 1,
  //   limit: "One-Time",
  //   price: "$ 1",
  //   amount: 1,
  //   days: 1,
  //   description: "create your first resume",
  //   features: [
  //     "AI Powered Resume Creation",
  //     "2 Resume Uploads",
  //     "Unlimited Access to 100+ Resume Templates",
  //     "Unlimited Access to Skill Assessment",
  //     "Resume transformations as per job descriptions",
  //     "2 resume Cloud storage",
  //   ],
  //   limits: {
  //     uploads: 2,
  //     download: 2,
  //     save: 2,
  //   },
  //   productName: "prod_Q4yJKFQ7PRjm3j",
  // },
  {
    duration: "7 Days",
    limit: "Basic",
    price: "$ 3",
    index: 1,
    amount: 3,
    days: 7,
    description: "create your first resume ",
    features: [
      "AI Powered Resume Creation",
      "6 Resume Uploads",
      "Unlimited Access to 100+ Resume Templates",
      "Unlimited Access to Skill Assessment",
      // "Resume transformations as per job descriptions",
      "6 resume Cloud storage",
    ],
    limits: {
      uploads: 6,
      download: 6,
      save: 6,
    },
    productName: "prod_Q4yJG2hoYMF1ge",
  },
  {
    duration: "28 Days",
    limit: "for More",
    amount: 10,
    price: "$ 10",
    days: 28,
    index: 2,
    description: "for the active job seekers",
    features: [
      "AI Powered Resume Creation",
      "20 Resume Uploads",
      "Unlimited Access to 100+ Resume Templates",
      "Unlimited Access to Skill Assessment",
      // "Resume transformations as per job descriptions",
      "20 resume Cloud storage",
    ],
    limits: {
      uploads: 20,
      download: 20,
      save: 20,
    },
    productName: "prod_Q4yJRU5temf1TO",
  },

  {
    duration: "84 Day",
    index: 3,
    limit: "Ultimate",
    price: "$ 20",
    amount: 20,
    days: 84,
    description: "create, save, repeat with ease ",
    features: [
      "AI Powered Resume Creation",
      "50 Resume Uploads",
      "Unlimited Access to 100+ Resume Templates",
      "Unlimited Access to Skill Assessment",
      // "Resume transformations as per job descriptions",
      "50 resume Cloud storage",
    ],
    limits: {
      uploads: 50,
      download: 50,
      save: 50,
    },
    productName: "prod_QMAfwF7LAwcve2",
  },

  {
    duration: "Starter",
    limit: "Plan",
    amount: 10,
    price: "$ 10",
    days: 7,
    index: 4,
    description: "For 7 Days",
    features: [
      "10 Resume Uploads",
      "40 Resume Downloads",
      "10 Clients Profile data Management",
      "Unlimited Access to 100+ Resume Templates",
      // "Resume transformations as per job descriptions",
    ],
    limits: {
      uploads: 10,
      download: 40,
      save: 40,
      clients: 10,
    },
    productName: "prod_Q4yKm4oiNLHCt0",
  },
  {
    duration: "Professional",
    limit: "Plan",
    amount: 50,
    price: "$ 50",
    days: 14,
    index: 5,
    description: "For 14 Days",
    features: [
      "50 Resume Uploads",
      "200 Resume Downloads",
      "50 Clients Profile data Management",
      "Unlimited Access to 100+ Resume Templates",
      // "Resume transformations as per job descriptions",
    ],
    limits: {
      uploads: 50,
      download: 200,
      save: 200,
      clients: 50,
    },
    productName: "prod_Q4yL0i1GFLpaZW",
  },
  {
    duration: "Premium",
    limit: "Plan",
    amount: 100,
    price: "$ 100",
    days: 28,
    index: 6,
    description: "For 28 Days",
    features: [
      "100 Resume Uploads",
      "400 Resume Downloads",
      "100 Clients Profile data Management",
      "Unlimited Access to 100+ Resume Templates",
      // "Resume transformations as per job descriptions",
    ],
    limits: {
      uploads: 100,
      download: 400,
      save: 400,
      clients: 100,
    },
    productName: "prod_Q4yK1cvFOCzcVC",
  },

  {
    duration: "Enterprise",
    limit: "Plan",
    amount: 10,
    price: "$ 10",
    days: 30,
    index: 7,
    description: "Tailored Solutions for Organizations",
    features: [
      "AI Powered Resume Creation",
      "20 Resume Uploads",
      "Unlimited Access to 100+ Resume Templates",
      "Unlimited Access to Skill Assessment",
      // "Resume transformations as per job descriptions",
      "20 resume Cloud storage",
    ],
    limits: {
      uploads: 100,
      download: 400,
      save: 400,
      clients: 100,
    },
  },
];

export const currencyMap = [
  { countryCode: "UK", currency: "GBP" }, // United Kingdom
  { countryCode: "IN", currency: "INR" }, // India
  { countryCode: "ZM", currency: "ZMW" }, // Zambia
  { countryCode: "ZW", currency: "ZWL" }, // Zimbabwe
  { countryCode: "AF", currency: "AFN" }, // Afghanistan
  { countryCode: "AL", currency: "ALL" }, // Albania
  { countryCode: "DZ", currency: "DZD" }, // Algeria
  { countryCode: "AS", currency: "USD" }, // American Samoa
  { countryCode: "AD", currency: "EUR" }, // Andorra
  { countryCode: "AO", currency: "AOA" }, // Angola
  { countryCode: "AI", currency: "XCD" }, // Anguilla
  { countryCode: "AQ", currency: "USD" }, // Antarctica
  { countryCode: "AG", currency: "XCD" }, // Antigua and Barbuda
  { countryCode: "AR", currency: "ARS" }, // Argentina
  { countryCode: "AM", currency: "AMD" }, // Armenia
  { countryCode: "AW", currency: "AWG" }, // Aruba
  { countryCode: "AU", currency: "AUD" }, // Australia
  { countryCode: "AT", currency: "EUR" }, // Austria
  { countryCode: "AZ", currency: "AZN" }, // Azerbaijan
  { countryCode: "BS", currency: "BSD" }, // Bahamas
  { countryCode: "BH", currency: "BHD" }, // Bahrain
  { countryCode: "BD", currency: "BDT" }, // Bangladesh
  { countryCode: "BB", currency: "BBD" }, // Barbados
  { countryCode: "BY", currency: "BYN" }, // Belarus
  { countryCode: "BE", currency: "EUR" }, // Belgium
  { countryCode: "BZ", currency: "BZD" }, // Belize
  { countryCode: "BJ", currency: "XOF" }, // Benin
  { countryCode: "BM", currency: "BMD" }, // Bermuda
  { countryCode: "BT", currency: "BTN" }, // Bhutan
  { countryCode: "BO", currency: "BOB" }, // Bolivia
  { countryCode: "BQ", currency: "USD" }, // Bonaire, Sint Eustatius and Saba
  { countryCode: "BA", currency: "BAM" }, // Bosnia and Herzegovina
  { countryCode: "BW", currency: "BWP" }, // Botswana
  { countryCode: "BV", currency: "NOK" }, // Bouvet Island
  { countryCode: "BR", currency: "BRL" }, // Brazil
  { countryCode: "IO", currency: "USD" }, // British Indian Ocean Territory
  { countryCode: "BN", currency: "BND" }, // Brunei Darussalam
  { countryCode: "BG", currency: "BGN" }, // Bulgaria
  { countryCode: "BF", currency: "XOF" }, // Burkina Faso
  { countryCode: "BI", currency: "BIF" }, // Burundi
  { countryCode: "CV", currency: "CVE" }, // Cabo Verde
  { countryCode: "KH", currency: "KHR" }, // Cambodia
  { countryCode: "CM", currency: "XAF" }, // Cameroon
  { countryCode: "CA", currency: "CAD" }, // Canada
  { countryCode: "KY", currency: "KYD" }, // Cayman Islands
  { countryCode: "CF", currency: "XAF" }, // Central African Republic
  { countryCode: "TD", currency: "XAF" }, // Chad
  { countryCode: "CL", currency: "CLP" }, // Chile
  { countryCode: "CN", currency: "CNY" }, // China
  { countryCode: "CX", currency: "AUD" }, // Christmas Island
  { countryCode: "CC", currency: "AUD" }, // Cocos (Keeling) Islands
  { countryCode: "CO", currency: "COP" }, // Colombia
  { countryCode: "KM", currency: "KMF" }, // Comoros
  { countryCode: "CD", currency: "CDF" }, // Congo, Democratic Republic of the
  { countryCode: "CG", currency: "XAF" }, // Congo, Republic of the
  { countryCode: "CK", currency: "NZD" }, // Cook Islands
  { countryCode: "CR", currency: "CRC" }, // Costa Rica
  { countryCode: "HR", currency: "HRK" }, // Croatia
  { countryCode: "CU", currency: "CUP" }, // Cuba
  { countryCode: "CW", currency: "ANG" }, // Curaçao
  { countryCode: "CY", currency: "EUR" }, // Cyprus
  { countryCode: "CZ", currency: "CZK" }, // Czech Republic
  { countryCode: "DK", currency: "DKK" }, // Denmark
  { countryCode: "DJ", currency: "DJF" }, // Djibouti
  { countryCode: "DM", currency: "XCD" }, // Dominica
  { countryCode: "DO", currency: "DOP" }, // Dominican Republic
  { countryCode: "EC", currency: "USD" }, // Ecuador
  { countryCode: "EG", currency: "EGP" }, // Egypt
  { countryCode: "SV", currency: "USD" }, // El Salvador
  { countryCode: "GQ", currency: "XAF" }, // Equatorial Guinea
  { countryCode: "ER", currency: "ERN" }, // Eritrea
  { countryCode: "EE", currency: "EUR" }, // Estonia
  { countryCode: "SZ", currency: "SZL" }, // Eswatini (Swaziland)
  { countryCode: "ET", currency: "ETB" }, // Ethiopia
  { countryCode: "FK", currency: "FKP" }, // Falkland Islands
  { countryCode: "FO", currency: "DKK" }, // Faroe Islands
  { countryCode: "FJ", currency: "FJD" }, // Fiji
  { countryCode: "FI", currency: "EUR" }, // Finland
  { countryCode: "FR", currency: "EUR" }, // France
  { countryCode: "GF", currency: "EUR" }, // French Guiana
  { countryCode: "PF", currency: "XPF" }, // French Polynesia
  { countryCode: "TF", currency: "EUR" }, // French Southern Territories
  { countryCode: "GA", currency: "XAF" }, // Gabon
  { countryCode: "GM", currency: "GMD" }, // Gambia
  { countryCode: "GE", currency: "GEL" }, // Georgia
  { countryCode: "DE", currency: "EUR" }, // Germany
  { countryCode: "GH", currency: "GHS" }, // Ghana
  { countryCode: "GI", currency: "GIP" }, // Gibraltar
  { countryCode: "GR", currency: "EUR" }, // Greece
  { countryCode: "GL", currency: "DKK" }, // Greenland
  { countryCode: "GD", currency: "XCD" }, // Grenada
  { countryCode: "GP", currency: "EUR" }, // Guadeloupe
  { countryCode: "GU", currency: "USD" }, // Guam
  { countryCode: "GT", currency: "GTQ" }, // Guatemala
  { countryCode: "GG", currency: "GBP" }, // Guernsey
  { countryCode: "GN", currency: "GNF" }, // Guinea
  { countryCode: "GW", currency: "XOF" }, // Guinea-Bissau
  { countryCode: "GY", currency: "GYD" }, // Guyana
  { countryCode: "HT", currency: "HTG" }, // Haiti
  { countryCode: "HM", currency: "AUD" }, // Heard and McDonald Islands
  { countryCode: "VA", currency: "EUR" }, // Holy See
  { countryCode: "HN", currency: "HNL" }, // Honduras
  { countryCode: "HK", currency: "HKD" }, // Hong Kong
  { countryCode: "HU", currency: "HUF" }, // Hungary
  { countryCode: "IS", currency: "ISK" }, // Iceland

  { countryCode: "ID", currency: "IDR" }, // Indonesia
  { countryCode: "IR", currency: "IRR" }, // Iran
  { countryCode: "IQ", currency: "IQD" }, // Iraq
  { countryCode: "IE", currency: "EUR" }, // Ireland
  { countryCode: "IM", currency: "GBP" }, // Isle of Man
  { countryCode: "IL", currency: "ILS" }, // Israel
  { countryCode: "IT", currency: "EUR" }, // Italy
  { countryCode: "CI", currency: "XOF" }, // Ivory Coast
  { countryCode: "JM", currency: "JMD" }, // Jamaica
  { countryCode: "JP", currency: "JPY" }, // Japan
  { countryCode: "JE", currency: "GBP" }, // Jersey
  { countryCode: "JO", currency: "JOD" }, // Jordan
  { countryCode: "KZ", currency: "KZT" }, // Kazakhstan
  { countryCode: "KE", currency: "KES" }, // Kenya
  { countryCode: "KI", currency: "AUD" }, // Kiribati
  { countryCode: "KW", currency: "KWD" }, // Kuwait
  { countryCode: "KG", currency: "KGS" }, // Kyrgyzstan
  { countryCode: "LA", currency: "LAK" }, // Laos
  { countryCode: "LV", currency: "EUR" }, // Latvia
  { countryCode: "LB", currency: "LBP" }, // Lebanon
  { countryCode: "LS", currency: "LSL" }, // Lesotho
  { countryCode: "LR", currency: "LRD" }, // Liberia
  { countryCode: "LY", currency: "LYD" }, // Libya
  { countryCode: "LI", currency: "CHF" }, // Liechtenstein
  { countryCode: "LT", currency: "EUR" }, // Lithuania
  { countryCode: "LU", currency: "EUR" }, // Luxembourg
  { countryCode: "MO", currency: "MOP" }, // Macau
  { countryCode: "MG", currency: "MGA" }, // Madagascar
  { countryCode: "MW", currency: "MWK" }, // Malawi
  { countryCode: "MY", currency: "MYR" }, // Malaysia
  { countryCode: "MV", currency: "MVR" }, // Maldives
  { countryCode: "ML", currency: "XOF" }, // Mali
  { countryCode: "MT", currency: "EUR" }, // Malta
  { countryCode: "MH", currency: "USD" }, // Marshall Islands
  { countryCode: "MQ", currency: "EUR" }, // Martinique
  { countryCode: "MR", currency: "MRU" }, // Mauritania
  { countryCode: "MU", currency: "MUR" }, // Mauritius
  { countryCode: "YT", currency: "EUR" }, // Mayotte
  { countryCode: "MX", currency: "MXN" }, // Mexico
  { countryCode: "FM", currency: "USD" }, // Micronesia
  { countryCode: "MD", currency: "MDL" }, // Moldova
  { countryCode: "MC", currency: "EUR" }, // Monaco
  { countryCode: "MN", currency: "MNT" }, // Mongolia
  { countryCode: "ME", currency: "EUR" }, // Montenegro
  { countryCode: "MS", currency: "XCD" }, // Montserrat
  { countryCode: "MA", currency: "MAD" }, // Morocco
  { countryCode: "MZ", currency: "MZN" }, // Mozambique
  { countryCode: "MM", currency: "MMK" }, // Myanmar
  { countryCode: "NA", currency: "NAD" }, // Namibia
  { countryCode: "NR", currency: "AUD" }, // Nauru
  { countryCode: "NP", currency: "NPR" }, // Nepal
  { countryCode: "NL", currency: "EUR" }, // Netherlands
  { countryCode: "NC", currency: "XPF" }, // New Caledonia
  { countryCode: "NZ", currency: "NZD" }, // New Zealand
  { countryCode: "NI", currency: "NIO" }, // Nicaragua
  { countryCode: "NE", currency: "XOF" }, // Niger
  { countryCode: "NG", currency: "NGN" }, // Nigeria
  { countryCode: "NU", currency: "NZD" }, // Niue
  { countryCode: "NF", currency: "AUD" }, // Norfolk Island
  { countryCode: "KP", currency: "KPW" }, // North Korea
  { countryCode: "MK", currency: "MKD" }, // North Macedonia
  { countryCode: "MP", currency: "USD" }, // Northern Mariana Islands
  { countryCode: "NO", currency: "NOK" }, // Norway
  { countryCode: "OM", currency: "OMR" }, // Oman
  { countryCode: "PK", currency: "PKR" }, // Pakistan
  { countryCode: "PW", currency: "USD" }, // Palau
  { countryCode: "PS", currency: "ILS" }, // Palestine
  { countryCode: "PA", currency: "PAB" }, // Panama
  { countryCode: "PG", currency: "PGK" }, // Papua New Guinea
  { countryCode: "PY", currency: "PYG" }, // Paraguay
  { countryCode: "PE", currency: "PEN" }, // Peru
  { countryCode: "PH", currency: "PHP" }, // Philippines
  { countryCode: "PN", currency: "NZD" }, // Pitcairn
  { countryCode: "PL", currency: "PLN" }, // Poland
  { countryCode: "PT", currency: "EUR" }, // Portugal
  { countryCode: "PR", currency: "USD" }, // Puerto Rico
  { countryCode: "QA", currency: "QAR" }, // Qatar
  { countryCode: "XK", currency: "EUR" }, // Republic of Kosovo
  { countryCode: "RE", currency: "EUR" }, // Réunion
  { countryCode: "RO", currency: "RON" }, // Romania
  { countryCode: "RU", currency: "RUB" }, // Russia
  { countryCode: "RW", currency: "RWF" }, // Rwanda
  { countryCode: "BL", currency: "EUR" }, // Saint Barthélemy
  { countryCode: "SH", currency: "SHP" }, // Saint Helena
  { countryCode: "KN", currency: "XCD" }, // Saint Kitts and Nevis
  { countryCode: "LC", currency: "XCD" }, // Saint Lucia
  { countryCode: "MF", currency: "EUR" }, // Saint Martin
  { countryCode: "PM", currency: "EUR" }, // Saint Pierre and Miquelon
  { countryCode: "VC", currency: "XCD" }, // Saint Vincent and the Grenadines
  { countryCode: "WS", currency: "WST" }, // Samoa
  { countryCode: "SM", currency: "EUR" }, // San Marino
  { countryCode: "ST", currency: "STN" }, // Sao Tome and Principe
  { countryCode: "SA", currency: "SAR" }, // Saudi Arabia
  { countryCode: "SN", currency: "XOF" }, // Senegal
  { countryCode: "RS", currency: "RSD" }, // Serbia
  { countryCode: "SC", currency: "SCR" }, // Seychelles
  { countryCode: "SL", currency: "SLL" }, // Sierra Leone
  { countryCode: "SG", currency: "SGD" }, // Singapore
  { countryCode: "SX", currency: "ANG" }, // Sint Maarten
  { countryCode: "SK", currency: "EUR" }, // Slovakia
  { countryCode: "SI", currency: "EUR" }, // Slovenia
  { countryCode: "SB", currency: "SBD" }, // Solomon Islands
  { countryCode: "SO", currency: "SOS" }, // Somalia
  { countryCode: "ZA", currency: "ZAR" }, // South Africa
  { countryCode: "GS", currency: "GBP" }, // South Georgia
  { countryCode: "KR", currency: "KRW" }, // South Korea
  { countryCode: "SS", currency: "SSP" }, // South Sudan
  { countryCode: "ES", currency: "EUR" }, // Spain
  { countryCode: "LK", currency: "LKR" }, // Sri Lanka
  { countryCode: "SD", currency: "SDG" }, // Sudan
  { countryCode: "SR", currency: "SRD" }, // Suriname
  { countryCode: "SJ", currency: "NOK" }, // Svalbard and Jan Mayen Islands
  { countryCode: "SE", currency: "SEK" }, // Sweden
  { countryCode: "CH", currency: "CHF" }, // Switzerland
  { countryCode: "SY", currency: "SYP" }, // Syria
  { countryCode: "TW", currency: "TWD" }, // Taiwan
  { countryCode: "TJ", currency: "TJS" }, // Tajikistan
  { countryCode: "TZ", currency: "TZS" }, // Tanzania
  { countryCode: "TH", currency: "THB" }, // Thailand
  { countryCode: "TL", currency: "USD" }, // Timor-Leste
  { countryCode: "TG", currency: "XOF" }, // Togo
  { countryCode: "TK", currency: "NZD" }, // Tokelau
  { countryCode: "TO", currency: "TOP" }, // Tonga
  { countryCode: "TT", currency: "TTD" }, // Trinidad and Tobago
  { countryCode: "TN", currency: "TND" }, // Tunisia
  { countryCode: "TR", currency: "TRY" }, // Turkey
  { countryCode: "TM", currency: "TMT" }, // Turkmenistan
  { countryCode: "TC", currency: "USD" }, // Turks and Caicos Islands
  { countryCode: "TV", currency: "AUD" }, // Tuvalu
  { countryCode: "UG", currency: "UGX" }, // Uganda
  { countryCode: "UA", currency: "UAH" }, // Ukraine
  { countryCode: "AE", currency: "AED" }, // United Arab Emirates
  { countryCode: "GB", currency: "GBP" }, // United Kingdom

  { countryCode: "US", currency: "USD" }, // United States
  { countryCode: "UM", currency: "USD" }, // United States Minor Outlying Islands
  { countryCode: "UY", currency: "UYU" }, // Uruguay
  { countryCode: "UZ", currency: "UZS" }, // Uzbekistan
  { countryCode: "VU", currency: "VUV" }, // Vanuatu
  { countryCode: "VE", currency: "VES" }, // Venezuela
  { countryCode: "VN", currency: "VND" }, // Vietnam
  { countryCode: "VG", currency: "USD" }, // Virgin Islands, British
  { countryCode: "VI", currency: "USD" }, // Virgin Islands, U.S.
  { countryCode: "WF", currency: "XPF" }, // Wallis and Futuna Islands
  { countryCode: "EH", currency: "MAD" }, // Western Sahara
  { countryCode: "YE", currency: "YER" }, // Yemen

];

export const jobSectorOptions = [
  { sector: "Accounting and Auditing" },
  { sector: "Aerospace and Aviation" },
  { sector: "Agriculture, Forestry, and Fishing" },
  { sector: "Architecture and Urban Planning" },
  { sector: "Arts, Design, and Creative" },
  { sector: "Automotive and Transportation" },
  { sector: "Banking and Financial Services" },
  { sector: "Biotechnology" },
  { sector: "Business and Management" },
  { sector: "Chemical Industry" },
  { sector: "Construction and Infrastructure" },
  { sector: "Consulting" },
  { sector: "Customer Service and Support" },
  { sector: "Cybersecurity" },
  { sector: "Data and Analytics" },
  { sector: "Defense and Military" },
  { sector: "E-commerce" },
  { sector: "Education and Training" },
  { sector: "Electrical and Electronics" },
  { sector: "Energy and Utilities" },
  { sector: "Engineering" },
  { sector: "Entertainment and Media" },
  { sector: "Environmental Services" },
  { sector: "Event Management" },
  { sector: "Fashion and Apparel" },
  { sector: "FMCG (Fast-Moving Consumer Goods)" },
  { sector: "Food and Beverage" },
  { sector: "Gaming and Esports" },
  { sector: "Government and Public Sector" },
  { sector: "Healthcare and Medical" },
  { sector: "Hospitality and Tourism" },
  { sector: "Human Resources" },
  { sector: "Import and Export" },
  { sector: "Information Technology (IT)" },
  { sector: "Insurance" },
  { sector: "Interior Design" },
  { sector: "International Relations and Diplomacy" },
  { sector: "Journalism and Publishing" },
  { sector: "Legal Services" },
  { sector: "Logistics and Supply Chain" },
  { sector: "Manufacturing" },
  { sector: "Marine and Maritime" },
  { sector: "Marketing and Advertising" },
  { sector: "Mechanical and Industrial" },
  { sector: "Mining and Metals" },
  { sector: "Non-Profit and NGOs" },
  { sector: "Oil, Gas, and Petroleum" },
  { sector: "Pharmaceuticals" },
  { sector: "Photography and Videography" },
  { sector: "Public Relations and Communications" },
  { sector: "Real Estate and Property Management" },
  { sector: "Retail and Wholesale" },
  { sector: "Robotics and Automation" },
  { sector: "Science and Research" },
  { sector: "Security Services" },
  { sector: "Social Services" },
  { sector: "Software and Web Development" },
  { sector: "Sports and Recreation" },
  { sector: "Telecommunications" },
  { sector: "Textile Industry" },
  { sector: "Translation and Linguistics" },
  { sector: "Transportation and Warehousing" },
  { sector: "Travel and Airlines" },
  { sector: "Waste Management" },
  { sector: "Others" }
];


export const JobCategories = [
  { value: "MNC", label: "MNC" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Supply Chain", label: "Supply Chain" },
  { value: "Fresher", label: "Fresher" },
  { value: "Banking and Finance", label: "Banking and Finance" },
  { value: "Startup", label: "Startup" },
  { value: "Remote", label: "Remote" },
  { value: "Project Manager", label: "Project Manager" },
  { value: "HR", label: "HR" },
  { value: "Design", label: "Design" },
  { value: "Others", label: "Others" }
];



export const currenciesWithIcons = [
  { name: "US Dollar", symbol: "$", icon: "usd" },
  {
    name: "Zimbabwean Dollar",
    symbol: "Z$",
    icon: "zwl"
  },
  { name: "Euro", symbol: "€", icon: "eur" },
  { name: "British Pound", symbol: "£", icon: "gbp" },
  { name: "Japanese Yen", symbol: "¥", icon: "jpy" },
  { name: "Australian Dollar", symbol: "A$", icon: "aud" },
  { name: "Canadian Dollar", symbol: "CA$", icon: "cad" },
  { name: "Swiss Franc", symbol: "CHF", icon: "chf" },
  { name: "Chinese Yuan", symbol: "CN¥", icon: "cny" },
  { name: "Swedish Krona", symbol: "kr", icon: "sek" },
  { name: "New Zealand Dollar", symbol: "NZ$", icon: "nzd" },
  { name: "Mexican Peso", symbol: "Mex$", icon: "mxn" },
  { name: "Singapore Dollar", symbol: "S$", icon: "sgd" },
  { name: "Hong Kong Dollar", symbol: "HK$", icon: "hkd" },
  { name: "Norwegian Krone", symbol: "kr", icon: "nok" },
  { name: "South Korean Won", symbol: "₩", icon: "krw" },
  { name: "Turkish Lira", symbol: "₺", icon: "try" },
  { name: "Indian Rupee", symbol: "₹", icon: "inr" },
  { name: "Brazilian Real", symbol: "R$", icon: "brl" },
  { name: "Russian Ruble", symbol: "₽", icon: "rub" },
  { name: "South African Rand", symbol: "R", icon: "zar" },
  { name: "Emirati Dirham", symbol: "د.إ", icon: "aed" },
  { name: "Saudi Riyal", symbol: "ر.س", icon: "sar" },
  { name: "Polish Złoty", symbol: "zł", icon: "pln" },
  { name: "Danish Krone", symbol: "kr", icon: "dkk" },
  { name: "Thai Baht", symbol: "฿", icon: "thb" },
  { name: "Indonesian Rupiah", symbol: "Rp", icon: "idr" },
  { name: "Malaysian Ringgit", symbol: "RM", icon: "myr" },
  { name: "Philippine Peso", symbol: "₱", icon: "php" },
  { name: "Vietnamese Đồng", symbol: "₫", icon: "vnd" },
  { name: "Egyptian Pound", symbol: "E£", icon: "egp" },
  { name: "Israeli New Shekel", symbol: "₪", icon: "ils" },
  { name: "Argentine Peso", symbol: "AR$", icon: "ars" },
  { name: "Chilean Peso", symbol: "CL$", icon: "clp" },
  { name: "Colombian Peso", symbol: "COL$", icon: "cop" },
  { name: "Peruvian Sol", symbol: "S/", icon: "pen" },
  { name: "Ukrainian Hryvnia", symbol: "₴", icon: "uah" },
  { name: "Czech Koruna", symbol: "Kč", icon: "czk" },
  { name: "Hungarian Forint", symbol: "Ft", icon: "huf" },
  { name: "Icelandic Króna", symbol: "kr", icon: "isk" },
  { name: "Croatian Kuna", symbol: "kn", icon: "hrk" },
  { name: "Romanian Leu", symbol: "lei", icon: "ron" },
  { name: "Serbian Dinar", symbol: "дин.", icon: "rsd" },
  { name: "Bulgarian Lev", symbol: "лв", icon: "bgn" },
  { name: "Kenyan Shilling", symbol: "KSh", icon: "kes" },
  { name: "Nigerian Naira", symbol: "₦", icon: "ngn" },
  { name: "Bangladeshi Taka", symbol: "৳", icon: "bdt" },
  { name: "Pakistani Rupee", symbol: "Rs", icon: "pkr" },
  { name: "Sri Lankan Rupee", symbol: "Rs", icon: "lkr" },
  { name: "Moroccan Dirham", symbol: "DH", icon: "mad" },
  { name: "Tunisian Dinar", symbol: "د.ت", icon: "tnd" },
  { name: "Algerian Dinar", symbol: "د.ج", icon: "dzd" },
  { name: "Ghanaian Cedi", symbol: "₵", icon: "ghs" },
  { name: "Ugandan Shilling", symbol: "USh", icon: "ugx" },
  { name: "Tanzanian Shilling", symbol: "TSh", icon: "tzs" },
  { name: "Costa Rican Colón", symbol: "₡", icon: "crc" },
  { name: "Uruguayan Peso", symbol: "$U", icon: "uyu" },
  { name: "Nicaraguan Córdoba", symbol: "C$", icon: "nio" },
  { name: "Dominican Peso", symbol: "RD$", icon: "dop" },
  { name: "Guatemalan Quetzal", symbol: "Q", icon: "gtq" },
  { name: "Panamanian Balboa", symbol: "B/.", icon: "pab" },
  { name: "Honduran Lempira", symbol: "L", icon: "hnl" },
  { name: "Salvadoran Colón", symbol: "₡", icon: "svc" },
  { name: "Haitian Gourde", symbol: "G", icon: "htg" },
  { name: "Belize Dollar", symbol: "BZ$", icon: "bzd" },
  { name: "Paraguayan Guaraní", symbol: "₲", icon: "pyg" },
  { name: "Bolivian Boliviano", symbol: "Bs", icon: "bob" },
  { name: "Fijian Dollar", symbol: "FJ$", icon: "fjd" },
  { name: "Malawian Kwacha", symbol: "MK", icon: "mwk" },
  { name: "Zambian Kwacha", symbol: "ZK", icon: "zmw" },
  { name: "Namibian Dollar", symbol: "N$", icon: "nad" },
  { name: "East Caribbean Dollar", symbol: "EC$", icon: "xcd" },
  { name: "CFA Franc BEAC", symbol: "FCFA", icon: "xaf" },
  { name: "CFA Franc BCEAO", symbol: "CFA", icon: "xof" },
  { name: "CFP Franc", symbol: "CFPF", icon: "xpf" },
  { name: "Mauritian Rupee", symbol: "Rs", icon: "mur" },
  { name: "Seychellois Rupee", symbol: "Rs", icon: "scr" },
  { name: "Malagasy Ariary", symbol: "Ar", icon: "mga" },
  { name: "Comorian Franc", symbol: "CF", icon: "kmf" },
  { name: "Cape Verdean Escudo", symbol: "Esc", icon: "cve" },
  { name: "Botswana Pula", symbol: "P", icon: "bwp" },
  { name: "Mauritanian Ouguiya", symbol: "UM", icon: "mru" },
  { name: "Surinamese Dollar", symbol: "$", icon: "srd" },
  { name: "Guyanese Dollar", symbol: "$", icon: "gyd" },
  { name: "Uruguayan Peso", symbol: "$U", icon: "uyu" },
  { name: "Cuban Convertible Peso", symbol: "CUC$", icon: "cuc" },
  { name: "Bahamian Dollar", symbol: "B$", icon: "bsd" },
  { name: "Barbadian Dollar", symbol: "Bds$", icon: "bbd" },
  { name: "Bermudian Dollar", symbol: "BD$", icon: "bmd" },
  { name: "Aruban Florin", symbol: "Afl.", icon: "awg" },
  { name: "Netherlands Antillean Guilder", symbol: "NAƒ", icon: "ang" },
  { name: "Trinidad and Tobago Dollar", symbol: "TT$", icon: "ttd" },
  { name: "Jamaican Dollar", symbol: "J$", icon: "jmd" },
  { name: "Trinidad and Tobago Dollar", symbol: "TT$", icon: "ttd" },
  { name: "Solomon Islands Dollar", symbol: "SI$", icon: "sbd" },
  { name: "Vanuatu Vatu", symbol: "VT", icon: "vuv" },
  { name: "Samoa Tala", symbol: "WS$", icon: "wst" },
  { name: "Tongan Pa'anga", symbol: "T$", icon: "top" },
  { name: "Central African CFA Franc", symbol: "FCFA", icon: "xaf" },
  { name: "Myanmar Kyat", symbol: "K", icon: "mmk" },
  { name: "Laotian Kip", symbol: "₭", icon: "lak" },
  { name: "Cambodian Riel", symbol: "៛", icon: "khr" },
  { name: "Bhutanese Ngultrum", symbol: "Nu.", icon: "btn" },
  { name: "Nepalese Rupee", symbol: "रू", icon: "npr" },
  { name: "Afghan Afghani", symbol: "؋", icon: "afn" },
  { name: "Falkland Islands Pound", symbol: "FK£", icon: "fkp" },
  { name: "Gibraltar Pound", symbol: "£", icon: "gip" },
  { name: "Saint Helena Pound", symbol: "£", icon: "shp" },
  { name: "Faroese Króna", symbol: "kr", icon: "fof" },
  { name: "Greenlandic Krone", symbol: "kr", icon: "glf" },
  { name: "Djiboutian Franc", symbol: "Fdj", icon: "djf" },
  { name: "Rwandan Franc", symbol: "RF", icon: "rwf" },
  { name: "Tajikistani Somoni", symbol: "SM", icon: "tjs" },
  { name: "Turkmenistan Manat", symbol: "m", icon: "tmt" },
  { name: "Uzbekistani Som", symbol: "сўм", icon: "uzs" },
  { name: "Belizean Dollar", symbol: "BZ$", icon: "bzd" },
  { name: "Dominican Peso", symbol: "RD$", icon: "dop" },
  { name: "Gibraltar Pound", symbol: "£", icon: "gip" },
  { name: "Saint Helena Pound", symbol: "£", icon: "shp" },
  { name: "Saint Kitts and Nevis Dollar", symbol: "EC$", icon: "xcd" },
  { name: "Saint Lucian Dollar", symbol: "$", icon: "xcd" },
  { name: "East Caribbean Dollar", symbol: "EC$", icon: "xcd" },
  { name: "Saint Vincent and the Grenadines Dollar", symbol: "$", icon: "xcd" },
  { name: "Cook Islands Dollar", symbol: "$", icon: "nzd" },
  { name: "Fijian Dollar", symbol: "$", icon: "fjd" },
  { name: "Solomon Islands Dollar", symbol: "$", icon: "sbd" },
  { name: "Kiribati Dollar", symbol: "$", icon: "aud" },
  { name: "Tuvaluan Dollar", symbol: "$", icon: "aud" },
  { name: "Niue Dollar", symbol: "$", icon: "nzd" },
  { name: "Tokelau Dollar", symbol: "$", icon: "nzd" },
];

export const countryCondition1 = [
  { country: 'Germany', coordinates: '51.1657° N, 10.4515° E' },
  { country: 'France', coordinates: '46.6034° N, 1.8883° E' },
  { country: 'India', coordinates: '20.5937° N, 78.9629° E' },
  { country: 'China', coordinates: '35.8617° N, 104.1954° E' },
  { country: 'Japan', coordinates: '36.2048° N, 138.2529° E' },
  { country: 'Russia', coordinates: '61.5240° N, 105.3188° E' },
  { country: 'South Korea', coordinates: '35.9078° N, 127.7669° E' },

  { country: 'Philippines', coordinates: '12.8797° N, 121.7740° E' },
  { country: 'Vietnam', coordinates: '14.0583° N, 108.2772° E' },
  { country: 'Thailand', coordinates: '15.8700° N, 100.9925° E' },
  { country: 'Bangladesh', coordinates: '23.6850° N, 90.3563° E' },
  { country: 'Myanmar', coordinates: '21.9162° N, 95.9560° E' },
  { country: 'Malaysia', coordinates: '4.2105° N, 101.9758° E' },
  { country: 'Nepal', coordinates: '28.3949° N, 84.1240° E' },
  { country: 'Sri Lanka', coordinates: '7.8731° N, 80.7718° E' },
  { country: 'Kazakhstan', coordinates: '48.0196° N, 66.9237° E' },
  { country: 'Uzbekistan', coordinates: '41.3775° N, 64.5853° E' },
  { country: 'Turkmenistan', coordinates: '38.9697° N, 59.5563° E' },
  { country: 'Kyrgyzstan', coordinates: '41.2044° N, 74.7661° E' },
  { country: 'Tajikistan', coordinates: '38.8610° N, 71.2761° E' },
  { country: 'Afghanistan', coordinates: '33.9391° N, 67.7100° E' },
  { country: 'Pakistan', coordinates: '30.3753° N, 69.3451° E' },
  { country: 'Iran', coordinates: '32.4279° N, 53.6880° E' },
  { country: 'Iraq', coordinates: '33.2232° N, 43.6793° E' },
  { country: 'Saudi Arabia', coordinates: '23.8859° N, 45.0792° E' },
  { country: 'Yemen', coordinates: '15.5527° N, 48.5164° E' },
  { country: 'Oman', coordinates: '21.4735° N, 55.9754° E' },
  { country: 'United Arab Emirates', coordinates: '23.4241° N, 53.8478° E' },
  { country: 'Qatar', coordinates: '25.3548° N, 51.1839° E' },
  { country: 'Bahrain', coordinates: '26.0667° N, 50.5577° E' },
  { country: 'Kuwait', coordinates: '29.3117° N, 47.4818° E' },
  { country: 'Jordan', coordinates: '30.5852° N, 36.2384° E' },
  { country: 'Israel', coordinates: '31.0461° N, 34.8516° E' },
  { country: 'Lebanon', coordinates: '33.8547° N, 35.8623° E' },
  { country: 'Syria', coordinates: '34.8021° N, 38.9968° E' },
  { country: 'Cyprus', coordinates: '35.1264° N, 33.4299° E' },
  { country: 'Turkey', coordinates: '38.9637° N, 35.2433° E' },
  { country: 'Greece', coordinates: '39.0742° N, 21.8243° E' },
  { country: 'Bulgaria', coordinates: '42.7339° N, 25.4858° E' },
  { country: 'Romania', coordinates: '45.9432° N, 24.9668° E' },
  { country: 'Serbia', coordinates: '44.0165° N, 21.0059° E' },
  { country: 'Hungary', coordinates: '47.1625° N, 19.5033° E' },
  { country: 'Austria', coordinates: '47.5162° N, 14.5501° E' },
  { country: 'Italy', coordinates: '41.8719° N, 12.5674° E' },
  { country: 'Switzerland', coordinates: '46.8182° N, 8.2275° E' },
  { country: 'Poland', coordinates: '51.9194° N, 19.1451° E' },
  { country: 'Czech Republic', coordinates: '49.8175° N, 15.4730° E' },
  { country: 'Slovakia', coordinates: '48.6690° N, 19.6990° E' },
  { country: 'Croatia', coordinates: '45.1000° N, 15.2000° E' },
  { country: 'Slovenia', coordinates: '46.1512° N, 14.9955° E' },
  { country: 'Bosnia and Herzegovina', coordinates: '43.9159° N, 17.6791° E' },
  { country: 'Montenegro', coordinates: '42.7087° N, 19.3744° E' },
  { country: 'Albania', coordinates: '41.1533° N, 20.1683° E' },
  { country: 'North Macedonia', coordinates: '41.6086° N, 21.7453° E' },
  { country: 'Malta', coordinates: '35.9375° N, 14.3754° E' },
  { country: 'Belarus', coordinates: '53.7098° N, 27.9534° E' },
  { country: 'Latvia', coordinates: '56.8796° N, 24.6032° E' },
  { country: 'Lithuania', coordinates: '55.1694° N, 23.8813° E' },
  { country: 'Estonia', coordinates: '58.5953° N, 25.0136° E' },
  { country: 'Ukraine', coordinates: '48.3794° N, 31.1656° E' },
  { country: 'Moldova', coordinates: '47.4116° N, 28.3699° E' },
  { country: 'Armenia', coordinates: '40.0691° N, 45.0382° E' },
  { country: 'Azerbaijan', coordinates: '40.1431° N, 47.5769° E' },
  { country: 'Georgia', coordinates: '42.3154° N, 43.3569° E' },
  { country: 'Maldives', coordinates: '3.2028° N, 73.2207° E' },

  { country: 'Uganda', coordinates: '1.3733° N, 32.2903° E' },

  { country: 'Ethiopia', coordinates: '9.1450° N, 40.4897° E' },
  { country: 'Somalia', coordinates: '5.1521° N, 46.1996° E' },
  { country: 'Djibouti', coordinates: '11.8251° N, 42.5903° E' },
  { country: 'Eritrea', coordinates: '15.1794° N, 39.7823° E' },
  { country: 'Sudan', coordinates: '12.8628° N, 30.2176° E' },
  { country: 'South Sudan', coordinates: '7.8627° N, 30.2176° E' },

  { country: 'Algeria', coordinates: '28.0339° N, 1.6596° E' },
  { country: 'Libya', coordinates: '26.3351° N, 17.2283° E' },


];

export const countryCondition2 = [
  { country: 'Indonesia', coordinates: '0.7893° S, 113.9213° E' },
  { country: 'Angola', coordinates: '11.2027° S, 17.8739° E' },
  { country: 'Zambia', coordinates: '13.1339° S, 27.8493° E' },
  { country: 'Zimbabwe', coordinates: '19.0154° S, 29.1549° E' },
  { country: 'Botswana', coordinates: '22.3285° S, 24.6849° E' },
  { country: 'Namibia', coordinates: '22.9576° S, 18.4904° E' },
  { country: 'Malawi', coordinates: '13.2543° S, 34.3015° E' },
  { country: 'Mozambique', coordinates: '18.6657° S, 35.5296° E' },
  { country: 'South Africa', coordinates: '30.5595° S, 22.9375° E' },
  { country: 'Lesotho', coordinates: '29.6099° S, 28.2336° E' },
  { country: 'Eswatini', coordinates: '26.5225° S, 31.4659° E' },
  { country: 'Rwanda', coordinates: '1.9403° S, 29.8739° E' },
  { country: 'Burundi', coordinates: '3.3731° S, 29.9189° E' },
  { country: 'Seychelles', coordinates: '4.6796° S, 55.4920° E' },
  { country: 'Mauritius', coordinates: '20.3484° S, 57.5522° E' },
  { country: 'Reunion', coordinates: '21.1151° S, 55.5364° E' },
  { country: 'Mayotte', coordinates: '12.8275° S, 45.1662° E' },
  { country: 'Madagascar', coordinates: '18.7669° S, 46.8691° E' },
  { country: 'Tanzania', coordinates: '6.3690° S, 34.8888° E' },
  { country: 'Kenya', coordinates: '0.0236° S, 37.9062° E' },
]

export const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export const CountPostingDays = (date) => {
  const postingDate = new Date(date);
  const currentDate = new Date();

  const diffInMilliseconds = currentDate - postingDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else {
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    }
  }
};

