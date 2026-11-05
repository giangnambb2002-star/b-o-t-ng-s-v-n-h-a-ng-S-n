import React, { useState } from 'react';
import {
  Shield,
  Target,
  Sparkles,
  Users,
  Send,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Landmark,
} from 'lucide-react';

export const AboutMuseum: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;
    setFeedbackSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201811] border border-[#523d29] text-[#dfb743] text-xs font-medium uppercase tracking-widest mb-3">
          <Landmark className="w-3.5 h-3.5 text-[#e5c158]" />
          Dự Án Số Hóa Di Sản Lạc Việt
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fbf6ee]">
          Về Chúng Tôi & <span className="gold-gradient-text">Mục Tiêu Dự Án</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-[#baa998] leading-relaxed">
          "Bảo tàng số Văn hóa Đông Sơn" ra đời với sứ mệnh tôn vinh cội nguồn dân tộc, số hóa và đưa những kiệt tác trống đồng đỉnh cao của người Việt cổ đến gần hơn với công chúng trong nước và quốc tế.
        </p>
      </div>

      {/* 3 Pillars of Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#14100b] border border-[#382b1c] space-y-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-[#291e14] border border-[#4d3824] flex items-center justify-center text-[#dfb743]">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#fbf6ee]">
            Bảo Tồn & Số Hóa
          </h3>
          <p className="text-xs text-[#baa998] leading-relaxed">
            Số hóa toàn bộ hồ sơ hiện vật, hoa văn, kích thước và niên đại của các bảo vật trống đồng Đông Sơn theo định dạng trực quan, sinh động và dễ tiếp cận nhất.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#14100b] border border-[#382b1c] space-y-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-[#291e14] border border-[#4d3824] flex items-center justify-center text-[#dfb743]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#fbf6ee]">
            Trợ Lý AI Nghiên Cứu
          </h3>
          <p className="text-xs text-[#baa998] leading-relaxed">
            Tích hợp trí tuệ nhân tạo Gemini để hỗ trợ thế hệ trẻ, học sinh, sinh viên và nhà nghiên cứu hỏi đáp, giải mã hoa văn và tiếp cận tri thức lịch sử tự nhiên.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#14100b] border border-[#382b1c] space-y-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-[#291e14] border border-[#4d3824] flex items-center justify-center text-[#dfb743]">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#fbf6ee]">
            Minh Bạch Học Thuật
          </h3>
          <p className="text-xs text-[#baa998] leading-relaxed">
            Cam kết tuân thủ nghiêm ngặt chuẩn mực bảo tàng học, ghi rõ nhãn dữ liệu mẫu chờ kiểm định và trích dẫn trung thực từ các cơ quan nghiên cứu uy tín.
          </p>
        </div>
      </div>

      {/* Project Background & Authors */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1a140e] to-[#110e0a] border border-[#4a3724] space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 pb-4 border-b border-[#302316]">
          <Users className="w-6 h-6 text-[#e5c158]" />
          <h2 className="font-serif font-bold text-xl md:text-2xl text-[#fbf6ee]">
            Đơn Vị Khởi Xướng & Ban Biên Tập Khảo Cứu
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#ded3c5]">
          <div className="space-y-3 leading-relaxed">
            <h4 className="font-bold text-sm text-[#ffd866] uppercase tracking-wider">
              Tác giả dự án & Nhóm phát triển công nghệ:
            </h4>
            <p>
              Dự án được khởi xướng và phát triển bởi nhóm các kỹ sư công nghệ và những người trẻ yêu lịch sử Việt Nam, với mong muốn ứng dụng công nghệ web hiện đại và AI để phụng sự di sản dân tộc.
            </p>
            <p className="text-[#a89785]">
              Hệ thống được thiết kế theo tiêu chuẩn quốc tế về trải nghiệm người dùng, khả năng tương thích cao trên mọi thiết bị di động và máy tính cá nhân.
            </p>
          </div>

          <div className="space-y-3 leading-relaxed">
            <h4 className="font-bold text-sm text-[#ffd866] uppercase tracking-wider">
              Tôn chỉ thẩm định dữ liệu hiện vật:
            </h4>
            <p>
              Mọi bản ghi dữ liệu hiện vật mẫu trong giai đoạn 1 đều mang nhãn <strong>[DỮ LIỆU MẪU KHẢO CỨU]</strong>. Dự án chủ động liên hệ và sẵn sàng hợp tác với Bảo tàng Lịch sử Quốc gia, Viện Khảo cổ học Việt Nam để hoàn thiện quy trình kiểm định khoa học.
            </p>
            <p className="text-[#a89785]">
              Chúng tôi tuyệt đối không tự bịa đặt tài liệu hay trình bày dữ liệu chưa kiểm định như hiện vật hoàn chỉnh.
            </p>
          </div>
        </div>

        {/* Legal & Academic Commitment Banner */}
        <div className="p-4 rounded-xl bg-[#26190e] border border-[#4a351f] flex items-start gap-3 text-xs text-[#ebd8c4]">
          <AlertTriangle className="w-4 h-4 text-[#e5c158] shrink-0 mt-0.5" />
          <p>
            <strong>Thông cáo học thuật:</strong> Nền tảng hoạt động phi thương mại vì mục đích giáo dục cộng đồng và bảo tồn di sản văn hóa Lạc Việt thời đại Hùng Vương.
          </p>
        </div>
      </div>

      {/* Contribution & Feedback Form */}
      <div className="p-8 rounded-2xl bg-[#14100b] border border-[#382b1c] shadow-xl">
        <h3 className="font-serif font-bold text-xl text-[#fbf6ee] mb-2">
          Đóng Góp Tư Liệu & Góp Ý Khảo Cứu
        </h3>
        <p className="text-xs text-[#a39281] mb-6">
          Quý nhà nghiên cứu, sinh viên chuyên ngành lịch sử hoặc người yêu di sản có tư liệu, hình ảnh hoặc muốn góp ý bổ sung cho kho dữ liệu hiện vật? Hãy gửi thông tin cho ban biên tập.
        </p>

        {feedbackSent ? (
          <div className="p-6 rounded-xl bg-[#1c2918] border border-[#325227] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
            <h4 className="font-serif font-bold text-base text-white">
              Cảm ơn Quý khách đã gửi đóng góp!
            </h4>
            <p className="text-xs text-[#a3c99a]">
              Ban biên tập Bảo tàng số Văn hóa Đông Sơn sẽ tiếp nhận và phản hồi tới email của Quý khách sau khi thẩm định.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#c4b6a5] mb-1">Họ và tên / Đơn vị:</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A - ĐH KHXH&NV"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a140e] border border-[#3d2e1f] text-xs text-white placeholder-[#7a6b5d] focus:border-[#c59b27] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#c4b6a5] mb-1">Địa chỉ Email:</label>
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="email@vidu.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a140e] border border-[#3d2e1f] text-xs text-white placeholder-[#7a6b5d] focus:border-[#c59b27] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#c4b6a5] mb-1">
                Nội dung góp ý / Tài liệu hiện vật muốn đề xuất:
              </label>
              <textarea
                required
                rows={4}
                value={feedbackMsg}
                onChange={(e) => setFeedbackMsg(e.target.value)}
                placeholder="Mô tả thông tin hiện vật, liên kết tài liệu khảo cổ hoặc ý kiến đóng góp cho giao diện bảo tàng..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a140e] border border-[#3d2e1f] text-xs text-white placeholder-[#7a6b5d] focus:border-[#c59b27] outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#dfb743] hover:brightness-110 text-black font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Gửi đóng góp tư liệu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
