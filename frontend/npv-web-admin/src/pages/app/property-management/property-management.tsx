import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { StatusPill } from "../../../components/status-pill";
import { PropertyStatus } from "../../../types";
import { NpvTable } from "../../../components";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../../../services";
import { ActionCell } from "./components";
import { getDocumentTypeName } from "../../../utils";

export const PropertyManagement = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(1);

  const {
    data: all_properties,
    isLoading: properties_isLoading,
    refetch
  } = useQuery({
    queryKey: ["getAllProperties"],
    queryFn: () =>
      getAllProperties({
        pageSize,
        pageNumber: pageNumber - 1
      })
  });
  React.useEffect(() => {
    refetch();
  }, [pageSize, pageNumber]);

  console.log(pageSize, pageNumber);

  const TableHeader: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      resizable: false
    },
    {
      field: "name",
      headerName: "property name",
      minWidth: 350,
      renderCell: (params) => (
        <p className="!normal-case font-semibold">
          {params.row?.propertyAsset?.title || "-"}
        </p>
      )
    },
    // {
    //   field: "location",
    //   headerName: "Property location",
    //   minWidth: 300,
    //   maxWidth: 350,
    //   renderCell: (params) => (
    //     <p className="!normal-case !text-[14px] !text-[#333333]">
    //       {params.value}
    //     </p>
    //   )
    // },
    {
      field: "uploadedBy",
      headerName: "Uploaded By",
      minWidth: 200,
      renderCell: (params) => (
        <p className="!normal-case font-semibold">
          {params.row?.propertyAsset?.uploaderName || "-"}
        </p>
      )
    },
    {
      field: "noOfDocuments",
      headerName: "No. of documents",
      minWidth: 130,
      renderCell: (params) => (
        <p className="!normal-case font-semibold">
          {params.row?.documents.length}
        </p>
      )
    },
    {
      field: "documents",
      headerName: "Documents",
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex flex-col gap-2 my-2">
          {params.row?.documents?.length > 0 ? (
            params.row?.documents?.map(
              (
                doc: { document: { documentType: string | undefined } },
                index: React.Key | null | undefined
              ) => (
                <p
                  key={index}
                  className="normal-case font-medium text-sm text-gray-500">
                  {getDocumentTypeName(doc?.document?.documentType)}
                </p>
              )
            )
          ) : (
            <p className="italic text-gray-500 my-2">No document</p>
          )}
        </div>
      )
    },

    {
      field: "active",
      headerName: " Status",
      resizable: false,
      minWidth: 150,
      renderCell: (params) => (
        <StatusPill
          type="property"
          status={
            (params.row?.propertyAsset?.approvalStatus as PropertyStatus) || "-"
          }
        />
      )
    },
    {
      field: "action",
      headerName: "Action",
      resizable: false,
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => <ActionCell row={params.row} />
    }
  ];

  const propertyData =
    all_properties?.content.map((prop: any) => ({
      ...prop,
      id: prop?.propertyAsset?.id
    })) || [];
  const propertiesCount = all_properties?.totalElements || 0;

  return (
    <section>
      <div className="flex flex-wrap justify-between gap-6 items-center mb-6">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-[30px]">Uploaded properties</p>
          <p className="px-2 py-1 rounded-[4px] font-semibold text-[13px] text-[#1A9882] bg-[#E9FAF7] w-fit ">
            {propertiesCount}+ available
          </p>
        </div>
      </div>
      <div className="border rounded-[8px] p-4">
        <div style={{ height: 650, width: "100%" }}>
          <NpvTable
            height={"650px"}
            columns={TableHeader}
            rows={propertyData}
            loading={properties_isLoading}
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            rowCount={propertiesCount}
            autoRowHeight={true}
          />
        </div>
      </div>
    </section>
  );
};
