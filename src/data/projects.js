// All site content lives here. Each project is an "experiment" with a lab code,
// a spec sheet and a list of sections made of typed content blocks.
const m = (file) => `${import.meta.env.BASE_URL}media/${file}`

export const DOMAINS = ['VR', 'Hardware', 'Research', 'Game', 'App', 'Community']

export const projects = [
  {
    slug: 'olfactory',
    code: 'KV7',
    group: 'vr',
    title: 'VR Olfactory',
    headline: 'Immersive Enhancement of Game Experience by Smell Sensing',
    note: '7 prototypes — KV7 is the keeper',
    tagline: 'Designing software & hardware to enhance immersion in virtual reality',
    summary:
      'Real-time olfactory feedback integrated into interactive virtual environments, through custom-built scent devices and Unity-based prototypes.',
    domains: ['VR', 'Hardware', 'Research'],
    status: 'Published',
    year: '2025',
    cover: m('home-12.webp'),
    accent: '#7bdcb5',
    specs: [
      ['Context', 'Blekinge Institute of Technology'],
      ['Prototypes', '7 iterations · KV1 → KV7'],
      ['Stack', 'Unity · custom scent hardware'],
      ['Output', 'GALA 2025 · Springer'],
    ],
    sections: [
      {
        id: 'about',
        title: 'About',
        blocks: [
          {
            t: 'lead',
            x: 'Exploring how scent enhances immersion in VR by integrating real-time olfactory feedback into interactive virtual environments. Through custom-built scent devices and Unity-based prototypes, the project studies how smell affects presence, emotion, and user experience.',
          },
          { t: 'video', id: 'aSeGSfv0R3o', cap: 'How can olfactory support content in gaming applications?' },
        ],
      },
      {
        id: 'paper',
        title: 'Research paper',
        blocks: [
          {
            t: 'paper',
            venue: 'Games and Learning Alliance — GALA 2025',
            publisher: 'Springer, Lecture Notes in Computer Science',
            title: 'Immersive Enhancement of Game Experience by Smell Sensing',
            href: 'https://link.springer.com/chapter/10.1007/978-3-032-11043-5_27',
            img: m('olfactory-02.webp'),
          },
        ],
      },
      {
        id: 'introduction',
        title: 'Introduction',
        blocks: [
          {
            t: 'p',
            x: 'In most VR experiences, immersion is driven almost entirely by visuals, audio, and interaction, while smell is often overlooked despite its strong connection to memory, emotion, and perception. This project focuses on olfactory VR to explore how adding scent as an active design element can change how users interpret, feel, and react to virtual environments.',
          },
          {
            t: 'p',
            x: 'By developing and testing custom scent-dispersion systems integrated into Unity-based VR prototypes, the research examines when scent enhances presence, when it distracts, and how it can be meaningfully designed rather than used as a gimmick.',
          },
          { t: 'img', src: m('home-10.webp'), cap: 'Scent capsule array render — prototype codename KV5' },
        ],
      },
      {
        id: 'hardware',
        title: 'Headset design upgrades',
        blocks: [
          {
            t: 'grid',
            items: [
              { k: 'Weight & comfort', v: ['Hardware moved to back', 'Optimized counter-balance'] },
              { k: 'Ergonomics', v: ['Adjustable nozzles', 'Fits various face shapes'] },
              { k: 'Scent capacity', v: ['Upgraded from 3 to 8 capsules', 'Extended immersion duration'] },
              { k: 'Accessibility', v: ['Easy DIY build', 'Fully 3D printable'] },
            ],
          },
          { t: 'demo', name: 'ScentArray' },
        ],
      },
      {
        id: 'testing',
        title: 'Audience testing & improving',
        blocks: [
          {
            t: 'p',
            x: 'Through audience testing I got direct feedback on what should be improved immediately. This method helped me design 7 different prototypes, with the final one being KV7. The project went through several iterations to ensure usability and function.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('olfactory-01.webp'), cap: 'Headset-mounted scent device' },
              { src: m('olfactory-04.webp'), cap: 'Playtest session' },
              { src: m('olfactory-05.webp'), cap: 'Playtest session' },
              { src: m('olfactory-06.webp'), cap: 'Playtest session' },
              { src: m('olfactory-07.webp'), cap: 'Playtest session' },
            ],
          },
        ],
      },
      {
        id: 'links',
        title: 'Links',
        blocks: [
          {
            t: 'links',
            items: [
              {
                label: 'Our project at Blekinge Institute of Technology',
                href: 'https://www.bth.se/om-bth/institutioner/institutionen-for-teknik-och-estetik/exit-2025/design-av-digitala-och-immersiva-upplevelser',
              },
              {
                label: 'Our project at Games and Learning Alliance',
                href: 'https://link.springer.com/chapter/10.1007/978-3-032-11043-5_27',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'vr-looking-glass',
    code: 'Lilla Böslid',
    group: 'vr',
    title: 'VR Looking Glass',
    headline: 'VR Looking Glass',
    note: 'less is better than nothing',
    tagline: 'Accessibility for those who are unable to experience',
    summary:
      'Using 360° pictures and VR headsets as a looking glass — teleporting users to places that might otherwise be physically or logistically inaccessible.',
    domains: ['VR', 'Research'],
    status: 'Shipped',
    year: null,
    cover: m('vr-looking-glass-03.webp'),
    accent: '#8fb8ff',
    specs: [
      ['Role', 'Lead Project Designer'],
      ['Team size', '3'],
      ['Time frame', '8 weeks'],
      ['Stack', 'Unity · C# · Meta Quest 3'],
    ],
    sections: [
      {
        id: 'about',
        title: 'About',
        blocks: [
          {
            t: 'lead',
            x: 'This project is about digital accessibility and remote presence. By using 360-degree pictures and VR headsets as a looking glass, we are effectively teleporting users to locations, allowing them to explore environments that might otherwise be physically or logistically inaccessible.',
          },
          { t: 'video', id: 'hRgXQ_OZ2-c', cap: 'Lilla Böslid — presentation video' },
        ],
      },
      {
        id: 'introduction',
        title: 'Introduction',
        blocks: [
          {
            t: 'p',
            x: 'This project focuses on accessibility and inclusion at Lilla Böslid in Halland. It explores how digital design and technology can support people with different mobility and accessibility needs in engaging with natural environments.',
          },
          {
            t: 'p',
            x: 'Even when natural environments are made physically accessible, people may still face uncertainty before visiting. Limited or unclear information about the place can make planning difficult and discourage visits, especially for those with accessibility needs.',
          },
          {
            t: 'p',
            x: 'We gathered insights through site visits, interviews, and accessibility-focused discussions. We interviewed two disability group members about friction in their daily life when it comes to outdoor activities, and gained a better understanding of accessibility challenges, user needs, and the importance of preparation before visiting outdoor environments.',
          },
          { t: 'img', src: m('vr-looking-glass-01.webp'), cap: 'Key insights from interviews' },
          {
            t: 'quote',
            x: 'Less is better than nothing.',
            by: 'Key insight from mobility-reduced users',
          },
          {
            t: 'p',
            x: 'The ultimate goal is to prove that “less is better than nothing”: by providing a reliable, immersive preview of a location, we remove the “surprise obstacles” that often prevent people with disabilities from exploring the world.',
          },
        ],
      },
      {
        id: 'contribution',
        title: 'My contribution',
        blocks: [
          {
            t: 'p',
            x: 'I navigated the entire design sprint lifecycle, starting with interviews where I realized that for our users (mainly mobility-reduced), “less is better than nothing” — basic accessibility information like the location of wheelchair-friendly infrastructure outweighed the client’s desire for “cool and flashy” features. I was responsible for shrinking the project scope when the client presented a massive wish list against a limited economic and time budget.',
          },
          {
            t: 'p',
            x: 'On the technical side, I acted as the solo VR developer, conducting project priority research to select the Meta Quest 3 as our hardware, as it was the only product available. I built the entire experience in Unity, writing custom C# scripts and implementing visual and spatial audio cues to guide the user through the experience.',
          },
          {
            t: 'p',
            x: 'I progressed by building upon the research papers, shifting the application from a passive viewing experience into a highly immersive, user-choice-driven virtual reality environment.',
          },
        ],
      },
      {
        id: 'pillars',
        title: 'Five design pillars',
        blocks: [
          { t: 'img', src: m('vr-looking-glass-02.webp'), cap: 'The design framework for this iteration' },
          {
            t: 'pillars',
            items: [
              {
                k: 'Clarity',
                x: 'VR is a new and niche technology and most new users are unfamiliar with the UI and controls, so as a designer it’s crucial to make it user friendly. The pedestals clearly showcase points of interest on the existing map, as well as the preview orb that corresponds to what the user will see when teleported.',
              },
              {
                k: 'Player Choice',
                x: 'This pillar corresponds well with clarity: I wanted the user to actively explore and choose what scenery they would like to experience.',
              },
              {
                k: 'Accessibility',
                x: 'The VR system auto-calibrates user height on start and can be recalibrated during play or when you hand the headset to another user. The experience can be enjoyed sitting down, standing, walking or running — it doesn’t discriminate and can be tailored to the majority of users.',
              },
              {
                k: 'Information',
                x: 'The experience isn’t meant to replace reality — we strongly encourage users to explore the real location, which is why it’s a booth at Lilla Böslid. With this information users can decide in depth where they want to go, what they want to see, and most importantly what could obstruct them, such as paths they can’t access with a wagon or wheelchair.',
              },
              {
                k: 'Macro Experience',
                x: 'Making users feel huge — like standing on top of a mountain or seeing a bird’s-eye view. That’s why I implemented 360° panorama pictures taken by drones 120 meters above the ground.',
              },
            ],
          },
        ],
      },
      {
        id: 'features',
        title: 'Features & design',
        blocks: [
          {
            t: 'p',
            x: 'The objective is to maximize user agency, making participants active decision-makers rather than passive observers.',
          },
          { t: 'h', x: 'World design & navigation' },
          {
            t: 'p',
            x: 'The experience begins on a centralized hub platform featuring a top-down, 2D tactical map of Lilla Böslid. Points of interest are marked across the map and users can freely navigate to approach them. Each POI is represented in the virtual space by a pedestal equipped with an interactive button.',
          },
          { t: 'h', x: 'The preview orb mechanism' },
          {
            t: 'p',
            x: 'To reinforce the pillar of clarity, users must know their destination before committing to a choice. A preview orb sits on each pedestal: as the user approaches, it shows a miniature 360° snapshot of the target environment, granting a clear glimpse of what they will experience before striking the button.',
          },
          { t: 'demo', name: 'TeleportHub' },
        ],
      },
      {
        id: 'prototype',
        title: 'Early prototype',
        blocks: [
          {
            t: 'p',
            x: 'Before implementing the VR solution, a lo-fi prototype was made: a desktop mode where users click through different scenes of 360° panorama photos, similar to Google Street View. This is where I discovered how important the five pillars were — it felt bland, less like a player-driven experience and more like a video of premade templates.',
          },
          {
            t: 'p',
            x: 'The lo-fi was never scrapped but remade into a separate application. The VR experience lives on location, while the original lo-fi prototype serves home users who want to scout the area before going — not everyone owns a VR headset, live cameras over long distances introduce lag, and most importantly we want a true connection to Lilla Böslid while you are there.',
          },
          {
            t: 'links',
            items: [
              {
                label: 'Open the application prototype (Figma)',
                href: 'https://www.figma.com/proto/BIg2KcemOV1ie2QzFXpuL3/Untitled?node-id=87-2&p=f&t=dziKTNaOECzuYipi-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=87%3A2&show-proto-sidebar=1',
              },
            ],
          },
          {
            t: 'gallery',
            items: [
              { src: m('vr-looking-glass-07.gif'), cap: 'The famous carrot on a stick' },
              { src: m('vr-looking-glass-08.webp'), cap: 'Application: main menu' },
              { src: m('vr-looking-glass-09.webp'), cap: 'Application: flow chart' },
            ],
          },
        ],
      },
      {
        id: 'challenges',
        title: 'Challenges & solutions',
        blocks: [
          { t: 'h', x: 'The skybox immersion dilemma' },
          {
            t: 'p',
            x: 'Pressing a pedestal button instantly swaps the skybox to the selected location. But an immersion-breaking flaw emerged during testing:',
          },
          { t: 'flow', items: ['Button pressed', 'Skybox changes', 'Hub platform & pedestals remain visible'], bad: true },
          {
            t: 'p',
            x: 'Because the hub, map and neighbouring pedestals remained rendered, they conflicted with the new skybox and destroyed the illusion of being present in the new location.',
          },
          {
            t: 'note',
            k: 'Solution',
            x: 'Instead of scene loading or object pooling to disable the hub geometry (scene changes caused severe lag, meaning few computers could run it smoothly), the system uses teleportation: the player controller is moved far away along the z-axis, using Unity’s built-in render distance to remove the hub from view. The user is left isolated in the new environment. A single minimalist Home Pillar teleports them back to the map hub.',
          },
          {
            t: 'p',
            x: 'Teleportation is a pragmatic shortcut; a more refined approach would be a hand-attached map menu that changes the skybox, but time wasn’t sufficient for that solution.',
          },
          { t: 'h', x: 'The 3 DoF to 6 DoF challenge' },
          {
            t: 'p',
            x: 'Before 6 DoF, the project was strictly view-only 3 DoF — users had no means of interacting, much like a television. The decision was made to split the experience: free 6 DoF movement while choosing where to go, then 3 DoF after teleporting, to simply look around and take in the views.',
          },
          { t: 'img', src: m('vr-looking-glass-10.gif'), cap: '3 DoF vs 6 DoF axes' },
        ],
      },
      {
        id: 'shelved',
        title: 'Shelved ideas',
        blocks: [
          {
            t: 'p',
            x: 'It was originally intended to use on-location content such as live video feeds, but the hardware wasn’t available. The main target was an Insta360 Pro at ~5000 USD MSRP plus a licensing subscription. Plan B, an Insta360 X-series at ~500 EUR, was again denied by the head of office. Converting Lilla Böslid into a 3D map proved far too time-consuming for the scope.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('vr-looking-glass-11.webp'), cap: 'Considered 360° camera hardware' },
              { src: m('vr-looking-glass-12.webp'), cap: 'Prototype in-game footage' },
            ],
          },
        ],
      },
      {
        id: 'lessons',
        title: 'Lessons learnt',
        blocks: [
          {
            t: 'list',
            items: [
              'When designing for users unfamiliar to you, it’s crucial to understand their perspective and needs. Dare to pursue more information, even if it makes you uncomfortable.',
              'With expensive hardware you are at the mercy of external factors — unpredictable weather, software driver issues. Never let a testing phase depend on perfect outdoor conditions; always design a controlled environment as a baseline backup.',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'vr-pole-dancers',
    code: 'VRPD',
    group: 'vr',
    title: 'VR Pole Dancers',
    headline: 'VR Pole Dancers',
    note: 'trainer since Nov 2022',
    tagline: 'Combining real and virtual pole sport in a safe environment',
    summary:
      'A community for virtual pole dancers and aerialists. Trainer, staff member and consultant on standards, ranks and competitive frameworks.',
    domains: ['VR', 'Community'],
    status: 'Ongoing',
    year: '2022 →',
    cover: m('vr-pole-dancers-01.webp'),
    accent: '#ff7ab6',
    specs: [
      ['Role', 'Trainer · Staff · Consultant'],
      ['Joined', 'November 2022'],
      ['Platform', 'VRChat · full-body motion capture'],
      ['Community', 'Founded 2018'],
    ],
    sections: [
      {
        id: 'about',
        title: 'Introduction',
        blocks: [
          {
            t: 'lead',
            x: 'VRPD is a community for virtual pole dancers and aerialists. We strive to combine reality and digital performance in a safe environment.',
          },
          {
            t: 'note',
            k: 'Disclaimer',
            x: 'All visuals depict real-time live dancing recorded via motion capture devices. No animation or AI assistance is involved.',
          },
          { t: 'video', id: 'etM92npdZYo', cap: 'VR Pole Talent Show (EU)' },
        ],
      },
      {
        id: 'history',
        title: 'History',
        blocks: [
          {
            t: 'p',
            x: 'VRPD started in 2018 during a highly experimental phase of the popular platform VRChat, and communities formed rapidly. Early on, simply creating safe training spaces was already impactful. It began with the appearance of pole dancing in VR itself.',
          },
          { t: 'h', x: 'Seeing pole in a virtual environment immediately created tension' },
          { t: 'list', items: ['Creative freedom', 'Risk and misunderstanding', 'Lack of structure'] },
          { t: 'quote', x: 'Pole is not neutral equipment. It carries history, stigma, and physical demands.' },
          { t: 'h', x: 'Rather than treating VR pole as novelty, VRPD was built around practical questions' },
          {
            t: 'list',
            items: [
              'How do people train safely without physical feedback?',
              'How do you teach technique, conditioning, and progression in a digital environment?',
              'How do you prevent misuse while keeping exploration open?',
            ],
          },
          { t: 'h', x: 'Over time, pole dancing itself evolved' },
          { t: 'list', items: ['Competitive standards developed', 'Cross-disciplinary use expanded', 'Public perception began shifting'] },
          {
            t: 'p',
            x: 'As VRPD grew, so did the need to think beyond classes and events toward long-term cultural stewardship. Our goal remains the same, but it gained depth: what began as training grew into maintaining standards, protecting legitimacy, and preparing pole dancers for broader environments inside and outside VR.',
          },
        ],
      },
      {
        id: 'contribution',
        title: 'My contribution',
        blocks: [
          {
            t: 'p',
            x: 'I joined this journey in November 2022. My role developed organically through demonstrated alignment and contribution: I joined as a participant, trained consistently, and showed strong observational skills when working with others.',
          },
          {
            t: 'p',
            x: 'Over time I transitioned into training roles, gaining firsthand experience in guiding progression and managing different learning styles. My involvement expanded into internal discussions, where trainer-level insight became valuable for decision making — as a trainer I could see the consequences of structure immediately.',
          },
          {
            t: 'p',
            x: 'Through reliability, clarity, and shared standards, I became a trusted staff member and consultant. My roles and tasks were:',
          },
          {
            t: 'list',
            items: [
              'Reinforced professional structure and sport-oriented thinking',
              'Supported internal decision-making during fast, high-stakes moments',
              'Stabilized processes during transitions with strong attention to detail',
              'Contributed to early competitive frameworks for VR pole athleticism, including scoring logic and evaluation structure',
              'Contributed to early dancer rank frameworks, including the rank system and infrastructure',
              'Consulted on age verification and access control systems with attention to risk and long-term impact',
              'Handled social aspects such as promotional materials for the VRPD YouTube channel',
            ],
          },
          { t: 'video', id: 'EcS-rYmCnVA', cap: 'Pole Card Game v2.0' },
        ],
      },
      {
        id: 'gallery',
        title: 'Motion capture stills',
        blocks: [
          {
            t: 'gallery',
            items: [1, 2, 3, 4, 5, 6].map((n) => ({
              src: m(`vr-pole-dancers-0${n}.webp`),
              cap: 'Live full-body motion capture in VRChat',
            })),
          },
          {
            t: 'fine',
            x: '© 2026 Virtual Reality Pole Dancers. All content, including text, images, graphics, videos, and audio recordings, is the intellectual property of Virtual Reality Pole Dancers. Any unauthorized reproduction, distribution, or public display without prior written consent is strictly prohibited.',
          },
        ],
      },
      {
        id: 'links',
        title: 'Find VRPD',
        blocks: [
          {
            t: 'links',
            items: [
              { label: 'Discord', href: 'https://discord.gg/S8yWgZ2' },
              { label: 'VRChat group', href: 'https://vrc.group/VRPD.5833' },
              { label: 'VRChat world', href: 'https://vrchat.com/home/launch?worldId=wrld_81c5a689-cb7a-4a9e-b091-83c7f7d1b7d0' },
              { label: 'Twitch', href: 'https://www.twitch.tv/virtualrealitypoledancers' },
              { label: 'X / Twitter', href: 'https://x.com/VRPoleDancers' },
              { label: 'Bluesky', href: 'https://bsky.app/profile/vrpoledancers.bsky.social' },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'vr-sensory-isolation',
    code: 'Solo project',
    group: 'vr',
    title: 'VR Sensory Isolation',
    headline: 'VR Sensory Isolation',
    note: 'still cooking…',
    tagline: 'Experiment in progress — documentation pending',
    summary: 'A solo 10-week experiment on the senses in virtual reality. Write-up coming soon.',
    domains: ['VR', 'Research'],
    status: 'In progress',
    year: null,
    cover: m('vr-sensory-isolation-01.gif'),
    accent: '#ffd36b',
    specs: [
      ['Role', 'Solo Developer'],
      ['Time frame', '10 weeks'],
      ['Status', 'Documentation pending'],
    ],
    sections: [
      {
        id: 'about',
        title: 'Status',
        blocks: [
          {
            t: 'note',
            k: 'Pending',
            x: 'This experiment is still being documented. Introduction, contribution, shelved ideas and lessons learnt will be published here once the project wraps up.',
          },
          { t: 'img', src: m('vr-sensory-isolation-01.gif'), cap: 'The five senses' },
        ],
      },
    ],
  },

  {
    slug: 'business-tech-to-consumers',
    code: 'Pico 4 Enterprise',
    group: 'vr',
    title: 'Business Tech To Consumers',
    headline: 'Repurposing business hardware for consumers',
    note: 'a second life for a locked headset',
    tagline: 'Giving enterprise-locked VR headsets a second life',
    summary:
      'Custom software that bypasses enterprise roadblocks on the Pico 4 Enterprise and restores consumer functionality via SteamVR.',
    domains: ['VR', 'Hardware'],
    status: 'Shipped',
    year: null,
    cover: null,
    accent: '#b69cff',
    specs: [
      ['Hardware', 'Pico 4 Enterprise'],
      ['Target', 'SteamVR + PC'],
      ['Goal', 'Extend device lifespan'],
    ],
    sections: [
      {
        id: 'about',
        title: 'About',
        blocks: [
          {
            t: 'lead',
            x: 'This project focuses on repurposing business-only VR hardware for consumer use, creating a bridge between two markets that are usually kept strictly separate.',
          },
          {
            t: 'p',
            x: 'The Pico 4 Enterprise is a headset designed exclusively for corporate environments and locked behind enterprise software restrictions. While technically powerful, these devices are often discarded once business support ends.',
          },
          {
            t: 'p',
            x: 'I developed custom software solutions that bypass enterprise roadblocks and restore core consumer functionality, allowing the hardware to be used for consumer VR experiences using SteamVR with an additional computer. This gives the device a second life, extending its usability beyond its original business context.',
          },
          { t: 'flow', items: ['Enterprise-locked headset', 'Custom software', 'SteamVR via PC', 'Second life'] },
          { t: 'links', items: [{ label: 'Learn more — full guide', href: 'https://sites.google.com/view/aizendovepico4e/home' }] },
        ],
      },
    ],
  },

  {
    slug: 'expconnect',
    code: 'Card game',
    group: 'projects',
    title: 'EXP Connect',
    headline: 'EXP Connect',
    note: 'UNO got cut, the questions survived',
    tagline: 'Feel understood through playing',
    summary:
      'A card game where you answer questions as you play to win — or refuse and give your competitors an edge. Designed around belonging.',
    domains: ['Game', 'Research', 'Hardware'],
    status: 'Shipped',
    year: '2025–26',
    cover: m('home-13.webp'),
    accent: '#ffb37a',
    specs: [
      ['Role', 'Gameplay Designer'],
      ['Team size', '3'],
      ['Time frame', '9 weeks'],
      ['Tools', 'Inventor · Bambu Lab P1S'],
    ],
    sections: [
      {
        id: 'about',
        title: 'About',
        blocks: [
          {
            t: 'lead',
            x: 'EXP Connect is a refreshing card game where you have to answer different questions as you play to win — or refuse and give your competitors an edge.',
          },
          { t: 'img', src: m('expconnect-01.webp'), cap: 'Agency & communion — the two components of belonging' },
        ],
      },
      {
        id: 'introduction',
        title: 'Introduction',
        blocks: [
          {
            t: 'p',
            x: 'Before designing, key research questions needed answers: “What is it to feel belonging?” and “Can these behaviors be enforced?”',
          },
          {
            t: 'grid',
            items: [
              { k: 'Agency', v: ['The identity of oneself'] },
              { k: 'Communion', v: ['For one’s identity to be understood by others'] },
            ],
          },
          {
            t: 'p',
            x: 'Can this behavior be enforced? Think of a company afterwork: usually it’s within company hours or paid for by the company, so users don’t sacrifice their own resources by participating. The short answer is no — behaviors cannot be enforced, only encouraged and nudged.',
          },
          {
            t: 'p',
            x: 'This was key to balancing our game: is it more game-like, where the game drives the players, or vice versa? The initial design was to make the game very fast — over in no more than 5 minutes — so our users, mainly students, can play during breaks.',
          },
          {
            t: 'note',
            k: 'Introducing',
            x: 'EXP Connect is a smooth, adaptable card game with added depth in belonging, socializing and ice breaking. It brings in socialization as a core fundamental while retaining game-like structures.',
          },
        ],
      },
      {
        id: 'contribution',
        title: 'My contributions',
        blocks: [
          {
            t: 'p',
            x: 'As game designer I was responsible for game-flow optimization and continuous iteration throughout the project. Rapid playtesting let me determine which parts needed to be reworked.',
          },
          { t: 'img', src: m('expconnect-04.webp'), cap: 'Initial ideation' },
          { t: 'h', x: 'Iteration 1 — a modifiable 52-card deck' },
          {
            t: 'p',
            x: 'Questions printed onto a regular set of 52 cards; players were forced to answer if they wanted to play the card. 12 of the 52 were question cards. It was designed to be open for modification no matter which card game you played — in playtesting this was a disaster, as balancing flow and tempo was impossible when people played different versions.',
          },
          { t: 'h', x: 'Iteration 2 — a host game: Turn Ten' },
          {
            t: 'p',
            x: 'Designing a game from scratch carries limitations — player count, learning the rules. If a group has 5 people and the game allows 4, that’s a fundamental flaw. So we added a layer on top of an existing game: Turn Ten (Vändtia). Putting all questions on the highest cards (Ace, King, Queen, Knight — 16 question cards) dragged the game on, since those are the strongest cards and it became a spiral of repetition.',
          },
          {
            t: 'list',
            items: [
              'Questions needed categorizing — too many sensitive ones (“What’s your biggest insecurity?”) unsuited for first-time play. A more positive approach was needed.',
              'Open questions everyone at the table can join beat simple yes/no answers.',
              'A category system per relationship stage: “We just met”, “We know a bit of each other”, “We are good friends” — as different editions.',
              'A discard function, so the same question isn’t answered twice and anyone can safely retire a question forever.',
            ],
          },
          { t: 'h', x: 'Iteration 3 — UNO' },
          {
            t: 'p',
            x: 'A more popular host was chosen for its pace and familiarity. Standard UNO has 108 cards for 2–10 players; with UNO Express rules we halve the deck and remove 2 cards, ending up with 52 again — 48 coloured and 4 special cards. Draw cards were removed entirely, as a targeted draw-punishment made the game painfully long.',
          },
          {
            t: 'p',
            x: 'Players said questions felt like a roadblock rather than a reward. A tester suggested a reward: answer and discard a card from your hand. I implemented it immediately, plus a penalty — now players choose between saving themselves or punishing others. Another tester felt there weren’t enough questions to feel involved, so Q-cards were bumped from 12 to 24.',
          },
          { t: 'demo', name: 'QDensity' },
          {
            t: 'p',
            x: 'The last problem was printing the question on the UNO card itself: you can’t read stacked cards in your hand, and you can’t pre-plan since the previous player decides what can be played. The fix: a separate question deck. Marked UNO cards trigger a draw, everyone pauses to read, and the player decides to answer for a reward or refuse for a penalty — a surprise element with time pressure.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('expconnect-05.gif'), cap: 'UNO iteration' },
              { src: m('expconnect-06.webp'), cap: 'Card layout — chosen question cards' },
              { src: m('expconnect-09.gif'), cap: 'Reverse' },
            ],
          },
        ],
      },
      {
        id: 'feedback',
        title: 'Playtest feedback',
        blocks: [
          {
            t: 'p',
            x: 'Many testing phases were conducted; I was responsible for the UNO iteration. Workshops with 2–4 volunteers combined observation, interviews and questionnaires, and feedback was categorized as positive, negative, and player suggestions. Doing this for all three iterations let us constantly iterate between versions and roll back when something didn’t work. A raw combination of all versions was tested too, but proved too difficult to understand.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('expconnect-07.webp'), cap: 'User research & testing' },
              { src: m('expconnect-08.webp'), cap: 'Anatomy of choice' },
            ],
          },
          { t: 'h', x: 'Final “UNO Feel” rules' },
          {
            t: 'list',
            items: [
              'Plays like UNO Express — players start with 5 cards',
              'Modified UNO deck with all draw cards removed, plus a secondary personal-question deck',
              'Answer a question card → you may discard a card from your hand',
              'Refuse → discard that card but draw 2',
              'You cannot win using the discard function',
            ],
          },
          { t: 'h', x: 'Concept evaluation & discontinuation' },
          {
            t: 'p',
            x: 'Feedback from both educational and market-oriented perspectives made it clear the UNO format diluted the game’s identity and didn’t align with its intended depth of interaction, so it was intentionally discontinued. Learning to let go of a well-known framework in favor of a more fitting structure was a key takeaway — and the question card system survived, highly adaptable and reusable.',
          },
        ],
      },
      {
        id: 'questions',
        title: 'Question cards',
        blocks: [
          {
            t: 'p',
            x: 'Early versions relied on highly personal questions to create tension and risk. Playtesting revealed that overly personal prompts led to discomfort, hesitation, and reduced participation, so questions were redesigned to be more open-ended, situational and encouraging — letting players engage at their own comfort level and giving them agency over how much they share.',
          },
          { t: 'demo', name: 'QuestionDeck' },
        ],
      },
      {
        id: 'new-concept',
        title: 'New concept: EXPConnect',
        blocks: [
          {
            t: 'p',
            x: 'With UNO Feel discontinued, the question cards were reused for a new concept inspired by the board game Scribble. EXP Connect stands more toward social activity than gamification.',
          },
          {
            t: 'p',
            x: 'Players get random alphabet cards and take turns answering questions. You can’t see your own letter but can see everyone else’s; the back shows a point value hinting at the letter’s difficulty. This encourages players to tell the truth rather than answer to their letter — in UNO, players said anything to win instead of socializing. This acts as a brake.',
          },
          {
            t: 'p',
            x: 'I designed the alphabet card UI to be read from table distance (1–2 m): big bold letters facing others, point value facing you, with strong black-and-white contrast. A golden border distinguished it from the question deck, though that was later scrapped to align with the overall art direction.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('expconnect-02.webp'), cap: 'Rulebook — introduction' },
              { src: m('expconnect-03.webp'), cap: 'Rulebook — setup & rules' },
              { src: m('expconnect-12.webp'), cap: 'Alphabet cards: old & new version' },
              { src: m('expconnect-11.webp'), cap: 'The boxed game' },
            ],
          },
        ],
      },
      {
        id: 'cardholder',
        title: 'Cardholder',
        blocks: [
          {
            t: 'p',
            x: 'Since cards use both sides, a stand was needed. Online solutions ranged from folded A4 to market products, eventually pointing at 3D printing — but available holders were ~25 cm long, covered the card, and needed lots of filament, making a heavy box and expensive manufacturing. So I designed my own in Inventor: L 20 mm × H 15 mm × W 10 mm.',
          },
          { t: 'demo', name: 'HolderWeight' },
          {
            t: 'p',
            x: 'Printed at home on a Bambu Lab P1S with Polymaker PLA at standard settings. Testing showed the 1 mm card slot was too wide — cards slid and tipped. 0.2 mm would better suit 200 gsm paper.',
          },
          { t: 'img', src: m('expconnect-13.webp'), cap: 'Cardholder model (Inventor)' },
        ],
      },
      {
        id: 'lessons',
        title: 'Lessons learnt',
        blocks: [
          {
            t: 'list',
            items: [
              'Establish a strong, cohesive concept arc early. A clear vision for the end goal and player experience made decision-making more efficient.',
              'Adapt to the surrounding environment and market demands — understanding the audience keeps the game relevant and feasible.',
              'Communication and collaboration matter: regular discussions, clear task distribution and on-site meetings reduced misunderstandings — though harder over the Christmas holidays and New Year.',
              'Iterative development requires flexibility: stay open to change while protecting the core idea.',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'app-campus-crave',
    code: 'Halmstad University',
    group: 'projects',
    title: 'Campus Crave',
    headline: 'APP: Campus Crave',
    note: 'ketchup & mustard theory',
    tagline: 'Cheap, easy-to-access food whenever you need it',
    summary:
      'A mobile app hub for food trucks on the Halmstad University campus — browse, order in seconds, pick up without the hassle.',
    domains: ['App'],
    status: 'Prototype',
    year: '2026',
    cover: m('app-campus-crave-01.webp'),
    accent: '#ffb000',
    specs: [
      ['Role', 'Lead Application Designer'],
      ['Team size', '3'],
      ['Time frame', '8 weeks'],
      ['Scope', '40+ screens & states'],
    ],
    sections: [
      {
        id: 'about',
        title: 'About',
        blocks: [
          {
            t: 'lead',
            x: 'Our app makes ordering food fast, simple, and affordable. Browse local favorites, place your order in seconds, and pick up tasty local meals without the hassle.',
          },
          { t: 'video', id: 'KbihNzhzx0s', cap: 'App walkthrough' },
        ],
      },
      {
        id: 'introduction',
        title: 'Introduction',
        blocks: [
          {
            t: 'p',
            x: 'Students at Halmstad University face a common problem: there are very few food options on campus and the existing ones are often expensive — usually ICA Maxi or the restaurant Intea, where meals cost around 140 SEK. So we asked: how might we improve the food experience on campus while keeping it convenient and affordable?',
          },
          {
            t: 'p',
            x: 'This led to Campus Crave, a mobile app introducing students to local food trucks directly on campus. Instead of one or two providers, a centralized food truck hub supported by a digital platform. Students explore menus and prices, order in advance, and pick up quickly during lunch. More trucks means more variety, and competition helps keep prices low.',
          },
          {
            t: 'p',
            x: 'Halmstad University had 6,226 registered full-time students in 2025; based on our survey around 1,000 buy their food at lunch. A food truck can prepare about 100 meals per hour, and lunch comes in two waves (~11:00 and ~12:00), giving roughly two peak hours. Five trucks would serve demand while keeping waits manageable.',
          },
          { t: 'demo', name: 'TruckCalc' },
          {
            t: 'gallery',
            items: [
              { src: m('app-campus-crave-02.webp'), cap: 'Storyboard' },
              { src: m('app-campus-crave-03.webp'), cap: 'Halmstad University map' },
            ],
          },
        ],
      },
      {
        id: 'contribution',
        title: 'My contribution',
        blocks: [
          {
            t: 'p',
            x: 'I took part in ideation, designed parts of the interface, and led the prototype walkthrough. I started with diagrams to visualize the structure and flow of the app — to understand the user journey, the system processes, and how parts of the service interact.',
          },
          {
            t: 'grid',
            items: [
              { k: 'User flowchart', v: ['Open app → browse → select restaurant → view menu → checkout → place order'] },
              { k: 'Service blueprint', v: ['Physical evidence & customer actions; trucks and menus are external resources'] },
              { k: 'Information architecture', v: ['Home vs menu screen: details, ratings, bookmarks, ordering'] },
            ],
          },
          { t: 'img', src: m('app-campus-crave-04.webp'), cap: 'User flowchart · service blueprint · information architecture' },
          { t: 'h', x: 'Interface' },
          {
            t: 'p',
            x: 'The interface had to be simple and fast for students on a short lunch break. I chose warm yellows and oranges, colours associated with food, energy and appetite (the “ketchup & mustard theory”), with bright contrast highlighting key actions. Buttons use rounded shapes and strong contrast so they read as interactive; Add to Cart and Checkout are emphasized; simple icons reduce cognitive load.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('app-campus-crave-05.webp'), cap: 'Menu tab icons' },
              { src: m('app-campus-crave-06.webp'), cap: 'Toggles & buttons' },
              { src: m('app-campus-crave-08.webp'), cap: 'Login button states' },
              { src: m('app-campus-crave-15.webp'), cap: 'Low → medium → high fidelity' },
            ],
          },
          { t: 'h', x: 'Walkthrough' },
          {
            t: 'p',
            x: 'Users log in with their student ID and land on the main menu — the central hub. A search bar and category icons (meals, snacks, vegan, desserts, drinks) enable quick browsing; recommended and best-selling meals aid discovery. After ordering, an order status window on the home screen gradually turns green as the order nears completion, or users can open My Orders and filter by active, completed or cancelled. Orders can be cancelled with a reason.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('app-campus-crave-09.webp'), cap: 'Log in & sign up' },
              { src: m('app-campus-crave-10.webp'), cap: 'Home — order status turning green' },
              { src: m('app-campus-crave-11.webp'), cap: 'Pickup point' },
              { src: m('app-campus-crave-12.webp'), cap: 'Profile & My Orders' },
              { src: m('app-campus-crave-14.webp'), cap: 'Menus' },
              { src: m('app-campus-crave-16.webp'), cap: 'Cancel order' },
              { src: m('app-campus-crave-17.webp'), cap: 'Contact & help' },
              { src: m('app-campus-crave-19.webp'), cap: 'Live tracking (shelved)' },
            ],
          },
          {
            t: 'p',
            x: 'Visualizing the user journey was essential in our pivot from delivery to pickup. The logic blueprint maps over 40 unique screens and states, so every edge case — order adjustments, real-time status updates — is accounted for.',
          },
          { t: 'img', src: m('app-campus-crave-18.webp'), cap: 'Application logic blueprint' },
        ],
      },
      {
        id: 'shelved',
        title: 'Shelved ideas',
        blocks: [
          { t: 'h', x: 'Delivery option' },
          {
            t: 'p',
            x: 'Auditing delivery routes revealed paying 30 kr for a maximum 600 m round trip. With hundreds of classrooms, location and access were a problem; drop-off points (entrances, cafeteria, library) helped, but if students already walk to a pickup point, what’s another 200 m? Swapping delivery for an 8-minute walk improved the bottom line and kept a highlight: encouraging students outside for a little walk.',
          },
          { t: 'h', x: 'GPS navigation' },
          {
            t: 'p',
            x: 'Standard GPS is often off by 5–10 m, can’t distinguish hallways or floors, and fails indoors. Dropping it also reduced reliance on heavy third-party APIs.',
          },
          { t: 'h', x: 'Food truck location' },
          {
            t: 'p',
            x: 'Scattered trucks mean students pick the closest rather than what they want, and most trucks need extra power. A centralized hub lets students compare, distributes customers fairly and simplifies crowd flow. Testing is needed for a definitive answer — the app already accommodates both.',
          },
          {
            t: 'gallery',
            items: [
              { src: m('app-campus-crave-20.gif'), cap: 'Map' },
              { src: m('app-campus-crave-21.gif'), cap: 'This way, that way' },
            ],
          },
        ],
      },
      {
        id: 'lessons',
        title: 'Lessons learnt',
        blocks: [
          {
            t: 'list',
            items: [
              'Clear communication and shared goals are the base of effective teamwork; coordinating design, development and content pushed me to plan ahead realistically.',
              'Early prototyping aligns expectations and catches issues before they grow; regular check-ins keep everyone synchronized.',
              'Divide responsibilities by strengths; give and receive constructive feedback supportively.',
              'Document decisions to keep everyone informed, and test together to keep the user perspective across roles.',
            ],
          },
        ],
      },
    ],
  },
]

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))

export const profile = {
  name: 'Chelsea Hong',
  role: 'Immersive Experience Designer',
  tagline:
    'Innovating multisensory and immersive XR experiences at the intersection of Digital Reality and Physical Reality.',
  bio: 'Studying in the field of Virtual Reality game design for the past 7 years, I aim to see the beauty in creativity.',
  focus: 'Combining olfactory elements with VR technology to increase immersion.',
  location: 'Helsingborg, Sweden',
  coords: '56.04°N 12.69°E',
  phone: '+46 (0)702 796 769',
  phoneHref: 'tel:+46702796769',
  email: 'chelseafoxsky@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chelsea-hong-a7311b361/',
  github: 'https://github.com/AizenDove',
  resume: 'https://drive.google.com/uc?export=download&id=1NNWp8zjan_4_oEqsFfL1Px5Zg6mveJ3F',
  resumePreview: 'https://drive.google.com/file/d/1NNWp8zjan_4_oEqsFfL1Px5Zg6mveJ3F/preview',
  portrait: m('about-me-01.webp'),
  // Lines lifted from her own project write-ups, shown as notebook pages on the home page.
  margins: [
    { x: 'Less is better than nothing.', from: 'vr-looking-glass', ctx: 'what mobility-reduced users told us in interviews' },
    { x: 'Behaviors cannot be enforced — they can only be encouraged and nudged.', from: 'expconnect', ctx: 'the question EXP Connect was built around' },
    { x: 'Never let a testing phase depend on perfect outdoor conditions.', from: 'vr-looking-glass', ctx: 'weather and drivers, learned the hard way' },
    { x: 'Pole is not neutral equipment. It carries history, stigma, and physical demands.', from: 'vr-pole-dancers', ctx: 'why VRPD is built around safety' },
    { x: 'Learning to let go of a well-known framework in favor of a more fitting structure was a key takeaway.', from: 'expconnect', ctx: 'on cutting the UNO version' },
  ],
  competencies: ['Unity', 'Unreal Engine', 'Blender', 'C#', 'Inventor', 'SolidWorks'],
  education: [
    { years: '2025 – 2027', title: 'Master’s Degree in Experience Design', org: 'Halmstad University', now: true },
    { years: '2022 – 2025', title: 'Bachelor’s Degree in Design of Digital and Immersive Experiences', org: 'Blekinge Institute of Technology' },
    { years: '2022', title: 'Game Design Courses', org: 'Luleå University of Technology' },
    { years: '2018 – 2019', title: 'High School Engineer in Technology', org: 'VBU Ludvika' },
    { years: '2015 – 2018', title: 'Technology High School', org: 'Hitachi Ludvika' },
  ],
  work: [{ years: '2019 – 2025', title: 'Storage Manager', org: 'Spendrups AB' }],
}
