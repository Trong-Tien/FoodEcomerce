import { useFile } from '@/Hooks/File';
import { useGetProductImage } from '@/Hooks/Product';
import { Button, DialogContentText, Grid } from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
type props = {
    productId: string,
    openModal: boolean;
    handleClose: () => void;
}
type productImage = {
    id: string,
    imageUrl: string,
    productId: string,
}
const ModalXemHinhAnh: React.FC<props> = ({ productId, openModal, handleClose }) => {
    const { data: dataImage } = useGetProductImage(productId)
    const data: productImage[] = dataImage ?? []

    const ImagePreview: React.FC<{ path: productImage[] }> = ({ path }) => {
        return (
            <div>
                {path.map((p, i) => {
                    const { data: image, isLoading } = useFile(p.imageUrl); 
                    if (isLoading) return <div key={i}>Loading...</div>;
                    if (!image) return null;
                    return <img key={i} src={image} alt={`preview-${i}`} />;
                })}
            </div>
        );
    };


    return (
        <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth={'lg'}>
            <DialogTitle>
                Xem danh sách hình ảnh
            </DialogTitle>
            <form id='subscription-form' >
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2}>
                            <ImagePreview path={data} />
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

export default ModalXemHinhAnh
