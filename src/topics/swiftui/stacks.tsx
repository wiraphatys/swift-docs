import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'stacks',
  title: 'VStack / HStack / ZStack',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'จัดวาง view 3 แบบ: VStack (แนวตั้ง), HStack (แนวนอน), ZStack (ซ้อนทับ). ใช้ Spacer ดันชิดขอบ, spacing คุมระยะ.',
  sections: [
    {
      id: 'vstack',
      title: 'VStack — แนวตั้ง',
      examples: [
        {
          code: `VStack {
    Text("Title").font(.title)
    Text("Subtitle").foregroundStyle(.secondary)
    Text("Body")
}

// กำหนดระยะระหว่าง view
VStack(spacing: 16) {
    Text("A")
    Text("B")
    Text("C")
}

// alignment ของแนวนอน
VStack(alignment: .leading) {
    Text("Left")
    Text("Aligned")
}

VStack(alignment: .trailing) { ... }
VStack(alignment: .center)  { ... }     // default`,
        },
      ],
    },
    {
      id: 'hstack',
      title: 'HStack — แนวนอน',
      examples: [
        {
          code: `HStack {
    Image(systemName: "star.fill")
    Text("Featured")
}

// spacing + alignment
HStack(alignment: .center, spacing: 12) {
    Image("avatar").resizable().frame(width: 40, height: 40)
    VStack(alignment: .leading) {
        Text("John Doe").bold()
        Text("Online").font(.caption).foregroundStyle(.green)
    }
}

// alignment แนวตั้งใน HStack
HStack(alignment: .top)              { ... }
HStack(alignment: .center)           { ... }    // default
HStack(alignment: .bottom)           { ... }
HStack(alignment: .firstTextBaseline){ ... }`,
        },
      ],
    },
    {
      id: 'zstack',
      title: 'ZStack — ซ้อนทับ',
      intro: <p>ตัวล่างของ ZStack อยู่ <strong>ข้างหลัง</strong>, ตัวบนสุดในโค้ดอยู่ <strong>ข้างหน้า</strong>.</p>,
      examples: [
        {
          code: `ZStack {
    Color.blue.ignoresSafeArea()
    Text("Hello").foregroundStyle(.white)
}

// ใส่ badge บนรูป
ZStack(alignment: .topTrailing) {
    Image("avatar")
        .resizable()
        .frame(width: 60, height: 60)
        .clipShape(.circle)

    Circle()
        .fill(.red)
        .frame(width: 14, height: 14)
        .overlay(Text("3").font(.caption2).foregroundStyle(.white))
}`,
        },
      ],
      note: <>ใช้ <C>.overlay</C> หรือ <C>.background</C> แทน ZStack ถ้าซ้อนแค่ 2 ชั้น — สั้นกว่า.</>,
    },
    {
      id: 'spacer',
      title: 'Spacer — ดันให้ชิดขอบ',
      examples: [
        {
          code: `// ดันไปทางขวา
HStack {
    Text("Left")
    Spacer()
    Text("Right")
}

// แบ่งสามส่วนเท่ากัน
HStack {
    Text("A")
    Spacer()
    Text("B")
    Spacer()
    Text("C")
}

// ดันลงล่าง
VStack {
    Text("Top")
    Spacer()
    Text("Bottom")
}

// Spacer ระยะขั้นต่ำ
HStack {
    Text("Hi")
    Spacer(minLength: 20)    // ห่างอย่างน้อย 20
    Text("There")
}`,
        },
      ],
    },
    {
      id: 'divider',
      title: 'Divider — เส้นแบ่ง',
      examples: [
        {
          code: `VStack {
    Text("Section 1")
    Divider()
    Text("Section 2")
    Divider()
    Text("Section 3")
}

// ใน HStack เป็นเส้นแนวตั้ง
HStack {
    Text("Left")
    Divider()
    Text("Right")
}
.frame(height: 30)`,
        },
      ],
    },
    {
      id: 'nested',
      title: 'Stack ซ้อน Stack — pattern หลัก',
      intro: <p>หน้าจอจริงเกือบทั้งหมดคือ stack ซ้อน stack.</p>,
      examples: [
        {
          code: `// Card layout
HStack(spacing: 12) {
    Image("photo")
        .resizable()
        .frame(width: 60, height: 60)
        .clipShape(.rect(cornerRadius: 8))

    VStack(alignment: .leading, spacing: 4) {
        Text("Title").bold()
        Text("Subtitle").foregroundStyle(.secondary)
        HStack(spacing: 4) {
            Image(systemName: "star.fill").foregroundStyle(.yellow)
            Text("4.5")
        }
        .font(.caption)
    }

    Spacer()

    Image(systemName: "chevron.right")
        .foregroundStyle(.tertiary)
}
.padding()
.background(.regularMaterial, in: .rect(cornerRadius: 12))`,
        },
      ],
    },
    {
      id: 'limit',
      title: 'ข้อจำกัด: ใส่ View เกิน 10 ตัว',
      intro: <p>Stack รับ View ได้ 10 ตัวต่อ block. เกินนั้นต้องใช้ <C>Group</C> หรือ <C>ForEach</C>.</p>,
      examples: [
        {
          code: `// ❌ เกิน 10 ตัว — error
VStack {
    Text("1"); Text("2"); ... ; Text("11")
}

// ✅ ใช้ Group
VStack {
    Group {
        Text("1"); Text("2"); ...; Text("6")
    }
    Group {
        Text("7"); ...; Text("11")
    }
}

// ✅ หรือใช้ ForEach
VStack {
    ForEach(1...20, id: \\.self) { i in
        Text("\\(i)")
    }
}`,
        },
      ],
    },
  ],
}

export default topic
