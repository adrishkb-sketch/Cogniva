'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_ROUTINE } from '@/lib/demo/demo-patient-anima';
import { VoiceService } from '@/lib/voice/voice-service';
import { Mic, MicOff, Play, Pause, Volume2, Plus, Clock, Heart, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function CaregiverRoutinePage() {
  const [routines, setRoutines] = useState(DEMO_ROUTINE);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTranscript, setRecordingTranscript] = useState('');
  const [selectedRoutineId, setSelectedRoutineId] = useState<string>(DEMO_ROUTINE[0].id);
  const [justRecorded, setJustRecorded] = useState(false);

  const startRecordVoice = () => {
    setIsRecording(true);
    setRecordingTranscript('');
    VoiceService.startListening(
      (transcript) => {
        setRecordingTranscript(transcript);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );
  };

  const handleSaveVoiceToRoutine = () => {
    if (!recordingTranscript) return;

    setRoutines(prev => prev.map(item => {
      if (item.id === selectedRoutineId) {
        return {
          ...item,
          hasFamilyVoiceReminder: true,
          familyVoiceMessage: {
            id: `voice-${Date.now()}`,
            speakerName: 'Ananya (Daughter)',
            relationship: 'Daughter',
            transcriptText: recordingTranscript
          }
        };
      }
      return item;
    }));

    setJustRecorded(true);
    setRecordingTranscript('');
    setTimeout(() => setJustRecorded(false), 3000);
  };

  const testPlay = (text: string) => {
    VoiceService.speak(`Ananya says: ${text}`, 'en-IN');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#E78C56] uppercase tracking-wider">
            Family Voice & Routine Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Daily Rhythm & Voice Reminders
          </h1>
          <p className="text-sm text-[#59655D]">
            Attach warm, personalized voice recordings to Anima's daily medication and routine schedule.
          </p>
        </div>
      </div>

      {/* Voice Recorder Studio Card */}
      <GlassCard variant="elevated" className="p-6 sm:p-8 space-y-4 border-2 border-[#E78C56]/40 bg-gradient-to-b from-[#FDF1EA]/50 to-white/90">
        <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-[#E78C56]" />
            <h3 className="text-lg font-bold text-[#2C332D]">Record New Family Voice Reminder</h3>
          </div>
          <span className="text-xs text-[#849188]">No Voice Cloning • 100% Consensual Audio</span>
        </div>

        <p className="text-xs text-[#59655D] leading-relaxed">
          Record a comforting message in your own voice. Cogniva plays this exact recording at the configured reminder time on Anima’s tablet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="sm:col-span-1">
            <label className="block font-semibold mb-1 text-[#2C332D]">Assign to Routine Item</label>
            <select
              value={selectedRoutineId}
              onChange={(e) => setSelectedRoutineId(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC]"
            >
              {routines.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.timeSlot} — {r.title}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="block font-semibold text-[#2C332D]">Voice Transcript</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={recordingTranscript}
                onChange={(e) => setRecordingTranscript(e.target.value)}
                placeholder="Click the microphone to speak, or type reminder..."
                className="flex-1 p-3 rounded-xl bg-white border border-[#E0D8CC]"
              />

              <button
                onClick={isRecording ? () => setIsRecording(false) : startRecordVoice}
                className={`p-3 rounded-xl border font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                  isRecording
                    ? 'bg-[#D9654B] text-white animate-pulse'
                    : 'bg-[#5B8266] text-white hover:bg-[#4D7056]'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? 'Listening...' : 'Record Voice'}</span>
              </button>
            </div>
          </div>
        </div>

        {recordingTranscript && (
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E0D8CC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#59655D]">
              <Volume2 className="w-4 h-4 text-[#5B8266]" />
              <span className="italic">"{recordingTranscript}"</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => testPlay(recordingTranscript)}
                className="px-3 py-1 rounded-lg bg-white border border-[#E0D8CC] font-bold text-[#2C332D] hover:bg-[#FAF7F2]"
              >
                Test Play
              </button>
              <GlassButton variant="primary" size="sm" onClick={handleSaveVoiceToRoutine}>
                Attach to Schedule
              </GlassButton>
            </div>
          </div>
        )}

        {justRecorded && (
          <div className="p-3 rounded-xl bg-[#EBF2EC] text-[#3F5E47] font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Family voice reminder saved and synced to Anima's daily schedule!</span>
          </div>
        )}
      </GlassCard>

      {/* Routine List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#2C332D]">
          Scheduled Routine Items ({routines.length})
        </h3>

        <div className="space-y-3">
          {routines.map((item) => (
            <GlassCard key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#5B8266] bg-[#EBF2EC] px-2.5 py-0.5 rounded-full">
                    {item.timeSlot}
                  </span>
                  <h4 className="font-bold text-base text-[#2C332D]">{item.title}</h4>
                </div>
                <p className="text-xs text-[#59655D]">{item.description}</p>
                {item.familyVoiceMessage && (
                  <div className="flex items-center gap-2 text-xs text-[#E78C56] font-medium pt-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Voice Note from {item.familyVoiceMessage.speakerName}: "{item.familyVoiceMessage.transcriptText}"</span>
                  </div>
                )}
              </div>

              {item.familyVoiceMessage && (
                <button
                  onClick={() => testPlay(item.familyVoiceMessage?.transcriptText || '')}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E0D8CC] hover:border-[#5B8266] text-xs font-bold text-[#2C332D] flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-[#5B8266]" />
                  <span>Preview Audio</span>
                </button>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
