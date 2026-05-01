import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'navigation-stack',
  title: 'NavigationStack',
  category: 'swiftui',
  group: 'Class 4 — Navigation & ScrollView',
  summary:
    'หน้าซ้อนหน้า — กด NavigationLink เพื่อ push หน้าใหม่, swipe ปลายซ้ายเพื่อย้อนกลับ. รองรับ toolbar + title.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      intro: <p>ห่อ root view ด้วย <C>NavigationStack</C> แล้วใช้ <C>NavigationLink</C> เพื่อไปหน้าใหม่.</p>,
      examples: [
        {
          code: `struct ContentView: View {
    var body: some View {
        NavigationStack {
            VStack {
                NavigationLink("Go to detail") {
                    DetailView()
                }

                NavigationLink {
                    SettingsView()
                } label: {
                    Label("Settings", systemImage: "gearshape")
                }
            }
            .navigationTitle("Home")
        }
    }
}`,
        },
      ],
    },
    {
      id: 'title',
      title: 'navigationTitle + display mode',
      examples: [
        {
          code: `struct DetailView: View {
    var body: some View {
        ScrollView { ... }
            .navigationTitle("Detail")
            .navigationBarTitleDisplayMode(.large)      // .large / .inline / .automatic
    }
}

// title แบบ dynamic
.navigationTitle(item.name)`,
        },
      ],
    },
    {
      id: 'pass-data',
      title: 'ส่งข้อมูลไปหน้าถัดไป',
      examples: [
        {
          code: `struct ItemListView: View {
    let items: [Item]

    var body: some View {
        NavigationStack {
            List(items) { item in
                NavigationLink(item.name) {
                    ItemDetailView(item: item)        // ส่ง item เข้าไป
                }
            }
            .navigationTitle("Items")
        }
    }
}

struct ItemDetailView: View {
    let item: Item       // รับ item

    var body: some View {
        VStack {
            Text(item.name).font(.title)
            Text(item.description)
        }
        .navigationTitle(item.name)
    }
}`,
        },
      ],
    },
    {
      id: 'toolbar',
      title: 'Toolbar — ปุ่มมุม top bar',
      examples: [
        {
          code: `.toolbar {
    // ปุ่มมุมขวา
    ToolbarItem(placement: .topBarTrailing) {
        Button("Edit") { isEditing.toggle() }
    }

    // ปุ่มมุมซ้าย
    ToolbarItem(placement: .topBarLeading) {
        Button("Cancel") { dismiss() }
    }

    // หลายปุ่ม
    ToolbarItemGroup(placement: .topBarTrailing) {
        Button { share() } label: { Image(systemName: "square.and.arrow.up") }
        Button { delete() } label: { Image(systemName: "trash") }
    }
}`,
        },
      ],
    },
    {
      id: 'value-based',
      title: 'navigationDestination — แบบ value-based (iOS 16+)',
      intro: <p>วิธีใหม่ที่แยก "trigger" กับ "destination" — เหมาะตอนมี link หลายจุดในหน้าเดียวกัน.</p>,
      examples: [
        {
          code: `struct ContentView: View {
    let users: [User]

    var body: some View {
        NavigationStack {
            List(users) { user in
                NavigationLink(user.name, value: user)   // ส่งค่า
            }
            .navigationDestination(for: User.self) { user in
                UserDetailView(user: user)
            }
        }
    }
}

// User ต้อง conform Hashable
struct User: Identifiable, Hashable {
    let id = UUID()
    let name: String
}`,
        },
      ],
    },
    {
      id: 'programmatic',
      title: 'Push / pop ผ่านโค้ด — NavigationPath',
      intro: <p>ควบคุม stack ผ่าน <C>NavigationPath</C> เพื่อ push/pop จากโค้ด ไม่ต้องผ่านปุ่ม.</p>,
      examples: [
        {
          code: `struct ContentView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            HomeView()
                .navigationDestination(for: String.self) { value in
                    Text("Page: \\(value)")
                }
        }
    }

    func goToPage(_ name: String) {
        path.append(name)              // push
    }

    func popOne() {
        path.removeLast()              // pop 1
    }

    func popToRoot() {
        path = NavigationPath()        // pop ทั้งหมด
    }
}`,
        },
      ],
    },
    {
      id: 'hide-back',
      title: 'ซ่อนปุ่ม Back',
      examples: [
        {
          code: `// ซ่อนปุ่ม back ของ system
.navigationBarBackButtonHidden(true)

// แทนด้วยปุ่มเอง
.toolbar {
    ToolbarItem(placement: .topBarLeading) {
        Button {
            if hasUnsavedChanges {
                showConfirm = true
            } else {
                dismiss()
            }
        } label: {
            Image(systemName: "chevron.left")
        }
    }
}`,
        },
      ],
    },
  ],
}

export default topic
