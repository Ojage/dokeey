import React from 'react';
import { Layout, Typography, Row, Col, Space, Divider } from 'antd';
import { FileTextOutlined, LinkedinOutlined, GithubOutlined, TwitterOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter
      style={{
        backgroundColor: '#1f1f1f',
        color: 'white',
        padding: '48px 24px 24px',
        marginTop: 64,
        borderTop: '1px solid #333',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          {/* Brand Section */}
          <Col xs={24} lg={8}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
                  boxShadow: '0 4px 12px rgba(0, 120, 212, 0.3)',
                }}
              >
                <FileTextOutlined style={{ color: 'white', fontSize: 20 }} />
              </div>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: 'white',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                }}
              >
                dokeey
              </Title>
            </div>
            <Text
              style={{
                color: '#b3b3b3',
                fontSize: 15,
                lineHeight: 1.6,
                display: 'block',
                maxWidth: 320,
                marginBottom: 24,
              }}
            >
              Good-grade document conversion platform designed for modern workflows. 
              Secure, fast, and built for productivity.
            </Text>
            
            {/* Social Links */}
            <Space size={16}>
              <Link 
                href="#" 
                style={{ 
                  color: '#b3b3b3', 
                  fontSize: 18,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0078d4'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
              >
                <LinkedinOutlined />
              </Link>
              <Link 
                href="#" 
                style={{ 
                  color: '#b3b3b3', 
                  fontSize: 18,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0078d4'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
              >
                <GithubOutlined />
              </Link>
              <Link 
                href="#" 
                style={{ 
                  color: '#b3b3b3', 
                  fontSize: 18,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0078d4'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
              >
                <TwitterOutlined />
              </Link>
            </Space>
          </Col>
          
          {/* Navigation Sections */}
          <Col xs={24} lg={16}>
            <Row gutter={[32, 24]}>
              <Col xs={12} md={6}>
                <Title 
                  level={5} 
                  style={{ 
                    color: 'white', 
                    marginBottom: 16, 
                    fontSize: 16, 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Product
                </Title>
                <Space direction="vertical" size={12}>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Features
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Security
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Mobile App
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Pricing
                  </Link>
                </Space>
              </Col>
              
              <Col xs={12} md={6}>
                <Title 
                  level={5} 
                  style={{ 
                    color: 'white', 
                    marginBottom: 16, 
                    fontSize: 16, 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Support
                </Title>
                <Space direction="vertical" size={12}>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Help Center
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Contact Us
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Documentation
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    API Reference
                  </Link>
                </Space>
              </Col>
              
              <Col xs={12} md={6}>
                <Title 
                  level={5} 
                  style={{ 
                    color: 'white', 
                    marginBottom: 16, 
                    fontSize: 16, 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Company
                </Title>
                <Space direction="vertical" size={12}>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    About Us
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Careers
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Blog
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Press Kit
                  </Link>
                </Space>
              </Col>
              
              <Col xs={12} md={6}>
                <Title 
                  level={5} 
                  style={{ 
                    color: 'white', 
                    marginBottom: 16, 
                    fontSize: 16, 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Legal
                </Title>
                <Space direction="vertical" size={12}>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Terms of Service
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    Cookie Policy
                  </Link>
                  <Link 
                    href="#" 
                    style={{ 
                      color: '#b3b3b3', 
                      fontSize: 14,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b3b3b3'}
                  >
                    GDPR
                  </Link>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
        
        {/* Bottom Section */}
        <Divider style={{ borderColor: '#333', margin: '40px 0 24px' }} />
        
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Text style={{ color: '#888', fontSize: 14 }}>
              © {new Date().getFullYear()} dokeey. All rights reserved.
            </Text>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Text style={{ color: '#888', fontSize: 14 }}>
              Built with ❤️ by{' '}
              <Link 
                href="https://salathiel.ojage.com" 
                style={{ 
                  color: '#0078d4',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                Ojage
              </Link>
              , the developer
            </Text>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;