import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'tabview',
  title: 'TabView',
  category: 'swiftui',
  group: 'Class 4 — Navigation & ScrollView',
  summary:
    'แท็บล่างหน้าจอ — ใช้ TabView + .tabItem ใส่ icon กับชื่อ. หรือใช้แบบ page (เลื่อนซ้ายขวา) ด้วย .tabViewStyle(.page).',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }

            SearchView()
                .tabItem {
                    Label("Search", systemImage: "magnifyingglass")
                }

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.crop.circle")
                }
        }
    }
}`,
        },
      ],
    },
    {
      id: 'with-nav',
      title: 'TabView + NavigationStack',
      intro: <p>Pattern ที่เจอบ่อย: แต่ละ tab มี <C>NavigationStack</C> ของตัวเอง.</p>,
      examples: [
        {
          code: `TabView {
    NavigationStack {
        HomeView()
            .navigationTitle("Home")
    }
    .tabItem { Label("Home", systemImage: "house") }

    NavigationStack {
        SettingsView()
            .navigationTitle("Settings")
    }
    .tabItem { Label("Settings", systemImage: "gearshape") }
}`,
        },
      ],
    },
    {
      id: 'badge',
      title: 'Badge',
      examples: [
        {
          code: `TabView {
    InboxView()
        .tabItem { Label("Inbox", systemImage: "tray") }
        .badge(3)                              // ตัวเลข

    NotificationsView()
        .tabItem { Label("Alerts", systemImage: "bell") }
        .badge("New")                          // ข้อความ

    ProfileView()
        .tabItem { Label("Profile", systemImage: "person") }
        .badge(unreadCount > 0 ? unreadCount : 0)
}`,
        },
      ],
    },
    {
      id: 'selection',
      title: 'ควบคุม tab ที่เลือก',
      intro: <p>ใช้ <C>selection</C> + <C>.tag</C> เพื่อรู้/เปลี่ยน tab ปัจจุบัน.</p>,
      examples: [
        {
          code: `enum Tab {
    case home, search, profile
}

struct ContentView: View {
    @State private var selected: Tab = .home

    var body: some View {
        TabView(selection: $selected) {
            HomeView()
                .tag(Tab.home)
                .tabItem { Label("Home", systemImage: "house") }

            SearchView()
                .tag(Tab.search)
                .tabItem { Label("Search", systemImage: "magnifyingglass") }

            ProfileView()
                .tag(Tab.profile)
                .tabItem { Label("Profile", systemImage: "person") }
        }
    }
}

// เปลี่ยน tab จากโค้ด
Button("Go to Search") {
    selected = .search
}`,
        },
      ],
    },
    {
      id: 'page-style',
      title: 'Page style — เลื่อนซ้ายขวา',
      intro: <p>ใช้ <C>.tabViewStyle(.page)</C> เปลี่ยนจาก tab bar เป็น horizontal swipe — เหมาะกับ onboarding, image carousel.</p>,
      examples: [
        {
          code: `TabView {
    OnboardingPage(image: "page1", title: "Welcome")
    OnboardingPage(image: "page2", title: "Features")
    OnboardingPage(image: "page3", title: "Get Started")
}
.tabViewStyle(.page)
.indexViewStyle(.page(backgroundDisplayMode: .always))    // จุดบอกหน้า

// image gallery
TabView {
    ForEach(photos, id: \\.self) { photo in
        Image(photo)
            .resizable()
            .scaledToFill()
    }
}
.tabViewStyle(.page(indexDisplayMode: .always))
.frame(height: 300)`,
        },
      ],
    },
    {
      id: 'tint',
      title: 'เปลี่ยนสี tab bar',
      examples: [
        {
          code: `TabView {
    // ...
}
.tint(.red)        // สีของ tab ที่เลือก`,
        },
      ],
    },
  ],
}

export default topic
