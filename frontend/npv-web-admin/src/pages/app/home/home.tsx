import React from "react";
import { CubeIcon, UserIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
// import { LineChart, PieChart, BarChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import {
  getAllProperties,
  getAllUsers,
  getApprovedProperties
} from "../../../services";
import { LinearProgress } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  iconBg
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${iconBg}`}>{icon}</div>
    </div>
  </div>
);

export const Home: React.FC = () => {
  const { data: allUsers, isLoading: usersIsLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers({ pageNumber: "0", pageSize: "1000" })
  });
  const { data: allProperties, isLoading: propertiesIsLoading } = useQuery({
    queryKey: ["allProperties"],
    queryFn: () => getAllProperties({ pageNumber: "0", pageSize: "1000" })
  });
  const { data: approvedProperties, isLoading: approvedPropertiesIsLoading } =
    useQuery({
      queryKey: ["approvedProperties"],
      queryFn: getApprovedProperties
    });

  // const storageData = [
  //   { month: "Jan", usage: 50 },
  //   { month: "Feb", usage: 70 },
  //   { month: "Mar", usage: 65 },
  //   { month: "Apr", usage: 90 },
  //   { month: "May", usage: 100 },
  //   { month: "Jun", usage: 110 }
  // ];

  // const assetLocationData = [
  //   { id: 0, value: 40, label: "Office" },
  //   { id: 1, value: 30, label: "Home" },
  //   { id: 2, value: 20, label: "Field" },
  //   { id: 3, value: 10, label: "Other" }
  // ];

  // const assetOverviewData = [
  //   { id: 0, value: 35, label: "Hardware" },
  //   { id: 1, value: 25, label: "Software" },
  //   { id: 2, value: 20, label: "Furniture" },
  //   { id: 3, value: 20, label: "Vehicles" }
  // ];

  // const recentActivityData = [
  //   { activity: "New Asset", count: 10 },
  //   { activity: "Assigned", count: 15 },
  //   { activity: "Maintenance", count: 8 },
  //   { activity: "Retired", count: 5 }
  // ];

  console.log(allProperties, allUsers);

  return (
    <div className="container mx-auto">
      {(usersIsLoading ||
        propertiesIsLoading ||
        approvedPropertiesIsLoading) && (
        <LinearProgress className="!fixed !top-0 !left-0 !w-full" />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Main column (70%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard
              title="Total Users"
              value={allUsers?.totalElements ?? "0"}
              icon={<UserIcon className="h-6 w-6 text-blue-500" />}
            />
            <SummaryCard
              title="Total Properties"
              value={allProperties?.totalElements ?? "0"}
              icon={<CubeIcon className="h-6 w-6 text-blue-500" />}
            />

            <SummaryCard
              title="Approved Properties"
              value={approvedProperties?.totalElements ?? "0"}
              icon={<CheckBadgeIcon className="h-6 w-6 text-blue-500" />}
            />
          </div>

          {/* Storage Analysis Chart */}
          {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Storage Analysis</h3>
            <div className="h-64">
              <LineChart
                xAxis={[{ data: storageData.map((item) => item.month) }]}
                series={[
                  { data: storageData.map((item) => item.usage), area: true }
                ]}
              />
            </div>
          </div> */}
        </div>

        {/* Side column (30%) */}
        {/* <div className="lg:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full">
            <h3 className="text-lg font-semibold mb-4">Asset Location</h3>
            <div className="h-64">
              <PieChart series={[{ data: assetLocationData }]} />
            </div>
          </div>
        </div> */}
      </div>

      {/* Bottom row */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Overview */}
        {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Asset Overview</h3>
          <div className="h-64">
            <PieChart
              series={[
                {
                  data: assetOverviewData,
                  innerRadius: 60,
                  outerRadius: 80,
                  paddingAngle: 2,
                  cornerRadius: 5
                }
              ]}
            />
          </div>
        </div> */}

        {/* Recent Activity */}
        {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="h-64">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: recentActivityData.map((item) => item.activity)
                }
              ]}
              series={[{ data: recentActivityData.map((item) => item.count) }]}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};
