import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'grid-layout',
  title: 'Grid & GridRow',
  category: 'swiftui',
  group: 'Class 6 — Grid Layout',
  summary:
    'ตาราง view ที่จำนวนแถว/คอลัมน์ตายตัว — view คอลัมน์เดียวกันของแต่ละแถวจะถูก align ให้อัตโนมัติ.',
  intro: (
    <p>
      <C>Grid</C> + <C>GridRow</C> เหมาะกับเลย์เอาต์แบบตาราง คงที่ (เช่น ตารางคะแนน,
      keypad). ถ้า data เปลี่ยนตามผู้ใช้ + scroll ได้ใช้ <C>LazyVGrid</C> แทน.
    </p>
  ),
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `Grid {
    GridRow {
        Text("🐶")
        Text("🐱")
        Text("🐭")
    }
    GridRow {
        Text("🦊")
        Text("🐻")
        Text("🐼")
    }
    GridRow {
        Text("🐯")
        Text("🦁")
        Text("🐮")
    }
}
.font(.system(size: 40))`,
        },
      ],
      bullets: [
        <>จำนวน column = จำนวน view สูงสุดของ <C>GridRow</C></>,
        <>view คอลัมน์เดียวกันของแต่ละแถวจะ align ให้อัตโนมัติ</>,
      ],
    },
    {
      id: 'spacing',
      title: 'ระยะห่าง',
      examples: [
        {
          code: `Grid(horizontalSpacing: 12, verticalSpacing: 8) {
    GridRow {
        Text("Name").bold()
        Text("Score").bold()
        Text("Grade").bold()
    }
    Divider()
    GridRow {
        Text("Alice")
        Text("95")
        Text("A")
    }
    GridRow {
        Text("Bob")
        Text("82")
        Text("B")
    }
}`,
        },
      ],
    },
    {
      id: 'images',
      title: 'Grid ของรูป',
      examples: [
        {
          code: `Grid {
    GridRow {
        Image("photo1").resizable().scaledToFit()
        Image("photo2").resizable().scaledToFit()
        Image("photo3").resizable().scaledToFit()
    }
    GridRow {
        Image("photo4").resizable().scaledToFit()
        Image("photo5").resizable().scaledToFit()
        Image("photo6").resizable().scaledToFit()
    }
}
.padding()`,
        },
      ],
    },
    {
      id: 'span',
      title: 'View ครอบหลายคอลัมน์',
      intro: <p>ใช้ <C>.gridCellColumns()</C> ให้ view กินมากกว่า 1 คอลัมน์.</p>,
      examples: [
        {
          code: `Grid {
    GridRow {
        Text("Header")
            .gridCellColumns(3)             // กิน 3 คอลัมน์
            .frame(maxWidth: .infinity)
            .padding()
            .background(.blue.opacity(0.2))
    }
    GridRow {
        Text("A")
        Text("B")
        Text("C")
    }
    GridRow {
        Text("D")
        Text("E")
        Text("F")
    }
}`,
        },
      ],
    },
    {
      id: 'compare',
      title: 'Grid vs LazyVGrid',
      bullets: [
        <><C>Grid</C> — แถว/คอลัมน์คงที่, render ทั้งหมดทันที, ไม่ scroll, align column ดี</>,
        <><C>LazyVGrid</C> — data เยอะ scroll ได้, lazy render, จำนวน column ตามเงื่อนไข</>,
      ],
    },
  ],
}

export default topic
