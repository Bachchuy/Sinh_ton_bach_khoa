// === 1. LẤY CÁC DOM ELEMENTS CHÍNH ===
// (Lưu ý: Chúng ta phải bọc trong DOMContentLoaded để đảm bảo HTML đã tải xong)

let eventImage, eventText, choiceButtonsContainer, semesterDisplay;
let gpaBar, gpaValue, healthBar, healthValue, happinessBar, happinessValue;
let modal, modalTitle, modalText, modalButton;

// === 2. BỘ NÃO CỦA GAME: STATE (TRẠNG THÁI) ===
let state;

function khoi_tao_trang_thai() {  /*hàm khởi tạo trạng thái ban đầu*/
    return {
        gpa: 4.00,
        health: 100,
        happiness: 100,
        semester: 1,
        eventCount: 0, // Đếm sự kiện trong kỳ
        currentEventId: 'START_KY_1' // Sự kiện bắt đầu
    };
}

// === 4. CÁC HÀM QUẢN LÝ GAME (CORE ENGINE) ===

/**
 * Bắt đầu game
 */
function startGame() {
    state = khoi_tao_trang_thai();
    modal.classList.add('hidden'); // Ẩn modal nếu đang hiển thị
    updateUI();
    showEvent(state.currentEventId); // Hiển thị sự kiện đầu tiên
}

/**
 * Cập nhật giao diện (Thanh chỉ số) dựa trên 'state'
 */
function updateUI() {
    if (!state) return; 

    // Cập nhật học kỳ
    if (state.semester > 8) state.semester = 8;
    semesterDisplay.textContent = `Học kỳ: ${state.semester} / 8`;

    // GPA (Giới hạn từ 0 đến 4.0)
    state.gpa = Math.max(0, Math.min(4.0, state.gpa));
    gpaValue.textContent = `${state.gpa.toFixed(2)} / 4.0`;
    gpaBar.style.width = `${(state.gpa / 4.0) * 100}%`;

    // Health (Giới hạn từ 0 đến 100)
    state.health = Math.max(0, Math.min(100, state.health));
    healthValue.textContent = `${state.health} / 100`;
    healthBar.style.width = `${state.health}%`;

    // Happiness (Giới hạn từ 0 đến 100)
    state.happiness = Math.max(0, Math.min(100, state.happiness));
    happinessValue.textContent = `${state.happiness} / 100`;
    happinessBar.style.width = `${state.happiness}%`;
}

/**
 * Áp dụng thay đổi (effects) vào 'state'
 */
function applyEffects(effects) {
    if (!effects) return;
    if (effects.gpa) state.gpa += effects.gpa;
    if (effects.health) state.health += effects.health;
    if (effects.happiness) state.happiness += effects.happiness;
}

/**
 * Kiểm tra điều kiện thua
 */
function checkGameOver() {
    if (state.gpa < 1.0) {
        showEvent('GAME_OVER_GPA');
        return true;
    }
    if (state.health <= 0) {
        showEvent('GAME_OVER_HEALTH');
        return true;
    }
    if (state.happiness <= 0) {
        showEvent('GAME_OVER_HAPPINESS');
        return true;
    }
    return false;
}

/**
 * Hiển thị Modal Game Over / Win
 */
function showGameOver(title, text) {
    modal.classList.remove('hidden');
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalButton.onclick = startGame; // Nút "Chơi lại" sẽ reset game
    
    // Đổi màu title nếu thắng
    if (title.includes('CHÚC MỪNG')) {
        modalTitle.classList.remove('hust-red-text');
        modalTitle.classList.add('text-green-600');
    } else {
        modalTitle.classList.add('hust-red-text');
        modalTitle.classList.remove('text-green-600');
    }
}

/**
 * Hàm tiện ích để tạo nút
 */
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = "w-full bg-gray-800 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors";
    button.onclick = onClick;
    return button;
}

// === 5. CỖ MÁY KỊCH BẢN (EVENT DRIVER) ===

