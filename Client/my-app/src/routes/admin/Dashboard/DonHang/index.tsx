"use client"

import { useGetOrders } from '@/Hooks/Orders';
import type { Order } from '@/Type/Order';
import { createFileRoute } from '@tanstack/react-router'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import ModalChiTietDonHang from './-components/ModalChiTietDonHang';
import { Eye, Download, Trash2, CheckCircle2 ,User} from 'lucide-react';

export const Route = createFileRoute('/admin/Dashboard/DonHang/')({
  component: RouteComponent,
})

const role: string | null = localStorage.getItem("role")

function RouteComponent() {

  const { data, isError: isLoadingMenuError } = useGetOrders(1, 10, role);
  const items: Order[] = data ?? [];
  const [openModalSubmitOrder, setOpenModalSubmitOrers] = useState<boolean>(false)
  const [selectedIdOrder, setSelectedIdOrder] = useState<string[]>([])

  const handleOpenModal = () => setOpenModalSubmitOrers(true)
  const handleCloseModal = () => setOpenModalSubmitOrers(false)

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "orderCode",
        header: "Mã đơn hàng",
        size: 80,
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center" },
      },
      {
        accessorKey: "statusId",
        header: "Trạng thái",
        size: 100,
        Cell: ({ cell }) => {
          const statusId = cell.getValue() as number;

          const statusMap: Record<number, { text: string; color: string }> = {
            1: { text: "Chờ xử lý", color: "bg-amber-50 text-amber-700 border border-amber-200" },
            2: { text: "Đã xác nhận", color: "bg-blue-50 text-blue-700 border border-blue-200" },
            3: { text: "Đang giao", color: "bg-cyan-50 text-cyan-700 border border-cyan-200" },
            4: { text: "Đã giao", color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
            5: { text: "Đã hủy", color: "bg-red-50 text-red-700 border border-red-200" },
          };

          const status = statusMap[statusId] || { text: "Không xác định", color: "bg-gray-100 text-gray-700 border border-gray-300" };

          return (
            <div className={`px-3 py-1 rounded-xl text-sm font-medium text-center ${status.color}`}>
              {status.text}
            </div>
          )
        }
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
        accessorKey: "detail",
        header: "Chi tiết đơn hàng",
        size: 100,
        Cell: () => (
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm"
            onClick={handleOpenModal}
          >
            <Eye size={16} /> Chi tiết
          </button>
        )
      }
    ], []
  )

  const table = useMaterialReactTable({
    columns,
    data: items,
    enableRowSelection: true,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    enableEditing: true,
    initialState: { showColumnFilters: true },
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingMenuError
      ? { color: "error", children: "Đã có lỗi xảy ra" }
      : undefined,
    muiTableContainerProps: { sx: { minHeight: "500px" } },
    defaultColumn: { size: 150, minSize: 80, maxSize: 200 },
    renderRowActions: () => <></>,
    renderTopToolbarCustomActions: () => (
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Quản lý đơn hàng</h2>
        <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm" disabled>
          <Download size={16} /> In đơn hàng
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100 text-sm" disabled>
          <Trash2 size={16} /> Hủy đơn hàng
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 text-sm" disabled>
          <CheckCircle2 size={16} /> Xác nhận đơn hàng
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 text-sm" disabled>
          <User size={16} /> Bàn giao cho shipper
        </button>
      </div>
    )
  });

  useEffect(() => {
    const selectedIds = table.getSelectedRowModel().rows.map(r => r.id);
    setSelectedIdOrder(selectedIds);
  }, [table.getState().rowSelection]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto rounded-lg border bg-white shadow-sm p-4">
        <MaterialReactTable table={table} />
      </div>

      <ModalChiTietDonHang
        handleClose={handleCloseModal}
        openModal={openModalSubmitOrder}
        orderId={selectedIdOrder[0]}
      />
    </div>
  )
}
