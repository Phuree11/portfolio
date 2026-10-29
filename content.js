/* ============================================================
   content.js — แก้เนื้อหาเว็บทั้งหมดที่ไฟล์นี้ไฟล์เดียว
   EDIT ALL SITE CONTENT HERE. No need to touch the other files.

   - ทุกข้อความมี 2 ภาษา: { th: '...', en: '...' }
   - เพิ่มผลงาน = copy บล็อก { ... } ใน projects แล้วแก้
   - ลบผลงาน   = ลบบล็อกนั้นทิ้ง (หรือใส่ hidden: true เพื่อซ่อนชั่วคราว)
   - รูปภาพ    = ใส่ไฟล์ในโฟลเดอร์ images/ แล้วอ้างชื่อไฟล์
   ============================================================ */

window.SITE = {

  /* ---------- ข้อมูลส่วนตัว / Profile ---------- */
  profile: {
    name: 'Phuree',                                   // ✏️ ชื่อสั้น (หน้า About)
    fullName: 'Phuree Sirikunchukit',                 // ✏️ ชื่อเต็ม (หน้าเปิด)
    role: { th: 'เกมดีไซเนอร์', en: 'Game Designer' },  // ✏️ ตำแหน่ง
    tagline: {
      th: 'ออกแบบเกมที่ผู้เล่นสนุก และเล่าเรื่องที่อยากเล่า',
      en: 'Crafting games players enjoy and stories worth telling.'
    }
    /* ปุ่มเมนูเพิ่ม (เช่น Resume / CV) — ลบ // แล้วใส่ลิงก์ ถ้าไม่ใส่จะไม่แสดง
    , cv: { label: { th: 'เรซูเม่', en: 'CV' }, url: 'https://...' } */
  },

  /* ---------- เกี่ยวกับ / About ---------- */
  about: {
    bio: [                                            // ✏️ แต่ละก้อนคือ 1 ย่อหน้า
      {
        th: 'สวัสดีครับ ผมเป็นนักศึกษาปี 3 สาขา Game Design วิทยาลัยศิลปะ สื่อ และเทคโนโลยี (CAMT) มหาวิทยาลัยเชียงใหม่ ผมอยากจะสร้างเกมที่ผู้เล่นสนุกกับการเล่นและได้เล่าเรื่องที่ผมอยากจะเล่า เพื่อส่งต่อความรู้สึกตื่นตาตื่นใจแบบเดียวกับที่ผมได้รับตอนก้าวเข้าสู่โลกของวิดีโอเกมครั้งแรก',
        en: 'Hi, I’m a third-year Game Design student at CAMT, Chiang Mai University. Driven by a passion to craft games that players truly enjoy and stories I love to tell, I want to recreate that same spark of wonder I felt the very first time I stepped into the world of video games.'
      }
    ],
    skills: [                                         // ✏️ กลุ่มทักษะ / เครื่องมือ (2 คอลัมน์)
      {
        title: { th: 'ทักษะ', en: 'Skills' },
        items: [
          { th: 'ออกแบบกลไกเกมและระบบ', en: 'Gameplay Mechanics & Systems Design' },
          { th: 'เขียน Game Design Document', en: 'Game Design Document' },
          { th: 'ออกแบบเรื่องเล่า (Narrative Design)', en: 'Narrative Design' },
          { th: 'บาลานซ์เกมและระบบเศรษฐกิจ', en: 'Game Balancing & Economy' },
          { th: 'จัดทำเอกสารและวางแผนงาน', en: 'Documentation & Planning' }
        ]
      },
      {
        title: { th: 'เครื่องมือ', en: 'Tools' },
        items: ['Figma', 'Unity', 'Yarn Spinner', 'Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe Lightroom', 'Docs']
      }
    ]
  },

  /* ---------- ผลงาน / Projects ----------
     การ์ดหน้า Work ใช้: cover (รูปปก), title, role
     หน้าผลงาน (กดเข้าไป) ใช้: media/cover → title → status + period → role → description → did → gameLink + links

     รูป: ใส่ไฟล์ในโฟลเดอร์ images/ ให้ชื่อตรงกับ cover (ยังไม่มีไฟล์ = ขึ้นกรอบว่าง)
     media: { type:'image', src:'images/x.jpg' } | { type:'youtube', id:'VIDEO_ID' } | { type:'video', src:'images/clip.mp4' }
       ชิ้นแรกเป็นภาพใหญ่ ที่เหลือเป็นภาพเล็ก (ไม่ใส่ media = ใช้ cover เป็นภาพใหญ่)                 */
  projects: [
    {
      id: 'bar-410',                                  // ใช้ในลิงก์ เช่น  .../#p-bar-410
      title: { th: 'Bar 410', en: 'Bar 410' },
      role: { th: 'เกมดีไซเนอร์ / นักเขียน', en: 'Game Designer / Writer' },
      status: { th: 'กำลังพัฒนา', en: 'Ongoing' },
      period: { th: '2025–ปัจจุบัน', en: '2025–Now' },
      cover: 'images/bar-410-cover.webp',
      media: [
        { type: 'image', src: 'images/bar-410-1.webp' },
        { type: 'image', src: 'images/bar-410-2.webp' },
        { type: 'image', src: 'images/bar-410-3.webp' },
        { type: 'image', src: 'images/bar-410-4.webp' }
      ],
      description: [
        {
          th: 'Bar 410 เป็นเกมจำลองชีวิตแนวเล่าเรื่องแบบ point-and-click บรรยากาศสบายๆ ที่ผู้เล่นได้เป็นบาร์เทนเดอร์มือใหม่ที่มาเปิดร้านในเมืองชนบทเงียบสงบ ไม่มีอะไรต้องรีบ มีแค่เสียงแก้วกระทบกันเบาๆ เครื่องดื่มที่ผสมอย่างตั้งใจ และคนแปลกหน้าที่ค่อยๆ กลายเป็นหน้าคุ้นเคย เบื้องหลังค็อกเทลทุกแก้วคือบทสนทนาที่รออยู่ และเบื้องหลังทุกบทสนทนาคือเรื่องราวชิ้นเล็กๆ ของใครสักคน',
          en: 'Bar 410 is a cozy point-and-click narrative simulation where you step into the life of a new bartender opening shop in a quiet rural town. There’s no rush here — just the soft clink of glasses, the pour of a well-made drink, and the strangers who slowly become familiar faces. Behind every cocktail is a conversation waiting to happen, and behind every conversation, a small piece of someone’s story.'
        }
      ],
      did: [
        { th: 'ออกแบบระบบหลักของเกม', en: 'Core Systems Design' },
        { th: 'ออกแบบเรื่องเล่า', en: 'Narrative Design' },
        { th: 'บริหารโปรเจกต์และพิตช์งาน', en: 'Project Management & Pitching' }
      ],
      gameLink: { url: 'https://phuree11.itch.io/project-bar-410' },
      links: [
        { label: 'GDD',            url: 'https://app.notion.com/p/Bar-410-Game-Design-Document-3ebbecb3f0648012bf61e84d90ccebc9?source=copy_link' },
        { label: 'Sheet',          url: 'https://docs.google.com/spreadsheets/d/1CCscgwxqSdEsZWyBZFZdHA0tSppedTwJfxKvU2vkthU/edit?usp=sharing' },
        { label: 'Figma Board',    url: 'https://www.figma.com/board/Y1cde8wBC0Sa3JujJFsggZ/Project-Cocktails?node-id=0-1&p=f&t=oTZvQ8UMeoYZ8Sku-0' },
        { label: 'Figma Design',   url: 'https://www.figma.com/design/w3rLXX1m0Vauw6uJx1GATK/Cocktails-is-a-game?node-id=0-1&p=f&t=YdphXCMmvWRWUG2K-0' }
      ]
    },

    {
      id: 'photo-project',
      title: { th: 'Photo Project', en: 'Photo Project' },
      role: { th: 'เกมดีไซเนอร์ / โปรแกรมเมอร์', en: 'Game Designer / Programmer' },
      status: { th: 'กำลังพัฒนา', en: 'Ongoing' },
      period: { th: '2026–ปัจจุบัน', en: '2026–Now' },
      cover: 'images/photo-project-cover.webp',
      media: [
        { type: 'image', src: 'images/photo-project-1.webp' },
        { type: 'image', src: 'images/photo-project-2.webp' },
        { type: 'image', src: 'images/photo-project-3.webp' },
        { type: 'image', src: 'images/photo-project-4.webp' },
        { type: 'image', src: 'images/photo-project-5.webp' }
      ],
      description: [
        {
          th: 'เกมสำรวจและถ่ายภาพมุมมองบุคคลที่สาม ผู้เล่นเดินสำรวจสภาพแวดล้อมเพื่อเฝ้าสังเกตและบันทึกสิ่งมีชีวิตต่างๆ ใช้กลไกการลอบเข้าใกล้สัตว์โดยไม่ให้มันตกใจ แล้วถ่ายภาพเพื่อปลดล็อกและเติมข้อมูลในสมุดบันทึก วงจรการเล่นหลักผสมการสำรวจแบบผ่อนคลาย การสังเกตสิ่งมีชีวิตอย่างมีกลยุทธ์ และความภูมิใจที่ได้สร้างคู่มือภาคสนามให้สมบูรณ์',
          en: 'A third-person exploration and photography game where players navigate the environment to observe and document various creatures. By utilizing stealth mechanics to safely approach wildlife without startling them, players capture photographs to unlock and complete detailed entries in their Journal. The core gameplay loop blends relaxed exploration, strategic creature observation, and the rewarding progression of building a comprehensive field guide.'
        }
      ],
      did: [
        { th: 'ออกแบบระบบหลักของเกม', en: 'Core System Design' },
        { th: 'เขียนโปรแกรมเกมเพลย์', en: 'Gameplay Programming' },
        { th: 'ออกแบบเสียง', en: 'Sound Design' }
      ],
      gameLink: { url: '', label: { th: 'กำลังพัฒนา', en: 'In development' } },
      links: [
        { label: 'Figma Board', url: 'https://www.figma.com/board/5tI37eupG6tLNKPkrgchQR/Project-The-Photo?node-id=733-808&t=QfjcBPKKRD8LsBni-0' }
      ]
    },

    {
      id: 'somtum-anomaly',
      title: { th: 'Somtum Anomaly', en: 'Somtum Anomaly' },
      role: { th: 'ออกแบบเกม / ออกแบบเสียง', en: 'Game Design / Sound Design' },
      status: { th: 'เสร็จแล้ว', en: 'Done' },
      period: { th: '2026', en: '2026' },
      cover: 'images/somtum-anomaly-cover.webp',
      media: [
        { type: 'image', src: 'images/somtum-anomaly-1.webp' },
        { type: 'image', src: 'images/somtum-anomaly-2.webp' },
        { type: 'image', src: 'images/somtum-anomaly-3.webp' },
        { type: 'image', src: 'images/somtum-anomaly-4.webp' },
        { type: 'image', src: 'images/somtum-anomaly-5.webp' },
        { type: 'image', src: 'images/somtum-anomaly-6.webp' }
      ],
      description: [
        {
          th: 'Somtum Anomaly เป็นเกมสยองขวัญแนวสังเกตความผิดปกติ ในบรรยากาศชวนขนลุกของร้านส้มตำริมทางแบบไทย ผู้เล่นต้องคอยจับตาสิ่งรอบตัวเพื่อหาความผิดปกติแปลกประหลาดที่ซ่อนอยู่ในร้านที่ดูธรรมดา ถ้ามีอะไรผิดธรรมชาติเกิดขึ้น ต้องรายงานหรือรับมือทันทีเพื่อเอาชีวิตรอดจนจบกะ',
          en: 'Somtum Anomaly is a psychological observation horror game set in the unsettling atmosphere of a local Thai street food stall. Players must carefully monitor their surroundings for bizarre, terrifying anomalies hidden within the seemingly mundane environment of a Somtum shop. If anything unnatural occurs, you must report or react to it immediately to survive your shift.'
        }
      ],
      did: [
        { th: 'ออกแบบเกมเพลย์', en: 'Gameplay Design' },
        { th: 'ออกแบบเสียง', en: 'Sound Design' }
      ],
      gameLink: { url: 'https://www.roblox.com/games/79399613552695/Somtum-Anomaly', label: { th: 'เล่นบน Roblox', en: 'Play on Roblox' } },
      links: [
        { label: 'Figma Board', url: 'https://www.figma.com/board/z4plj1JuLbWpSvYOPvvGUI/Somtum-Anomaly?node-id=364-347&t=5nVpHw542Y2koI3R-0' }
      ]
    },

    {
      id: 'itim-for-mom',
      title: { th: 'ITIM FOR MOM', en: 'ITIM FOR MOM' },
      role: { th: 'ออกแบบเกม / ออกแบบเสียง', en: 'Game Design / Sound Design' },
      status: { th: 'เสร็จแล้ว', en: 'Done' },
      period: { th: '2026 · Thailand Summer Jam 2026', en: '2026 · Thailand Summer Jam 2026' },
      cover: 'images/itim-for-mom-cover.webp',
      media: [
        { type: 'image', src: 'images/itim-for-mom-1.webp' },
        { type: 'image', src: 'images/itim-for-mom-2.webp' },
        { type: 'image', src: 'images/itim-for-mom-3.webp' },
        { type: 'image', src: 'images/itim-for-mom-4.webp' },
        { type: 'image', src: 'images/itim-for-mom-5.webp' }
      ],
      description: [
        {
          th: 'ITIM FOR MOM เป็นเกมแพลตฟอร์ม 2D แนวอาร์เคดสายฮา สร้างในงาน Thailand Summer Jam 2026 ผู้เล่นต้องฝ่าแดดร้อนเปรี้ยงไปซื้อไอศกรีมกลับมาให้แม่ ต้องรีบก่อนไอศกรีมละลาย และห้ามทำให้แม่โกรธเด็ดขาด',
          en: 'ITIM FOR MOM is a comedic 2D arcade platformer created for the Thailand Summer Jam 2026. Players must brave the scorching sun on a critical mission to buy and deliver ice cream to Mom. You must hurry before it melts and avoid making Mom angry at all costs.'
        }
      ],
      did: [
        { th: 'ออกแบบเกมเพลย์', en: 'Gameplay Design' },
        { th: 'ออกแบบด่าน', en: 'Map Design' },
        { th: 'ออกแบบเสียง', en: 'Sound Design' }
      ],
      gameLink: { url: 'https://dxrksom.itch.io/itim-for-mom' },
      links: [
        { label: 'Figma Design', url: 'https://www.figma.com/design/Kvo2zC1PJi1VDp4gXmeOYb/SUMMER-GAMEJAM-2026?node-id=0-1&t=Dv0RltRFuV9nRZqT-1' }
      ]
    },

    {
      id: 'no-im-not-a-fox',
      title: { th: 'No, I’m Not A Fox', en: 'No, I’m Not A Fox' },
      role: { th: 'ออกแบบเกม / ออกแบบเสียง', en: 'Game Design / Sound Design' },
      status: { th: 'เสร็จแล้ว', en: 'Done' },
      period: { th: '2026 · Global Game Jam 2026 Chiang Mai', en: '2026 · Global Game Jam 2026 Chiang Mai' },
      cover: 'images/no-im-not-a-fox-cover.webp',
      media: [
        { type: 'image', src: 'images/no-im-not-a-fox-1.webp' },
        { type: 'image', src: 'images/no-im-not-a-fox-2.webp' },
        { type: 'image', src: 'images/no-im-not-a-fox-3.webp' },
        { type: 'image', src: 'images/no-im-not-a-fox-4.webp' }
      ],
      description: [
        {
          th: 'No, I’m Not A Fox เป็นต้นแบบเกมสยองขวัญจิตวิทยาและ role-playing แบบ point-and-click สร้างในงาน Global Game Jam 2026: Chiang Mai ผู้เล่นรับบทคนย่างและเสิร์ฟอาหารในขบวนแห่จิ้งจอก Oji ช่วงเวลาที่วิญญาณโบราณออกมาเดินท่อง ต้องสังเกตลูกค้าให้ดีเพื่อหาจิ้งจอกที่แฝงตัวมา เสิร์ฟผิดออร์เดอร์ให้วิญญาณอาจถึงตาย',
          en: 'No, I’m Not A Fox is a point-and-click psychological horror and role-playing prototype created for the Global Game Jam 2026: Chiang Mai. You play as someone grilling and serving food during the Oji Fox Parade, a time when ancient spirits roam. You must carefully observe your customers to identify disguised foxes hidden among them. Serving the wrong order to a spirit could result in a fatal outcome.'
        }
      ],
      did: [
        { th: 'ออกแบบเกมเพลย์', en: 'Gameplay Design' },
        { th: 'ออกแบบเสียง', en: 'Sound Design' }
      ],
      gameLink: { url: 'https://dxrksom.itch.io/no-im-not-a-fox' },
      links: [
        { label: 'Canva Design', url: 'https://canva.link/bdllzc62o443m9v' }
      ]
    },

    {
      id: 'autobahn',
      title: { th: 'Autobahn', en: 'Autobahn' },
      role: { th: 'ออกแบบเกม / ออกแบบเสียง', en: 'Game Design / Sound Design' },
      status: { th: 'เสร็จแล้ว', en: 'Done' },
      period: { th: '2025 · Thailand Summer Jam 2025', en: '2025 · Thailand Summer Jam 2025' },
      cover: 'images/autobahn-cover.webp',
      media: [
        { type: 'image', src: 'images/autobahn-1.webp' },
        { type: 'image', src: 'images/autobahn-2.webp' },
        { type: 'image', src: 'images/autobahn-3.webp' },
        { type: 'image', src: 'images/autobahn-4.webp' }
      ],
      description: [
        {
          th: 'Autobahn เป็นเกมพัซเซิล-จำลองสถานการณ์ 2D สายฮา สร้างในงาน Thailand Summer Jam 2025 ผู้เล่นเป็นช่างซ่อมรถที่ต้องติดสอยห้อยตามไปทริปขับรถเที่ยว เพื่อคอยซ่อมรถตลอดทาง',
          en: 'Autobahn is a comedic 2D puzzle-simulation game created for the Thailand Summer Jam 2025. You play from the perspective of a car mechanic who must go along on a road trip specifically to fix cars along the way.'
        }
      ],
      did: [
        { th: 'ออกแบบเกมเพลย์', en: 'Gameplay Design' },
        { th: 'ออกแบบเสียง', en: 'Sound Design' }
      ],
      gameLink: { url: 'https://dxrksom.itch.io/autobahn' },
      links: []
    }
  ],

  /* ---------- ช่องทางติดต่อ / Contact ----------
     แต่ละกลุ่ม = หัวข้อ + แถว (ไม่มีแถว = ไม่แสดงกลุ่ม)
     แถว: { label: 'ชื่อช่องทาง', value: 'ข้อความที่โชว์', url: 'ลิงก์' }  — ไม่ใส่ url = แถวธรรมดา กดไม่ได้ */
  contact: {
    groups: [
      {
        title: { th: 'ติดต่องาน', en: 'For Work' },
        items: [
          { label: 'Email',    value: 'Phuree11@gmail.com',   url: 'mailto:Phuree11@gmail.com' },
          { label: 'Phone',    value: '+66 97 996 8141',      url: 'tel:+66979968141' },
          { label: 'LinkedIn', value: 'Phuree Sirikunchukit', url: 'https://www.linkedin.com/in/%E0%B8%A0%E0%B8%B9%E0%B8%A3%E0%B8%B5-%E0%B8%A8%E0%B8%B4%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B8%B8%E0%B8%A5%E0%B8%8A%E0%B8%B9%E0%B8%81%E0%B8%B4%E0%B8%88-205749341/' },
          { label: 'Itch.io',  value: 'phuree11.itch.io',     url: 'https://phuree11.itch.io/' }
        ]
      },
      {
        title: { th: 'ส่วนตัว', en: 'Personal' },
        items: [
          { label: 'Facebook', value: 'ภูรี ศิริกุลชูกิจ' },          // ✏️ ใส่ url ถ้าอยากให้กดได้
          { label: 'IG',       value: 'Phuree11',  url: 'https://www.instagram.com/phuree11/' },
          { label: 'Discord',  value: 'phuree' }
        ]
      }
    ]
  },

  /* ---------- ข้อความเมนู/ปุ่ม (ปกติไม่ต้องแก้) ---------- */
  ui: {
    nav:    { about: { th: 'เกี่ยวกับ', en: 'About' }, work: { th: 'ผลงาน', en: 'Work' }, contact: { th: 'ติดต่อ', en: 'Contact' }, back: { th: 'ย้อนกลับ', en: 'Back' } },
    hero:   { viewWork: { th: 'ดูผลงาน', en: 'View work' }, contactMe: { th: 'ติดต่อ', en: 'Get in touch' } },
    work:   { title: { th: 'ผลงาน', en: 'Work' }, empty: { th: 'ยังไม่มีผลงาน', en: 'No projects yet' } },
    about:  { title: { th: 'เกี่ยวกับ', en: 'About' } },
    contact:{ title: { th: 'ติดต่อ', en: 'Contact' } },
    detail: {
      description: { th: 'รายละเอียด', en: 'Description' },
      linkGame:    { th: 'ลิงก์เกม', en: 'Link Game' },
      phBig:       { th: 'รูป/วิดีโอ', en: 'Image / Video' },
      phSmall:     { th: 'รูป', en: 'Image' },
      video:       { th: 'วิดีโอ', en: 'Video' }
    },
    footer: { top: { th: 'กลับขึ้นบน ↑', en: 'Back to top ↑' } }
  }
};
