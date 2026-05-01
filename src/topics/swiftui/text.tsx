import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'text',
  title: 'Text',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'แสดงตัวอักษรใน SwiftUI ปรับแต่งสี ฟอนต์ น้ำหนัก ขนาด การจัดวาง — modifier ที่ใช้บ่อยทั้งหมด.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `Text("Hello, SwiftUI")

// แทรกค่าจากตัวแปร (string interpolation)
let name = "World"
Text("Hello, \\(name)")

// ขึ้นบรรทัดใหม่
Text("Line 1\\nLine 2")`,
        },
      ],
    },
    {
      id: 'color',
      title: 'เปลี่ยนสี',
      intro: <p>ใช้ <C>.foregroundStyle(_:)</C> (iOS 15+, แนะนำ) แทน <C>.foregroundColor(_:)</C> ที่ deprecated.</p>,
      examples: [
        {
          code: `Text("สีแดง")
    .foregroundStyle(.red)

Text("สีจาก hex")
    .foregroundStyle(Color(red: 0.94, green: 0.32, blue: 0.22))

Text("สีตามธีมระบบ (เปลี่ยนตาม light/dark)")
    .foregroundStyle(.primary)        // ดำในไลท์ / ขาวในดาร์ก
    .foregroundStyle(.secondary)      // จาง

Text("สี + opacity")
    .foregroundStyle(.blue.opacity(0.5))`,
        },
      ],
    },
    {
      id: 'font',
      title: 'ฟอนต์ + ขนาด',
      examples: [
        {
          code: `// ขนาดมาตรฐานของระบบ (รองรับ Dynamic Type)
Text("Title").font(.largeTitle)
Text("Heading").font(.title)
Text("Subheading").font(.title2)
Text("Body").font(.body)
Text("Caption").font(.caption)

// ขนาดเอง
Text("Custom").font(.system(size: 24))

// design variants
Text("Rounded").font(.system(.title, design: .rounded))
Text("Mono").font(.system(.body, design: .monospaced))`,
        },
      ],
    },
    {
      id: 'weight-style',
      title: 'น้ำหนัก / สไตล์',
      examples: [
        {
          code: `Text("Bold").bold()
Text("Italic").italic()
Text("Underline").underline()
Text("Strikethrough").strikethrough()

// ปรับน้ำหนักผ่าน fontWeight
Text("Heavy").fontWeight(.heavy)
Text("Light").fontWeight(.light)

// ผสมหลายอัน
Text("Important")
    .font(.title)
    .bold()
    .foregroundStyle(.red)`,
        },
      ],
    },
    {
      id: 'multiline',
      title: 'หลายบรรทัด + จัดกลาง',
      examples: [
        {
          code: `Text("ข้อความยาว ๆ ที่จะตัดบรรทัด เมื่อใส่ความกว้าง")
    .multilineTextAlignment(.center)        // .leading / .trailing / .center
    .lineLimit(2)                            // จำกัดสูงสุด 2 บรรทัด
    .truncationMode(.tail)                   // ตัด ... ที่ปลาย (.head/.middle/.tail)
    .frame(width: 200)

// ย่อตัวอักษรให้พอกับกรอบ (แทนการ truncate)
Text("Long single line text")
    .lineLimit(1)
    .minimumScaleFactor(0.5)                 // ย่อได้ถึง 50% ของขนาดเดิม

// ระยะห่างระหว่างบรรทัด
Text("บรรทัดแรก\\nบรรทัดสอง")
    .lineSpacing(8)`,
        },
      ],
    },
    {
      id: 'concat',
      title: 'ต่อ Text หลายอัน',
      intro: <p>Text + Text จะรวมเป็นชิ้นเดียว แต่ละชิ้นใช้ modifier ต่างกันได้.</p>,
      examples: [
        {
          code: `Text("Hello, ")
    .foregroundStyle(.secondary)
+ Text("World")
    .foregroundStyle(.blue)
    .bold()
+ Text("!")`,
        },
      ],
    },
    {
      id: 'format',
      title: 'แสดงตัวเลข / วันที่',
      examples: [
        {
          code: `let price = 1234.5
Text(price, format: .currency(code: "THB"))   // ฿1,234.50
Text(price, format: .number.precision(.fractionLength(2)))

let date = Date()
Text(date, style: .date)        // 1 ม.ค. 2026
Text(date, style: .time)        // 15:30
Text(date, style: .relative)    // 2 minutes ago`,
        },
      ],
    },
  ],
}

export default topic
