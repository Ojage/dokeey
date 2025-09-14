import React, { useState } from 'react';
import { Layout, Typography, Button, Space, Drawer, Menu, Avatar, Badge } from 'antd';
import { 
  FileTextOutlined, 
  MenuOutlined, 
  UserOutlined, 
  SettingOutlined, 
  BellOutlined,
  SearchOutlined,
  CloudOutlined,
  SecurityScanOutlined,
  MobileOutlined,
  CloseOutlined,
  LoginOutlined,
  LogoutOutlined
} from '@ant-design/icons';
// import { login, logout, store } from '../store';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;


const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const { isAuthenticated, user } = useSelector(state => state);
  // const dispatch = useDispatch();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleLogin = () => {
    // Simulate login
    // dispatch(login({
    //   name: 'John Doe',
    //   email: 'john.doe@company.com',
    //   avatar: null
    // }));
  };

  const isAuthenticated = false; // Replace with actual auth state from Redux
  const user = {email: "joh@gmail.com", name: "Johaness ben"}; // Replace with actual user data from Redux
  const handleLogout = () => {
    // dispatch(logout());
    setDrawerVisible(false);
  };

  // Public navigation items (always visible)
  const publicNavItems = [
    { key: 'features', label: 'Features', icon: <CloudOutlined /> },
    { key: 'security', label: 'Security', icon: <SecurityScanOutlined /> },
    { key: 'pricing', label: 'Pricing', icon: <FileTextOutlined /> },
  ];

  // Authenticated navigation items (only visible when logged in)
  const authenticatedNavItems = [
    { key: 'mobile', label: 'Mobile App', icon: <MobileOutlined /> },
  ];

  // All navigation items based on auth status
  const navItems = isAuthenticated 
    ? [...publicNavItems, ...authenticatedNavItems]
    : publicNavItems;

  return (
    <>
      <AntHeader
        style={{
          background: '#0078d4',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Left Side - Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <FileTextOutlined style={{ color: 'white', fontSize: 20 }} />
          </div>
          <Title
            level={4}
            style={{
              margin: 0,
              color: 'white',
              fontWeight: 700,
              fontSize: 20,
              fontFamily: 'Segoe UI, system-ui, sans-serif',
              letterSpacing: '-0.5px',
            }}
          >
            dokeey
          </Title>
        </div>

        {/* Center - Navigation (Desktop) */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <Button
              key={item.key}
              type="text"
              icon={item.icon}
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                height: 44,
                padding: '0 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Right Side - Actions */}
        <Space size={8}>
          {/* Authenticated features */}
          {isAuthenticated && (
            <>
              {/* Search Button (Desktop) */}
              <Button
                type="text"
                icon={<SearchOutlined />}
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  width: 44,
                  height: 44,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
                className="desktop-only"
              />

              {/* Notifications */}
              <Badge count={3} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    width: 44,
                    height: 44,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  }}
                  className="desktop-only"
                />
              </Badge>

              {/* User Avatar (Desktop) */}
              <Avatar
                icon={<UserOutlined />}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                className="desktop-only"
              />
            </>
          )}

          {/* Login Button (when not authenticated) */}
          {!isAuthenticated && (
            <Button
              type="default"
              icon={<LoginOutlined />}
              onClick={handleLogin}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                height: 44,
                padding: '0 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              className="desktop-only"
            >
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{
              color: 'white',
              border: 'none',
              width: 44,
              height: 44,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            className="mobile-only"
          />
        </Space>
      </AntHeader>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: 6,
                background: '#0078d4',
              }}
            >
              <FileTextOutlined style={{ color: 'white', fontSize: 16 }} />
            </div>
            <Text strong style={{ fontSize: 18, fontFamily: 'Segoe UI, system-ui, sans-serif' }}>
              dokeey
            </Text>
          </div>
        }
        placement="right"
        closable={false}
        onClose={closeDrawer}
        open={drawerVisible}
        width={320}
        styles={{
          body: { padding: 0 },
          header: { 
            borderBottom: '1px solid #f0f0f0',
            padding: '16px 24px'
          }
        }}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={closeDrawer}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        }
      >
        <Menu
          mode="vertical"
          style={{
            border: 'none',
            fontSize: '15px',
            fontFamily: 'Segoe UI, system-ui, sans-serif',
          }}
          items={[
            // Authenticated user features
            ...(isAuthenticated ? [
              {
                key: 'profile',
                icon: <UserOutlined />,
                label: 'Profile',
                style: { height: 56, display: 'flex', alignItems: 'center' }
              },
              {
                key: 'notifications',
                icon: <Badge count={3} size="small"><BellOutlined /></Badge>,
                label: 'Notifications',
                style: { height: 56, display: 'flex', alignItems: 'center' }
              },
              { type: 'divider' }
            ] : []),
            
            // Navigation items
            ...navItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              style: { height: 56, display: 'flex', alignItems: 'center' }
            })),
            
            { type: 'divider' },
            
            // Auth-dependent menu items
            ...(isAuthenticated ? [
              {
                key: 'settings',
                icon: <SettingOutlined />,
                label: 'Settings',
                style: { height: 56, display: 'flex', alignItems: 'center' }
              },
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                style: { height: 56, display: 'flex', alignItems: 'center', color: '#ff4d4f' },
                onClick: handleLogout
              },
            ] : [
              {
                key: 'login',
                icon: <LoginOutlined />,
                label: 'Login',
                style: { height: 56, display: 'flex', alignItems: 'center', color: '#0078d4' },
                onClick: handleLogin
              },
            ]),
          ]}
        />
        
        {/* User Info at Bottom (only when authenticated) */}
        {isAuthenticated && user && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px',
              borderTop: '1px solid #f0f0f0',
              background: '#fafafa',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar icon={<UserOutlined />} />
              <div>
                <Text strong style={{ display: 'block', fontSize: '14px' }}>{user?.name}</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>{user?.email}</Text>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .desktop-only {
              display: none !important;
            }
          }
          
          @media (min-width: 769px) {
            .mobile-only {
              display: none !important;
            }
          }
          
          .ant-drawer-header {
            background: #fafafa;
          }
          
          .ant-menu-item:hover {
            background-color: rgba(0, 120, 212, 0.06) !important;
            color: #0078d4 !important;
          }
          
          .ant-menu-item-selected {
            background-color: rgba(0, 120, 212, 0.1) !important;
            color: #0078d4 !important;
          }
        `}
      </style>
    </>
  );
};

export default Header;