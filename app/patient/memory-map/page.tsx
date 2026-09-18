'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Sparkles, Heart, Compass, Volume2, ArrowLeft, X, Users, ImageIcon, Plus, Image as ImageIcon2 } from 'lucide-react';
import { VoiceService } from '@/lib/voice/voice-service';
import { motion, AnimatePresence } from 'framer-motion';

// Mock images using Unsplash Placeholders
const MOCK_IMAGES = {
  home: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
  family: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
  bihu: 'https://images.unsplash.com/photo-1604928141064-207cea6f5722?auto=format&fit=crop&q=80&w=800',
  park: 'https://images.unsplash.com/photo-1501862700950-18382cd41497?auto=format&fit=crop&q=80&w=800',
  loom: 'https://images.unsplash.com/photo-1605814571994-555e0946c1a8?auto=format&fit=crop&q=80&w=800'
};

const initialNodes = [
  {
    id: 'node-home',
    title: 'Tarajan Ancestral Home',
    icon: '🏡',
    category: 'Childhood & Home',
    description: 'The green Assam-type home in Jorhat with a spacious veranda and betel nut trees.',
    story: 'Anima spent her early childhood here listening to All India Radio and weaving on the loom.',
    audioPrompt: 'The soothing sound of rain falling on the tin roof in Jorhat.',
    image: MOCK_IMAGES.home,
    memoriesCount: 12,
    people: ['Ma', 'Deuta', 'Brother'],
    gallery: [MOCK_IMAGES.home, MOCK_IMAGES.family, MOCK_IMAGES.loom]
  },
  {
    id: 'node-cafe',
    title: 'Favorite Café',
    icon: '☕',
    category: 'Daily Routine',
    description: 'The small tea stall corner near the old market.',
    story: 'Having ginger tea and freshly made pitha every Sunday morning.',
    audioPrompt: 'Good morning Ma! Remember to drink your warm ginger tea.',
    image: MOCK_IMAGES.family,
    memoriesCount: 8,
    people: ['Ananya', 'Niloy'],
    gallery: [MOCK_IMAGES.family, MOCK_IMAGES.bihu, MOCK_IMAGES.home]
  },
  {
    id: 'node-school',
    title: 'Jorhat Primary School',
    icon: '🏫',
    category: 'Early Life',
    description: 'The red brick school building where Anima studied and taught.',
    story: 'Walking to school with friends, carrying books wrapped in newspaper.',
    audioPrompt: 'The school bell ringing in the distance.',
    image: MOCK_IMAGES.bihu,
    memoriesCount: 15,
    people: ['Mrs. Barua', 'School Friends'],
    gallery: [MOCK_IMAGES.bihu, MOCK_IMAGES.park]
  },
  {
    id: 'node-park',
    title: 'Kaziranga Orchid Garden',
    icon: '🌳',
    category: 'Places & Nature',
    description: 'Misty morning forest trails surrounded by tea bushes and wild orchids.',
    story: 'Pranab and Anima took the morning safari jeep and watched rhinos near the riverbank.',
    audioPrompt: 'Melodic morning birds chirping across emerald tea gardens.',
    image: MOCK_IMAGES.park,
    memoriesCount: 20,
    people: ['Pranab', 'Ananya'],
    gallery: [MOCK_IMAGES.park, MOCK_IMAGES.family, MOCK_IMAGES.home, MOCK_IMAGES.bihu]
  }
];

