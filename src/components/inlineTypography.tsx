import type { TypographyProps } from "@mui/material";
import { Typography } from "@mui/material";
import type { FC } from "react";

type InlineTypographyProps = Omit<TypographyProps, "display" | "component" | "variant">;

export const InlineTypography: FC<InlineTypographyProps> = (props) => {
  return <Typography display="inline" component="span" variant="inherit" {...props} />;
};
