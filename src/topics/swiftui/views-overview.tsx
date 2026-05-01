import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'views-overview',
  title: 'View Overview',
  category: 'swiftui',
  group: 'Class 1 — Intro to SwiftUI',
  summary:
    'View คือบล็อกพื้นฐานของ SwiftUI. ทุก screen ทุก component คือ struct ที่ conform protocol View แล้วมี body.',
  intro: (
    <p>
      หน้าจอใน SwiftUI ประกอบจาก View เล็ก ๆ ซ้อนกัน. View ทุกตัวคือ struct
      ที่มี <C>body</C> เป็น <C>some View</C>. กฎคือ: SwiftUI render ตาม body
      ใหม่ทุกครั้งที่ state เปลี่ยน.
    </p>
  ),
  sections: [
    {
      id: 'first-view',
      title: 'View แรกของคุณ',
      examples: [
        {
          code: `import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI")
    }
}

#Preview {
    ContentView()
}`,
        },
      ],
      bullets: [
        <>เป็น <C>struct</C> เสมอ ไม่ใช่ class</>,
        <>conform <C>View</C> protocol</>,
        <>ต้องมี <C>body</C> ที่ return <C>some View</C></>,
      ],
    },
    {
      id: 'composition',
      title: 'Compose — รวม View หลายตัว',
      intro: <p>ใส่ View หลายตัวไม่ได้ตรง ๆ — ต้องห่อใน container เช่น VStack/HStack/ZStack.</p>,
      examples: [
        {
          code: `struct ContentView: View {
    var body: some View {
        VStack(spacing: 16) {
            Text("Welcome")
                .font(.largeTitle)
                .bold()

            Text("Sign in to continue")
                .foregroundStyle(.secondary)

            Button("Sign in") {
                // action
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}`,
        },
      ],
    },
    {
      id: 'extract-subview',
      title: 'แยกเป็น sub-view',
      intro: <p>เมื่อ body ยาวเกินไป ให้แยกออกเป็น View ใหม่ — โค้ดอ่านง่ายและ reuse ได้.</p>,
      examples: [
        {
          code: `struct ContentView: View {
    var body: some View {
        VStack {
            HeaderView()
            ProductList()
            FooterView()
        }
    }
}

struct HeaderView: View {
    var body: some View {
        Text("My Shop")
            .font(.largeTitle)
            .bold()
    }
}

// View ที่รับ parameter
struct ProductCard: View {
    let name: String
    let price: Double

    var body: some View {
        HStack {
            Text(name)
            Spacer()
            Text("฿\\(price, specifier: "%.0f")")
        }
    }
}

ProductCard(name: "Apple", price: 30)`,
        },
      ],
    },
    {
      id: 'preview',
      title: 'Preview ใน Xcode',
      intro: <p>Xcode แสดง preview แบบ live ผ่าน <C>#Preview</C> macro (iOS 17+) หรือ <C>PreviewProvider</C>.</p>,
      examples: [
        {
          code: `// แบบใหม่ (iOS 17+)
#Preview {
    ContentView()
}

#Preview("Dark mode") {
    ContentView()
        .preferredColorScheme(.dark)
}

#Preview("With data") {
    ProductCard(name: "Apple", price: 30)
        .padding()
}`,
        },
      ],
    },
    {
      id: 'app-entry',
      title: 'Entry point ของแอป',
      intro: <p>ไฟล์ <C>@main</C> App คือจุดเริ่มของทุกแอป. <C>WindowGroup</C> ห่อ ContentView ไว้.</p>,
      examples: [
        {
          code: `import SwiftUI

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`,
        },
      ],
    },
  ],
}

export default topic
