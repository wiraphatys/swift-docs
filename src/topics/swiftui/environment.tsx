import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'environment',
  title: '@Environment',
  category: 'swiftui',
  group: 'Class 4 — Navigation & ScrollView',
  summary:
    'อ่านค่าจากระบบที่ส่งต่อลงมาตลอด view tree — เช่น dismiss, colorScheme, locale. ที่ใช้บ่อยสุดคือ \\.dismiss สำหรับปิด sheet / pop หน้า.',
  sections: [
    {
      id: 'dismiss',
      title: '\\.dismiss — ปิดหน้าจอ / ย้อนกลับ',
      intro: (
        <p>
          ใช้บ่อยที่สุด. <C>dismiss()</C> ทำงานเหมือนกันทั้ง 2 บริบท —
          ปิด <C>.sheet</C> หรือ pop หน้าจาก <C>NavigationStack</C> —
          SwiftUI รู้เองว่ากำลังอยู่ใน flow ไหน.
        </p>
      ),
      examples: [
        {
          code: `struct DetailView: View {
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
      id: 'add-then-back',
      title: 'Pattern: Add ใหม่ → save → ย้อนกลับ',
      intro: (
        <p>
          flow ที่เจอบ่อยมาก: หน้า list → กด "Add" → กรอกข้อมูล → กด "Save" →
          กลับหน้า list. ใช้ <C>dismiss()</C> หลัง save เสร็จ.
        </p>
      ),
      examples: [
        {
          title: 'แบบที่ 1 — push หน้า Add ผ่าน NavigationStack',
          code: `struct TaskListView: View {
    @State private var tasks: [Task] = []

    var body: some View {
        NavigationStack {
            List(tasks) { task in
                Text(task.title)
            }
            .navigationTitle("Tasks")
            .toolbar {
                NavigationLink {
                    AddTaskView(tasks: $tasks)
                } label: {
                    Image(systemName: "plus")
                }
            }
        }
    }
}

struct AddTaskView: View {
    @Binding var tasks: [Task]                    // ส่ง array จากแม่มาแก้
    @Environment(\\.dismiss) private var dismiss   // pop กลับ

    @State private var title = ""

    var body: some View {
        Form {
            TextField("Title", text: $title)
        }
        .navigationTitle("New Task")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Save") {
                    tasks.append(Task(title: title))
                    dismiss()                     // pop กลับหน้า list
                }
                .disabled(title.isEmpty)
            }
            ToolbarItem(placement: .topBarLeading) {
                Button("Cancel") { dismiss() }    // ทิ้งโดยไม่บันทึก
            }
        }
    }
}`,
        },
        {
          title: 'แบบที่ 2 — เปิดเป็น Sheet',
          code: `struct TaskListView: View {
    @State private var tasks: [Task] = []
    @State private var showAddSheet = false

    var body: some View {
        NavigationStack {
            List(tasks) { task in
                Text(task.title)
            }
            .navigationTitle("Tasks")
            .toolbar {
                Button {
                    showAddSheet = true
                } label: {
                    Image(systemName: "plus")
                }
            }
            .sheet(isPresented: $showAddSheet) {
                NavigationStack {                 // ครอบเพื่อให้ toolbar ทำงาน
                    AddTaskView(tasks: $tasks)
                }
            }
        }
    }
}

// AddTaskView ใช้โค้ดเดิมจากแบบที่ 1 ได้เลย
// dismiss() จะปิด sheet ให้อัตโนมัติ`,
        },
      ],
      note: (
        <>
          <C>dismiss()</C> ตัวเดียวใช้ได้ทั้ง 2 แบบ — ไม่ต้องแก้โค้ดของ{' '}
          <C>AddTaskView</C> เลย. SwiftUI ดูเองว่าหน้านี้ถูก present แบบไหน.
        </>
      ),
    },
    {
      id: 'pass-back',
      title: 'ส่งค่ากลับให้หน้าก่อนหน้า',
      intro: (
        <p>
          มี 2 วิธีหลักที่ child ส่งค่ากลับให้ parent ก่อน <C>dismiss()</C>.
        </p>
      ),
      examples: [
        {
          title: 'วิธี 1 — @Binding (ตัวแปรร่วมกัน)',
          code: `// Parent
struct ListView: View {
    @State private var items: [Item] = []

    var body: some View {
        NavigationStack {
            // ...
            NavigationLink("Add") {
                AddView(items: $items)        // ส่ง binding ให้ child แก้
            }
        }
    }
}

// Child
struct AddView: View {
    @Binding var items: [Item]
    @Environment(\\.dismiss) private var dismiss
    @State private var name = ""

    var body: some View {
        Form { TextField("Name", text: $name) }
            .toolbar {
                Button("Save") {
                    items.append(Item(name: name))    // เขียนกลับ array ของ parent
                    dismiss()
                }
            }
    }
}`,
        },
        {
          title: 'วิธี 2 — closure callback',
          code: `// Child
struct AddView: View {
    let onSave: (Item) -> Void                // รับ closure จาก parent
    @Environment(\\.dismiss) private var dismiss
    @State private var name = ""

    var body: some View {
        Form { TextField("Name", text: $name) }
            .toolbar {
                Button("Save") {
                    onSave(Item(name: name))   // ส่งกลับผ่าน callback
                    dismiss()
                }
            }
    }
}

// Parent
NavigationLink("Add") {
    AddView { newItem in
        items.append(newItem)
    }
}`,
        },
      ],
      note: (
        <>
          ใช้ <C>@Binding</C> เมื่ออยากให้ child แก้ค่าได้ตรง ๆ. ใช้{' '}
          callback เมื่ออยากให้ parent คุม logic การ save (เช่น validate,
          เรียก API ก่อนเพิ่ม).
        </>
      ),
    },
    {
      id: 'cancel-buttons',
      title: 'Cancel / Save ใน toolbar',
      intro: (
        <p>
          ใส่ปุ่ม Cancel + Save ใน toolbar ของหน้า Add — placement ที่เหมาะคือ{' '}
          <C>cancellationAction</C> และ <C>confirmationAction</C> เพราะ
          SwiftUI จัดตำแหน่ง (ซ้าย/ขวา) ให้ตามแพลตฟอร์ม.
        </p>
      ),
      examples: [
        {
          code: `.toolbar {
    ToolbarItem(placement: .cancellationAction) {
        Button("Cancel") { dismiss() }
    }
    ToolbarItem(placement: .confirmationAction) {
        Button("Save") {
            save()
            dismiss()
        }
        .disabled(title.isEmpty)        // ปิดถ้ายังกรอกไม่ครบ
    }
}`,
        },
      ],
    },
    {
      id: 'colorscheme',
      title: '\\.colorScheme — light / dark',
      examples: [
        {
          code: `struct ContentView: View {
    @Environment(\\.colorScheme) var colorScheme

    var body: some View {
        Text("Hello")
            .foregroundStyle(colorScheme == .dark ? .white : .black)

        if colorScheme == .dark {
            Image("logo-dark")
        } else {
            Image("logo-light")
        }
    }
}`,
        },
      ],
    },
    {
      id: 'common-keys',
      title: 'Environment values ที่ใช้บ่อย',
      examples: [
        {
          code: `@Environment(\\.dismiss) var dismiss
@Environment(\\.colorScheme) var colorScheme         // .light / .dark

@Environment(\\.locale) var locale                   // ภาษา / ประเทศ

@Environment(\\.openURL) var openURL                 // เปิด URL ในเบราว์เซอร์
Button("Visit") { openURL(URL(string: "https://apple.com")!) }

@Environment(\\.scenePhase) var scenePhase           // .active / .inactive / .background
.onChange(of: scenePhase) { _, phase in
    if phase == .background {
        save()
    }
}

@Environment(\\.horizontalSizeClass) var hSize       // .compact / .regular
if hSize == .compact {
    NarrowLayout()
} else {
    WideLayout()
}

@Environment(\\.isEnabled) var isEnabled              // ปิด/เปิดของ control`,
        },
      ],
    },
    {
      id: 'set-environment',
      title: 'ตั้งค่า environment ให้ child',
      intro: <p>ใช้ <C>.environment()</C> ใส่ค่าจาก parent — child ทุกตัวอ่านได้.</p>,
      examples: [
        {
          code: `// บังคับธีม dark mode สำหรับ subtree
ContentView()
    .environment(\\.colorScheme, .dark)

// บังคับภาษา
ContentView()
    .environment(\\.locale, Locale(identifier: "en_US"))`,
        },
      ],
    },
    {
      id: 'custom',
      title: 'Custom environment value',
      intro: <p>สร้าง environment key เอง สำหรับส่งค่าระหว่าง view โดยไม่ผ่าน parameter.</p>,
      examples: [
        {
          code: `// 1. ประกาศ key
private struct ThemeKey: EnvironmentKey {
    static let defaultValue: String = "default"
}

extension EnvironmentValues {
    var theme: String {
        get { self[ThemeKey.self] }
        set { self[ThemeKey.self] = newValue }
    }
}

// 2. ตั้งจาก parent
ContentView()
    .environment(\\.theme, "dark")

// 3. อ่านจาก child
struct ChildView: View {
    @Environment(\\.theme) var theme

    var body: some View {
        Text("Theme: \\(theme)")
    }
}`,
        },
      ],
    },
    {
      id: 'observable',
      title: '@Environment กับ @Observable (iOS 17+)',
      intro: <p>ส่ง object ที่ <C>@Observable</C> ผ่าน environment เพื่อใช้ได้ทุกที่ใน subtree.</p>,
      examples: [
        {
          code: `@Observable
class AppSettings {
    var fontSize: Double = 14
    var darkMode: Bool = false
}

@main
struct MyApp: App {
    @State private var settings = AppSettings()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(settings)         // ใส่เข้า env
        }
    }
}

// อ่านที่ child
struct DeepView: View {
    @Environment(AppSettings.self) private var settings

    var body: some View {
        Text("Hello")
            .font(.system(size: settings.fontSize))
    }
}`,
        },
      ],
    },
  ],
}

export default topic
