import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'sheet',
  title: 'Sheet & Modal',
  category: 'swiftui',
  group: 'Class 4 — Navigation & ScrollView',
  summary:
    'แสดงหน้าจอแบบ modal (เลื่อนขึ้นมาจากด้านล่าง). ใช้ .sheet สำหรับเลื่อนปกติ, .fullScreenCover สำหรับเต็มจอ, .popover สำหรับ iPad.',
  sections: [
    {
      id: 'basic',
      title: '.sheet — พื้นฐาน',
      examples: [
        {
          code: `struct ContentView: View {
    @State private var showSheet = false

    var body: some View {
        Button("Open") {
            showSheet = true
        }
        .sheet(isPresented: $showSheet) {
            DetailView()
        }
    }
}

struct DetailView: View {
    @Environment(\\.dismiss) private var dismiss

    var body: some View {
        VStack {
            Text("Detail")
            Button("Close") { dismiss() }
        }
    }
}`,
        },
      ],
    },
    {
      id: 'dismiss',
      title: 'ปิด Sheet',
      intro: <p>วิธีที่นิยม: ใช้ <C>@Environment(\.dismiss)</C> ใน child view.</p>,
      examples: [
        {
          code: `struct DetailView: View {
    @Environment(\\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                // ...
            }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        save()
                        dismiss()
                    }
                }
            }
        }
    }
}`,
        },
      ],
    },
    {
      id: 'with-data',
      title: '.sheet(item:) — ส่งข้อมูลเข้า sheet',
      intro: <p>ใช้ตอน sheet ต้องการรู้ว่า "เปิดสำหรับ item ไหน" — เปลี่ยน item แล้ว sheet เปิด, set เป็น nil แล้ว sheet ปิด.</p>,
      examples: [
        {
          code: `struct User: Identifiable {
    let id = UUID()
    var name: String
}

struct ContentView: View {
    @State private var selectedUser: User? = nil
    let users = [User(name: "A"), User(name: "B")]

    var body: some View {
        List(users) { user in
            Button(user.name) {
                selectedUser = user        // เปิด sheet
            }
        }
        .sheet(item: $selectedUser) { user in
            UserDetailView(user: user)
        }
    }
}`,
        },
      ],
    },
    {
      id: 'detents',
      title: 'Detents — ความสูงของ sheet',
      intro: <p>กำหนดให้ sheet สูงไม่เต็มจอ ผู้ใช้ลากเปลี่ยนได้.</p>,
      examples: [
        {
          code: `.sheet(isPresented: $showSheet) {
    DetailView()
        .presentationDetents([.medium, .large])     // ครึ่งจอ + เต็ม
}

// แค่ครึ่งจอ ลากไม่ขยาย
.presentationDetents([.medium])

// custom — สัดส่วน + ความสูงตายตัว
.presentationDetents([
    .fraction(0.3),         // 30% ของจอ
    .height(400),           // 400 points
    .large
])

// ปุ่มลาก / ขยาย indicator
.presentationDragIndicator(.visible)

// มุมโค้ง
.presentationCornerRadius(24)`,
        },
      ],
    },
    {
      id: 'fullscreen',
      title: '.fullScreenCover — เต็มจอ',
      intro: <p>เปิดเต็มจอ ปิดได้แค่ผ่านโค้ด (ไม่มีลากปิด). เหมาะกับ login flow / onboarding.</p>,
      examples: [
        {
          code: `@State private var showOnboarding = false

Button("Start") { showOnboarding = true }
    .fullScreenCover(isPresented: $showOnboarding) {
        OnboardingView()
    }`,
        },
      ],
    },
    {
      id: 'popover',
      title: '.popover — ลูกโป่งคำพูด (iPad)',
      examples: [
        {
          code: `Button("Info") { showPopover = true }
    .popover(isPresented: $showPopover) {
        VStack {
            Text("Helpful tip")
            Button("Got it") { showPopover = false }
        }
        .padding()
        .presentationCompactAdaptation(.popover)    // บังคับเป็น popover แม้บน iPhone
    }`,
        },
      ],
    },
    {
      id: 'compare',
      title: 'เลือกใช้แบบไหน',
      bullets: [
        <><C>.sheet</C> — modal ทั่วไป ลากปิดได้, ใช้บ่อยสุด</>,
        <><C>.fullScreenCover</C> — เต็มจอ ปิดด้วยโค้ดเท่านั้น (login, onboarding)</>,
        <><C>.popover</C> — popup เล็ก ๆ ชี้ไปยังจุดที่กด (เหมาะ iPad)</>,
        <><C>.alert</C> / <C>.confirmationDialog</C> — ถามยืนยัน yes/no</>,
      ],
    },
  ],
}

export default topic
