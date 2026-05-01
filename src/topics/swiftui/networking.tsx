import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'networking',
  title: 'API: URLSession + Codable',
  category: 'swiftui',
  group: 'Class 7 — Data Storage & API',
  summary:
    'ดึงข้อมูล JSON จาก API ภายนอกด้วย URLSession + async/await แล้วแปลงเป็น struct ผ่าน Codable / JSONDecoder.',
  intro: (
    <p>
      ขั้นตอนเรียก API: เตรียม <C>URL</C> → ใช้{' '}
      <C>URLSession.shared.data(from:)</C> ดึงข้อมูล (async/await + do-catch) →
      ใช้ <C>JSONDecoder</C> แปลง <C>Data</C> ให้กลายเป็น <C>struct</C> ที่ทำตาม
      protocol <C>Codable</C>.
    </p>
  ),
  sections: [
    {
      id: 'json-shape',
      title: 'โครงสร้างข้อมูล JSON',
      intro: (
        <p>
          JSON มีสองรูปทรงหลัก: <strong>Object</strong>{' '}
          (ปีกกา, key-value) และ <strong>Array</strong> (วงเล็บเหลี่ยม,
          เรียงลำดับ). ค่าใน JSON เก็บได้เป็น <C>String</C>, <C>Int</C>,{' '}
          <C>Double</C>, <C>Bool</C>, <C>Array</C>, <C>Object</C>, <C>null</C>.
        </p>
      ),
      examples: [
        {
          lang: 'json',
          code: `{
  "name": "Somchai",
  "age": 19,
  "skills": ["Swift", "iOS"],
  "address": {
    "number": "999/9",
    "road": "Ratchadamri",
    "postalCode": 10330
  }
}`,
        },
      ],
    },
    {
      id: 'codable',
      title: 'Codable — แปลง JSON ↔ struct',
      intro: (
        <p>
          <C>Codable</C> = <C>Encodable</C> + <C>Decodable</C> รวมกัน.
          struct ที่ conform ตัวนี้จะแปลงไปกลับกับ JSON ได้อัตโนมัติเมื่อชื่อ
          property ตรงกับ key ใน JSON.
        </p>
      ),
      examples: [
        {
          code: `// JSON ที่จะ decode
// {
//     "id": 1,
//     "name": "John Doe",
//     "email": "john.doe@example.com"
// }

// 1. ทำให้ struct conform Codable
struct User: Codable {
    let id: Int
    let name: String
    let email: String
}

// 2. สร้าง JSONDecoder แล้วเรียก decode
let decoder = JSONDecoder()
if let user = try? decoder.decode(User.self, from: data) {
    print(user.name) // "John Doe"
}`,
        },
      ],
      note: (
        <>
          ใช้ <C>try?</C> แล้วได้ optional กลับมา ถ้า decode ไม่ได้จะเป็น{' '}
          <C>nil</C>. ถ้าต้องการดู error ใช้ <C>do-catch</C> กับ <C>try</C>{' '}
          แทน.
        </>
      ),
    },
    {
      id: 'coding-keys',
      title: 'CodingKeys — map ชื่อ key ที่ไม่ตรงกัน',
      intro: (
        <p>
          ถ้า JSON ใช้ชื่อ key ต่างจาก property ของ struct (เช่นขึ้นต้นด้วย
          ตัวพิมพ์ใหญ่ หรือใช้ snake_case) ให้เพิ่ม <C>enum CodingKeys</C> เพื่อ
          map ชื่อ.
        </p>
      ),
      examples: [
        {
          code: `// JSON มี key เป็น "Id", "Name", "Email"
// {
//     "Id": 1,
//     "Name": "John Doe",
//     "Email": "john.doe@example.com"
// }

struct User: Codable {
    let id: Int
    let name: String
    let email: String

    enum CodingKeys: String, CodingKey {
        case id    = "Id"
        case name  = "Name"
        case email = "Email"
    }
}`,
        },
      ],
    },
    {
      id: 'urlsession',
      title: 'เรียก API ด้วย URLSession + async/await',
      intro: (
        <p>4 ขั้นตอนของการเรียก API:</p>
      ),
      bullets: [
        <>1. ใส่ URL ของ API ลงใน <C>URL(string:)</C></>,
        <>2. ครอบด้วย <C>do-catch</C> เพื่อจัดการข้อผิดพลาด</>,
        <>3. เรียก <C>URLSession.shared.data(from:)</C> ด้วย <C>try await</C></>,
        <>4. แปลง <C>Data</C> เป็น struct ด้วย <C>JSONDecoder</C></>,
      ],
      examples: [
        {
          code: `func requestData() async {
    // 1. URL ของ API
    guard let url = URL(string: "https://api.example.com/users/1") else {
        return
    }

    // 2. do-catch รองรับ error
    do {
        // 3. ดึงข้อมูลแบบ async
        let (data, _) = try await URLSession.shared.data(from: url)

        // 4. แปลง JSON เป็น struct
        let decoder = JSONDecoder()
        let user = try decoder.decode(User.self, from: data)

        print(user.name)
    } catch {
        print("Error: \\(error)")
    }
}`,
        },
      ],
      note: (
        <>
          <C>URLSession.shared.data(from:)</C> คืน tuple{' '}
          <C>(Data, URLResponse)</C>. ตัวอย่างใช้ <C>_</C> เพราะยังไม่ได้สนใจ
          response (เช่น status code).
        </>
      ),
    },
    {
      id: 'task-modifier',
      title: 'เรียก API ใน View ด้วย .task',
      intro: (
        <p>
          ฟังก์ชัน <C>async</C> ต้องเรียกใน async context. ใน SwiftUI ใช้{' '}
          <C>.task</C> modifier ที่จะรันให้อัตโนมัติเมื่อ View ปรากฏ และ
          ยกเลิกเมื่อ View หายไป.
        </p>
      ),
      examples: [
        {
          code: `struct UserView: View {
    @State private var user: User?
    @State private var errorMessage: String?

    var body: some View {
        VStack {
            if let user {
                Text(user.name).font(.title)
                Text(user.email).foregroundStyle(.secondary)
            } else if let errorMessage {
                Text(errorMessage).foregroundStyle(.red)
            } else {
                ProgressView()
            }
        }
        .task {
            await loadUser()
        }
    }

    func loadUser() async {
        guard let url = URL(string: "https://api.example.com/users/1") else { return }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            user = try JSONDecoder().decode(User.self, from: data)
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}`,
        },
      ],
    },
    {
      id: 'weather-example',
      title: 'ตัวอย่าง: Today Weather (Open-Meteo)',
      intro: (
        <p>
          เคสฝึกในคลาส: ดึงข้อมูลพยากรณ์อากาศจาก Open-Meteo API แล้วแสดงสภาพ
          อากาศปัจจุบัน + รายการ 7 วัน.
        </p>
      ),
      examples: [
        {
          code: `// URL ที่ใช้
// https://api.open-meteo.com/v1/forecast?
//   latitude=13.7467&longitude=100.5392&timezone=Asia/Bangkok
//   &current=temperature_2m,weather_code
//   &daily=temperature_2m_min,precipitation_probability_max,weather_code

struct WeatherResponse: Codable {
    let current: CurrentWeather
    let daily: DailyWeather
}

struct CurrentWeather: Codable {
    let time: Int
    let temperature_2m: Double
    let weather_code: Int
}

struct DailyWeather: Codable {
    let time: [Int]
    let weather_code: [Int]
    let temperature_2m_max: [Double]
    let temperature_2m_min: [Double]
}

struct WeatherView: View {
    @State private var weather: WeatherResponse?

    var body: some View {
        VStack {
            if let weather {
                Text("\\(weather.current.temperature_2m, specifier: "%.0f")°C")
                    .font(.system(size: 60))
                List(0..<7, id: \\.self) { i in
                    HStack {
                        Text("Day \\(i + 1)")
                        Spacer()
                        Text("\\(weather.daily.temperature_2m_min[i], specifier: "%.0f")° / \\(weather.daily.temperature_2m_max[i], specifier: "%.0f")°")
                    }
                }
            } else {
                ProgressView()
            }
        }
        .task { await loadWeather() }
    }

    func loadWeather() async {
        guard let url = URL(string: "https://api.open-meteo.com/v1/forecast?latitude=13.7467&longitude=100.5392&timezone=Asia/Bangkok&current=temperature_2m,weather_code&daily=temperature_2m_min,precipitation_probability_max,weather_code") else { return }
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            weather = try JSONDecoder().decode(WeatherResponse.self, from: data)
        } catch {
            print("Error: \\(error)")
        }
    }
}`,
        },
      ],
      note: (
        <>
          Tip จาก lecture: ลองเปิด URL บน Safari ก่อนเพื่อดูโครงสร้าง JSON
          จริงก่อนเขียน <C>struct</C>.
        </>
      ),
    },
  ],
}

export default topic
