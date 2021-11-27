import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoadingBar from "./loading/loadingbar";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_KEYWORD, START_LOADING } from "../redux/actions";

const Base = ({ children }) => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const isLoading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();

  const onEnter = (query) => {
    if (query && query.length > 0) {
      dispatch({ type: START_LOADING });
      dispatch({ type: SEARCH_KEYWORD, payload: query });
    }
  };

  return (
    <div className="base">
      <LoadingBar isLoading={isLoading} />
      <AppBar
        position="sticky"
        style={{
          background: "#071a2f",
          borderBottom: "3px solid #0e2741",
          backdropFilter: "blur(1000px)",
        }}
        elevation={0}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => window.location.replace("/")}
          >
            <Typography variant="h6" style={{ color: "#fff" }} sm={0}>
              PhotoCollection
            </Typography>
          </IconButton>
          
          <IconButton
            edge="start"
            color="inherit"
            aria-label="github"
            onClick={() => {
              window.open(
                "https://github.com/SamarpanCoder2002/PhotoCollection",
                "_blank"
              );
            }}
          >
            <GitHubIcon />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onEnter(e.target.value);
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Base;
