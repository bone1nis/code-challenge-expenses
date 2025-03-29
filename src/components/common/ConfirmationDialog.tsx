import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

type ConfirmationDialogProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    title,
    onClose,
    onConfirm }) => {

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            disableScrollLock
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography variant="body2">
                    Это действие нельзя отменить.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}>Отменить</Button>
                <Button
                    onClick={onConfirm}
                    color="secondary">Подтвердить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;