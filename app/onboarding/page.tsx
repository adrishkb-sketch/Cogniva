'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, Sparkles, User, Globe, MapPin, Clock, Users, Landmark, BookHeart, Music } from 'lucide-react';
import { DEMO_PATIENT, DEMO_PEOPLE, DEMO_PLACES, DEMO_ROUTINE } from '@/lib/demo/demo-patient-anima';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  // Form State initialized with Anima's friendly defaults
  const [formData, setFormData] = useState({
    name: 'Anima Das',
    age: '72',
    primaryLanguage: 'as',
    secondaryLanguage: 'en',
    region: 'Assam / Brahmaputra Valley',
    culturalPack: 'assam-pack',
    wakeUpTime: '07:00 AM',
    teaTime: '07:30 AM',
    medTime: '09:00 AM',
    daughterName: 'Ananya Das',
    grandsonName: 'Niloy',
    childhoodHome: 'Tarajan, Jorhat',
    favoriteFestival: 'Rongali Bihu',
    musicInterest: 'Borgeet & Bhupen Hazarika melodies',
    favoriteFood: 'Masor Tenga'
  });

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.push('/patient');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress header */}
        <div className="flex items-center justify-between text-xs text-[#59655D] font-medium px-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>

        <div className="w-full h-2 bg-[#E8E0D5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5B8266] transition-all duration-300 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Card */}
        <GlassCard variant="elevated" className="p-6 sm:p-10 space-y-6">
          {/* STEP 1: PATIENT */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5B8266]">
                <User className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#2C332D]">Who is this profile for?</h2>
              </div>
              <p className="text-xs text-[#59655D]">
                Tell us about your loved one so Cogniva can personalize their speech, name, and interactions.
              </p>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#2C332D] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E0D8CC] text-sm focus:outline-none focus:border-[#5B8266]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C332D] mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E0D8CC] text-sm focus:outline-none focus:border-[#5B8266]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LANGUAGE */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5B8266]">
                <Globe className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#2C332D]">Preferred Languages</h2>
              </div>
              <p className="text-xs text-[#59655D]">
                Cogniva adapts voice interaction and prompts to the patient’s native mother tongue.
              </p>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#2C332D] mb-1">Primary Native Language</label>
                  <select
                    value={formData.primaryLanguage}
                    onChange={(e) => setFormData({ ...formData, primaryLanguage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E0D8CC] text-sm focus:outline-none focus:border-[#5B8266]"
                  >
                    <option value="as">অসমীয়া (Assamese) — Full Native Voice</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: REGION & CULTURAL PACK */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5B8266]">
                <MapPin className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#2C332D]">Cultural & Regional Context</h2>
              </div>
              <p className="text-xs text-[#59655D]">
                Connect activities with familiar cultural heritage, festivals, and regional objects.
              </p>
              <div className="p-4 rounded-2xl bg-[#EBF2EC] border border-[#C5DBCB] flex items-center gap-3">
                <span className="text-2xl">🌸</span>
                <div>
                  <h4 className="font-bold text-sm text-[#2C332D]">Assam & Brahmaputra Valley Pack</h4>
                  <p className="text-xs text-[#59655D]">Includes Rongali Bihu, Bell-metal tea wares, Gamosa, and monsoon veranda sounds.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DAILY ROUTINE */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5B8266]">
                <Clock className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#2C332D]">Daily Rhythm & Schedule</h2>
              </div>
              <p className="text-xs text-[#59655D]">
                Configure morning tea, medication, and peaceful evening walks for gentle timeline prompts.
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E8E0D5] flex justify-between">
                  <span>☕ 07:30 AM — Morning Assam Tea</span>
                  <span className="text-[#5B8266] font-semibold">Active</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8E0D5] flex justify-between">
                  <span>💊 09:00 AM — Morning Blood Pressure Tablet</span>
                  <span className="text-[#5B8266] font-semibold">Active</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8E0D5] flex justify-between">
                  <span>🌿 05:30 PM — Terrace Garden Walk</span>
                  <span className="text-[#5B8266] font-semibold">Active</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PEOPLE */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5B8266]">
                <Users className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#2C332D]">Close Family & Loved Ones</h2>
              </div>
              <p className="text-xs text-[#59655D]">
                Add photos and relationships for grounded reminiscence and emergency rescue.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#E0D8CC] text-center">
                  <span className="text-3xl">👩‍⚕️</span>
                  <div className="font-bold text-sm text-[#2C332D] mt-1">Ananya Das</div>
                  <div className="text-xs text-[#5B8266] font-medium">Daughter (Primary)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#E0D8CC] text-center">
                  <span className="text-3xl">👦</span>
                  <div className="font-bold text-sm text-[#2C332D] mt-1">Niloy</div>
                  <div className="text-xs text-[#5B8266] font-medium">Grandson (11 yrs)</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: PLACES */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5B8266]">
                <Landmark className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#2C332D]">Meaningful Places</h2>
              </div>
              <p className="text-xs text-[#59655D]">
                Anchor memories in childhood hometowns and cherished family destinations.
              </p>
              <div className="p-3.5 bg-white rounded-xl border border-[#E0D8CC] flex items-center gap-3">
                <span className="text-2xl">🏡</span>
                <div>
                  <h4 className="font-bold text-sm text-[#2C332D]">Jorhat Ancestral House</h4>
                  <p className="text-xs text-[#59655D]">Assam-type wooden home with spacious garden and Sewali flowers.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: MEMORIES & OBJECTS */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5B8266]">
                <BookHeart className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#2C332D]">Key Memories & Heirlooms</h2>
              </div>
              <p className="text-xs text-[#59655D]">
                Select tangible objects for Life Sim and Memory Recognition activities.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E8E0D5] flex items-center gap-2">
                  <span>🧣</span>
                  <span className="font-semibold text-[#2C332D]">Red Handloom Gamosa</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8E0D5] flex items-center gap-2">
                  <span>☕</span>
                  <span className="font-semibold text-[#2C332D]">Bell-Metal Tea Cup</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: FINISH */}
          {step === 8 && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-[#EBF2EC] text-[#5B8266] flex items-center justify-center mx-auto text-3xl">
                🌸
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
                Cogniva is ready to build a world around Anima’s memories.
              </h2>
              <p className="text-sm text-[#59655D] max-w-md mx-auto leading-relaxed">
                Her personalized cognitive activities, daily schedule, and verified family memory scrapbook have been initialized.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[#E8E0D5]">
            {step > 1 ? (
              <GlassButton variant="secondary" onClick={prevStep} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </GlassButton>
            ) : <div />}

            <GlassButton variant="primary" onClick={nextStep} className="gap-2">
              <span>{step === totalSteps ? 'Enter Patient Experience' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
