import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'alignment',
  title: 'Alignment',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'จัดตำแหน่ง view ใน Stack และ frame: leading, center, trailing, top, bottom และมุมต่าง ๆ.',
  sections: [
    {
      id: 'in-stack',
      title: 'Alignment ใน Stack',
      intro: <p>VStack alignment = แกนนอน. HStack alignment = แกนตั้ง. ZStack alignment = ทั้งสองแกน.</p>,
      examples: [
        {
          code: `// VStack — alignment แนวนอน
VStack(alignment: .leading) {
    Text("Title")
    Text("Subtitle is longer text")
}
// .leading = ชิดซ้าย, .trailing = ชิดขวา, .center = ตรงกลาง (default)

// HStack — alignment แนวตั้ง
HStack(alignment: .top) {
    Image(systemName: "star")
    Text("Tall content goes here\\nLine 2")
}
// .top = ชิดบน, .bottom = ชิดล่าง, .center = กลาง (default)
// .firstTextBaseline = ตามเส้นล่างของบรรทัดแรก (เหมาะกับข้อความ)

// ZStack — มุมต่าง ๆ
ZStack(alignment: .topTrailing) {
    Color.gray
    Text("Badge").padding(8).background(.red)
}`,
        },
      ],
    },
    {
      id: 'in-frame',
      title: 'Alignment ใน frame',
      intro: <p>เมื่อ frame ใหญ่กว่า content ใช้ alignment กำหนดว่า content อยู่ตรงไหน.</p>,
      examples: [
        {
          code: `Text("Left")
    .frame(maxWidth: .infinity, alignment: .leading)
    .background(.gray.opacity(0.2))

Text("Right")
    .frame(maxWidth: .infinity, alignment: .trailing)

Text("Top")
    .frame(maxHeight: 200, alignment: .top)

// alignment ที่ใช้ได้ใน frame
.center                  // default
.leading
.trailing
.top
.bottom
.topLeading
.topTrailing
.bottomLeading
.bottomTrailing
.leadingFirstTextBaseline
.trailingFirstTextBaseline`,
        },
      ],
    },
    {
      id: 'multiline-text',
      title: 'จัดข้อความหลายบรรทัด',
      intro: <p>ใช้ <C>.multilineTextAlignment()</C> สำหรับการจัดข้อความ ไม่ใช่ alignment ของ Stack.</p>,
      examples: [
        {
          code: `Text("ข้อความยาว ๆ ที่กินหลายบรรทัด เพราะกรอบแคบ")
    .multilineTextAlignment(.center)        // .leading / .trailing / .center
    .frame(width: 200)

// ความต่าง: VStack alignment vs multilineTextAlignment
VStack(alignment: .leading) {
    Text("Title")
        .multilineTextAlignment(.leading)   // ตัวข้อความเอง
}
// VStack alignment คุมตำแหน่งของ Text ใน VStack
// multilineTextAlignment คุมการจัดบรรทัดในข้อความเอง`,
        },
      ],
    },
    {
      id: 'overlay-bg',
      title: 'Alignment ใน .overlay / .background',
      examples: [
        {
          code: `// บัตรประจำตัว — แปะรูป QR ที่มุมขวาล่าง
Image("card")
    .resizable()
    .frame(width: 300, height: 180)
    .overlay(alignment: .bottomTrailing) {
        Image("qr")
            .resizable()
            .frame(width: 60, height: 60)
            .padding(8)
    }

// ใส่พื้นหลังด้านหลัง content บางส่วน
Text("Highlighted")
    .padding()
    .background(alignment: .bottom) {
        Color.yellow
            .frame(height: 4)
    }`,
        },
      ],
    },
    {
      id: 'common-uses',
      title: 'Pattern ใช้บ่อย',
      examples: [
        {
          code: `// Title ชิดซ้าย เต็มกว้าง
Text("Section Title")
    .font(.headline)
    .frame(maxWidth: .infinity, alignment: .leading)
    .padding(.horizontal)

// 2 ปุ่มซ้าย-ขวา
HStack {
    Button("Cancel") { }
    Spacer()
    Button("OK") { }
}

// บัตรที่ข้อความอยู่ล่างซ้ายของรูป
ZStack(alignment: .bottomLeading) {
    Image("hero").resizable()
    VStack(alignment: .leading) {
        Text("Title").bold().foregroundStyle(.white)
        Text("Subtitle").foregroundStyle(.white.opacity(0.8))
    }
    .padding()
}`,
        },
      ],
    },
  ],
}

export default topic
