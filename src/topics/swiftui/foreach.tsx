import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'foreach',
  title: 'ForEach',
  category: 'swiftui',
  group: 'Class 5 — List View',
  summary:
    'วน array สร้าง view หลายตัว — ใช้ใน VStack, HStack, List, Grid. ต้องบอก SwiftUI ว่าแต่ละ item แยกกันยังไงผ่าน id.',
  sections: [
    {
      id: 'identifiable',
      title: 'แบบที่ดีที่สุด — Identifiable',
      intro: <p>ถ้า model conform <C>Identifiable</C> (มี <C>id</C>) ใช้ ForEach ได้เลยไม่ต้องบอก id.</p>,
      examples: [
        {
          code: `struct Task: Identifiable {
    let id = UUID()
    let title: String
}

let tasks = [
    Task(title: "Buy milk"),
    Task(title: "Walk dog")
]

VStack {
    ForEach(tasks) { task in
        Text(task.title)
    }
}`,
        },
      ],
    },
    {
      id: 'self-id',
      title: 'array ของ value type — id: \\.self',
      intro: <p>ถ้าวน array ของ <C>String</C>, <C>Int</C> ฯลฯ ใช้ <C>id: \.self</C> ได้.</p>,
      examples: [
        {
          code: `let fruits = ["Apple", "Banana", "Cherry"]

ForEach(fruits, id: \\.self) { fruit in
    Text(fruit)
}

// Int range
ForEach(1...5, id: \\.self) { number in
    Text("\\(number)")
}`,
        },
      ],
      pitfall: <><C>id: \.self</C> ใช้ได้ถ้าค่าใน array <strong>ไม่ซ้ำ</strong>. ถ้าซ้ำ (เช่น array ของ String ที่มีค่าเหมือนกัน) ให้ใส่ id เป็น UUID หรือ index แทน.</>,
    },
    {
      id: 'range',
      title: 'วนตามจำนวน',
      examples: [
        {
          code: `// half-open range
ForEach(0..<10) { i in
    Text("Row \\(i)")
}

// closed range — ต้องใส่ id: \\.self
ForEach(1...5, id: \\.self) { i in
    Text("\\(i)")
}

// 5 ดาว
HStack {
    ForEach(0..<5) { _ in
        Image(systemName: "star.fill")
            .foregroundStyle(.yellow)
    }
}`,
        },
      ],
    },
    {
      id: 'index',
      title: 'รู้ index ของ item',
      intro: <p>ใช้ <C>Array.enumerated()</C> หรือ <C>indices</C> เพื่อรู้ลำดับ.</p>,
      examples: [
        {
          code: `// แบบ index + value
ForEach(Array(items.enumerated()), id: \\.offset) { index, item in
    HStack {
        Text("\\(index + 1).")
        Text(item.name)
    }
}

// แบบใช้ indices
ForEach(items.indices, id: \\.self) { i in
    Text("\\(i): \\(items[i].name)")
}`,
        },
      ],
    },
    {
      id: 'binding',
      title: 'Binding ใน ForEach (iOS 15+)',
      intro: <p>ใช้ <C>$</C> หน้า array เพื่อให้ each iteration ได้ <C>Binding</C> ของ element นั้น — แก้ค่าใน array ได้ตรง ๆ.</p>,
      examples: [
        {
          code: `struct Task: Identifiable {
    let id = UUID()
    var title: String
    var done: Bool = false
}

@State private var tasks: [Task] = [...]

VStack {
    ForEach($tasks) { $task in
        HStack {
            Toggle("", isOn: $task.done)
                .labelsHidden()
            TextField("Title", text: $task.title)
        }
    }
}`,
        },
      ],
    },
    {
      id: 'in-stack',
      title: 'ใน Stack vs List',
      examples: [
        {
          code: `// VStack — แสดงทุกตัวพร้อมกัน
VStack {
    ForEach(items) { item in
        ItemRow(item: item)
    }
}

// LazyVStack — สร้างเฉพาะที่เห็น (ดี perf)
ScrollView {
    LazyVStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}

// HStack แนวนอน
HStack {
    ForEach(tags, id: \\.self) { tag in
        Text(tag)
            .padding(.horizontal, 8)
            .background(.gray.opacity(0.2), in: .capsule)
    }
}`,
        },
      ],
    },
    {
      id: 'pitfall',
      title: 'Pitfall — id ซ้ำ',
      intro: <p>ถ้า id ซ้ำ SwiftUI จะ render ผิด, animation พัง, หรือ crash.</p>,
      examples: [
        {
          code: `// ❌ ซ้ำได้ (string มีโอกาสซ้ำ)
let names = ["Alice", "Bob", "Alice"]
ForEach(names, id: \\.self) { ... }   // crash หรือ render ผิด

// ✅ ใช้ index แทน
ForEach(names.indices, id: \\.self) { i in
    Text(names[i])
}

// ✅ ใช้ struct + UUID
struct NamedItem: Identifiable {
    let id = UUID()
    let name: String
}
let items = names.map { NamedItem(name: $0) }
ForEach(items) { Text($0.name) }`,
        },
      ],
    },
  ],
}

export default topic
