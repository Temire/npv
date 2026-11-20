/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataGrid,
  GridColDef,
  DataGridProps,
  GridPaginationModel,
  GridSlots,
  GridPagination
} from "@mui/x-data-grid";
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";

import * as React from "react";
import { TableBox } from "./table.style";
import {
  Box,
  LinearProgress,
  // Pagination,
  TablePaginationProps
} from "@mui/material";

interface Props extends DataGridProps {
  rows: any[];
  columns: GridColDef[] | any[] | any;
  height?: string | number | any;
  pageSize?: number;
  pageNumber?: number;
  setPageNumber?: any;
  setPageSize?: any;
  autoRowHeight: boolean;
}

// const CustomPagination = () => {
//   const apiRef = useGridApiContext();
//   const page = useGridSelector(apiRef, gridPageSelector);
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//   return (
//     <Pagination
//       color="primary"
//       count={pageCount}
//       page={page + 1}
//       onChange={(event, value) => apiRef.current.setPage(value - 1)}
//     />
//   );
// };

function Pagination({
  page,
  onPageChange,
  className
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  console.log(page);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export const NpvTable: React.FC<Props> = ({
  rows,
  columns,
  height = "calc(100vh - 170px)",
  pageSize = 10,
  setPageSize,
  pageNumber = 1,
  setPageNumber,
  hideFooterPagination = false,
  loading,
  autoRowHeight = false,
  ...props
}) => {
  const handlePageChange = (model: GridPaginationModel) => {
    if (model.pageSize !== pageSize) {
      setPageSize(model.pageSize);
    } else {
      setPageNumber(model.page + 1);
    }
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableBox style={{ height: height }}>
        <DataGrid
          slots={{
            loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
            pagination: CustomPagination
          }}
          loading={loading}
          rows={rows}
          columns={columns}
          rowCount={props.rowCount}
          pagination
          paginationMode="server"
          paginationModel={{
            page: (pageNumber as number) - 1,
            pageSize: pageSize
          }}
          pageSizeOptions={[2, 5, 10, 20, 30, 40, 50, 100, 200, 300, 500, 1000]}
          onPaginationModelChange={(model: GridPaginationModel) => {
            handlePageChange(model);
          }}
          // onPageChange={(newPage: any) => setPageNumber(newPage)}
          // onPageSizeChange={(newPageSize: any) => setPageSize(newPageSize)}
          hideFooterPagination={hideFooterPagination}
          hideFooter={hideFooterPagination}
          getRowHeight={() => (autoRowHeight ? "auto" : null)}
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              lineHeight: "normal",
              display: "flex",
              alignItems: "center",
              paddingTop: "8px",
              paddingBottom: "8px"
            },
            "& .MuiDataGrid-row": {
              maxHeight: "none !important"
            }
          }}
        />
      </TableBox>
    </Box>
  );
};
