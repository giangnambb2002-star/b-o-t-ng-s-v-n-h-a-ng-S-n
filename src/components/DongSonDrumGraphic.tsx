import React, { useState } from 'react';
import { Sparkles, Eye, Info } from 'lucide-react';

interface DongSonDrumGraphicProps {
  interactive?: boolean;
  onSelectMotif?: (motifId: string) => void;
  selectedMotifId?: string;
  size?: number;
  className?: string;
}

export const DongSonDrumGraphic: React.FC<DongSonDrumGraphicProps> = ({
  interactive = true,
  onSelectMotif,
  selectedMotifId,
  size = 460,
  className = '',
}) => {
  const [hoveredRing, setHoveredRing] = useState<string | null>(null);

  const handleRingClick = (id: string) => {
    if (onSelectMotif) {
      onSelectMotif(id);
    }
  };

  // Generate 14-pointed star rays
  const starPoints = Array.from({ length: 14 }).map((_, i) => {
    const angle = (i * 360) / 14;
    const rad = (angle * Math.PI) / 180;
    const nextRad = ((angle + 360 / 28) * Math.PI) / 180;
    const outerR = 64;
    const innerR = 26;
    const x1 = 250 + outerR * Math.cos(rad);
    const y1 = 250 + outerR * Math.sin(rad);
    const x2 = 250 + innerR * Math.cos(nextRad);
    const y2 = 250 + innerR * Math.sin(nextRad);
    return `${x1},${y1} ${x2},${y2}`;
  }).join(' ');

  // Generate 16 flying Lac birds in circle (counter-clockwise)
  const lacBirds = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16;
    return {
      id: `bird-${i}`,
      angle,
      r: 156,
    };
  });

  // Generate 8 deer pairs in circle
  const deers = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i * 360) / 10 + 18;
    return {
      id: `deer-${i}`,
      angle,
      r: 198,
    };
  });

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Decorative ambient glow */}
      <div className="absolute inset-0 bg-[#c59b27]/10 blur-3xl rounded-full pointer-events-none" />

      {/* SVG Bronze Drum Canvas */}
      <svg
        viewBox="0 0 500 500"
        className="w-full max-w-[500px] h-auto drop-shadow-[0_10px_35px_rgba(197,155,39,0.3)] transition-transform duration-700"
        style={{ maxWidth: size }}
      >
        <defs>
          <radialGradient id="drumPatina" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#30261b" />
            <stop offset="45%" stopColor="#221b13" />
            <stop offset="85%" stopColor="#16120e" />
            <stop offset="100%" stopColor="#0d0a07" />
          </radialGradient>

          <linearGradient id="bronzeGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe699" />
            <stop offset="40%" stopColor="#dfb743" />
            <stop offset="70%" stopColor="#c59b27" />
            <stop offset="100%" stopColor="#876316" />
          </linearGradient>

          <linearGradient id="highlightGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff2cc" />
            <stop offset="100%" stopColor="#e5c158" />
          </linearGradient>

          <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Bronze Rim & Bevels */}
        <circle cx="250" cy="250" r="244" fill="url(#drumPatina)" stroke="#53402e" strokeWidth="6" />
        <circle cx="250" cy="250" r="238" fill="none" stroke="#c59b27" strokeWidth="2.5" opacity="0.85" />
        <circle cx="250" cy="250" r="232" fill="none" stroke="#685038" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* RING 6: Outer Sawtooth & Concentric Dot Circle (r=218-228) */}
        <circle
          cx="250"
          cy="250"
          r="224"
          fill="none"
          stroke={hoveredRing === 'concentric-circles' || selectedMotifId === 'concentric-circles' ? '#ffd866' : '#a8812c'}
          strokeWidth="6"
          strokeDasharray="4 6"
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredRing('concentric-circles')}
          onMouseLeave={() => setHoveredRing(null)}
          onClick={() => handleRingClick('concentric-circles')}
        />
        <circle cx="250" cy="250" r="215" fill="none" stroke="#5a4430" strokeWidth="1.5" />

        {/* RING 5: Deer Band (r=188-210) */}
        <g
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredRing('deer-pattern')}
          onMouseLeave={() => setHoveredRing(null)}
          onClick={() => handleRingClick('deer-pattern')}
        >
          <circle
            cx="250"
            cy="250"
            r="198"
            fill="none"
            stroke={hoveredRing === 'deer-pattern' || selectedMotifId === 'deer-pattern' ? '#f5d77f' : 'transparent'}
            strokeWidth="24"
            className="transition-colors duration-300"
          />
          {deers.map((d) => (
            <g key={d.id} transform={`rotate(${d.angle} 250 250) translate(250, ${250 - d.r})`}>
              {/* Stylized Deer Glyph */}
              <path
                d="M-8,4 L-4,-4 L0,-2 L6,-6 L8,-2 L4,2 L6,6 L2,6 L-2,4 Z"
                fill={hoveredRing === 'deer-pattern' || selectedMotifId === 'deer-pattern' ? '#ffe89e' : '#c59b27'}
                opacity={hoveredRing === 'deer-pattern' || selectedMotifId === 'deer-pattern' ? '1' : '0.8'}
              />
              {/* Deer antlers */}
              <line x1="6" y1="-6" x2="10" y2="-10" stroke="#dfb743" strokeWidth="1" />
              <line x1="8" y1="-8" x2="11" y2="-7" stroke="#dfb743" strokeWidth="0.8" />
            </g>
          ))}
        </g>
        <circle cx="250" cy="250" r="184" fill="none" stroke="#5a4430" strokeWidth="1.5" />

        {/* RING 4: Flying Lac Birds Band (r=142-178) */}
        <g
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredRing('lac-birds')}
          onMouseLeave={() => setHoveredRing(null)}
          onClick={() => handleRingClick('lac-birds')}
        >
          <circle
            cx="250"
            cy="250"
            r="156"
            fill="none"
            stroke={hoveredRing === 'lac-birds' || selectedMotifId === 'lac-birds' ? '#fde047' : '#c59b27'}
            strokeWidth={hoveredRing === 'lac-birds' || selectedMotifId === 'lac-birds' ? '28' : '2'}
            strokeOpacity={hoveredRing === 'lac-birds' || selectedMotifId === 'lac-birds' ? '0.2' : '0.1'}
            className="transition-all duration-300"
          />
          {lacBirds.map((b) => (
            <g key={b.id} transform={`rotate(${b.angle} 250 250) translate(250, ${250 - b.r})`}>
              {/* Flying Lac Bird (Mỏ dài, cánh xòe, đuôi dài ngược chiều kim đồng hồ) */}
              <g transform="scale(0.85)">
                <path
                  d="M-22,0 C-14,-6 -2,-7 14,-2 C22,0 28,-1 34,-5 C30,-1 26,3 18,3 C8,4 -4,3 -16,4 Z"
                  fill={hoveredRing === 'lac-birds' || selectedMotifId === 'lac-birds' ? '#fffae5' : '#dfb743'}
                  filter={hoveredRing === 'lac-birds' || selectedMotifId === 'lac-birds' ? 'url(#glowGold)' : undefined}
                />
                {/* Long beak */}
                <path
                  d="M34,-5 C38,-7 44,-8 48,-9 C42,-7 36,-4 32,-3 Z"
                  fill="#ffd866"
                />
                {/* Feathers / wings */}
                <path
                  d="M4,-4 C-2,-14 -10,-18 -18,-20 C-14,-14 -6,-8 0,-4 Z"
                  fill={hoveredRing === 'lac-birds' || selectedMotifId === 'lac-birds' ? '#ffe89e' : '#c59b27'}
                />
              </g>
            </g>
          ))}
        </g>
        <circle cx="250" cy="250" r="134" fill="none" stroke="#685038" strokeWidth="1.5" />

        {/* RING 3: Human Life & Festive Rice Pounding (r=104-130) */}
        <g
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredRing('festive-life')}
          onMouseLeave={() => setHoveredRing(null)}
          onClick={() => handleRingClick('festive-life')}
        >
          <circle
            cx="250"
            cy="250"
            r="118"
            fill="none"
            stroke={hoveredRing === 'festive-life' || selectedMotifId === 'festive-life' ? '#fde047' : '#c59b27'}
            strokeWidth={hoveredRing === 'festive-life' || selectedMotifId === 'festive-life' ? '24' : '2'}
            strokeOpacity={hoveredRing === 'festive-life' || selectedMotifId === 'festive-life' ? '0.25' : '0.15'}
          />
          {/* Human figures in costume with feathered headdress & pestles */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8 + 10;
            return (
              <g key={`human-${i}`} transform={`rotate(${angle} 250 250) translate(250, ${250 - 118}) scale(0.75)`}>
                {/* Person with feather headdress */}
                <circle cx="0" cy="-6" r="3" fill="#ffeaa7" />
                <path d="M0,-9 L4,-15 L0,-12 L-4,-15 Z" fill="#ffd866" />
                <line x1="0" y1="-3" x2="0" y2="8" stroke="#dfb743" strokeWidth="2" />
                <line x1="-5" y1="2" x2="5" y2="2" stroke="#dfb743" strokeWidth="1.5" />
                <line x1="0" y1="8" x2="-4" y2="15" stroke="#dfb743" strokeWidth="1.5" />
                <line x1="0" y1="8" x2="4" y2="15" stroke="#dfb743" strokeWidth="1.5" />
                {/* Double pestle mortar */}
                <rect x="7" y="5" width="6" height="8" rx="1" fill="#c59b27" />
                <line x1="9" y1="-2" x2="11" y2="14" stroke="#ffeaa7" strokeWidth="1.5" />
              </g>
            );
          })}
        </g>
        <circle cx="250" cy="250" r="102" fill="none" stroke="#685038" strokeWidth="1.5" />

        {/* RING 2: Geometric Tangent & Sawtooth (r=78-98) */}
        <circle cx="250" cy="250" r="92" fill="none" stroke="#c59b27" strokeWidth="3" strokeDasharray="2 4" opacity="0.7" />
        <circle cx="250" cy="250" r="82" fill="none" stroke="#54412f" strokeWidth="1.5" />

        {/* RING 1: Central Sun (14-Pointed Star) (r=0-78) */}
        <g
          className="cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredRing('sun-star')}
          onMouseLeave={() => setHoveredRing(null)}
          onClick={() => handleRingClick('sun-star')}
        >
          {/* Glowing central core */}
          <circle
            cx="250"
            cy="250"
            r="72"
            fill="none"
            stroke={hoveredRing === 'sun-star' || selectedMotifId === 'sun-star' ? '#fde047' : '#c59b27'}
            strokeWidth="3"
            strokeOpacity={hoveredRing === 'sun-star' || selectedMotifId === 'sun-star' ? '0.8' : '0.3'}
          />
          {/* Star polygon with 14 points */}
          <polygon
            points={starPoints}
            fill="url(#bronzeGold)"
            stroke="#ffe699"
            strokeWidth="1.5"
            filter={hoveredRing === 'sun-star' || selectedMotifId === 'sun-star' ? 'url(#glowGold)' : undefined}
            className="transition-all duration-300"
          />
          {/* Inner solar circle */}
          <circle cx="250" cy="250" r="22" fill="#201811" stroke="#dfb743" strokeWidth="2" />
          <circle cx="250" cy="250" r="12" fill="url(#bronzeGold)" />
          <circle cx="250" cy="250" r="4" fill="#ffffff" opacity="0.85" />
        </g>

        {/* Outer subtle concentric decorative dots */}
        <circle cx="250" cy="250" r="248" fill="none" stroke="#876316" strokeWidth="1" strokeDasharray="1 5" />
      </svg>

      {/* Interactive Tooltip & Badge Indicator */}
      {interactive && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1611] border border-[#483726] text-[#dfb743]">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            Chạm vào từng vành trống để giải mã hoa văn
          </span>
          {hoveredRing && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#c59b27]/20 border border-[#c59b27]/50 text-[#fff2cc] animate-pulse">
              <Eye className="w-3.5 h-3.5" />
              Đang chọn: {
                hoveredRing === 'sun-star' ? 'Mặt trời 14 tia' :
                hoveredRing === 'lac-birds' ? 'Đàn chim Lạc' :
                hoveredRing === 'festive-life' ? 'Cảnh giã gạo & Lễ hội' :
                hoveredRing === 'deer-pattern' ? 'Bầy hươu' : 'Vòng tròn tiếp tuyến'
              }
            </span>
          )}
        </div>
      )}
    </div>
  );
};
