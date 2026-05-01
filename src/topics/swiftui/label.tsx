import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'label',
  title: 'Label',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'รวม icon + text เป็นชุดเดียว — ใช้ใน toolbar, list row, button, settings เพื่อให้สื่อความหมายชัดทั้งภาพและข้อความ.',
  intro: (
    <p>
      <C>Label</C> = <C>Image</C> + <C>Text</C> ที่ผูกกันให้แสดงผลถูกที่ตามบริบท.
      ใน toolbar เห็นเป็นไอคอน, ใน list row เห็นเป็นไอคอน + คำ, ใน Settings
      เห็นเป็นไอคอนพื้นหลังสีพร้อมตัวหนังสือ.
    </p>
  ),
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `Label("Favorites", systemImage: "heart.fill")
Label("Settings", systemImage: "gearshape")
Label("Trash", systemImage: "trash")

// รูปจาก asset แทน SF Symbol
Label("Profile", image: "avatar")

// แต่งสีไอคอน
Label("Warning", systemImage: "exclamationmark.triangle.fill")
    .foregroundStyle(.orange)`,
        },
      ],
    },
    {
      id: 'use-cases',
      title: 'ใช้ใน Button / List / Toolbar',
      examples: [
        {
          code: `// ใน Button — ปุ่มมีไอคอนกับคำพร้อมกัน
Button {
    save()
} label: {
    Label("Save", systemImage: "square.and.arrow.down")
}
.buttonStyle(.borderedProminent)

// ใน List row
List {
    Label("Inbox", systemImage: "tray")
    Label("Sent", systemImage: "paperplane")
    Label("Trash", systemImage: "trash")
}

// ใน Toolbar — auto แสดงเฉพาะไอคอน
.toolbar {
    Button {
        share()
    } label: {
        Label("Share", systemImage: "square.and.arrow.up")
    }
}`,
        },
      ],
    },
    {
      id: 'style',
      title: 'labelStyle (เลือกแสดงไอคอน/คำ)',
      examples: [
        {
          code: `Label("Bookmark", systemImage: "bookmark.fill")
    .labelStyle(.iconOnly)         // เฉพาะไอคอน
    .labelStyle(.titleOnly)        // เฉพาะคำ
    .labelStyle(.titleAndIcon)     // ทั้งคู่ (ค่า default)

// ใช้ตอนพื้นที่จำกัด
HStack {
    Label("Filter", systemImage: "line.horizontal.3.decrease.circle")
        .labelStyle(.iconOnly)     // ใน HStack แสดงไอคอนเล็ก ๆ
    Label("Sort", systemImage: "arrow.up.arrow.down")
        .labelStyle(.iconOnly)
}`,
        },
      ],
    },
    {
      id: 'custom',
      title: 'Custom Label (ข้อความ + รูปอะไรก็ได้)',
      examples: [
        {
          code: `Label {
    VStack(alignment: .leading) {
        Text("John Doe").bold()
        Text("Online").font(.caption).foregroundStyle(.green)
    }
} icon: {
    Image("avatar")
        .resizable()
        .frame(width: 40, height: 40)
        .clipShape(.circle)
}`,
        },
      ],
    },
  ],
}

export default topic
