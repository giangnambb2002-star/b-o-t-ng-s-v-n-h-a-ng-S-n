import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  BookOpen,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const DEFAULT_SUGGESTED_PROMPTS = [
  'Ý nghĩa của hình ảnh đàn chim Lạc trên mặt trống đồng Ngọc Lũ?',
  'Kỹ thuật đúc trống đồng của người Việt cổ Đông Sơn độc đáo ra sao?',
  'Điểm khác biệt giữa Trống đồng Đông Sơn loại 1 Heger và các loại khác?',
  'Hình tượng ngôi sao nhiều cánh ở tâm trống tượng trưng cho điều gì?',
  'Ý nghĩa tín ngưỡng phồn thực trên nắp Thạp đồng Đào Thịnh?',
  'Mối liên hệ giữa Văn hóa Đông Sơn và thời đại các Vua Hùng dựng nước?',
];

interface AiScholarChatProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const AiScholarChat: React.FC<AiScholarChatProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Kính chào Quý khách! Tôi là **Trợ lý AI Di sản Đông Sơn**, được xây dựng dựa trên mô hình trí tuệ nhân tạo **Gemini** kết hợp cùng hệ thống tư liệu khảo cổ học chính thống của Viện Khảo cổ học Việt Nam và Bảo tàng Lịch sử Quốc gia.

Quý khách có thể hỏi tôi về:
- **Trống đồng Đông Sơn** (Ngọc Lũ, Hoàng Hạ, Cổ Loa, Sông Đà...)
- **Ý nghĩa hoa văn**: Mặt trời, chim Lạc, cảnh giã gạo, chiến thuyền, bầy hươu
- **Kỹ thuật đúc đồng**: Phương pháp khuôn nhiều mang, đúc sáp ong, thành phần hợp kim
- **Thời đại khảo cổ**: Phùng Nguyên, Đồng Đậu, Gò Mun đến Đông Sơn hoàng kim
- **Xã hội Lạc Việt thời Hùng Vương - An Dương Vương**

