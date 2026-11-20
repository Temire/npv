import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../services";
import { GridColDef } from "@mui/x-data-grid";
import { NpvTable, StatusPill } from "../../../components";
import { ActiveStatus, KYCStatus } from "../../../types";
import { ActionCell } from "./components";
import * as React from "react";

export const UserManagement = () => {
  const [pageSize, setPageSize] = React.useState(10);
  const [pageNumber, setPageNumber] = React.useState(1);
  const {
    data: all_users,
    isLoading: users_isLoading,
    refetch
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers({ pageSize, pageNumber: pageNumber - 1 })
  });

  React.useEffect(() => {
    refetch();
  }, [pageSize, pageNumber]);

  const TableHeader: GridColDef[] = [
    {
      field: "id",
      headerName: "User ID",
      resizable: false
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      // maxWidth: 350,
      flex: 1,
      renderCell: (params) => (
        <p className="!normal-case font-semibold">
          {params.row?.firstName + " " + params.row?.lastName}
        </p>
      )
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      // maxWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <p className="!normal-case font-semibold !underline !text-[14px] !text-[#333333]">
          {params.value}
        </p>
      )
    },
    // {
    //   field: "gender",
    //   headerName: "Gender",
    //   resizable: false,
    //   minWidth: 100
    // },
    // {
    //   field: "registrationStatus",
    //   headerName: "Registration Status",
    //   resizable: false,
    //   minWidth: 150,
    //   width: 150,
    //   renderCell: (params) => (
    //     <StatusPill
    //       type="registration"
    //       status={params.value as RegistrationStatus}
    //     />
    //   )
    // },
    {
      field: "kycStatus",
      headerName: "KYC Status",
      resizable: false,
      minWidth: 200,
      renderCell: (params) => (
        <StatusPill type="kyc" status={params.value as KYCStatus} />
      )
    },
    {
      field: "active",
      headerName: "Active Status",
      resizable: false,
      minWidth: 200,
      renderCell: (params) =>
        params.value ? (
          <StatusPill type="active" status={"ACTIVE" as ActiveStatus} />
        ) : (
          <StatusPill type="active" status={"INACTIVE" as ActiveStatus} />
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

  const userData = all_users?.content || [];
  const usersCount = all_users?.totalElements || 0;

  // console.log(userData);
  return (
    <section>
      <div className="flex flex-wrap justify-between gap-6 items-center mb-6">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-[30px]">All Users</p>
          <p className="px-2 py-1 rounded-[4px] font-semibold text-[13px] text-[#1A9882] bg-[#E9FAF7] w-fit ">
            {usersCount} users
          </p>
        </div>
      </div>

      <div className="border rounded-[8px] p-4">
        <div style={{ height: 650, width: "100%" }}>
          <NpvTable
            height={"650px"}
            columns={TableHeader}
            rows={userData}
            loading={users_isLoading}
            pageSize={pageSize}
            setPageSize={setPageSize}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            rowCount={usersCount}
            autoRowHeight={false}
          />
        </div>
      </div>
    </section>
  );
};
