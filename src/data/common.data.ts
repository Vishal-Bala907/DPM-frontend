import type { PlanCategory } from "../types/planes.types";

interface NavbarOptions {
  label: string;
  href: string;
  icon: string;
}

const navbarOptions: NavbarOptions[] = [
  {
    label: "Home",
    href: "/home",
    icon: "House",
  },
  {
    label: "Add Work",
    href: "/add-work",
    icon: "Plus",
  },
  {
    label: "View Data",
    href: "/#",
    icon: "Database",
  },
  {
    label: "Profile",
    href: "#",
    icon: "User",
  },
  {
    label: "Pricing",
    href: "/pricing",
    icon: "CircleDollarSign",
  },
];

const plansData: PlanCategory[] = [
  {
    category: "For Individuals",
    icon: "👤",
    plans: [
      {
        title: "Free",
        features: [
          { text: "Add daily work", included: true },
          { text: "View last 1 month's data", included: true },
          { text: "Edit work logs", included: false },
          { text: "Adjust work durations", included: false },
          { text: "View data for any time range", included: false },
        ],
      },
      {
        title: "Paid",
        price: "₹59/month",
        isPopular: true,
        features: [
          { text: "All Free features", included: true },
          { text: "Edit work logs", included: true },
          { text: "Adjust work durations", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
    ],
  },
  {
    category: "For Organizations",
    icon: "🏢",
    plans: [
      {
        title: "Free",
        features: [
          { text: "Add up to 4 employees", included: true },
          { text: "View 1 month's employee data", included: true },
          { text: "Unlimited employees", included: false },
          { text: "Employees get 2 daily work edit limits", included: false },
          { text: "View data for any time range", included: false },
        ],
      },
      {
        title: "Paid",
        price: "₹299/month",
        isPopular: true,
        features: [
          { text: "Unlimited employees", included: true },
          { text: "Employees get 2 daily work edit limits", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
    ],
  },
];

const detailedPricing: PlanCategory[] = [
  {
    category: "For Individuals",
    icon: "👤",
    plans: [
      {
        title: "Free",
        features: [
          { text: "Add daily work", included: true },
          { text: "View last 1 month's data", included: true },
          { text: "Edit work logs", included: false },
          { text: "Adjust work durations", included: false },
          { text: "View data for any time range", included: false },
        ],
      },
      {
        title: "Paid",
        price: "₹59/month",
        // isPopular: true,
        features: [
          { text: "All Free features", included: true },
          { text: "Edit work logs", included: true },
          { text: "Adjust work durations", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
      {
        title: "Paid",
        price: "₹300/6 month",
        savePerMonth: "₹9/ month",
        isPopular: true,
        features: [
          { text: "All Free features", included: true },
          { text: "Edit work logs", included: true },
          { text: "Adjust work durations", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
      {
        title: "Paid",
        price: "₹588/12 month",
        savePerMonth: "₹10/ month",
        // isPopular: true,
        features: [
          { text: "All Free features", included: true },
          { text: "Edit work logs", included: true },
          { text: "Adjust work durations", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
    ],
  },
  {
    category: "For Organizations",
    icon: "🏢",
    plans: [
      {
        title: "Free",
        features: [
          { text: "Add up to 4 employees", included: true },
          { text: "View 1 month's employee data", included: true },
          { text: "Unlimited employees", included: false },
          { text: "Employees get 2 daily work edit limits", included: false },
          { text: "View data for any time range", included: false },
        ],
      },
      {
        title: "Paid",
        price: "₹299/month",
        // isPopular: true,
        features: [
          { text: "Unlimited employees", included: true },
          { text: "Employees get 2 daily work edit limits", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
      {
        title: "Paid",
        price: "1600/6 month",
        savePerMonth: "₹32/ month",
        isPopular: true,
        features: [
          { text: "Unlimited employees", included: true },
          { text: "Employees get 2 daily work edit limits", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
      {
        title: "Paid",
        price: "₹300/12 month",
        savePerMonth: "₹49/ month",
        // isPopular: true,
        features: [
          { text: "Unlimited employees", included: true },
          { text: "Employees get 2 daily work edit limits", included: true },
          { text: "View data for any time range", included: true },
        ],
      },
    ],
  },
];
export { navbarOptions, plansData, detailedPricing };
