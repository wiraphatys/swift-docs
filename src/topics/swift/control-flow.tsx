import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'control-flow',
  title: 'Control Flow',
  category: 'swift',
  group: 'Class 1 — Swift Basics',
  summary:
    'if / else, switch, for-in, while — โครงสร้างหลักของการตัดสินใจและวนซ้ำใน Swift.',
  sections: [
    {
      id: 'if',
      title: 'if / else',
      examples: [
        {
          code: `let age = 18

if age >= 18 {
    print("Adult")
} else if age >= 13 {
    print("Teen")
} else {
    print("Child")
}

// if ใช้เป็น expression ได้ (Swift 5.9+)
let label = if age >= 18 { "Adult" } else { "Minor" }

// เงื่อนไขหลายอย่าง
if age >= 18 && hasID {
    print("Can enter")
}

if isLoggedIn || isGuest {
    print("Show home")
}`,
        },
      ],
    },
    {
      id: 'switch',
      title: 'switch',
      intro: <p>switch ใน Swift ต้อง <strong>ครอบทุกกรณี</strong> ถ้าไม่ครบต้องมี <C>default</C>.</p>,
      examples: [
        {
          code: `let grade = "B"

switch grade {
case "A":
    print("Excellent")
case "B", "C":              // หลายค่าในกรณีเดียว
    print("Good")
case "D":
    print("Pass")
default:
    print("Fail")
}

// เปรียบเทียบช่วงตัวเลข
let score = 75
switch score {
case 0..<50:
    print("F")
case 50..<70:
    print("C")
case 70..<85:
    print("B")
case 85...100:
    print("A")
default:
    print("Invalid")
}`,
        },
      ],
      bullets: [
        <><C>0..&lt;50</C> = 0 ถึง 49 (ไม่รวม 50)</>,
        <><C>50...100</C> = 50 ถึง 100 (รวม 100)</>,
      ],
    },
    {
      id: 'for-in',
      title: 'for-in',
      examples: [
        {
          code: `// วนตามจำนวน
for i in 1...5 {
    print(i)            // 1, 2, 3, 4, 5
}

for i in 0..<5 {
    print(i)            // 0, 1, 2, 3, 4
}

// วนตาม array
let names = ["Alice", "Bob", "Charlie"]
for name in names {
    print(name)
}

// วนพร้อม index
for (index, name) in names.enumerated() {
    print("\\(index): \\(name)")
}

// วนตาม dictionary
let scores = ["Alice": 90, "Bob": 85]
for (name, score) in scores {
    print("\\(name) got \\(score)")
}

// ข้ามทีละหลายค่า
for i in stride(from: 0, to: 100, by: 10) {
    print(i)            // 0, 10, 20, ..., 90
}`,
        },
      ],
    },
    {
      id: 'while',
      title: 'while / repeat-while',
      examples: [
        {
          code: `// while — เช็คก่อนทำ
var count = 0
while count < 5 {
    print(count)
    count += 1
}

// repeat-while — ทำก่อนเช็ค (อย่างน้อย 1 รอบ)
var n = 10
repeat {
    print(n)
    n -= 1
} while n > 0`,
        },
      ],
    },
    {
      id: 'break-continue',
      title: 'break / continue',
      examples: [
        {
          code: `// break — ออกจาก loop
for i in 1...10 {
    if i == 5 {
        break               // หยุดที่ 5
    }
    print(i)                // 1, 2, 3, 4
}

// continue — ข้ามรอบนี้
for i in 1...5 {
    if i % 2 == 0 {
        continue            // ข้ามเลขคู่
    }
    print(i)                // 1, 3, 5
}`,
        },
      ],
    },
    {
      id: 'guard',
      title: 'guard — exit early',
      intro: <p>ใช้ guard เพื่อ "ออกถ้าไม่ผ่าน" — ลดการ nest if ลึก ๆ.</p>,
      examples: [
        {
          code: `func greet(name: String?) {
    guard let name = name, !name.isEmpty else {
        print("No name")
        return
    }
    // หลังจากนี้ name เป็น String ที่ไม่ว่างแล้ว
    print("Hello, \\(name)")
}

func divide(_ a: Int, by b: Int) -> Int? {
    guard b != 0 else { return nil }
    return a / b
}`,
        },
      ],
      note: <><C>guard</C> ต้องมี <C>return</C>, <C>throw</C>, <C>break</C>, หรือ <C>continue</C> ใน else.</>,
    },
  ],
}

export default topic
