export const COMPLAINT_CATEGORIES = [
  {
    id: "1",
    name: "Roads and Infrastructure",
    subcategories: [
      "Potholes",
      "Street Lights",
      "Drainage Issues",
      "Road Signs",
      "Bridges",
      "Sidewalks",
      "Traffic Signals",
      "Other",
    ],
  },
  {
    id: "2",
    name: "Water and Sanitation",
    subcategories: [
      "Water Supply",
      "Water Quality",
      "Sewage Issues",
      "Public Toilets",
      "Garbage Collection",
      "Drainage Blockage",
      "Other",
    ],
  },
  {
    id: "3",
    name: "Electricity",
    subcategories: [
      "Power Outage",
      "Voltage Issues",
      "Damaged Wires",
      "Billing Problems",
      "Transformer Issues",
      "Other",
    ],
  },
  {
    id: "4",
    name: "Public Safety",
    subcategories: [
      "Street Crime",
      "Traffic Violations",
      "Illegal Activities",
      "Public Nuisance",
      "Abandoned Vehicles",
      "Other",
    ],
  },
  {
    id: "5",
    name: "Environment",
    subcategories: ["Pollution", "Illegal Dumping", "Noise Complaints", "Tree Maintenance", "Public Parks", "Other"],
  },
  {
    id: "6",
    name: "Public Health",
    subcategories: ["Hospital Services", "Clinic Issues", "Disease Outbreak", "Food Safety", "Pest Control", "Other"],
  },
  {
    id: "7",
    name: "Education",
    subcategories: ["School Facilities", "Teacher Complaints", "Educational Quality", "School Transport", "Other"],
  },
  {
    id: "8",
    name: "Public Transport",
    subcategories: [
      "Bus Services",
      "Train Services",
      "Taxi Services",
      "Transport Fares",
      "Station Facilities",
      "Other",
    ],
  },
  {
    id: "9",
    name: "Government Services",
    subcategories: ["Document Processing", "Staff Behavior", "Corruption", "Service Delays", "Other"],
  },
]

export const COMPLAINT_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
]

export const COMPLAINT_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
]
