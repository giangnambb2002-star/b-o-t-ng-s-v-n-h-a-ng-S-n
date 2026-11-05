import React, { useState } from 'react';
import { Artifact } from '../types/museum';
import {
  X,
  Award,
  Calendar,
  MapPin,
  Scale,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Layers,
  Flame,
  ExternalLink,
} from 'lucide-react';

interface ArtifactDetailModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onAskAi: (question: string) => void;
}

export const ArtifactDetailModal: React.FC<ArtifactDetailModalProps> = ({
  artifact,
  onClose,
  onAskAi,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'motifs' | 'casting' | 'references'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!artifact) return null;

  const allImages = [
    { url: artifact.imageUrl, label: 'Hình chụp chính diện', description: 'Góc chụp tổng thể hiện vật' },
    ...(artifact.additionalImages || []),
  ];

  const currentImage = allImages[activeImageIndex] || allImages[0];

  const handleAskAiAboutItem = () => {
    const query = `Hãy giải thích chi tiết về "${artifact.name}" (${artifact.englishName}): xuất xứ lịch sử, niên đại ${artifact.period}, kỹ thuật đúc đồng và ý nghĩa các hoa văn tiêu biểu trên hiện vật này.`;
    onAskAi(query);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-2xl bg-[#120e0a] border border-[#483726] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1a140d] border-b border-[#362718]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#2b1f13] border border-[#523d29] text-[#e5c158] font-bold">
              {artifact.catalogNumber}
            </span>
            {artifact.isNationalTreasure && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c59b27] text-black text-xs font-bold shadow-md">
                <Award className="w-3.5 h-3.5" /> Bảo vật Quốc gia
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#9c8b7b] hover:text-white hover:bg-[#2b1f13] transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prominent Sample Data Disclaimer Banner */}
        <div className="bg-[#2a1c0e] border-b border-[#4d351c] px-6 py-2.5 flex items-start gap-3 text-xs text-[#eedec8]">
          <AlertTriangle className="w-4 h-4 text-[#e5c158] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#e5c158] uppercase tracking-wider">
              [Thông báo dữ liệu mẫu khảo cứu]:
            </span>{' '}
            {artifact.sampleDataNotice} Các nguồn tư liệu tham chiếu bên dưới là các tài liệu học thuật thực tế của Viện Khảo cổ học và Bảo tàng Lịch sử Quốc gia.
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hero Grid: Images & Quick Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Image Showcase */}
            <div className="lg:col-span-6 flex flex-col space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#070503] border border-[#302315] flex items-center justify-center">
                <img
                  src={currentImage.url}
                  alt={artifact.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-xs text-[#ded3c5]">
                  <p className="font-semibold text-white">{currentImage.label}</p>
                  <p className="text-[11px] text-[#b3a290]">{currentImage.description}</p>
                </div>
              </div>

              {/* Thumbnails if available */}
              {allImages.length > 1 && (
                <div className="flex gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-16 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#c59b27] scale-105 shadow-md shadow-[#c59b27]/30'
                          : 'border-[#362718] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Essential Museum Information */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#dfb743] uppercase tracking-widest">
                  {artifact.categoryLabel}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#fbf6ee] mt-1">
                  {artifact.name}
                </h2>
                <p className="text-sm text-[#9c8b7b] italic mt-0.5">{artifact.englishName}</p>

                <p className="mt-4 text-sm text-[#d4c7b8] leading-relaxed">
                  {artifact.shortDescription}
                </p>

                {/* Technical Specs List */}
                <div className="mt-6 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#1a140e] border border-[#2e2114]">
                    <Calendar className="w-4 h-4 text-[#c59b27] shrink-0" />
                    <span className="text-[#8c7b6c] w-28 shrink-0">Niên đại:</span>
                    <span className="text-[#f0e6d8] font-medium">{artifact.period}</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#1a140e] border border-[#2e2114]">
                    <Scale className="w-4 h-4 text-[#c59b27] shrink-0" />
                    <span className="text-[#8c7b6c] w-28 shrink-0">Chất liệu & Kích thước:</span>
                    <span className="text-[#f0e6d8] font-medium">
                      Cao {artifact.dimensions.height}
                      {artifact.dimensions.diameter ? ` • Đường kính ${artifact.dimensions.diameter}` : ''}
                      {` • Nặng ${artifact.dimensions.weight}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#1a140e] border border-[#2e2114]">
                    <MapPin className="w-4 h-4 text-[#c59b27] shrink-0" />
                    <span className="text-[#8c7b6c] w-28 shrink-0">Địa điểm phát hiện:</span>
                    <span className="text-[#f0e6d8] font-medium">{artifact.discovery.location} ({artifact.discovery.year})</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#1a140e] border border-[#2e2114]">
                    <BookOpen className="w-4 h-4 text-[#c59b27] shrink-0" />
                    <span className="text-[#8c7b6c] w-28 shrink-0">Nơi lưu giữ:</span>
                    <span className="text-[#f0e6d8] font-medium">{artifact.currentLocation}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-[#261d13] flex flex-wrap gap-3">
                <button
                  onClick={handleAskAiAboutItem}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#dfb743] text-black font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c59b27]/25 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Hỏi Trợ lý AI về hiện vật này
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#2e2114] space-x-2 pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-[#c59b27] text-[#fff2cc]'
                  : 'border-transparent text-[#948474] hover:text-[#e0d3c4]'
              }`}
            >
              Mô Tả Chi Tiết
            </button>
            <button
              onClick={() => setActiveTab('motifs')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'motifs'
                  ? 'border-[#c59b27] text-[#fff2cc]'
                  : 'border-transparent text-[#948474] hover:text-[#e0d3c4]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Hoa Văn & Biểu Tượng ({artifact.motifs.length})
            </button>
            <button
              onClick={() => setActiveTab('casting')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'casting'
                  ? 'border-[#c59b27] text-[#fff2cc]'
                  : 'border-transparent text-[#948474] hover:text-[#e0d3c4]'
              }`}
            >
              <Flame className="w-3.5 h-3.5" /> Kỹ Nghệ Đúc Đồng
            </button>
            <button
              onClick={() => setActiveTab('references')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'references'
                  ? 'border-[#c59b27] text-[#fff2cc]'
                  : 'border-transparent text-[#948474] hover:text-[#e0d3c4]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Nguồn Tham Khảo & Hồ Sơ
            </button>
          </div>

          {/* Tab Contents */}
          <div className="pt-2">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#17110b] border border-[#2e2114]">
                  <h4 className="text-xs font-semibold text-[#c59b27] uppercase tracking-wider mb-2">
                    Cấu tạo và hoa văn chi tiết
                  </h4>
                  <p className="text-sm text-[#ded3c5] leading-relaxed whitespace-pre-line">
                    {artifact.detailedDescription}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#17110b] border border-[#2e2114]">
                  <h4 className="text-xs font-semibold text-[#c59b27] uppercase tracking-wider mb-2">
                    Giá trị lịch sử & khảo cổ học
                  </h4>
                  <p className="text-sm text-[#ded3c5] leading-relaxed">
                    {artifact.historicalSignificance}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'motifs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {artifact.motifs.map((motif) => (
                  <div
                    key={motif.id}
                    className="p-4 rounded-xl bg-[#17110b] border border-[#332417] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-[#fbf6ee]">
                        {motif.name}
                      </h4>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#291e14] text-[#dfb743]">
                        {motif.locationOnArtifact}
                      </span>
                    </div>
                    <p className="text-xs text-[#c4b6a5]">{motif.description}</p>
                    <div className="text-xs text-[#dfb743] italic pt-1 border-t border-[#291e14]">
                      Ý nghĩa: {motif.meaning}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'casting' && (
              <div className="p-5 rounded-xl bg-[#17110b] border border-[#2e2114] space-y-3">
                <h4 className="font-serif font-bold text-base text-[#fbf6ee] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#e5c158]" /> Bí quyết luyện kim và đúc đồng Đông Sơn
                </h4>
                <p className="text-sm text-[#ded3c5] leading-relaxed">
                  {artifact.castingTechnique}
                </p>
                <div className="mt-4 p-3.5 rounded-lg bg-[#22180f] border-l-4 border-[#c59b27] text-xs text-[#cfc2b2] space-y-1">
                  <p className="font-semibold text-[#dfb743]">
                    Phân tích hợp kim học của Viện Khảo cổ học:
                  </p>
                  <p>
                    Tỉ lệ đồng (khoảng 50-60%), thiếc (15-20%) và chì (10-15%) được người Lạc Việt pha trộn chính xác giúp kim loại nóng chảy lỏng đều vào từng rãnh khuôn nhỏ nhất của hoa văn mà không bị rỗ bọt khí khi nguội.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'references' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#17110b] border border-[#2e2114]">
                  <h4 className="text-xs font-semibold text-[#c59b27] uppercase tracking-wider mb-3">
                    Danh mục tài liệu kiểm chứng học thuật
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#ded3c5]">
                    {artifact.references.map((ref, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#c59b27] font-mono font-bold mt-0.5">[{idx + 1}]</span>
                        <span className="leading-relaxed">{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-[#22170e] text-xs text-[#baa998] flex items-center justify-between">
                  <span>Dữ liệu tuân thủ danh mục quản lý của Cục Di sản Văn hóa Việt Nam</span>
                  <a
                    href="http://dsvh.gov.vn"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#dfb743] hover:underline"
                  >
                    <span>Cổng Cục Di sản</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#16100a] border-t border-[#2e2114] flex items-center justify-between text-xs text-[#8c7b6c]">
          <span>Mã định danh: {artifact.catalogNumber} • Bảo tàng số Văn hóa Đông Sơn</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#261c12] hover:bg-[#382a1b] text-[#d6c7b7] font-medium transition-colors"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};
