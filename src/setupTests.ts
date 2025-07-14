// src/setupTests.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('./config', () => ({
    API_BASE_URL: 'https://mocked-api-url.com',
}))