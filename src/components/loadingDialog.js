import {
    Dialog,
    DialogContent,
    Typography
} from "@mui/material";

const LoadingDialog = ({open}) => {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogContent sx={{py: 4, textAlign: "center"}}>
        <Typography variant="h5" component="p">資料載入中…</Typography>
      </DialogContent>
    </Dialog>
  );
};

export { LoadingDialog };
