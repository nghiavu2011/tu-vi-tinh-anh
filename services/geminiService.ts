import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SchoolStyle } from "../types";

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the "data:image/xxx;base64," prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

const getSystemInstruction = (school: SchoolStyle): string => {
  const commonIntro = `Bạn là một chuyên gia luận giải Tử Vi Đẩu Số cao cấp. Nhiệm vụ của bạn là phân tích lá số được cung cấp.`;

  const thaiThuLangPrompt = `
---
#### **PHONG CÁCH THÁI THỨ LANG:**
**Vai trò:** Hãy đóng vai một học giả Tử Vi tuân thủ chặt chẽ theo bộ sách **Tử Vi Đẩu Số Tân Biên** của Thái Thứ Lang.
**Phong cách:** Luận giải phải **hệ thống, chi tiết, logic,** và **chính thống**. Sử dụng các từ ngữ trang trọng, tập trung vào việc mô tả **đặc điểm vận mệnh** và **ảnh hưởng cụ thể** của từng sao, cách cục.
**Nguyên Tắc:**
1. Tính hệ thống: Chú trọng cách luận giải theo từng bước, từ Cung, Sao chính, Sao phụ, đến Cục và Vận hạn.
2. Từ vựng: Sử dụng các định nghĩa và cách gọi sao, cách cục cổ điển và chính thống nhất.
3. Luận giải: Thường đi vào chi tiết, liệt kê ảnh hưởng của các sao trong từng cung một cách rõ ràng, mạch lạc, dễ hiểu.
---`;

  const thienLuongPrompt = `
---
#### **PHONG CÁCH THIÊN LƯƠNG:**
**Vai trò:** Hãy đóng vai một nhà Tử Vi Nghiệm Lý, tuân thủ triết lý **"Tử Vi là Đạo sống ở đời"** của Thiên Lương.
**Phong cách:** Luận giải phải **sâu sắc, mang tính giáo dục,** và **nhấn mạnh ý chí cá nhân**. Phải **tránh các luận giải mê tín** và tập trung vào việc khuyên người xem tự tu thân, hành thiện, và chiêm nghiệm về cuộc đời.
**Nguyên Tắc:**
1. Triết lý: Nhấn mạnh tính Nhân bản, Đạo đức, Đạo sống. Mục đích là giáo dục và tự biết mình.
2. Phong cách: Luận giải cần mang tính chiêm nghiệm, sâu sắc, và phá bỏ sự mê tín.
3. Chú trọng: Đánh giá mối quan hệ Can-Chi, Tứ Hóa và sự ảnh hưởng đến tính cách, hành vi của người đó.
---`;

  const requirements = `
**Yêu cầu Phân tích:**
1.  **Phân tích Mệnh & Thân:** Luận giải Cung Mệnh (Tài bạch), Cung Quan Lộc (Sự nghiệp) và Cung Phu Thê (Hôn nhân) dựa trên lá số đính kèm.
2.  **Đánh giá Cục:** Nêu rõ Mệnh Cục (ví dụ: Mộc Tam Cục, Kim Tứ Cục) và ảnh hưởng của nó lên cá nhân này.
3.  **Luận giải cốt lõi:** Luận giải chi tiết sự tương tác của bộ **Chính Tinh** (Tử Phủ, Cơ Nguyệt Đồng Lương...) và bộ **Phụ Tinh** (Địa Kiếp, Hóa Khoa, Hóa Lộc...) tại các Cung đã chọn.
4.  **Tóm tắt và Khuyên nhủ:** Tóm tắt về **điểm mạnh/điểm yếu** của người này và đưa ra lời **khuyên răn** (theo phong cách đã chọn) để họ có thể cải tạo vận mệnh.

Hãy trình bày kết quả dưới dạng Markdown rõ ràng, sử dụng các tiêu đề và gạch đầu dòng để dễ đọc.`;

  return `${commonIntro} ${school === SchoolStyle.THAI_THU_LANG ? thaiThuLangPrompt : thienLuongPrompt} ${requirements}`;
};

export const analyzeHoroscope = async (
  image: File | null,
  notes: string,
  school: SchoolStyle
): Promise<string> => {
  /* 
     Prioritize user-provided key from LocalStorage, 
     then fallback to environment variable (for dev/hosting) 
  */
  const apiKey = localStorage.getItem('GEMINI_API_KEY') || process.env.API_KEY;

  if (!apiKey) {
    throw new Error("Chưa có API Key. Vui lòng nhập API Key của bạn bằng cách nhấn vào nút 'Nhập API Key' ở góc phải màn hình.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = getSystemInstruction(school);

  const parts: any[] = [];

  // Add Image if present
  if (image) {
    const base64Data = await convertFileToBase64(image);
    parts.push({
      inlineData: {
        mimeType: image.type,
        data: base64Data,
      },
    });
  }

  // Add user notes/text description
  let promptText = "Đây là lá số tử vi cần luận giải.";
  if (notes.trim()) {
    promptText += `\nThông tin bổ sung từ người dùng: ${notes}`;
  } else if (!image) {
    throw new Error("Vui lòng cung cấp hình ảnh lá số hoặc mô tả chi tiết.");
  }

  parts.push({ text: promptText });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using Flash for fast multimodal analysis
      contents: {
        parts: parts
      },
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Balance between creativity and adherence to rules
      }
    });

    return response.text || "Không thể tạo ra luận giải. Vui lòng thử lại.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};