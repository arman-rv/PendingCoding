// import { createContext, useMemo, useState } from "react";
// import { toast } from "react-hot-toast";

// import { useModal } from "../../hooks/use-modal-store";
// import {
//   // reserveCourse,
//   deleteReservedCourse,
// } from "../../core/services/api/user";
// import {
//   // addCourseToFavorites,
//   deleteCourseFavorite,
// } from "../../core/services/api/get-courses";
// // import { addBlogToFavorite } from "../../core/services/api/get-blogs";
// import { setItem } from "../../core/services/common/storage.services";

// export const UserContext = createContext(null);

// function UserProvider({ children }) {
//   const { onClose } = useModal();

//   const userInfo = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

//   const [userData, setUserData] = useState(
//     userInfo || {
//       user: null,
//       cart: [],
//       favoriteCourse: [],
//       favoriteBlog: [],
//       myCourses: [],
//     }
//   );

//   const removeFromCart = async (courseId, reserveId) => {
//     try {
//       await deleteReservedCourse(reserveId).then(() => {
//         const newObj = {
//           ...userData,
//           cart: userData.cart.filter((c) => c.courseId !== courseId),
//         };
//         setUserData(newObj);
//         userData.cart.length === 1 && onClose();
//         setItem("user", newObj);
//         toast.success("دوره با موفقیت حذف شد");
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
//     } finally {
//       onClose();
//     }
//   };

//   const checkout = (course) => {
//     const newObj = {
//       ...userData,
//       cart: userData.cart.filter((c) => c.id !== course.id),
//       myCourses: userData.myCourses.find((mc) => mc.id === course.id)
//         ? [...userData.myCourses]
//         : [...userData.myCourses, { ...course }],
//     };
//     setUserData(newObj);
//     localStorage.setItem("user", JSON.stringify(newObj));
//   };
//   return (
//     <UserContext.Provider
//       value={{
//         userData,
//         setUserData,
//         removeFromCart,
//         checkout,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export { UserProvider };

import { createContext, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { useModal } from "../../hooks/use-modal-store";

// import { addBlogToFavorite } from "../../core/services/api/get-blogs";
import { setItem } from "../../core/services/common/storage.services";

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const { onClose } = useModal();

  const userInfo = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const [userData, setUserData] = useState(
    userInfo || {
      user: null,
      cart: [],
      favoriteCourse: [],
      favoriteBlog: [],
      myCourses: [],
    }
  );

  const removeFromCart = (id) => {
    const newObj = {
      ...userData,
      cart: userInfo.cart.filter((c) => c.courseId !== id),
    };
    setItem("user", newObj);
    setUserData(newObj);
    toast.success("دوره از سبد خرید حذف شد");
    onClose();
  };

  const addToCart = (course) => {
    const newObj = {
      ...userData,
      cart: userData.cart.find((c) => c.courseId === course.courseId)
        ? [...userData.cart]
        : [...userData.cart, course],
    };
    setItem("user", newObj);
    setUserData(newObj);
    toast.success("دوره به سبد خرید اضافه شد");
    onClose();
  };

  const courseBookmark = (course) => {
    const newObj = {
      ...userData,
      favoriteCourse: userData.favoriteCourse.find(
        (c) => c.courseId === course.courseId
      )
        ? [userData.favoriteCourse]
        : [...userData.favoriteCourse, course],
    };
    setItem("user", newObj);
    setUserData(newObj);
    toast.success("دوره به لیست علاقه‌مندی اضافه شد");
  };

  const removeCourseBookmark = (id) => {
    const newObj = {
      ...userData,
      favoriteCourse: userData.favoriteCourse.filter((c) => c.courseId !== id),
    };

    setItem("user", newObj);
    setUserData(newObj);
    toast.success("دوره از لیست علاقه‌مندی حذف شد");
  };

  const blogBookmark = (blog) => {
    const newObj = {
      ...userData,
      favoriteBlog: userData.favoriteBlog.find((c) => c.id === blog.id)
        ? [userData.favoriteBlog]
        : [...userData.favoriteBlog, blog],
    };
    setItem("user", newObj);
    setUserData(newObj);

    toast.success("مقاله به لیست علاقه‌مندی اضافه شد");
  };

  const removeBlogBookmark = (id) => {
    const newObj = {
      ...userData,
      favoriteBlog: userData.favoriteBlog.filter((c) => c.id !== id),
    };
    setItem("user", newObj);
    setUserData(newObj);
    toast.success("مقاله از لیست علاقه‌مندی حذف شد");
  };

  const checkout = (course) => {
    const newObj = {
      ...userData,
      myCourses: userData.myCourses.find((c) => c.courseId === course.courseId)
        ? [...userData.myCourses]
        : [...userData.myCourses, course],
      cart: userData.cart.filter((c) => c.courseId !== course.courseId),
    };
    setItem("user", newObj);
    setUserData(newObj);
    toast.success("دوره خریداری شد");
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        removeFromCart,
        addToCart,
        courseBookmark,
        removeCourseBookmark,
        blogBookmark,
        removeBlogBookmark,
        checkout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
