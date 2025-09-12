interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  title: string;
  price?: string;
  savePerMonth?: string;
  features: PlanFeature[];
  isPopular?: boolean;
}

interface PlanCategory {
  category: string;
  icon: string;
  plans: Plan[];
}

export type { PlanFeature, Plan, PlanCategory };
