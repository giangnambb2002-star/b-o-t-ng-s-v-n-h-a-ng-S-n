export type ArtifactCategory = 
  | 'all'
  | 'trong-dong'
  | 'do-dung'
  | 'vu-khi-cong-cu'
  | 'tuong-nghe-thuat'
  | 'trang-suc-nhac-khi';

export type ArtifactStatus = 'Bảo vật Quốc gia' | 'Hiện vật tiêu biểu' | 'Hiện vật khảo cứu mẫu';

export interface ArtifactMotifDetail {
  id: string;
  name: string;
  description: string;
  meaning: string;
  locationOnArtifact: string;
}

export interface Artifact {
  id: string;
  catalogNumber: string;
  name: string;
  englishName: string;
  category: ArtifactCategory;
  categoryLabel: string;
  period: string; // e.g., 'Thế kỷ III - II TCN (Văn hóa Đông Sơn hoàng kim)'
  estimatedCentury: string;
  material: string; // e.g., 'Hợp kim đồng thanh (Đồng, Thiếc, Chì), patin xanh ô-xít'
  dimensions: {
    height: string;
    diameter?: string;
    weight: string;
    description?: string;
  };
  discovery: {
    location: string;
    year: string;
    finder?: string;
  };
  currentLocation: string;
  isNationalTreasure: boolean;
  status: ArtifactStatus;
  isSampleData: boolean;
  sampleDataNotice: string;
  shortDescription: string;
  detailedDescription: string;
  castingTechnique: string;
  historicalSignificance: string;
  motifs: ArtifactMotifDetail[];
  references: string[];
  imageUrl: string;
  additionalImages?: Array<{ url: string; label: string; description: string }>;
  accentColor?: string;
}

export interface ArchaeologicalPeriod {
  id: string;
  name: string;
  age: string;
  site: string;
  keyFeatures: string;
  description: string;
}

export interface DrumMotifInteractive {
  id: string;
  name: string;
  symbol: string;
  zone: string;
  shortText: string;
  detailedSignificance: string;
  culturalContext: string;
}

export interface ReferenceDocument {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  category: 'Sách chuyên khảo' | 'Bảo vật Quốc gia' | 'Bài báo khoa học' | 'Tài liệu quốc tế';
  description: string;
  link?: string;
  citationFormat: string;
}
