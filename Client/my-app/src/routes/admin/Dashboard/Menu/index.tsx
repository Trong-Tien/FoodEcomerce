import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from 'material-react-table';
import type { Menu } from '@/Type/Menu';
import { useCreateMenu, useDeleteMenu, useGetMenus, useUpdateMenu } from '@/Hooks/Menu';
import { Button } from '@mui/material';
import ModalThemSua from './- component/ModalThemSua';
import { TypeAction } from '@/Until/Constant';
export const Route = createFileRoute('/admin/Dashboard/Menu/')({
  component: RouteComponent,
})




function RouteComponent() {
  // call api tanstack Query
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [typeAction , setTypeAction] = useState<string>("")
  const { data, isLoading, isError: isLoadingMenuError } = useGetMenus();
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const items: Menu[] = data?.items ?? [];
  const columns = useMemo<MRT_ColumnDef<Menu>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'Số thứ tự',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Tên menu',
        size: 150,
      },
      {
        accessorKey: 'icon',
        header: 'Hình ảnh',
        size: 200,
      },
      {
        accessorKey: 'url',
        header: 'Đường dẫn',
        size: 150,
      },
    ],
    [],
  );

  const handleOpenModal = (type : number) => {
    if(type === 1)
       setTypeAction(TypeAction.INSERT)
    else setTypeAction(TypeAction.UPDATE)
    setOpenModal(true)
  }
  const handleCloseMOdal  = ()=>
  {
      setTypeAction("")
      setOpenModal(false)
  }

  



  const table = useMaterialReactTable({
    columns,
    data: items,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingMenuError
      ? {
        color: 'error',
        children: 'Đã có lỗi xảy ra',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => handleOpenModal(1)}
      >
        Thêm menu
      </Button>
    ),
  });
  return <div>
    <MaterialReactTable table={table} />
     {/* Modal insert / update */}
     <ModalThemSua handleClose={handleCloseMOdal} openModal={openModal} type={typeAction}  />
    
  </div>
}

