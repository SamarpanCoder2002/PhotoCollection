import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Base from "./base";
import Masonry from "react-masonry-css";
import ImageCard from "./card-image";
import { useDispatch, useSelector } from "react-redux";

const ImageContainer = () => {
  const [images, setimages] = useState([]);
  const [prevQuery, setprevQuery] = useState("");
  const [bottomLoading, setbottomLoading] = useState(false);
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

  const startLoading = () => {
    dispatch({ type: "START_LOADING" });
  };

  const stopLoading = () => {
    dispatch({ type: "STOP_LOADING" });
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
          console.log(data);
          const imageCollection = [];
          data.photos.map((imageBox) =>
            imageCollection.push(imageBox.src.large)
          );

          //// Conditional Insertion based on the page number
          console.log("Page: ", page);
          setimages([...images, ...imageCollection]);
          stopLoading();
          setbottomLoading(false);
        })
        .then(() => {});

      // .catch(setimages([]));
    }
  }, [query, page]);

  const scrollToEnd = () => {
    // startLoading();
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

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
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
            <div style={{ color: "#fff" }}>
              {isLoading ? "Hang tight, Image Loading..." : "No Images Found"}
            </div>
          )}
        </Masonry>
        {/* {(
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div
              style={{
                border: "1px solid #fff",
                padding: "10px",
                borderRadius: "5px",
                color: "#fff"
              }}
            >
              Loading...
            </div>
          </div>
        )} */}
      </Container>
    </Base>
  );
};

export default ImageContainer;
