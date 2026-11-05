import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CollectionPage } from './components/CollectionPage';
import { ArtifactDetailModal } from './components/ArtifactDetailModal';
import { AiScholarChat } from './components/AiScholarChat';
import { DocumentaryArchives } from './components/DocumentaryArchives';
import { AboutMuseum } from './components/AboutMuseum';
import { Artifact, ArtifactCategory } from './types/museum';
import { AlertCircle } from 'lucide-react';
import { SAMPLE_DATA_BADGE_TEXT } from './data/museumData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');
  const [initialCollectionCategory, setInitialCollectionCategory] = useState<ArtifactCategory>('all');

  const handleNavigate = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtifact = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
  };

  const handleCloseModal = () => {
    setSelectedArtifact(null);
  };

  const handleAskAiWithQuery = (query: string) => {
    setAiInitialQuery(query);
    setCurrentTab('ai-chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#e5ded5] flex flex-col selection:bg-[#c59b27] selection:text-black">
      {/* Topmost System Transparency Notice */}
      <div className="bg-[#19120b] border-b border-[#2e2114] px-4 py-1.5 text-center text-[11px] text-[#baa998] flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-bold text-[#dfb743]">
          <AlertCircle className="w-3.5 h-3.5 text-[#e5c158]" />
          {SAMPLE_DATA_BADGE_TEXT}:
        </span>
        <span className="hidden sm:inline">
          Dữ liệu mẫu số hóa chuẩn hóa theo định dạng bảo tàng học • Chờ đối chiếu chéo từ CSDL Bảo vật Quốc gia.
        </span>
        <span className="sm:hidden">Dữ liệu mẫu chuẩn hóa phục vụ số hóa di sản.</span>
      </div>

      {/* Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
      />

      {/* Dynamic Main Body Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectArtifact={handleSelectArtifact}
            onAskAiWithQuery={handleAskAiWithQuery}
          />
        )}

        {currentTab === 'collection' && (
          <CollectionPage
            onSelectArtifact={handleSelectArtifact}
            initialCategory={initialCollectionCategory}
          />
        )}

        {currentTab === 'ai-chat' && (
          <AiScholarChat
            initialPrompt={aiInitialQuery}
            onClearInitialPrompt={() => setAiInitialQuery('')}
          />
        )}

        {currentTab === 'archives' && <DocumentaryArchives />}

        {currentTab === 'about' && <AboutMuseum />}
      </main>

      {/* Global Artifact Detail Modal */}
      {selectedArtifact && (
        <ArtifactDetailModal
          artifact={selectedArtifact}
          onClose={handleCloseModal}
          onAskAi={(question) => {
            handleCloseModal();
            handleAskAiWithQuery(question);
          }}
        />
      )}

      {/* Museum Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
