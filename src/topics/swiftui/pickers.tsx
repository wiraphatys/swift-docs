import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'pickers',
  title: 'Picker & DatePicker',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'เลือกค่า 1 จากหลายตัว — Picker (รายการ), DatePicker (วันที่), ColorPicker (สี). เปลี่ยน style ได้ตาม context.',
  sections: [
    {
      id: 'basic-string',
      title: 'Picker จาก array ของ String',
      examples: [
        {
          code: `@State private var selected = "Apple"
let fruits = ["Apple", "Banana", "Cherry"]

Picker("Fruit", selection: $selected) {
    ForEach(fruits, id: \\.self) { fruit in
        Text(fruit).tag(fruit)
    }
}`,
        },
      ],
      note: <><C>.tag()</C> ต้องตรงกับชนิดของ <C>selection</C> — ถ้า selection เป็น String, tag ต้อง String.</>,
    },
    {
      id: 'styles',
      title: 'รูปแบบ — pickerStyle',
      examples: [
        {
          code: `// menu — แสดงเป็น dropdown (default ใน Form)
Picker("Theme", selection: $theme) {
    Text("Light").tag("light")
    Text("Dark").tag("dark")
    Text("System").tag("system")
}
.pickerStyle(.menu)

// segmented — ปุ่ม 2-4 ตัวเรียงข้างกัน
Picker("View", selection: $viewMode) {
    Text("Day").tag("day")
    Text("Week").tag("week")
    Text("Month").tag("month")
}
.pickerStyle(.segmented)

// wheel — ล้อเลื่อนแบบ iOS classic
Picker("Hour", selection: $hour) {
    ForEach(0..<24) { Text("\\($0)").tag($0) }
}
.pickerStyle(.wheel)

// inline — แสดงเป็นรายการในที่
Picker("Size", selection: $size) {
    Text("S").tag("S")
    Text("M").tag("M")
    Text("L").tag("L")
}
.pickerStyle(.inline)`,
        },
      ],
      bullets: [
        <><C>.menu</C> — มีตัวเลือกเยอะ (5+)</>,
        <><C>.segmented</C> — 2-4 ตัวเลือก เห็นพร้อมกัน</>,
        <><C>.wheel</C> — เน้นเลือกตัวเลข เช่น เวลา</>,
      ],
    },
    {
      id: 'enum',
      title: 'Picker กับ enum (วิธีที่สะอาดสุด)',
      examples: [
        {
          code: `enum Theme: String, CaseIterable, Identifiable {
    case light, dark, system
    var id: Self { self }
}

@State private var theme: Theme = .system

Picker("Theme", selection: $theme) {
    ForEach(Theme.allCases) { t in
        Text(t.rawValue.capitalized).tag(t)
    }
}
.pickerStyle(.segmented)`,
        },
      ],
    },
    {
      id: 'in-form',
      title: 'Picker ใน Form',
      intro: <p>ใน Form / List, Picker จะแสดงเป็นแถวที่กดแล้วเปิดหน้าเลือกอัตโนมัติ.</p>,
      examples: [
        {
          code: `Form {
    Picker("Country", selection: $country) {
        ForEach(countries, id: \\.self) { c in
            Text(c).tag(c)
        }
    }

    Picker("Language", selection: $lang) {
        Text("ภาษาไทย").tag("th")
        Text("English").tag("en")
    }
}`,
        },
      ],
    },
    {
      id: 'date',
      title: 'DatePicker',
      examples: [
        {
          code: `@State private var date = Date()

// แบบเริ่มต้น (compact)
DatePicker("Birthday", selection: $date)

// เฉพาะวันที่ ไม่เอาเวลา
DatePicker("Date", selection: $date, displayedComponents: .date)

// เฉพาะเวลา
DatePicker("Time", selection: $date, displayedComponents: .hourAndMinute)

// ทั้งคู่
DatePicker("When", selection: $date, displayedComponents: [.date, .hourAndMinute])

// จำกัดช่วง
DatePicker(
    "Date",
    selection: $date,
    in: Date()...,                              // ตั้งแต่วันนี้เป็นต้นไป
    displayedComponents: .date
)

DatePicker(
    "Date",
    selection: $date,
    in: ...Date(),                              // ก่อนวันนี้เท่านั้น
    displayedComponents: .date
)`,
        },
      ],
    },
    {
      id: 'date-style',
      title: 'DatePicker styles',
      examples: [
        {
          code: `// compact — ปุ่มที่กดแล้วเปิดเลือก (default)
DatePicker("Date", selection: $date)
    .datePickerStyle(.compact)

// graphical — ปฏิทินเต็มแสดงในที่
DatePicker("Date", selection: $date, displayedComponents: .date)
    .datePickerStyle(.graphical)

// wheel — ล้อเลื่อนเต็มหน้า
DatePicker("Time", selection: $date)
    .datePickerStyle(.wheel)`,
        },
      ],
    },
    {
      id: 'color',
      title: 'ColorPicker',
      examples: [
        {
          code: `@State private var color: Color = .blue

ColorPicker("Background", selection: $color)

// ไม่อนุญาต opacity
ColorPicker("Color", selection: $color, supportsOpacity: false)

// ใช้ค่าที่เลือก
Rectangle()
    .fill(color)
    .frame(height: 100)`,
        },
      ],
    },
  ],
}

export default topic
