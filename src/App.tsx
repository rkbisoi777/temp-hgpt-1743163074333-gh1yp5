// import { Routes, Route } from 'react-router-dom';
// import { Home } from './pages/Home';
// import { Chat } from './pages/Chat';
// import { PropertyDetail } from './components/property/PropertyDetail';
// import { Wishlist } from './pages/Wishlist';
// import { Compare } from './pages/Compare';
// import { Properties } from './pages/Properties';
// import { Profile } from './pages/Profile';
// import { Toaster } from 'react-hot-toast';
// import { Layout } from './components/layout/Layout';
// import { TokenProvider } from './components/TokenContext';
// import { AddProperty } from './pages/AddProperty';
// import { DeveloperRegistration } from './pages/DeveloperRegistration';
// import { DeveloperDashboard } from './pages/DeveloperDashboard';
// import { DeveloperProfile } from './pages/DeveloperProfile';
// import { ProtectedRoute } from './components/auth/ProtectedRoute';
// import { useEffect } from 'react';
// import { useAuthStore } from './store/authStore';
// import { LoginPage } from './components/auth/LoginPage';
// //import { RegisterPage } from './components/auth/RegisterPage';
// import { RegisterPage } from './components/auth/RegisterWithOTP';
// import { ModalProvider } from './components/LoginModalContext';
// import { LoginModal } from './components/LoginModal';

// function App() {
//   const { initializeSession } = useAuthStore();

//   useEffect(() => {
//     initializeSession();
//   }, [initializeSession]);

//   return (
//     <ModalProvider>
//     <TokenProvider>
//       <Layout>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/chat" element={<Chat />} />
//           <Route path="/login" element={<LoginPage/> }/>
//           <Route path="/register" element={<RegisterPage/>} />
//           <Route path="/property/:id" element={<PropertyDetail />} />
//           <Route path="/properties" element={<Properties />} />
//           <Route path="/developer/:id" element={<DeveloperProfile />} />
//           <Route path="/developer/register" element={<DeveloperRegistration />}/>

//           {/* Protected Routes */}
//           <Route
//             path="/wishlist"
//             element={
//               <ProtectedRoute>
//                 <Wishlist />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/compare"
//             element={
//               <ProtectedRoute>
//                 <Compare />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/developer/add-property"
//             element={
//               <ProtectedRoute>
//                 <AddProperty />
//               </ProtectedRoute>
//             }
//           />
         
//           <Route
//             path="/developer/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DeveloperDashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//         <Toaster
//           position="top-center"
//           toastOptions={{
//             style: {
//               border: '2px solid #338af1',
//               padding: '3px',
//               borderRadius: '8px',
//             },
//           }}
//         />
//         <LoginModal />
//       </Layout>
//     </TokenProvider>
//     </ModalProvider>
//   );
// }

// export default App;


import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home2';
import { Chat } from './pages/Chat';
import { PropertyDetail } from './components/property/PropertyDetail';
import { Wishlist } from './pages/Wishlist';
import { Compare } from './pages/Compare';
import { Properties } from './pages/Properties';
import { Profile } from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { TokenProvider } from './components/TokenContext';
import { AddProperty } from './pages/AddProperty';
import { DeveloperRegistration } from './pages/DeveloperRegistration';
import { DeveloperDashboard } from './pages/DeveloperDashboard';
import { DeveloperProfile } from './pages/DeveloperProfile';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterWithOTP';
import { ModalProvider } from './components/LoginModalContext';
import { LoginModal } from './components/LoginModal';
import { News } from './pages/News';
import { EditProperty } from './pages/EditProperty';

function App() {
  const { initializeSession } = useAuthStore();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  return (
    <ModalProvider>
      <TokenProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<LoginPage/> }/>
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/developer/:id" element={<DeveloperProfile />} />
            <Route path="/developer/register" element={<DeveloperRegistration />}/>
            <Route path="/news" element={<News />} />

            {/* Protected Routes */}
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/compare"
              element={
                <ProtectedRoute>
                  <Compare />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/developer/add-property"
              element={
                <ProtectedRoute>
                  <AddProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/developer/edit-property/:propertyId"
              element={
                <ProtectedRoute>
                  <EditProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/developer/dashboard"
              element={
                <ProtectedRoute>
                  <DeveloperDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                border: '2px solid #338af1',
                padding: '3px',
                borderRadius: '8px',
              },
            }}
          />
          <LoginModal />
        </Layout>
      </TokenProvider>
    </ModalProvider>
  );
}

export default App;