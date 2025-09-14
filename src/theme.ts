import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Microsoft Fluent Design colors
    colorPrimary: '#0078d4', // Microsoft Blue
    colorSuccess: '#107c10', // Microsoft Green
    colorWarning: '#ff8c00', // Microsoft Orange
    colorError: '#d13438', // Microsoft Red
    colorInfo: '#0078d4',
    borderRadius: 4, // Microsoft's subtle rounded corners
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f3f2f1', // Microsoft's neutral background
    colorText: '#323130', // Microsoft's primary text
    colorTextSecondary: '#605e5c', // Microsoft's secondary text
    colorBorder: '#edebe9', // Microsoft's neutral border
    boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
    boxShadowSecondary: '0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132), 0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108)',
    controlHeight: 40, // Larger touch targets for mobile
    controlHeightLG: 48,
  },
  components: {
    Button: {
      borderRadius: 4,
      fontWeight: 600,
      paddingContentHorizontal: 20,
      controlHeight: 40,
      controlHeightLG: 48,
    },
    Card: {
      borderRadius: 8,
      boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
    },
    Upload: {
      borderRadius: 8,
    },
    Layout: {
      headerBg: '#0078d4',
      bodyBg: '#f3f2f1',
    },
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 0,
    },
  },
};