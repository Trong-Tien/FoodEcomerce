import { useGetOrdersDetail } from '@/Hooks/Orders';
import React, { useMemo } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogContentText, Grid } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import type { OrdersDetail } from '@/Type/SubOrderDetail';
import { useFile } from '@/Hooks/File';

type props = {
  orderId: string,
  openModal: boolean;
  handleClose: () => void;
}
const ModalChiTietDonHang: React.FC<props> = ({ orderId, handleClose, openModal }) => {
  const { data: dataOrderDetails } =
    useGetOrdersDetail(orderId, openModal);
  const columns = useMemo<MRT_ColumnDef<OrdersDetail>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Tên hàng hóa",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      }, {
        accessorKey: "imageUrl",
        header: "Hình ảnh",
        size: 100,
        Cell: ({ cell }) => {

          const { data: image, isLoading } = useFile(cell.getValue() as string)
          if (isLoading) return <div>Loading...</div>;
          return (
            <div
            >
              <img src={image} />
            </div>
          );
        },
      },
      {
        accessorKey: "unitPrice",
        header: "Đơn giá",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "quantity",
        header: "Số lượng",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "totalPrice",
        header: "Tổng tiền",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },

    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: dataOrderDetails ?? [],
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    // enableRowOrdering: true,
    enableEditing: true,
    initialState: { showColumnFilters: true },
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: { minHeight: "500px" },
    },
    defaultColumn: {
      size: 150,
      minSize: 80,
      maxSize: 200,
    },
    renderRowActions: () => (
      <></>
    ),

  });
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'lg'}>
      <DialogTitle>
        Xem chi tiết đơn hàng
      </DialogTitle>
      <form id='subscription-form' >
        <DialogContent>
          <DialogContentText>
            <Grid spacing={2}>
              <MaterialReactTable table={table} />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button variant='contained' color='error' onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </form>

    </Dialog>
  )
}

export default ModalChiTietDonHang
