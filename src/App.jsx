import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoreProvider from '@/components/state/store-provider';
import { SocketProvider } from '@/components/state/socket.provider';
import Layout from '@/components/layout/layout';
import HomePage from './app/page.jsx';
import LoginPage from './app/info/login/page.jsx';
import BlogPage from './app/info/blog/page.jsx';
import BlogDetailsPage from './app/info/blog/[slug]/page.jsx';
import AboutUsPage from './app/info/about-us/page.jsx';
import PrivacyPage from './app/info/privacy-policy/page.jsx';
import TermsPage from './app/info/terms-of-use/page.jsx';
import SupportPage from './app/info/support/page.jsx';
import RazorpayPage from './app/info/payment/razorpay/page.jsx';
import PaymentSuccessPage from './app/info/payment/success/page.jsx';
import PaymentFailedPage from './app/info/payment/failed/page.jsx';
import CallsPage from './app/main/calls/page.jsx';
import CallDetailsPage from './app/main/calls/[slug]/page.jsx';
import ChatsPage from './app/main/chats/page.jsx';
import ChatDetailsPage from './app/main/chats/[slug]/page.jsx';
import DetailsIndexPage from './app/main/details/page.jsx';
import ServiceDetailsPage from './app/main/details/[slug]/page.jsx';
import SearchPage from './app/main/search/page.jsx';
import UserHistoryPage from './app/main/user/history/page.jsx';
import UserPage from './app/main/user/page.jsx';
import VCallsPage from './app/main/v-calls/page.jsx';
import VCallDetailsPage from './app/main/v-calls/[slug]/page.jsx';
import WalletPage from './app/main/wallet/page.jsx';
import WalletDetailsPage from './app/main/wallet/[slug]/page.jsx';
import NotFoundPage from './app/not-found';

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <SocketProvider>
          <Layout lib={{}}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPage />} />
              <Route path="/terms-of-use" element={<TermsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/payment/razorpay" element={<RazorpayPage />} />
              <Route path="/payment/success" element={<PaymentSuccessPage />} />
              <Route path="/payment/failed" element={<PaymentFailedPage />} />
              <Route path="/calls" element={<CallsPage />} />
              <Route path="/calls/:slug" element={<CallDetailsPage />} />
              <Route path="/chats" element={<ChatsPage />} />
              <Route path="/chats/:slug" element={<ChatDetailsPage />} />
              <Route path="/details" element={<DetailsIndexPage />} />
              <Route path="/details/:slug" element={<ServiceDetailsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/user/history" element={<UserHistoryPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/v-calls" element={<VCallsPage />} />
              <Route path="/v-calls/:slug" element={<VCallDetailsPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/wallet/:slug" element={<WalletDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </SocketProvider>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
