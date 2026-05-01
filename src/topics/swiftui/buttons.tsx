import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'buttons',
  title: 'Button',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'ปุ่มกด — ใส่ action กับ label. ปรับสไตล์ด้วย .buttonStyle, สีด้วย .tint, เปิด-ปิดด้วย .disabled.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `// label เป็น string
Button("Tap me") {
    print("Tapped")
}

// label เป็น View
Button {
    print("Tapped")
} label: {
    Label("Save", systemImage: "square.and.arrow.down")
}

// label แบบ custom เต็มที่
Button {
    print("Tapped")
} label: {
    HStack {
        Image(systemName: "heart.fill")
        Text("Like")
    }
    .padding()
    .background(.red, in: .capsule)
    .foregroundStyle(.white)
}`,
        },
      ],
    },
    {
      id: 'styles',
      title: 'Built-in styles',
      intro: <p>SwiftUI มี style สำเร็จให้ใช้ทันที.</p>,
      examples: [
        {
          code: `Button("Plain") { }                              // ดั้งเดิม
    .buttonStyle(.plain)

Button("Bordered") { }
    .buttonStyle(.bordered)                       // มีกรอบบาง

Button("Bordered Prominent") { }
    .buttonStyle(.borderedProminent)              // แบบเด่น สีเต็ม

Button("Borderless") { }
    .buttonStyle(.borderless)                     // ไม่มีกรอบ`,
        },
      ],
    },
    {
      id: 'tint-color',
      title: 'เปลี่ยนสี',
      intro: <p>สีของ button ปรับด้วย <C>.tint()</C>. ใช้ได้ทั้งกับ <C>.bordered</C> และ <C>.borderedProminent</C>.</p>,
      examples: [
        {
          code: `Button("Save") { }
    .buttonStyle(.borderedProminent)
    .tint(.green)

Button("Cancel") { }
    .buttonStyle(.bordered)
    .tint(.gray)

// เปลี่ยนสีตัวอักษรของปุ่ม
Button("Custom") { }
    .foregroundStyle(.white)`,
        },
      ],
    },
    {
      id: 'role',
      title: 'Role — destructive / cancel',
      intro: <p>ใส่ <C>role:</C> เพื่อบอก SwiftUI ว่าปุ่มทำงานแนวไหน — สีและตำแหน่งใน sheet จะถูกจัดให้.</p>,
      examples: [
        {
          code: `// ปุ่มลบ — แดงอัตโนมัติ
Button("Delete", role: .destructive) {
    delete()
}

// ปุ่ม cancel
Button("Cancel", role: .cancel) {
    dismiss()
}

// ใน confirmation dialog ปุ่ม destructive จะอยู่ตำแหน่งที่ถูก
.confirmationDialog("Delete?", isPresented: $showConfirm) {
    Button("Delete", role: .destructive) { delete() }
    Button("Cancel", role: .cancel) { }
}`,
        },
      ],
    },
    {
      id: 'size',
      title: 'ขนาด — controlSize',
      examples: [
        {
          code: `Button("Small") { }
    .buttonStyle(.bordered)
    .controlSize(.small)

Button("Regular") { }
    .buttonStyle(.bordered)
    .controlSize(.regular)         // default

Button("Large") { }
    .buttonStyle(.bordered)
    .controlSize(.large)`,
        },
      ],
    },
    {
      id: 'disabled',
      title: 'เปิด / ปิด',
      examples: [
        {
          code: `Button("Submit") {
    submit()
}
.disabled(name.isEmpty)            // ปิดเมื่อ name ว่าง

// ทั้งฟอร์ม
VStack {
    TextField("Name", text: $name)
    Button("Save") { save() }
}
.disabled(isLoading)               // ปิดทุก control ใน VStack`,
        },
      ],
    },
    {
      id: 'full-width',
      title: 'ปุ่มเต็มความกว้าง',
      intro: <p>Pattern ที่ใช้บ่อยในแอป iOS: ปุ่มหลักด้านล่างเต็มความกว้าง.</p>,
      examples: [
        {
          code: `Button("Sign in") {
    signIn()
}
.frame(maxWidth: .infinity)
.padding()
.background(.blue, in: .rect(cornerRadius: 12))
.foregroundStyle(.white)
.bold()
.padding(.horizontal)

// แบบใช้ buttonStyle
Button("Sign in") {
    signIn()
}
.buttonStyle(.borderedProminent)
.controlSize(.large)
.frame(maxWidth: .infinity)`,
        },
      ],
    },
    {
      id: 'async',
      title: 'Async action',
      intro: <p>เรียก async func ใน button ต้องห่อ <C>Task</C>.</p>,
      examples: [
        {
          code: `@State private var isLoading = false

Button {
    Task {
        isLoading = true
        defer { isLoading = false }
        try? await api.save()
    }
} label: {
    if isLoading {
        ProgressView()
    } else {
        Text("Save")
    }
}
.disabled(isLoading)`,
        },
      ],
    },
  ],
}

export default topic
