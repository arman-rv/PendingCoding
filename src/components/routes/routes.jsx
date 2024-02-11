import { LayoutPage } from "../../landing/layout";
import { LandingPage } from "../../landing/landing";
import { Courses } from "../../courses/courses";
import { CourseInfo } from "../../courses/[courseId]/course-info";
import { Teachers } from "../../teachers/teachers";
import { TeacherInfo } from "../../teachers/[teacherId]/teacher-info";
import { Blogs } from "../../blogs/blogs";
import { BlogInfo } from "../../blogs/[blogId]/blog-info";
import { Dashboard } from "../../dashboard/dashboard";
import { Home } from "../../dashboard/home/home";
import { MyCourses } from "../../dashboard/my-courses/my-courses";
import { Favorites } from "../../dashboard/favorites/favorites";
import { EditProfile } from "../../dashboard/edit/edit-profile";
import { NotFound } from "../../404_notFound/404";
import { ContactUs } from "../../contact_us/contact_us";
import { About } from "../../about/about";
import { Terms } from "../../auth/terms_and_conditions";
import { Auth } from "../../auth";
import { ForgetHolder } from "../../auth/resetPassword/forget-holder";
import { ResetHolder } from "../../auth/resetPassword/reset-holder";
import { VideoPlayer } from "../../courses/[courseId]/video-player";

const routes = [
  {
    id: "home",
    path: "/",
    label: "خانه",
  },
  {
    id: "courses",
    path: "/courses",
    label: "دوره‌ها",
  },
  {
    id: "blogs",
    path: "/blogs",
    label: "بلاگ‌",
  },
  {
    id: "teachers",
    path: "/teachers",
    label: "اساتید",
  },
  {
    id: "about",
    path: "/about",
    label: "درباره ما",
  },
  {
    id: "contact",
    path: "contact-us",
    label: "ارتباط با ما",
  },
];

const routers = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseInfo />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogInfo />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/teachers/:id",
        element: <TeacherInfo />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/terms-and-conditions",
        element: <Terms />,
      },
      {
        path: "/resetPassword/:id",
        element: <ResetHolder />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetHolder />,
      },
      {
        path: "/courses/:id/:url?",
        element: <VideoPlayer />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/dashboard/my-courses",
        element: <MyCourses />,
      },
      {
        path: "/dashboard/favorites",
        element: <Favorites />,
      },
      {
        path: "/dashboard/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { routes, routers };
