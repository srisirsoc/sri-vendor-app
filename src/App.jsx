import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoreProvider from './store/store-provider';
import { SocketProvider } from './store/socket.provider';
import VendorDashboard from './main/home/home-page';
import Layout from './components/layout/layout';
import LoginPage from './main/login/page';
import BlogPage from './main/blog/page';
import BlogDetailsPage from './main/blog/details';
import AboutUsPage from './main/about-us/page';
import PrivacyPage from './main/privacy-policy/page';
import TermsPage from './main/terms-of-use/page';
import SupportPage from './main/support/page';
import CallsPage from './main/calls/page';
import CallDetailsPage from './main/calls/call-details';
import ChatsPage from './main/chats/page';
import ChatDetailsPage from './main/chats/details';
import VendorPage from './main/user/page';
import HistoryPage from './main/history/page';
import VCallsPage from './main/vcalls/page';
import EditProfile from './main/user/details';
import VCallDetailsPage from './main/vcalls/details';
// import ChatDetailsPage from './main/chats/chat-details';
// import DetailsIndexPage from './main/details/index';
// import ServiceDetailsPage from './main/details/service-details';
// import SearchPage from './main/search/page';
// import UserHistoryPage from './main/user/history';
// import UserPage from './main/user/page';
// import VCallsPage from './main/vcalls/page';
// import VCallDetailsPage from './main/vcalls/details';
// import WalletPage from './main/wallet/page';
// import WalletDetailsPage from './main/wallet/details';
// import RazorpayPage from './main/payment/razorpay';
// import PaymentSuccessPage from './main/payment/success';
// import PaymentFailedPage from './main/payment/failed';
// import NotFoundPage from './main/not-found/page';

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <SocketProvider>
          <Layout lib={{}}>
            <Routes>
              <Route path="/" element={<VendorDashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/terms-of-use" element={<TermsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/calls" element={<CallsPage />} />
              <Route path="/calls/:slug" element={<CallDetailsPage />} />
              <Route path="/chats" element={<ChatsPage />} />
              <Route path="/chats/:slug" element={<ChatDetailsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/user" element={<VendorPage />} />
              <Route path="/user/:slug" element={<EditProfile />} />
              <Route path="/vcalls" element={<VCallsPage />} />
              <Route path="/vcalls/:slug" element={<VCallDetailsPage />} />
              {/* 
              <Route path="/vcalls/:slug" element={<VCallDetailsPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/wallet/:slug" element={<WalletDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </Layout>
        </SocketProvider>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
