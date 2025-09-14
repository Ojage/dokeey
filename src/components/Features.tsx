import React from 'react';
import { Row, Col, Card, Typography, Button, Space } from 'antd';
import {
  ThunderboltOutlined,
  SafetyOutlined,
  MobileOutlined,
  CameraOutlined,
  FileTextOutlined,
  CloudOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <CameraOutlined style={{ fontSize: 40, color: '#0078d4' }} />,
    title: 'Intelligent Scanning',
    description: 'AI-powered mobile scanning with automatic edge detection, perspective correction, and image enhancement for professional results.',
    benefits: ['Auto edge detection', 'Smart enhancement', 'Batch scanning'],
    category: 'Mobile First',
  },
  {
    icon: <FileTextOutlined style={{ fontSize: 40, color: '#0078d4' }} />,
    title: 'Universal Format Support',
    description: 'Seamlessly convert Word, Excel, PowerPoint, images, and 50+ file formats to high-quality PDFs with preserved formatting.',
    benefits: ['50+ file formats', 'Layout preservation', 'OCR text recognition'],
    category: 'Conversion',
  },
  {
    icon: <ThunderboltOutlined style={{ fontSize: 40, color: '#106ebe' }} />,
    title: 'Enterprise Performance',
    description: 'Lightning-fast processing powered by Microsoft Azure infrastructure with 99.9% uptime and global edge optimization.',
    benefits: ['Sub-second processing', '99.9% uptime', 'Global CDN'],
    category: 'Performance',
  },
  {
    icon: <SafetyOutlined style={{ fontSize: 40, color: '#107c10' }} />,
    title: 'Zero-Trust Security',
    description: 'Enterprise-grade security with end-to-end encryption, compliance certifications, and no data retention policies.',
    benefits: ['End-to-end encryption', 'SOC 2 compliant', 'Zero data retention'],
    category: 'Security',
  },
  {
    icon: <MobileOutlined style={{ fontSize: 40, color: '#0078d4' }} />,
    title: 'Cross-Platform Excellence',
    description: 'Native-quality experience across iOS, Android, and web platforms with seamless sync and offline capabilities.',
    benefits: ['Offline support', 'Cloud sync', 'Native performance'],
    category: 'Platform',
  },
  {
    icon: <CloudOutlined style={{ fontSize: 40, color: '#0078d4' }} />,
    title: 'Instant Deployment',
    description: 'Zero-installation Progressive Web App that works instantly in any browser with full native app capabilities.',
    benefits: ['No installation', 'PWA technology', 'Auto updates'],
    category: 'Accessibility',
  },
];

const Features: React.FC = () => {
  return (
    <div style={{ 
      padding: '80px 24px 120px', 
      background: 'linear-gradient(180deg, #faf9f8 0%, #f3f2f1 100%)',
      position: 'relative',
    }}>
      {/* Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0,120,212,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(16,110,190,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(90deg, #0078d4, #106ebe)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
              }}
            >
              Enterprise Features
            </span>
          </div>
          
          <Title
            level={1}
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              color: '#323130',
              marginBottom: 24,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontFamily: 'Segoe UI, system-ui, sans-serif',
            }}
          >
            Built for modern
            <br />
            <span style={{ color: '#0078d4' }}>productivity</span>
          </Title>
          
          <Paragraph
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#605e5c',
              maxWidth: 700,
              margin: '0 auto 40px',
              lineHeight: 1.6,
              fontFamily: 'Segoe UI, system-ui, sans-serif',
            }}
          >
            Experience document conversion powered by Microsoft's design philosophy and 
            enterprise-grade infrastructure. Every feature crafted for professional workflows.
          </Paragraph>

          <Space size={16}>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              style={{
                background: '#0078d4',
                borderColor: '#0078d4',
                height: '48px',
                padding: '0 24px',
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '4px',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
              }}
            >
              Try All Features
            </Button>
            <Button
              size="large"
              style={{
                height: '48px',
                padding: '0 24px',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '4px',
                borderColor: '#d1d1d1',
                color: '#323130',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
              }}
            >
              View Demo
            </Button>
          </Space>
        </div>
        
        {/* Features Grid */}
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: 12,
                  border: '1px solid #e1dfdd',
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                }}
                bodyStyle={{ padding: 32 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = '#0078d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = '#e1dfdd';
                }}
              >
                {/* Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(0, 120, 212, 0.1)',
                    color: '#0078d4',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {feature.category}
                </div>

                {/* Icon Container */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(0,120,212,0.1) 0%, rgba(16,110,190,0.05) 100%)',
                    marginBottom: 24,
                    position: 'relative',
                  }}
                >
                  {feature.icon}
                  <div
                    style={{
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: 18,
                      background: 'linear-gradient(135deg, rgba(0,120,212,0.2), rgba(16,110,190,0.1))',
                      zIndex: -1,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    className="icon-glow"
                  />
                </div>

                <Title 
                  level={4} 
                  style={{ 
                    color: '#323130', 
                    marginBottom: 12, 
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                  }}
                >
                  {feature.title}
                </Title>
                
                <Paragraph
                  style={{
                    color: '#605e5c',
                    lineHeight: 1.6,
                    marginBottom: 20,
                    fontSize: 15,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                  }}
                >
                  {feature.description}
                </Paragraph>

                {/* Benefits List */}
                <div style={{ marginBottom: 16 }}>
                  {feature.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 8,
                        color: '#323130',
                        fontSize: 14,
                        fontFamily: 'Segoe UI, system-ui, sans-serif',
                      }}
                    >
                      <CheckCircleOutlined
                        style={{
                          color: '#107c10',
                          fontSize: 14,
                          minWidth: 14,
                        }}
                      />
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <Button
                  type="text"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  style={{
                    color: '#0078d4',
                    padding: 0,
                    height: 'auto',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'Segoe UI, system-ui, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#106ebe';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#0078d4';
                  }}
                >
                  Learn more
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Bottom CTA Section */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 80,
            padding: '48px 32px',
            background: 'linear-gradient(135deg, rgba(0,120,212,0.05) 0%, rgba(16,110,190,0.02) 100%)',
            borderRadius: 16,
            border: '1px solid rgba(0,120,212,0.1)',
          }}
        >
          <Title
            level={3}
            style={{
              color: '#323130',
              marginBottom: 16,
              fontFamily: 'Segoe UI, system-ui, sans-serif',
              fontWeight: 600,
            }}
          >
            Ready to transform your workflow?
          </Title>
          <Paragraph
            style={{
              color: '#605e5c',
              marginBottom: 32,
              fontSize: 16,
              maxWidth: 500,
              margin: '0 auto 32px',
              fontFamily: 'Segoe UI, system-ui, sans-serif',
            }}
          >
            Join thousands of professionals who trust dokeey for their document conversion needs.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            style={{
              background: '#0078d4',
              borderColor: '#0078d4',
              height: '52px',
              padding: '0 32px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '4px',
              fontFamily: 'Segoe UI, system-ui, sans-serif',
            }}
          >
            Start Converting Now
          </Button>
        </div>
      </div>

      <style>
        {`
          .ant-card:hover .icon-glow {
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
};

export default Features;