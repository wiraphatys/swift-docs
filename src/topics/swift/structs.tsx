import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'structs',
  title: 'Struct',
  category: 'swift',
  group: 'Class 1 — Swift Basics',
  summary:
    'Struct เก็บข้อมูลเป็นกลุ่ม. SwiftUI ใช้ struct เป็นหลัก (View ทุกตัวคือ struct). เป็น value type — copy ทุกครั้งที่ส่งต่อ.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `struct User {
    var name: String
    var age: Int
}

// สร้างใหม่ — Swift ทำ initializer ให้อัตโนมัติ (memberwise init)
let alice = User(name: "Alice", age: 25)
print(alice.name)            // Alice

// แก้ field ได้ ถ้าประกาศเป็น var
var bob = User(name: "Bob", age: 30)
bob.age = 31

// ถ้าประกาศเป็น let แก้ไม่ได้
let charlie = User(name: "Charlie", age: 22)
// charlie.age = 23          ❌ error`,
        },
      ],
    },
    {
      id: 'default-values',
      title: 'ค่าเริ่มต้น',
      examples: [
        {
          code: `struct Settings {
    var darkMode: Bool = false
    var fontSize: Int = 14
    var language: String = "th"
}

// ใช้ค่า default ทั้งหมด
let s1 = Settings()

// override บางตัว
let s2 = Settings(darkMode: true)
let s3 = Settings(darkMode: true, fontSize: 18)`,
        },
      ],
    },
    {
      id: 'methods',
      title: 'Methods',
      examples: [
        {
          code: `struct Rectangle {
    var width: Double
    var height: Double

    // method ปกติ — อ่านค่าได้, แก้ค่าใน struct ไม่ได้
    func area() -> Double {
        return width * height
    }

    // mutating — แก้ค่า field ได้
    mutating func scale(by factor: Double) {
        width *= factor
        height *= factor
    }
}

var rect = Rectangle(width: 10, height: 5)
print(rect.area())           // 50.0

rect.scale(by: 2)
print(rect.area())           // 200.0`,
        },
      ],
      pitfall: <>method ที่จะเปลี่ยนค่า field ของ struct ต้องใส่ <C>mutating</C>. ถ้าไม่ใส่ → error.</>,
    },
    {
      id: 'computed',
      title: 'Computed Properties',
      intro: <p>Property ที่คำนวณค่าออกมาจาก field อื่น. เรียกใช้เหมือน property ปกติ.</p>,
      examples: [
        {
          code: `struct Circle {
    var radius: Double

    // computed property
    var diameter: Double {
        return radius * 2
    }

    var area: Double {
        return .pi * radius * radius
    }
}

let c = Circle(radius: 5)
print(c.diameter)            // 10.0
print(c.area)                // 78.539...

// get + set
struct Temperature {
    var celsius: Double

    var fahrenheit: Double {
        get { celsius * 9 / 5 + 32 }
        set { celsius = (newValue - 32) * 5 / 9 }
    }
}`,
        },
      ],
    },
    {
      id: 'value-semantics',
      title: 'Value Semantics — copy ทุกครั้ง',
      intro: <p>struct เป็น value type. เวลา assign หรือส่งเข้า function จะ copy ค่าให้.</p>,
      examples: [
        {
          code: `struct Point {
    var x: Int
    var y: Int
}

var a = Point(x: 1, y: 2)
var b = a                    // copy
b.x = 100

print(a.x)                   // 1   (a ไม่เปลี่ยน)
print(b.x)                   // 100`,
        },
      ],
      note: <>นี่คือเหตุผลที่ SwiftUI ใช้ struct สำหรับ View — copy ปลอดภัย ไม่ shared state.</>,
    },
    {
      id: 'in-swiftui',
      title: 'Struct ใน SwiftUI',
      intro: <p>ทุก View ใน SwiftUI คือ struct. <C>Identifiable</C> ใช้บ่อยใน List/ForEach.</p>,
      examples: [
        {
          code: `struct Task: Identifiable {
    let id = UUID()              // ต้องมี id เพื่อ conform Identifiable
    var title: String
    var done: Bool = false
}

let tasks = [
    Task(title: "Buy milk"),
    Task(title: "Walk dog"),
    Task(title: "Code")
]

// ใช้ใน List ได้เลย — ไม่ต้องใส่ id parameter
List(tasks) { task in
    Text(task.title)
}`,
        },
      ],
    },
  ],
}

export default topic
