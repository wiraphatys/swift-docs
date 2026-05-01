import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'toggle',
  title: 'Toggle',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'สวิตช์ on/off ผูกกับ Bool. ใช้ได้กับทั้ง @State, @AppStorage, @Binding.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `struct ContentView: View {
    @State private var isOn = false

    var body: some View {
        Toggle("Notifications", isOn: $isOn)
    }
}`,
        },
      ],
      note: <>ค่าใน <C>$isOn</C> จะอัปเดตอัตโนมัติเมื่อผู้ใช้กด.</>,
    },
    {
      id: 'tint',
      title: 'เปลี่ยนสี',
      intro: <p>สี toggle เมื่อเปิดปรับด้วย <C>.tint()</C>.</p>,
      examples: [
        {
          code: `Toggle("Dark mode", isOn: $isDark)
    .tint(.purple)

Toggle("Sound", isOn: $sound)
    .tint(.green)`,
        },
      ],
    },
    {
      id: 'styles',
      title: 'รูปแบบของ Toggle',
      examples: [
        {
          code: `// switch — แบบ default บน iOS
Toggle("Wi-Fi", isOn: $wifi)
    .toggleStyle(.switch)

// button — กดสลับเหมือนปุ่ม
Toggle("Bookmark", isOn: $bookmarked)
    .toggleStyle(.button)

// checkbox — ใช้บน macOS / List
Toggle("Agree to terms", isOn: $agreed)
    .toggleStyle(.checkbox)`,
        },
      ],
    },
    {
      id: 'with-label',
      title: 'Custom label',
      intro: <p>เขียน label เป็น View ก็ได้ — ใส่ icon, subtitle ได้.</p>,
      examples: [
        {
          code: `Toggle(isOn: $airplane) {
    Label("Airplane Mode", systemImage: "airplane")
}

Toggle(isOn: $notifications) {
    VStack(alignment: .leading) {
        Text("Notifications").bold()
        Text("รับการแจ้งเตือนจากแอป")
            .font(.caption)
            .foregroundStyle(.secondary)
    }
}`,
        },
      ],
    },
    {
      id: 'persistent',
      title: 'บันทึกค่าให้คงอยู่',
      intro: <p>ผูก Toggle กับ <C>@AppStorage</C> เพื่อจำค่าหลังปิดแอป.</p>,
      examples: [
        {
          code: `struct SettingsView: View {
    @AppStorage("isDarkMode") var isDarkMode = false
    @AppStorage("notifications") var notificationsOn = true

    var body: some View {
        Form {
            Toggle("Dark mode", isOn: $isDarkMode)
            Toggle("Notifications", isOn: $notificationsOn)
        }
    }
}`,
        },
      ],
    },
    {
      id: 'state',
      title: 'อ่านค่าและตอบสนอง',
      examples: [
        {
          code: `Toggle("Show details", isOn: $showDetails)

if showDetails {
    Text("รายละเอียดเพิ่มเติม...")
}

// ตอบสนองตอนค่าเปลี่ยน
Toggle("Sound", isOn: $sound)
    .onChange(of: sound) { _, newValue in
        print("Sound is now: \\(newValue)")
    }`,
        },
      ],
    },
  ],
}

export default topic
