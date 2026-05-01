import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'shapes',
  title: 'Shapes',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'รูปทรงพื้นฐาน: Rectangle, RoundedRectangle, Capsule, Circle, Ellipse — ใช้เป็นพื้นหลัง, ขอบ, divider, badge ฯลฯ.',
  sections: [
    {
      id: 'types',
      title: 'รูปทรงที่ใช้บ่อย',
      examples: [
        {
          code: `Rectangle()
    .fill(.blue)
    .frame(width: 100, height: 60)

RoundedRectangle(cornerRadius: 12)
    .fill(.green)
    .frame(width: 100, height: 60)

Capsule()
    .fill(.orange)
    .frame(width: 100, height: 40)

Circle()
    .fill(.red)
    .frame(width: 60, height: 60)

Ellipse()
    .fill(.purple)
    .frame(width: 100, height: 60)`,
        },
      ],
    },
    {
      id: 'fill-stroke',
      title: 'fill / stroke / ทั้งคู่',
      intro: <p><C>.fill()</C> เติมสีข้างใน. <C>.stroke()</C> วาดเฉพาะขอบ. ใช้ <C>.overlay</C> เพื่อใส่ทั้งคู่.</p>,
      examples: [
        {
          code: `// เติมสี
Circle().fill(.blue)

// เฉพาะขอบ
Circle().stroke(.blue, lineWidth: 3)

// ขอบแบบประ
RoundedRectangle(cornerRadius: 12)
    .stroke(.gray, style: StrokeStyle(lineWidth: 2, dash: [6, 4]))
    .frame(width: 200, height: 80)

// fill + stroke
Circle()
    .fill(.yellow)
    .overlay {
        Circle().stroke(.orange, lineWidth: 4)
    }
    .frame(width: 80, height: 80)`,
        },
      ],
    },
    {
      id: 'as-background',
      title: 'ใช้เป็นพื้นหลัง',
      intro: <p>Shape ใช้เป็น <C>background</C> หรือ <C>overlay</C> ของ view อื่นได้ตรง ๆ — pattern ที่ใช้เกือบทุกหน้า.</p>,
      examples: [
        {
          code: `Text("Tag")
    .padding(.horizontal, 12)
    .padding(.vertical, 6)
    .background(Capsule().fill(.blue.opacity(0.2)))
    .foregroundStyle(.blue)

Text("Card")
    .padding()
    .background(RoundedRectangle(cornerRadius: 12).fill(.white))

// shorthand: ใช้ shape โดยตรงในพารามิเตอร์ in:
Text("Card")
    .padding()
    .background(.regularMaterial, in: .rect(cornerRadius: 12))

// ปุ่มที่มีขอบ
Button("Outline") { }
    .padding(.horizontal, 16)
    .padding(.vertical, 8)
    .overlay(Capsule().stroke(.blue, lineWidth: 1))
    .foregroundStyle(.blue)`,
        },
      ],
    },
    {
      id: 'shorthand',
      title: 'Shorthand syntax (iOS 17+)',
      intro: <p>เขียนสั้นด้วย dot syntax: <C>.rect</C>, <C>.circle</C>, <C>.capsule</C>.</p>,
      examples: [
        {
          code: `// แทน RoundedRectangle(cornerRadius: 12)
.clipShape(.rect(cornerRadius: 12))

// แทน Circle()
.clipShape(.circle)

// แทน Capsule()
.clipShape(.capsule)

// ในการ background
.background(.blue, in: .rect(cornerRadius: 12))`,
        },
      ],
    },
  ],
}

export default topic
