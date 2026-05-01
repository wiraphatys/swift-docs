import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'app-storage',
  title: '@AppStorage & Data Storage',
  category: 'swiftui',
  group: 'Class 7 — Data Storage & API',
  summary:
    'เก็บข้อมูลของแอปแบบ persistent ด้วย @AppStorage (UserDefaults) — เหมาะกับการตั้งค่า / preference เล็ก ๆ ที่อยากให้ค่าคงอยู่หลังปิดแอป.',
  intro: (
    <p>
      iOS แยกการเก็บข้อมูลออกเป็นสองแบบ: <strong>Non-Persistent</strong> (อยู่ใน
      memory เช่น <C>@State</C>) กับ <strong>Persistent</strong> ที่ค่ายังอยู่
      หลังปิดแอป. <C>@AppStorage</C> เป็น property wrapper บน UserDefaults
      ที่ผูกค่ากับ View ให้รีเฟรช UI อัตโนมัติ.
    </p>
  ),
  sections: [
    {
      id: 'storage-options',
      title: 'ตัวเลือกการเก็บข้อมูลใน iOS',
      bullets: [
        <>
          <C>UserDefaults</C> — ข้อมูลพื้นฐานขนาดเล็ก เช่น การตั้งค่า / preference
          (เข้าถึงผ่าน <C>@AppStorage</C> ใน SwiftUI)
        </>,
        <>
          <C>Core Data</C> — framework สำหรับข้อมูลที่มีความสัมพันธ์กัน ขนาดใหญ่
          และซับซ้อน
        </>,
        <>
          <C>Keychain</C> — เข้ารหัสข้อมูลที่ต้องการความปลอดภัย เช่น password,
          token, certificate
        </>,
        <>
          <C>SwiftData</C> — framework เก็บข้อมูลรุ่นใหม่ของ Apple ออกแบบมาให้ใช้
          ร่วมกับ SwiftUI โดยเฉพาะ
        </>,
      ],
      note: (
        <>
          ในคอร์สเน้นการใช้งาน <C>@AppStorage</C> (ฝั่ง UserDefaults)
          เป็นตัวอย่างหลัก ส่วนตัวอื่น ๆ รู้ไว้เป็นภาพรวม.
        </>
      ),
    },
    {
      id: 'userdefaults-shape',
      title: 'UserDefaults คืออะไร',
      intro: (
        <p>
          UserDefaults เก็บข้อมูลแบบ <strong>Key-Value</strong>. ระบุ key เป็น
          string แล้วผูกกับค่าใด ๆ ของชนิดที่รองรับ.
        </p>
      ),
      bullets: [
        <>ชนิดที่เก็บได้: <C>String</C>, <C>Int</C>, <C>Double</C>, <C>Bool</C>, <C>Date</C>, <C>Data</C>, <C>Array</C>, <C>Dictionary</C></>,
        <>เหมาะกับ: ตัวเลือกของผู้ใช้ (theme, language), ข้อมูลโปรไฟล์เล็ก ๆ, flag การเปิดใช้งานฟีเจอร์</>,
        <>ไม่เหมาะกับ: ข้อมูลขนาดใหญ่, ข้อมูลที่มีโครงสร้างซับซ้อน, ข้อมูลที่ต้องการความปลอดภัย</>,
      ],
    },
    {
      id: 'appstorage-basic',
      title: '@AppStorage 4 ขั้นตอน',
      intro: (
        <p>
          ใช้ <C>@AppStorage</C> เหมือน <C>@State</C> เลย แค่เปลี่ยน wrapper
          และระบุ key ให้ตรงกับสิ่งที่ต้องการเก็บ.
        </p>
      ),
      examples: [
        {
          code: `struct ContentView: View {
    // 1. ใส่ property wrapper @AppStorage
    // 2. ระบุ key ที่ใช้เข้าถึง UserDefaults
    // 3. ตั้งชื่อตัวแปรและกำหนดค่าเริ่มต้น
    @AppStorage("firstName") var firstName: String = ""

    var body: some View {
        VStack {
            // 4. เรียกใช้งานได้เหมือน @State
            Text("Hello, \\(firstName)")

            TextField("First Name", text: $firstName)
                .textFieldStyle(.roundedBorder)
        }
        .padding()
    }
}`,
        },
      ],
      note: (
        <>
          ค่าเริ่มต้นจะถูกใช้เฉพาะตอนที่ key นี้ยังไม่เคยถูกบันทึก พอผู้ใช้แก้ค่าผ่าน{' '}
          <C>$firstName</C> ระบบจะเขียนทับ UserDefaults ให้อัตโนมัติ.
        </>
      ),
    },
    {
      id: 'appstorage-types',
      title: 'ใช้กับชนิดข้อมูลต่าง ๆ',
      examples: [
        {
          code: `// Bool — toggle / setting
@AppStorage("isDarkMode") var isDarkMode: Bool = false

// Int — counter
@AppStorage("launchCount") var launchCount: Int = 0

// Double — slider value
@AppStorage("fontSize") var fontSize: Double = 14.0

// Enum (raw value แบบ String/Int)
enum AppTheme: String {
    case light, dark, system
}
@AppStorage("theme") var theme: AppTheme = .system

// ผูกเข้ากับ control โดยตรง
Toggle("Dark mode", isOn: $isDarkMode)
Stepper("Launches: \\(launchCount)", value: $launchCount)
Slider(value: $fontSize, in: 10...30)`,
        },
      ],
    },
    {
      id: 'appstorage-binding',
      title: 'ส่งต่อด้วย $ (Binding)',
      intro: (
        <p>
          เหมือน <C>@State</C>: ใช้ <C>$</C> ข้างหน้าเพื่อส่ง <C>Binding</C>{' '}
          ไปให้ control อ่าน/เขียนกลับเข้า storage โดยตรง.
        </p>
      ),
      examples: [
        {
          code: `struct SettingsView: View {
    @AppStorage("username") var username: String = ""
    @AppStorage("notificationsOn") var notificationsOn: Bool = true

    var body: some View {
        Form {
            TextField("Username", text: $username)
            Toggle("Notifications", isOn: $notificationsOn)
            Button("Reset") {
                username = ""
                notificationsOn = true
            }
        }
    }
}

// Lecture exercise: Habit Tracker
// - หน้าหลักอ่านค่าจาก @AppStorage มาแสดง
// - หน้า Sheet แก้ค่าผ่าน Picker / Toggle แล้ว Save
// - ปิด sheet → หน้าหลักรีเฟรชจากค่าที่บันทึกใหม่อัตโนมัติ`,
        },
      ],
    },
  ],
}

export default topic
