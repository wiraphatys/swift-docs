import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'functional-methods',
  title: 'map, filter, reduce',
  category: 'swift',
  group: 'Class 1 — Swift Basics',
  summary:
    'method สาย functional ที่ใช้บ่อยที่สุดใน Swift: แปลงค่า (map), กรอง (filter), รวม (reduce), ตัด nil (compactMap), แบนชั้น (flatMap).',
  intro: (
    <p>
      Swift ออกแบบให้เขียนแบบ functional ได้สะอาด. ทุก method ในหน้านี้รับ
      closure แล้วคืน array/value ใหม่ — <strong>ไม่แก้ของเดิม</strong>.
      ใช้ <C>$0</C> แทน parameter เพื่อเขียนสั้น.
    </p>
  ),
  sections: [
    {
      id: 'closure-shortcut',
      title: 'Closure shortcut — รู้จัก $0 ก่อน',
      intro: <p>ทุก method ในหน้านี้รับ closure. Swift ให้เขียนสั้นด้วย <C>$0</C> = parameter ตัวแรก.</p>,
      examples: [
        {
          code: `let nums = [1, 2, 3]

// แบบเต็ม
nums.map({ (n: Int) -> Int in
    return n * 2
})

// trailing closure
nums.map { n in
    return n * 2
}

// implicit return (closure 1 บรรทัด)
nums.map { n in n * 2 }

// $0 = parameter ตัวแรก
nums.map { $0 * 2 }                  // [2, 4, 6]

// operator-only (สั้นสุด)
nums.reduce(0, +)                    // 6`,
        },
      ],
    },
    {
      id: 'map',
      title: 'map — แปลงทุกค่าใน array',
      intro: <p>คืน array ใหม่ที่ทุก element ถูกแปลงตาม closure. จำนวน element เท่าเดิม.</p>,
      examples: [
        {
          code: `let nums = [1, 2, 3, 4]

nums.map { $0 * 2 }                  // [2, 4, 6, 8]
nums.map { "\\($0)" }                 // ["1", "2", "3", "4"]
nums.map { String($0) }              // เหมือนกัน

// เอา property ของ struct
struct User {
    let name: String
    let age: Int
}
let users = [User(name: "Alice", age: 25), User(name: "Bob", age: 30)]

users.map { $0.name }                // ["Alice", "Bob"]
users.map { $0.age }                 // [25, 30]

// key path syntax (สั้นกว่า)
users.map(\\.name)                    // ["Alice", "Bob"]

// แปลงเป็น struct ใหม่
struct UserDTO { let displayName: String }
users.map { UserDTO(displayName: $0.name.uppercased()) }`,
        },
      ],
    },
    {
      id: 'filter',
      title: 'filter — เก็บเฉพาะที่ผ่านเงื่อนไข',
      intro: <p>คืน array ใหม่ที่มีเฉพาะ element ที่ closure return true.</p>,
      examples: [
        {
          code: `let nums = [1, 2, 3, 4, 5, 6]

nums.filter { $0 > 3 }               // [4, 5, 6]
nums.filter { $0 % 2 == 0 }          // [2, 4, 6]

// filter array ของ struct
let users = [
    User(name: "Alice", age: 25),
    User(name: "Bob", age: 17),
    User(name: "Charlie", age: 30)
]

users.filter { $0.age >= 18 }        // [Alice, Charlie]
users.filter { $0.name.hasPrefix("A") }

// search ใน TextField
let query = "ali"
let results = users.filter {
    $0.name.localizedCaseInsensitiveContains(query)
}`,
        },
      ],
    },
    {
      id: 'reduce',
      title: 'reduce — รวมเป็นค่าเดียว',
      intro: <p>เริ่มที่ค่าเริ่มต้น แล้วรวมแต่ละ element เข้ามาทีละตัว — สรุปเป็น 1 ค่า.</p>,
      examples: [
        {
          code: `let nums = [1, 2, 3, 4, 5]

// ผลบวก
nums.reduce(0) { sum, n in sum + n }        // 15
nums.reduce(0, +)                            // 15 (สั้นสุด)

// ผลคูณ
nums.reduce(1, *)                            // 120

// หาค่าสูงสุด (มี .max() อยู่แล้ว แต่ลองใช้ reduce)
nums.reduce(Int.min) { max($0, $1) }         // 5

// รวม string
let words = ["Hello", "World", "Swift"]
words.reduce("", +)                          // "HelloWorldSwift"
words.reduce("") { $0 + " " + $1 }           // " Hello World Swift"

// นับด้วย reduce
let votes = ["A", "B", "A", "C", "A", "B"]
let counts = votes.reduce(into: [:]) { result, vote in
    result[vote, default: 0] += 1
}
// ["A": 3, "B": 2, "C": 1]`,
        },
      ],
      note: <><C>reduce(into:)</C> เร็วกว่า <C>reduce</C> ถ้าค่าเริ่มต้นเป็น collection — ไม่ต้อง copy ทุกรอบ.</>,
    },
    {
      id: 'compactmap',
      title: 'compactMap — แปลง + ตัด nil',
      intro: <p>เหมือน <C>map</C> แต่ <strong>กรอง nil ออก</strong>. ใช้บ่อยมากเวลาแปลง String → Int หรือดึง optional property.</p>,
      examples: [
        {
          code: `let strings = ["1", "2", "abc", "4"]

// map ปกติ → ได้ Optional
strings.map { Int($0) }              // [Optional(1), Optional(2), nil, Optional(4)]

// compactMap → ตัด nil ทิ้ง
strings.compactMap { Int($0) }       // [1, 2, 4]

// ดึง property optional
struct User {
    let name: String
    let email: String?
}
let users = [
    User(name: "A", email: "a@x.com"),
    User(name: "B", email: nil),
    User(name: "C", email: "c@x.com")
]

users.compactMap(\\.email)             // ["a@x.com", "c@x.com"]

// search แบบ optional
let urls = ["https://apple.com", "not a url", "https://swift.org"]
let valid = urls.compactMap { URL(string: $0) }`,
        },
      ],
    },
    {
      id: 'flatmap',
      title: 'flatMap — แบนชั้น (nested → flat)',
      intro: <p>ใช้ตอน <C>map</C> ออกมาเป็น array ของ array แล้วอยาก "ยุบ" เป็นชั้นเดียว.</p>,
      examples: [
        {
          code: `// Array ของ Array — อยากได้ flat
let nested = [[1, 2, 3], [4, 5], [6]]
nested.flatMap { $0 }                // [1, 2, 3, 4, 5, 6]

// map ทุกตัวเป็น array แล้ว flatten
let words = ["Hello", "Hi"]
words.flatMap { Array($0) }          // ["H","e","l","l","o","H","i"]

// ดึง array ของ array จาก struct
struct Class {
    let name: String
    let students: [String]
}
let classes = [
    Class(name: "A", students: ["Alice", "Bob"]),
    Class(name: "B", students: ["Charlie"])
]

classes.flatMap { $0.students }      // ["Alice", "Bob", "Charlie"]`,
        },
      ],
      note: <><C>flatMap</C> = <C>map</C> + <C>joined()</C>. ถ้าอยากได้แค่ flatten อย่างเดียวใช้ <C>nested.joined()</C> แล้ว <C>Array(...)</C>.</>,
    },
    {
      id: 'foreach',
      title: 'forEach — วนทำ side effect',
      intro: <p>เหมือน <C>for-in</C> แต่เขียนต่อ chain ได้. ใช้ตอนจะ "ทำ" อะไรกับแต่ละตัว ไม่ใช่ "แปลง".</p>,
      examples: [
        {
          code: `let names = ["Alice", "Bob", "Charlie"]

names.forEach { print($0) }
names.forEach { print("Hello, \\($0)") }

// chain หลังจาก filter
users
    .filter { $0.age >= 18 }
    .forEach { print($0.name) }`,
        },
      ],
      pitfall: <>ใน <C>forEach</C> ใช้ <C>return</C> ไม่ออกจาก loop (ออกแค่ closure รอบนั้น). ถ้าต้อง break จริง ใช้ <C>for-in</C>.</>,
    },
    {
      id: 'find-check',
      title: 'first / contains / allSatisfy',
      intro: <p>ค้นหาและตรวจสอบ — return Optional หรือ Bool.</p>,
      examples: [
        {
          code: `let nums = [1, 2, 3, 4, 5]

// หาตัวแรกที่ผ่านเงื่อนไข
nums.first { $0 > 3 }                // Optional(4)
nums.firstIndex { $0 > 3 }           // Optional(3)

// มีตัวที่ตรงไหม
nums.contains(3)                     // true
nums.contains { $0 > 10 }            // false

// ทุกตัวผ่านไหม
nums.allSatisfy { $0 > 0 }           // true
nums.allSatisfy { $0 > 3 }           // false

// ตัวอย่างจริง
let users = [...]
let admin = users.first { $0.role == .admin }
let hasAdmin = users.contains { $0.role == .admin }
let allActive = users.allSatisfy { $0.isActive }`,
        },
      ],
    },
    {
      id: 'sort',
      title: 'sorted / reversed',
      examples: [
        {
          code: `let nums = [3, 1, 4, 1, 5, 9, 2, 6]

nums.sorted()                        // [1, 1, 2, 3, 4, 5, 6, 9] น้อย → มาก
nums.sorted(by: >)                   // มาก → น้อย
nums.reversed()                      // กลับลำดับเดิม

// sort ตาม property
let users = [
    User(name: "Charlie", age: 30),
    User(name: "Alice", age: 25),
    User(name: "Bob", age: 28)
]

users.sorted { $0.age < $1.age }     // เรียงตามอายุ
users.sorted { $0.name < $1.name }   // เรียงตามชื่อ

// key path syntax
users.sorted(using: KeyPathComparator(\\.age))`,
        },
      ],
    },
    {
      id: 'chain',
      title: 'Chain หลายอันต่อกัน',
      intro: <p>นี่คือพลังจริงของ functional — chain หลาย method ต่อกันให้อ่านเป็นลำดับ.</p>,
      examples: [
        {
          code: `let users = [...]

// ผู้ใช้ที่อายุ 18+ ที่ active เรียงตามอายุน้อย → มาก เอาเฉพาะชื่อ
let result = users
    .filter { $0.isActive }
    .filter { $0.age >= 18 }
    .sorted { $0.age < $1.age }
    .map { $0.name }

// คะแนนรวมของผู้ใช้ที่อายุเกิน 18
let total = users
    .filter { $0.age > 18 }
    .map { $0.score }
    .reduce(0, +)

// แปลง list ของ string เป็น list ของ Int ที่เป็นเลขคู่ คูณ 2
let nums = ["1", "2", "abc", "4", "5"]
let processed = nums
    .compactMap { Int($0) }          // [1, 2, 4, 5]
    .filter { $0 % 2 == 0 }          // [2, 4]
    .map { $0 * 2 }                  // [4, 8]`,
        },
      ],
    },
    {
      id: 'with-swiftui',
      title: 'ใช้ใน SwiftUI',
      examples: [
        {
          code: `struct ContentView: View {
    @State private var users: [User] = [...]
    @State private var searchText = ""

    // computed property — recompute เมื่อ users หรือ searchText เปลี่ยน
    var filtered: [User] {
        if searchText.isEmpty { return users }
        return users.filter {
            $0.name.localizedCaseInsensitiveContains(searchText)
        }
    }

    var totalScore: Int {
        users
            .filter { $0.isActive }
            .map { $0.score }
            .reduce(0, +)
    }

    var body: some View {
        List(filtered) { user in
            Text(user.name)
        }
        .searchable(text: $searchText)
    }
}`,
        },
      ],
    },
  ],
}

export default topic
