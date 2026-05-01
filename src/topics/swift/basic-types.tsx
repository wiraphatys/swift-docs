import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'basic-types',
  title: 'Basic Types',
  category: 'swift',
  group: 'Class 1 — Swift Basics',
  summary:
    'ชนิดข้อมูลพื้นฐาน: Int, Double, Bool, String, Character. การแปลงระหว่างชนิด.',
  sections: [
    {
      id: 'int',
      title: 'Int — จำนวนเต็ม',
      examples: [
        {
          code: `let age: Int = 18
let count = 100              // เดาเป็น Int

// ตัวเลขใหญ่ ใส่ _ คั่นได้
let million = 1_000_000

// ตัวเลขฐานอื่น
let hex = 0xFF               // 255
let binary = 0b1010          // 10

// คำนวณ
let sum = 5 + 3              // 8
let diff = 10 - 4            // 6
let product = 6 * 7          // 42
let quotient = 10 / 3        // 3 (Int หาร Int = ปัด)
let remainder = 10 % 3       // 1`,
        },
      ],
    },
    {
      id: 'double',
      title: 'Double — จำนวนทศนิยม',
      examples: [
        {
          code: `let pi: Double = 3.14159
let price = 99.99            // เดาเป็น Double
let rate = 1.5e3             // 1500.0

// ระวัง: Int / Int = Int (ไม่ได้ทศนิยม)
let bad = 5 / 2              // 2 ❌
let good = 5.0 / 2.0         // 2.5 ✅

// แปลง Int → Double
let total: Int = 5
let average = Double(total) / 2.0    // 2.5`,
        },
      ],
      pitfall: <>หาร Int ด้วย Int แล้วได้ Int (ปัดเศษ). ต้องแปลงเป็น <C>Double</C> ก่อน.</>,
    },
    {
      id: 'bool',
      title: 'Bool — จริง/เท็จ',
      examples: [
        {
          code: `let isActive: Bool = true
let isEmpty = false

// operator
let result = !isActive       // ตรงข้าม → false
let both = a && b            // และ
let either = a || b          // หรือ

// เปรียบเทียบ
let isAdult = age >= 18
let isEqual = name == "John"`,
        },
      ],
    },
    {
      id: 'string',
      title: 'String — ข้อความ',
      examples: [
        {
          code: `let name = "Hello"
var greeting = "Hi"

// ต่อ string
let message = "Hello, " + name
greeting += "!"                       // "Hi!"

// แทรกตัวแปร (interpolation)
let age = 25
let intro = "I'm \\(age) years old"     // "I'm 25 years old"

// หลายบรรทัด
let poem = """
    Roses are red,
    Violets are blue.
    """

// คุณสมบัติที่ใช้บ่อย
name.count                           // 5
name.uppercased()                    // "HELLO"
name.lowercased()                    // "hello"
name.isEmpty                         // false
name.contains("ell")                 // true`,
        },
      ],
    },
    {
      id: 'conversion',
      title: 'แปลงชนิดข้อมูล',
      intro: <p>Swift ไม่แปลงชนิดอัตโนมัติ — ต้องเรียกแปลงเอง.</p>,
      examples: [
        {
          code: `// Int ↔ Double
let i: Int = 10
let d = Double(i)              // 10.0
let i2 = Int(3.7)              // 3 (ตัดทศนิยม)

// Number ↔ String
let n = 42
let s = String(n)              // "42"
let s2 = "\\(n)"                 // "42"

// String → Int (เป็น Optional)
let valid = Int("42")          // Int? = 42
let invalid = Int("hello")     // nil

if let num = Int("42") {
    print(num)                 // 42
}`,
        },
      ],
    },
    {
      id: 'tuple',
      title: 'Tuple — เก็บค่าหลายตัวเป็นกลุ่ม',
      examples: [
        {
          code: `// tuple ไม่มีชื่อ field
let point = (10, 20)
print(point.0)                 // 10
print(point.1)                 // 20

// tuple มีชื่อ field
let user = (name: "John", age: 25)
print(user.name)               // John
print(user.age)                // 25

// แตกค่าออก
let (x, y) = point
print(x)                       // 10`,
        },
      ],
    },
  ],
}

export default topic
