import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import UserProfile from './screens/UserProfile';
import UserScreen from './screens/UserScreen';
import ApplySeller from './screens/ApplySeller';
import SellerDashboard from './screens/SellerDashboard';
import SubscriptionScreen from './screens/SubscriptionScreen';
import SubscriptionList from './screens/SubscriptionList';
import OrderScreen from './screens/OrderScreen';
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/detail/:id" element={<DetailScreen />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/order/:id" element={<OrderScreen />} />

            {/* Authenticated User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/apply-seller" element={<ApplySeller />} />
              <Route path="/subscription" element={<SubscriptionScreen />} />
            </Route>

            {/* Seller & Admin Routes */}
            <Route element={<ProtectedRoute isSeller />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
            </Route>

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute isAdmin />}>
              <Route path="/admin/users" element={<UserScreen />} />
              <Route path="/admin/subscriptions" element={<SubscriptionList />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Chatbot/>
      <Footer />
    </Router>
  );
};

export default App;