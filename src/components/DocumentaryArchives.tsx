import React, { useState } from 'react';
import { REFERENCE_DOCUMENTS, HEGER_CLASSIFICATION } from '../data/museumData';
import { BookOpen, Award, Layers, Search, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';

const GLOSSARY_TERMS = [
  {
    term: 'Văn hóa Đông Sơn',
    meaning: 'Nền văn hóa khảo cổ học thời đại đồ đồng và sơ kỳ đồ sắt tại miền Bắc và Bắc Trung Bộ Việt Nam, kéo dài từ thế kỷ VII TCN đến thế kỷ I-II SCN. Được đặt tên theo di chỉ làng Đông Sơn bên bờ sông Mã, Thanh Hóa.',
  },
  {
    term: 'Trống đồng loại 1 Heger',
    meaning: 'Kiểu dáng trống đồng cổ nhất, kinh điển nhất và đẹp nhất theo phân loại của Franz Heger (1902). Thân trống gồm 3 phần rõ rệt: tang phình, thân trụ tròn và chân loe. Tiêu biểu là trống Ngọc Lũ, Hoàng Hạ, Sông Đà, Cổ Loa.',
  },
  {
    term: 'Kỹ thuật đúc sáp ong (Lost-wax casting)',
    meaning: 'Nghệ nhân nặn mẫu hoa văn hoặc pho tượng bằng sáp ong pha mỡ, sau đó đắp nhiều lớp đất sét mịn bên ngoài rồi nung nóng cho sáp chảy ra ngoài tạo lòng khuôn rỗng, cuối cùng rót đồng lỏng vào để đúc các chi tiết cực kỳ tinh xảo.',
  },
  {
    term: 'Khuôn nhiều mang (Piece-mould)',
    meaning: 'Hệ thống khuôn đúc gồm nhiều mảnh đất nung hoặc sa thạch ghép khít lại với nhau bằng chốt định vị. Trống đồng lớn thường dùng từ 3 đến 4 mảnh khuôn thân tang và 1 mảnh khuôn mặt trống phẳng.',
  },
  {
    term: 'Patin (Rỉ đồng cổ)',
    meaning: 'Lớp màng oxit kim loại tự nhiên hình thành trên bề mặt đồng thau qua hàng ngàn năm chôn vùi trong lòng đất, có màu xanh ngọc lam (malachite) hoặc xanh rêu sẫm, giúp bảo vệ cốt đồng bên trong khỏi bị mủn rã.',
  },
  {
    term: 'Họa tiết chim Lạc',
    meaning: 'Hình tượng loài chim nước mỏ dài, cánh dài sải rộng bay ngược chiều kim đồng hồ trên mặt trống đồng. Biểu tượng vật tổ (totem) linh thiêng của cư dân người Lạc Việt gắn liền với sông nước và mùa màng.',
  },
];

export const DocumentaryArchives: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'bibliography' | 'heger' | 'glossary'>('bibliography');

  const filteredDocs = REFERENCE_DOCUMENTS.filter((doc) => {
    const matchesCat = filterCategory === 'all' || doc.category === filterCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201811] border border-[#523d29] text-[#dfb743] text-xs font-medium uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#e5c158]" />
          Kho thư tịch & Căn cứ học thuật
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fbf6ee]">
          Nguồn Tư Liệu <span className="gold-gradient-text">Khảo Cứu Đông Sơn</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-[#baa998] leading-relaxed">
          Tất cả dữ liệu trưng bày số, luận giải hoa văn và hồ sơ hiện vật của bảo tàng được tổng hợp, đối chiếu nghiêm túc từ các công trình nghiên cứu chính thống của các nhà khảo cổ học hàng đầu Việt Nam và thế giới.
        </p>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex justify-center border-b border-[#2e2114] mb-8">
        <div className="flex gap-2 p-1 rounded-xl bg-[#17110c] border border-[#332517]">
          <button
            onClick={() => setActiveTab('bibliography')}
            className={`px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'bibliography'
                ? 'bg-[#c59b27] text-black shadow-md'
                : 'text-[#baa998] hover:text-white'
            }`}
          >
            Tài Liệu Tham Khảo ({REFERENCE_DOCUMENTS.length})
          </button>
          <button
            onClick={() => setActiveTab('heger')}
            className={`px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'heger'
                ? 'bg-[#c59b27] text-black shadow-md'
                : 'text-[#baa998] hover:text-white'
            }`}
          >
            Phân Loại Trống Franz Heger
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'glossary'
                ? 'bg-[#c59b27] text-black shadow-md'
                : 'text-[#baa998] hover:text-white'
            }`}
          >
            Thuật Ngữ Khảo Cổ Đồ Đồng
          </button>
        </div>
      </div>

      {/* TAB 1: Bibliography & Scholarly Publications */}
      {activeTab === 'bibliography' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#14100b] border border-[#302417]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8c7b6c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tài liệu, tác giả, chuyên khảo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-[#1c1610] border border-[#3d2e1f] text-[#fbf6ee] placeholder-[#7a6b5d] focus:border-[#c59b27] outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {['all', 'Sách chuyên khảo', 'Bảo vật Quốc gia', 'Bài báo khoa học', 'Tài liệu quốc tế'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filterCategory === cat
                      ? 'bg-[#c59b27] text-black font-semibold'
                      : 'bg-[#1b150f] text-[#baa998] hover:bg-[#281e14] border border-[#332517]'
                  }`}
                >
                  {cat === 'all' ? 'Tất cả tài liệu' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Reference Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-2xl bg-[#14100b] border border-[#362719] hover:border-[#c59b27] transition-all flex flex-col justify-between shadow-xl space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#241a10] border border-[#483522] text-[#e5c158]">
                      {doc.category}
                    </span>
                    <span className="text-xs text-[#8c7b6c] font-mono">{doc.year}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#fbf6ee] leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-[#dfb743] font-medium mt-1">
                    Tác giả / Cơ quan ban hành: {doc.author}
                  </p>
                  <p className="text-xs text-[#9d8c7c] mt-0.5">
                    Nhà xuất bản: {doc.publisher}
                  </p>

                  <p className="text-xs text-[#c4b6a5] leading-relaxed mt-3 pt-3 border-t border-[#241a11]">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#241a11] bg-[#1a140e] p-3 rounded-lg text-[11px] text-[#baa998]">
                  <span className="font-semibold text-[#dfb743]">Trích dẫn chuẩn học thuật:</span>
                  <p className="italic mt-0.5 text-[#e0d4c5]">{doc.citationFormat}</p>
                </div>
              </div>
            ))}
          </div>

          {/* National Treasure Decree Notice */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#1f170f] to-[#14100a] border border-[#4d3722] flex items-start gap-4">
            <Award className="w-8 h-8 text-[#e5c158] shrink-0 mt-1" />
            <div className="text-xs text-[#ded3c5] space-y-1.5">
              <h4 className="font-serif font-bold text-sm text-[#ffd866]">
                Căn cứ pháp lý di sản văn hóa Việt Nam
              </h4>
              <p className="leading-relaxed">
                Các hiện vật như Trống đồng Ngọc Lũ, Trống đồng Hoàng Hạ, Thạp đồng Đào Thịnh được công nhận là Bảo vật Quốc gia theo Quyết định số 1426/QĐ-TTg ngày 01 tháng 10 năm 2012 của Thủ tướng Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Franz Heger Classification */}
      {activeTab === 'heger' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#14100b] border border-[#382a1b] text-xs text-[#ded3c5] space-y-2">
            <h3 className="font-serif font-bold text-base text-[#ffd866] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#e5c158]" /> Bảng phân loại trống đồng của Franz Heger (1902)
            </h3>
            <p className="leading-relaxed text-[#c4b6a5]">
              Năm 1902, nhà nghiên cứu người Áo Franz Heger công bố công trình nghiên cứu kinh điển phân loại toàn bộ trống đồng phát hiện tại Đông Nam Á và miền Nam Trung Hoa thành 4 loại cơ bản. Trong đó, Trống đồng Đông Sơn loại 1 (Heger I) được công nhận là loại trống cổ xưa nhất, kích thước lớn nhất và nghệ thuật trang trí đúc đồng tinh xảo nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HEGER_CLASSIFICATION.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#16110c] border border-[#362719] space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#2b1f14]">
                  <h4 className="font-serif font-bold text-base text-[#fbf6ee]">
                    {item.type}
                  </h4>
                  <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#291e14] text-[#dfb743] font-mono">
                    {item.era}
                  </span>
                </div>

                <div>
                  <h5 className="text-[11px] font-semibold text-[#8c7b6c] uppercase">Hiện vật tiêu biểu:</h5>
                  <p className="text-xs text-[#e5c158] font-medium mt-0.5">{item.examples}</p>
                </div>

                <div>
                  <h5 className="text-[11px] font-semibold text-[#8c7b6c] uppercase">Đặc điểm hình thái & hoa văn:</h5>
                  <p className="text-xs text-[#c4b6a5] leading-relaxed mt-0.5">{item.features}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Archaeological Glossary */}
      {activeTab === 'glossary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GLOSSARY_TERMS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#14100b] border border-[#382b1c] space-y-2 shadow-lg"
            >
              <h4 className="font-serif font-bold text-base text-[#ffd866] flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#c59b27]" />
                {item.term}
              </h4>
              <p className="text-xs text-[#ded3c5] leading-relaxed pt-2 border-t border-[#261c12]">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
