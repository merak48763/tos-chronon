import type { FC } from "react";
import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";

type InlineTypographyProps = Omit<TypographyProps, "display" | "component" | "variant">

export const InlineTypography: FC<InlineTypographyProps> = (props) => {
  return <Typography display="inline" component="span" variant="inherit" {...props} />
}
