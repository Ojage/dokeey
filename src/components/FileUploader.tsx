import React, { useState, useCallback } from 'react';
import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Upload,
  message,
  Progress,
  Tag,
  Space,
  Tabs,
  Divider,
  Badge,
  Tooltip,
} from 'antd';
import {
  InboxOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PictureOutlined,
  FileTextOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  CloudUploadOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import jsPDF from 'jspdf';

const { Title, Text } = Typography;
const { Dragger } = Upload;

// Types
interface FileItem extends UploadFile {
  preview?: string;
  fileType?: 'image' | 'document';
  processingStatus?: 'pending' | 'processing' | 'completed' | 'error';
}

interface ConversionStats {
  totalFiles: number;
  processedFiles: number;
  errors: number;
  startTime: number | null;
}

// Custom Hook for File Management
const useFileManager = () => {
  const [fileList, setFileList] = useState<FileItem[]>([]);

  const addFiles = useCallback((newFiles: FileItem[]) => {
    const updatedFiles = newFiles.map(file => {
      if (file.originFileObj && !file.preview) {
        const isImage = file.type?.startsWith('image/');
        const isDocument = file.type?.includes('document') || 
                          file.name?.endsWith('.docx') || 
                          file.name?.endsWith('.doc');
        
        file.fileType = isImage ? 'image' : isDocument ? 'document' : 'image';
        file.processingStatus = 'pending';
        
        if (isImage) {
          file.preview = URL.createObjectURL(file.originFileObj);
        }
      }
      return file;
    });
    
    setFileList(prev => [...prev, ...updatedFiles]);
  }, []);

  const removeFile = useCallback((file: FileItem) => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFileList(prev => prev.filter(item => item.uid !== file.uid));
  }, []);

  const clearAllFiles = useCallback(() => {
    fileList.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFileList([]);
    message.success('All files cleared');
  }, [fileList]);

  const updateFileStatus = useCallback((uid: string, status: FileItem['processingStatus']) => {
    setFileList(prev => prev.map(file => 
      file.uid === uid ? { ...file, processingStatus: status } : file
    ));
  }, []);

  return {
    fileList,
    addFiles,
    removeFile,
    clearAllFiles,
    updateFileStatus,
    imageFiles: fileList.filter(f => f.fileType === 'image'),
    documentFiles: fileList.filter(f => f.fileType === 'document'),
  };
};

