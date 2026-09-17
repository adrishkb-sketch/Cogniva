'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Sparkles, Heart, Compass, Volume2, ArrowLeft } from 'lucide-react';
import { VoiceService } from '@/lib/voice/voice-service';

export default function MemoryMapPage() {
  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    icon: string;
    category: string;
    description: string;
    story: string;
    audioPrompt: string;
  } | null>({
    title: 'Tarajan Ancestral Home',
    icon: '🏡',
    category: 'Childhood & Home',
    description: 'The green Assam-type home in Jorhat with a spacious veranda and betel nut trees.',
    story: 'Anima spent her early childhood here listening to All India Radio and helping her mother weave on the handloom.',
    audioPrompt: 'The soothing sound of rain falling on the tin roof of the Tarajan house.'
  });

  const nodes = [
    {
      id: 'node-home',
      title: 'Tarajan Ancestral Home',
      icon: '🏡',
      category: 'Childhood & Home',
      description: 'The green Assam-type home in Jorhat with a spacious veranda and betel nut trees.',
      story: 'Anima spent her early childhood here listening to All India Radio and weaving on the loom.',
      audioPrompt: 'The soothing sound of rain falling on the tin roof in Jorhat.'
    },
    {
      id: 'node-family',
      title: 'Daughter Ananya & Niloy',
      icon: '👩‍⚕️',
      category: 'Family & Love',
      description: 'Ananya (Daughter) and young Niloy (Grandson) who waters the orchids.',
      story: 'Ananya was born in Dibrugarh and now visits every day after her hospital rounds.',
      audioPrompt: 'Good morning Ma! Remember to drink your warm ginger tea.'
    },
    {
      id: 'node-bihu',
      title: 'Rongali Bihu Gathering',
      icon: '🌸',
      category: 'Festivals & Music',
      description: 'The April spring celebration with Kopou orchids, Pepa horn rhythms, and fresh pitha.',
      story: 'The entire family prepared narikol laru and young Ananya wore her first muga silk mekhala sador.',
      audioPrompt: 'Buffalo horn pepa melody resonating in the spring courtyard.'
    },
    {
      id: 'node-kaziranga',
      title: 'Kaziranga Orchid Garden',
      icon: '🌳',
      category: 'Places & Nature',
      description: 'Misty morning forest trails surrounded by tea bushes and wild orchids.',
      story: 'Pranab and Anima took the morning safari jeep and watched rhinos near the riverbank.',
      audioPrompt: 'Melodic morning birds chirping across emerald tea gardens.'
    },
    {
      id: 'node-loom',
      title: 'Handloom & Gamosa',
      icon: '🧣',
      category: 'Craft & Heritage',
      description: 'The wooden weaving loom in the back corridor where Anima crafted red floral Gamosas.',
      story: 'Weaving each thread with love for family elders during Bihu blessings.',
      audioPrompt: 'The gentle wooden click-clack rhythm of the traditional loom.'
    }
  ];

  const handleSelectNode = (node: typeof nodes[0]) => {
    setSelectedNode(node);
    VoiceService.speak(`${node.title}. ${node.description}`, 'en-IN');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
            Tap on any branch of your life to open photographs and warm memories.
          </p>
        </div>

        <button
          onClick={() => selectedNode && VoiceService.speak(selectedNode.story, 'en-IN')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F3EEF3] text-[#5D4A5D] font-bold text-sm hover:bg-[#E9DFE9] cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Listen to Story</span>
        </button>
      </div>

      {/* Interactive Visual Map Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nodes Column */}
        <div className="space-y-3 md:col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#849188] px-1">
            Life Branches
          </h3>
          <div className="space-y-2">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  selectedNode?.title === node.title
                    ? 'bg-[#5B8266] text-white border-[#3E5C46] shadow-md scale-102'
                    : 'bg-white border-[#E0D8CC] text-[#2C332D] hover:bg-[#FAF7F2]'
                }`}
              >
                <span className="text-3xl">{node.icon}</span>
                <div>
                  <div className="font-bold text-sm leading-tight">{node.title}</div>
                  <div className={`text-xs ${selectedNode?.title === node.title ? 'text-white/80' : 'text-[#849188]'}`}>
                    {node.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Scrapbook Detail Card */}
        {selectedNode && (
          <GlassCard variant="elevated" className="md:col-span-2 p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266] bg-[#EBF2EC] px-3 py-1 rounded-full">
                  {selectedNode.category}
                </span>
                <span className="text-4xl">{selectedNode.icon}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
                {selectedNode.title}
              </h2>

              <p className="text-base text-[#59655D] leading-relaxed">
                {selectedNode.description}
              </p>

              {/* Storybook Excerpt */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] space-y-2">
                <span className="text-xs font-bold text-[#E78C56] uppercase tracking-wide">
                  Verified Family Story
                </span>
                <p className="text-sm text-[#2C332D] leading-relaxed italic">
                  "{selectedNode.story}"
                </p>
              </div>

              {/* Audio Prompt Cue */}
              <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] flex items-center gap-3 text-xs text-[#B85D43] font-medium">
                <Volume2 className="w-5 h-5 shrink-0" />
                <span>{selectedNode.audioPrompt}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E0D5] flex items-center justify-between">
              <span className="text-xs text-[#849188]">Caregiver Verified Record</span>
              <button
                onClick={() => VoiceService.speak(selectedNode.story, 'en-IN')}
                className="px-4 py-2 rounded-xl bg-[#5B8266] text-white text-xs font-bold hover:bg-[#4D7056]"
              >
                Read Aloud
              </button>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
