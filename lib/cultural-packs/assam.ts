import { CulturalPack } from '@/types/cultural';

export const ASSAM_CULTURAL_PACK: CulturalPack = {
  id: 'assam-pack',
  name: 'Assam & Brahmaputra Valley',
  nativeName: 'অসম',
  region: 'North Eastern Region',
  state: 'Assam',
  languages: [
    { code: 'as', label: 'অসমীয়া (Assamese)', isNativeVoiceSupported: true },
    { code: 'bn', label: 'বাংলা (Bengali)', isNativeVoiceSupported: true },
    { code: 'en', label: 'English', isNativeVoiceSupported: true },
    { code: 'hi', label: 'हिन्दी (Hindi)', isNativeVoiceSupported: true },
  ],
  foods: [
    'Masor Tenga (Tangy Fish Curry)',
    'Khar (Traditional Alkaline Dish)',
    'Pitha & Laru (Bihu Rice Treats)',
    'Xaak (Fresh Wild Greens)',
    'Rongaloi Cha (Assam Red Tea)'
  ],
  festivals: [
    {
      name: 'Rongali Bihu',
      description: 'Spring celebration of new year, traditional dance, and blooming orchids (Kopou phool)',
      season: 'April / Spring',
      icon: '🌸'
    },
    {
      name: 'Bhogali Bihu',
      description: 'Harvest feast around the Meji bonfire, enjoying til pitha and fresh chira',
      season: 'January / Winter',
      icon: '🔥'
    },
    {
      name: 'Kongali Bihu',
      description: 'Quiet solemn evening lighting saki (earthen lamps) in paddy fields for crop protection',
      season: 'October / Autumn',
      icon: '🪔'
    }
  ],
  householdObjects: [
    {
      name: 'Gamosa',
      nativeName: 'গামোচা',
      significance: 'Traditional handwoven red and white cotton towel of respect and love, presented to elders during Bihu.',
      category: 'fabric'
    },
    {
      name: 'Xorai',
      nativeName: 'শৰাই',
      significance: 'Bell-metal offering tray used for tamul-paan and welcoming revered family guests.',
      category: 'metalwork'
    },
    {
      name: 'Japi',
      nativeName: 'জাপি',
      significance: 'Conical woven bamboo and toka leaf hat protecting tea garden workers and symbolizing Assamese heritage.',
      category: 'craft'
    },
    {
      name: 'Kahi-Bati',
      nativeName: 'কাঁহী-বাটি',
      significance: 'Traditional bell-metal dining plates and bowls used for wholesome family meals in Sarthebari style.',
      category: 'utensil'
    }
  ],
  familiarSounds: [
    {
      name: 'Dhol & Pepa Rhythm',
      description: 'Resonant buffalo horn pepa and traditional hand drum rhythms playing during Rongali Bihu songs.',
      environment: 'Village courtyard'
    },
    {
      name: 'Monsoon Rain on Tin Roof',
      description: 'Rhythmic, soothing rainfall pattering on traditional Assam-type house roof surrounded by betel nut trees.',
      environment: 'Home veranda'
    },
    {
      name: 'Morning Temple Bells at Kamakhya',
      description: 'Gentle bronze bell chimes in misty morning dawn along Nilachal hill.',
      environment: 'Riverbank temple'
    },
    {
      name: 'Tea Garden Birds at Dawn',
      description: 'Melodic babbler and bulbul calls echoing across emerald tea bushes in Jorhat.',
      environment: 'Tea estate'
    }
  ],
  expressions: [
    { phrase: 'Bhal aasa ne?', meaning: 'How are you feeling?', context: 'Warm family greeting' },
    { phrase: 'Cha khaba ne?', meaning: 'Would you like some tea?', context: 'Hospitality in the morning' },
    { phrase: 'Lahe lahe kora', meaning: 'Take your time, slowly and peacefully', context: 'Comforting reassurance' }
  ]
};

export const MEGHALAYA_CULTURAL_PACK: CulturalPack = {
  id: 'meghalaya-pack',
  name: 'Meghalaya & Khasi Hills',
  nativeName: 'Meghalaya',
  region: 'North Eastern Region',
  state: 'Meghalaya',
  languages: [
    { code: 'kha', label: 'Khasi', isNativeVoiceSupported: false },
    { code: 'en', label: 'English', isNativeVoiceSupported: true }
  ],
  foods: ['Jadoh (Rice and meat dish)', 'Dohkhlieh', 'Tungrymbai (Fermented soybean delicacy)'],
  festivals: [{
    name: 'Nongkrem Dance',
    description: 'Thanksgiving festival for harvest and peace celebrated at Smit',
    season: 'Autumn',
    icon: '🌾'
  }],
  householdObjects: [{
    name: 'Khoh Basket',
    nativeName: 'Khoh',
    significance: 'Conical bamboo basket strapped to head for carrying farm produce across misty trails.',
    category: 'craft'
  }],
  familiarSounds: [{
    name: 'Pine Breeze & Waterfall Cascade',
    description: 'Whistling wind through Cherrapunji pines and Nohkalikai mist.',
    environment: 'Highlands'
  }],
  expressions: [{ phrase: 'Kumno?', meaning: 'How are you?', context: 'Friendly greeting' }]
};

export const CULTURAL_PACKS = [ASSAM_CULTURAL_PACK, MEGHALAYA_CULTURAL_PACK];
