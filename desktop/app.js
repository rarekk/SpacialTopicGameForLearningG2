// Warm Analogue Fantasy Minimal - Desktop with Theme, Arena, Shop
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    var themeToggle = document.getElementById('themeToggle');
    var htmlEl = document.documentElement;
    var currentTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var theme = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            htmlEl.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }
    
    // Screen Navigation
    var navBtns = document.querySelectorAll('.nav-btn');
    var screens = document.querySelectorAll('.screen');
    
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].addEventListener('click', function() {
            var targetScreen = this.getAttribute('data-screen');
            for (var j = 0; j < navBtns.length; j++) navBtns[j].classList.remove('active');
            this.classList.add('active');
            for (var k = 0; k < screens.length; k++) {
                screens[k].classList.remove('active');
                if (screens[k].id === 'screen-' + targetScreen) {
                    screens[k].classList.add('active');
                }
            }
        });
    }
    
    // Catalog to Arena
    var moduleBtns = document.querySelectorAll('.module-btn[data-go="arena"]');
    for (var mb = 0; mb < moduleBtns.length; mb++) {
        moduleBtns[mb].addEventListener('click', function() {
            for (var j = 0; j < navBtns.length; j++) {
                if (navBtns[j].getAttribute('data-screen') === 'arena') navBtns[j].classList.add('active');
                else navBtns[j].classList.remove('active');
            }
            for (var k = 0; k < screens.length; k++) {
                screens[k].classList.remove('active');
                if (screens[k].id === 'screen-arena') screens[k].classList.add('active');
            }
        });
    }
    
    // Start to Arena
    var beginBtn = document.getElementById('beginQuestBtn');
    if (beginBtn) {
        beginBtn.addEventListener('click', function() {
            for (var j = 0; j < navBtns.length; j++) {
                if (navBtns[j].getAttribute('data-screen') === 'arena') navBtns[j].classList.add('active');
                else navBtns[j].classList.remove('active');
            }
            for (var k = 0; k < screens.length; k++) {
                screens[k].classList.remove('active');
                if (screens[k].id === 'screen-arena') screens[k].classList.add('active');
            }
        });
    }
    
    // Energy/Combo
    var currentEnergy = 25;
    var maxEnergy = 25;
    var energyPill = document.getElementById('energyPill');
    var arenaEnergy = document.getElementById('arenaEnergy');
    var arenaEnergyBar = document.getElementById('arenaEnergyBar');
    var profileEnergy = document.getElementById('profileEnergy');
    var shopEnergy = document.getElementById('shopEnergy');
    
    function updateAllEnergy() {
        var pct = (currentEnergy / maxEnergy) * 100;
        if (energyPill) energyPill.textContent = currentEnergy;
        if (arenaEnergy) arenaEnergy.textContent = currentEnergy;
        if (arenaEnergyBar) arenaEnergyBar.style.width = pct + '%';
        if (profileEnergy) profileEnergy.textContent = currentEnergy;
        if (shopEnergy) shopEnergy.textContent = currentEnergy;
    }
    
    var correctStreak = 0;
    var arenaCombo = document.getElementById('arenaCombo');
    function updateCombo() {
        if (arenaCombo) {
            if (correctStreak === 0) arenaCombo.textContent = '0 IN A ROW';
            else arenaCombo.textContent = correctStreak + ' IN A ROW';
        }
    }
    
    // Arena - Multiple Choice
    var mcBtns = document.querySelectorAll('.option-btn[data-type="mc"]');
    var arenaFeedback = document.getElementById('arenaFeedback');
    var questionMode = document.getElementById('questionMode');
    
    for (var o = 0; o < mcBtns.length; o++) {
        mcBtns[o].addEventListener('click', function() {
            var isCorrect = this.getAttribute('data-correct') === 'true';
            for (var ob = 0; ob < mcBtns.length; ob++) {
                mcBtns[ob].style.pointerEvents = 'none';
                mcBtns[ob].style.opacity = '0.6';
            }
            if (isCorrect) {
                this.style.opacity = '1';
                this.style.borderColor = '#D99B26';
                this.style.background = 'rgba(217, 155, 38, 0.08)';
                if (arenaFeedback) { arenaFeedback.textContent = '✓ CORRECT - WISDOM GAINED'; arenaFeedback.style.color = '#D99B26'; }
                correctStreak++;
                if (correctStreak >= 3 && currentEnergy < maxEnergy) {
                    currentEnergy = Math.min(maxEnergy, currentEnergy + 2);
                    updateAllEnergy();
                    if (arenaFeedback) arenaFeedback.textContent = '✓ CORRECT - +2 MANA RESTORED';
                }
            } else {
                this.style.opacity = '1';
                this.style.borderColor = '#C84B31';
                this.style.background = 'rgba(200, 75, 49, 0.08)';
                if (arenaFeedback) { arenaFeedback.textContent = '✗ INCORRECT - ENERGY DRAINED'; arenaFeedback.style.color = '#C84B31'; }
                correctStreak = 0;
                currentEnergy = Math.max(0, currentEnergy - 5);
                updateAllEnergy();
            }
            updateCombo();
            setTimeout(nextQuestion, 1400);
        });
    }
    
    // Fill in blank
    var fillSubmit = document.getElementById('fillSubmit');
    if (fillSubmit) {
        fillSubmit.addEventListener('click', function() {
            var input = document.getElementById('fillInput');
            var ans = input.value.trim().toLowerCase();
            if (ans === 'def') {
                if (arenaFeedback) { arenaFeedback.textContent = '✓ CORRECT - WISDOM GAINED'; arenaFeedback.style.color = '#D99B26'; }
                correctStreak++;
                if (correctStreak >= 3 && currentEnergy < maxEnergy) { currentEnergy = Math.min(maxEnergy, currentEnergy + 2); updateAllEnergy(); }
            } else {
                if (arenaFeedback) { arenaFeedback.textContent = '✗ INCORRECT - ENERGY DRAINED'; arenaFeedback.style.color = '#C84B31'; }
                correctStreak = 0;
                currentEnergy = Math.max(0, currentEnergy - 5);
                updateAllEnergy();
            }
            updateCombo();
            input.disabled = true;
            fillSubmit.disabled = true;
            setTimeout(nextQuestion, 1400);
        });
    }
    
    // Matching
    var matchItems = document.querySelectorAll('.match-item');
    var matchDefs = document.querySelectorAll('.match-def');
    var matchCheck = document.getElementById('matchCheck');
    var selectedItem = null;
    var matches = {};
    
    for (var mi = 0; mi < matchItems.length; mi++) {
        matchItems[mi].addEventListener('click', function() {
            for (var x = 0; x < matchItems.length; x++) matchItems[x].classList.remove('selected');
            this.classList.add('selected');
            selectedItem = this.getAttribute('data-id');
        });
    }
    for (var md = 0; md < matchDefs.length; md++) {
        matchDefs[md].addEventListener('click', function() {
            if (!selectedItem) return;
            var mid = this.getAttribute('data-match');
            if (selectedItem === mid) {
                this.classList.add('matched');
                for (var x2 = 0; x2 < matchItems.length; x2++) {
                    if (matchItems[x2].getAttribute('data-id') === selectedItem) matchItems[x2].classList.add('matched');
                }
                matches[selectedItem] = true;
            }
            selectedItem = null;
            for (var x3 = 0; x3 < matchItems.length; x3++) matchItems[x3].classList.remove('selected');
        });
    }
    if (matchCheck) {
        matchCheck.addEventListener('click', function() {
            if (Object.keys(matches).length === 4) {
                if (arenaFeedback) { arenaFeedback.textContent = '✓ ALL MATCHED - WISDOM GAINED'; arenaFeedback.style.color = '#D99B26'; }
                correctStreak += 2;
                if (correctStreak >= 3 && currentEnergy < maxEnergy) { currentEnergy = Math.min(maxEnergy, currentEnergy + 2); updateAllEnergy(); }
            } else {
                if (arenaFeedback) { arenaFeedback.textContent = '✗ INCOMPLETE MATCHES'; arenaFeedback.style.color = '#C84B31'; }
                correctStreak = 0;
                currentEnergy = Math.max(0, currentEnergy - 3);
                updateAllEnergy();
            }
            updateCombo();
            setTimeout(nextQuestion, 1400);
        });
    }
    
    var qModeIndex = 0;
    var modes = ['mc', 'fill', 'match'];
    function nextQuestion() {
        // reset
        for (var ob2 = 0; ob2 < mcBtns.length; ob2++) {
            mcBtns[ob2].style.pointerEvents = 'all';
            mcBtns[ob2].style.opacity = '1';
            mcBtns[ob2].style.borderColor = '#1A1918';
            mcBtns[ob2].style.background = 'transparent';
        }
        var fillInput = document.getElementById('fillInput');
        if (fillInput) { fillInput.value = ''; fillInput.disabled = false; }
        if (document.getElementById('fillSubmit')) document.getElementById('fillSubmit').disabled = false;
        for (var mi2 = 0; mi2 < matchItems.length; mi2++) { matchItems[mi2].classList.remove('selected','matched'); }
        for (var md2 = 0; md2 < matchDefs.length; md2++) { matchDefs[md2].classList.remove('selected','matched'); }
        matches = {};
        if (arenaFeedback) arenaFeedback.textContent = '';
        
        qModeIndex = (qModeIndex + 1) % modes.length;
        document.querySelectorAll('.question-mode').forEach(function(m){ m.classList.remove('active'); });
        document.getElementById('mode-' + modes[qModeIndex]).classList.add('active');
        if (questionMode) {
            if (modes[qModeIndex] === 'mc') questionMode.textContent = 'MULTIPLE CHOICE';
            else if (modes[qModeIndex] === 'fill') questionMode.textContent = 'FILL-IN-THE-BLANK';
            else questionMode.textContent = 'MATCHING GAME';
        }
    }
    
    // Shop
    var shopBtns = document.querySelectorAll('.shop-buy-btn');
    var inventoryGrid = document.getElementById('inventoryGrid');
    var shopStars = document.getElementById('shopStars');
    var shopXp = document.getElementById('shopXp');
    var profileStars = document.getElementById('profileStars');
    var profileXp = document.getElementById('profileXp');
    var profileBadgesCount = document.getElementById('profileBadges');
    var specialBadgesGrid = document.getElementById('specialBadgesGrid');
    var stars = 42;
    var xp = 2847;
    var ownedItems = [];
    
    function updateShop() {
        if (shopStars) shopStars.textContent = stars;
        if (shopXp) shopXp.textContent = xp;
        if (profileStars) profileStars.textContent = stars;
        if (profileXp) profileXp.textContent = xp;
        if (profileBadgesCount) profileBadgesCount.textContent = ownedItems.length + 2;
    }
    
    for (var sb = 0; sb < shopBtns.length; sb++) {
        shopBtns[sb].addEventListener('click', function() {
            var cost = parseInt(this.getAttribute('data-cost'));
            var item = this.getAttribute('data-item');
            if (item === 'energy-refill') {
                if (xp >= cost) {
                    xp -= cost;
                    currentEnergy = maxEnergy;
                    updateAllEnergy();
                    updateShop();
                    alert('Energy refilled to 25/25');
                } else {
                    alert('Not enough XP');
                }
            } else {
                if (stars >= cost) {
                    stars -= cost;
                    ownedItems.push(item);
                    updateShop();
                    if (inventoryGrid) {
                        var inv = document.createElement('div');
                        inv.className = 'inventory-item owned';
                        if (item === 'logic-badge') inv.textContent = '🛡 LOGIC BADGE';
                        else if (item === 'network-shield') inv.textContent = '🛡 NETWORK SHIELD';
                        else if (item === 'circuit-rune') inv.textContent = '🖳 CIRCUIT RUNE';
                        inventoryGrid.appendChild(inv);
                    }
                    if (specialBadgesGrid && item === 'logic-badge') {
                        var b = document.createElement('div');
                        b.className = 'badge-item earned';
                        b.innerHTML = '<span class="badge-glyph">🛡</span><span class="badge-name">LOGIC MASTER</span>';
                        specialBadgesGrid.appendChild(b);
                    }
                    this.disabled = true;
                    this.textContent = 'OWNED';
                } else {
                    alert('Not enough Stars');
                }
            }
        });
    }
    
    // Calendar
    var calendarGrid = document.getElementById('calendarGrid');
    if (calendarGrid) {
        for (var c = 1; c <= 35; c++) {
            var dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            if (c <= 28) {
                dayEl.classList.add('active');
                dayEl.innerHTML = '<span class="day-num">' + c + '</span><span class="day-flame">🔥</span>';
            } else {
                dayEl.classList.add('extinct');
                dayEl.innerHTML = '<span class="day-num">' + c + '</span><span class="day-flame">🔥</span>';
            }
            calendarGrid.appendChild(dayEl);
        }
    }
    
    updateAllEnergy();
    updateCombo();
    updateShop();
});
