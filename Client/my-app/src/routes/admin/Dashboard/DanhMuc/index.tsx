import { useDeleteCategory, useGetCategory } from '@/Hooks/Category';
import type { Category } from '@/Type/Category';
import { createFileRoute } from '@tanstack/react-router';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useMemo, useState } from 'react';
import ModalThem from './-component/ModalThem';
import ModalSua from './-component/ModalSua';
import {
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFile } from '@/Hooks/File';
import type { UpdateCategory } from '@/Type/UpdateCategory';
import Swal from 'sweetalert2';
import type { ResponseType } from '@/Type/ResponseType';

export const Route = createFileRoute('/admin/Dashboard/DanhMuc/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UpdateCategory | undefined>();

  const { data, isError: isLoadingMenuError } = useGetCategory(1, 25);
  const dataCategory: Category[] = data ?? [];

  const deleteCategory = useDeleteCategory();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Bạn có muốn xóa dữ liệu này ? ',
      text: 'Lưu ý dữ liệu này sẽ mất vĩnh viễn',
      showDenyButton: true,
      confirmButtonText: 'Xác nhận',
      denyButtonText: 'Không',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response: ResponseType = await deleteCategory.mutateAsync(id);

        if (response?.status === 200) {
          Swal.fire('Xóa dữ liệu thành công');
        } else {
          Swal.fire('Đã có lỗi xảy ra');
        }
      }
    });
  };

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tên danh mục',
        size: 80,
        muiTableHeadCellProps: { align: 'center' },
        muiTableBodyCellProps: { align: 'center' },
      },
      {
        accessorKey: 'description',
        header: 'Mô tả',
        size: 180,
      },
      {
        accessorKey: 'imageUrl',
        header: 'Hình ảnh',
        size: 150,
        Cell: ({ cell }) => {
          const path = cell.getValue<string>();
          const { data: image } = useFile(path);

          if (!image) return <span>Đang tải...</span>;

          return (
            <img
              src={image}
              alt="Ảnh danh mục"
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          );
        },
      },
    ],
    []
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const mapCategoryToUpdate = (category: Category): UpdateCategory => {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      categoryParentId: category.categoryParentId,
    };
  };

  const handleOpenModalUpdate = (row: Category) => {
    const updateData: UpdateCategory = mapCategoryToUpdate(row);
    setSelectedRow(updateData);
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setSelectedRow(undefined);
    setOpenModalUpdate(false);
  };

  const table = useMaterialReactTable({
    columns,
    data: dataCategory,
    getRowId: (row) => row.id,
    enableExpanding: true,

    renderDetailPanel: ({ row }) => (
      <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="body2">
            <b>{row.original.name}</b>
          </Typography>
        </Box>
      </Collapse>
    ),

    getSubRows: (row) => row.categorys,

    initialState: {
      showColumnFilters: true,
      expanded: true,
    },

    enableRowSelection: false,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableRowOrdering: true,
    enableEditing: true,

    muiToolbarAlertBannerProps: isLoadingMenuError
      ? {
          color: 'error',
          children: 'Đã có lỗi xảy ra',
        }
      : undefined,

    muiTableContainerProps: { sx: { minHeight: '500px' } },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            color="primary"
            onClick={() => handleOpenModalUpdate(row.original)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Xóa">
          <IconButton
            color="error"
            onClick={() => handleDelete(row.original.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          px: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Quản lý danh mục
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Thêm mới danh mục
        </Button>
      </Box>
    ),
  });

  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <MaterialReactTable table={table} />

      {/* Modal thêm */}
      <ModalThem handleClose={handleCloseModal} openModal={openModal} />

      {/* Modal sửa */}
      <ModalSua
        handleClose={handleCloseModalUpdate}
        openModal={openModalUpdate}
        initialValues={selectedRow}
      />
    </Card>
  );
}
