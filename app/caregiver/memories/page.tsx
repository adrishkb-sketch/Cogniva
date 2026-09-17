'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_PEOPLE, DEMO_PLACES, DEMO_OBJECTS, DEMO_EVENTS } from '@/lib/demo/demo-patient-anima';
import { Plus, Heart, MapPin, Sparkles, CheckCircle2, Volume2, Image, ShieldCheck } from 'lucide-react';

export default function CaregiverMemoriesPage() {
  const [people, setPeople] = useState(DEMO_PEOPLE);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: '',
    relationship: '',
    notes: '',
    keyFacts: ''
  });

  const handleAddPerson = () => {
    if (!newPerson.name || !newPerson.relationship) return;

    const created = {
      id: `person-${Date.now()}`,
      patientId: 'patient-anima-das',
      name: newPerson.name,
      relationship: newPerson.relationship,
      photoUrl: '👤',
      notes: newPerson.notes,
      keyFacts: newPerson.keyFacts.split(',').map(s => s.trim()),
      verifiedBy: 'Ananya Das (Caregiver)',
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setPeople(prev => [created, ...prev]);
    setNewPerson({ name: '', relationship: '', notes: '', keyFacts: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#E78C56] uppercase tracking-wider">
            Verified Memory Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Family Memory Archive
          </h1>
          <p className="text-sm text-[#59655D]">
            Manage verified family members, ancestral places, and heirlooms that ground Anima's daily cognitive activities.
          </p>
        </div>

        <GlassButton
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="gap-2 text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Memory</span>
        </GlassButton>
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <GlassCard variant="elevated" className="p-6 sm:p-8 space-y-4 border-2 border-[#5B8266]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#2C332D]">Add New Verified Family Person</h3>
            <button onClick={() => setShowAddModal(false)} className="text-xs font-bold text-[#849188]">✕ Cancel</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-[#2C332D]">Full Name</label>
              <input
                type="text"
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                placeholder="e.g. Partha Das"
                className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#2C332D]">Relationship</label>
              <input
                type="text"
                value={newPerson.relationship}
                onChange={(e) => setNewPerson({ ...newPerson, relationship: e.target.value })}
                placeholder="e.g. Brother, Sister-in-law"
                className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1 text-[#2C332D]">Personal Notes & Meaning</label>
              <input
                type="text"
                value={newPerson.notes}
                onChange={(e) => setNewPerson({ ...newPerson, notes: e.target.value })}
                placeholder="e.g. Lives in Guwahati. Visits during Rongali Bihu festival."
                className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1 text-[#2C332D]">Key Grounded Facts (comma separated)</label>
              <input
                type="text"
                value={newPerson.keyFacts}
                onChange={(e) => setNewPerson({ ...newPerson, keyFacts: e.target.value })}
                placeholder="e.g. Loves Bihu songs, Plays the harmonium"
                className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <GlassButton variant="primary" onClick={handleAddPerson} className="text-xs">
              Save Verified Record
            </GlassButton>
          </div>
        </GlassCard>
      )}

      {/* Verified Family Members Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#2C332D] flex items-center gap-2">
          <span>Family & Loved Ones ({people.length})</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF2EC] text-[#3F5E47]">
            Caregiver Audited
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {people.map((person) => (
            <GlassCard key={person.id} className="p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{person.photoUrl}</span>
                  <span className="text-[10px] font-bold text-[#5B8266] bg-[#EBF2EC] px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#2C332D]">{person.name}</h4>
                <p className="text-xs font-semibold text-[#E78C56]">{person.relationship}</p>
                <p className="text-xs text-[#59655D] leading-relaxed">{person.notes}</p>
              </div>

              <div className="pt-3 border-t border-[#E8E0D5] text-[10px] text-[#849188] flex items-center justify-between">
                <span>By: {person.verifiedBy}</span>
                <span>{person.updatedAt}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Places and Objects Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <GlassCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-[#2C332D]">Anchored Places</h3>
          <div className="space-y-3">
            {DEMO_PLACES.map((p) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-white border border-[#E0D8CC] flex items-start gap-3">
                <span className="text-3xl">{p.photoUrl}</span>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm text-[#2C332D]">{p.title}</div>
                  <div className="text-xs text-[#8E778E] font-medium">{p.locationName}</div>
                  <p className="text-xs text-[#59655D] leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          <h3 className="text-base font-bold text-[#2C332D]">Heirloom Objects</h3>
          <div className="space-y-3">
            {DEMO_OBJECTS.map((obj) => (
              <div key={obj.id} className="p-3.5 rounded-2xl bg-white border border-[#E0D8CC] flex items-start gap-3">
                <span className="text-3xl">{obj.photoUrl}</span>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm text-[#2C332D]">{obj.name}</div>
                  <p className="text-xs text-[#59655D] leading-relaxed">{obj.significance}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
