import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { antdTheme } from './theme';
import Header from './components/Header';
import Hero from './components/Hero';
import FileUploader from './components/FileUploader';
import Features from './components/Features';
import Footer from './components/Footer';

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content>
          <Hero />
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <FileUploader />
          </div>
          <Features />
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}

export default App;