import { LottoDashboard } from "@/components/lotto-dashboard";
import { getDashboardData } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let initialDashboard = null;

  try {
    initialDashboard = await getDashboardData();
  } catch (error) {
    initialDashboard = {
      error: error.message,
    };
  }

  return <LottoDashboard initialDashboard={initialDashboard} />;
}