/**
 * Hiển thị một sự kiện dựa trên eventId
 */
function showEvent(eventId) {
    // Cập nhật state
    state.currentEventId = eventId;
    
    // Lấy 'events' từ file events.js (đã được nạp toàn cục)
    const event = events[eventId]; 

    if (!event) {
        console.error(`Không tìm thấy sự kiện: ${eventId}`);
        return;
    }

    // Xử lý các loại sự kiện đặc biệt
    if (event.type === 'END') {
        showGameOver(event.title, event.text);
        return;
    }

    // Cập nhật UI
    eventImage.src = event.image;
    eventText.textContent = event.text;
    choiceButtonsContainer.innerHTML = ''; // Xóa nút cũ

    // Xử lý logic tăng học kỳ (nếu là sự kiện bắt đầu)
    if (eventId.startsWith('START_KY_')) {
        state.semester = parseInt(eventId.split('_')[2]);
        updateUI(); // Cập nhật lại thanh UI
    }

    // Xử lý các loại sự kiện
    if (event.type === 'MINIGAME_RANDOM') {
        // Mini-game dựa trên xác suất
        const button = createButton("Thử vận may...", function() {
            const isSuccess = Math.random() < 0.6; // 60% thành công
            if (isSuccess) {
                alert(event.success.text); // Thông báo nhỏ
                handleChoice(event.success);
            } else {
                alert(event.failure.text); // Thông báo nhỏ
                handleChoice(event.failure);
            }
        });
        choiceButtonsContainer.appendChild(button);

    } else if (event.type === 'TRANSITION') {
        // Sự kiện chuyển tiếp, chỉ có 1 nút "Tiếp tục"
        const button = createButton("Tiếp tục", function() {
            handleChoice({ nextEvent: event.nextEvent });
        });
        choiceButtonsContainer.appendChild(button);

    } else {
        // Sự kiện bình thường, tạo các nút lựa chọn
        event.choices.forEach(choice => {
            const button = createButton(choice.text, function() {
                handleChoice(choice);
            });
            choiceButtonsContainer.appendChild(button);
        });
    }
}

/**
 * Xử lý khi người chơi bấm vào một lựa chọn (choice)
 */
function handleChoice(choice) {
    // 1. Áp dụng hiệu ứng
    applyEffects(choice.effects);
    
    // 2. Cập nhật giao diện (quan trọng: phải cập nhật trước khi check)
    updateUI();

    // 3. Kiểm tra xem có chết vì cạn kiệt chỉ số không
    if (checkGameOver()) {
        return; // Dừng lại nếu đã thua
    }
    
    // 4. Lấy sự kiện tiếp theo
    const nextEventId = choice.nextEvent;

    if (!nextEventId) {
        console.error("Lựa chọn này không có nextEvent:", choice);
        return;
    }

    // 5. Chuyển sang sự kiện tiếp theo
    showEvent(nextEventId);
}


// === 6. KHỞI ĐỘNG GAME ===
// Chỉ khởi động game SAU KHI toàn bộ trang (HTML, CSS, JS) đã được nạp
window.addEventListener('DOMContentLoaded', (event) => {
    // Lấy các DOM elements sau khi chúng đã được tải
    eventImage = document.getElementById('event-image');
    eventText = document.getElementById('event-text');
    choiceButtonsContainer = document.getElementById('choice-buttons');
    semesterDisplay = document.getElementById('semester-display');
    gpaBar = document.getElementById('gpa-bar');
    gpaValue = document.getElementById('gpa-value');
    healthBar = document.getElementById('health-bar');
    healthValue = document.getElementById('health-value');
    happinessBar = document.getElementById('happiness-bar');
    happinessValue = document.getElementById('happiness-value');
    modal = document.getElementById('modal');
    modalTitle = document.getElementById('modal-title');
    modalText = document.getElementById('modal-text');
    modalButton = document.getElementById('modal-button');

    // Bắt đầu game
    startGame();
});
