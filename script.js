document.addEventListener('DOMContentLoaded', () => {
    // Game DOM Elements
    const gameContainer = document.getElementById('game-container');
    const gameArea = document.getElementById('game-area');
    const basket = document.getElementById('basket');
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');
    const livesDisplay = document.getElementById('lives');
    const timeCounter = document.getElementById('time-counter');
    const difficultyIndicator = document.getElementById('difficulty-indicator');
    const pauseButton = document.getElementById('pause-button');
    
    // Nhân vật DOM Elements
    const dropperCharacter = document.getElementById('dropper-character');
    const catcherContainer = document.getElementById('catcher-container');
    const catcherCharacter = document.getElementById('catcher-character');
    
    // Menu DOM Elements
    const mainMenu = document.getElementById('main-menu');
    const playButton = document.getElementById('play-button');
    const settingsButton = document.getElementById('settings-button');
    const leaderboardButton = document.getElementById('leaderboard-button');
    document.addEventListener('DOMContentLoaded', () => {
        // Game DOM Elements
        const gameContainer = document.getElementById('game-container');
        const gameArea = document.getElementById('game-area');
        const basket = document.getElementById('basket');
        const scoreDisplay = document.getElementById('score');
        const highScoreDisplay = document.getElementById('high-score');
        const livesDisplay = document.getElementById('lives');
        const timeCounter = document.getElementById('time-counter');
        const difficultyIndicator = document.getElementById('difficulty-indicator');
        const pauseButton = document.getElementById('pause-button');
        
        // Nhân vật DOM Elements
        const dropperCharacter = document.getElementById('dropper-character');
        const catcherContainer = document.getElementById('catcher-container');
        const catcherCharacter = document.getElementById('catcher-character');
        
        // Menu DOM Elements
        const mainMenu = document.getElementById('main-menu');
        const playButton = document.getElementById('play-button');
        const settingsButton = document.getElementById('settings-button');
        const leaderboardButton = document.getElementById('leaderboard-button');
        
        // Difficulty Menu
        const difficultyMenu = document.getElementById('difficulty-menu');
        const easyButton = document.getElementById('easy-button');
        const mediumButton = document.getElementById('medium-button');
        const hardButton = document.getElementById('hard-button');
        const backFromDifficulty = document.getElementById('back-from-difficulty');
        
        // Settings Menu
        const settingsMenu = document.getElementById('settings-menu');
        const volumeSlider = document.getElementById('volume-slider');
        const volumeValue = document.getElementById('volume-value');
        const bgmSlider = document.getElementById('bgm-slider');
        const bgmValue = document.getElementById('bgm-value');
        const usernameInput = document.getElementById('username-input');
        const backFromSettings = document.getElementById('back-from-settings');
        
        // Leaderboard Menu
        const leaderboardMenu = document.getElementById('leaderboard-menu');
        const leaderboardList = document.getElementById('leaderboard-list');
        const backFromLeaderboard = document.getElementById('back-from-leaderboard');
        
        // Game Screens
        const startScreen = document.getElementById('start-screen');
        const startButton = document.getElementById('start-button');
        const backFromInstructions = document.getElementById('back-from-instructions');
        const gameOverScreen = document.getElementById('game-over');
        const finalScore = document.getElementById('final-score');
        const timeLeft = document.getElementById('time-left');
        const playerNameInput = document.getElementById('player-name');
        const saveScoreButton = document.getElementById('save-score-button');
        const restartButton = document.getElementById('restart-button');
        const backToMenuButton = document.getElementById('back-to-menu-button');
        const pauseScreen = document.getElementById('pause-screen');
        const resumeButton = document.getElementById('resume-button');
        const quitButton = document.getElementById('quit-button');
        
        // Audio Elements
        const catchSound = document.getElementById('catch-sound');
        const missSound = document.getElementById('miss-sound');
        const gameOverSound = document.getElementById('game-over-sound');
        const specialSound = document.getElementById('special-sound');
        const lifeSound = document.getElementById('life-sound');
        const timeSound = document.getElementById('time-sound');
        const buttonSound = document.getElementById('button-sound');
        const countdownSound = document.getElementById('countdown-sound');
        const backgroundMusic = document.getElementById('background-music');
        
        // Game Settings
        let score = 0;
        let lives = 3;
        let timeRemaining = 60; // Seconds
        let gameSpeed = 1500; // Heart spawn rate in ms (đã điều chỉnh)
        let heartSpeed = 2; // Heart falling speed (đã điều chỉnh)
        let hearts = [];
        let gameInterval;
        let timeInterval;
        let isGameRunning = false;
        let isPaused = false;
        let selectedDifficulty = 'easy'; // Default
        let currentUsername = localStorage.getItem('username') || 'Player';
    });
        // Difficulty settings (đã điều chỉnh)
        const difficulties = {
            easy: {
                initialTime: 60,
                initialSpeed: 1500,     // Từ 2000 xuống 1500
                heartSpeed: 2,          // Từ 3 xuống 2
                livesCount: 3,
                timeBonus: 10,
                specialHeartChance: 0.15,
                extraLifeChance: 0.05,
                extraTimeChance: 0.05,
                speedIncrement: 0.1     // Mức tăng tốc độ rơi
            },
            medium: {
                initialTime: 45,
                initialSpeed: 1200,
                heartSpeed: 3,
                livesCount: 2,
                timeBonus: 8,
                specialHeartChance: 0.12,
                extraLifeChance: 0.04,
                extraTimeChance: 0.04,
                speedIncrement: 0.15
            },
            hard: {
                initialTime: 30,
                initialSpeed: 1000,
                heartSpeed: 4,
                livesCount: 1,
                timeBonus: 5,
                specialHeartChance: 0.1,
                extraLifeChance: 0.03,
                extraTimeChance: 0.03,
                speedIncrement: 0.2
            }
        };
        
        // Âm lượng
        let volumeLevel = localStorage.getItem('volume') || 80;
        let bgmLevel = localStorage.getItem('bgm') || 50;
        
        // Thiết lập điểm cao nhất từ localStorage
        let highScore = localStorage.getItem('heartGameHighScore') || 0;
        highScoreDisplay.textContent = 'Cao nhất: ' + highScore;
        
        // Khởi tạo bảng xếp hạng
        let leaderboard = JSON.parse(localStorage.getItem('heartGameLeaderboard')) || [];
        
        // Set basket initial position
        const initialX = gameContainer.clientWidth / 2;
        basket.style.left = initialX + 'px';
        catcherContainer.style.left = initialX + 'px';
        
        // Initialize settings
        initializeSettings();
        
        // Main menu button events
        playButton.addEventListener('click', () => {
            playButtonSound();
            showScreen(difficultyMenu);
            hideScreen(mainMenu);
        });
        
        settingsButton.addEventListener('click', () => {
            playButtonSound();
            showScreen(settingsMenu);
            hideScreen(mainMenu);
        });
        
        leaderboardButton.addEventListener('click', () => {
            playButtonSound();
            updateLeaderboardDisplay();
            showScreen(leaderboardMenu);
            hideScreen(mainMenu);
        });
        
        // Difficulty menu
        easyButton.addEventListener('click', () => {
            playButtonSound();
            selectedDifficulty = 'easy';
            difficultyIndicator.textContent = 'Độ khó: Dễ';
            showScreen(startScreen);
            hideScreen(difficultyMenu);
        });
        
        mediumButton.addEventListener('click', () => {
            playButtonSound();
            selectedDifficulty = 'medium';
            difficultyIndicator.textContent = 'Độ khó: Trung Bình';
            showScreen(startScreen);
            hideScreen(difficultyMenu);
        });
        
        hardButton.addEventListener('click', () => {
            playButtonSound();
            selectedDifficulty = 'hard';
            difficultyIndicator.textContent = 'Độ khó: Khó';
            showScreen(startScreen);
            hideScreen(difficultyMenu);
        });
        
        backFromDifficulty.addEventListener('click', () => {
            playButtonSound();
            showScreen(mainMenu);
            hideScreen(difficultyMenu);
        });
        
        // Settings menu
        volumeSlider.addEventListener('input', () => {
            volumeLevel = volumeSlider.value;
            volumeValue.textContent = volumeLevel + '%';
            updateVolume();
            localStorage.setItem('volume', volumeLevel);
        });
        
        bgmSlider.addEventListener('input', () => {
            bgmLevel = bgmSlider.value;
            bgmValue.textContent = bgmLevel + '%';
            updateBGMVolume();
            localStorage.setItem('bgm', bgmLevel);
        });
        
        usernameInput.addEventListener('change', () => {
            currentUsername = usernameInput.value.trim() || 'Player';
            localStorage.setItem('username', currentUsername);
        });
        
        backFromSettings.addEventListener('click', () => {
            playButtonSound();
            showScreen(mainMenu);
            hideScreen(settingsMenu);
        });
        
        // Leaderboard menu
        backFromLeaderboard.addEventListener('click', () => {
            playButtonSound();
            showScreen(mainMenu);
            hideScreen(leaderboardMenu);
        });
        
        // Game screens
        startButton.addEventListener('click', () => {
            playButtonSound();
            hideScreen(startScreen);
            showScreen(gameArea);
            startCountdown();
        });
        
        backFromInstructions.addEventListener('click', () => {
            playButtonSound();
            showScreen(difficultyMenu);
            hideScreen(startScreen);
        });
        
        restartButton.addEventListener('click', () => {
            playButtonSound();
            hideScreen(gameOverScreen);
            startCountdown();
        });
        
        backToMenuButton.addEventListener('click', () => {
            playButtonSound();
            hideScreen(gameOverScreen);
            showScreen(mainMenu);
        });
        
        // Pause functionality
        pauseButton.addEventListener('click', () => {
            playButtonSound();
            pauseGame();
        });
        
        resumeButton.addEventListener('click', () => {
            playButtonSound();
            resumeGame();
        });
        
        quitButton.addEventListener('click', () => {
            playButtonSound();
            endGame(true);
            hideScreen(pauseScreen);
            showScreen(mainMenu);
        });
        
        // Save score
        saveScoreButton.addEventListener('click', () => {
            playButtonSound();
            const playerName = playerNameInput.value.trim() || currentUsername;
            saveScore(playerName, score);
            saveScoreButton.disabled = true;
            saveScoreButton.textContent = "Đã Lưu!";
        });
        
        // Di chuyển giỏ theo chuột/chạm
        function moveBasket(e) {
            if (!isGameRunning || isPaused) return;
            
            let posX;
            
            // Kiểm tra loại sự kiện
            if (e.type === 'touchmove') {
                // Ngăn cuộn trang
                e.preventDefault();
                // Lấy vị trí chạm tương đối với container
                const touch = e.touches[0];
                const rect = gameContainer.getBoundingClientRect();
                posX = touch.clientX - rect.left;
            } else {
                // Lấy vị trí chuột tương đối với container
                const rect = gameContainer.getBoundingClientRect();
                posX = e.clientX - rect.left;
            }
            
            // Giữ giỏ và nhân vật hứng trong giới hạn container
            if (posX < 40) posX = 40;
            if (posX > gameContainer.clientWidth - 40) posX = gameContainer.clientWidth - 40;
            
            // Di chuyển cả giỏ và nhân vật hứng
            basket.style.left = posX + 'px';
            catcherContainer.style.left = posX + 'px';
        }
        
        // Thêm sự kiện lắng nghe cho chuột/chạm
        gameContainer.addEventListener('mousemove', moveBasket);
        gameContainer.addEventListener('touchmove', moveBasket, { passive: false });
        
        // Khởi tạo cài đặt
        function initializeSettings() {
            // Set volume sliders
            volumeSlider.value = volumeLevel;
            volumeValue.textContent = volumeLevel + '%';
            bgmSlider.value = bgmLevel;
            bgmValue.textContent = bgmLevel + '%';
            
            // Set username
            usernameInput.value = currentUsername;
            playerNameInput.value = currentUsername;
            
            // Update audio volumes
            updateVolume();
            updateBGMVolume();
        }
        
        // Cập nhật âm lượng
        function updateVolume() {
            const volume = volumeLevel / 100;
            catchSound.volume = volume;
            missSound.volume = volume;
            gameOverSound.volume = volume;
            specialSound.volume = volume;
            lifeSound.volume = volume;
            timeSound.volume = volume;
            buttonSound.volume = volume;
            countdownSound.volume = volume;
        }
        
        // Cập nhật âm lượng nhạc nền
        function updateBGMVolume() {
            backgroundMusic.volume = bgmLevel / 100;
        }
        
        // Phát âm thanh
        function playSound(sound) {
            if (sound.readyState >= 2) {  // Kiểm tra xem âm thanh đã được tải chưa
                sound.currentTime = 0;
                sound.play().catch(error => {
                    console.log("Không thể phát âm thanh:", error);
                });
            }
        }
        
        // Phát âm thanh nút (cải tiến)
        function playButtonSound() {
            // Đảm bảo âm thanh nút đã được tải
            if (buttonSound.readyState < 2) {
                // Nếu chưa tải xong, thử sử dụng âm thanh dự phòng từ API Web Audio
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 800; // Tần số cao nhẹ
                    gainNode.gain.value = 0.1;        // Âm lượng nhỏ
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.start();
                    // Chỉ phát trong 100ms
                    setTimeout(() => {
                        oscillator.stop();
                    }, 100);
                } catch (e) {
                    console.log("Không thể tạo âm thanh dự phòng:", e);
                }
            } else {
                // Sử dụng file âm thanh nếu đã tải
                const originalVolume = buttonSound.volume;
                buttonSound.volume = originalVolume * 0.8; // Giảm âm lượng xuống một chút
                buttonSound.currentTime = 0;
                
                // Giới hạn thời gian phát
                const playPromise = buttonSound.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setTimeout(() => {
                            if (!buttonSound.paused) {
                                buttonSound.pause();
                                buttonSound.currentTime = 0;
                            }
                        }, 150); // Giới hạn phát tối đa 150ms
                    }).catch(error => {
                        console.log("Không thể phát âm thanh nút:", error);
                    });
                }
                
                // Khôi phục âm lượng sau khi phát
                setTimeout(() => {
                    buttonSound.volume = originalVolume;
                }, 200);
            }
        }
        
        // Hiển thị/ẩn màn hình
        function showScreen(element) {
            element.style.display = 'flex';
        }
        
        function hideScreen(element) {
            element.style.display = 'none';
        }
        
        // Tạo hiệu ứng đếm ngược
        function startCountdown() {
            // Thiết lập lại game theo độ khó đã chọn
            const difficulty = difficulties[selectedDifficulty];
            
            lives = difficulty.livesCount;
            timeRemaining = difficulty.initialTime;
            gameSpeed = difficulty.initialSpeed;
            heartSpeed = difficulty.heartSpeed;
            
            score = 0;
            scoreDisplay.textContent = 'Điểm: ' + score;
            livesDisplay.textContent = 'Mạng: ' + lives;
            timeCounter.textContent = 'Thời gian: ' + timeRemaining;
            
            // Reset save button
            saveScoreButton.disabled = false;
            saveScoreButton.textContent = "Lưu Điểm";
            
            // Đảm bảo nhân vật có trạng thái bình thường
            dropperCharacter.classList.remove('sad');
            catcherCharacter.classList.remove('tired');
            catcherContainer.classList.remove('shaking');
            
            // Tạo hiệu ứng đếm ngược
            const countdownOverlay = document.createElement('div');
            countdownOverlay.className = 'countdown-overlay';
            
            const countdownNumber = document.createElement('div');
            countdownNumber.className = 'countdown-number';
            countdownOverlay.appendChild(countdownNumber);
            
            gameContainer.appendChild(countdownOverlay);
            
            // Đếm ngược 3, 2, 1
            let count = 3;
            countdownNumber.textContent = count;
            playSound(countdownSound);
            
            const countInterval = setInterval(() => {
                count--;
                if (count > 0) {
                    countdownNumber.textContent = count;
                    playSound(countdownSound);
                } else {
                    clearInterval(countInterval);
                    gameContainer.removeChild(countdownOverlay);
                    startGame();
                }
            }, 1000);
        }
        
        // Bắt đầu game
        function startGame() {
            showScreen(gameArea);
            
            // Xóa tất cả trái tim hiện có
            hearts.forEach(heart => {
                if (heart.element.parentNode) {
                    gameContainer.removeChild(heart.element);
                }
            });
            hearts = [];
            
            // Xóa interval hiện có
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            
            // Đặt lại màu nền
            gameContainer.style.backgroundColor = '#ffeaf0';
            
            // Di chuyển nhân vật thả tim đến vị trí ngẫu nhiên ban đầu
            moveDropperToRandomPosition();
            
            // Đảm bảo nhân vật hứng ở vị trí đúng
            const initialX = gameContainer.clientWidth / 2;
            catcherContainer.style.left = initialX + 'px';
            
            // Phát nhạc nền
            backgroundMusic.play().catch(error => {
                console.log("Không thể phát nhạc nền:", error);
            });
            
            // Bắt đầu vòng lặp trò chơi
            isGameRunning = true;
            isPaused = false;
            gameInterval = setInterval(createRandomItem, gameSpeed);
            startTimeCounter();
            startRandomBlinking();
            requestAnimationFrame(gameLoop);
        }
        
        // Tạm dừng game
        function pauseGame() {
            if (!isGameRunning || isPaused) return;
            
            isPaused = true;
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            backgroundMusic.pause();
            showScreen(pauseScreen);
        }
        
        // Tiếp tục game
        function resumeGame() {
            if (!isGameRunning || !isPaused) return;
            
            isPaused = false;
            gameInterval = setInterval(createRandomItem, gameSpeed);
            startTimeCounter();
            backgroundMusic.play().catch(error => {
                console.log("Không thể phát nhạc nền:", error);
            });
            hideScreen(pauseScreen);
            requestAnimationFrame(gameLoop);
        }
        
        // Đếm thời gian
        function startTimeCounter() {
            timeInterval = setInterval(() => {
                timeRemaining--;
                timeCounter.textContent = 'Thời gian: ' + timeRemaining;
                
                // Cảnh báo khi thời gian sắp hết
                if (timeRemaining <= 10) {
                    timeCounter.classList.add('time-warning');
                } else {
                    timeCounter.classList.remove('time-warning');
                }
                
                if (timeRemaining <= 0) {
                    endGame(false);
                }
            }, 1000);
        }
        // Cập nhật điểm cao nhất
    function updateHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('heartGameHighScore', highScore);
            highScoreDisplay.textContent = 'Cao nhất: ' + highScore;
            
            // Hiệu ứng khi đạt điểm cao mới
            highScoreDisplay.style.fontSize = '24px';
            highScoreDisplay.style.color = '#FFD700';
            setTimeout(() => {
                highScoreDisplay.style.fontSize = '18px';
                highScoreDisplay.style.color = '#ff0066';
            }, 1000);
            
            return true;
        }
        return false;
    }
    
    // Tạo hiệu ứng nổ
    function createExplosion(x, y) {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = (x - 40) + 'px';
        explosion.style.top = (y - 40) + 'px';
        
        // Thêm emoji nổ
        explosion.innerHTML = '✨';
        explosion.style.fontSize = '40px';
        
        gameContainer.appendChild(explosion);
        
        // Xóa hiệu ứng sau khi hoàn thành
        setTimeout(() => {
            if (explosion.parentNode) {
                gameContainer.removeChild(explosion);
            }
        }, 500);
    }
    
    // Tạo hiệu ứng ánh sáng khi hứng được vật phẩm
    function createLightEffect(x, y) {
        const light = document.createElement('div');
        light.className = 'light-effect';
        light.style.left = (x - 50) + 'px';
        light.style.top = (y - 50) + 'px';
        
        gameContainer.appendChild(light);
        
        // Xóa hiệu ứng sau khi hoàn thành
        setTimeout(() => {
            if (light.parentNode) {
                gameContainer.removeChild(light);
            }
        }, 500);
    }
    
    // Thay đổi màu nền theo điểm số
    function updateBackgroundColor() {
        // Tạo màu từ điểm số
        const hue = (score * 5) % 360; // Đổi màu mỗi 20 điểm
        gameContainer.style.backgroundColor = `hsl(${hue}, 100%, 95%)`;
    }
    
    // Thêm hiệu ứng mệt mỏi khi mất mạng
    function addTiredEffect() {
        catcherCharacter.classList.add('tired');
        setTimeout(() => {
            catcherCharacter.classList.remove('tired');
        }, 800);
    }
    
    // Thêm hiệu ứng lắc khi bỏ lỡ tim
    function addShakingEffect() {
        catcherContainer.classList.add('shaking');
        setTimeout(() => {
            catcherContainer.classList.remove('shaking');
        }, 500);
    }
    
    // Thêm hiệu ứng nhảy lên khi đạt điểm cao
    function addJumpingEffect() {
        catcherCharacter.classList.add('jumping');
        setTimeout(() => {
            catcherCharacter.classList.remove('jumping');
        }, 500);
    }
    
    // Thêm hiệu ứng khi nhân vật hứng được tim
    function addCatchingAnimation() {
        catcherCharacter.classList.add('catching');
        setTimeout(() => {
            catcherCharacter.classList.remove('catching');
        }, 300);
    }
    
    // Di chuyển nhân vật thả tim đến vị trí ngẫu nhiên
    function moveDropperToRandomPosition() {
        const minX = 50;
        const maxX = gameContainer.clientWidth - 50;
        const randomX = Math.random() * (maxX - minX) + minX;
        
        // Tạo hiệu ứng mượt mà khi di chuyển
        dropperCharacter.style.transition = 'left 0.5s ease-out';
        dropperCharacter.style.left = randomX + 'px';
    }
    
    // Thêm hiệu ứng chớp mắt ngẫu nhiên cho nhân vật thả tim
    function startRandomBlinking() {
        const blinkInterval = setInterval(() => {
            if (!isGameRunning) {
                clearInterval(blinkInterval);
                return;
            }
            
            const shouldBlink = Math.random() > 0.7;
            if (shouldBlink && !dropperCharacter.classList.contains('dropping')) {
                const eyes = dropperCharacter.querySelector('.character-eyes');
                eyes.classList.add('blinking');
                setTimeout(() => {
                    eyes.classList.remove('blinking');
                }, 200);
            }
        }, 2000);
    }
    
    // Tạo vật phẩm rơi ngẫu nhiên
    function createRandomItem() {
        const random = Math.random();
        const difficulty = difficulties[selectedDifficulty];
        
        // Lấy vị trí của nhân vật thả tim
        const dropperRect = dropperCharacter.getBoundingClientRect();
        const gameContainerRect = gameContainer.getBoundingClientRect();
        const dropperX = dropperRect.left + dropperRect.width/2 - gameContainerRect.left;
        
        // Thêm hiệu ứng nhún nhảy khi thả tim
        dropperCharacter.classList.add('dropping');
        setTimeout(() => {
            dropperCharacter.classList.remove('dropping');
        }, 300);
        
        // Quyết định loại vật phẩm sẽ tạo
        if (random < difficulty.extraTimeChance) {
            // Tạo vật phẩm thêm thời gian
            createExtraTime(dropperX);
        } else if (random < difficulty.extraTimeChance + difficulty.extraLifeChance) {
            // Tạo vật phẩm thêm mạng
            createExtraLife(dropperX);
        } else if (random < difficulty.extraTimeChance + difficulty.extraLifeChance + difficulty.specialHeartChance) {
            // Tạo trái tim đặc biệt
            createSpecialHeart(dropperX);
        } else {
            // Tạo trái tim thường
            createNormalHeart(dropperX);
        }
        
        // Di chuyển nhân vật thả tim đến vị trí ngẫu nhiên
        moveDropperToRandomPosition();
    }
    
    // Tạo trái tim thường
    function createNormalHeart(posX = null) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        
        // Vị trí ngẫu nhiên hoặc từ vị trí dropperX
        const heartX = posX !== null ? posX : Math.random() * (gameContainer.clientWidth - 30);
        heart.style.left = heartX + 'px';
        
        // Thêm vào game
        gameContainer.appendChild(heart);
        hearts.push({
            element: heart,
            posX: heartX,
            posY: 80, // Bắt đầu từ dưới nhân vật thả tim
            type: 'normal',
            points: 1
        });
    }
    
    // Tạo trái tim đặc biệt
    function createSpecialHeart(posX = null) {
        const heart = document.createElement('div');
        heart.className = 'special-heart';
        heart.innerHTML = '💖';
        
        const heartX = posX !== null ? posX : Math.random() * (gameContainer.clientWidth - 30);
        heart.style.left = heartX + 'px';
        
        gameContainer.appendChild(heart);
        hearts.push({
            element: heart,
            posX: heartX,
            posY: 80,
            type: 'special',
            points: 5
        });
    }
    
    // Tạo vật phẩm thêm mạng
    function createExtraLife(posX = null) {
        const heart = document.createElement('div');
        heart.className = 'extra-life';
        heart.innerHTML = '💙';
        
        const heartX = posX !== null ? posX : Math.random() * (gameContainer.clientWidth - 30);
        heart.style.left = heartX + 'px';
        
        gameContainer.appendChild(heart);
        hearts.push({
            element: heart,
            posX: heartX,
            posY: 80,
            type: 'life',
            points: 0
        });
    }
    
    // Tạo vật phẩm thêm thời gian
    function createExtraTime(posX = null) {
        const heart = document.createElement('div');
        heart.className = 'extra-time';
        heart.innerHTML = '⏱️';
        
        const heartX = posX !== null ? posX : Math.random() * (gameContainer.clientWidth - 30);
        heart.style.left = heartX + 'px';
        
        gameContainer.appendChild(heart);
        hearts.push({
            element: heart,
            posX: heartX,
            posY: 80,
            type: 'time',
            points: 0
        });
    }
    
    // Di chuyển trái tim xuống
    function moveHearts() {
        // Tăng độ khó theo thời gian (điều chỉnh công thức)
        if (score > 0 && score % 10 === 0 && score % 20 !== 10) {
            const difficulty = difficulties[selectedDifficulty];
            heartSpeed += difficulty.speedIncrement; // Tăng tốc độ rơi từ từ hơn
            
            // Giới hạn tốc độ tối đa
            const maxSpeed = difficulty.heartSpeed * 2.5; // Tốc độ tối đa không vượt quá 2.5 lần ban đầu
            if (heartSpeed > maxSpeed) {
                heartSpeed = maxSpeed;
            }
            
            // Điều chỉnh tốc độ tạo item
            gameSpeed = Math.max(800, gameSpeed - 50); // Giảm ít hơn, giữ tốc độ tối thiểu cao hơn
            clearInterval(gameInterval);
            gameInterval = setInterval(createRandomItem, gameSpeed);
            
            console.log("Tăng tốc độ, điểm hiện tại: " + score);
            console.log("Tốc độ rơi: " + heartSpeed);
            console.log("Đã tạo interval mới với tốc độ: " + gameSpeed);
        }
        
        // Di chuyển từng trái tim
        for (let i = 0; i < hearts.length; i++) {
            const heart = hearts[i];
            heart.posY += heartSpeed;
            heart.element.style.top = heart.posY + 'px';
            
            // Kiểm tra va chạm
            if (heart.posY > gameContainer.clientHeight - 100 && 
                heart.posY < gameContainer.clientHeight - 20) {
                const basketLeft = parseInt(basket.style.left) - 40;
                const basketRight = basketLeft + 80;
                
                if (heart.posX > basketLeft && heart.posX < basketRight) {
                    // Hứng được vật phẩm
                    const heartX = heart.posX;
                    const heartY = heart.posY;
                    gameContainer.removeChild(heart.element);
                    hearts.splice(i, 1);
                    i--;
                    
                    // Thêm hiệu ứng hứng cho nhân vật
                    addCatchingAnimation();
                    
                    // Xử lý theo loại vật phẩm
                    if (heart.type === 'normal') {
                        score += heart.points;
                        scoreDisplay.textContent = 'Điểm: ' + score;
                        playSound(catchSound);
                        createExplosion(heartX, heartY);
                        createLightEffect(heartX, heartY);
                        
                        // Thêm hiệu ứng nhảy khi đạt mốc điểm
                        if (score % 10 === 0) {
                            addJumpingEffect();
                        }
                    } else if (heart.type === 'special') {
                        score += heart.points;
                        scoreDisplay.textContent = 'Điểm: ' + score;
                        playSound(specialSound);
                        createExplosion(heartX, heartY);
                        createExplosion(heartX - 20, heartY - 20);
                        createExplosion(heartX + 20, heartY - 20);
                        createLightEffect(heartX, heartY);
                    } else if (heart.type === 'life') {
                        lives++;
                        livesDisplay.textContent = 'Mạng: ' + lives;
                        playSound(lifeSound);
                        createExplosion(heartX, heartY);
                        createLightEffect(heartX, heartY);
                    } else if (heart.type === 'time') {
                        // Thêm thời gian theo độ khó
                        const difficulty = difficulties[selectedDifficulty];
                        timeRemaining += difficulty.timeBonus;
                        timeCounter.textContent = 'Thời gian: ' + timeRemaining;
                        playSound(timeSound);
                        createExplosion(heartX, heartY);
                        createLightEffect(heartX, heartY);
                    }
                    
                    updateBackgroundColor();
                }
            }
            
            // Kiểm tra nếu vật phẩm bị bỏ lỡ
            if (heart.posY > gameContainer.clientHeight) {
                gameContainer.removeChild(heart.element);
                hearts.splice(i, 1);
                i--;
                
                // Chỉ mất mạng khi bỏ lỡ trái tim thường hoặc đặc biệt
                if (heart.type === 'normal' || heart.type === 'special') {
                    lives--;
                    livesDisplay.textContent = 'Mạng: ' + lives;
                    playSound(missSound);
                    
                    // Thêm hiệu ứng lắc và mệt mỏi
                    addShakingEffect();
                    addTiredEffect();
                    
                    if (lives <= 0) {
                        endGame(false);
                    }
                }
            }
        }
    }
    
    // Vòng lặp trò chơi
    function gameLoop() {
        if (!isGameRunning || isPaused) {
            console.log("Game không chạy hoặc đang tạm dừng");
            return;
        }
        
        console.log("Game loop đang chạy, số tim hiện tại: " + hearts.length);
        moveHearts();
        requestAnimationFrame(gameLoop);
    }
    
    // Kết thúc trò chơi
    function endGame(isQuit) {
        isGameRunning = false;
        isPaused = false;
        clearInterval(gameInterval);
        clearInterval(timeInterval);
        
        // Dừng nhạc nền
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        
        if (!isQuit) {
            // Thêm trạng thái buồn cho nhân vật thả tim
            dropperCharacter.classList.add('sad');
            
            // Phát âm thanh kết thúc game
            playSound(gameOverSound);
            
            // Cập nhật điểm cao nhất
            const isNewHighScore = updateHighScore();
            
            // Hiển thị màn hình kết thúc
            finalScore.textContent = 'Điểm: ' + score;
            if (timeRemaining > 0) {
                timeLeft.textContent = 'Thời gian còn: ' + timeRemaining + 's';
            } else {
                timeLeft.textContent = 'Hết thời gian!';
            }
            
            // Nếu là điểm cao mới, nổi bật thông báo
            if (isNewHighScore) {
                const newRecordMsg = document.createElement('div');
                newRecordMsg.textContent = '🏆 KỶ LỤC MỚI! 🏆';
                newRecordMsg.style.color = '#FFD700';
                newRecordMsg.style.fontSize = '24px';
                newRecordMsg.style.fontWeight = 'bold';
                newRecordMsg.style.marginBottom = '10px';
                
                // Chèn thông báo vào trước final score
                gameOverScreen.insertBefore(newRecordMsg, finalScore);
                
                // Xóa thông báo sau khi người chơi đóng màn hình
                const removeNewRecordMsg = () => {
                    if (newRecordMsg.parentNode) {
                        gameOverScreen.removeChild(newRecordMsg);
                    }
                    restartButton.removeEventListener('click', removeNewRecordMsg);
                    backToMenuButton.removeEventListener('click', removeNewRecordMsg);
                };
                
                restartButton.addEventListener('click', removeNewRecordMsg);
                backToMenuButton.addEventListener('click', removeNewRecordMsg);
            }
            
            showScreen(gameOverScreen);
        }
        
        // Xóa tất cả trái tim hiện có
        hearts.forEach(heart => {
            if (heart.element.parentNode) {
                gameContainer.removeChild(heart.element);
            }
        });
        hearts = [];
    }
    
    // Lưu điểm vào bảng xếp hạng
    function saveScore(playerName, playerScore) {
        // Tạo một bản ghi mới
        const newRecord = {
            name: playerName,
            score: playerScore,
            difficulty: selectedDifficulty,
            date: new Date().toLocaleDateString()
        };
        
        // Thêm vào bảng xếp hạng
        leaderboard.push(newRecord);
        
        // Sắp xếp theo điểm số giảm dần
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Giữ tối đa 10 bản ghi
        if (leaderboard.length > 10) {
            leaderboard = leaderboard.slice(0, 10);
        }
        
        // Lưu vào localStorage
        localStorage.setItem('heartGameLeaderboard', JSON.stringify(leaderboard));
        
        // Cập nhật hiển thị bảng xếp hạng
        updateLeaderboardDisplay();
    }
    
    // Cập nhật hiển thị bảng xếp hạng
    function updateLeaderboardDisplay() {
        // Xóa các phần tử cũ
        leaderboardList.innerHTML = '';
        
        // Kiểm tra nếu không có dữ liệu
        if (leaderboard.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'leaderboard-item';
            emptyMsg.textContent = 'Chưa có điểm nào được lưu!';
            emptyMsg.style.justifyContent = 'center';
            leaderboardList.appendChild(emptyMsg);
            return;
        }
        
        // Tạo tiêu đề
        const header = document.createElement('div');
        header.className = 'leaderboard-item';
        header.style.fontWeight = 'bold';
        header.style.backgroundColor = '#ff0066';
        header.style.color = 'white';
        
        const rankHeader = document.createElement('div');
        rankHeader.className = 'leaderboard-rank';
        rankHeader.textContent = '#';
        
        const nameHeader = document.createElement('div');
        nameHeader.className = 'leaderboard-name';
        nameHeader.textContent = 'Tên';
        
        const scoreHeader = document.createElement('div');
        scoreHeader.className = 'leaderboard-score';
        scoreHeader.textContent = 'Điểm';
        
        const difficultyHeader = document.createElement('div');
        difficultyHeader.textContent = 'Độ khó';
        difficultyHeader.style.marginRight = '10px';
        
        header.appendChild(rankHeader);
        header.appendChild(nameHeader);
        header.appendChild(scoreHeader);
        header.appendChild(difficultyHeader);
        
        leaderboardList.appendChild(header);
        
        // Thêm từng bản ghi
        leaderboard.forEach((record, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            
            const rank = document.createElement('div');
            rank.className = 'leaderboard-rank';
            rank.textContent = (index + 1);
            
            const name = document.createElement('div');
            name.className = 'leaderboard-name';
            name.textContent = record.name;
            
            const score = document.createElement('div');
            score.className = 'leaderboard-score';
            score.textContent = record.score;
            
            const difficulty = document.createElement('div');
            
            // Hiển thị độ khó bằng tiếng Việt
            let difficultyText = 'Dễ';
            if (record.difficulty === 'medium') {
                difficultyText = 'TB';
            } else if (record.difficulty === 'hard') {
                difficultyText = 'Khó';
            }
            
            difficulty.textContent = difficultyText;
            difficulty.style.marginRight = '10px';
            
            // Highlight bản ghi có điểm cao nhất
            if (index === 0) {
                item.style.backgroundColor = '#fff8e1';
                rank.style.color = '#FFD700';
            }
            
            item.appendChild(rank);
            item.appendChild(name);
            item.appendChild(score);
            item.appendChild(difficulty);
            
            leaderboardList.appendChild(item);
        });
    }
    
    // Xử lý sự kiện khi nhấn phím ESC để tạm dừng game
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isGameRunning) {
            if (isPaused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
        
        // Thêm phím 'd' để debug - tạo vật phẩm khi nhấn
        if (e.key === 'd' && isGameRunning) {
            console.log("Debug: Tạo vật phẩm mới");
            createRandomItem();
        }
    });
    
    // Handle touch devices better
    document.addEventListener('touchmove', function(e) {
        if (isGameRunning) {
            e.preventDefault();
        }
    }, { passive: false });
});