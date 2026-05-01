import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'binding',
  title: '@Binding',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'อ้างถึงค่าของ @State ที่อยู่ใน View อื่น — ใช้ตอนต้อง "ส่ง state ไปให้ child view แก้ได้".',
  intro: (
    <p>
      <C>@State</C> = ตัวจริง อยู่ที่ Parent. <C>@Binding</C> = ตัวอ้างอิงที่ Child
      ใช้แก้ค่าของ Parent ได้ตรง ๆ. ส่งจาก Parent ด้วย <C>$</C>.
    </p>
  ),
  sections: [
    {
      id: 'basic',
      title: 'Pattern หลัก: Parent → Child',
      examples: [
        {
          code: `// Parent เก็บ @State ตัวจริง
struct ParentView: View {
    @State private var isOn = false

    var body: some View {
        VStack {
            Text(isOn ? "ON" : "OFF")
            ChildToggle(isOn: $isOn)        // ส่งด้วย $
        }
    }
}

// Child รับเป็น @Binding — แก้แล้ว Parent อัปเดต
struct ChildToggle: View {
    @Binding var isOn: Bool

    var body: some View {
        Toggle("Switch", isOn: $isOn)       // ส่งต่อด้วย $
    }
}`,
        },
      ],
      bullets: [
        <>Parent ใช้ <C>@State</C> เก็บค่าจริง</>,
        <>Child ใช้ <C>@Binding</C> รับค่าและแก้ได้</>,
        <>เวลาส่งค่า ใส่ <C>$</C> หน้าชื่อตัวแปร</>,
      ],
    },
    {
      id: 'common-controls',
      title: 'control ทุกตัวรับ Binding',
      intro: <p>TextField, Toggle, Slider, Picker, Stepper — ทั้งหมดต้องรับ <C>Binding</C>. นี่คือเหตุผลที่ต้องใส่ <C>$</C> ทุกครั้ง.</p>,
      examples: [
        {
          code: `struct FormView: View {
    @State private var name = ""
    @State private var age = 18
    @State private var agreed = false

    var body: some View {
        Form {
            TextField("Name", text: $name)              // Binding<String>
            Stepper("Age: \\(age)", value: $age)         // Binding<Int>
            Toggle("Agree", isOn: $agreed)              // Binding<Bool>
        }
    }
}`,
        },
      ],
    },
    {
      id: 'sheet-binding',
      title: 'เปิด-ปิด Sheet ด้วย Binding',
      intro: <p>Pattern ที่เจอบ่อยมาก: Sheet เปิดเมื่อ <C>@State</C> เป็น true และ child ต้องปิดเองได้.</p>,
      examples: [
        {
          code: `struct ParentView: View {
    @State private var showAddSheet = false

    var body: some View {
        Button("Add") { showAddSheet = true }
            .sheet(isPresented: $showAddSheet) {
                AddItemSheet(isPresented: $showAddSheet)
            }
    }
}

struct AddItemSheet: View {
    @Binding var isPresented: Bool

    var body: some View {
        VStack {
            Text("Add new item")
            Button("Done") {
                isPresented = false        // ปิด sheet จาก child
            }
        }
    }
}`,
        },
      ],
      note: <>มีอีกวิธี: ใช้ <C>@Environment(\.dismiss)</C> ใน child แทน Binding — สั้นกว่า.</>,
    },
    {
      id: 'constant',
      title: 'Binding.constant สำหรับ Preview',
      intro: <p>ตอนทำ Preview หรือ test view ที่ต้องรับ <C>@Binding</C> ใช้ <C>.constant()</C> สร้าง binding ค่าคงที่.</p>,
      examples: [
        {
          code: `#Preview {
    ChildToggle(isOn: .constant(true))
}

#Preview("Off") {
    ChildToggle(isOn: .constant(false))
}`,
        },
      ],
    },
    {
      id: 'derived',
      title: 'Custom Binding (get/set)',
      intro: <p>สร้าง Binding เองได้ ใช้ตอนต้อง map ค่าหรือ trigger logic ตอน set.</p>,
      examples: [
        {
          code: `@State private var name = ""

// Binding ที่บังคับ uppercase
TextField("Name", text: Binding(
    get: { name },
    set: { name = $0.uppercased() }
))

// Binding กับ Optional → Bool (เปิด sheet เมื่อ item != nil)
@State private var selectedItem: Item? = nil

.sheet(isPresented: Binding(
    get: { selectedItem != nil },
    set: { if !$0 { selectedItem = nil } }
)) {
    DetailView(item: selectedItem!)
}`,
        },
      ],
    },
  ],
}

export default topic
