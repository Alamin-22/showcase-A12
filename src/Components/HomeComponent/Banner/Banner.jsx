import AxiosPublic from "../../../Hooks/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaHandHoldingMedical } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {

    const axiosPublic = AxiosPublic();

    const { data: banners = [] } = useQuery({
        queryKey: ["banners"],
        queryFn: async () => {
            const res = await axiosPublic.get("/banner");
            const activeBanners = res.data.filter((banner) => banner.isActive);
            return activeBanners;
        }
    });



    return (
        <>
            <Swiper spaceBetween={30} centeredSlides={true} autoplay={{ delay: 3500, disableOnInteraction: false, }}
                pagination={{ clickable: true, }} navigation={true} modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper" >

                {
                    banners.map((banner) =>

                        <SwiperSlide key={banner._id}>

                            <div className="carousel w-full h-[600px]">
                                <div className="carousel-item text-left  relative w-full">
                                    <img src={banner?.image} alt="Banner Image" className="w-full rounded-xl" />
                                    <div className="absolute rounded-xl flex items-center  left-0 h-full top-0 bg-gradient-to-r from-[#151515] from-0%  to-[rgba(21, 21, 21, 0.00)] to-90% ...">
                                        <div className="text-white pl-12 space-y-7 mb-3 w-[70%] ">
                                            <h1 className="text-6xl font-medium" style={{
                                                backgroundImage: "linear-gradient(42deg, rgba(8,110,126,0.9556197478991597) 0%, rgba(0,212,255,1) 1%)",
                                                WebkitBackgroundClip: "text",
                                                color: "transparent"
                                            }}>
                                                {banner?.title}
                                            </h1>
                                            <p className="text-2xl">{banner?.text}</p>
                                            <div className="space-y-5">
                                                <p>
                                                    Coupon : <span className="   text-[rgb(103,235,255)]    border-b-2  ">{banner?.couponCode}</span>
                                                </p>
                                                <p>
                                                    Discount Price: <span className="text-2xl text-[rgb(103,235,255)]">${banner?.discountRate}</span>
                                                </p>
                                            </div>
                                            <Link to={"/allTest"}>
                                                Explore our latest Test  <span className="btn bg-[#219ebc]  text-white  btn-sm border-none hover:bg-[#3c738f]">Featured Test <FaHandHoldingMedical className="text-lg" /></span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </SwiperSlide>

                    )
                }





            </Swiper>
        </>
    );
};

export default Banner;