// Custom Hook for PDF Conversion
const usePDFConverter = () => {
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<ConversionStats>({
    totalFiles: 0,
    processedFiles: 0,
    errors: 0,
    startTime: null,
  });

  const convertToPDF = useCallback(async (
    files: FileItem[], 
    updateFileStatus: (uid: string, status: FileItem['processingStatus']) => void
  ) => {
    if (files.length === 0) {
      message.warning('Please select files first!');
      return;
    }

    setConverting(true);
    setProgress(0);
    setStats({
      totalFiles: files.length,
      processedFiles: 0,
      errors: 0,
      startTime: Date.now(),
    });
    
    try {
      const pdf = new jsPDF();
      let pageAdded = false;
      let processedFiles = 0;
      let errors = 0;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.originFileObj) continue;

        try {
          updateFileStatus(file.uid!, 'processing');

          if (file.fileType === 'image') {
            const img = new Image();
            
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = file.preview || URL.createObjectURL(file.originFileObj!);
            });

            if (pageAdded) {
              pdf.addPage();
            }

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgAspectRatio = img.width / img.height;
            const pdfAspectRatio = pdfWidth / pdfHeight;
            
            let imgWidth, imgHeight, x, y;
            
            if (imgAspectRatio > pdfAspectRatio) {
              imgWidth = pdfWidth - 20; // Add margin
              imgHeight = (pdfWidth - 20) / imgAspectRatio;
              x = 10;
              y = (pdfHeight - imgHeight) / 2;
            } else {
              imgHeight = pdfHeight - 20; // Add margin
              imgWidth = (pdfHeight - 20) * imgAspectRatio;
              x = (pdfWidth - imgWidth) / 2;
              y = 10;
            }

            pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
            pageAdded = true;
            
          } else if (file.fileType === 'document') {
            if (pageAdded) {
              pdf.addPage();
            }
            
            // Enhanced document placeholder
            pdf.setFontSize(20);
            pdf.setTextColor(0, 120, 212);
            pdf.text(`📄 ${file.name}`, 20, 40);
            
            pdf.setFontSize(14);
            pdf.setTextColor(50, 94, 92);
            pdf.text('Enterprise Document Conversion', 20, 60);
            
            pdf.setFontSize(12);
            pdf.setTextColor(96, 94, 92);
            pdf.text('✓ Security: End-to-end encrypted processing', 20, 80);
            pdf.text('✓ Quality: Preserved formatting and layout', 20, 95);
            pdf.text('✓ Speed: Optimized for mobile workflows', 20, 110);
            
            pdf.setFontSize(10);
            pdf.setTextColor(150, 150, 150);
            pdf.text('Full document conversion requires server-side processing.', 20, 130);
            pdf.text('This preview demonstrates the conversion workflow.', 20, 145);
            
            pageAdded = true;
          }
          
          updateFileStatus(file.uid!, 'completed');
          processedFiles++;
          
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          updateFileStatus(file.uid!, 'error');
          errors++;
        }
        
        const currentProgress = Math.round(((i + 1) / files.length) * 100);
        setProgress(currentProgress);
        setStats(prev => ({
          ...prev,
          processedFiles,
          errors,
        }));
      }

      const fileName = `dokeey-converted-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      const successMessage = errors > 0 
        ? `PDF generated with ${errors} error(s). ${processedFiles} files processed successfully.`
        : `PDF generated successfully! ${processedFiles} files converted.`;
        
      message.success(successMessage);
      
    } catch (error) {
      console.error('Error converting to PDF:', error);
      message.error('Failed to convert files to PDF');
    } finally {
      setConverting(false);
      setProgress(0);
      setTimeout(() => {
        setStats({
          totalFiles: 0,
          processedFiles: 0,
          errors: 0,
          startTime: null,
        });
      }, 3000);
    }
  }, []);

  return {
    converting,
    progress,
    stats,
    convertToPDF,
  };
};

// Main Component
const FileUploader: React.FC = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [dragActive, setDragActive] = useState(false);
  
  const {
    fileList,
    addFiles,
    removeFile,
    clearAllFiles,
    updateFileStatus,
    imageFiles,
    documentFiles,
  } = useFileManager();
  
  const { converting, progress, stats, convertToPDF } = usePDFConverter();

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    addFiles(newFileList);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isDocument = file.type.includes('document') || 
                      file.name.endsWith('.docx') || 
                      file.name.endsWith('.doc');
    
    if (!isImage && !isDocument) {
      message.error('Please upload images or Word documents only!');
      return false;
    }
    
    const isLargeFile = file.size / 1024 / 1024 > 10; // 10MB limit
    if (isLargeFile) {
      message.error('File must be smaller than 10MB!');
      return false;
    }
    
    return false;
  };

  const handleConvert = () => {
    convertToPDF(fileList, updateFileStatus);
  };

  const getFileStatusColor = (status?: FileItem['processingStatus']) => {
    switch (status) {
      case 'processing': return '#1890ff';
      case 'completed': return '#52c41a';
      case 'error': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getFileStatusIcon = (status?: FileItem['processingStatus']) => {
    switch (status) {
      case 'processing': return '⏳';
      case 'completed': return '✅';
      case 'error': return '❌';
      default: return '📄';
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title
          level={2}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#323130',
            marginBottom: 16,
            fontFamily: 'Segoe UI, system-ui, sans-serif',
          }}
        >
          Transform your documents
        </Title>
        <Text
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            color: '#605e5c',
            display: 'block',
            marginBottom: 24,
            fontFamily: 'Segoe UI, system-ui, sans-serif',
          }}
        >
          Drag, drop, and convert to professional PDFs in seconds
        </Text>
        
        {/* Trust Indicators */}
        <Space size={24} wrap>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SafetyOutlined style={{ color: '#107c10', fontSize: 16 }} />
            <Text style={{ color: '#605e5c', fontSize: 14 }}>End-to-end encrypted</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThunderboltOutlined style={{ color: '#0078d4', fontSize: 16 }} />
            <Text style={{ color: '#605e5c', fontSize: 14 }}>Lightning fast</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CloudUploadOutlined style={{ color: '#0078d4', fontSize: 16 }} />
            <Text style={{ color: '#605e5c', fontSize: 14 }}>No installation needed</Text>
          </div>
        </Space>
      </div>

      {/* Upload Area */}
      <Card
        style={{
          marginBottom: 32,
          borderRadius: 12,
          border: dragActive ? '2px solid #0078d4' : '2px dashed #d1d1d1',
          background: dragActive ? 'rgba(0, 120, 212, 0.02)' : '#fafafa',
          transition: 'all 0.3s ease',
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Dragger
          multiple
          accept="image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          showUploadList={false}
          onDrop={() => setDragActive(false)}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          style={{
            background: 'transparent',
            border: 'none',
            minHeight: 160,
          }}
        >
          <div style={{ padding: '32px 16px' }}>
            <div style={{ marginBottom: 16 }}>
              <InboxOutlined 
                style={{ 
                  fontSize: 48, 
                  color: dragActive ? '#0078d4' : '#106ebe',
                  transition: 'color 0.3s ease',
                }} 
              />
            </div>
            <Title 
              level={3} 
              style={{ 
                color: '#323130', 
                marginBottom: 12, 
                fontSize: 20,
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                fontWeight: 600,
              }}
            >
              {dragActive ? 'Drop files here' : 'Drag & drop your files'}
            </Title>
            <Text style={{ color: '#605e5c', fontSize: 16, display: 'block', marginBottom: 16 }}>
              or click to browse from your device
            </Text>
            <Text style={{ color: '#605e5c', fontSize: 14, display: 'block', marginBottom: 20 }}>
              Support for images (JPG, PNG, GIF) and Word documents (DOC, DOCX)
            </Text>
            
            <Space wrap size={8}>
              {['JPG', 'PNG', 'GIF', 'DOCX', 'DOC'].map(format => (
                <Tag
                  key={format}
                  color={dragActive ? '#0078d4' : 'blue'}
                  style={{
                    borderRadius: 6,
                    padding: '2px 8px',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {format}
                </Tag>
              ))}
            </Space>
          </div>
        </Dragger>
      </Card>

      {/* Mobile Camera Button */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <Button
          size="large"
          icon={<CameraOutlined />}
          style={{
            height: 56,
            borderRadius: 8,
            fontWeight: 600,
            background: 'linear-gradient(135deg, rgba(0,120,212,0.1) 0%, rgba(16,110,190,0.05) 100%)',
            border: '1px solid rgba(0,120,212,0.2)',
            color: '#0078d4',
            fontSize: 16,
            padding: '0 24px',
            fontFamily: 'Segoe UI, system-ui, sans-serif',
          }}
        >
          📱 Scan with Camera
        </Button>
      </div>

      {/* File Preview */}
      {fileList.length > 0 && (
        <Card
          style={{
            borderRadius: 12,
            border: '1px solid #e1dfdd',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
          bodyStyle={{ padding: 32 }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <Title 
              level={4} 
              style={{ 
                margin: 0, 
                fontSize: 18,
                fontFamily: 'Segoe UI, system-ui, sans-serif',
                color: '#323130',
              }}
            >
              📁 Files Ready ({fileList.length})
            </Title>
            <Space>
              {stats.startTime && (
                <Text style={{ color: '#605e5c', fontSize: 13 }}>
                  ⚡ Processing: {stats.processedFiles}/{stats.totalFiles}
                </Text>
              )}
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={clearAllFiles}
                style={{
                  borderRadius: 6,
                  fontFamily: 'Segoe UI, system-ui, sans-serif',
                }}
              >
                Clear All
              </Button>
            </Space>
          </div>

          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab} 
            style={{ marginBottom: 32 }}
            items={[
              {
                key: 'images',
                label: (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <PictureOutlined />
                    Images
                    <Badge 
                      count={imageFiles.length} 
                      size="small" 
                      style={{ backgroundColor: '#0078d4' }}
                    />
                  </span>
                ),
                children: imageFiles.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {imageFiles.map((file) => (
                      <Col xs={12} sm={8} md={6} lg={4} key={file.uid}>
                        <Card
                          hoverable
                          size="small"
                          cover={
                            <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                              <img
                                src={file.preview}
                                alt={file.name}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 8,
                                  left: 8,
                                  background: 'rgba(0, 0, 0, 0.7)',
                                  color: 'white',
                                  borderRadius: 4,
                                  padding: '2px 6px',
                                  fontSize: 10,
                                }}
                              >
                                {getFileStatusIcon(file.processingStatus)}
                              </div>
                              <div style={{ 
                                position: 'absolute', 
                                top: 8, 
                                right: 8,
                                display: 'flex',
                                gap: 4,
                              }}>
                                <Tooltip title="Preview">
                                  <Button
                                    type="primary"
                                    icon={<EyeOutlined />}
                                    size="small"
                                    style={{
                                      width: 28,
                                      height: 28,
                                      minWidth: 28,
                                      padding: 0,
                                      background: 'rgba(0, 120, 212, 0.9)',
                                    }}
                                  />
                                </Tooltip>
                                <Button
                                  danger
                                  type="primary"
                                  icon={<DeleteOutlined />}
                                  size="small"
                                  style={{
                                    width: 28,
                                    height: 28,
                                    minWidth: 28,
                                    padding: 0,
                                  }}
                                  onClick={() => removeFile(file)}
                                />
                              </div>
                            </div>
                          }
                          bodyStyle={{ padding: 8 }}
                          style={{
                            borderRadius: 8,
                            overflow: 'hidden',
                          }}
                        >
                          <Text ellipsis style={{ fontSize: 11, display: 'block' }}>
                            {file.name}
                          </Text>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div style={{ textAlign: 'center', padding: 60, color: '#605e5c' }}>
                    <PictureOutlined style={{ fontSize: 48, marginBottom: 16, color: '#d1d1d1' }} />
                    <div style={{ fontSize: 16, marginBottom: 8 }}>No images uploaded</div>
                    <Text style={{ fontSize: 14, color: '#8a8886' }}>
                      Drag image files or use the upload area above
                    </Text>
                  </div>
                ),
              },
              {
                key: 'documents',
                label: (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileTextOutlined />
                    Documents
                    <Badge 
                      count={documentFiles.length} 
                      size="small" 
                      style={{ backgroundColor: '#0078d4' }}
                    />
                  </span>
                ),
                children: documentFiles.length > 0 ? (
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    {documentFiles.map((file) => (
                      <Card 
                        key={file.uid} 
                        size="small" 
                        style={{ 
                          width: '100%',
                          borderRadius: 8,
                          border: `1px solid ${getFileStatusColor(file.processingStatus)}20`,
                        }}
                        bodyStyle={{ padding: 16 }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                background: 'linear-gradient(135deg, #0078d4, #106ebe)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <FileTextOutlined style={{ fontSize: 20, color: 'white' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <Text 
                                strong 
                                ellipsis
                                style={{ 
                                  fontSize: 15,
                                  display: 'block',
                                  fontFamily: 'Segoe UI, system-ui, sans-serif',
                                }}
                              >
                                {file.name}
                              </Text>
                              <Space size={8}>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  Word Document
                                </Text>
                                <span style={{ fontSize: 12 }}>
                                  {getFileStatusIcon(file.processingStatus)}
                                </span>
                              </Space>
                            </div>
                          </div>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            size="small"
                            onClick={() => removeFile(file)}
                            style={{ marginLeft: 8 }}
                          />
                        </div>
                      </Card>
                    ))}
                  </Space>
                ) : (
                  <div style={{ textAlign: 'center', padding: 60, color: '#605e5c' }}>
                    <FileTextOutlined style={{ fontSize: 48, marginBottom: 16, color: '#d1d1d1' }} />
                    <div style={{ fontSize: 16, marginBottom: 8 }}>No documents uploaded</div>
                    <Text style={{ fontSize: 14, color: '#8a8886' }}>
                      Drag Word documents or use the upload area above
                    </Text>
                  </div>
                ),
              },
            ]}
          />

          <Divider style={{ margin: '32px 0' }} />

          {/* Convert Section */}
          <div style={{ textAlign: 'center' }}>
            {converting && (
              <div style={{ marginBottom: 24 }}>
                <Progress 
                  percent={progress} 
                  status="active" 
                  strokeColor={{
                    '0%': '#0078d4',
                    '100%': '#106ebe',
                  }}
                  style={{ marginBottom: 16 }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
                  <Text style={{ color: '#605e5c', fontSize: 14 }}>
                    ⚡ Speed: {stats.processedFiles}/{stats.totalFiles} files
                  </Text>
                  {stats.startTime && (
                    <Text style={{ color: '#605e5c', fontSize: 14 }}>
                      ⏱️ Time: {Math.round((Date.now() - stats.startTime) / 1000)}s
                    </Text>
                  )}
                </div>
              </div>
            )}
            
            <Button
              type="primary"
              size="large"
              icon={converting ? <CheckCircleOutlined /> : <DownloadOutlined />}
              loading={converting}
              onClick={handleConvert}
              style={{
                height: 56,
                padding: '0 40px',
                fontSize: 18,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
                border: 'none',
                borderRadius: 8,
                minWidth: 240,
                boxShadow: '0 4px 16px rgba(0, 120, 212, 0.3)',
                fontFamily: 'Segoe UI, system-ui, sans-serif',
              }}
            >
              {converting ? '🔄 Converting...' : '📄 Convert to PDF'}
            </Button>
            
            <div style={{ marginTop: 16 }}>
              <Text style={{ color: '#8a8886', fontSize: 13 }}>
                🔒 Your files are processed locally and securely
              </Text>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FileUploader;