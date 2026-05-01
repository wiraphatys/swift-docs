import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'environment',
  title: '@Environment',
  category: 'swiftui',
  group: 'Class 4 — Navigation & ScrollView',
  summary:
    'อ่านค่าจากระบบที่ส่งต่อลงมาตลอด view tree — เช่น dismiss, colorScheme, locale. ที่ใช้บ่อยสุดคือ \\.dismiss สำหรับปิด sheet / pop หน้า.',
  sections: [
    {
      id: 'dismiss',
      title: '\\.dismiss — ปิดหน้าจอ',
      intro: <p>ใช้บ่อยที่สุด. ปิด sheet, pop หน้าจาก NavigationStack — ใช้ตัวเดียวกัน.</p>,
      examples: [
        {
          code: `struct DetailView: View {
    @Environment(\\.dismiss) private var dismiss

    var body: some View {
        VStack {
            Text("Detail")
            Button("Close") { dismiss() }
        }
    }
}

// ปิดจาก toolbar
.toolbar {
    ToolbarItem(placement: .cancellationAction) {
        Button("Cancel") { dismiss() }
    }
}`,
        },
      ],
    },
    {
      id: 'colorscheme',
      title: '\\.colorScheme — light / dark',
      examples: [
        {
          code: `struct ContentView: View {
    @Environment(\\.colorScheme) var colorScheme

    var body: some View {
        Text("Hello")
            .foregroundStyle(colorScheme == .dark ? .white : .black)

        if colorScheme == .dark {
            Image("logo-dark")
        } else {
            Image("logo-light")
        }
    }
}`,
        },
      ],
    },
    {
      id: 'common-keys',
      title: 'Environment values ที่ใช้บ่อย',
      examples: [
        {
          code: `@Environment(\\.dismiss) var dismiss
@Environment(\\.colorScheme) var colorScheme         // .light / .dark

@Environment(\\.locale) var locale                   // ภาษา / ประเทศ

@Environment(\\.openURL) var openURL                 // เปิด URL ในเบราว์เซอร์
Button("Visit") { openURL(URL(string: "https://apple.com")!) }

@Environment(\\.scenePhase) var scenePhase           // .active / .inactive / .background
.onChange(of: scenePhase) { _, phase in
    if phase == .background {
        save()
    }
}

@Environment(\\.horizontalSizeClass) var hSize       // .compact / .regular
if hSize == .compact {
    NarrowLayout()
} else {
    WideLayout()
}

@Environment(\\.isEnabled) var isEnabled              // ปิด/เปิดของ control`,
        },
      ],
    },
    {
      id: 'set-environment',
      title: 'ตั้งค่า environment ให้ child',
      intro: <p>ใช้ <C>.environment()</C> ใส่ค่าจาก parent — child ทุกตัวอ่านได้.</p>,
      examples: [
        {
          code: `// บังคับธีม dark mode สำหรับ subtree
ContentView()
    .environment(\\.colorScheme, .dark)

// บังคับภาษา
ContentView()
    .environment(\\.locale, Locale(identifier: "en_US"))`,
        },
      ],
    },
    {
      id: 'custom',
      title: 'Custom environment value',
      intro: <p>สร้าง environment key เอง สำหรับส่งค่าระหว่าง view โดยไม่ผ่าน parameter.</p>,
      examples: [
        {
          code: `// 1. ประกาศ key
private struct ThemeKey: EnvironmentKey {
    static let defaultValue: String = "default"
}

extension EnvironmentValues {
    var theme: String {
        get { self[ThemeKey.self] }
        set { self[ThemeKey.self] = newValue }
    }
}

// 2. ตั้งจาก parent
ContentView()
    .environment(\\.theme, "dark")

// 3. อ่านจาก child
struct ChildView: View {
    @Environment(\\.theme) var theme

    var body: some View {
        Text("Theme: \\(theme)")
    }
}`,
        },
      ],
    },
    {
      id: 'observable',
      title: '@Environment กับ @Observable (iOS 17+)',
      intro: <p>ส่ง object ที่ <C>@Observable</C> ผ่าน environment เพื่อใช้ได้ทุกที่ใน subtree.</p>,
      examples: [
        {
          code: `@Observable
class AppSettings {
    var fontSize: Double = 14
    var darkMode: Bool = false
}

@main
struct MyApp: App {
    @State private var settings = AppSettings()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(settings)         // ใส่เข้า env
        }
    }
}

// อ่านที่ child
struct DeepView: View {
    @Environment(AppSettings.self) private var settings

    var body: some View {
        Text("Hello")
            .font(.system(size: settings.fontSize))
    }
}`,
        },
      ],
    },
  ],
}

export default topic
