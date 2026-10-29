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
    name: 'Phuree',                                   // ✏️ ชื่อเล่น/ชื่อสั้น (หน้า About)
    fullName: 'Phuree Sirikunchukit',                 // ✏️ ชื่อเต็ม (หน้าเปิด)
    role: { th: 'เกมดีไซเนอร์', en: 'Game Designer' },  // ✏️ ตำแหน่ง
    tagline: {                                        // ✏️ ประโยคแนะนำตัวบนสุด
      th: 'ออกแบบเกมที่เล่าเรื่องผ่านระบบ ตัวละคร และบทสนทนา',
      en: 'Designing games that tell stories through systems, characters and dialogue.'
    }
    /* ปุ่มที่ 4 บนเมนู (เช่น Resume / CV) — ลบ // หน้าบรรทัดล่างแล้วใส่ลิงก์ ถ้าไม่ใส่จะไม่แสดง
    , cv: { label: { th: 'เรซูเม่', en: 'CV' }, url: 'https://...' } */
  },

  /* ---------- เกี่ยวกับ / About ---------- */
  about: {
    bio: [                                            // ✏️ แต่ละก้อนคือ 1 ย่อหน้า
      {
        th: 'เกมดีไซเนอร์ที่ทำเกมแนวเล่าเรื่อง สนใจการออกแบบตัวละคร บทสนทนา และระบบเกมที่ทำให้ผู้เล่นรู้สึกถึงเรื่องราวผ่านการเล่น',
        en: 'Game designer making narrative-driven games. Focused on character design, dialogue, and game systems that let players feel a story through play.'
      }
    ],
    skills: [                                         // ✏️ กลุ่มทักษะ / เครื่องมือ
      {
        title: { th: 'ทักษะ', en: 'Skills' },
        items: [
          { th: 'ออกแบบตัวละครและเนื้อเรื่อง', en: 'Narrative & character design' },
          { th: 'ออกแบบระบบเกม', en: 'Systems design' },
          { th: 'เขียนบทสนทนาในเกม', en: 'Dialogue writing' },
          { th: 'วางแผนโปรเจกต์และ Roadmap', en: 'Project planning & roadmap' }
        ]
      },
      {
        title: { th: 'เครื่องมือ', en: 'Tools' },
        items: ['Yarn Spinner', 'Spine 2D', 'Excel / Sheets', 'Steam (Steamworks)']
      }
    ]
  },

  /* ---------- ผลงาน / Projects ----------
     หน้าผลงานแต่ละชิ้นเรียงตามดีไซน์ใน Figma:
       รูป/วิดีโอ (media) → ชื่อ → สถานะ + ช่วงเวลา + บทบาท → คำอธิบาย (description)
       → รายการ "ทำอะไรบ้าง" (did) → ปุ่มลิงก์เกม (gameLink) + ปุ่มลิงก์อื่นๆ (links)

     media: { type:'image', src:'images/x.jpg', caption:{...} }
            { type:'youtube', id:'VIDEO_ID' }
            { type:'video', src:'images/clip.mp4' }
       ใส่ได้หลายชิ้น (ดีไซน์ออกแบบไว้ 6 ช่อง) ชิ้นแรกเป็นภาพใหญ่ ที่เหลือเป็นภาพเล็ก กดแล้วสลับขึ้นมาเป็นภาพใหญ่
       ถ้าไม่ใส่ media จะใช้ cover เป็นภาพเดียว                                          */
  projects: [
    {
      id: 'bar-410',                                  // ใช้ใน URL เช่น  yoursite.com/#p-bar-410
      title: { th: 'Bar 410', en: 'Bar 410' },
      tag: { th: 'เกมเล่าเรื่อง 2.5D แบบ Point-and-Click', en: '2.5D Point-and-Click Narrative Game' },
      status: { th: 'กำลังพัฒนา', en: 'Ongoing' },
      period: { th: '2025–ปัจจุบัน', en: '2025–Now' },
      role: { th: 'เกมดีไซเนอร์', en: 'Game Designer' },
      summary: {                                      // ข้อความสั้นบนการ์ดหน้าแรก
        th: 'เกมเล่าเรื่องในบาร์เล็กๆ ชนบทยุโรป ผู้เล่นเป็นบาร์เทนเดอร์มือใหม่ที่ได้ทำความรู้จักลูกค้าประจำ 8 คนตลอดหลายวันในเกม',
        en: 'A narrative game set in a small European countryside bar. You are a new bartender getting to know eight regulars over several in-game days.'
      },
      cover: 'images/bar410-cover.jpg',                // ✏️ รูปปก (ไม่มีไฟล์ก็ไม่เป็นไร จะขึ้นกรอบว่าง)
      media: [
        // { type: 'image', src: 'images/bar410-01.jpg', caption: { th: 'ฉากในบาร์', en: 'Bar scene' } },
        // { type: 'youtube', id: 'XXXXXXXXXXX' },
      ],
      description: [                                  // แต่ละก้อนคือ 1 ย่อหน้า
        {
          th: 'เกมเล่าเรื่องในบาร์เล็กๆ ชนบทยุโรป แรงบันดาลใจจาก Coffee Talk และ VA-11 Hall-A ผู้เล่นเป็นบาร์เทนเดอร์มือใหม่ที่ได้รู้จักตัวละคร 8 คน แต่ละคนมีเบื้องหลัง น้ำเสียง และกลไกป้องกันตัวเองที่ต่างกัน มีทั้งตอนจบแบบ Best End และ Normal End ผ่านโครงสร้างข้ามเวลาหนึ่งปี',
          en: 'A narrative game set in a small European countryside bar, inspired by Coffee Talk and VA-11 Hall-A. You play a new bartender meeting eight characters, each with a distinct backstory, voice and defense mechanism, with Best End and Normal End outcomes built on a one-year time skip.'
        },
        {
          th: 'ตอนนี้เดโมครอบคลุมวันที่ 1–5 บทสนทนาของวันที่ 1 เขียนเสร็จแล้ว',
          en: 'The demo currently covers Days 1–5, and the Day 1 dialogue is written.'
        }
      ],
      did: [                                          // "ทำอะไรบ้าง" — ทีละข้อ
        { th: 'ออกแบบเนื้อเรื่องและตัวละครทั้ง 8 ตัว: เบื้องหลัง น้ำเสียง กลไกป้องกันตัวเอง และตอนจบ', en: 'Narrative design and eight characters: backstories, voice, defense mechanisms and endings' },
        { th: 'ออกแบบระบบทำค็อกเทล: สัดส่วน 10 ส่วน มินิเกม Shaking/Stirring กลไกน้ำแข็ง และระบบ Perfect/Acceptable/Fail', en: 'Cocktail crafting system: 10-part split, Shaking/Stirring mini-games, ice mechanic and Perfect/Acceptable/Fail rating' },
        { th: 'เขียนบทสนทนาด้วย Yarn Spinner พร้อมกำหนดรูปแบบการตั้งชื่อ node และแท็กบรรทัดให้นักเขียนกับโปรแกรมเมอร์ใช้ร่วมกัน', en: 'Dialogue in Yarn Spinner with a node-naming and line-tagging format shared by writers and programmers' },
        { th: 'วางแผน Roadmap ของโปรเจกต์', en: 'Project roadmap planning' }
      ],
      gameLink: { url: '' },                          // ✏️ ลิงก์เกม (เช่น Steam / itch.io) — ว่างไว้ = ปุ่มสีจาง กดไม่ได้
      links: [                                        // ✏️ ปุ่มลิงก์อื่นๆ — ถ้าไม่ใส่ url จะไม่แสดงปุ่ม
        { label: { th: 'ลิงก์ Figma', en: 'Link to Figma' }, url: '' },
        { label: { th: 'ลิงก์ GDD',   en: 'Link to GDD'   }, url: '' }
      ]
    },

    {
      id: 'project-02',
      title: { th: 'ชื่อผลงานที่ 2', en: 'Project Two' },
      tag: { th: 'ตัวอย่าง — แก้ไขที่ content.js', en: 'SAMPLE — edit in content.js' },
      status: { th: 'เสร็จสมบูรณ์', en: 'Completed' },
      period: { th: '2025', en: '2025' },
      role: { th: 'บทบาทของคุณ', en: 'Your role' },
      summary: {
        th: 'เขียนสรุป 1–2 ประโยค: เกมนี้คืออะไร และคุณแก้ปัญหาอะไรในฐานะดีไซเนอร์',
        en: 'One or two sentences: what the game is, and which design problem you solved.'
      },
      cover: 'images/project02-cover.jpg',
      media: [],
      description: [
        { th: 'อธิบายเกม ปัญหาที่เจอ และผลลัพธ์ของการออกแบบ', en: 'Describe the game, the problem, and the result of your design.' }
      ],
      did: [
        { th: 'สิ่งที่คุณทำข้อที่ 1', en: 'What you did, item 1' },
        { th: 'สิ่งที่คุณทำข้อที่ 2', en: 'What you did, item 2' }
      ],
      gameLink: { url: '' },
      links: []
    },

    {
      id: 'project-03',
      title: { th: 'ชื่อผลงานที่ 3', en: 'Project Three' },
      tag: { th: 'ตัวอย่าง — แก้ไขที่ content.js', en: 'SAMPLE — edit in content.js' },
      status: { th: 'ต้นแบบ', en: 'Prototype' },
      period: { th: '2025', en: '2025' },
      role: { th: 'บทบาทของคุณ', en: 'Your role' },
      summary: {
        th: 'ผลงานชิ้นที่ 3 อาจเป็น game jam, prototype หรือเอกสารดีไซน์ (GDD) ก็ได้',
        en: 'A third piece: a game jam entry, a prototype, or a design document (GDD).'
      },
      cover: 'images/project03-cover.jpg',
      media: [],
      description: [
        { th: 'อธิบายสั้นๆ ว่าคุณทำอะไร', en: 'Briefly explain what you did.' }
      ],
      did: [
        { th: 'สิ่งที่คุณทำ', en: 'What you did' }
      ],
      gameLink: { url: '' },
      links: []
    }
  ],

  /* ---------- ช่องทางติดต่อ / Contact ----------
     ⚠️ เปลี่ยนค่าตัวอย่างเหล่านี้ก่อนเผยแพร่จริง! */
  contact: {
    /* แต่ละกลุ่ม = หัวข้อ 1 อัน + แถวช่องทางติดต่อ (ไม่มีแถว = ไม่แสดงกลุ่มนั้น)
       แถว: { label: 'ชื่อช่องทาง', value: 'ข้อความที่โชว์', url: 'ลิงก์' }            */
    groups: [
      {
        title: { th: 'ติดต่องาน', en: 'For Work' },
        items: [
          { label: 'Email',    value: 'Phuree11@gmail.com',        url: 'mailto:Phuree11@gmail.com' },
          { label: 'LinkedIn', value: 'linkedin.com/in/your-name', url: 'https://linkedin.com/in/your-name' },  // ✏️ แก้หรือลบ
          { label: 'Itch.io',  value: 'your-name.itch.io',         url: 'https://your-name.itch.io' }            // ✏️ แก้หรือลบ
        ]
      },
      {
        title: { th: 'ส่วนตัว', en: 'Personal' },
        items: [
          /* { label: 'Facebook', value: '...', url: 'https://facebook.com/...' },
             { label: 'IG',       value: '@...', url: 'https://instagram.com/...' },
             { label: 'Line',     value: '...',  url: 'https://line.me/ti/p/~...' } */
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
