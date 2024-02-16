import { useEffect, useState } from "react";
import { Grid2x2, Newspaper, Rows } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import NavigatorTracer from "../components/navigator-tracer";
import { Seperator } from "../components/seperator";
import { SearchInput } from "../components/search";
import { Select } from "../components/select";
import { Banner } from "../components/banner";
import { cn } from "../../libs/utils";
import { Loading } from "../components/loading";
import { BlogCards } from "./blog-cards";

import Image from "../assets/REACTjs.webp";
import CSharp from "../assets/cSharp.jpg";
import CPlus from "../assets/c++.jpg";
import Physics from "../assets/physics.jpg";
import SQL from "../assets/sql.jpg";

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

const orderBy = [
  {
    id: 19,
    label: "مرتب سازی بر اساس",
    value: "",
  },
  {
    id: 20,
    label: "طولانی ترین",
    value: "longest",
  },
  {
    id: 21,
    label: "قدیمی ترین",
    value: "oldest",
  },
  {
    id: 22,
    label: "محبوب ترین",
    value: "popular",
  },
];

export const Blogs = () => {
  let filteredData = [];
  const [isVertical, setIsVertical] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const blog_name = searchParams.get("blog_name");
  const blogFilterBy = searchParams.get("blogFilterBy");
  const itemsPerPage = parseInt(searchParams.get("items-per-page"));

  filteredData = blogs.filter((blog) => {
    if (!blog_name) return blog;
    else if (
      blog?.title
        .replace(/ /g, "")
        .replace("آ", "ا")
        .toLowerCase()
        .includes(blog_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase())
    )
      return blog;
  });

  if (blogFilterBy) {
    const newArray = [...filteredData];
    if (blogFilterBy === "longest")
      newArray.sort((a, b) => a.describe?.length - b.describe?.length);
    if (blogFilterBy === "oldest")
      newArray.sort((a, b) => new Date(a.insertDate) - new Date(b.insertDate));
    if (blogFilterBy === "popular")
      newArray.sort((a, b) => b.currentLikeCount - a.currentLikeCount);

    filteredData = newArray;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-[1900px] mx-auto flex flex-col items-start justify-center gap-y-10 p-0 md:p-20">
      <div className="flex justify-center items-center">
        <NavigatorTracer />
      </div>
      <Banner title="لیست بلاگ" />
      <Seperator />
      <div
        className={cn(
          "w-full flex flex-col xl:flex-row items-start justify-between gap-x-10"
        )}
      >
        {/* Grid div */}
        <div className="w-full flex flex-col justify-center items-start gap-y-5">
          {/* FilterDiv */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-2">
            <div>
              <SearchInput
                queryName="blog_name"
                placeholder="جستجو کنید ..."
                className="px-4 py-2"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <Select
                queryName="blogFilterBy"
                placeholder="جستجو بر اساس"
                filters={orderBy}
                className="py-3 px-5"
              />
              <div
                onClick={() => setIsVertical((c) => !c)}
                className="text-gray-500 hover:text-gray-600 transition cursor-pointer"
              >
                {isVertical ? (
                  <Grid2x2 className="h-7 w-7" />
                ) : (
                  <Rows className="h-7 w-7" />
                )}
              </div>
            </div>
          </div>
          {/* Grid Div */}
          {filteredData.length > 0 ? (
            <div className="w-full">
              <BlogCards
                courses={filteredData}
                itemsPerPage={itemsPerPage | 6}
                isVertical={isVertical}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3 items-center justify-center my-52 dark:bg-gray-800">
              <Newspaper className="w-12 h-12 text-gray-600/90 dark:text-gray-300" />
              <p className="text-zinc dark:text-gray-300 text-xl">
                بلاگ مورد نظر پیدا نشد
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
