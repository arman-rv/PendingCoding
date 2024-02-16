import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { VerticalCard } from "../vertical-card";
import { Loading } from "../../components/loading";


import Image from "../../assets/REACTjs.webp";
import CSharp from "../../assets/cSharp.jpg";
import CPlus from "../../assets/c++.jpg";
import Physics from "../../assets/physics.jpg";
import SQL from "../../assets/sql.jpg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const blogs = [
  {
    id: 0,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 200_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 1,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 200_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 2,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 200_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 3,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 4,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 5,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "آرمان رضوانی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 6,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 7,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 8,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 500_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 9,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 10,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 32,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال ثبت نام",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 11,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 12,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Image,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "ری اکت",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "ReactJS",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 13,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: CPlus,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "C++",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C++",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 14,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: CPlus,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "C++",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C++",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 15,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: CSharp,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "C#",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C#",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 16,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: CSharp,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "C#",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "C#",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 17,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: SQL,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "SQL",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "SQL",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 18,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: SQL,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: true,
    likeCount: 24,
    title: "SQL",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "SQL",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 19,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Physics,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 24,
    title: "فیزیک",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "Physics",
    currentView: 20,
    currentLikeCount: 32,
  },
  {
    id: 20,
    updateDate: "2024-02-16T05:34:42.901Z",
    currentImageAddressTumb: Physics,
    description: `adsadoj
    adasdmasdnaoandna
    ojasnodaijasndnasdansdiasdniandidn1
    u21d21hd12dn12dg1d12d1dtdb1pudg12d1pdgy
    udpygddgypbqwdbqwdqdbhqbdbqdu`,
    isBlog: false,
    likeCount: 24,
    title: "فیزیک",
    currentRegistrants: 20,
    statusName: "درحال برگذاری",
    addUserFullName: "امیرعباس بابائی",
    levelName: "پیشرفته",
    cost: 2_000_000,
    courseRate: 3,
    currentRate: 4,
    technologyList: "Physics",
    currentView: 20,
    currentLikeCount: 32,
  },
];

export const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={20}
        breakpoints={{
          700: {
            slidesPerView: 1,
          },
          975: {
            slidesPerView: 2,
          },
          1270: {
            slidesPerView: 2,
          },
          1300: {
            slidesPerView: 3,
          },
          1625: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <VerticalCard blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
