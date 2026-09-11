import fs from 'fs';
import path from 'path';

export type SubmissionType = 
  | 'contact' 
  | 'enquiry' 
  | 'distributor' 
  | 'pricing' 
  | 'feedback' 
  | 'newsletter';

export interface SubmissionRecord {
  id: string;
  referenceId: string;
  type: SubmissionType;
  createdAt: string;
  status: 'new' | 'reviewed' | 'contacted';
  data: Record<string, unknown>;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'submissions.json');

function ensureDbFile(): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function generateReferenceId(type: SubmissionType): string {
  const prefixMap: Record<SubmissionType, string> = {
    contact: 'CON',
    enquiry: 'ENQ',
    distributor: 'DST',
    pricing: 'PRC',
    feedback: 'FDB',
    newsletter: 'NWS'
  };
  const prefix = prefixMap[type] || 'REQ';
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const timeSuffix = Date.now().toString().slice(-4);
  return `EKO-${prefix}-${year}-${randomDigits}${timeSuffix}`;
}

export function saveSubmission(type: SubmissionType, data: Record<string, unknown>): SubmissionRecord {
  ensureDbFile();
  const referenceId = generateReferenceId(type);
  const record: SubmissionRecord = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    referenceId,
    type,
    createdAt: new Date().toISOString(),
    status: 'new',
    data
  };

  try {
    const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
    const records: SubmissionRecord[] = fileContent ? JSON.parse(fileContent) : [];
    records.unshift(record);
    // Keep up to 5000 records in storage
    const trimmed = records.slice(0, 5000);
    fs.writeFileSync(DB_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write submission to local database:', error);
  }

  return record;
}

export function getAllSubmissions(): SubmissionRecord[] {
  ensureDbFile();
  try {
    const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
    return fileContent ? JSON.parse(fileContent) : [];
  } catch (error) {
    console.error('Failed to read submissions:', error);
    return [];
  }
}
