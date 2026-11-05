import React, { useState } from 'react';
import { ARCHAEOLOGICAL_PERIODS } from '../data/museumData';
import { History, Calendar, MapPin, Hammer, ArrowRight } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [activePeriodId, setActivePeriodId] = useState<string>('dong-son');

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201811] border border-[#523d29] text-[#dfb743] text-xs font-medium uppercase tracking-widest mb-3">
          <History className="w-3.5 h-3.5 text-[#e5c158]" />
          Dòng thời gian khảo cổ học Việt Nam
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#fbf6ee]">
          Tiến Trình 4 Giai Đoạn <span className="gold-gradient-text">Thời Đại Kim Khí</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#baa998]">
          Văn hóa Đông Sơn không xuất hiện ngẫu nhiên từ bên ngoài mà là kết tinh nội sinh của một quá trình phát triển liên tục hàng ngàn năm từ thời tiền sử sông Hồng.
        </p>
      </div>

      {/* Interactive Timeline Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {ARCHAEOLOGICAL_PERIODS.map((period, index) => {
          const isActive = period.id === activePeriodId;
          return (
            <button
              key={period.id}
              onClick={() => setActivePeriodId(period.id)}
              className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-b from-[#261d14] to-[#17120c] border-[#c59b27] shadow-xl shadow-[#c59b27]/15 ring-1 ring-[#c59b27]/50'
                  : 'bg-[#15110c] border-[#302519] hover:bg-[#1f1811] hover:border-[#4d3a27] opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isActive ? 'bg-[#c59b27] text-black' : 'bg-[#291f15] text-[#bcaaa0]'
                }`}>
                  Giai đoạn 0{index + 1}
                </span>
                <h3 className={`mt-2 font-serif font-bold text-base md:text-lg ${
                  isActive ? 'text-[#fff2cc]' : 'text-[#d8cdbf]'
                }`}>
                  {period.name}
                </h3>
              </div>
              <p className="mt-2 text-xs text-[#9d8b7b] line-clamp-1">{period.age.split(' (')[0]}</p>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c59b27] via-[#f7d77e] to-[#c59b27]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Period Spotlight Card */}
      {ARCHAEOLOGICAL_PERIODS.map((period) => {
        if (period.id !== activePeriodId) return null;
        return (
          <div
            key={period.id}
            className="p-8 rounded-2xl bg-gradient-to-br from-[#1c1610] to-[#110e0a] border border-[#4a3926] shadow-2xl transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2b2015]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#dfb743] font-semibold">
                  Khảo Cứu Chuyên Đề
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#fbf6ee] mt-1">
                  {period.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#e6c670] bg-[#291e14] px-4 py-2 rounded-xl border border-[#483726]">
                <Calendar className="w-4 h-4 text-[#e5c158]" />
                <span>{period.age}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#261d14] border border-[#443322] text-[#dfb743] mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8e7e6e] uppercase tracking-wider">
                      Địa điểm di chỉ phát hiện điển hình
                    </h4>
                    <p className="text-sm md:text-base text-[#ded3c5] font-medium mt-0.5">
                      {period.site}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#261d14] border border-[#443322] text-[#dfb743] mt-0.5">
                    <Hammer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#8e7e6e] uppercase tracking-wider">
                      Đặc trưng kỹ nghệ & hiện vật tiêu biểu
                    </h4>
                    <p className="text-sm md:text-base text-[#ded3c5] font-medium mt-0.5 leading-relaxed">
                      {period.keyFeatures}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-[#15100b] p-6 rounded-xl border border-[#2e2216]">
                <div>
                  <h4 className="text-xs font-semibold text-[#a89582] uppercase tracking-wider mb-2">
                    Ý nghĩa trong tiến trình lịch sử dân tộc
                  </h4>
                  <p className="text-sm md:text-base text-[#c7b9a8] leading-relaxed">
                    {period.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#261d13] text-xs text-[#8c7b6c] flex items-center gap-2">
                  <span>Trích dẫn từ: Giáo trình Cơ sở Khảo cổ học Việt Nam (NXB ĐHQGHN)</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
