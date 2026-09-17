'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { OfflineStorageManager } from '@/lib/storage/indexed-db';
import { VoiceService } from '@/lib/voice/voice-service';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Wifi, 
  WifiOff, 
  Volume2, 
  CheckCircle2, 
  Radio, 
  Heart, 
  Play,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GuidedDemoPage() {
  const [demoStep, setDemoStep] = useState(1);
  const totalDemoSteps = 14;
  const [isOfflineSim, setIsOfflineSim] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'offline' | 'syncing' | 'synced'>('synced');

  const steps = [
    {
      num: 1,
      title: 'Meet Anima Das (72, Assam)',
      subtitle: 'Patient Profile & Cultural Context',
      desc: 'Anima lives in Dibrugarh, Assam in a low-connectivity region. Her caregiver daughter, Ananya, created her Cogniva profile grounded in her Assamese language, family members, ancestral Jorhat home, and daily morning tea routine.',
      previewType: 'profile'
    },
    {
      num: 2,
      title: 'Personal Memory Vault',
      subtitle: 'Verified Grounding (Daughter, Home, Heirlooms)',
      desc: 'Cogniva establishes a personal memory database verified by family. It holds photos of Ananya (Daughter) and Niloy (Grandson), alongside heirlooms like the handwoven Bihu Gamosa and Sarthebari brass tea cup.',
      previewType: 'memories'
    },
    {
      num: 3,
      title: 'Generate Memory Journey',
      subtitle: 'Multi-Sensory Reminiscence Sequence',
      desc: 'Instead of generic quiz questions, Cogniva generates a sequence: Recognition → Recall → Association → Conversation → Story. Anima remembers her courtyard gatherings with Kopou orchids.',
      previewType: 'journey'
    },
    {
      num: 4,
      title: 'Life Sim — Morning Routine',
      subtitle: 'Practicing Real-Life Daily Living',
      desc: 'Anima enters Life Sim to make morning ginger tea. Step 1: Kettle, Step 2: Assam tea leaves, Step 3: Ginger, Step 4: Bell-metal cup. The system provides supportive cues with zero failure or shame.',
      previewType: 'lifesim'
    },
    {
      num: 5,
      title: 'Live Observational Metrics',
      subtitle: 'Measuring Latency, Retries, and Assistance',
      desc: 'During the session, Cogniva quietly records response latency (ms), step hesitation, sequence order attempts, and hint requests. These are stored locally as functional observations.',
      previewType: 'metrics'
    },
    {
      num: 6,
      title: 'Personal Baseline Establishment',
      subtitle: '14 Recorded Longitudinal Sessions',
      desc: 'Cogniva establishes a statistical baseline over 14 sessions unique to Anima. We never compare Anima to arbitrary population averages or other patients.',
      previewType: 'baseline'
    },
    {
      num: 7,
      title: 'Cognitive Activity Profile',
      subtitle: 'Digital Twin of Functional Interaction',
      desc: 'The Caregiver views Anima’s 6 functional dimensions: Recognition (84%), Attention (79%), Episodic Recall (71%), Sequencing (62%), Routine (68%), Planning (64%).',
      previewType: 'twin'
    },
    {
      num: 8,
      title: 'Cognitive Change Radar',
      subtitle: 'Detecting Latency Shifts from Baseline',
      desc: 'Radar flags: "Sequencing activities have taken longer than usual (+20.5% latency) during the last 6 sessions." Pacing is automatically adjusted to 2-step sequences.',
      previewType: 'radar'
    },
    {
      num: 9,
      title: 'Simulate Offline Mode (Wi-Fi Cut)',
      subtitle: '100% Offline-First Patient Assistance',
      desc: 'In rural or low-connectivity areas, internet drops frequently. Cut the connection now. Life Sim, Memories, Routine, and Garden continue operating completely offline via local storage.',
      previewType: 'offline_toggle'
    },
    {
      num: 10,
      title: 'Reconnection & Offline Sync Queue',
      subtitle: 'Seamless Background Synchronization',
      desc: 'Turn Wi-Fi back on. Watch Cogniva transition from "3 activities waiting to sync" → "Syncing data..." → "All Activities Synced" with zero data loss.',
      previewType: 'sync_queue'
    },
    {
      num: 11,
      title: 'Ask Cogniva AI Copilot',
      subtitle: 'Grounded Caregiver Intelligence',
      desc: 'Ananya asks: "How has Anima been doing this week?" Copilot analyzes the real session database and explains the sequencing shift while respecting strict medical safety boundaries.',
      previewType: 'copilot'
    },
    {
      num: 12,
      title: 'Family Voice Reminders',
      subtitle: 'Consensual Recorded Audio Prompts',
      desc: 'Play Ananya’s warm recorded message: "Good morning Ma! Your warm tea is ready on the side table." Consensual family voice keeps Anima calm and oriented throughout the day.',
      previewType: 'voice'
    },
    {
      num: 13,
      title: 'Visual Memory Map',
      subtitle: 'Interactive Scrapbook Branches',
      desc: 'Anima explores her life branches: Tarajan Home, Rongali Bihu, Kaziranga forest, and the wooden weaving loom in Jorhat.',
      previewType: 'map'
    },
    {
      num: 14,
      title: 'Life Storybook & Grand Conclusion',
      subtitle: 'The Core Human Mission',
      desc: 'Anima’s memories, family voices, and daily steps form a living digital archive. “Cogniva doesn’t ask a patient to adapt to technology. Cogniva adapts technology to the person.”',
      previewType: 'storybook'
    }
  ];

  const currentStep = steps[demoStep - 1];

  const handleNext = () => {
    if (demoStep < totalDemoSteps) {
      setDemoStep(demoStep + 1);
    } else {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
    }
  };

  const handlePrev = () => {
    if (demoStep > 1) {
      setDemoStep(demoStep - 1);
    }
  };

  const triggerOfflineCut = () => {
    setIsOfflineSim(true);
    OfflineStorageManager.setSimulatedOffline(true);
    setSyncStatus('offline');
  };

  const triggerReconnection = async () => {
    setIsOfflineSim(false);
    OfflineStorageManager.setSimulatedOffline(false);
    setSyncStatus('syncing');
    await OfflineStorageManager.syncPendingQueue();
    setSyncStatus('synced');
  };

  const playVoiceNarration = (text: string) => {
    VoiceService.speak(text, 'en-IN');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-8">
      {/* Demo Stepper Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            <Sparkles className="w-4 h-4 text-[#E78C56]" />
            <span>Interactive 5-Minute Guided Presentation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Step {currentStep.num} of {totalDemoSteps}: {currentStep.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#59655D] font-medium">
            {currentStep.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDemoStep(1)}
            className="p-2.5 rounded-xl bg-white border border-[#E0D8CC] text-xs font-bold text-[#59655D] hover:bg-[#FAF7F2] flex items-center gap-1 cursor-pointer"
            title="Restart Presentation"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={demoStep === 1}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#E0D8CC] text-xs font-bold text-[#59655D] disabled:opacity-30 cursor-pointer"
          >
            Previous
          </button>

          <GlassButton
            variant="primary"
            onClick={handleNext}
            className="text-xs px-5 py-2.5 gap-1.5"
          >
            <span>{demoStep === totalDemoSteps ? 'Finish Demo' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </GlassButton>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <GlassCard variant="elevated" className="p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#2C332D]">{currentStep.title}</h3>
          <p className="text-sm sm:text-base text-[#59655D] leading-relaxed">
            {currentStep.desc}
          </p>
        </div>

        {/* Step-Specific Interactive Simulation Previews */}
        <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E0D8CC] min-h-[260px] flex items-center justify-center">
          {/* 1. Profile */}
          {currentStep.previewType === 'profile' && (
            <div className="text-center space-y-3">
              <div className="text-6xl">👵</div>
              <h4 className="text-2xl font-bold text-[#2C332D]">Anima Das, 72</h4>
              <p className="text-xs text-[#59655D]">Assam • Native Language: Assamese • Caregiver: Ananya Das (Daughter)</p>
              <div className="inline-flex gap-2 text-xs font-semibold text-[#5B8266] bg-[#EBF2EC] px-3 py-1 rounded-full">
                <span>🌸 Assam & Brahmaputra Valley Cultural Pack Active</span>
              </div>
            </div>
          )}

          {/* 2. Memories */}
          {currentStep.previewType === 'memories' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-center text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8CC] space-y-1">
                <span className="text-4xl">👩‍⚕️</span>
                <div className="font-bold text-sm text-[#2C332D]">Ananya Das</div>
                <div className="text-[#5B8266] font-semibold">Daughter (Verified)</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8CC] space-y-1">
                <span className="text-4xl">🏡</span>
                <div className="font-bold text-sm text-[#2C332D]">Jorhat Home</div>
                <div className="text-[#8E778E] font-semibold">Tarajan Veranda</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8CC] space-y-1">
                <span className="text-4xl">🧣</span>
                <div className="font-bold text-sm text-[#2C332D]">Handloom Gamosa</div>
                <div className="text-[#E78C56] font-semibold">Bihu Tradition</div>
              </div>
            </div>
          )}

          {/* 3. Journey */}
          {currentStep.previewType === 'journey' && (
            <div className="text-center space-y-3 max-w-md">
              <span className="text-5xl">🌸</span>
              <h4 className="text-lg font-bold text-[#2C332D]">Rongali Bihu Courtyard Gathering</h4>
              <p className="text-xs text-[#59655D]">"Who wore her first muga silk mekhala sador during the spring courtyard feast?"</p>
              <div className="p-3 bg-[#EBF2EC] rounded-xl text-xs font-semibold text-[#3F5E47]">
                Answer: Young daughter Ananya with fresh narikol laru sweets.
              </div>
            </div>
          )}

          {/* 4. Life Sim */}
          {currentStep.previewType === 'lifesim' && (
            <div className="text-center space-y-4 max-w-md">
              <div className="text-5xl">🫖</div>
              <h4 className="text-xl font-bold text-[#2C332D]">Making Morning Assam Tea</h4>
              <div className="flex justify-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#5B8266] font-bold text-xs text-[#5B8266]">1. Kettle ✓</span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#5B8266] font-bold text-xs text-[#5B8266]">2. Tea Leaves ✓</span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#5B8266] font-bold text-xs text-[#5B8266]">3. Fresh Ginger ✓</span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#5B8266] font-bold text-xs text-[#5B8266]">4. Brass Cup ✓</span>
              </div>
              <p className="text-xs text-[#5B8266] font-semibold">“Take your time. Your tea is ready to enjoy on the veranda.”</p>
            </div>
          )}

          {/* 5. Metrics */}
          {currentStep.previewType === 'metrics' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#E0D8CC]">
                <div className="text-lg font-bold text-[#5B8266]">100%</div>
                <div className="text-[#849188]">Accuracy</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E0D8CC]">
                <div className="text-lg font-bold text-[#2C332D]">4,200 ms</div>
                <div className="text-[#849188]">Avg Latency</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E0D8CC]">
                <div className="text-lg font-bold text-[#2C332D]">0</div>
                <div className="text-[#849188]">Sequence Errors</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E0D8CC]">
                <div className="text-lg font-bold text-[#5B8266]">0</div>
                <div className="text-[#849188]">Hints Needed</div>
              </div>
            </div>
          )}

          {/* 6. Baseline */}
          {currentStep.previewType === 'baseline' && (
            <div className="text-center space-y-2">
              <div className="text-4xl">📊</div>
              <h4 className="text-lg font-bold text-[#2C332D]">14-Session Personal Baseline Curve</h4>
              <p className="text-xs text-[#59655D]">Baseline mean: 78% • Standard deviation: 4.2 • High statistical stability</p>
            </div>
          )}

          {/* 7. Twin */}
          {currentStep.previewType === 'twin' && (
            <div className="flex flex-wrap justify-center gap-6">
              <ProgressRing value={84} size={90} color="#5B8266" sublabel="Recognition" />
              <ProgressRing value={79} size={90} color="#8E778E" sublabel="Attention" />
              <ProgressRing value={71} size={90} color="#E78C56" sublabel="Recall" />
              <ProgressRing value={62} size={90} color="#D9654B" sublabel="Sequencing" />
            </div>
          )}

          {/* 8. Radar */}
          {currentStep.previewType === 'radar' && (
            <div className="p-5 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] space-y-2 text-center max-w-lg">
              <div className="flex items-center justify-center gap-2 text-[#D9654B] font-bold text-xs uppercase">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Noticeable Change from Baseline</span>
              </div>
              <h4 className="text-base font-bold text-[#2C332D]">Multi-Step Sequencing Latency Shift</h4>
              <p className="text-xs text-[#59655D]">
                Baseline: 78% → Recent 6 sessions: 62% (-20.5% delta). Life Sim automatically paced down to 2-step sequences.
              </p>
            </div>
          )}

          {/* 9. Offline Toggle */}
          {currentStep.previewType === 'offline_toggle' && (
            <div className="text-center space-y-4">
              <div className="text-5xl">{isOfflineSim ? '📴' : '📶'}</div>
              <h4 className="text-lg font-bold text-[#2C332D]">
                {isOfflineSim ? 'Operating in Offline Mode' : 'Online Connection Active'}
              </h4>
              <button
                onClick={triggerOfflineCut}
                className="px-6 py-3 rounded-2xl bg-[#D9654B] text-white font-bold text-xs hover:bg-[#C2543B] cursor-pointer"
              >
                Cut Network Connection Now (Simulate Wi-Fi Drop)
              </button>
              <p className="text-xs text-[#59655D]">
                Life Sim and Memories continue operating smoothly with local persistence!
              </p>
            </div>
          )}

          {/* 10. Sync Queue */}
          {currentStep.previewType === 'sync_queue' && (
            <div className="text-center space-y-4">
              <div className="text-5xl">{syncStatus === 'synced' ? '✅' : '🔄'}</div>
              <h4 className="text-lg font-bold text-[#2C332D]">
                Status: {syncStatus === 'synced' ? 'All Activities Synced' : syncStatus === 'syncing' ? 'Syncing with Server...' : 'Offline Queue Active'}
              </h4>
              <button
                onClick={triggerReconnection}
                className="px-6 py-3 rounded-2xl bg-[#5B8266] text-white font-bold text-xs hover:bg-[#4D7056] cursor-pointer"
              >
                Reconnect Wi-Fi & Trigger Sync
              </button>
            </div>
          )}

          {/* 11. Copilot */}
          {currentStep.previewType === 'copilot' && (
            <div className="p-4 rounded-2xl bg-white border border-[#E0D8CC] space-y-2 text-xs max-w-lg">
              <strong className="text-[#E78C56] block">Ananya asked: "How has Anima been doing this week?"</strong>
              <p className="text-[#2C332D] leading-relaxed">
                “Anima completed 28 activities with solid memory recall (71%) and family recognition (84%). Sequencing tasks took 42 seconds longer than baseline, and Cogniva has automatically adjusted her pacing to 2-step flows.”
              </p>
            </div>
          )}

          {/* 12. Voice */}
          {currentStep.previewType === 'voice' && (
            <div className="text-center space-y-3">
              <span className="text-5xl">🎙️</span>
              <h4 className="text-base font-bold text-[#2C332D]">Daughter Ananya’s Voice Reminder</h4>
              <button
                onClick={() => playVoiceNarration("Good morning Ma! Your warm tea is ready on the side table. Take your time.")}
                className="px-5 py-2.5 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] text-[#B85D43] font-bold text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Ananya's Recorded Voice Note</span>
              </button>
            </div>
          )}

          {/* 13. Map */}
          {currentStep.previewType === 'map' && (
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <span className="p-3 rounded-2xl bg-white border border-[#E0D8CC] font-bold">🏡 Tarajan Home</span>
              <span className="p-3 rounded-2xl bg-white border border-[#E0D8CC] font-bold">🌸 Rongali Bihu</span>
              <span className="p-3 rounded-2xl bg-white border border-[#E0D8CC] font-bold">🌳 Kaziranga</span>
              <span className="p-3 rounded-2xl bg-white border border-[#E0D8CC] font-bold">🧣 Handloom</span>
            </div>
          )}

          {/* 14. Storybook */}
          {currentStep.previewType === 'storybook' && (
            <div className="text-center space-y-3 max-w-lg">
              <div className="text-6xl">📖</div>
              <h4 className="text-2xl font-bold text-[#2C332D]">
                “Cogniva doesn’t ask a patient to adapt to technology. Cogniva adapts technology to the person.”
              </h4>
              <p className="text-xs text-[#59655D]">
                A compassionate cognitive rehabilitation and memory companion for elderly dementia patients.
              </p>
            </div>
          )}
        </div>

        {/* Action Link to Full Feature */}
        <div className="flex justify-between items-center pt-4 border-t border-[#E8E0D5] text-xs">
          <Link href="/patient" className="text-[#5B8266] font-bold hover:underline">
            ← Explore Patient Mode
          </Link>

          <Link href="/caregiver" className="text-[#E78C56] font-bold hover:underline">
            Explore Caregiver Portal →
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
