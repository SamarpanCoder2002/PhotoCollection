import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Base from "./base";
import Masonry from "react-masonry-css";
import ImageCard from "./card-image";
import { useDispatch, useSelector } from "react-redux";

const ImageContainer = () => {
  const [images, setimages] = useState([]);
  const [page, setpage] = useState(1);

  const { query, isLoading } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const stopLoading = () => {
    dispatch({ type: "STOP_LOADING" });
  };

  useEffect(() => {
    if (query && query !== "") {
      fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
        .then((response) => {
          response
            .json()
            .then((data) => {
              const imageCollection = [];
              data.photos.map((imageBox) =>
                imageCollection.push(imageBox.src.large)
              );

              //// Conditional Insertion based on the page number
              if (page === 1) {
                setimages(imageCollection);
              } else {
                setimages([...images, ...imageCollection]);
              }
            })
            .then(() => {
              stopLoading();
            });
        })
        .catch(setimages([]));
    }
  }, [query, page]);

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
      </Container>
    </Base>
  );
};

export default ImageContainer;
