// === 3. NGÂN HÀNG SỰ KIỆN (EVENT BANK) ===
// Đây là trái tim của Giai đoạn 4, toàn bộ cốt truyện nằm ở đây.
const events = {
    // --- HỌC KỲ 1 ---
    'START_KY_1': {
        image: "https://placehold.co/600x300/A00000/FFFFFF?text=Cong+Parabol+HUST",
        text: "Chào mừng tân sinh viên K70! Bạn đã đặt chân đến cổng Parabol. Cả một tuần SHCD đang chờ.",
        choices: [
            // Khó hơn: Mệt hơn, chán hơn
            { text: "Nghiêm túc đi học tuần SHCD", effects: { hanh_phuc: -15, the_luc: -10 }, nextEvent: 'SHCD_NGHIEM_TUC' },
            // Khó hơn: Ít vui hơn
            { text: "Trốn đi net", effects: { hanh_phuc: +5 }, nextEvent: 'TRON_DI_NET' },
            // Khó hơn: Mệt hơn
            { text: "Tìm đường sang D3", effects: { the_luc: -20 }, nextEvent: 'TIM_D3' }
        ]
    },
    'SHCD_NGHIEM_TUC': {
        image: "https://placehold.co/600x300/6B7280/FFFFFF?text=Hoi+Truong+C2",
        text: "Bạn ngồi trong hội trường C2. Thầy nói gì đó về 'chuẩn đầu ra' và '650 TOEIC'. Chán quá...",
        choices: [
            // Khó hơn: GPA tăng ít hơn, chán hơn (0.05 -> 0.1)
            { text: "Cố gắng ngồi nghe", effects: { gpa: +0.1, hanh_phuc: -10 }, nextEvent: 'GIAI_TICH_1' },
            // Khó hơn: Ít vui, ít hồi sức hơn
            { text: "Chơi điện thoại", effects: { the_luc: +5, hanh_phuc: +3 }, nextEvent: 'BI_BAT' }
        ]
    },
    'TRON_DI_NET': {
        image: "https://placehold.co/600x300/1D4ED8/FFFFFF?text=GAME+THU+KTX",
        text: "Bạn trốn được ra quán net. Mùi mì tôm và không khí thật quen thuộc. Làm ván LOL đã.",
        choices: [
            // Khó hơn: Ít vui hơn, mệt hơn
            { text: "Chơi 1 trận thôi rồi về", effects: { hanh_phuc: +7, the_luc: -10 }, nextEvent: 'GIAI_TICH_1' },
            // Khó hơn: Mệt hơn rất nhiều, vui giảm
            { text: "Thâu đêm!", effects: { hanh_phuc: +15, the_luc: -60 }, nextEvent: 'NGU_QUEN_THI' }
        ]
    },
    'TIM_D3': {
        image: "https://placehold.co/600x300/9CA3AF/FFFFFF?text=Lac+Duong",
        text: "Bạn đi lạc qua bên HUCE... Cuối cùng cũng tìm thấy 3 nhưng đã kiệt sức.",
        choices: [
            { text: "Vào học Giải Tích...", nextEvent: 'GIAI_TICH_1' }
        ]
    },
    'GIAI_TICH_1': {
        image: "https://placehold.co/600x300/374151/FFFFFF?text=Giai+Tich+1",
        text: "Giờ Giải Tích 1 đầu tiên. Giảng viên bắt đầu viết 'Giới hạn' lên bảng. Bạn không hiểu gì cả.",
        choices: [
            // Khó hơn: GPA tăng ít, mệt hơn, chán hơn (0.05 -> 0.1)
            { text: "Cố gắng bắt chuyện hỏi bài và ghi chép", effects: { gpa: +0.1, the_luc: -10, hanh_phuc: -10 }, nextEvent: 'DEFAULT_EVENT_KY_1' },
            // Khó hơn: Ít vui hơn
            { text: "Chơi điện thoại không ghi chép bài", effects: { hanh_phuc: +5 }, nextEvent: 'DEFAULT_EVENT_KY_1' }
        ]
    },
    'BI_BAT': {
        image: "https://placehold.co/600x300/EF4444/FFFFFF?text=BI+BAT+QUA+TANG",
        text: "Bạn chơi Liên quân và chiến thắng, lỡ bật tiếng: Victory to rõ to. Cả hội trường bất ngờ. Giảng viên phát hiện! 'Em kia! Đứng dậy! Tên gì? Lớp nào?'",
        choices: [
            // Khó hơn: Bị phạt nặng hơn
            { text: "Xin lỗi thầy và hứa không tái phạm", effects: { gpa: -0.2, hanh_phuc: -25 }, nextEvent: 'GIAI_TICH_1' },
            { text: "(Nói lí nhí) 'Em... em...'", nextEvent: 'GAME_OVER_VO_LE' } // Bad Ending tức thì
        ]
    },
    'NGU_QUEN_THI': {
        image: "https://placehold.co/600x300/4B5563/FFFFFF?text=NGU+QUEN+THI",
        text: "Bạn cày game cả đêm. Sáng hôm sau, bạn kiệt sức và... ngủ quên mất buổi thi giữa kỳ môn Giải Tích 1.",
        choices: [
            { text: "Thôi xong...", nextEvent: 'GAME_OVER_NGU_QUEN_THI' } // Bad Ending tức thì
        ]
    },
    'DEFAULT_EVENT_KY_1': {
        image: "https://placehold.co/600x300/F59E0B/FFFFFF?text=Nha+An+B1",
        text: "Một buổi tối bình thường. Bạn đi ăn ở:...",
        choices: [
            // Khó hơn: Mệt hơn (đau bụng nặng hơn), ít vui hơn
            { text: "Kí túc xá. Mấy ngày sau báo đưa tin phát hiện nhà ăn làm bẩn...", effects: { the_luc: -25, hanh_phuc: +7 }, nextEvent: 'FINAL_EXAM_KY_1' },
            // Khó hơn: Mệt hơn, ít vui hơn
            { text: "Vỉa hè. Đêm đó bạn đau bụng", effects: { the_luc: -25, hanh_phuc: +7 }, nextEvent: 'FINAL_EXAM_KY_1' }
        ]
    },
    'TIM_NEU': {
        image: "https://placehold.co/600x300/F59E0B/FFFFFF?text=Sang+NEU",
        text: "Bạn sang NEU chơi và thấy quá lắm bạn nữ xinh. Bạn quyết định: ",
        choices: [
            // Khó hơn: Trừ GPA nặng hơn, ít vui hơn
            { text: "Bắt chuyện xin infor", effects: { gpa: -0.3, hanh_phuc: +15 }, nextEvent: 'FINAL_EXAM_KY_1' },
            // Khó hơn: Cộng GPA ít hơn, buồn hơn
            { text: "Thôi, ngại quá không dám", effects: { gpa: +0.1, hanh_phuc: -15 }, nextEvent: 'FINAL_EXAM_KY_1' }
        ]
    },
    'FINAL_EXAM_KY_1': {
        type: 'MINIGAME_RANDOM', // Đây là mini-game
        text: "Thi cuối kỳ Giải Tích 1! Đề thi khó nên bạn quyết định lén hỏi bài. Liệu bạn có làm đúng câu này không?",
        image: "https://placehold.co/600x300/111827/FFFFFF?text=THI+CUOI+KY",
        // Khó hơn: Thưởng ít hơn
        success: { text: "Bạn may mắn chép được câu trả lời đúng! Bạn qua môn!", effects: { gpa: +0.1, hanh_phuc: +10 }, nextEvent: 'START_KY_2' },
        // Khó hơn: Phạt nặng hơn
        failure: { text: "Bạn hỏi đúng thằng ngu... Tạch môn.", effects: { gpa: -0.7, hanh_phuc: -30 }, nextEvent: 'START_KY_2' }
    },

    // --- HỌC KỲ 2 ---
    'START_KY_2': {
        image: "https://placehold.co/600x300/A00000/FFFFFF?text=Hoc+Ky+2",
        text: "Học kỳ 2 bắt đầu. Chào mừng bạn đến với Vật Lý Đại Cương! Có vẻ khó hơn...",
        choices: [
            // Khó hơn: Thưởng GPA ít, chán hơn (0.05 -> 0.1)
            { text: "Quyết tâm học!", effects: { gpa: +0.1, hanh_phuc: -10 }, nextEvent: 'VAT_LY_1' },
            // Khó hơn: Phạt GPA nặng, thưởng ít
            { text: "Tìm người yêu... (chuyển sang NEU)", effects: {gpa: -0.2, the_luc: +5,hanh_phuc: +10 }, nextEvent: 'VAT_LY_1' },
        ]
    },
    'VAT_LY_1': {
        image: "https://placehold.co/600x300/166534/FFFFFF?text=Vat+Ly+Dai+Cuong",
        text: "Giờ Vật Lý. Con lắc, lò xo, điện trường... bạn bắt đầu thấy nản.",
        choices: [
            // Khó hơn: Thưởng GPA ít, mệt hơn (0.05 -> 0.1)
            { text: "Học tiếp", effects: { gpa: +0.1, the_luc: -15 }, nextEvent: 'FINAL_EXAM_KY_2' },
            // Khó hơn: Phạt GPA nặng, thưởng ít
            { text: "Trốn học", effects: { gpa: -0.2, hanh_phuc: +5 }, nextEvent: 'FINAL_EXAM_KY_2' }
        ]
    },
    'FINAL_EXAM_KY_2': {
        type: 'TRANSITION', // Đây là sự kiện chuyển tiếp
        text: 'Bạn đã sống sót qua Học Kỳ 2. Mệt mỏi thật.',
        nextEvent: 'FAST_FORWARD_START' // Bắt đầu tua nhanh
    },

    // --- TUA NHANH HỌC KỲ 3-7 ---
    'FAST_FORWARD_START': {
        image: "https://placehold.co/600x300/4D7C0F/FFFFFF?text=Tua+Nhanh...",
        text: "Những học kỳ sau đó trôi qua như một cơn gió. Giải tích, Triết học, Thực tập... Bạn đã già đi và bắt đầu hói trông thấy.",
        choices: [
            // Khó hơn: Phạt cực nặng cho việc tua nhanh
            { text: "Bỏ qua 5 học kỳ...", effects: { gpa: -1.0, the_luc: -30, hanh_phuc: -30 }, nextEvent: 'START_KY_8' }
        ]
    },

    // --- HỌC KỲ 8 (TRÙM CUỐI) ---
    'START_KY_8': {
        image: "https://placehold.co/600x300/3730A3/FFFFFF?text=Hoc+Ky+8+-+DATN",
        text: "Năm 4! Chỉ còn một thứ duy nhất: Đồ Án Tốt Nghiệp. Bạn đã chọn được đề tài và giáo viên hướng dẫn.",
        choices: [
            // Khó hơn: Thưởng GPA ít, phạt nặng hơn
            { text: "Cày ngày cày đêm", effects: { gpa: +0.1, the_luc: -40, hanh_phuc: -40 }, nextEvent: 'BAO_VE_THU' },
            // Khó hơn: Phạt GPA nặng, thưởng ít
            { text: "Vừa làm vừa chơi", effects: { gpa: -0.2, the_luc: +5, hanh_phuc: +5 }, nextEvent: 'BAO_VE_THU' }
        ]
    },
    'BAO_VE_THU': {
        image: "https://placehold.co/600x300/0C4A6E/FFFFFF?text=Bao+Ve+Thu",
        text: "Buổi bảo vệ thử. Thầy hướng dẫn nói: 'Code của em vẫn còn bug, slide thì làm xấu. Về sửa ngay!'",
        choices: [
            // Khó hơn: Thưởng GPA ít, buồn hơn (0.05 -> 0.1)
            { text: "Vâng ạ, em sửa ngay...", effects: { gpa: +0.1, hanh_phuc: -20 }, nextEvent: 'BAO_VE_CHINH_THUC' },
            // Khó hơn: Thưởng ít hơn
            { text: "Dạ, em tự tin không sai", effects: { hanh_phuc: +5, gpa: +0.2}, nextEvent: 'BAO_VE_CHINH_THUC' }
        ]
    },
    'BAO_VE_CHINH_THUC': {
        type: 'MINIGAME_RANDOM',
        text: "Ngày bảo vệ chính thức! Bạn đứng trước hội đồng. Một thầy hỏi câu bạn không ngờ tới. Liệu bạn có 'chém' được không?",
        image: "https://placehold.co/600x300/111827/FFFFFF?text=BAO+VE+TOT+NGHIEP",
        // Khó hơn: Thưởng ít hơn
        success: { text: "Bạn trả lời trôi chảy! Hội đồng gật gù.", effects: { gpa: +0.2, hanh_phuc: +50 }, nextEvent: 'WIN_GAME' },
        // Khó hơn: Phạt nặng hơn
        failure: { text: "Bạn ấp úng... Thầy lắc đầu.", effects: { gpa: -0.8, hanh_phuc: -70 }, nextEvent: 'GAME_OVER_TRUOT_DATN' }
    },

    // --- KẾT THÚC GAME (ENDINGS) ---
    'WIN_GAME': {
        type: 'END',
        title: '🎉 CHÚC MỪNG TÂN CỬ NHÂN! 🎉',
        text: 'Bạn đã tốt nghiệp Bách Khoa ĐÚNG HẠN! Một kỳ tích!'
    },
    'GAME_OVER_VO_LE': {
        type: 'END',
        title: 'Thiếu điểm rèn luyện',
        text: 'Bạn bị 0 điểm rèn luyện, cắt học bổng. Phạt nhảy 1 điệu bách khoa.'
    },
    'GAME_OVER_NGU_QUEN_THI': {
        type: 'END',
        title: 'Bad Ending: Ngủ quên thi',
        text: '0 điểm giữa kỳ. Môn Giải Tích chắc chắn F. Con đường ra trường đúng hạn đã xa vời.'
    },
    'GAME_OVER_TRUOT_DATN': {
        type: 'END',
        title: 'GAME OVER',
        text: 'Bạn bảo vệ không thành công. Bye bye. 6 tháng nữa gặp lại.'
    },
    'GAME_OVER_GPA': {
        type: 'END',
        title: 'GAME OVER',
        text: 'GPA của bạn đã xuống dưới 1.0. (Sao bạn ngu thế) Hội đồng kỷ luật đã gửi thư về cho gia đình bạn và bạn nhận cảnh cáo.'
    },
    'GAME_OVER_the_luc': {
        type: 'END',
        title: 'GAME OVER',
        text: 'Bạn kiệt sức và ngất xỉu trong thư viện. Bạn phải bảo lưu 1 năm để chữa bệnh.'
    },
    'GAME_OVER_hanh_phuc': {
        type: 'END',
        title: 'GAME OVER',
        text: 'Bạn cảm thấy quá áp lực và không còn tìm thấy niềm vui. Bạn quyết định rút hồ sơ.'
    }
};