Xin mời Quý khách đặt câu hỏi hoặc chọn một trong các gợi ý bên dưới!`,
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initialPrompt triggered from outside
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || input).trim();
    if (!question || isLoading) return;

    setErrorMsg(null);
    setInput('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build history for context
      const history = messages
        .filter((m) => m.id !== 'welcome-msg')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          text: m.content,
        }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history: history,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Lỗi máy chủ (${res.status})`);
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'Không có phản hồi từ máy chủ.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error('Lỗi khi hỏi AI:', err);
      const msg = err instanceof Error ? err.message : 'Không thể kết nối đến Trợ lý AI.';
      setErrorMsg(msg);
      // Add a graceful error response bubble
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ Rất tiếc, đã xảy ra sự cố khi xử lý câu hỏi: **${msg}**\n\n*Gợi ý:* Vui lòng kiểm tra lại cấu hình API Key trong mục **Settings > Secrets** hoặc thử lại sau giây lát.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Cuộc trò chuyện đã được làm mới. Quý khách vui lòng nhập câu hỏi mới về văn hóa Đông Sơn hoặc chọn gợi ý bên dưới.`,
        timestamp: new Date(),
      },
    ]);
    setErrorMsg(null);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simple Markdown formatting for display
  const renderFormattedContent = (content: string) => {
    return (
      <div className="space-y-2 text-sm leading-relaxed text-[#f0e6d8]">
        {content.split('\n\n').map((paragraph, pIdx) => {
          // Check for bullet list
          if (paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ')) {
            const items = paragraph.split('\n').filter((l) => l.trim().length > 0);
            return (
              <ul key={pIdx} className="space-y-1.5 list-disc list-inside text-[#ded3c5]">
                {items.map((item, itemIdx) => {
                  const cleaned = item.replace(/^[-*]\s+/, '');
                  return <li key={itemIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleaned) }} />;
                })}
              </ul>
            );
          }

          // Header
          if (paragraph.trim().startsWith('### ')) {
            return (
              <h4 key={pIdx} className="font-serif font-bold text-base text-[#ffd866] mt-3">
                {paragraph.replace(/^###\s+/, '')}
              </h4>
            );
          }

          return (
            <p
              key={pIdx}
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(paragraph) }}
            />
          );
        })}
      </div>
    );
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#ffd866] font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-[#dfb743]">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#2b1f14] text-[#e5c158] font-mono text-xs">$1</code>');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 h-full flex flex-col">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1c150e] via-[#241a10] to-[#17110b] border border-[#483726] shadow-2xl mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c59b27] to-[#8c6713] flex items-center justify-center text-black shadow-lg shadow-[#c59b27]/30 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#fbf6ee]">
                  Trợ Lý AI Di Sản Đông Sơn
                </h1>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#3d2e1c] border border-[#6b5233] text-[#e5c158] font-semibold">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-[#baa998] mt-1">
                Tra cứu, đối chiếu và giải đáp chuyên sâu về văn hóa Đông Sơn, trống đồng và kỹ thuật đúc cổ truyền.
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#261d13] border border-[#3d2d1d] hover:bg-[#362719] text-[#cbbdaf] text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Làm mới đoạn chat
          </button>
        </div>

        {/* Academic rigor badge */}
        <div className="mt-4 pt-3 border-t border-[#302316] flex flex-wrap items-center justify-between gap-2 text-xs text-[#a39281]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#e5c158]" />
            Dữ liệu tri thức được huấn luyện bám sát các công trình của Viện Khảo cổ học Việt Nam
          </span>
          <span className="text-[#8c7b6c]">Hỗ trợ tiếng Việt tự nhiên có dấu</span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 min-h-[460px] max-h-[580px] overflow-y-auto rounded-2xl bg-[#110e0a] border border-[#382b1d] p-5 space-y-6 shadow-inner">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isUser
                    ? 'bg-[#3b2d1f] text-[#f5ebd9] border border-[#5a442f]'
                    : 'bg-gradient-to-br from-[#c59b27] to-[#7a5912] text-black border border-[#dfb743]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4.5 ${
                  isUser
                    ? 'bg-gradient-to-r from-[#2a1e12] to-[#362617] text-[#fff6ea] border border-[#4d3823] shadow-lg rounded-tr-sm'
                    : 'bg-[#18130e] text-[#f0e6d8] border border-[#332516] shadow-md rounded-tl-sm'
                }`}
              >
                {/* Role Header */}
                <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-[#281c10] text-[11px] text-[#8e7e6e]">
                  <span className="font-semibold text-[#dfb743]">
                    {isUser ? 'Quý khách' : 'Trợ lý Di sản Đông Sơn'}
                  </span>
                  <span>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Content */}
                <div>{renderFormattedContent(message.content)}</div>

                {/* Copy button */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-[#261b0f] flex justify-end">
                    <button
                      onClick={() => handleCopyText(message.id, message.content)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#9c8b7b] hover:text-[#dfb743] transition-colors cursor-pointer"
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" /> Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Sao chép câu trả lời
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c59b27] to-[#7a5912] flex items-center justify-center text-black shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl p-4 bg-[#18130e] border border-[#332516] flex items-center gap-3 text-xs text-[#baa998]">
              <Loader2 className="w-4 h-4 text-[#e5c158] animate-spin" />
              <span>Trợ lý AI đang tra cứu thư tịch và phân tích dữ liệu khảo cổ...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="mt-4">
        <p className="text-xs text-[#8c7b6c] mb-2 flex items-center gap-1 font-medium">
          <BookOpen className="w-3.5 h-3.5 text-[#c59b27]" /> Gợi ý câu hỏi nghiên cứu thường gặp:
        </p>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-left text-xs px-3 py-1.5 rounded-lg bg-[#18130e] hover:bg-[#261d14] border border-[#332417] hover:border-[#c59b27] text-[#cbbdaf] hover:text-[#f3ede4] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>{prompt}</span>
              <ChevronRight className="w-3 h-3 text-[#c59b27] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Đặt câu hỏi về văn hóa Đông Sơn, trống đồng, hoa văn chim Lạc..."
            disabled={isLoading}
            className="w-full pl-5 pr-28 py-3.5 rounded-2xl bg-[#16110b] border border-[#483726] focus:border-[#c59b27] focus:ring-2 focus:ring-[#c59b27]/25 text-[#fbf6ee] placeholder-[#7d6e60] text-sm outline-none transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#dfb743] hover:brightness-110 disabled:opacity-40 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Gửi</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-2 text-center text-[11px] text-[#786a5d]">
          Trợ lý AI sử dụng mô hình Gemini 3.8 Flash. Phản hồi nhằm mục đích tham khảo và giáo dục lịch sử.
        </p>
      </div>
    </div>
  );
};
