import React, { useState, useMemo } from 'react';
import { ARTIFACTS_DATA, SAMPLE_DATA_BADGE_TEXT, SAMPLE_DATA_FULL_NOTICE } from '../data/museumData';
import { Artifact, ArtifactCategory } from '../types/museum';
import { ArtifactCard } from './ArtifactCard';
import {
  Search,
  Filter,
  Grid,
  List,
  Award,
  AlertCircle,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface CollectionPageProps {
  onSelectArtifact: (artifact: Artifact) => void;
  initialCategory?: ArtifactCategory;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onSelectArtifact,
  initialCategory = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ArtifactCategory>(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'period'>('default');

  const categories: Array<{ id: ArtifactCategory; label: string }> = [
    { id: 'all', label: 'Tất cả hiện vật' },
    { id: 'trong-dong', label: 'Trống đồng' },
    { id: 'do-dung', label: 'Đồ đựng (Thạp)' },
    { id: 'vu-khi-cong-cu', label: 'Vũ khí & Công cụ' },
    { id: 'tuong-nghe-thuat', label: 'Tượng nghệ thuật' },
    { id: 'trang-suc-nhac-khi', label: 'Trang sức & Nhạc khí' },
  ];

  const filteredArtifacts = useMemo(() => {
    return ARTIFACTS_DATA.filter((art) => {
      // Category filter
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus === 'nationalTreasure' && !art.isNationalTreasure) {
        return false;
      }
      if (selectedStatus === 'typical' && art.status !== 'Hiện vật tiêu biểu') {
        return false;
      }
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = art.name.toLowerCase().includes(query);
        const matchesEng = art.englishName.toLowerCase().includes(query);
        const matchesLocation = art.discovery.location.toLowerCase().includes(query);
        const matchesDesc = art.shortDescription.toLowerCase().includes(query);
        const matchesMotif = art.motifs.some((m) => m.name.toLowerCase().includes(query));
        if (!matchesName && !matchesEng && !matchesLocation && !matchesDesc && !matchesMotif) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, selectedStatus, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201811] border border-[#523d29] text-[#dfb743] text-xs font-medium uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#e5c158]" />
          Kho tàng cổ vật kim khí Đông Sơn
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fbf6ee]">
          Bộ Sưu Tập <span className="gold-gradient-text">Hiện Vật Tiêu Biểu</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-[#baa998] leading-relaxed">
          Khám phá những hiện vật đồng thau đỉnh cao của người Lạc Việt, từ Trống đồng Ngọc Lũ đến Thạp đồng Đào Thịnh và các nông cụ, vũ khí ghi dấu bình minh dựng nước.
        </p>
      </div>

      {/* Prominent Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-[#261a0f] border border-[#4d361f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#eedec8]">
        <div className="flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#e5c158] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#e5c158] uppercase">Thông báo quy chuẩn dữ liệu:</strong>{' '}
            {SAMPLE_DATA_FULL_NOTICE} Mọi hiện vật đều kèm trích dẫn nguồn lưu trữ thực tế.
          </p>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#3d2a17] text-[#e5c158] font-bold text-[11px] border border-[#5c4024]">
          {SAMPLE_DATA_BADGE_TEXT}
        </span>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="p-5 rounded-2xl bg-[#14100b] border border-[#382b1c] shadow-xl space-y-4">
        {/* Search & Mode Toggles */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#8c7b6c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hiện vật, hoa văn, nơi khai quật..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#1c1610] border border-[#3d2e1f] text-[#fbf6ee] placeholder-[#7d6e60] focus:border-[#c59b27] outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c7b6c] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* View Mode Toggle */}
            <div className="flex rounded-lg bg-[#1c1610] border border-[#332417] p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-[#c59b27] text-black' : 'text-[#8c7b6c] hover:text-white'
                }`}
                title="Dạng lưới"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-[#c59b27] text-black' : 'text-[#8c7b6c] hover:text-white'
                }`}
                title="Dạng danh sách"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Button */}
            {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#261c13] hover:bg-[#38281a] text-xs text-[#cfbfaf] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#261d13]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#c59b27] text-black font-semibold shadow-md shadow-[#c59b27]/20 scale-102'
                  : 'bg-[#1a140e] text-[#baa998] hover:bg-[#281e14] hover:text-white border border-[#332517]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Status */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#8c7b6c]">
          <span className="flex items-center gap-1 font-medium text-[#baa998]">
            <Filter className="w-3.5 h-3.5 text-[#c59b27]" /> Lọc nhanh:
          </span>
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-2.5 py-1 rounded-lg ${
              selectedStatus === 'all'
                ? 'bg-[#332416] text-[#ffd866] font-semibold'
                : 'text-[#9c8b7b] hover:text-white'
            }`}
          >
            Tất cả tình trạng
          </button>
          <button
            onClick={() => setSelectedStatus('nationalTreasure')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
              selectedStatus === 'nationalTreasure'
                ? 'bg-[#c59b27] text-black font-semibold'
                : 'text-[#9c8b7b] hover:text-white'
            }`}
          >
            <Award className="w-3 h-3" /> Chỉ xem Bảo vật Quốc gia
          </button>
          <button
            onClick={() => setSelectedStatus('typical')}
            className={`px-2.5 py-1 rounded-lg ${
              selectedStatus === 'typical'
                ? 'bg-[#332416] text-[#ffd866] font-semibold'
                : 'text-[#9c8b7b] hover:text-white'
            }`}
          >
            Hiện vật tiêu biểu
          </button>
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-[#8c7b6c] px-1">
        <span>
          Tìm thấy <strong className="text-[#ffd866]">{filteredArtifacts.length}</strong> hiện vật phù hợp
        </span>
        <span>Phân loại theo tiêu chuẩn hiện vật Khảo cổ học Việt Nam</span>
      </div>

      {/* Artifacts Display */}
      {filteredArtifacts.length === 0 ? (
        <div className="p-16 rounded-2xl bg-[#14100b] border border-[#362719] text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-[#c59b27] mx-auto opacity-70" />
          <h3 className="font-serif font-bold text-lg text-[#fbf6ee]">
            Không tìm thấy hiện vật nào phù hợp
          </h3>
          <p className="text-xs text-[#baa998] max-w-md mx-auto">
            Không có kết quả khớp với từ khóa "{searchQuery}". Quý khách có thể thử tìm kiếm với các từ khóa phổ biến như "trống", "thạp", "chim Lạc", "rìu" hoặc bấm nút Đặt lại bộ lọc.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-[#2b1f13] hover:bg-[#3d2c1c] text-[#dfb743] text-xs font-semibold"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtifacts.map((artifact) => (
            <ArtifactCard
              key={artifact.id}
              artifact={artifact}
              onSelect={onSelectArtifact}
            />
          ))}
        </div>
      ) : (
        /* List Mode View */
        <div className="space-y-3">
          {filteredArtifacts.map((artifact) => (
            <div
              key={artifact.id}
              onClick={() => onSelectArtifact(artifact)}
              className="p-4 rounded-xl bg-[#14100b] border border-[#332517] hover:border-[#c59b27] transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={artifact.imageUrl}
                  alt={artifact.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#332417]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#8c7b6c]">
                      {artifact.catalogNumber}
                    </span>
                    {artifact.isNationalTreasure && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#c59b27] text-black font-bold">
                        Bảo vật Quốc gia
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#fbf6ee] group-hover:text-[#ffd866] transition-colors">
                    {artifact.name}
                  </h3>
                  <p className="text-xs text-[#9d8c7c]">{artifact.period} • {artifact.currentLocation}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs text-[#dfb743]">
                <span className="px-2.5 py-1 rounded bg-[#241a10] border border-[#3d2b1a] text-[11px]">
                  {artifact.categoryLabel}
                </span>
                <span className="underline group-hover:text-white font-medium">Chi tiết &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
