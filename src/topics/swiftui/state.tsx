import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'state',
  title: '@State',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'เก็บค่าที่เปลี่ยนแปลงได้ภายใน View. เปลี่ยนค่าเมื่อไหร่ View จะ re-render ให้ทันที. ใช้กับค่าเดี่ยว ๆ ของ View นั้น.',
  intro: (
    <p>
      <C>@State</C> = ตัวแปรที่ "อยู่ใน View นี้เท่านั้น" และเปลี่ยนได้.{' '}
      ใช้ทำ counter, toggle, ค่า input, flag เปิด/ปิด sheet ฯลฯ.
    </p>
  ),
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \\(count)")
                .font(.title)

            Button("Increase") {
                count += 1     // เปลี่ยนค่า → View อัปเดตอัตโนมัติ
            }
        }
    }
}`,
        },
      ],
      bullets: [
        <>ใช้กับค่าเดี่ยวที่เปลี่ยนได้ — counter, flag, input</>,
        <>ใส่ <C>private</C> เสมอ เพราะค่านี้เป็นของ View นี้คนเดียว</>,
        <>ต้องตั้งค่าเริ่มต้นให้เลย เช่น <C>= 0</C> หรือ <C>= ""</C></>,
      ],
    },
    {
      id: 'common',
      title: 'ตัวอย่างที่ใช้บ่อย',
      examples: [
        {
          code: `// Bool — เปิด/ปิด sheet หรือ toggle
@State private var showSheet = false
@State private var isOn = false

// String — input
@State private var name = ""

// Int — quantity
@State private var quantity = 1

// Array — list ที่แก้ได้
@State private var items: [String] = []

// Optional — selected item
@State private var selected: User? = nil`,
        },
      ],
    },
    {
      id: 'binding',
      title: 'ส่งให้ control ด้วย $',
      intro: <p>ใส่ <C>$</C> หน้าตัวแปรเพื่อสร้าง <C>Binding</C> ให้ control เปลี่ยนค่ากลับได้ — เช่น TextField, Toggle, Slider.</p>,
      examples: [
        {
          code: `struct LoginView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var rememberMe = false

    var body: some View {
        Form {
            TextField("Email", text: $email)
            SecureField("Password", text: $password)
            Toggle("Remember me", isOn: $rememberMe)

            Button("Sign in") {
                login(email: email, password: password)
            }
        }
    }
}`,
        },
      ],
    },
    {
      id: 'struct-state',
      title: '@State กับ struct',
      intro: <p>ใช้ struct เป็น state ได้ — แก้ field ของมันแล้ว View ก็ rerender. ห้ามใช้ class.</p>,
      examples: [
        {
          code: `struct Profile {
    var name: String
    var age: Int
}

struct ContentView: View {
    @State private var profile = Profile(name: "Anon", age: 0)

    var body: some View {
        VStack {
            Text(profile.name)
            Text("Age: \\(profile.age)")

            Button("Birthday") {
                profile.age += 1     // แก้ field ตรง ๆ ก็ได้
            }
        }
    }
}`,
        },
      ],
      pitfall: <>ห้ามใช้ <C>@State</C> กับ <C>class</C> — class ไม่ใช่ value type ค่าจะไม่ trigger update. ถ้าต้องใช้ class ให้ใช้ <C>@Observable</C> / <C>@StateObject</C> แทน.</>,
    },
    {
      id: 'pitfall-init',
      title: 'ระวัง — ค่าเริ่มต้นจะใช้แค่ครั้งเดียว',
      intro: <p>ค่าหลัง <C>=</C> ใน <C>@State</C> ใช้ตอน View ถูกสร้างครั้งแรกเท่านั้น. ถ้า parent ส่งค่าใหม่มา <C>@State</C> จะไม่อัปเดตให้ — ต้องใช้ <C>@Binding</C> หรือ <C>.onChange</C> + <C>.id</C>.</p>,
      examples: [
        {
          code: `// ❌ ปัญหา: parent เปลี่ยน user แล้ว @State name ไม่ตามมา
struct EditView: View {
    let user: User
    @State private var name: String

    init(user: User) {
        self.user = user
        self._name = State(initialValue: user.name)   // ใช้แค่ตอนสร้าง
    }
    // ...
}

// ✅ วิธีแก้: ใส่ .id เพื่อให้ View ถูกสร้างใหม่ตอน user เปลี่ยน
EditView(user: user).id(user.id)`,
        },
      ],
    },
  ],
}

export default topic
