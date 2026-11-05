import React from 'react';
import { NavTab } from './Navbar';
import { Artifact } from '../types/museum';
import { ARTIFACTS_DATA, SAMPLE_DATA_BADGE_TEXT } from '../data/museumData';
import { DongSonDrumGraphic } from './DongSonDrumGraphic';
import { DrumMotifExplorer } from './DrumMotifExplorer';
import { TimelineSection } from './TimelineSection';
import { ArtifactCard } from './ArtifactCard';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  Flame,
  BookOpen,
  Calendar,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: NavTab) => void;
  onSelectArtifact: (artifact: Artifact) => void;
  onAskAiWithQuery: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectArtifact,
  onAskAiWithQuery,
}) => {
  // Select top 4 standout artifacts for highlight
  const featuredArtifacts = ARTIFACTS_DATA.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 overflow-hidden">
        {/* Deep ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c59b27]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#dfb743]/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* National Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e160e] border border-[#483726] text-xs font-semibold uppercase tracking-widest text-[#dfb743] shadow-md">
              <Award className="w-4 h-4 text-[#e5c158]" />
              Di Sản Văn Minh Sông Hồng • Thời Đại Hùng Vương
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-[#fbf6ee] leading-[1.1]">
              BẢO TÀNG SỐ <br />
              <span className="gold-gradient-text">VĂN HÓA ĐÔNG SƠN</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#baa998] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Chiêm ngưỡng kho tàng kiệt tác trống đồng Lạc Việt và nền văn minh đúc đồng đỉnh cao cách đây hơn 2.500 năm. Khám phá vũ trụ quan, biểu tượng chim Lạc và đối thoại trực tiếp cùng Trợ lý AI Di sản.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onNavigate('collection')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c59b27] via-[#dfb743] to-[#c59b27] text-black font-extrabold text-sm hover:brightness-110 transition-all flex items-center gap-2.5 shadow-xl shadow-[#c59b27]/25 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
                <span>Khám Phá Bộ Sưu Tập</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('ai-chat')}
                className="px-7 py-4 rounded-2xl bg-[#1c1610] hover:bg-[#281f16] border border-[#4d3824] hover:border-[#c59b27] text-[#fbf6ee] font-bold text-sm transition-all flex items-center gap-2.5 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#e5c158]" />
                <span>Hỏi Đáp Với AI Gemini</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-[#2e2114] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#ffd866]">
                  +2.500
                </span>
                <span className="text-xs text-[#8c7b6c]">Năm lịch sử kim khí</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#ffd866]">
                  Heger I
                </span>
                <span className="text-xs text-[#8c7b6c]">Đỉnh cao loại hình trống</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#ffd866]">
                  14 Cánh
                </span>
                <span className="text-xs text-[#8c7b6c]">Ngôi sao thái dương tâm</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#ffd866]">
                  100%
                </span>
                <span className="text-xs text-[#8c7b6c]">Nguồn kiểm chứng học thuật</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Bronze Drum Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="p-4 sm:p-6 rounded-3xl bg-[#14100b]/60 border border-[#3d2e1f] backdrop-blur-md shadow-2xl relative">
              <DongSonDrumGraphic
                interactive={true}
                onSelectMotif={(motifId) => {
                  const elem = document.getElementById('drum-motif-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                size={440}
              />
              <p className="mt-3 text-center text-xs text-[#a39281] italic">
                Mô hình số hóa Trống đồng Ngọc Lũ (Bảo vật Quốc gia)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION: What is Dong Son Culture? */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#18130d] via-[#140f0a] to-[#0d0a07] border border-[#3e2e1e] shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#dfb743]">
              Cội nguồn ngàn năm
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#fbf6ee]">
              Nền Văn Hóa Đông Sơn & Thời Đại Hùng Vương
            </h2>
            <p className="text-sm sm:text-base text-[#baa998] leading-relaxed">
              Văn hóa Đông Sơn là một nền văn hóa khảo cổ học thời đại đồ đồng và sơ kỳ đồ sắt có niên đại từ thế kỷ VII TCN đến thế kỷ I-II SCN. Phát hiện đầu tiên vào năm 1924 tại làng Đông Sơn bên bờ sông Mã (Thanh Hóa), nền văn hóa này đã khẳng định nền văn minh rực rỡ mang tính bản địa sâu sắc của người Việt cổ.
            </p>
          </div>

          {/* 3 Core Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#291e13]">
            <div className="space-y-2.5 p-5 rounded-2xl bg-[#1a140e] border border-[#2e2114]">
              <div className="w-10 h-10 rounded-xl bg-[#26190e] border border-[#48331e] flex items-center justify-center text-[#dfb743]">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#fbf6ee]">
                Đỉnh Cao Kỹ Nghệ Đúc Đồng
              </h3>
              <p className="text-xs text-[#c4b6a5] leading-relaxed">
                Người thợ đúc đồng Đông Sơn đã hoàn thiện kỹ thuật khuôn nhiều mang bằng đất nung và phương pháp sáp ong tinh vi, tạo ra những trống đồng nặng gần 1 tạ với thành mỏng, âm vang trầm hùng.
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-2xl bg-[#1a140e] border border-[#2e2114]">
              <div className="w-10 h-10 rounded-xl bg-[#26190e] border border-[#48331e] flex items-center justify-center text-[#dfb743]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#fbf6ee]">
                Bức Tranh Đời Sống Lạc Việt
              </h3>
              <p className="text-xs text-[#c4b6a5] leading-relaxed">
                Hoa văn trên hiện vật ghi lại chân thực cuộc sống: nhà sàn mái cong, giã gạo chày đôi, lễ hội mừng cơm mới, vũ khúc lông chim và những đoàn thuyền chiến lướt sóng làm chủ sông nước.
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-2xl bg-[#1a140e] border border-[#2e2114]">
              <div className="w-10 h-10 rounded-xl bg-[#26190e] border border-[#48331e] flex items-center justify-center text-[#dfb743]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#fbf6ee]">
                Biểu Tượng Tối Thượng Của Quyền Uy
              </h3>
              <p className="text-xs text-[#c4b6a5] leading-relaxed">
                Trống đồng không chỉ là nhạc khí tế lễ mà còn là pháp khí thiêng liêng biểu tượng cho quyền lực của các vị thủ lĩnh bộ lạc và nhà nước Văn Lang - Âu Lạc sơ khai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DRUM MOTIF EXPLORER SECTION */}
      <div id="drum-motif-section">
        <DrumMotifExplorer
          onAskAiAboutMotif={(motifName) => {
            onAskAiWithQuery(`Hãy giải thích chuyên sâu về ý nghĩa của hoa văn "${motifName}" trên mặt trống đồng Đông Sơn theo khảo cổ học.`);
          }}
        />
      </div>

      {/* FEATURED ARTIFACTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#201811] border border-[#4d3722] text-[#dfb743] text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              Bảo Vật & Hiện Vật Tiêu Biểu
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#fbf6ee]">
              Hiện Vật Khảo Cứu Nổi Bật
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#baa998]">
              Những di vật khảo cổ quý giá đã được công nhận là Bảo vật Quốc gia của Việt Nam.
            </p>
          </div>

          <button
            onClick={() => onNavigate('collection')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1f1710] hover:bg-[#2b2015] border border-[#3d2e1f] text-[#dfb743] hover:text-[#fff2cc] text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Xem Tất Cả ({ARTIFACTS_DATA.length}) Hiện Vật</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Artifact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtifacts.map((artifact) => (
            <ArtifactCard
              key={artifact.id}
              artifact={artifact}
              onSelect={onSelectArtifact}
            />
          ))}
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <TimelineSection />

      {/* AI ASSISTANT INVITATION BANNER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#21160e] via-[#291b10] to-[#171009] border border-[#523d27] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c59b27]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#362415] border border-[#5a3f25] text-[#ffd866] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Công Nghệ Trí Tuệ Nhân Tạo
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#fbf6ee]">
              Đối Thoại Trực Tiếp Cùng <span className="gold-gradient-text">Trợ Lý AI Di Sản</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#c9bcae] leading-relaxed">
              Quý khách có thắc mắc về bí ẩn đàn chim Lạc, cách người xưa pha chế hợp kim đồng thanh hay ý nghĩa tín ngưỡng phồn thực trên nắp Thạp Đào Thịnh? Trợ lý AI Gemini luôn sẵn sàng giải đáp 24/7.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              <button
                onClick={() => onAskAiWithQuery('Ý nghĩa của hình ảnh đàn chim Lạc trên mặt trống đồng Ngọc Lũ?')}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#18110b] border border-[#402d1b] text-[#ded3c5] hover:border-[#c59b27] hover:text-white transition-all cursor-pointer"
              >
                Ý nghĩa đàn chim Lạc?
              </button>
              <button
                onClick={() => onAskAiWithQuery('Kỹ thuật đúc đồng Đông Sơn độc đáo như thế nào?')}
                className="text-xs px-3 py-1.5 rounded-lg bg-[#18110b] border border-[#402d1b] text-[#ded3c5] hover:border-[#c59b27] hover:text-white transition-all cursor-pointer"
              >
                Kỹ thuật đúc sáp ong?
              </button>
            </div>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => onNavigate('ai-chat')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c59b27] to-[#dfb743] hover:brightness-110 text-black font-extrabold text-sm flex items-center gap-2.5 shadow-xl shadow-[#c59b27]/30 transition-all cursor-pointer transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Bắt Đầu Trò Chuyện Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
