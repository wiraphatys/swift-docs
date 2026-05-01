import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'scrollview',
  title: 'ScrollView',
  category: 'swiftui',
  group: 'Class 4 — Navigation & ScrollView',
  summary:
    'ห่อ content เพื่อให้เลื่อนได้ — แนวตั้ง (default), แนวนอน หรือทั้งคู่. ใช้คู่กับ VStack/HStack/LazyVStack ภายใน.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      intro: <p>ScrollView โดย default เป็นแนวตั้ง. ใส่ VStack ข้างในเพื่อเรียง content.</p>,
      examples: [
        {
          code: `ScrollView {
    VStack(spacing: 16) {
        ForEach(0..<50) { i in
            Text("Item \\(i)")
                .frame(maxWidth: .infinity)
                .padding()
                .background(.gray.opacity(0.1), in: .rect(cornerRadius: 8))
        }
    }
    .padding()
}`,
        },
      ],
    },
    {
      id: 'horizontal',
      title: 'แนวนอน',
      examples: [
        {
          code: `ScrollView(.horizontal) {
    HStack(spacing: 12) {
        ForEach(items) { item in
            ItemCard(item: item)
                .frame(width: 200)
        }
    }
    .padding(.horizontal)
}

// ทั้งสองแกน
ScrollView([.horizontal, .vertical]) {
    LargeContent()
}`,
        },
      ],
    },
    {
      id: 'hide-indicator',
      title: 'ซ่อนแถบ scroll',
      examples: [
        {
          code: `ScrollView(.horizontal, showsIndicators: false) {
    HStack { ... }
}

// แบบใหม่
ScrollView(.horizontal) { ... }
    .scrollIndicators(.hidden)
    .scrollIndicators(.visible)
    .scrollIndicators(.never)        // ซ่อนตลอด`,
        },
      ],
    },
    {
      id: 'lazy',
      title: 'LazyVStack — โหลดทีละชิ้นเมื่อเลื่อนถึง',
      intro: <p>ใช้แทน VStack เมื่อมี item เยอะ — ดีต่อ performance เพราะสร้าง view เฉพาะที่อยู่บนจอ.</p>,
      examples: [
        {
          code: `ScrollView {
    LazyVStack(spacing: 8) {            // lazy = สร้างเฉพาะที่เห็น
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}

// แนวนอน
ScrollView(.horizontal) {
    LazyHStack(spacing: 12) {
        ForEach(items) { item in
            Card(item: item)
        }
    }
}`,
        },
      ],
      note: <>VStack สร้าง view ทุกตัวเลย แม้ไม่อยู่บนจอ. ถ้า item &gt; 30-50 ชิ้น ให้เปลี่ยนเป็น LazyVStack.</>,
    },
    {
      id: 'scroll-to',
      title: 'เลื่อนไปยังตำแหน่งที่กำหนด',
      intro: <p>ใช้ <C>ScrollViewReader</C> + <C>.id()</C> เพื่อเลื่อนไป view เฉพาะ.</p>,
      examples: [
        {
          code: `ScrollViewReader { proxy in
    ScrollView {
        VStack {
            ForEach(0..<100) { i in
                Text("Row \\(i)")
                    .id(i)               // ตั้ง id ให้ scroll ถึง
            }
        }
    }
    .toolbar {
        Button("Top") {
            withAnimation {
                proxy.scrollTo(0, anchor: .top)
            }
        }
        Button("Bottom") {
            withAnimation {
                proxy.scrollTo(99, anchor: .bottom)
            }
        }
    }
}`,
        },
      ],
    },
    {
      id: 'refreshable',
      title: 'Pull to refresh',
      intro: <p>ดึงลงเพื่อรีเฟรช — เพิ่ม <C>.refreshable</C> ครั้งเดียวก็พอ.</p>,
      examples: [
        {
          code: `ScrollView {
    LazyVStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}
.refreshable {
    await viewModel.reload()
}`,
        },
      ],
    },
    {
      id: 'scroll-position',
      title: 'รู้ตำแหน่ง scroll (iOS 17+)',
      examples: [
        {
          code: `@State private var scrolledID: Int?

ScrollView {
    LazyVStack {
        ForEach(0..<100, id: \\.self) { i in
            Text("Row \\(i)")
                .id(i)
        }
    }
    .scrollTargetLayout()
}
.scrollPosition(id: $scrolledID)

// ใช้ scrolledID ทำอะไรก็ได้ เช่น แสดงในหัว
Text("Now at row \\(scrolledID ?? 0)")`,
        },
      ],
    },
    {
      id: 'paging',
      title: 'Snap-paging (iOS 17+)',
      intro: <p>เลื่อนแล้วเด้งไป item ถัดไป (เหมาะกับ horizontal carousel).</p>,
      examples: [
        {
          code: `ScrollView(.horizontal) {
    LazyHStack {
        ForEach(items) { item in
            ItemCard(item: item)
                .frame(width: 300)
        }
    }
    .scrollTargetLayout()
}
.scrollTargetBehavior(.viewAligned)        // snap to items
.contentMargins(.horizontal, 32)`,
        },
      ],
    },
  ],
}

export default topic
