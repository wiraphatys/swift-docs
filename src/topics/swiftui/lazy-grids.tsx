import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'lazy-grids',
  title: 'LazyVGrid & LazyHGrid',
  category: 'swiftui',
  group: 'Class 6 — Grid Layout',
  summary:
    'Grid ที่ scroll ได้ + lazy render — เหมาะกับ data เยอะ ๆ. กำหนดคอลัมน์ผ่าน [GridItem].',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      intro: <p>ต้องอยู่ใน <C>ScrollView</C>. กำหนดคอลัมน์ผ่าน <C>[GridItem]</C>.</p>,
      examples: [
        {
          code: `let columns = [
    GridItem(.flexible()),
    GridItem(.flexible())
]

ScrollView {
    LazyVGrid(columns: columns, spacing: 12) {
        ForEach(0..<20) { i in
            Color.blue.opacity(0.3)
                .frame(height: 100)
                .overlay(Text("\\(i)"))
        }
    }
    .padding()
}`,
        },
      ],
    },
    {
      id: 'griditem-types',
      title: 'GridItem 3 แบบ',
      examples: [
        {
          code: `// 1. .flexible — ขยาย/ย่อตามพื้นที่ (เหมือน frame .infinity)
let columns = [
    GridItem(.flexible()),
    GridItem(.flexible())
]
// → 2 คอลัมน์ขนาดเท่ากันเสมอ

// 2. .fixed — ความกว้างตายตัว
let columns = [
    GridItem(.fixed(80)),
    GridItem(.fixed(80)),
    GridItem(.fixed(80))
]

// 3. .adaptive — ใส่ตัวที่กว้างไม่น้อยกว่า min, แทรกได้กี่ตัวก็ตาม
let columns = [
    GridItem(.adaptive(minimum: 100))
]
// → จำนวนคอลัมน์เปลี่ยนตามขนาดหน้าจอ`,
        },
      ],
    },
    {
      id: 'common',
      title: 'Pattern ใช้บ่อย',
      examples: [
        {
          code: `// 1. Grid 3 คอลัมน์เท่ากัน (เช่น album, gallery)
let columns = Array(repeating: GridItem(.flexible(), spacing: 4), count: 3)

ScrollView {
    LazyVGrid(columns: columns, spacing: 4) {
        ForEach(photos, id: \\.self) { photo in
            Image(photo)
                .resizable()
                .scaledToFill()
                .frame(height: 120)
                .clipped()
        }
    }
}

// 2. Adaptive — ขนาดสินค้าคงที่ จำนวนคอลัมน์เปลี่ยนตามจอ
let columns = [GridItem(.adaptive(minimum: 150))]

ScrollView {
    LazyVGrid(columns: columns, spacing: 16) {
        ForEach(products) { p in
            ProductCard(product: p)
        }
    }
    .padding()
}

// 3. ผสม fixed + flexible — sidebar เลย์เอาต์
let columns = [
    GridItem(.fixed(80)),       // sidebar
    GridItem(.flexible())        // content
]`,
        },
      ],
    },
    {
      id: 'horizontal',
      title: 'LazyHGrid — แนวนอน',
      examples: [
        {
          code: `let rows = [
    GridItem(.fixed(60)),
    GridItem(.fixed(60))
]

ScrollView(.horizontal) {
    LazyHGrid(rows: rows, spacing: 12) {
        ForEach(thumbnails) { thumb in
            Image(thumb.name)
                .resizable()
                .scaledToFill()
                .frame(width: 100, height: 60)
                .clipShape(.rect(cornerRadius: 6))
        }
    }
    .padding()
}`,
        },
      ],
    },
    {
      id: 'sections',
      title: 'มี Section + sticky header',
      examples: [
        {
          code: `ScrollView {
    LazyVGrid(columns: columns, pinnedViews: [.sectionHeaders]) {
        ForEach(groups) { group in
            Section {
                ForEach(group.items) { item in
                    ItemCell(item: item)
                }
            } header: {
                Text(group.name)
                    .font(.title3)
                    .bold()
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(.regularMaterial)
            }
        }
    }
}`,
        },
      ],
    },
  ],
}

export default topic
