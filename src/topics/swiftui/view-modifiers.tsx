import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'view-modifiers',
  title: 'View Modifiers',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'Modifier คือ method ที่ "เพิ่ม-ปรับแต่ง" view โดยคืนค่าเป็น view ใหม่ — เช่น .padding, .background, .foregroundStyle, .shadow, .opacity.',
  intro: (
    <p>
      ทุก modifier เริ่มด้วย <C>.</C> ต่อจาก view. ลำดับการเขียนสำคัญ —
      เขียนคนละลำดับให้ผลคนละแบบ. นี่คือ modifier ที่ใช้บ่อยที่สุดที่ควรจำ.
    </p>
  ),
  sections: [
    {
      id: 'spacing',
      title: 'ระยะห่าง — padding',
      examples: [
        {
          code: `.padding()                       // 16 ทุกด้าน
.padding(20)                     // 20 ทุกด้าน
.padding(.horizontal)            // ซ้าย+ขวา default
.padding(.horizontal, 24)        // ซ้าย+ขวา 24
.padding(.top, 8)                // เฉพาะบน 8
.padding([.top, .leading], 12)   // บน+ซ้าย 12`,
        },
      ],
    },
    {
      id: 'color',
      title: 'สี — foregroundStyle / background / tint',
      examples: [
        {
          code: `// สีตัวอักษร / icon
.foregroundStyle(.red)
.foregroundStyle(.primary)              // ดำ/ขาวตามธีม
.foregroundStyle(.blue.opacity(0.5))

// พื้นหลัง
.background(.yellow)
.background(.regularMaterial)            // วัสดุโปร่ง
.background(.blue, in: .rect(cornerRadius: 12))

// gradient bg
.background(LinearGradient(colors: [.blue, .purple], startPoint: .top, endPoint: .bottom))

// tint — บอก "สีหลัก" ของ control
.tint(.orange)                          // ใช้กับ Button, Toggle, ProgressView`,
        },
      ],
    },
    {
      id: 'size',
      title: 'ขนาด — frame',
      examples: [
        {
          code: `.frame(width: 100)
.frame(height: 50)
.frame(width: 200, height: 100)
.frame(maxWidth: .infinity)              // ขยายเต็มกว้าง
.frame(maxWidth: .infinity, alignment: .leading)
.frame(minWidth: 100, maxWidth: 300)`,
        },
      ],
    },
    {
      id: 'shape',
      title: 'ตัดทรง — clipShape / cornerRadius',
      examples: [
        {
          code: `.clipShape(.rect(cornerRadius: 12))
.clipShape(.circle)
.clipShape(.capsule)

// shorthand เก่า — ใช้ได้แต่ clipShape ดีกว่า
.cornerRadius(12)

// ตัดส่วนที่ล้นออกจากกรอบ
.clipped()`,
        },
      ],
    },
    {
      id: 'border',
      title: 'ขอบ — overlay กับ stroke',
      examples: [
        {
          code: `// ขอบเส้นเดียว
.overlay(
    RoundedRectangle(cornerRadius: 12)
        .stroke(.blue, lineWidth: 2)
)

// shorthand: .border (ขอบสี่เหลี่ยมตรง ๆ)
.border(.gray, width: 1)

// circle border
Image("avatar")
    .clipShape(.circle)
    .overlay(Circle().stroke(.white, lineWidth: 3))`,
        },
      ],
    },
    {
      id: 'shadow-opacity',
      title: 'เงา / ความโปร่งแสง',
      examples: [
        {
          code: `.shadow(radius: 4)                                  // เงาเริ่มต้น
.shadow(color: .black.opacity(0.2), radius: 8, x: 0, y: 4)

.opacity(0.5)                                       // โปร่ง 50%

.blur(radius: 4)                                    // เบลอ`,
        },
      ],
    },
    {
      id: 'transform',
      title: 'หมุน / ขยาย / เลื่อน',
      examples: [
        {
          code: `.rotationEffect(.degrees(45))
.rotationEffect(.degrees(-15), anchor: .center)

.scaleEffect(1.2)                       // ขยาย 1.2 เท่า
.scaleEffect(x: 2, y: 1)                // ขยายแค่แกน x

.offset(x: 20, y: -10)                  // เลื่อนไม่กระทบ layout
.offset(y: 50)`,
        },
      ],
    },
    {
      id: 'visibility',
      title: 'ซ่อน / disable',
      examples: [
        {
          code: `.hidden()                           // ซ่อนแต่ยังกินพื้นที่
.opacity(0)                         // ซ่อนแต่ยังกินพื้นที่ (เหมือน hidden)

.disabled(true)                     // ปิดการกด ทำให้สีจาง

// แสดงเมื่อเงื่อนไข
if isLoading {
    ProgressView()
}

// inline แบบสั้น (iOS 15+)
.opacity(isVisible ? 1 : 0)
.disabled(!canSubmit)`,
        },
      ],
    },
    {
      id: 'order-matters',
      title: 'ลำดับสำคัญ — ตัวอย่าง',
      intro: <p>เปลี่ยนลำดับ = ผลต่างกัน. กฎจำง่าย: <strong>"เขียนก่อนทำก่อน"</strong>.</p>,
      examples: [
        {
          code: `// padding ก่อน background = พื้นหลังคลุมถึง padding
Text("A")
    .padding()
    .background(.yellow)

// background ก่อน padding = พื้นหลังแค่รอบตัวอักษร
Text("B")
    .background(.yellow)
    .padding()

// frame ก่อน background = สีเต็ม frame
Text("C")
    .frame(width: 200)
    .background(.blue)

// background ก่อน frame = สีแค่ตัวอักษร, frame ใหญ่ขึ้นเฉย ๆ
Text("D")
    .background(.blue)
    .frame(width: 200)`,
        },
      ],
    },
    {
      id: 'common-stack',
      title: 'Stack ของ modifier ที่ใช้ซ้ำ ๆ',
      examples: [
        {
          code: `// สูตรการ์ด
Text("Card")
    .padding()
    .frame(maxWidth: .infinity)
    .background(.white)
    .clipShape(.rect(cornerRadius: 12))
    .shadow(radius: 4)
    .padding(.horizontal)

// สูตร Pill / Tag
Text("Tag")
    .font(.caption)
    .padding(.horizontal, 12)
    .padding(.vertical, 4)
    .background(.blue.opacity(0.2), in: .capsule)
    .foregroundStyle(.blue)

// สูตรปุ่มหลัก
Button("Continue") { }
    .frame(maxWidth: .infinity)
    .padding()
    .background(.blue, in: .rect(cornerRadius: 12))
    .foregroundStyle(.white)
    .bold()`,
        },
      ],
    },
  ],
}

export default topic
