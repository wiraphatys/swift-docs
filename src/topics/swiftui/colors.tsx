import type { Topic } from '@/lib/topics'

const topic: Topic = {
  slug: 'colors',
  title: 'Color',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'สีใน SwiftUI: ใช้ semantic ของ Apple, สร้างจาก RGB / hex, ปรับ opacity, และเลือกสีที่ตอบโจทย์ดาร์กโหมด.',
  sections: [
    {
      id: 'semantic',
      title: 'สี semantic ของ Apple',
      intro: <p>เลือกใช้สีพวกนี้ก่อน เพราะรองรับ light/dark, accessibility, และโทนแอปอัตโนมัติ.</p>,
      examples: [
        {
          code: `.foregroundStyle(.primary)         // ดำ/ขาวตามธีม
.foregroundStyle(.secondary)       // จาง
.foregroundStyle(.tertiary)        // จางกว่า
.foregroundStyle(.accentColor)     // สีเน้นของแอป

// สีตามชื่อมาตรฐาน — รองรับ light/dark อยู่แล้ว
.foregroundStyle(.red)
.foregroundStyle(.blue)
.foregroundStyle(.green)
.foregroundStyle(.orange)
.foregroundStyle(.purple)
.foregroundStyle(.pink)
.foregroundStyle(.yellow)
.foregroundStyle(.indigo)
.foregroundStyle(.mint)
.foregroundStyle(.teal)
.foregroundStyle(.cyan)
.foregroundStyle(.brown)
.foregroundStyle(.gray)`,
        },
      ],
    },
    {
      id: 'custom',
      title: 'สร้างสีเอง',
      examples: [
        {
          code: `// RGB (0-1)
Color(red: 0.94, green: 0.32, blue: 0.22)

// RGB (0-255) — ต้องหาร 255 เอง
Color(red: 240/255, green: 81/255, blue: 56/255)

// จาก asset catalog (รองรับ light/dark)
Color("BrandPrimary")     // ตั้งสองสีใน Assets.xcassets

// hex (ต้องเขียน extension เอง — Apple ไม่ให้มา)
extension Color {
    init(hex: UInt32) {
        let r = Double((hex >> 16) & 0xff) / 255
        let g = Double((hex >> 8) & 0xff) / 255
        let b = Double(hex & 0xff) / 255
        self.init(red: r, green: g, blue: b)
    }
}
Color(hex: 0xF05138)`,
        },
      ],
    },
    {
      id: 'opacity',
      title: 'Opacity',
      examples: [
        {
          code: `Color.blue.opacity(0.3)              // โปร่งแสง 30%
.foregroundStyle(.red.opacity(0.5))

// background สีจาง
Text("Highlight")
    .padding()
    .background(.yellow.opacity(0.3))`,
        },
      ],
    },
    {
      id: 'fill-area',
      title: 'ใช้เติมพื้นที่',
      examples: [
        {
          code: `// Color เป็น View ตรง ๆ ใส่ใน layout ได้เลย
ZStack {
    Color.blue.ignoresSafeArea()        // เต็มจอ
    Text("Hello").foregroundStyle(.white)
}

// เป็น divider แบ่งสัดส่วน
HStack(spacing: 0) {
    Color.red.frame(width: 100)
    Color.green
    Color.blue.frame(width: 100)
}
.frame(height: 50)

// ใช้ใน background
.background(Color.gray.opacity(0.1))`,
        },
      ],
    },
  ],
}

export default topic
