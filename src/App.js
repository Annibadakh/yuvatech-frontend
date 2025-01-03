
import { createBrowserRouter, RouterProvider, Outlet, useNavigation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import HomePage from "./pages/HomePage.jsx"
import Users from "./pages/Users.jsx";
import Courses from "./pages/Courses.jsx"; // Changed from "Products" to "Courses"
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import AddCourse from "./pages/AddCourse.jsx"; // Changed from "AddProduct" to "AddCourse"
import EditCourse from "./pages/EditCourse.jsx"; // Changed from "EditProduct" to "EditCourse"
// import LoginForm from "./components/Signup";
import EnrollStudent from "./pages/EnrollStudent.jsx";
import PaymentForm from "./components/PaymentForm.jsx";
import AddPayments from "./pages/AddPayments.jsx"
import UpdatePayment from "./pages/UpdatePayment.jsx"
import MyTransactions from "./pages/MyTransactions.jsx";
import PaymentDetails from "./pages/ViewPayments.jsx";
import UploadDocuments from "./pages/UploadDocuments.jsx";
import ViewEnrollments from "./pages/ViewEnrollments.jsx"
import Enrollment from "./pages/Enrollment.jsx"
// import "bulma/css/bulma.css";
import './styles/index.module.css';
import Contact from "./pages/ContactUs.jsx"
import EditCourseDocuments from "./pages/EditCourseDocuments.jsx";
import CourseDocuments from "./pages/CourseDocuments.jsx";
import EditEnrollment from "./pages/EditEnrollment.jsx";
import StudentInfo from "./pages/StudentInfo.jsx";
import MyEnrollments from "./pages/MyEnrollments.jsx";
import EditDocuments from "./pages/EditDocument.jsx";
import Errors from "./pages/Error.jsx";
import Studymaterial from "./pages/StudyMaterial.jsx";
import MyProfile from "./pages/Profile.jsx";
import StaffProfile from "./pages/StaffProfile.jsx"
import EditStudent from "./pages/EditStudent.jsx";
import CancelEnrollment from "./pages/Cancelledenrollments.jsx";
import CompletedEnrollment from "./pages/CompletedEnrollments.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import DuePayment from "./pages/DuePayment.jsx";
import Form  from  "./pages/Form.jsx";
import BlogInputPage from "./pages/BlogInputPage.jsx";


import Loader from './loader/Loader.jsx';
import { SidebarProvider } from "./features/SidebarContext.js";

const AppLayout = () => {
  const navigation = useNavigation(); // Get navigation state

  return (
    <SidebarProvider>
      {navigation.state === "loading" && <Loader />}
      <Outlet />
    </SidebarProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/contacts", element: <Contact /> },
      { path: "/profile", element: <MyProfile /> },
      { path: "/myprofile", element: <StaffProfile /> },
      { path: "/budget", element: <BudgetPage /> },
      { path: "/duepayment/:enrollmentId", element: <DuePayment /> },
      { path: "/bloginput", element: <BlogInputPage /> },
      { path: "/studentdashboard", element: <StudentDashboard /> },
      { path: "/mytransactions", element: <MyTransactions /> },
      { path: "/enroll", element: <Enrollment /> },
      { path: "/enroll/:id", element: <Enrollment /> },
      { path: "/student/:id", element: <EditStudent /> },
      { path: "/editenrollment/:enrollmentId", element: <EditEnrollment /> },
      { path: "/cancelledenrollments", element: <CancelEnrollment /> },
      { path: "/completedenrollments", element: <CompletedEnrollment /> },
      { path: "/student", element: <EnrollStudent /> },
      { path: "/courses/viewenrollments", element: <ViewEnrollments /> },
      { path: "/studentinfo", element: <StudentInfo /> },
      { path: "/paymentdetails", element: <PaymentDetails /> },
      { path: "/payments", element: <AddPayments /> },
      { path: "/payments/:paymentId", element: <UpdatePayment /> },
      { path: "/myEnrollments", element: <MyEnrollments /> },
      { path: "/users", element: <Users /> },
      { path: "/users/add", element: <AddUser /> },
      { path: "/users/edit/:id", element: <EditUser /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/add", element: <AddCourse /> },
      { path: "/courses/edit/:id", element: <EditCourse /> },
      { path: "/courses/editdocuments/:id", element: <EditCourseDocuments /> },
      { path: "/courses/editdocument/:id", element: <EditDocuments /> },
      { path: "/courses/viewcoursedocuments/:id", element: <CourseDocuments /> },
      { path: "/courses/studymaterial/:id", element: <Studymaterial /> },
      { path: "/register/:studentId", element: <Form /> },
      { path: "/register", element: <Form /> },
      { path: "*", element: <Errors /> }, // Catch-all route for undefined paths
    ],
  },
]);



function App() {
  return <RouterProvider router={router} />;
}


export default App;
