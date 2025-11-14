
import { useGetOrders } from '@/Hooks/Orders';
import type { Order } from '@/Type/Order';
import { Box, Button, Card, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Person2Icon from '@mui/icons-material/Person2';
import ModalChiTietDonHang from './-components/ModalChiTietDonHang';
import VisibilityIcon from '@mui/icons-material/Visibility';
export const Route = createFileRoute('/admin/Dashboard/DonHang/')({
  component: RouteComponent,
})

const role: string | null = localStorage.getItem("role")

function RouteComponent() {

  const { data, isError: isLoadingMenuError } = useGetOrders(1, 10, role);
  const items: Order[] = data ?? [];
  const [openModalSubmitOrder, setOpenModalSubmitOrers] = useState<boolean>(false)
  const [selectedIdOrder, setSelectedIdOrder] = useState<string[]>([])

  const handleOpenModal = () => {
    setOpenModalSubmitOrers(true)
  }
  const handleCloseModal = () => {
    setOpenModalSubmitOrers(false)
  }


  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "orderCode",
        header: "Mã đơn hàng",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      }, {
        accessorKey: "statusId",
        header: "Trạng thái",
        size: 100,
        Cell: ({ cell }) => {
          const statusId = cell.getValue() as number;

          const statusMap: Record<number, { text: string; color: string }> = {
            1: { text: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
            2: { text: "Đã xác nhận", color: "bg-blue-100 text-blue-700 border-blue-300" },
            3: { text: "Đang giao", color: "bg-green-100 text-green-700 border-green-300" },
            4: { text: "Đã giao", color: "bg-red-100 text-red-700 border-red-300" },
            5: { text: "Đã hủy", color: "bg-red-100 text-red-700 border-red-300" },
          };
          const status =
            statusMap[statusId] || {
              text: "Không xác định",
              color: "bg-gray-100 text-gray-700 border-gray-300",
            };
          return (
            <div
              className={`border rounded-xl px-3 py-1 text-sm font-medium text-center ${status.color}`}
            >
              {status.text}
            </div>
          );
        },
      },
      {
        accessorKey: "userName",
        header: "Khách hàng",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "shippingAddress",
        header: "Địa chỉ giao hàng",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "phoneNumber",
        header: "Số điện thoại",
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
      {
        accessorKey: "orderDate",
        header: "Ngày đặt hàng",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "test",
        header: "Chi tiết đơn hàng",
        size: 100,
        Cell: () => {


          return (
            <div>
              <Button startIcon={<VisibilityIcon />} variant='contained' color='info' onClick={handleOpenModal}>Chi tiết </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: items,
    enableRowSelection: true,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    // enableRowOrdering: true,
    enableEditing: true,
    initialState: { showColumnFilters: true },
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingMenuError
      ? { color: "error", children: "Đã có lỗi xảy ra" }
      : undefined,
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
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          px: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Quản lý đơn hàng
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ marginLeft: 2 }}
          disabled
          startIcon={<GetAppIcon />}
        // onClick={handleOpenModal}
        >
          In đơn hàng
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled
          sx={{ marginLeft: 2 }}
          startIcon={<DeleteIcon />}
        // onClick={handleOpenModal}
        >
          hủy đơn hàng
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled
          sx={{ marginLeft: 2 }}
          startIcon={<CheckCircleIcon />}
        // onClick={handleOpenModal}
        >
          Xác nhận đơn hàng
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ marginLeft: 2 }}
          disabled
          startIcon={<Person2Icon />}
        // onClick={handleOpenModal}
        >
          Bàn giao cho shipper
        </Button>
      </Box>
    ),
  });
  useEffect(() => {
    const selectedIds = table.getSelectedRowModel().rows.map(r => r.id);
    setSelectedIdOrder(selectedIds);
  }, [table.getState().rowSelection]);

  return <Card>
    <MaterialReactTable table={table} />
    <ModalChiTietDonHang handleClose={handleCloseModal} openModal={openModalSubmitOrder} orderId={selectedIdOrder[0]} />
  </Card>;
}
