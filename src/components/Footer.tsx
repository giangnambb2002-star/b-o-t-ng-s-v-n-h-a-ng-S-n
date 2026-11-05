import React from 'react';
import { NavTab } from './Navbar';
import { Sparkles, Shield, BookOpen, ExternalLink, Heart } from 'lucide-react';
import { SAMPLE_DATA_BADGE_TEXT } from '../data/museumData';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 bg-[#0a0806] border-t border-[#2e2114] text-[#a39281] text-xs">
      {/* Top Banner */}
      <div className="border-b border-[#21170d] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1c150e] border border-[#483726] flex items-center justify-center text-[#dfb743]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#fbf6ee]">
                Bảo Tàng Số Văn Hóa Đông Sơn
              </h4>
              <p className="text-xs text-[#8c7b6c]">
                Không gian số hóa di sản đồ đồng thời đại các Vua Hùng dựng nước Văn Lang
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-[#1e150d] border border-[#3d2a19] text-[#dfb743] font-mono text-[11px]">
              {SAMPLE_DATA_BADGE_TEXT}
            </span>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: About */}
        <div className="space-y-3">
          <h5 className="font-serif font-bold text-sm text-[#fbf6ee] uppercase tracking-wider">
            Sứ Mệnh Di Sản
          </h5>
          <p className="leading-relaxed text-[#8c7b6c]">
            Dự án ứng dụng công nghệ web 3D và AI để bảo tồn, tôn vinh và lan tỏa nét đẹp của văn hóa Đông Sơn - nền văn minh kim khí rực rỡ nhất Đông Nam Á thời cổ đại.
          </p>
          <div className="pt-2 text-[11px] text-[#736456]">
            Thời kỳ lịch sử: Thế kỷ VII TCN - Thế kỷ I/II SCN
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h5 className="font-serif font-bold text-sm text-[#fbf6ee] uppercase tracking-wider">
            Điều Hướng Bảo Tàng
          </h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#ffd866] transition-colors"
              >
                Trang Chủ & Trống Đồng
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('collection')}
                className="hover:text-[#ffd866] transition-colors"
              >
                Bộ Sưu Tập Cổ Vật
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('ai-chat')}
                className="hover:text-[#ffd866] transition-colors flex items-center gap-1.5"
              >
                <span>Trợ Lý AI Gemini</span>
                <Sparkles className="w-3 h-3 text-[#dfb743]" />
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('archives')}
                className="hover:text-[#ffd866] transition-colors"
              >
                Nguồn Tư Liệu Khảo Cứu
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#ffd866] transition-colors"
              >
                Giới Thiệu Dự Án
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Research Partners */}
        <div className="space-y-3">
          <h5 className="font-serif font-bold text-sm text-[#fbf6ee] uppercase tracking-wider">
            Cổng Thông Tin Học Thuật
          </h5>
          <ul className="space-y-2 text-[#8c7b6c]">
            <li>
              <a
                href="http://baotanglichsu.vn"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#dfb743] flex items-center gap-1 transition-colors"
              >
                <span>Bảo tàng Lịch sử Quốc gia</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="http://dsvh.gov.vn"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#dfb743] flex items-center gap-1 transition-colors"
              >
                <span>Cục Di sản Văn hóa Việt Nam</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <span className="text-[#6d5e50]">Viện Khảo cổ học Việt Nam (VAST)</span>
            </li>
            <li>
              <span className="text-[#6d5e50]">Hội Khảo cổ học Việt Nam</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Data notice */}
        <div className="space-y-3">
          <h5 className="font-serif font-bold text-sm text-[#fbf6ee] uppercase tracking-wider">
            Quy Chuẩn Minh Bạch
          </h5>
          <div className="p-3.5 rounded-xl bg-[#140e08] border border-[#2e2013] space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-[#dfb743] font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Chính sách dữ liệu mẫu</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#8c7b6c]">
              Dữ liệu hiện vật số được gắn nhãn khảo cứu mẫu chờ phê duyệt đồng bộ từ Hội đồng Khoa học. Nguồn tham chiếu hoàn toàn có thật và được kiểm chứng.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#1a120a] py-6 px-4 text-center text-[#6e5f52] text-[11px]">
        <p>
          © 2026 Bảo Tàng Số Văn Hóa Đông Sơn. Bản quyền thuộc về Dự án Bảo tồn Di sản Lạc Việt.
        </p>
      </div>
    </footer>
  );
};
