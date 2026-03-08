import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { setSearchedQuery } from "../redux/JobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const categories = [
  "Frontend",
  "Backend",
  "Full Stack",
  "MERN",
  "AI Engineer",
  "Data Scientist",
  "DevOps",
  "UI/UX",
  "Mobile App",
];

const CategoryCarousel = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">

      {/* Left Arrow (Desktop only) */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-base-200 hover:bg-base-300"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow (Desktop only) */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-base-200 hover:bg-base-300"
      >
        <ChevronRight />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {categories.map((category) => (
          <div key={category} className="px-2 ">
            <div
              onClick={() => searchJobHandler(category)}
              className="h-12  flex items-center justify-center rounded-full
              bg-amber-600 text-white text-sm  font-medium
              hover:bg-base-300 hover:text-amber-600 hover:font-bold
              transition cursor-pointer shadow-md"
            >
              {category}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
