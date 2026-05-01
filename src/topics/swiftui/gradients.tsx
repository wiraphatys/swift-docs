import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'gradients',
  title: 'Gradient',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'ไล่ระดับสี — ใช้เป็นพื้นหลังของ button, card, header. มี 3 แบบหลัก: Linear (เส้นตรง), Radial (วงกลม), Angular (วงล้อ).',
  sections: [
    {
      id: 'linear',
      title: 'LinearGradient',
      intro: <p>ไล่สีเป็นเส้นตรงจากจุดหนึ่งไปอีกจุด — แบบที่เจอบ่อยสุด.</p>,
      examples: [
        {
          code: `LinearGradient(
    colors: [.blue, .purple],
    startPoint: .topLeading,
    endPoint: .bottomTrailing
)
.frame(height: 200)

// แนวตั้ง / แนวนอน
LinearGradient(
    colors: [.orange, .red],
    startPoint: .top,
    endPoint: .bottom
)

// 3 สีขึ้นไป
LinearGradient(
    colors: [.pink, .purple, .blue],
    startPoint: .leading,
    endPoint: .trailing
)`,
        },
      ],
    },
    {
      id: 'radial-angular',
      title: 'Radial / Angular',
      examples: [
        {
          code: `// Radial — ไล่สีจากกลางออก
RadialGradient(
    colors: [.yellow, .orange, .red],
    center: .center,
    startRadius: 20,
    endRadius: 150
)
.frame(width: 200, height: 200)

// Angular — ไล่สีรอบจุดศูนย์กลาง (วงล้อสี)
AngularGradient(
    colors: [.red, .orange, .yellow, .green, .blue, .purple, .red],
    center: .center
)
.frame(width: 200, height: 200)
.clipShape(.circle)`,
        },
      ],
    },
    {
      id: 'as-background',
      title: 'ใช้เป็นพื้นหลัง / fill',
      examples: [
        {
          code: `// พื้นหลังการ์ด
Text("Hello")
    .padding()
    .frame(maxWidth: .infinity)
    .background(
        LinearGradient(
            colors: [.blue, .indigo],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        ),
        in: .rect(cornerRadius: 16)
    )
    .foregroundStyle(.white)

// fill shape ด้วย gradient
Circle()
    .fill(LinearGradient(
        colors: [.cyan, .blue],
        startPoint: .top,
        endPoint: .bottom
    ))
    .frame(width: 80, height: 80)

// ปุ่มที่มีพื้นหลังไล่สี
Button("Continue") { }
    .padding(.horizontal, 32)
    .padding(.vertical, 14)
    .background(
        LinearGradient(colors: [.purple, .pink], startPoint: .leading, endPoint: .trailing),
        in: .capsule
    )
    .foregroundStyle(.white)
    .bold()`,
        },
      ],
    },
    {
      id: 'stops',
      title: 'กำหนดตำแหน่งของแต่ละสี (stops)',
      intro: <p>ปรับให้สีกระจายไม่เท่ากันด้วย <C>Gradient(stops:)</C>.</p>,
      examples: [
        {
          code: `LinearGradient(
    gradient: Gradient(stops: [
        .init(color: .blue, location: 0.0),
        .init(color: .blue, location: 0.6),    // อยู่ที่ 60% ของเส้น
        .init(color: .clear, location: 1.0)
    ]),
    startPoint: .top,
    endPoint: .bottom
)`,
        },
      ],
    },
  ],
}

export default topic
