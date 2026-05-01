import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'lists',
  title: 'List',
  category: 'swiftui',
  group: 'Class 5 — List View',
  summary:
    'รายการแบบ scroll ได้ มี separator + swipe action ในตัว. ใช้กับ struct ที่ conform Identifiable เป็นหลัก.',
  sections: [
    {
      id: 'static',
      title: 'List แบบ static',
      examples: [
        {
          code: `List {
    Text("Apple")
    Text("Banana")
    Text("Cherry")
}

// ใส่ icon ด้วย Label
List {
    Label("Inbox", systemImage: "tray")
    Label("Sent", systemImage: "paperplane")
    Label("Trash", systemImage: "trash")
}`,
        },
      ],
    },
    {
      id: 'data-driven',
      title: 'List จาก array (data-driven)',
      intro: <p>ส่ง array ของ struct ที่ conform <C>Identifiable</C> เข้าไปได้ตรง ๆ.</p>,
      examples: [
        {
          code: `struct Student: Identifiable {
    let id = UUID()
    let name: String
    let grade: Int
}

@State private var students = [
    Student(name: "Alice", grade: 90),
    Student(name: "Bob", grade: 85),
    Student(name: "Charlie", grade: 78)
]

var body: some View {
    List(students) { student in
        HStack {
            Text(student.name)
            Spacer()
            Text("\\(student.grade)")
                .foregroundStyle(.secondary)
        }
    }
}`,
        },
      ],
    },
    {
      id: 'foreach',
      title: 'List + ForEach (มี swipe / delete / move)',
      intro: <p>ถ้าอยากให้ลบ/ย้ายแถวได้ ต้องใช้ <C>List</C> + <C>ForEach</C> แทน <C>List(students)</C> ตรง ๆ.</p>,
      examples: [
        {
          code: `List {
    ForEach(students) { student in
        Text(student.name)
    }
    .onDelete { indexes in
        students.remove(atOffsets: indexes)
    }
    .onMove { from, to in
        students.move(fromOffsets: from, toOffset: to)
    }
}
.toolbar {
    EditButton()        // ปุ่ม Edit สลับโหมด
}`,
        },
      ],
    },
    {
      id: 'sections',
      title: 'Section (จัดกลุ่ม)',
      examples: [
        {
          code: `List {
    Section("Today") {
        ForEach(todayItems) { item in
            Text(item.title)
        }
    }
    Section("Tomorrow") {
        ForEach(tomorrowItems) { item in
            Text(item.title)
        }
    }
    Section {
        ForEach(laterItems) { item in
            Text(item.title)
        }
    } header: {
        Text("Later").font(.title3)
    } footer: {
        Text("จะแจ้งเตือนใน 1 ชั่วโมงก่อนถึงเวลา")
    }
}`,
        },
      ],
    },
    {
      id: 'swipe',
      title: 'Swipe actions',
      examples: [
        {
          code: `List(items) { item in
    Text(item.title)
        .swipeActions(edge: .trailing, allowsFullSwipe: true) {
            Button(role: .destructive) {
                delete(item)
            } label: {
                Label("Delete", systemImage: "trash")
            }

            Button {
                archive(item)
            } label: {
                Label("Archive", systemImage: "archivebox")
            }
            .tint(.orange)
        }
        .swipeActions(edge: .leading) {
            Button {
                star(item)
            } label: {
                Label("Star", systemImage: "star.fill")
            }
            .tint(.yellow)
        }
}`,
        },
      ],
    },
    {
      id: 'styles',
      title: 'List style',
      examples: [
        {
          code: `List { ... }
    .listStyle(.plain)              // แบนราบ ไม่มี gap
    .listStyle(.inset)              // แบบ default ของ iOS
    .listStyle(.grouped)            // แบ่งกลุ่ม background เทา
    .listStyle(.insetGrouped)       // แบบ Settings app (iOS default ใน Form)
    .listStyle(.sidebar)            // แบบ sidebar (macOS / iPadOS)`,
        },
      ],
    },
    {
      id: 'row-customization',
      title: 'แต่งแต่ละ row',
      examples: [
        {
          code: `List(items) { item in
    Text(item.title)
        .listRowBackground(Color.blue.opacity(0.1))     // สีพื้น row
        .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
        .listRowSeparator(.hidden)                       // ซ่อนเส้นคั่น
        .listRowSeparatorTint(.red)                      // สีเส้นคั่น
}

// ซ่อน separator ทั้งหมด
List { ... }
    .listRowSeparator(.hidden)`,
        },
      ],
    },
    {
      id: 'navigation',
      title: 'List + NavigationLink',
      intro: <p>Pattern ที่เจอบ่อย: รายการที่กดแล้วไปดูรายละเอียด.</p>,
      examples: [
        {
          code: `NavigationStack {
    List(students) { student in
        NavigationLink {
            StudentDetailView(student: student)
        } label: {
            HStack {
                Text(student.name)
                Spacer()
                Text("\\(student.grade)")
                    .foregroundStyle(.secondary)
            }
        }
    }
    .navigationTitle("Students")
}`,
        },
      ],
    },
    {
      id: 'searchable',
      title: 'Searchable — ใส่ช่องค้นหาให้',
      examples: [
        {
          code: `@State private var searchText = ""

var filtered: [Student] {
    if searchText.isEmpty { return students }
    return students.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
}

NavigationStack {
    List(filtered) { student in
        Text(student.name)
    }
    .searchable(text: $searchText, prompt: "Search students")
}`,
        },
      ],
    },
  ],
}

export default topic
