import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'collections',
  title: 'Array, Set, Dictionary',
  category: 'swift',
  group: 'Class 1 — Swift Basics',
  summary:
    'โครงสร้างข้อมูล 3 แบบของ Swift: Array (เรียงลำดับ), Set (ไม่ซ้ำ), Dictionary (key-value).',
  sections: [
    {
      id: 'array',
      title: 'Array',
      intro: <p>เก็บค่าหลายค่าตามลำดับ. ค่าซ้ำได้.</p>,
      examples: [
        {
          code: `// สร้าง
var fruits = ["apple", "banana", "cherry"]
var numbers: [Int] = [1, 2, 3]
var empty: [String] = []

// อ่านค่า
fruits[0]                    // "apple"
fruits.first                 // Optional("apple")
fruits.last                  // Optional("cherry")
fruits.count                 // 3
fruits.isEmpty               // false

// เพิ่ม
fruits.append("grape")
fruits.insert("kiwi", at: 0)
fruits += ["mango", "lemon"]

// ลบ
fruits.remove(at: 0)
fruits.removeFirst()
fruits.removeLast()
fruits.removeAll()

// แก้
fruits[1] = "blueberry"

// ตรวจ
fruits.contains("apple")     // true
fruits.firstIndex(of: "apple")  // Optional(0)`,
        },
      ],
    },
    {
      id: 'array-methods',
      title: 'Array — methods ที่ใช้บ่อย',
      examples: [
        {
          code: `let nums = [3, 1, 4, 1, 5, 9, 2, 6]

// เรียง
nums.sorted()                // [1, 1, 2, 3, 4, 5, 6, 9]
nums.sorted(by: >)           // [9, 6, 5, 4, 3, 2, 1, 1]
nums.reversed()              // [6, 2, 9, 5, 1, 4, 1, 3]

// แปลงทุกตัว
nums.map { $0 * 2 }          // [6, 2, 8, 2, 10, 18, 4, 12]

// กรอง
nums.filter { $0 > 3 }       // [4, 5, 9, 6]

// รวมเป็นค่าเดียว
nums.reduce(0, +)            // 31 (ผลบวก)
nums.max()                   // Optional(9)
nums.min()                   // Optional(1)

// วนทำงาน
nums.forEach { print($0) }

// chain ได้
let result = nums
    .filter { $0 > 1 }
    .map { $0 * 10 }
    .reduce(0, +)`,
        },
      ],
    },
    {
      id: 'set',
      title: 'Set',
      intro: <p>ค่าไม่ซ้ำ ไม่มีลำดับ. ใช้ตอนสนใจแค่ "มีอยู่หรือเปล่า".</p>,
      examples: [
        {
          code: `var tags: Set<String> = ["swift", "ios", "swift"]
print(tags.count)            // 2 (ซ้ำตัด)

tags.insert("xcode")
tags.remove("ios")
tags.contains("swift")       // true

// operations แบบเซ็ต
let a: Set = [1, 2, 3]
let b: Set = [3, 4, 5]

a.union(b)                   // {1,2,3,4,5}
a.intersection(b)            // {3}
a.subtracting(b)             // {1,2}`,
        },
      ],
    },
    {
      id: 'dict',
      title: 'Dictionary',
      intro: <p>เก็บแบบ key-value. key ต้องไม่ซ้ำ.</p>,
      examples: [
        {
          code: `// สร้าง
var scores: [String: Int] = [
    "Alice": 90,
    "Bob": 85
]

// อ่าน — ได้ Optional เพราะ key อาจไม่มี
scores["Alice"]              // Optional(90)
scores["Charlie"]            // nil

// อ่านพร้อม default
scores["Charlie", default: 0]    // 0

// เพิ่ม / แก้
scores["Charlie"] = 70       // เพิ่ม
scores["Alice"] = 95         // แก้

// ลบ
scores["Bob"] = nil          // ใส่ nil = ลบ
scores.removeValue(forKey: "Alice")

// ตรวจ
scores.count                 // จำนวน
scores.isEmpty               // ว่างไหม
scores.keys                  // ทุก key
scores.values                // ทุก value

// วน
for (name, score) in scores {
    print("\\(name): \\(score)")
}`,
        },
      ],
    },
    {
      id: 'choose',
      title: 'เลือกใช้ตัวไหน',
      bullets: [
        <><C>Array</C> — ลำดับสำคัญ, ค่าซ้ำได้, เข้าถึงด้วย index</>,
        <><C>Set</C> — สนใจแค่มี/ไม่มี, ค่าต้องไม่ซ้ำ, หาเร็ว</>,
        <><C>Dictionary</C> — มองหาค่าจาก key (เช่น user id → user)</>,
      ],
    },
  ],
}

export default topic
