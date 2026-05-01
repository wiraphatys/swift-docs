import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'variables-constants',
  title: 'Variables & Constants',
  category: 'swift',
  group: 'Class 1 — Swift Basics',
  summary:
    'var = ตัวแปร (เปลี่ยนค่าได้), let = ค่าคงที่ (เปลี่ยนไม่ได้). เลือก let ก่อนเสมอ.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `// var — เปลี่ยนค่าได้
var count = 0
count = 5
count += 1            // 6

// let — เปลี่ยนไม่ได้
let pi = 3.14
// pi = 3.15          ❌ error: cannot assign to value: 'pi' is a 'let' constant

// ถ้าไม่ใส่ค่าตอนแรก ต้องบอก type
var name: String
name = "Anon"`,
        },
      ],
      bullets: [
        <>เลือก <C>let</C> ก่อนทุกครั้งที่ทำได้ — ปลอดภัยกว่า</>,
        <>ใช้ <C>var</C> เฉพาะเมื่อต้องการเปลี่ยนค่าจริง ๆ</>,
      ],
    },
    {
      id: 'type-annotation',
      title: 'ระบุชนิด (Type Annotation)',
      intro: <p>Swift เดาชนิดให้ได้ แต่ระบุเองได้เพื่อความชัด หรือเมื่อเดาไม่ได้.</p>,
      examples: [
        {
          code: `// เดาเอง (type inference)
let age = 18              // Int
let pi = 3.14             // Double
let name = "Anon"         // String
let isActive = true       // Bool

// ระบุเอง
let age: Int = 18
let height: Double = 165.5
let name: String = "Anon"

// ตอนสร้าง array ว่าง ต้องระบุ
var scores: [Int] = []
var items: [String] = []`,
        },
      ],
    },
    {
      id: 'naming',
      title: 'การตั้งชื่อ',
      examples: [
        {
          code: `// camelCase (มาตรฐาน Swift)
let firstName = "John"
let userAge = 18
let isLoggedIn = false

// ❌ ไม่ใช้ snake_case
let first_name = "John"   // หลีกเลี่ยง

// ใช้ตัวอักษร Unicode ได้
let π = 3.14159`,
        },
      ],
    },
    {
      id: 'compound',
      title: 'Compound Assignment',
      examples: [
        {
          code: `var count = 10

count += 5      // count = count + 5  → 15
count -= 3      // 12
count *= 2      // 24
count /= 4      // 6
count %= 4      // 2

// String ก็ได้
var greeting = "Hello"
greeting += ", World"   // "Hello, World"`,
        },
      ],
    },
    {
      id: 'print',
      title: 'แสดงผลด้วย print',
      examples: [
        {
          code: `let name = "Anon"
let age = 25

print(name)                              // Anon
print("Hello, \\(name)")                  // Hello, Anon
print("Age: \\(age), Year: \\(age + 5)")   // Age: 25, Year: 30

// หลายค่าในบรรทัดเดียว
print("Name:", name, "Age:", age)        // Name: Anon Age: 25`,
        },
      ],
    },
  ],
}

export default topic
