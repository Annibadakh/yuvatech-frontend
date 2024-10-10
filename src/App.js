
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import HomePage from "./pages/HomePage.jsx"
import Login from "./components/Login.jsx";
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


// import Twinsdoc from "./components/Twinsdoc.jsx"
// import MultiStepForm from "./components/MultiStepForm.jsx";
import Form  from  "./pages/Form.jsx";
import { SidebarProvider } from "./features/SidebarContext.js";
function App() {
  return (
    <div>
      
      <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />

          

          {/* <Route path="/signup" element={<LoginForm />} /> */}


        {/* Dashboard Routes */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/profile" element={<MyProfile />} /> 
          <Route path="/myprofile" element={<StaffProfile />} />
          <Route path="/budget" element={<BudgetPage />} />


          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/mytransactions" element={<MyTransactions />} />


          {/* EnrollmentRoutes */}
          <Route path="/enroll" element={<Enrollment />} />
          <Route path="/enroll/:id" element={<Enrollment />} />
          <Route path="/student/:id" element={<EditStudent />} />

          <Route path="/editenrollment/:enrollmentId" element={<EditEnrollment />} />
          <Route path="/cancelledenrollments" element={<CancelEnrollment />} />
          <Route path="/completedenrollments" element={<CompletedEnrollment />} />



          <Route path="/student" element={<EnrollStudent />} />
          <Route path="/courses/viewenrollments" element={<ViewEnrollments />} />
          <Route path="/studentinfo" element={<StudentInfo />} />
          <Route path="/paymentdetails" element={<PaymentDetails />} />
          
          <Route component={Errors } />



          {/* <Route path="/courses/enroll/uploaddocuments/:studentId" element={<UploadDocuments />} /> */}

          <Route path="/payments" element={<AddPayments />}/>
          <Route path="/payments/:paymentId" element={<UpdatePayment />}/>

          {/* <Route path="/payments/:enrollmentId" element={<AddPayments />}/> */}

          <Route path="/myEnrollments" element={<MyEnrollments />} />



          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/courses" element={<Courses />} /> 
          <Route path="/courses/add" element={<AddCourse />} /> 
          <Route path="/courses/edit/:id" element={<EditCourse />} /> 
          <Route path="/courses/editdocuments/:id" element={<EditCourseDocuments />} />  
          <Route path="/courses/editdocument/:id" element={<EditDocuments />} />
          <Route path="/courses/viewcoursedocuments/:id" element={<CourseDocuments />} /> 
          <Route path="/courses/studymaterial/:id" element={<Studymaterial />} /> 

          <Route path="/register/:studentId" element={<Form />} /> 
          <Route path="/register" element={<Form />} /> 


        </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
