"use client";

import DashboardContainer from "../containers/DashboardContainer";

/**
 * Home Page Component
 *
 * This is the main landing page of the web application. It serves as the
 * dashboard entry point and uses the DashboardContainer to provide all
 * the business logic and data management for the dashboard view.
 *
 * The page follows the Container/Presentation pattern by delegating all
 * business logic to the DashboardContainer component, which then renders
 * the appropriate presentation component.
 *
 * @returns JSX element representing the home page with dashboard functionality
 */
export default function Home() {
  return <DashboardContainer />;
}
