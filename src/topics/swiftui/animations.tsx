import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'animations',
  title: 'Animation',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'ทำให้ค่าเปลี่ยนแบบ smooth แทนการ snap. มี 2 วิธีหลัก: .animation(_:value:) ผูกกับค่า หรือ withAnimation { } ครอบการเปลี่ยน.',
  sections: [
    {
      id: 'with-animation',
      title: 'withAnimation — วิธีที่ใช้บ่อยสุด',
      intro: <p>ห่อ code ที่เปลี่ยน state ใน <C>withAnimation { }</C>. ทุก view ที่ผูกกับ state นั้นจะเปลี่ยนแบบ animate.</p>,
      examples: [
        {
          code: `struct ContentView: View {
    @State private var isExpanded = false

    var body: some View {
        VStack {
            Rectangle()
                .fill(.blue)
                .frame(width: isExpanded ? 200 : 100, height: 100)

            Button("Toggle") {
                withAnimation {
                    isExpanded.toggle()
                }
            }
        }
    }
}`,
        },
      ],
    },
    {
      id: 'animation-modifier',
      title: '.animation(_:value:)',
      intro: <p>วาง modifier นี้บน view แล้วผูกกับค่าที่เปลี่ยน — เปลี่ยนเมื่อไหร่ก็ animate ให้.</p>,
      examples: [
        {
          code: `Rectangle()
    .fill(.blue)
    .frame(width: width, height: 100)
    .animation(.default, value: width)        // animate ทุกครั้งที่ width เปลี่ยน

// เปลี่ยน width ปกติ ไม่ต้องห่อ withAnimation
Button("Bigger") {
    width += 50         // animate อัตโนมัติ
}`,
        },
      ],
      note: <>เลือกวิธีไหน: ถ้าต้องการ animate <strong>ทุกครั้ง</strong> ใช้ <C>.animation</C>. ถ้าต้องการเลือก animate เฉพาะบาง action ใช้ <C>withAnimation</C>.</>,
    },
    {
      id: 'curves',
      title: 'รูปแบบของการเคลื่อนไหว',
      examples: [
        {
          code: `withAnimation(.linear) { ... }            // เร็วเท่ากันตลอด
withAnimation(.easeIn) { ... }            // เริ่มช้า เร่งกลาง
withAnimation(.easeOut) { ... }           // เริ่มเร็ว ลงท้ายช้า (ใช้บ่อย)
withAnimation(.easeInOut) { ... }         // ช้าทั้งสองข้าง

// กำหนดเวลาเอง
withAnimation(.easeInOut(duration: 0.5)) { ... }
withAnimation(.linear(duration: 1.0)) { ... }

// spring — เด้งแบบสปริง (ดู natural สุด)
withAnimation(.spring) { ... }
withAnimation(.spring(duration: 0.6, bounce: 0.4)) { ... }

// delay
withAnimation(.easeOut.delay(0.2)) { ... }`,
        },
      ],
    },
    {
      id: 'examples',
      title: 'ตัวอย่างที่ใช้บ่อย',
      examples: [
        {
          code: `// 1. Toggle ขนาด
@State private var big = false

Circle()
    .frame(width: big ? 150 : 60, height: big ? 150 : 60)
    .onTapGesture {
        withAnimation(.spring) { big.toggle() }
    }

// 2. แสดง/ซ่อนด้วย opacity
@State private var show = false

Text("Hello")
    .opacity(show ? 1 : 0)
    .animation(.easeInOut, value: show)

Button("Toggle") { show.toggle() }

// 3. หมุน
@State private var rotation: Double = 0

Image(systemName: "arrow.clockwise")
    .rotationEffect(.degrees(rotation))
    .onTapGesture {
        withAnimation(.spring(duration: 0.5)) {
            rotation += 360
        }
    }

// 4. Slide ขึ้น/ลง
@State private var showCard = false

if showCard {
    Card()
        .transition(.move(edge: .bottom).combined(with: .opacity))
}

Button("Show") {
    withAnimation { showCard.toggle() }
}`,
        },
      ],
    },
    {
      id: 'transition',
      title: '.transition — animate ตอน insert/remove',
      intro: <p>ใช้กับ view ที่ปรากฏ/หายไปจาก hierarchy (มาจาก <C>if</C>).</p>,
      examples: [
        {
          code: `@State private var showDetail = false

VStack {
    Button("Toggle") {
        withAnimation { showDetail.toggle() }
    }

    if showDetail {
        Text("Detail")
            .padding()
            .background(.yellow)
            .transition(.slide)             // animation ตอน in/out
    }
}

// รูปแบบ
.transition(.opacity)
.transition(.scale)
.transition(.slide)
.transition(.move(edge: .bottom))
.transition(.move(edge: .leading))

// ผสมหลายอัน
.transition(.opacity.combined(with: .move(edge: .bottom)))`,
        },
      ],
    },
    {
      id: 'pitfall',
      title: 'Pitfall — ลืมห่อ withAnimation',
      examples: [
        {
          code: `// ❌ ไม่มี withAnimation → snap ทันที
Button("Toggle") {
    show.toggle()
}

// ✅ ใส่ withAnimation
Button("Toggle") {
    withAnimation { show.toggle() }
}

// หรือใส่ .animation(_:value:) บน view ที่ผูกกับ show
Text("Hello")
    .opacity(show ? 1 : 0)
    .animation(.default, value: show)`,
        },
      ],
    },
  ],
}

export default topic
