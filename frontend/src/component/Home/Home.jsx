import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/img_bg_page_title.jpg";
import bg1 from "../../Assets/img_bg_page_title_dark.jpg";
import bg2 from "../../Assets/img_bg_page_title_inner.jpg";
import ProductCard from "../Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Home" />
      <Header />
      {/* Carousel */}
      <div className="banner">
        <Carousel>
          <img src={bg} className="bgImg" />
          <img src={bg1} className="bgImg" />
          <img src={bg2} className="bgImg" />
        </Carousel>
        <div className="home__content">
          <div>
            <h2
              style={{
                fontSize: "4.5em",
                fontFamily: "Poppins,sans-serif",
                color: "#fff",
              }}
            >
              Musical Instruments
            </h2>
          </div>
          <div>
            <h2
              style={{
                fontSize: "4.5em",
                fontWeight: "400",
                fontFamily: "Poppins,sans-serif",
                color: "#fff",
                lineHeight: ".7",
              }}
            >
              Collection
            </h2>
          </div>
          <div>
            <a href="#container">
              <button
                type="submit"
                style={{
                  width: "135px",
                  height: "50px",
                  border: "none",
                  background: "#3BB77E",
                  margin: "10px 0",
                  fontSize: "1.2vmax",
                  color: "#fff",
                  cursor: "pointer",
                }}
                className="Home__button"
              >
                SHOP NOW
              </button>
            </a>
          </div>
        </div>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default Home;
