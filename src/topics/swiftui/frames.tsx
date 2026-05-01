import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'frames',
  title: 'frame & padding',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'frame() กำหนดขนาด, padding() เว้นระยะรอบขอบ — modifier 2 ตัวที่ใช้บ่อยที่สุดในการจัด layout.',
  sections: [
    {
      id: 'frame-fixed',
      title: 'frame — ขนาดตายตัว',
      examples: [
        {
          code: `Text("Hello")
    .frame(width: 200, height: 100)

// แค่ความกว้าง (สูงเท่าที่ต้อง)
Text("Hello")
    .frame(width: 200)

// แค่ความสูง
Image("photo")
    .frame(height: 200)

// สี่เหลี่ยมจัตุรัส
Image(systemName: "star")
    .frame(width: 50, height: 50)`,
        },
      ],
    },
    {
      id: 'frame-flexible',
      title: 'frame — ยืดหยุ่น (maxWidth/maxHeight)',
      intro: <p>ใช้ <C>maxWidth: .infinity</C> เพื่อให้ขยายเต็มพื้นที่ที่มี — pattern ที่ใช้บ่อยมาก.</p>,
      examples: [
        {
          code: `// ขยายเต็มความกว้าง
Text("Full width")
    .frame(maxWidth: .infinity)
    .background(.blue.opacity(0.2))

// ขยายเต็มหน้าจอ
Color.blue
    .frame(maxWidth: .infinity, maxHeight: .infinity)

// บังคับขั้นต่ำ
Button("Tap") { }
    .frame(minWidth: 200)

// ขั้นต่ำ + ขั้นสูงสุด
TextField("Name", text: $name)
    .frame(minWidth: 200, maxWidth: 400)`,
        },
      ],
    },
    {
      id: 'frame-alignment',
      title: 'frame + alignment',
      intro: <p>เมื่อ frame ใหญ่กว่า content ใช้ alignment เพื่อกำหนดว่า content อยู่ตรงไหน.</p>,
      examples: [
        {
          code: `Text("Hello")
    .frame(width: 300, height: 100, alignment: .leading)

// ขยายเต็มกว้าง แต่ชิดซ้าย
Text("Title")
    .frame(maxWidth: .infinity, alignment: .leading)
    .padding()

// alignment ที่ใช้ได้
.frame(..., alignment: .center)         // default
.frame(..., alignment: .leading)
.frame(..., alignment: .trailing)
.frame(..., alignment: .top)
.frame(..., alignment: .bottom)
.frame(..., alignment: .topLeading)
.frame(..., alignment: .topTrailing)
.frame(..., alignment: .bottomLeading)
.frame(..., alignment: .bottomTrailing)`,
        },
      ],
    },
    {
      id: 'padding',
      title: 'padding — เว้นระยะ',
      examples: [
        {
          code: `// ทุกด้านเท่ากัน (default 16)
Text("Hello").padding()

// ค่าเอง
Text("Hello").padding(20)

// บางด้าน
Text("Hello").padding(.top)
Text("Hello").padding(.horizontal)        // ซ้าย+ขวา
Text("Hello").padding(.vertical)          // บน+ล่าง

// ด้านเดียว ค่าเอง
Text("Hello").padding(.leading, 24)
Text("Hello").padding(.bottom, 8)

// หลายด้าน ค่าเอง
Text("Hello").padding(.horizontal, 16)
Text("Hello").padding([.top, .leading], 12)`,
        },
      ],
    },
    {
      id: 'order',
      title: 'ลำดับ modifier สำคัญ',
      intro: <p>ใส่ก่อน-หลังให้ผลต่างกัน — เป็น pitfall ที่เจอบ่อยมาก.</p>,
      examples: [
        {
          code: `// padding ก่อน background — สีกินถึงขอบ padding
Text("A")
    .padding()
    .background(.yellow)        // เหลืองเต็มกรอบรวม padding

// background ก่อน padding — สีกินแค่รอบตัวอักษร
Text("B")
    .background(.yellow)        // เหลืองแค่ตัวอักษร
    .padding()                  // padding อยู่นอกสีเหลือง

// frame ก่อน background
Text("C")
    .frame(width: 200, height: 50)
    .background(.blue)          // สีน้ำเงินเต็ม 200x50

// background ก่อน frame
Text("D")
    .background(.blue)          // สีน้ำเงินแค่รอบตัวอักษร
    .frame(width: 200, height: 50)`,
        },
      ],
      pitfall: <>กฎจำง่าย: <strong>"จากในออกนอก"</strong>. ใส่ <C>.padding()</C> ก่อน <C>.background()</C> ถ้าอยากให้พื้นหลังคลุมถึง padding.</>,
    },
    {
      id: 'common-patterns',
      title: 'pattern ที่ใช้บ่อย',
      examples: [
        {
          code: `// Card
Text("Card")
    .padding()
    .frame(maxWidth: .infinity)
    .background(.white)
    .clipShape(.rect(cornerRadius: 12))
    .shadow(radius: 4)

// Button แบบ block (เต็มความกว้าง)
Button("Sign In") { }
    .frame(maxWidth: .infinity)
    .padding()
    .background(.blue)
    .foregroundStyle(.white)
    .clipShape(.rect(cornerRadius: 8))

// Container ที่อยู่กลางจอ
VStack {
    Text("Centered")
}
.frame(maxWidth: .infinity, maxHeight: .infinity)`,
        },
      ],
    },
  ],
}

export default topic
