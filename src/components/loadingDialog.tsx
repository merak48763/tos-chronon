import type { FC } from "react";
import {
  Backdrop,
  CircularProgress,
} from "@mui/material";

interface LoadingDialogProps {
  open: boolean,
}

export const LoadingDialog: FC<LoadingDialogProps> = ({open}) => {
  return (
    <Backdrop sx={{color: "#fff", zIndex: theme => theme.zIndex.drawer + 1}} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
