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
    name: 'Phuree',                                   // ✏️ ชื่อที่แสดง
    role: { th: 'เกมดีไซเนอร์', en: 'Game Designer' },  // ✏️ ตำแหน่ง
    org: 'Unjob Production',                          // ✏️ ทีม/บริษัท
    tagline: {                                        // ✏️ ประโยคแนะนำตัวบนสุด
      th: 'ออกแบบเกมที่เล่าเรื่องผ่านระบบ ตัวละคร และบทสนทนา',
      en: 'Designing games that tell stories through systems, characters and dialogue.'
    }
  },

  /* ---------- เกี่ยวกับ / About ---------- */
  about: {
    bio: [                                            // ✏️ แต่ละก้อนคือ 1 ย่อหน้า
      {
        th: 'เกมดีไซเนอร์ที่ Unjob Production ทีมนักศึกษามหาวิทยาลัยที่กำลังพัฒนาเกมแนวเล่าเรื่อง สนใจการออกแบบตัวละคร บทสนทนา และระบบเกมที่ทำให้ผู้เล่นรู้สึกถึงเรื่องราวผ่านการเล่น',
        en: 'Game designer at Unjob Production, a team of university students building narrative-driven games. Focused on character design, dialogue, and game systems that let players feel a story through play.'
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
     accent: 'y' เหลือง | 'g' เขียว | 'r' แดง  (สีของเส้นนีออนบนการ์ด)
     media:  { type:'image', src:'images/x.jpg', caption:{...} }
             { type:'youtube', id:'VIDEO_ID' }
             { type:'video', src:'images/clip.mp4' }                         */
  projects: [
    {
      id: 'bar-410',                                  // ใช้ใน URL เช่น  yoursite.com/#p-bar-410
      accent: 'y',
      title: { th: 'Bar 410', en: 'Bar 410' },
      tag: { th: 'เกมเล่าเรื่อง 2.5D แบบ Point-and-Click', en: '2.5D Point-and-Click Narrative Game' },
      year: '2026',
      status: { th: 'กำลังพัฒนา (ชื่อเรียกชั่วคราว)', en: 'In development (working title)' },
      role: { th: 'เกมดีไซเนอร์ — เนื้อเรื่อง ตัวละคร บทสนทนา และระบบ', en: 'Game Designer — narrative, characters, dialogue & systems' },
      summary: {
        th: 'เกมเล่าเรื่องในบาร์เล็กๆ ชนบทยุโรป ผู้เล่นเป็นบาร์เทนเดอร์มือใหม่ที่ได้ทำความรู้จักลูกค้าประจำ 8 คนตลอดหลายวันในเกม',
        en: 'A narrative game set in a small European countryside bar. You are a new bartender getting to know eight regulars over several in-game days.'
      },
      cover: 'images/bar410-cover.jpg',                // ✏️ ใส่รูปปกที่นี่ (ไม่มีไฟล์ก็ไม่เป็นไร จะขึ้นกรอบว่าง)
      media: [
        // { type: 'image', src: 'images/bar410-01.jpg', caption: { th: 'ฉากในบาร์', en: 'Bar scene' } },
        // { type: 'youtube', id: 'XXXXXXXXXXX' }
      ],
      sections: [
        {
          h: { th: 'แนวคิด', en: 'Concept' },
          p: {
            th: 'แรงบันดาลใจจาก Coffee Talk และ VA-11 Hall-A ตัวละครทั้ง 8 มีเบื้องหลัง น้ำเสียง และกลไกป้องกันตัวเองที่ต่างกัน และมีทั้งตอนจบแบบ Best End และ Normal End ผ่านโครงสร้างข้ามเวลาหนึ่งปี',
            en: 'Inspired by Coffee Talk and VA-11 Hall-A. All eight characters have distinct backstories, voice profiles and defense mechanisms, with both Best End and Normal End outcomes built on a one-year time skip.'
          }
        },
        {
          h: { th: 'ระบบทำค็อกเทล', en: 'Cocktail crafting system' },
          p: {
            th: 'สัดส่วนวัตถุดิบ 10 ส่วนระหว่างแอลกอฮอล์และมิกเซอร์ พร้อมมินิเกม Shaking และ Stirring กลไกน้ำแข็ง และระบบประเมินผล Perfect / Acceptable / Fail',
            en: 'A 10-part ingredient split between alcohol and mixers, with Shaking and Stirring mini-games, an ice mechanic, and a Perfect / Acceptable / Fail rating system.'
          }
        },
        {
          h: { th: 'เวิร์กโฟลว์บทสนทนา', en: 'Dialogue workflow' },
          p: {
            th: 'เขียนด้วย Yarn Spinner โดยวางรูปแบบการตั้งชื่อ node และการติดแท็กบรรทัดไว้ให้ทั้งนักเขียนและโปรแกรมเมอร์ทำงานร่วมกันได้',
            en: 'Written in Yarn Spinner with a node-naming convention and line-tagging format so writers and programmers can work from the same scripts.'
          }
        },
        {
          h: { th: 'สถานะตอนนี้', en: 'Current status' },
          p: {
            th: 'เดโมครอบคลุมวันที่ 1–5 บทของวันที่ 1 เสร็จแล้ว กำลังเตรียมตัวสำหรับการเปิดตัวบน Steam',
            en: 'The demo covers Days 1–5. Day 1 dialogue is written, and the team is preparing for Steam visibility milestones.'
          }
        }
      ],
      links: [
        // { label: { th: 'หน้า Steam', en: 'Steam page' }, url: 'https://store.steampowered.com/app/...' }
      ]
    },

    {
      id: 'project-02',
      accent: 'g',
      title: { th: 'ชื่อผลงานที่ 2', en: 'Project Two' },
      tag: { th: 'ตัวอย่าง — แก้ไขที่ content.js', en: 'SAMPLE — edit in content.js' },
      year: '2025',
      status: { th: 'เสร็จสมบูรณ์', en: 'Completed' },
      role: { th: 'บทบาทของคุณ', en: 'Your role' },
      summary: {
        th: 'เขียนสรุป 1–2 ประโยค: เกมนี้คืออะไร และคุณแก้ปัญหาอะไรในฐานะดีไซเนอร์',
        en: 'One or two sentences: what the game is, and which design problem you solved.'
      },
      cover: 'images/project02-cover.jpg',
      media: [],
      sections: [
        { h: { th: 'ปัญหา', en: 'Problem' }, p: { th: 'ผู้เล่นหรือทีมเจอปัญหาอะไร', en: 'What problem did players or the team face?' } },
        { h: { th: 'สิ่งที่ทำ', en: 'Process' }, p: { th: 'ขั้นตอนการออกแบบ เช่น prototype, playtest, ปรับแก้', en: 'Design steps: prototype, playtest, iteration.' } },
        { h: { th: 'ผลลัพธ์', en: 'Result' }, p: { th: 'ผลที่เกิดขึ้น ตัวเลข หรือฟีดแบ็กจากผู้เล่น', en: 'What changed: numbers or player feedback.' } }
      ],
      links: []
    },

    {
      id: 'project-03',
      accent: 'r',
      title: { th: 'ชื่อผลงานที่ 3', en: 'Project Three' },
      tag: { th: 'ตัวอย่าง — แก้ไขที่ content.js', en: 'SAMPLE — edit in content.js' },
      year: '2025',
      status: { th: 'ต้นแบบ', en: 'Prototype' },
      role: { th: 'บทบาทของคุณ', en: 'Your role' },
      summary: {
        th: 'ผลงานชิ้นที่ 3 อาจเป็น game jam, prototype หรือเอกสารดีไซน์ (GDD) ก็ได้',
        en: 'A third piece: a game jam entry, a prototype, or a design document (GDD).'
      },
      cover: 'images/project03-cover.jpg',
      media: [],
      sections: [
        { h: { th: 'รายละเอียด', en: 'Details' }, p: { th: 'อธิบายสั้นๆ ว่าคุณทำอะไร', en: 'Briefly explain what you did.' } }
      ],
      links: []
    }
  ],

  /* ---------- ช่องทางติดต่อ / Contact ----------
     ⚠️ เปลี่ยนค่าตัวอย่างเหล่านี้ก่อนเผยแพร่จริง! */
  contact: {
    lead: {
      th: 'สนใจคุยเรื่องเกม ทีม หรือโอกาสร่วมงาน ทักมาได้เลย',
      en: 'Interested in games, teams, or working together? Say hello.'
    },
    items: [
      { label: 'Email',    value: 'your@email.com',            url: 'mailto:your@email.com' },
      { label: 'LinkedIn', value: 'linkedin.com/in/your-name', url: 'https://linkedin.com/in/your-name' },
      { label: 'Itch.io',  value: 'your-name.itch.io',         url: 'https://your-name.itch.io' }
    ]
  },

  /* ---------- ข้อความเมนู/ปุ่ม (ปกติไม่ต้องแก้) ---------- */
  ui: {
    nav:      { projects: { th: 'ผลงาน', en: 'Projects' }, about: { th: 'เกี่ยวกับ', en: 'About' }, contact: { th: 'ติดต่อ', en: 'Contact' } },
    hero:     { viewWork: { th: 'ดูผลงาน', en: 'View work' }, contactMe: { th: 'ติดต่อ', en: 'Get in touch' } },
    projects: { title: { th: 'ผลงาน', en: 'Selected Work' }, open: { th: 'ดูรายละเอียด', en: 'Case study' }, empty: { th: 'ยังไม่มีผลงาน', en: 'No projects yet' } },
    about:    { title: { th: 'เกี่ยวกับ', en: 'About' } },
    contact:  { title: { th: 'ติดต่อ', en: 'Contact' } },
    modal:    { role: { th: 'บทบาท', en: 'Role' }, year: { th: 'ปี', en: 'Year' }, status: { th: 'สถานะ', en: 'Status' }, close: { th: 'ปิด', en: 'Close' }, links: { th: 'ลิงก์', en: 'Links' }, noImage: { th: 'ยังไม่มีรูป', en: 'No image yet' } },
    footer:   { top: { th: 'กลับขึ้นบน ↑', en: 'Back to top ↑' } }
  }
};
