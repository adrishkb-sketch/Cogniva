import { CulturalPack } from '@/types/cultural';

export const ALL_NER_PACKS: Record<string, CulturalPack> = {
  assam: {
    id: 'assam',
    name: 'Assam & Brahmaputra Valley',
    nativeName: 'অসম',
    region: 'North Eastern Region',
    state: 'Assam',
    languages: [
      { code: 'as', label: 'অসমীয়া (Assamese)', isNativeVoiceSupported: true },
      { code: 'bn', label: 'বাংলা (Bengali)', isNativeVoiceSupported: true },
      { code: 'hi', label: 'हिन्दी (Hindi)', isNativeVoiceSupported: true },
      { code: 'en', label: 'English', isNativeVoiceSupported: true },
    ],
    foods: [
      'Masor Tenga (Tangy Fish Curry)',
      'Khar (Traditional Alkaline Papaya Dish)',
      'Pitha & Narikol Laru (Bihu Rice Treats)',
      'Xaak (Fresh Wild Greens with Garlic)',
      'Rongaloi Cha (Fresh Assam Red Tea)'
    ],
    festivals: [
      {
        name: 'Rongali Bihu (Bohag Bihu)',
        description: 'Joyous spring festival of new year, blooming Kopou orchids, and Pepa buffalo horn dance.',
        season: 'April / Spring',
        icon: '🌸'
      },
      {
        name: 'Bhogali Bihu (Magh Bihu)',
        description: 'Winter harvest feast around the Meji bonfire with warm til pitha.',
        season: 'January / Winter',
        icon: '🔥'
      },
      {
        name: 'Kongali Bihu (Kati Bihu)',
        description: 'Autumn evening lighting earthen lamps in golden paddy fields for crop protection.',
        season: 'October / Autumn',
        icon: '🪔'
      }
    ],
    householdObjects: [
      {
        name: 'Handloom Gamosa',
        nativeName: 'গামোচা',
        significance: 'Traditional handwoven red-and-white cotton towel given with reverence to family elders during Bihu.',
        category: 'fabric'
      },
      {
        name: 'Bell-Metal Xorai',
        nativeName: 'শৰাই',
        significance: 'Sarthebari crafted offering tray with conical cover, used for tamul-paan and welcoming revered guests.',
        category: 'metalwork'
      },
      {
        name: 'Japi Sunhat',
        nativeName: 'জাপি',
        significance: 'Conical woven bamboo and toka leaf hat worn by tea workers and symbolizing Assamese cultural dignity.',
        category: 'craft'
      },
      {
        name: 'Kahi-Bati Cup',
        nativeName: 'কাঁহী-বাটি',
        significance: 'Golden bell-metal bowl and cup preserving the warmth of morning ginger red tea.',
        category: 'utensil'
      }
    ],
    familiarSounds: [
      {
        name: 'Monsoon Rain on Tin Roof',
        description: 'Soothing rhythmic rain shower falling on the veranda tin roof surrounded by betel nut trees.',
        environment: 'Veranda'
      },
      {
        name: 'Buffalo Horn Pepa & Dhol',
        description: 'Joyful traditional horn melodies echoing during spring Rongali Bihu dances.',
        environment: 'Village Courtyard'
      },
      {
        name: 'Tea Garden Birds at Dawn',
        description: 'Melodic babblers and bulbuls calling over emerald tea bushes in Jorhat.',
        environment: 'Tea Estate'
      }
    ],
    expressions: [
      { phrase: 'Bhal aasa ne?', meaning: 'How are you feeling?', context: 'Warm family greeting' },
      { phrase: 'Cha khaba ne?', meaning: 'Would you like some warm tea?', context: 'Morning hospitality' },
      { phrase: 'Lahe lahe kora', meaning: 'Take your time, slowly and peacefully', context: 'Comforting reassurance' }
    ]
  },

  meghalaya: {
    id: 'meghalaya',
    name: 'Meghalaya (Abode of Clouds)',
    nativeName: 'Meghalaya',
    region: 'North Eastern Region',
    state: 'Meghalaya',
    languages: [
      { code: 'kha', label: 'Khasi (Ka Ktien Khasi)', isNativeVoiceSupported: false },
      { code: 'gar', label: 'Garo (A·chik)', isNativeVoiceSupported: false },
      { code: 'en', label: 'English', isNativeVoiceSupported: true }
    ],
    foods: ['Jadoh (Aromatic Rice)', 'Dohkhlieh', 'Tungrymbai (Fermented soybean delicacy)'],
    festivals: [
      {
        name: 'Nongkrem Dance',
        description: 'Thanksgiving festival for harvest and peace celebrated at Smit with gold ornaments and drums.',
        season: 'November / Autumn',
        icon: '🌾'
      },
      {
        name: 'Wangala Drum Festival',
        description: 'Garo 100-drum harvest celebration honoring the Sun God Misi Saljong.',
        season: 'Winter',
        icon: '🥁'
      }
    ],
    householdObjects: [
      {
        name: 'Khoh Bamboo Basket',
        nativeName: 'Khoh',
        significance: 'Conical bamboo basket strapped to the forehead for carrying highland produce along mist trails.',
        category: 'craft'
      },
      {
        name: 'Jainsem Shawl',
        nativeName: 'Jainsem',
        significance: 'Graceful traditional two-piece silk attire worn by Khasi elder women with silver crowns.',
        category: 'fabric'
      }
    ],
    familiarSounds: [
      {
        name: 'Pine Breeze & Highland Mist',
        description: 'Whistling cool breeze rustling through Shillong pines near Nohkalikai falls.',
        environment: 'Pine Forest'
      },
      {
        name: 'Ksing Khasi Drums',
        description: 'Rhythmic wooden drum beats resonating during traditional thanksgiving dances.',
        environment: 'Hilltop Smit'
      }
    ],
    expressions: [
      { phrase: 'Kumno phi long?', meaning: 'How are you doing?', context: 'Friendly greeting' },
      { phrase: 'Sngewbha shim ja', meaning: 'Please enjoy your meal', context: 'Warm dining hospitality' }
    ]
  },

  manipur: {
    id: 'manipur',
    name: 'Manipur (Jewel of India)',
    nativeName: 'মণিপুৰ',
    region: 'North Eastern Region',
    state: 'Manipur',
    languages: [
      { code: 'mni', label: 'Meiteilon / Manipuri', isNativeVoiceSupported: true },
      { code: 'en', label: 'English', isNativeVoiceSupported: true }
    ],
    foods: ['Kangshoi (Vegetable Stew)', 'Eromba (Mashed Fermented Fish & Bamboo)', 'Singju (Spicy Salad)'],
    festivals: [
      {
        name: 'Yaoshang (Spring Festival)',
        description: 'Five-day spring celebration of colors, traditional Thabal Chongba moonlight folk dance.',
        season: 'March / Spring',
        icon: '🌕'
      },
      {
        name: 'Lai Haraoba',
        description: 'Ancient ritual honoring forest deities with sacred dance and brass lamps.',
        season: 'May / Summer',
        icon: '🪔'
      }
    ],
    householdObjects: [
      {
        name: 'Phanek Wrap',
        nativeName: 'ফনেক',
        significance: 'Handloom hand-embroidered lower garment with protective sacred temple border motifs.',
        category: 'fabric'
      },
      {
        name: 'Pena Musical Lute',
        nativeName: 'পেনা',
        significance: 'Traditional one-string bowed lute crafted from seasoned bamboo and coconut shell.',
        category: 'music'
      }
    ],
    familiarSounds: [
      {
        name: 'Loktak Lake Water Ripple',
        description: 'Gentle water lapping against wooden canoes among the floating phumdis at sunset.',
        environment: 'Loktak Lake'
      },
      {
        name: 'Pena Folk Melody',
        description: 'Ancient resonant string music evoking ancestral stories of the Imphal valley.',
        environment: 'Courtyard'
      }
    ],
    expressions: [
      { phrase: 'Khurumjari', meaning: 'Respectful greetings and blessings', context: 'Elder greeting' },
      { phrase: 'Chak chaba yaaraba?', meaning: 'Is the meal ready to share?', context: 'Family mealtime' }
    ]
  },

  mizoram: {
    id: 'mizoram',
    name: 'Mizoram (Land of the Hill People)',
    nativeName: 'Mizoram',
    region: 'North Eastern Region',
    state: 'Mizoram',
    languages: [
      { code: 'lus', label: 'Mizo ṭawng', isNativeVoiceSupported: false },
      { code: 'en', label: 'English', isNativeVoiceSupported: true }
    ],
    foods: ['Bai (Steamed Vegetables & Bamboo Shoot)', 'Vawksa Rep (Smoked Pork)', 'Sawhchiar (Aromatic Porridge)'],
    festivals: [
      {
        name: 'Chapchar Kut',
        description: 'Spring festival celebrated after forest clearing with cheerful Cheraw bamboo dance.',
        season: 'March / Spring',
        icon: '🎋'
      }
    ],
    householdObjects: [
      {
        name: 'Puan Chei Shawl',
        nativeName: 'Puan Chei',
        significance: 'Intricately woven traditional geometric textile cherished across generations.',
        category: 'fabric'
      },
      {
        name: 'Cheraw Bamboo Poles',
        nativeName: 'Cheraw',
        significance: 'Long bamboo poles clapped rhythmically in four-part harmony during celebration.',
        category: 'craft'
      }
    ],
    familiarSounds: [
      {
        name: 'Cheraw Bamboo Clapping Rhythm',
        description: 'Synchronous rhythmic sound of green bamboo poles tapping in joyful harmony.',
        environment: 'Village Square'
      },
      {
        name: 'Aizawl Mountain Church Chimes',
        description: 'Gentle morning church bells echoing over the mist-clad mountain ridges.',
        environment: 'Hillside'
      }
    ],
    expressions: [
      { phrase: 'Chibai!', meaning: 'Warm greetings and peace', context: 'Daily greeting' },
      { phrase: 'Dam takin aw', meaning: 'Stay healthy and peaceful', context: 'Farewell blessing' }
    ]
  },

  nagaland: {
    id: 'nagaland',
    name: 'Nagaland (Land of Festivals)',
    nativeName: 'Nagaland',
    region: 'North Eastern Region',
    state: 'Nagaland',
    languages: [
      { code: 'nag', label: 'Nagamese', isNativeVoiceSupported: false },
      { code: 'en', label: 'English', isNativeVoiceSupported: true }
    ],
    foods: ['Axone (Fermented Soybean)', 'Smoked Pork with Anishi (Dry Colocasia leaves)', 'Galho (Wholesome Rice Stew)'],
    festivals: [
      {
        name: 'Hornbill Festival',
        description: 'The great gathering of all 17 Naga tribes at Kisama heritage village celebrating unity.',
        season: 'December / Winter',
        icon: '🪶'
      }
    ],
    householdObjects: [
      {
        name: 'Naga Warrior Shawl (Tsungkotepsu)',
        nativeName: 'Tsungkotepsu',
        significance: 'Symbol of clan honor, decorated with figures of hornbills, tigers, and stars.',
        category: 'fabric'
      },
      {
        name: 'Carved Wood Morung Mug',
        nativeName: 'Morung Mug',
        significance: 'Single-block carved wooden drinking horn used for ceremonial hospitality.',
        category: 'craft'
      }
    ],
    familiarSounds: [
      {
        name: 'Naga Log Drum Resonance',
        description: 'Deep hollow thunder of ancient carved wooden log drums echoing across the ridge.',
        environment: 'Morung Village'
      }
    ],
    expressions: [
      { phrase: 'Kene aseh?', meaning: 'How are you feeling?', context: 'Nagamese greeting' },
      { phrase: 'Bhal thakibi', meaning: 'Stay well and safe', context: 'Warm blessing' }
    ]
  },

  tripura: {
    id: 'tripura',
    name: 'Tripura (Land of Royal Palaces)',
    nativeName: 'ত্রিপুরা',
    region: 'North Eastern Region',
    state: 'Tripura',
    languages: [
      { code: 'bn', label: 'বাংলা (Bengali)', isNativeVoiceSupported: true },
      { code: 'trp', label: 'Kokborok', isNativeVoiceSupported: false },
      { code: 'en', label: 'English', isNativeVoiceSupported: true }
    ],
    foods: ['Mui Borok (Berma Dried Fish Delicacy)', 'Chakhwi', 'Gudok'],
    festivals: [
      {
        name: 'Kharchi Puja',
        description: 'Seven-day royal ritual worshiping the Fourteen Gods at Old Agartala temple.',
        season: 'July / Monsoon',
        icon: '🏛️'
      }
    ],
    householdObjects: [
      {
        name: 'Risa & Rikutu Cloth',
        nativeName: 'Risa',
        significance: 'Handwoven indigenous cotton breast-cloth and shawl with vibrant multi-colored borders.',
        category: 'fabric'
      },
      {
        name: 'Agartala Cane Lamp',
        nativeName: 'Cane Craft',
        significance: 'Finely shaved bamboo and cane weave lamp glowing with warm amber light.',
        category: 'craft'
      }
    ],
    familiarSounds: [
      {
        name: 'Ujjayanta Palace Lake Evening Bells',
        description: 'Peaceful temple bells and temple conch shells echoing across the royal lake.',
        environment: 'Old Agartala'
      }
    ],
    expressions: [
      { phrase: 'Khamani chwrwng?', meaning: 'Have you had your peaceful meal?', context: 'Kokborok greeting' },
      { phrase: 'Bhalo thakun', meaning: 'Stay well and blessed', context: 'Bengali blessing' }
    ]
  },

  arunachal: {
    id: 'arunachal',
    name: 'Arunachal Pradesh (Land of the Dawn-Lit Mountains)',
    nativeName: 'Arunachal Pradesh',
    region: 'North Eastern Region',
    state: 'Arunachal Pradesh',
    languages: [
      { code: 'hi', label: 'हिन्दी (Hindi)', isNativeVoiceSupported: true },
      { code: 'en', label: 'English', isNativeVoiceSupported: true }
    ],
    foods: ['Thukpa (Warm Noodle Broth)', 'Momos', 'Pika Pila (Bamboo Shoot Pickle)', 'Zan (Millets with Greens)'],
    festivals: [
      {
        name: 'Losar (Monpa New Year)',
        description: 'Tibetan-Monpa celebration at Tawang monastery with butter lamps and colorful masked dances.',
        season: 'February / Spring',
        icon: '🏔️'
      }
    ],
    householdObjects: [
      {
        name: 'Monpa Wooden Butter Tea Churner (Dongmo)',
        nativeName: 'Dongmo',
        significance: 'Carved wooden cylinder banded in brass for churning salted butter tea in high altitudes.',
        category: 'utensil'
      },
      {
        name: 'Yak Wool Prayer Shawl',
        nativeName: 'Yak Shawl',
        significance: 'Heavy warm hand-spun wool shawl protecting against Himalayan winds.',
        category: 'fabric'
      }
    ],
    familiarSounds: [
      {
        name: 'Tawang Monastery Monks Chanting & Horns',
        description: 'Deep resonant low-pitch brass horns and soothing Buddhist chants at 10,000 feet.',
        environment: 'Tawang Valley'
      }
    ],
    expressions: [
      { phrase: 'Tashi Delek', meaning: 'Blessings of auspicious health and long life', context: 'Monpa blessing' },
      { phrase: 'Aap kaise hain?', meaning: 'How are you feeling?', context: 'Hindi greeting' }
    ]
  },

  sikkim: {
    id: 'sikkim',
    name: 'Sikkim (Kingdom of Kanchenjunga)',
    nativeName: 'Sikkim',
    region: 'North Eastern Region',
    state: 'Sikkim',
    languages: [
      { code: 'ne', label: 'नेपाली (Nepali)', isNativeVoiceSupported: true },
      { code: 'en', label: 'English', isNativeVoiceSupported: true },
      { code: 'hi', label: 'हिन्दी (Hindi)', isNativeVoiceSupported: true }
    ],
    foods: ['Gundruk (Fermented leafy soup)', 'Sinki', 'Phagshapa (Pork with radish)', 'Sel Roti (Crisp rice bread)'],
    festivals: [
      {
        name: 'Pang Lhabsol',
        description: 'Sacred festival honoring Mount Kanchenjunga as guardian deity with thrilling warrior dances.',
        season: 'September / Autumn',
        icon: '🏔️'
      }
    ],
    householdObjects: [
      {
        name: 'Choktse Carved Wooden Table',
        nativeName: 'Choktse',
        significance: 'Hand-carved foldable wooden tea table painted with dragons and lotus motifs.',
        category: 'craft'
      },
      {
        name: 'Tibetan Singing Bowl',
        nativeName: 'Singing Bowl',
        significance: 'Bronze bell alloy bowl rung gently for meditation and memory grounding.',
        category: 'music'
      }
    ],
    familiarSounds: [
      {
        name: 'Singing Bowl Resonant Harmonic Tone',
        description: 'Sustained, deeply calming acoustic resonance that eases anxiety and slows heart rate.',
        environment: 'Rumtek Monastery'
      },
      {
        name: 'Teesta River Alpine Cascade',
        description: 'Rushing crisp glacial water cascading through rhododendron valleys.',
        environment: 'Mountain Valley'
      }
    ],
    expressions: [
      { phrase: 'Kasto chha?', meaning: 'How are you doing?', context: 'Warm Nepali greeting' },
      { phrase: 'Sanchai chhu', meaning: 'I am doing well and at peace', context: 'Comforting response' }
    ]
  }
};
