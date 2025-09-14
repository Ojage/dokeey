import React from 'react';
import { Typography, Space, Button, Row, Col } from 'antd';
import { ArrowRightOutlined, PlayCircleOutlined, DownloadOutlined, SecurityScanOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Hero: React.FC = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 50%, #005a9e 100%)',
        color: 'white',
        padding: '80px 24px 120px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px',
          animation: 'float 20s ease-in-out infinite',
        }}
      />

      {/* Floating Elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '120px',
          height: '120px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '20px',
          transform: 'rotate(12deg)',
          animation: 'floatSlow 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '12px',
          transform: 'rotate(-8deg)',
          animation: 'floatSlow 6s ease-in-out infinite reverse',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={14}>
            <Space direction="vertical" size={32} style={{ width: '100%' }}>
              {/* Main Heading */}
              <div>
                <Title
                  level={1}
                  style={{
                    color: 'white',
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                  }}
                >
                  Transform documents
                </Title>
                <Title
                  level={1}
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 300,
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                  }}
                >
                  with confidence
                </Title>
              </div>

              {/* Subtitle */}
              <Paragraph
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: 500,
                  fontFamily: 'Segoe UI, system-ui, sans-serif',
                }}
              >
                Convert images and documents to PDF with enterprise-grade security. 
                Designed for modern mobile workflows and productivity at scale.
              </Paragraph>

              {/* Feature Highlights */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', margin: '16px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SecurityScanOutlined style={{ color: '#ffffff', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '14px', fontWeight: 500 }}>
                    Enterprise Security
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlayCircleOutlined style={{ color: '#ffffff', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '14px', fontWeight: 500 }}>
                    Mobile Optimized
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DownloadOutlined style={{ color: '#ffffff', fontSize: '18px' }} />
                  <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '14px', fontWeight: 500 }}>
                    Instant Processing
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <Space size={16} wrap>
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  style={{
                    background: 'white',
                    borderColor: 'white',
                    color: '#0078d4',
                    height: '56px',
                    padding: '0 32px',
                    fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '4px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    border: '2px solid white',
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  size="large"
                  icon={<PlayCircleOutlined />}
                  style={{
                    background: 'transparent',
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    height: '56px',
                    padding: '0 32px',
                    fontSize: '16px',
                    fontWeight: 500,
                    borderRadius: '4px',
                    border: '2px solid rgba(255,255,255,0.5)',
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Watch Demo
                </Button>
              </Space>

              {/* Trust Indicators */}
              <div style={{ marginTop: '24px' }}>
                <Paragraph
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '13px',
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 500,
                  }}
                >
                  Trusted by professionals worldwide
                </Paragraph>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {['Microsoft', 'Azure', 'Office 365', 'Teams'].map((brand, index) => (
                    <span
                      key={index}
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '14px',
                        fontWeight: 500,
                        padding: '4px 12px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '20px',
                        background: 'rgba(255,255,255,0.05)',
                      }}
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </Space>
          </Col>

          {/* Right Column - Visual Element */}
          <Col xs={24} lg={10}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '500px',
              }}
            >
              {/* Main Device Mockup */}
              <div
                style={{
                  width: '280px',
                  height: '400px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  // backdrop: 'blur(10px)',
                  position: 'relative',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    right: '20px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0078d4',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  dokeey
                </div>
                
                {/* Document Cards */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: `${120 + i * 80}px`,
                      left: '20px',
                      right: '20px',
                      height: '60px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      animation: `slideUp 2s ease-in-out ${i * 0.3}s infinite alternate`,
                    }}
                  />
                ))}
              </div>

              {/* Floating Elements Around Device */}
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'floatSlow 4s ease-in-out infinite',
                }}
              >
                <SecurityScanOutlined style={{ color: 'white', fontSize: '24px' }} />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <style>
        {`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes slideUp {
            0% { transform: translateY(0px); opacity: 0.6; }
            100% { transform: translateY(-10px); opacity: 1; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateX(0px); }
            50% { transform: translateX(20px); }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;