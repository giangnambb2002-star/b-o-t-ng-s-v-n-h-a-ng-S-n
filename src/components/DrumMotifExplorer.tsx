import React, { useState } from 'react';
import { DRUM_MOTIFS } from '../data/museumData';
import { DrumMotifInteractive } from '../types/museum';
import { DongSonDrumGraphic } from './DongSonDrumGraphic';
import { Sparkles, Compass, BookOpen, Layers } from 'lucide-react';

interface DrumMotifExplorerProps {
  onAskAiAboutMotif?: (motifName: string) => void;
}

export const DrumMotifExplorer: React.FC<DrumMotifExplorerProps> = ({ onAskAiAboutMotif }) => {
  const [selectedMotifId, setSelectedMotifId] = useState<string>('sun-star');

  const currentMotif: DrumMotifInteractive =
    DRUM_MOTIFS.find((m) => m.id === selectedMotifId) || DRUM_MOTIFS[0];

  return (
    <section className="relative py-16 px-4 max-w-7xl mx-auto">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a140d]/40 to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201811] border border-[#523d29] text-[#dfb743] text-xs font-medium uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5 text-[#e5c158]" />
          Giải mã ngôn ngữ biểu tượng thời đại đồ đồng
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#fbf6ee] tracking-tight">
          Bản Đồ Hoa Văn <span className="gold-gradient-text">Trống Đồng Đông Sơn</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#baa998] leading-relaxed">
          Mỗi đường nét trên mặt trống đồng không chỉ là nghệ thuật chạm khắc điêu luyện mà còn là cuốn sử thi ngàn năm khắc họa vũ trụ quan, tín ngưỡng thờ mặt trời và khát vọng phồn thịnh của cư dân Lạc Việt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Interactive Drum Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#14100b]/80 border border-[#3b2d1e] shadow-2xl backdrop-blur-sm">
          <div className="w-full flex items-center justify-between pb-4 border-b border-[#2b2014] text-xs text-[#a39281]">
            <span className="flex items-center gap-1.5 font-medium text-[#dfb743]">
              <Compass className="w-4 h-4" /> Mô hình mặt trống Ngọc Lũ phục dựng
            </span>
            <span className="text-[#8c7b6c]">Tỉ lệ mẫu 1:1 chuẩn bảo tàng</span>
          </div>

          <div className="py-6 w-full flex justify-center">
            <DongSonDrumGraphic
              interactive={true}
              selectedMotifId={selectedMotifId}
              onSelectMotif={(id) => setSelectedMotifId(id)}
              size={420}
            />
          </div>

          {/* Quick Motif Selector Pills */}
          <div className="w-full pt-4 border-t border-[#2b2014]">
            <p className="text-xs text-[#8c7b6c] mb-2 font-medium">Chọn nhanh hoa văn khảo cứu:</p>
            <div className="flex flex-wrap gap-2">
              {DRUM_MOTIFS.map((motif) => (
                <button
                  key={motif.id}
                  onClick={() => setSelectedMotifId(motif.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    selectedMotifId === motif.id
                      ? 'bg-[#c59b27] text-[#120d08] font-semibold shadow-md shadow-[#c59b27]/20 scale-105'
                      : 'bg-[#1e1710] text-[#c9bcae] hover:bg-[#2e2319] hover:text-[#f3ede4] border border-[#3a2d1f]'
                  }`}
                >
                  <span>{motif.symbol}</span>
                  <span>{motif.name.split(' (')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deep Meaning & Cultural Insight */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1c1610] to-[#120e0a] border border-[#4a3926] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c59b27]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Motif Title & Zone */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#302417]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#dfb743] bg-[#291e14] px-3 py-1 rounded-full border border-[#4d3824]">
                  Vị trí: {currentMotif.zone}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#fbf6ee] mt-2.5 flex items-center gap-2.5">
                  <span className="text-2xl">{currentMotif.symbol}</span>
                  <span>{currentMotif.name}</span>
                </h3>
              </div>
            </div>

            {/* Core Meaning */}
            <div className="mt-5 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-[#a89582] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" /> Khái quát ý nghĩa biểu trưng
                </h4>
                <p className="text-base text-[#f5ebd9] font-medium leading-relaxed bg-[#241b12]/60 p-3.5 rounded-xl border border-[#3b2d1e]">
                  {currentMotif.shortText}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#a89582] uppercase tracking-wider mb-1">
                  Luận giải chi tiết từ khảo cổ học
                </h4>
                <p className="text-sm text-[#c7b9a8] leading-relaxed">
                  {currentMotif.detailedSignificance}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[#a89582] uppercase tracking-wider mb-1">
                  Bối cảnh lịch sử & văn hóa Lạc Việt
                </h4>
                <p className="text-sm text-[#dfb743]/90 italic leading-relaxed bg-[#1b140d] p-3 rounded-lg border-l-2 border-[#c59b27]">
                  "{currentMotif.culturalContext}"
                </p>
              </div>
            </div>

            {/* Action button: Ask AI about this motif */}
            <div className="mt-6 pt-5 border-t border-[#302417] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#8c7b6c] flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#dfb743]" />
                Tư liệu trích từ GS. Hà Văn Tấn & Hồ sơ Bảo vật Quốc gia
              </span>

              {onAskAiAboutMotif && (
                <button
                  onClick={() => onAskAiAboutMotif(currentMotif.name)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#dfb743] text-[#120d08] text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-[#c59b27]/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Hỏi AI về hoa văn này
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
