import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'slider',
  title: 'Slider',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'แถบเลื่อนเลือกค่าตัวเลขในช่วงที่กำหนด — ใช้กับ Double หรือ Int.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `struct ContentView: View {
    @State private var volume: Double = 50

    var body: some View {
        VStack {
            Text("Volume: \\(Int(volume))")
            Slider(value: $volume, in: 0...100)
        }
        .padding()
    }
}`,
        },
      ],
      note: <>ค่า <C>value</C> ต้องเป็น <C>Double</C> หรือ <C>Float</C>. ถ้าอยากใช้ Int ให้แปลงตอนแสดงผลเหมือนตัวอย่าง.</>,
    },
    {
      id: 'step',
      title: 'กำหนด step (ค่าเพิ่มทีละเท่าไหร่)',
      examples: [
        {
          code: `// ขยับทีละ 5
Slider(value: $value, in: 0...100, step: 5)

// ขยับทีละ 0.1
Slider(value: $temperature, in: -10...40, step: 0.1)

// แบบ Int
@State private var rating: Double = 3
Slider(value: $rating, in: 1...5, step: 1)
Text("\\(Int(rating)) stars")`,
        },
      ],
    },
    {
      id: 'labels',
      title: 'ใส่ป้ายข้างซ้าย / ขวา',
      examples: [
        {
          code: `Slider(
    value: $volume,
    in: 0...100,
    step: 1
) {
    Text("Volume")          // accessibility label
} minimumValueLabel: {
    Image(systemName: "speaker.fill")
} maximumValueLabel: {
    Image(systemName: "speaker.wave.3.fill")
}
.padding(.horizontal)`,
        },
      ],
    },
    {
      id: 'tint',
      title: 'เปลี่ยนสี',
      examples: [
        {
          code: `Slider(value: $value, in: 0...100)
    .tint(.orange)

Slider(value: $brightness, in: 0...1)
    .tint(.yellow)`,
        },
      ],
    },
    {
      id: 'on-change',
      title: 'รู้ตอนผู้ใช้กำลังลาก / ปล่อย',
      intro: <p>ใช้ <C>onEditingChanged</C> เพื่อรู้ว่ากำลังลาก (true) หรือปล่อย (false).</p>,
      examples: [
        {
          code: `@State private var value: Double = 50
@State private var isEditing = false

Slider(value: $value, in: 0...100) { editing in
    isEditing = editing
    if !editing {
        // ปล่อยแล้ว — เซฟค่าได้
        save(value)
    }
}

Text(isEditing ? "Editing..." : "Final: \\(Int(value))")`,
        },
      ],
    },
  ],
}

export default topic
