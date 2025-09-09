import { useGetLoaiTaiKhoan } from '@/Hooks/LoaiTaiKhoan'
import type { LoaiTaiKhoan } from '@/Type/LoaiTaiKhoan'
import { createFileRoute } from '@tanstack/react-router'
import type { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'

export const Route = createFileRoute('/admin/Dashboard/LoaiTaiKhoan/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: dataLoaiTaiKhoan } = useGetLoaiTaiKhoan(1, 10)
   
  const LoaiTaiKhoanItem : LoaiTaiKhoan[] = dataLoaiTaiKhoan?.items ?? []

  const columns = useMemo<MRT_ColumnDef<LoaiTaiKhoan>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'STT',
        size: 80,
        muiTableHeadCellProps: { align: 'center' },
        muiTableBodyCellProps: { align: 'center' },
      },
      {
        accessorKey: 'name',
        header: 'Tên Loại tài khoản',
        size: 180,
      },
      {
        accessorKey: 'discription',
        header: 'Mô tả',
        size: 150,
      },
      // {
      //   accessorKey: 'isActive',
      //   header: 'Kích hoạt',
      //   size: 120,
      //   muiTableHeadCellProps: { align: 'center' },
      //   muiTableBodyCellProps: { align: 'center' },
      //   Cell: ({ cell }) => (
      //     <Switch
      //       checked={cell.getValue<boolean>()}
      //       size="small"
      //       color="success"
      //     />
      //   ),
      // },
    ],
    [],
  );



  return <div>
  </div>
}
