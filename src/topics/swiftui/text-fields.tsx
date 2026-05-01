import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'text-fields',
  title: 'TextField & SecureField',
  category: 'swiftui',
  group: 'Class 3 — Interactions',
  summary:
    'รับข้อความจากผู้ใช้ — TextField สำหรับทั่วไป, SecureField สำหรับรหัสผ่าน. ปรับ keyboard, autocapitalization, submit button.',
  sections: [
    {
      id: 'basic',
      title: 'พื้นฐาน',
      examples: [
        {
          code: `struct LoginView: View {
    @State private var email = ""
    @State private var password = ""

    var body: some View {
        VStack {
            TextField("Email", text: $email)
            SecureField("Password", text: $password)
        }
    }
}`,
        },
      ],
      note: <>"Email" / "Password" คือ placeholder. <C>$email</C> คือ binding ที่ทำให้ตัวแปรอัปเดตตามที่พิมพ์.</>,
    },
    {
      id: 'style',
      title: 'รูปแบบ — textFieldStyle',
      examples: [
        {
          code: `// เริ่มต้น (ไม่มีกรอบ — ต้องใส่ background เอง)
TextField("Name", text: $name)

// มีกรอบโค้ง — ที่ใช้บ่อยสุด
TextField("Name", text: $name)
    .textFieldStyle(.roundedBorder)

// แบบเอง
TextField("Name", text: $name)
    .padding()
    .background(.gray.opacity(0.1), in: .rect(cornerRadius: 8))`,
        },
      ],
    },
    {
      id: 'keyboard',
      title: 'Keyboard type',
      intro: <p>เลือก keyboard ให้เหมาะกับชนิดข้อมูล — ผู้ใช้พิมพ์ง่ายขึ้นมาก.</p>,
      examples: [
        {
          code: `// ตัวเลขเต็ม
TextField("Age", text: $age)
    .keyboardType(.numberPad)

// ทศนิยม
TextField("Price", text: $price)
    .keyboardType(.decimalPad)

// อีเมล
TextField("Email", text: $email)
    .keyboardType(.emailAddress)

// เบอร์โทร
TextField("Phone", text: $phone)
    .keyboardType(.phonePad)

// URL
TextField("Website", text: $url)
    .keyboardType(.URL)

// keyboard types อื่น
.keyboardType(.default)
.keyboardType(.asciiCapable)
.keyboardType(.twitter)`,
        },
      ],
    },
    {
      id: 'capitalization',
      title: 'autocapitalization & autocorrection',
      examples: [
        {
          code: `// อีเมล → ปิด autocapitalization + autocorrection
TextField("Email", text: $email)
    .textInputAutocapitalization(.never)
    .autocorrectionDisabled()

// ชื่อ → cap ตัวแรกของแต่ละคำ
TextField("Name", text: $name)
    .textInputAutocapitalization(.words)

// ประโยค → cap ตัวแรกของประโยค
TextEditor(text: $message)
    .textInputAutocapitalization(.sentences)

// ตัวเลือกทั้งหมด
.textInputAutocapitalization(.never)
.textInputAutocapitalization(.characters)
.textInputAutocapitalization(.words)
.textInputAutocapitalization(.sentences)`,
        },
      ],
    },
    {
      id: 'content-type',
      title: 'textContentType — autofill',
      intro: <p>บอก iOS ว่า field นี้รับข้อมูลอะไร — ระบบจะเสนอ autofill จาก Keychain / Contacts ให้.</p>,
      examples: [
        {
          code: `TextField("Email", text: $email)
    .textContentType(.emailAddress)
    .keyboardType(.emailAddress)

SecureField("Password", text: $password)
    .textContentType(.password)         // ดึงจาก Keychain

// ถ้าเป็นหน้าสมัครใหม่ — ใช้ .newPassword เพื่อให้ระบบเสนอรหัสผ่านสุ่ม
SecureField("New Password", text: $password)
    .textContentType(.newPassword)

// ที่ใช้บ่อยอื่น ๆ
.textContentType(.username)
.textContentType(.givenName)
.textContentType(.familyName)
.textContentType(.fullStreetAddress)
.textContentType(.telephoneNumber)
.textContentType(.oneTimeCode)        // OTP จาก SMS`,
        },
      ],
    },
    {
      id: 'submit',
      title: 'submitLabel + onSubmit',
      intro: <p>ปุ่ม return ของ keyboard เปลี่ยนตาม context — กดแล้วทำอะไรก็ตั้งใน <C>.onSubmit</C>.</p>,
      examples: [
        {
          code: `TextField("Email", text: $email)
    .submitLabel(.next)             // ปุ่ม "Next"
    .onSubmit { focusedField = .password }

SecureField("Password", text: $password)
    .submitLabel(.go)               // "Go"
    .onSubmit { signIn() }

// ตัวเลือกอื่น
.submitLabel(.done)
.submitLabel(.return)
.submitLabel(.search)
.submitLabel(.send)
.submitLabel(.continue)`,
        },
      ],
    },
    {
      id: 'focus',
      title: 'จัดการ focus ระหว่าง field',
      intro: <p>ใช้ <C>@FocusState</C> เพื่อย้าย focus จาก field หนึ่งไปอีก field.</p>,
      examples: [
        {
          code: `enum Field {
    case email, password
}

struct LoginView: View {
    @State private var email = ""
    @State private var password = ""
    @FocusState private var focused: Field?

    var body: some View {
        VStack {
            TextField("Email", text: $email)
                .focused($focused, equals: .email)
                .submitLabel(.next)
                .onSubmit { focused = .password }

            SecureField("Password", text: $password)
                .focused($focused, equals: .password)
                .submitLabel(.go)
                .onSubmit { signIn() }
        }
        .onAppear { focused = .email }      // auto focus ที่ email
    }
}`,
        },
      ],
    },
    {
      id: 'number-input',
      title: 'รับตัวเลขด้วย format',
      examples: [
        {
          code: `@State private var amount: Double = 0

TextField("Amount", value: $amount, format: .number)
    .keyboardType(.decimalPad)

// สกุลเงิน
TextField("Price", value: $amount, format: .currency(code: "THB"))
    .keyboardType(.decimalPad)

// Int
@State private var age: Int = 0
TextField("Age", value: $age, format: .number)
    .keyboardType(.numberPad)`,
        },
      ],
    },
    {
      id: 'multiline',
      title: 'TextEditor — รับหลายบรรทัด',
      examples: [
        {
          code: `@State private var note = ""

TextEditor(text: $note)
    .frame(minHeight: 120)
    .padding(8)
    .background(.gray.opacity(0.1), in: .rect(cornerRadius: 8))

// TextField แบบหลายบรรทัด (iOS 16+)
TextField("Note", text: $note, axis: .vertical)
    .lineLimit(3...8)            // อย่างน้อย 3 / สูงสุด 8 บรรทัด
    .textFieldStyle(.roundedBorder)`,
        },
      ],
    },
  ],
}

export default topic
