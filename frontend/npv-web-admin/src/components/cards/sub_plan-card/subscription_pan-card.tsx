import React from "react";
import { FaRegStar, FaStar, FaCrown } from "react-icons/fa";
import { SubscriptionPlan } from "../../../types";
import { Button } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/solid";
import { NAIRA } from "../../../config";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<any | null>>;
  setOpenEditModal: React.Dispatch<React.SetStateAction<any | null>>;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  setOpenDeleteModal,
  setOpenEditModal
}) => {
  const getIcon = (type: SubscriptionPlan["subscriptionType"]) => {
    switch (type) {
      case "BASIC":
        return <FaRegStar className="w-12 h-12" />;
      case "GOLD":
        return <FaStar className="w-12 h-12" />;
      case "PREMIUM":
        return <FaCrown className="w-12 h-12" />;
      default:
        return null;
    }
  };

  const getThemeColor = (type: SubscriptionPlan["subscriptionType"]) => {
    switch (type) {
      case "BASIC":
        return "!from-blue-400 !to-blue-600";
      case "GOLD":
        return "!from-yellow-400 !to-yellow-600";
      case "PREMIUM":
        return "!from-purple-400 !to-purple-600";
      default:
        return "!from-gray-400 !to-gray-600";
    }
  };

  return (
    <div
      className={`w-full min-w-80 rounded-lg overflow-hidden transition-transform hover:scale-105 border duration-300 cursor-pointer`}>
      <div
        className={`p-6 bg-gradient-to-r ${getThemeColor(plan.subscriptionType)} text-white`}>
        <div className="flex justify-between items-center mb-4">
          {getIcon(plan.subscriptionType)}
          <h2 className="text-2xl font-bold">{plan.name}</h2>
        </div>
        <p className="text-sm mb-4">{plan.description}</p>
        <div className="text-3xl font-bold mb-2">
          {NAIRA} {plan.amount?.toLocaleString()}
        </div>
        <div className="text-sm">
          {plan?.subscriptionCycle?.replace("_", " ").toLowerCase()}
        </div>
      </div>
      <div className="p-6 bg-white flex items-stretch gap-4">
        <Button
          onClick={() => setOpenEditModal(plan)}
          className={`!w-full !py-2 !px-4 !rounded !font-bold !text-white !bg-gradient-to-r ${getThemeColor(plan.subscriptionType)} hover:!opacity-90 !transition-opacity !normal-case`}>
          Edit
        </Button>
        <Button
          className="!bg-red-600 !px-3"
          onClick={() => setOpenDeleteModal(plan)}>
          <TrashIcon className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};
