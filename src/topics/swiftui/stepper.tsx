import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'stepper',
  title: 'Stepper',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'ปุ่ม +/− เพิ่ม-ลดค่าเป็นจำนวนเต็มหรือทศนิยม. ใช้กับ Int / Double เป็นค่า.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `struct ContentView: View {
    @State private var quantity = 1

    var body: some View {
        Stepper("Quantity: \\(quantity)", value: $quantity)
    }
}`,
        },
      ],
    },
    {
      id: 'range-step',
      title: 'กำหนด range + step',
      examples: [
        {
          code: `// จำกัดช่วง 1-10
Stepper("Pages: \\(pages)", value: $pages, in: 1...10)

// ขยับทีละ 5
Stepper("Score: \\(score)", value: $score, in: 0...100, step: 5)

// แบบทศนิยม
@State private var rate: Double = 1.0
Stepper(value: $rate, in: 0.5...2.0, step: 0.25) {
    Text("Rate: \\(rate, specifier: "%.2f")x")
}`,
        },
      ],
    },
    {
      id: 'custom-actions',
      title: 'กำหนดสิ่งที่จะทำตอนกด +/−',
      intro: <p>ใช้ <C>onIncrement</C> / <C>onDecrement</C> เมื่อต้องทำอย่างอื่นเพิ่มเติม (เช่น เปลี่ยนข้อความ, log, validate).</p>,
      examples: [
        {
          code: `@State private var temperature = 25

Stepper {
    Text("Temperature: \\(temperature)°C")
} onIncrement: {
    temperature += 1
    print("Increased to \\(temperature)")
} onDecrement: {
    temperature -= 1
    print("Decreased to \\(temperature)")
}`,
        },
      ],
    },
    {
      id: 'with-textfield',
      title: 'คู่กับ TextField',
      intro: <p>Pattern ที่เจอบ่อย: ให้ผู้ใช้พิมพ์ตัวเลขเอง หรือกด stepper.</p>,
      examples: [
        {
          code: `@State private var count = 1

HStack {
    TextField("Count", value: $count, format: .number)
        .textFieldStyle(.roundedBorder)
        .keyboardType(.numberPad)
        .frame(width: 80)

    Stepper("", value: $count, in: 1...99)
        .labelsHidden()
}`,
        },
      ],
    },
  ],
}

export default topic
