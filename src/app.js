

import { Route, Routes } from "react-router-dom";
import Comments from "./components/comments";
import Task from "./components/dashboardPage";
import { BrowserRouter } from 'react-router-dom';
import UserProfileEdit from "./profilePage";
import { Box } from "@chakra-ui/react"
import Login from "./loginPage"
import SignIn from "./signupPage"
import {Template as Home,WithSubnavigation} from "./components/homePage"
import HeaderPage from "./headerPage"
import FooterPage from "./footerPage"
import TestimonialCard from "./aboutPage"
import ProtectedRoute from './components/routeProtector'


function App() {
	return (
		<Box  mx="auto" height="auto" bgGradient='linear(blue.100 0%, pink.100 25%,blue.100 50%)'>
		   <HeaderPage></HeaderPage>
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='/signup' element={<SignIn/>} />
				<Route path='/login' element={<Login/>} />
				<Route path='/about' element={<TestimonialCard/>} />
				<Route
            path="/task"
            element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            }
			
          />
			<Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfileEdit />
              </ProtectedRoute>
            } />
            <Route path="task" element={<Task />} />
			</Routes>
			<FooterPage/>
		</Box>
	);
}

export default App;