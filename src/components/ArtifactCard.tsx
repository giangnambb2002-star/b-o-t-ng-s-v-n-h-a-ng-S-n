import React from 'react';
import { Artifact } from '../types/museum';
import { Award, Eye, Calendar, MapPin, AlertCircle, ArrowUpRight } from 'lucide-react';
import { SAMPLE_DATA_BADGE_TEXT } from '../data/museumData';

interface ArtifactCardProps {
  artifact: Artifact;
  onSelect: (artifact: Artifact) => void;
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(artifact)}
      className="group relative flex flex-col rounded-2xl bg-[#14100b] border border-[#382b1c] hover:border-[#c59b27] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#c59b27]/15 cursor-pointer hover:-translate-y-1"
    >
      {/* Top Banner: Sample Data Warning Tag */}
      <div className="bg-[#241a10] border-b border-[#3d2e1c] px-3.5 py-1.5 flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1 text-[#dfb743] font-semibold tracking-wide">
          <AlertCircle className="w-3.5 h-3.5 text-[#e5c158]" />
          {SAMPLE_DATA_BADGE_TEXT}
        </span>
        <span className="text-[#8c7a68] font-mono text-[10px]">{artifact.catalogNumber}</span>
      </div>

      {/* Image Showcase */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0806]">
        <img
          src={artifact.imageUrl}
          alt={artifact.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100b] via-transparent to-transparent opacity-90" />

        {/* National Treasure Badge */}
        {artifact.isNationalTreasure && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c59b27] text-[#120d08] text-xs font-bold shadow-lg">
            <Award className="w-3.5 h-3.5" />
            <span>Bảo vật Quốc gia</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#18130d]/90 backdrop-blur-md border border-[#483726] text-[#dfb743] text-xs font-medium">
          {artifact.categoryLabel}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-bold text-[#fbf6ee] group-hover:text-[#ffd866] transition-colors line-clamp-1">
          {artifact.name}
        </h3>
        <p className="text-xs text-[#9d8c7c] italic line-clamp-1">{artifact.englishName}</p>

        <p className="mt-3 text-xs text-[#c4b6a5] leading-relaxed line-clamp-2">
          {artifact.shortDescription}
        </p>

        {/* Meta Specs */}
        <div className="mt-4 pt-3 border-t border-[#261d13] grid grid-cols-2 gap-2 text-[11px] text-[#9d8c7c]">
          <div className="flex items-center gap-1 truncate">
            <Calendar className="w-3 h-3 text-[#c59b27] shrink-0" />
            <span className="truncate">{artifact.estimatedCentury}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 text-[#c59b27] shrink-0" />
            <span className="truncate">{artifact.discovery.location.split(',').pop()?.trim()}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-[#241a10] flex items-center justify-between text-xs font-medium text-[#dfb743] group-hover:text-[#fff2cc]">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Xem chi tiết khảo cứu
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
