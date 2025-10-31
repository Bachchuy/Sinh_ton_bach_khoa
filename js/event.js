// === 3. NGÂN HÀNG SỰ KIỆN (EVENT BANK) ===
// Đây là trái tim của Giai đoạn 4, toàn bộ cốt truyện nằm ở đây.
const events = {
    // --- HỌC KỲ 1 ---
    'START_KY_1': {
        image: "https://placehold.co/600x300/A00000/FFFFFF?text=Cong+Parabol+HUST",
        text: "Chào mừng tân sinh viên K70! Bạn đã đặt chân đến cổng Parabol. Cả một tuần SHCD đang chờ.",
        choices: [
            { text: "Nghiêm túc đi học tuần SHCD", effects: { happiness: -10, health: -5 }, nextEvent: 'SHCD_NGHIEM_TUC' },
            { text: "Trốn đi net ở KTX", effects: { happiness: +10 }, nextEvent: 'TRON_DI_NET' },
            { text: "Tìm đường đến giảng đường D8", effects: { health: -10 }, nextEvent: 'TIM_D8' }
        ]
    },
    'SHCD_NGHIEM_TUC': {
        image: "https://placehold.co/600x300/6B7280/FFFFFF?text=Hoi+Truong+C2",
        text: "Bạn ngồi trong hội trường C2. Thầy nói gì đó về 'chuẩn đầu ra' và '450 TOEIC'. Buồn ngủ quá...",
        choices: [
            { text: "Cố gắng thức để nghe", effects: { gpa: +0.05, happiness: -5 }, nextEvent: 'GIAI_TICH_1' },
            { text: "Ngủ gật", effects: { health: +10, happiness: +5 }, nextEvent: 'BI_BAT' }
        ]
    },
    'TRON_DI_NET': {
        image: "https://placehold.co/600x300/1D4ED8/FFFFFF?text=GAME+THU+KTX",
        text: "Bạn trốn được ra quán net ở KTX. Mùi mì tôm và không khí thật quen thuộc. Làm ván LOL đã.",
        choices: [
            { text: "Chơi 1 trận thôi rồi về", effects: { happiness: +15, health: -5 }, nextEvent: 'GIAI_TICH_1' },
            { text: "Thông đêm!", effects: { happiness: +30, health: -40 }, nextEvent: 'NGU_QUEN_THI' }
        ]
    },
    'TIM_D8': {
        image: "https://placehold.co/600x300/9CA3AF/FFFFFF?text=Lac+Duong",
        text: "Bạn đi lạc qua cả khu Viện... Cuối cùng cũng tìm thấy D8 nhưng đã kiệt sức.",
        choices: [
            { text: "Vào học Giải Tích...", nextEvent: 'GIAI_TICH_1' }
        ]
    },
    'GIAI_TICH_1': {
        image: "https://placehold.co/600x300/374151/FFFFFF?text=Giai+Tich+1",
        text: "Giờ Giải Tích 1 đầu tiên. Giảng viên bắt đầu viết 'epsilon' và 'delta' lên bảng. Bạn không hiểu gì cả.",
        choices: [
            { text: "Cố gắng chép bài", effects: { gpa: +0.1, health: -5, happiness: -5 }, nextEvent: 'DEFAULT_EVENT_KY_1' },
            { text: "Lấy điện thoại ra lướt Facebook", effects: { happiness: +10 }, nextEvent: 'DEFAULT_EVENT_KY_1' }
        ]
    },
    'BI_BAT': {
        image: "https://placehold.co/600x300/EF4444/FFFFFF?text=BI+BAT+QUA+TANG",
        text: "Bạn ngủ gật và bị giảng viên phát hiện! 'Em kia! Đứng dậy! Tên gì? Lớp nào?'",
        choices: [
            { text: "Xin lỗi thầy và hứa không tái phạm", effects: { gpa: -0.1, happiness: -15 }, nextEvent: 'GIAI_TICH_1' },
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
        text: "Một buổi tối bình thường. Bạn quyết định ăn ở nhà ăn B1.",
        choices: [
            { text: "Ăn cơm 15k", effects: { health: +15, happiness: +5 }, nextEvent: 'FINAL_EXAM_KY_1' },
            { text: "Ăn phở 25k", effects: { health: +20, happiness: +10 }, nextEvent: 'FINAL_EXAM_KY_1' }
        ]
    },
    'FINAL_EXAM_KY_1': {
        type: 'MINIGAME_RANDOM', // Đây là mini-game
        text: "Thi cuối kỳ Giải Tích 1! Đề thi khó, nhưng có một câu gỡ điểm. Liệu bạn có làm đúng câu này không?",
        image: "https://placehold.co/600x300/111827/FFFFFF?text=THI+CUOI+KY",
        success: { text: "Bạn làm đúng câu gỡ điểm! Bạn qua môn!", effects: { gpa: +0.2, happiness: +15 }, nextEvent: 'START_KY_2' },
        failure: { text: "Bạn làm sai câu gỡ điểm... Tạch môn.", effects: { gpa: -0.5, happiness: -20 }, nextEvent: 'START_KY_2' }
    },

    // --- HỌC KỲ 2 ---
    'START_KY_2': {
        image: "https://placehold.co/600x300/A00000/FFFFFF?text=Hoc+Ky+2",
        text: "Học kỳ 2 bắt đầu. Chào mừng bạn đến với Vật Lý Đại Cương! Có vẻ khó hơn...",
        choices: [
            { text: "Quyết tâm học!", effects: { gpa: +0.1, happiness: -5 }, nextEvent: 'VAT_LY_1' },
            { text: "Tìm người yêu... (chuyển sang NEU)", effects: { happiness: +20, health: +10 }, nextEvent: 'VAT_LY_1' },
        ]
    },
    'VAT_LY_1': {
        image: "https://placehold.co/600x300/166534/FFFFFF?text=Vat+Ly+Dai+Cuong",
        text: "Giờ Vật Lý. Con lắc, lò xo, điện trường... bạn bắt đầu thấy nản.",
        choices: [
            { text: "Học tiếp", effects: { gpa: +0.1, health: -10 }, nextEvent: 'FINAL_EXAM_KY_2' },
            { text: "Trốn học", effects: { gpa: -0.1, happiness: +10 }, nextEvent: 'FINAL_EXAM_KY_2' }
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
        text: "Những học kỳ sau đó trôi qua như một cơn gió. Cơ học, Triết học, Thực tập xưởng... Bạn đã già đi trông thấy.",
        choices: [
            { text: "Bỏ qua 5 học kỳ...", effects: { gpa: -0.5, health: -20, happiness: -20 }, nextEvent: 'START_KY_8' }
        ]
    },

    // --- HỌC KỲ 8 (TRÙM CUỐI) ---
    'START_KY_8': {
        image: "https://placehold.co/600x300/3730A3/FFFFFF?text=Hoc+Ky+8+-+DATN",
        text: "Học Kỳ 8! Chỉ còn một thứ duy nhất: Đồ Án Tốt Nghiệp. Bạn đã chọn được đề tài và giáo viên hướng dẫn.",
        choices: [
            { text: "Cày ngày cày đêm", effects: { gpa: +0.3, health: -30, happiness: -30 }, nextEvent: 'BAO_VE_THU' },
            { text: "Vừa làm vừa chơi", effects: { gpa: -0.1, health: +10, happiness: +10 }, nextEvent: 'BAO_VE_THU' }
        ]
    },
    'BAO_VE_THU': {
        image: "https://placehold.co/600x300/0C4A6E/FFFFFF?text=Bao+Ve+Thu",
        text: "Buổi bảo vệ thử. Thầy hướng dẫn nói: 'Code của em vẫn còn bug, slide thì làm xấu. Về sửa ngay!'",
        choices: [
            { text: "Vâng ạ, em sửa ngay...", effects: { gpa: +0.1, happiness: -15 }, nextEvent: 'BAO_VE_CHINH_THUC' },
            { text: "Kệ thầy, em tự tin rồi", effects: { happiness: +10 }, nextEvent: 'BAO_VE_CHINH_THUC' }
        ]
    },
    'BAO_VE_CHINH_THUC': {
        type: 'MINIGAME_RANDOM',
        text: "Ngày bảo vệ chính thức! Bạn đứng trước hội đồng. Một thầy hỏi câu bạn không ngờ tới. Liệu bạn có 'chém' được không?",
        image: "https://placehold.co/600x300/111827/FFFFFF?text=BAO+VE+TOT+NGHIEP",
        success: { text: "Bạn trả lời trôi chảy! Hội đồng gật gù.", effects: { gpa: +0.5, happiness: +100 }, nextEvent: 'WIN_GAME' },
        failure: { text: "Bạn ấp úng... Thầy lắc đầu.", effects: { gpa: -0.5, happiness: -50 }, nextEvent: 'GAME_OVER_TRUOT_DATN' }
    },

    // --- KẾT THÚC GAME (ENDINGS) ---
    'WIN_GAME': {
        type: 'END',
        title: '🎉 CHÚC MỪNG TÂN KỸ SƯ! 🎉',
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
        text: 'Bạn bảo vệ không thành công. 6 tháng nữa gặp lại.'
    },
    'GAME_OVER_GPA': {
        type: 'END',
        title: 'GAME OVER',
        text: 'GPA của bạn đã xuống dưới 1.0. Hội đồng kỷ luật đã gửi thư về cho gia đình bạn.'
    },
    'GAME_OVER_HEALTH': {
        type: 'END',
        title: 'GAME OVER',
        text: 'Bạn kiệt sức và ngất xỉu trong thư viện. Bạn phải bảo lưu 1 năm để chữa bệnh.'
    },
    'GAME_OVER_HAPPINESS': {
        type: 'END',
        title: 'GAME OVER',
        text: 'Bạn cảm thấy quá áp lực và không còn tìm thấy niềm vui. Bạn quyết định rút hồ sơ.'
    }
};
