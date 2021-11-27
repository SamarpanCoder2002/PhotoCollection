import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import Base from "./base";
import Masonry from "react-masonry-css";
import ImageCard from "./card-image";
import { useDispatch, useSelector } from "react-redux";
import { STOP_LOADING } from "../redux/actions";
import AOS from "aos";
import "aos/dist/aos.css";

const ImageContainer = () => {
  const [images, setimages] = useState([]);
  const [prevQuery, setprevQuery] = useState("");
  const [bottomLoading, setbottomLoading] = useState();
  const [error, seterror] = useState();
  const [page, setpage] = useState(1);

  const { query, isLoading } = useSelector((state) => {
    const { query } = state;
    if (query && query !== prevQuery) {
      setimages([]);
      setpage(1);
      setprevQuery(query);
    }
    return state;
  });

  const dispatch = useDispatch();

  const stopLoading = () => {
    dispatch({ type: STOP_LOADING });
  };

  useEffect(() => {
    if (query && query !== "") {
      fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            stopLoading();
            setbottomLoading(false);
            seterror(
              "Image Showing Limit Exceed... Please Try After Some Time"
            );
            return;
          }

          const imageCollection = [];
          data.photos.map((imageBox) =>
            imageCollection.push(imageBox.src.large)
          );

          setimages([...images, ...imageCollection]);
          isLoading && stopLoading();
          bottomLoading && setbottomLoading(false);
          error && seterror(false);
        })
        .then(() => {});
    }
  }, [query, page]);

  useEffect(() => {
    AOS.init();
  }, []);

  const scrollToEnd = () => {
    console.log("at bottom");
    setbottomLoading(true);
    setpage(page + 1);
  };

  window.onscroll = () => {
    console.log("Scrolling");
    console.warn(window.innerHeight);
    console.warn(Math.round(window.scrollY));
    console.error(document.documentElement.offsetHeight);
    if (
      window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.offsetHeight ||
      window.innerHeight + Math.round(window.scrollY) ===
        document.documentElement.offsetHeight - 1
    ) {
      console.log("Detected");
      scrollToEnd();
    }
  };

  const defaultItemsGrid = () => (images.length > 0 ? 3 : 1);
  const midItemsGrid = () => (images.length > 0 ? 2 : 1);

  const breakpointColumnsObj = {
    default: defaultItemsGrid(),
    1100: midItemsGrid(),
    500: 1,
  };

  return (
    <Base>
      <Container style={{ marginTop: "20px" }}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          align="center"
        >
          {(images.length > 0 &&
            images.map((image, index) => (
              <div key={index}>
                <ImageCard image={image} />
              </div>
            ))) || (
            <Typography variant="h4" align="center" color="primary">
              {isLoading ? "Hang tight, Image Loading..." : "No Images Found"}
            </Typography>
          )}
        </Masonry>

        {bottomLoading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h5" style={{ color: "#fff" }} mb={5}>
              Loading...
            </Typography>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", marginTop: "20px" }} mb={5}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </div>
        )}
      </Container>
    </Base>
  );
};

export default ImageContainer;
