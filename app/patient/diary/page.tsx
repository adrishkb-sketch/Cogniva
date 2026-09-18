'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Plus, X, Search, Edit3, Trash2, BookOpen, ChevronLeft, Image as ImageIcon, Calendar } from 'lucide-react';
import { VoiceService } from '@/lib/voice/voice-service';

type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  mood: string;
  photo: string | null;
  date: string;
  createdAt: string;
};

const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Calm' },
  { emoji: '💭', label: 'Nostalgic' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '✨', label: 'Special' },
];

export default function MemoryDiaryPage() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isReadOpen, setIsReadOpen] = useState(false);
  const [activeDiary, setActiveDiary] = useState<DiaryEntry | null>(null);

  // Form State
  const [formId, setFormId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formMood, setFormMood] = useState('😊');
  const [formPhoto, setFormPhoto] = useState<string | null>(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const res = await fetch('/api/diary');
      if (res.ok) {
        const data = await res.json();
        setDiaries(data);
      }
    } catch (error) {
      console.error('Failed to fetch diaries', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (diary?: DiaryEntry) => {
    if (diary) {
      setFormId(diary.id);
      setFormTitle(diary.title);
      setFormContent(diary.content);
      setFormMood(diary.mood);
      setFormPhoto(diary.photo);
    } else {
      setFormId(null);
      setFormTitle('');
      setFormContent('');
      setFormMood('😊');
      setFormPhoto(null);
    }
    setIsReadOpen(false);
    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormPhoto(URL.createObjectURL(file));
    }
  };

  const saveDiary = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formTitle,
      content: formContent,
      mood: formMood,
      photo: formPhoto
    };

    try {
      if (formId) {
        // Update
        const res = await fetch(`/api/diary/${formId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updated = await res.json();
          setDiaries(diaries.map(d => d.id === updated.id ? updated : d));
        }
      } else {
        // Create
        const res = await fetch('/api/diary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const created = await res.json();
          setDiaries([created, ...diaries]);
        }
      }
      closeForm();
    } catch (error) {
      console.error('Failed to save diary', error);
    }
  };

  const deleteDiary = async (id: string) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;
    try {
      const res = await fetch(`/api/diary/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDiaries(diaries.filter(d => d.id !== id));
        setIsReadOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const openRead = (diary: DiaryEntry) => {
    setActiveDiary(diary);
    setIsReadOpen(true);
    VoiceService.speak(`Memory from ${new Date(diary.date).toLocaleDateString()}. ${diary.title}.`, 'en-IN');
  };

  const closeRead = () => {
    setIsReadOpen(false);
    setActiveDiary(null);
  };

  const filteredDiaries = diaries.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 relative">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D43]">
            <span>Personal Journal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            My Memory Diary
          </h1>
          <p className="text-sm text-[#59655D]">
            Write down your thoughts, special moments, or how your day was.
          </p>
        </div>

        <button
          onClick={() => openForm()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#5B8266] text-white font-bold text-base hover:bg-[#4D7056] transition-colors shadow-sm w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Write Today's Memory</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#849188]" />
        <input 
          type="text" 
          placeholder="Search your memories..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-2xl border border-[#E0D8CC] bg-white text-base outline-none focus:border-[#5B8266] focus:ring-1 focus:ring-[#5B8266]"
        />
      </div>

      {/* Diary List */}
      {isLoading ? (
        <div className="text-center py-10 text-[#849188]">Loading your memories...</div>
      ) : filteredDiaries.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-[#E0D8CC] bg-[#FAF7F2]">
          <BookOpen className="w-12 h-12 text-[#C5D0C9] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#2C332D]">No memories yet</h3>
          <p className="text-[#59655D] mt-1 mb-4">You haven't written any memories that match this search.</p>
          <button onClick={() => openForm()} className="text-[#5B8266] font-bold hover:underline">
            Write your first memory now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDiaries.map(diary => (
            <GlassCard 
              key={diary.id} 
              className="p-5 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] border border-[#E0D8CC] flex flex-col h-full bg-white/70 hover:bg-white"
              onClick={() => openRead(diary)}
            >
              {diary.photo && (
                <div className="w-full h-32 rounded-xl overflow-hidden mb-4 bg-gray-100 shrink-0">
                  <img src={diary.photo} alt="Memory" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#849188]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(diary.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span className="text-xl" title="Mood">{diary.mood}</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C332D] leading-tight mb-2 line-clamp-2">
                {diary.title}
              </h3>
              <p className="text-sm text-[#59655D] line-clamp-3 mb-4 flex-1">
                {diary.content}
              </p>
              
              <div className="pt-3 border-t border-[#E8E0D5] flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold text-[#B85D43]">Read Memory →</span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Write / Edit Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={closeForm}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: '100%', scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: '100%', scale: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full sm:max-w-2xl bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl shadow-xl overflow-hidden border border-[#E0D8CC] h-[90vh] sm:h-auto sm:max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E0D5] bg-white shrink-0">
                <h2 className="font-bold text-xl text-[#2C332D]">
                  {formId ? 'Edit Memory' : "Write Today's Memory"}
                </h2>
                <button onClick={closeForm} className="p-2 rounded-full hover:bg-gray-100 bg-[#F3EEF3] text-[#5D4A5D]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-white">
                <form id="diaryForm" onSubmit={saveDiary} className="space-y-6 max-w-xl mx-auto">
                  
                  {/* Date Display */}
                  <div className="text-center">
                    <span className="inline-block px-4 py-1.5 bg-[#EBF2EC] text-[#5B8266] rounded-full text-sm font-bold border border-[#C5DBCB]">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#2C332D] ml-1">Give this memory a title</label>
                    <input 
                      required 
                      type="text" 
                      value={formTitle}
                      onChange={e => setFormTitle(e.target.value)}
                      placeholder="e.g., A lovely walk in the park" 
                      className="w-full p-4 rounded-2xl border border-[#E0D8CC] bg-[#FAF7F2] text-lg font-semibold outline-none focus:border-[#5B8266] focus:ring-2 focus:ring-[#5B8266]/20 transition-all" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#2C332D] ml-1">How are you feeling?</label>
                    <div className="flex flex-wrap gap-3">
                      {MOODS.map(m => (
                        <button
                          key={m.label}
                          type="button"
                          onClick={() => setFormMood(m.emoji)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                            formMood === m.emoji 
                              ? 'border-[#5B8266] bg-[#EBF2EC] shadow-sm scale-[1.02]' 
                              : 'border-[#E0D8CC] bg-white hover:bg-[#FAF7F2] grayscale opacity-70 hover:grayscale-0 hover:opacity-100'
                          }`}
                        >
                          <span className="text-xl">{m.emoji}</span>
                          <span className="text-sm font-bold text-[#2C332D]">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#2C332D] ml-1">Write your thoughts</label>
                    <textarea 
                      required 
                      value={formContent}
                      onChange={e => setFormContent(e.target.value)}
                      rows={6} 
                      placeholder="Write about your day, something you remember, or a special moment..." 
                      className="w-full p-4 rounded-2xl border border-[#E0D8CC] bg-[#FAF7F2] text-base outline-none focus:border-[#5B8266] focus:ring-2 focus:ring-[#5B8266]/20 transition-all resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#2C332D] ml-1">Add a photo (Optional)</label>
                    
                    {formPhoto ? (
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-[#E0D8CC]">
                        <img src={formPhoto} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormPhoto(null)}
                          className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-[#C5D0C9] bg-[#FAF7F2] hover:bg-[#EBF2EC] cursor-pointer transition-colors group">
                        <ImageIcon className="w-8 h-8 text-[#849188] group-hover:text-[#5B8266] mb-2" />
                        <span className="text-sm font-bold text-[#59655D] group-hover:text-[#5B8266]">Tap to select a photo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>

                </form>
              </div>

              <div className="p-4 sm:p-6 border-t border-[#E8E0D5] bg-white shrink-0">
                <button 
                  type="submit" 
                  form="diaryForm" 
                  className="w-full py-4 rounded-2xl bg-[#E78C56] text-white font-bold text-lg hover:bg-[#D77C46] shadow-md active:scale-[0.98] transition-all"
                >
                  Save Memory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Read Mode Modal */}
      <AnimatePresence>
        {isReadOpen && activeDiary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2]">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full h-full flex flex-col max-w-3xl mx-auto bg-white shadow-2xl sm:rounded-none"
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E0D5] bg-white shrink-0 sticky top-0 z-10">
                <button onClick={closeRead} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 font-bold text-[#59655D]">
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => openForm(activeDiary)} className="p-2 sm:px-4 sm:py-2 rounded-xl bg-[#F3EEF3] text-[#5D4A5D] font-bold text-sm hover:bg-[#E9DFE9] flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button onClick={() => deleteDiary(activeDiary.id)} className="p-2 sm:px-4 sm:py-2 rounded-xl bg-[#FEF6E7] text-[#B85D43] font-bold text-sm hover:bg-[#FDEFCB] flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                <div className="max-w-2xl mx-auto space-y-6">
                  
                  <div className="flex items-center gap-3">
                    <span className="text-4xl bg-[#FAF7F2] p-3 rounded-2xl">{activeDiary.mood}</span>
                    <div>
                      <div className="text-sm font-bold text-[#849188] flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(activeDiary.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-[#2C332D] mt-1 leading-tight">
                        {activeDiary.title}
                      </h1>
                    </div>
                  </div>

                  {activeDiary.photo && (
                    <div className="w-full rounded-3xl overflow-hidden border-4 border-[#FAF7F2] shadow-sm">
                      <img src={activeDiary.photo} alt="Memory" className="w-full max-h-[500px] object-cover" />
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none text-[#4A5550] leading-relaxed pt-4 pb-12 whitespace-pre-wrap">
                    {activeDiary.content}
                  </div>

                </div>
              </div>
              
              <div className="p-4 bg-white border-t border-[#E8E0D5] flex justify-center shrink-0">
                 <button
                  onClick={() => VoiceService.speak(activeDiary.content, 'en-IN')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5B8266] text-white font-bold text-base hover:bg-[#4D7056] transition-colors shadow-sm"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Read Aloud</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
