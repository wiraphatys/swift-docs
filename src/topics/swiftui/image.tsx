import type { Topic } from '@/lib/topics'
import { C } from '@/components/docs/InlineCode'

const topic: Topic = {
  slug: 'image',
  title: 'Image',
  category: 'swiftui',
  group: 'Class 2 — Basic Layouts',
  summary:
    'แสดงรูปภาพจาก asset, SF Symbol, หรือ remote URL. ใช้งานบ่อยที่สุดคือการปรับขนาด และการ clip ทรง.',
  sections: [
    {
      id: 'sources',
      title: 'แหล่งที่มาของรูป',
      examples: [
        {
          code: `// Asset Catalog (ลากรูปเข้า Assets.xcassets ก่อน)
Image("corgi")

// SF Symbols (ไอคอนของ Apple, ใช้ได้ฟรี)
Image(systemName: "heart.fill")
Image(systemName: "star")
Image(systemName: "pencil.circle.fill")

// จาก URL (load async)
AsyncImage(url: URL(string: "https://picsum.photos/200")) { image in
    image.resizable().scaledToFit()
} placeholder: {
    ProgressView()
}`,
        },
      ],
      note: <>หา SF Symbol ได้จากแอป "SF Symbols" ของ Apple (ฟรี). ใช้ชื่อจากตรงนั้น.</>,
    },
    {
      id: 'resize',
      title: 'ปรับขนาด (สำคัญที่สุด)',
      intro: <p>รูป asset มาขนาดจริงเสมอ — ต้องเรียก <C>.resizable()</C> ก่อนถึงจะ frame ได้. ลำดับ <C>.resizable()</C> → <C>.scaledToFit/Fill</C> → <C>.frame()</C>.</p>,
      examples: [
        {
          code: `Image("corgi")
    .resizable()                 // อนุญาตให้ขยาย/ย่อ
    .scaledToFit()               // คงสัดส่วน, fit ในกรอบ (อาจมีพื้นที่ว่าง)
    .frame(width: 200, height: 200)

Image("corgi")
    .resizable()
    .scaledToFill()              // คงสัดส่วน, เต็มกรอบ (อาจถูกครอป)
    .frame(width: 200, height: 200)
    .clipped()                   // ตัดส่วนที่ล้น

// aspectRatio อย่างชัดเจน
Image("corgi")
    .resizable()
    .aspectRatio(16/9, contentMode: .fit)
    .frame(width: 300)`,
        },
      ],
      pitfall: <>ลืม <C>.resizable()</C> = รูปจะไม่ปรับตาม <C>.frame()</C>. ลืม <C>.clipped()</C> หลัง <C>scaledToFill</C> = รูปจะล้นออกจากกรอบ.</>,
    },
    {
      id: 'shape',
      title: 'ตัดเป็นทรง (clip)',
      examples: [
        {
          code: `// วงกลม (รูปโปรไฟล์)
Image("avatar")
    .resizable()
    .scaledToFill()
    .frame(width: 80, height: 80)
    .clipShape(.circle)

// มุมโค้ง
Image("cover")
    .resizable()
    .scaledToFill()
    .frame(width: 300, height: 180)
    .clipShape(.rect(cornerRadius: 16))

// ใส่ขอบเพิ่ม
Image("avatar")
    .resizable()
    .scaledToFill()
    .frame(width: 80, height: 80)
    .clipShape(.circle)
    .overlay {
        Circle().stroke(.white, lineWidth: 3)
    }`,
        },
      ],
    },
    {
      id: 'sf-symbol-style',
      title: 'แต่งสี SF Symbol',
      examples: [
        {
          code: `Image(systemName: "heart.fill")
    .foregroundStyle(.red)

Image(systemName: "star.fill")
    .font(.system(size: 40))            // ขนาดผ่าน font
    .foregroundStyle(.yellow)

// rendering modes
Image(systemName: "wifi")
    .symbolRenderingMode(.hierarchical)  // เฉดเดียวกันแต่หลายระดับ
    .foregroundStyle(.blue)

Image(systemName: "exclamationmark.triangle.fill")
    .symbolRenderingMode(.multicolor)    // สีหลายชั้น (ค่า default ของบางสัญลักษณ์)`,
        },
      ],
    },
    {
      id: 'overlay-bg',
      title: 'overlay / background',
      examples: [
        {
          code: `// แปะ badge มุมขวาบน
Image("avatar")
    .resizable()
    .frame(width: 60, height: 60)
    .clipShape(.circle)
    .overlay(alignment: .topTrailing) {
        Circle()
            .fill(.green)
            .frame(width: 14, height: 14)
            .overlay(Circle().stroke(.white, lineWidth: 2))
    }

// พื้นหลังสีไล่เฉด
Image(systemName: "sun.max.fill")
    .font(.system(size: 60))
    .foregroundStyle(.white)
    .padding()
    .background(
        LinearGradient(colors: [.orange, .red], startPoint: .top, endPoint: .bottom),
        in: .rect(cornerRadius: 16)
    )`,
        },
      ],
    },
  ],
}

export default topic
