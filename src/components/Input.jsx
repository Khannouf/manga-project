import {
  Box,
  darken,
  InputBase,
  lighten,
  styled,
  useTheme,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";

export const Input = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "height",
})(({ height, theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    width: "100%",
    padding: theme.spacing(0, 3),
    fontSize: height === "big" ? 20 : 18,
    height: height === "big" ? 48 : height === "medium" ? 40 : 32,
    borderRadius: 16,
    border: "1.5px solid",
    borderColor: theme.palette.text.secondary,
    transition: theme.transitions.create("border"),
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
      transition: theme.transitions.create("color"),
    },
    "&:focus": {
      border: "1.5px solid",
      borderColor:
        theme.palette.mode === "dark"
          ? lighten(theme.palette.text.secondary, 0.5)
          : darken(theme.palette.text.secondary, 0.5),
      "&::placeholder": {
        color:
          theme.palette.mode === "dark"
            ? lighten(theme.palette.text.secondary, 0.5)
            : darken(theme.palette.text.secondary, 0.5),
      },
    },
    [theme.breakpoints.down("xl")]: {
      padding: theme.spacing(0, 2.5),
      fontSize: height === "big" ? 18 : 16,
      height: height === "big" ? 44 : height === "medium" ? 36 : 28,
      borderRadius: 14,
    },
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(0, 2),
      fontSize: height === "big" ? 16 : 14,
      height: height === "big" ? 40 : height === "medium" ? 32 : 24,
      borderRadius: 10,
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 1.5),
      fontSize: height === "big" ? 14 : 12,
      height: height === "big" ? 36 : height === "medium" ? 28 : 20,
      borderRadius: 8,
    },
    "&:disabled": {
      cursor: "not-allowed",
    },
  },
}));

export const InputWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  rowGap: theme.spacing(2),
  [theme.breakpoints.down("xl")]: { rowGap: theme.spacing(1.5) },
  [theme.breakpoints.down("lg")]: { rowGap: theme.spacing(1) },
}));

export const SearchInput = (props) => {
  const theme = useTheme();
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();

  const { onDelete, ...parameters } = props;

  const handleDelete = useCallback(() => {
    onDelete?.();
    inputRef.current?.click();
  }, [onDelete]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 600,
        [theme.breakpoints.down("xl")]: {
          maxWidth: 504,
        },
        [theme.breakpoints.down("lg")]: {
          maxWidth: 440,
        },
        [theme.breakpoints.down("md")]: {
          maxWidth: 360,
        },
      }}
    >
      {/* <Icon
        type="search"
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          height: 24,
          width: 24,
          left: 32,
          "& .stroke": {
            stroke: focus
              ? theme.palette.mode === "dark"
                ? lighten(theme.palette.text.secondary, 0.5)
                : darken(theme.palette.text.secondary, 0.5)
              : undefined,
            transition: theme.transitions.create("stroke"),
          },
          "& .fill": {
            fill: focus
              ? theme.palette.mode === "dark"
                ? lighten(theme.palette.text.secondary, 0.5)
                : darken(theme.palette.text.secondary, 0.5)
              : undefined,
            transition: theme.transitions.create("fill"),
          },
          [theme.breakpoints.down("xl")]: {
            left: 28,
            height: 28,
            width: 20,
          },
          [theme.breakpoints.down("lg")]: {
            left: 24,
            height: 24,
            width: 16,
          },
          [theme.breakpoints.down("md")]: {
            left: 20,
            height: 20,
            width: 14,
          },
        }}
      />
      {!!parameters.value?.length && (
        <Icon
          onClick={handleDelete}
          type="cross"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            height: 24,
            width: 24,
            right: 32,
            zIndex: 1,
            cursor: "pointer",
            "& .fill": {
              fill: theme.palette.text.secondary,
            },
            [theme.breakpoints.down("xl")]: {
              right: 28,
              height: 28,
              width: 20,
            },
            [theme.breakpoints.down("lg")]: {
              right: 24,
              height: 24,
              width: 16,
            },
            [theme.breakpoints.down("md")]: {
              right: 20,
              height: 20,
              width: 14,
            },
          }}
        />
      )} */}
      <Input
        {...parameters}
        ref={inputRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        sx={{
          "& .MuiInputBase-input": {
            height: 72,
            borderRadius: 6,
            padding: theme.spacing(0, 4 + 3 + 2, 0, 4 + 3 + 2),
          },
          [theme.breakpoints.down("xl")]: {
            maxWidth: 504,
            "& .MuiInputBase-input": {
              height: 64,
              borderRadius: 5.5,
              padding: theme.spacing(0, 3.5 + 2.5 + 1.5, 0, 3.5 + 2.5 + 1.5),
            },
          },
          [theme.breakpoints.down("lg")]: {
            maxWidth: 440,
            "& .MuiInputBase-input": {
              height: 56,
              borderRadius: 4.5,
              padding: theme.spacing(0, 3 + 2 + 1, 0, 3 + 2 + 1),
            },
          },
          [theme.breakpoints.down("md")]: {
            maxWidth: 360,
            "& .MuiInputBase-input": {
              height: 48,
              borderRadius: 4,
              padding: theme.spacing(
                0,
                2.5 + 1.75 + 0.75,
                0,
                2.5 + 1.75 + 0.75
              ),
            },
          },
        }}
      />
    </Box>
  );
};
