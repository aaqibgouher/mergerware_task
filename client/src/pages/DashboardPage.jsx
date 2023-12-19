import * as React from "react";
import { useLocation } from "react-router-dom";
import DashbordComponent from "../components/dashboard/DashboardComponent";
import DashboardLayout from "../layouts/DashboardLayout";

const DashboardPage = () => {
  const location = useLocation();
  let current;

  if (location.pathname === "/") {
    current = "dashboard";
  } else {
    current = location.pathname.split("/")[1];
  }

  console.log(current, "from dashboard");
  const componentMapping = {
    dashboard: DashbordComponent,
  };

  const MyComponent = componentMapping[current];

  return (
    <DashboardLayout>
      <MyComponent />
    </DashboardLayout>
  );
};

export default DashboardPage;
