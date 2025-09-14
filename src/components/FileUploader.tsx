import React, { useState } from 'react';
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
} from 'antd';
import {
  InboxOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PictureOutlined,
  FileTextOutlined,
  CameraOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import jsPDF from 'jspdf';

const { Title, Text } = Typography;
const { Dragger } = Upload;
const { TabPane } = Tabs;

interface FileItem extends UploadFile {
  preview?: string;
  fileType?: 'image' | 'document';
}

const FileUploader: React.FC = () => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('images');

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map(file => {
      if (file.originFileObj && !file.preview) {
        const isImage = file.type?.startsWith('image/');
        const isDocument = file.type?.includes('document') || file.name?.endsWith('.docx') || file.name?.endsWith('.doc');
        
        file.fileType = isImage ? 'image' : isDocument ? 'document' : 'image';
        
        if (isImage) {
          file.preview = URL.createObjectURL(file.originFileObj);
        }
      }
      return file;
    });
    setFileList(updatedFileList);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isDocument = file.type.includes('document') || file.name.endsWith('.docx') || file.name.endsWith('.doc');
    
    if (!isImage && !isDocument) {
      message.error('Please upload images or Word documents only!');
      return false;
    }
    return false;
  };

  const removeFile = (file: FileItem) => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const convertToPDF = async () => {
    if (fileList.length === 0) {
      message.warning('Please select files first!');
      return;
    }

    setConverting(true);
    setProgress(0);
    
    try {
      const pdf = new jsPDF();
      let pageAdded = false;
      
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (!file.originFileObj) continue;

        if (file.fileType === 'image') {
          const img = new Image();
          
          await new Promise((resolve) => {
            img.onload = resolve;
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
            imgWidth = pdfWidth;
            imgHeight = pdfWidth / imgAspectRatio;
            x = 0;
            y = (pdfHeight - imgHeight) / 2;
          } else {
            imgHeight = pdfHeight;
            imgWidth = pdfHeight * imgAspectRatio;
            x = (pdfWidth - imgWidth) / 2;
            y = 0;
          }

          pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
          pageAdded = true;
        } else if (file.fileType === 'document') {
          // For Word documents, we'll add a placeholder page
          // In a real implementation, you'd use mammoth.js to extract content
          if (pageAdded) {
            pdf.addPage();
          }
          
          pdf.setFontSize(16);
          pdf.text(`Document: ${file.name}`, 20, 30);
          pdf.setFontSize(12);
          pdf.text('Word document conversion requires server-side processing.', 20, 50);
          pdf.text('This is a placeholder for the converted content.', 20, 70);
          pageAdded = true;
        }
        
        const currentProgress = Math.round(((i + 1) / fileList.length) * 100);
        setProgress(currentProgress);
      }

      pdf.save('dokeey-converted.pdf');
      message.success('PDF generated successfully!');
    } catch (error) {
      console.error('Error converting to PDF:', error);
      message.error('Failed to convert files to PDF');
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  const clearAll = () => {
    fileList.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFileList([]);
    message.info('All files cleared');
  };

  const imageFiles = fileList.filter(f => f.fileType === 'image');
  const documentFiles = fileList.filter(f => f.fileType === 'document');

  return (
    <div style={{ padding: '16px 0' }}>
      {/* Upload Area */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 8,
          border: '2px dashed #c7c7c7',
          background: '#fafafa',
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Dragger
          multiple
          accept="image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          showUploadList={false}
          style={{
            background: 'transparent',
            border: 'none',
            minHeight: 120,
          }}
        >
          <div style={{ padding: '20px 0' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: 40, color: '#0078d4' }} />
            </p>
            <Title level={4} style={{ color: '#323130', marginBottom: 8, fontSize: 18 }}>
              Drop files here or tap to browse
            </Title>
            <Text style={{ color: '#605e5c', fontSize: 14 }}>
              Images and Word documents supported
            </Text>
            <div style={{ marginTop: 12 }}>
              <Space wrap>
                <Tag color="#0078d4">JPG</Tag>
                <Tag color="#0078d4">PNG</Tag>
                <Tag color="#0078d4">DOCX</Tag>
                <Tag color="#0078d4">DOC</Tag>
              </Space>
            </div>
          </div>
        </Dragger>
      </Card>

      {/* Mobile-friendly scan button */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <Button
          size="large"
          icon={<CameraOutlined />}
          style={{
            height: 48,
            borderRadius: 8,
            fontWeight: 600,
            background: '#f3f2f1',
            border: '1px solid #edebe9',
            color: '#323130',
          }}
        >
          Scan with Camera
        </Button>
      </div>

      {/* File Preview */}
      {fileList.length > 0 && (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <Title level={4} style={{ margin: 0, fontSize: 16 }}>
              Files ({fileList.length})
            </Title>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={clearAll}
              size="small"
            >
              Clear All
            </Button>
          </div>

          <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 24 }}>
            <TabPane 
              tab={
                <span>
                  <PictureOutlined />
                  Images ({imageFiles.length})
                </span>
              } 
              key="images"
            >
              {imageFiles.length > 0 ? (
                <Row gutter={[12, 12]}>
                  {imageFiles.map((file) => (
                    <Col xs={12} sm={8} md={6} key={file.uid}>
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
                            <Button
                              danger
                              type="primary"
                              icon={<DeleteOutlined />}
                              size="small"
                              style={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                width: 24,
                                height: 24,
                                minWidth: 24,
                                padding: 0,
                              }}
                              onClick={() => removeFile(file)}
                            />
                          </div>
                        }
                        bodyStyle={{ padding: 8 }}
                      >
                        <Text ellipsis style={{ fontSize: 11 }}>
                          {file.name}
                        </Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={{ textAlign: 'center', padding: 40, color: '#605e5c' }}>
                  <PictureOutlined style={{ fontSize: 32, marginBottom: 8 }} />
                  <div>No images uploaded</div>
                </div>
              )}
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <FileTextOutlined />
                  Documents ({documentFiles.length})
                </span>
              } 
              key="documents"
            >
              {documentFiles.length > 0 ? (
                <Space direction="vertical" style={{ width: '100%' }}>
                  {documentFiles.map((file) => (
                    <Card key={file.uid} size="small" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <FileTextOutlined style={{ fontSize: 20, color: '#0078d4' }} />
                          <div>
                            <Text strong style={{ fontSize: 14 }}>{file.name}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              Word Document
                            </Text>
                          </div>
                        </div>
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          size="small"
                          onClick={() => removeFile(file)}
                        />
                      </div>
                    </Card>
                  ))}
                </Space>
              ) : (
                <div style={{ textAlign: 'center', padding: 40, color: '#605e5c' }}>
                  <FileTextOutlined style={{ fontSize: 32, marginBottom: 8 }} />
                  <div>No documents uploaded</div>
                </div>
              )}
            </TabPane>
          </Tabs>

          <Divider />

          {/* Convert Button */}
          <div style={{ textAlign: 'center' }}>
            {converting && (
              <div style={{ marginBottom: 16 }}>
                <Progress percent={progress} status="active" strokeColor="#0078d4" />
              </div>
            )}
            <Button
              type="primary"
              size="large"
              icon={converting ? <CheckCircleOutlined /> : <DownloadOutlined />}
              loading={converting}
              onClick={convertToPDF}
              style={{
                height: 48,
                padding: '0 32px',
                fontSize: 16,
                fontWeight: 600,
                background: '#0078d4',
                border: 'none',
                borderRadius: 8,
                minWidth: 200,
              }}
            >
              {converting ? 'Converting...' : 'Convert to PDF'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;