export default function MemoryMapPage() {
  const [memoryNodes, setMemoryNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState<typeof initialNodes[0] | null>(initialNodes[0]);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Responsive check
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelectNode = (node: typeof initialNodes[0]) => {
    setSelectedNode(node);
    if (isMobile) {
      setIsMobilePanelOpen(true);
    }
    VoiceService.speak(`${node.title}. ${node.description}`, 'en-IN');
  };

  const closeMobilePanel = () => {
    setIsMobilePanelOpen(false);
  };

  const handleAddMemory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Handle Image Upload Locally
    const file = formData.get('imageFile') as File;
    let imageUrl = MOCK_IMAGES.home; // Fallback
    if (file && file.size > 0) {
      imageUrl = URL.createObjectURL(file);
    }

    const newNode = {
      id: `node-${Date.now()}`,
      title: formData.get('title') as string,
      icon: (formData.get('icon') as string) || '✨',
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      story: formData.get('story') as string,
      audioPrompt: 'New memory added.',
      image: imageUrl,
      memoriesCount: 1,
      people: (formData.get('people') as string).split(',').map(p => p.trim()).filter(Boolean),
      gallery: [imageUrl]
    };

    setMemoryNodes([...memoryNodes, newNode]);
    setIsAddModalOpen(false);
    
    // Auto-select the new node
    setSelectedNode(newNode);
    if (isMobile) setIsMobilePanelOpen(true);
  };

  const DetailContent = ({ node }: { node: typeof initialNodes[0] }) => (
    <div className="space-y-6 flex flex-col h-full overflow-y-auto pb-6 custom-scrollbar pr-2">
      {/* Main Image */}
      <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden shrink-0">
        <img src={node.image} alt={node.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266] bg-[#EBF2EC] px-3 py-1 rounded-full shadow-sm">
            {node.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-3xl shadow-sm">
          {node.icon}
        </div>
      </div>

      <div className="space-y-4 px-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
          {node.title}
        </h2>

        <p className="text-base text-[#59655D] leading-relaxed">
          {node.description}
        </p>
        
        {/* Associated People */}
        {node.people && node.people.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center text-sm text-[#59655D]">
            <Users className="w-4 h-4 text-[#849188]" />
            <span className="font-medium mr-1">With:</span>
            {node.people.map((person, idx) => (
              <span key={idx} className="bg-[#FAF7F2] border border-[#E0D8CC] px-2.5 py-1 rounded-lg text-xs font-semibold">
                {person}
              </span>
            ))}
          </div>
        )}

        {/* Storybook Excerpt */}
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#E78C56] uppercase tracking-wide">
              Verified Family Story
            </span>
            <button
              onClick={() => VoiceService.speak(node.story, 'en-IN')}
              className="p-2 rounded-full bg-[#F3EEF3] text-[#5D4A5D] hover:bg-[#E9DFE9] transition-colors"
              title="Read Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-[#2C332D] leading-relaxed italic">
            "{node.story}"
          </p>
        </div>

        {/* Audio Prompt Cue */}
        <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] flex items-center gap-3 text-xs text-[#B85D43] font-medium">
          <Volume2 className="w-5 h-5 shrink-0" />
          <span>{node.audioPrompt}</span>
        </div>

        {/* Photo Gallery Grid */}
        {node.gallery && node.gallery.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2C332D]">
              <ImageIcon className="w-4 h-4 text-[#849188]" />
              <h3>Memory Gallery ({node.gallery.length})</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {node.gallery.map((imgUrl, idx) => (
                <div key={idx} className="h-24 sm:h-32 rounded-xl overflow-hidden bg-gray-100 border border-[#E0D8CC]">
                  <img src={imgUrl} alt="Memory gallery item" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 relative">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8E778E]">
            <span>Visual Reminiscence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Anima’s Life Memory Map
          </h1>
          <p className="text-sm text-[#59655D]">
            Trace the journey of your favorite places and unlock warm memories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#5B8266] text-white font-bold text-sm hover:bg-[#4D7056] transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Memory</span>
          </button>
          
          <button
            onClick={() => selectedNode && VoiceService.speak(selectedNode.story, 'en-IN')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F3EEF3] text-[#5D4A5D] font-bold text-sm hover:bg-[#E9DFE9] cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span className="hidden sm:inline">Listen</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Map Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Nodes Column - Vertical Timeline */}
        <div className="md:col-span-2 relative py-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#849188] px-2 mb-6">
            Your Life Journey
          </h3>
          
          <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-1 before:bg-[#E8E0D5] before:rounded-full">
            {memoryNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              
              return (
                <div key={node.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[27px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center transition-colors z-10 ${isSelected ? 'bg-[#E78C56]' : 'bg-[#C5D0C9]'}`} />
                  
                  <button
                    onClick={() => handleSelectNode(node)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? 'bg-white border-[#5B8266] shadow-md ring-2 ring-[#5B8266]/20 scale-[1.02]'
                        : 'bg-white/60 border-[#E0D8CC] text-[#2C332D] hover:bg-white hover:border-[#C5D0C9]'
                    }`}
                  >
                    <div className="text-4xl shrink-0 p-2 bg-[#FAF7F2] rounded-xl">{node.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-[#2C332D] leading-tight mb-1">{node.title}</div>
                      <div className="text-xs text-[#59655D] line-clamp-1 mb-2">{node.description}</div>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#849188] bg-[#FAF7F2] inline-flex px-2 py-1 rounded-md border border-[#E8E0D5]">
                        <Heart className="w-3 h-3 text-[#E78C56]" />
                        <span>{node.memoriesCount} Memories</span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Detail Card */}
        <div className="hidden md:block md:col-span-3">
          {selectedNode && (
            <GlassCard variant="elevated" className="p-6 h-[800px] sticky top-6">
              <DetailContent node={selectedNode} />
            </GlassCard>
          )}
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobile && isMobilePanelOpen && selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 bg-white border-b border-[#E0D8CC] shadow-sm shrink-0 z-10 sticky top-0">
              <h2 className="font-bold text-lg text-[#2C332D] flex items-center gap-2">
                <span>{selectedNode.icon}</span> {selectedNode.title}
              </h2>
              <button 
                onClick={closeMobilePanel}
                className="p-2 bg-[#F3EEF3] rounded-full text-[#5D4A5D]"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 pb-20">
              <DetailContent node={selectedNode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Memory Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setIsAddModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl shadow-xl overflow-hidden border border-[#E0D8CC] max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#E8E0D5] bg-white">
                <h2 className="font-bold text-xl text-[#2C332D] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E78C56]" />
                  Add a New Memory
                </h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-[#59655D]" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <form id="addMemoryForm" onSubmit={handleAddMemory} className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2C332D]">Place Name / Title</label>
                    <input required name="title" type="text" placeholder="e.g. Darjeeling Tea Estate" className="w-full p-3 rounded-xl border border-[#E0D8CC] bg-white text-sm outline-none focus:border-[#5B8266]" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#2C332D]">Category</label>
                      <input required name="category" type="text" placeholder="e.g. Travel" className="w-full p-3 rounded-xl border border-[#E0D8CC] bg-white text-sm outline-none focus:border-[#5B8266]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-[#2C332D]">Emoji Icon</label>
                      <input name="icon" type="text" placeholder="e.g. ⛰️" defaultValue="✨" className="w-full p-3 rounded-xl border border-[#E0D8CC] bg-white text-sm outline-none focus:border-[#5B8266]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2C332D]">Main Photo</label>
                    <div className="flex items-center gap-3 w-full p-3 rounded-xl border border-[#E0D8CC] bg-white cursor-pointer relative overflow-hidden group">
                       <ImageIcon2 className="w-5 h-5 text-[#849188]" />
                       <span className="text-sm text-[#59655D]">Choose an image file...</span>
                       <input required name="imageFile" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2C332D]">Short Description</label>
                    <input required name="description" type="text" placeholder="A brief sentence about this place." className="w-full p-3 rounded-xl border border-[#E0D8CC] bg-white text-sm outline-none focus:border-[#5B8266]" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2C332D]">Associated People</label>
                    <input name="people" type="text" placeholder="Comma separated (e.g. Rahul, Priya)" className="w-full p-3 rounded-xl border border-[#E0D8CC] bg-white text-sm outline-none focus:border-[#5B8266]" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#2C332D]">The Verified Story / Memory</label>
                    <textarea required name="story" rows={3} placeholder="The full memory that will be read aloud by the AI..." className="w-full p-3 rounded-xl border border-[#E0D8CC] bg-white text-sm outline-none focus:border-[#5B8266] resize-none"></textarea>
                  </div>

                </form>
              </div>

              <div className="p-5 border-t border-[#E8E0D5] bg-white flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-[#59655D] hover:bg-gray-100">
                  Cancel
                </button>
                <button type="submit" form="addMemoryForm" className="px-5 py-2.5 rounded-xl bg-[#E78C56] text-white font-bold text-sm hover:bg-[#D77C46] shadow-sm">
                  Save Memory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
