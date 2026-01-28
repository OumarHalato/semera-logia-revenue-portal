
export enum Page {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  TAX_GUIDE = 'tax-guide',
  STATISTICS = 'statistics',
  CONTACT = 'contact',
  NEWS = 'news',
  ADMIN = 'admin',
  GRIEVANCE = 'grievance',
  REGISTRATION = 'registration',
  CERTIFICATE = 'certificate',
  COMPLAINT_FORM = 'complaint-form',
  BUSINESS_REGISTRATION = 'business-registration',
  NEWS_GALLERY = 'news-gallery'
}

export interface Message {
  role: 'user' | 'bot';
  text: string;
  citations?: { title: string; uri: string }[];
}

export interface ChatHistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}