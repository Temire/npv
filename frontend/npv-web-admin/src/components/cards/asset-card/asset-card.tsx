import { Button, Chip } from "@mui/material";
import { NAIRA } from "../../../config";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { generatePath, useNavigate } from "react-router-dom";
import { ApprovalStatus, IPropertyData } from "../../../types";
// import { VIEW_ASSET_URL } from "../../../utils";
import { StatusChip } from "./status-chip";
import { MANAGE_PROPERTY_URL } from "../../../utils";

export const AssetCard = ({
  asset,
  documents
}: {
  asset: IPropertyData;
  documents?: number;
}) => {
  const navigate = useNavigate();

  const viewProperty = () => {
    if (asset?.id) {
      const path = generatePath(MANAGE_PROPERTY_URL, {
        propertyId: asset?.id?.toString()
      });
      navigate(path);
    }
  };

  console.log(asset);

  return (
    <div className="border rounded-[12px] overflow-hidden transition-transform duration-300 hover:scale105 relative">
      {/* <Chip
        className="!absolute !top-2 !right-2 !z-10 !duration-500 !bg-green-600"
        label={
          <div className="flex items-center gap-2 text-white font-semibold">
            <CheckBadgeIcon className="w-4" />
            <span>Approved</span>
          </div>
        }
      /> */}
      <StatusChip status={asset?.approvalStatus as ApprovalStatus} />
      {!asset?.mainPropertyImageUrl ? (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100">
          <PhotoIcon className="w-5 text-gray-500" />
        </div>
      ) : (
        <img
          src={asset?.mainPropertyImageUrl}
          alt={asset.title || "Property"}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-3">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
          {asset?.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {asset?.propertyAddress}
        </p>
        <div className="flex items-center gap-3">
          <Chip
            label={asset?.propertyType}
            className="!font-semibold !text-gray-600 !mb-2"
          />

          {documents && (
            <Chip
              label={`${documents} documents`}
              className="!font-semibold !text-gray-600 !mb-2"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-app_green font-bold">
            {NAIRA}
            {parseInt(asset?.cost as string).toLocaleString()}
          </span>

          <Button
            className="!bg-npv_purple !text-white !px-3 !py-1 !rounded hover:!bg-app_green/80! !transition-colors !duration-300 !normal-case !font-semibold"
            onClick={viewProperty}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
