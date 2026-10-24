// Warm Analogue Fantasy Minimal - Mobile with Theme, Arena, Shop
document.addEventListener('DOMContentLoaded', function() {
    // Theme
    var themeToggle = document.getElementById('mThemeToggle');
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
    
    // Nav
    var navBtns = document.querySelectorAll('.m-nav-btn');
    var screens = document.querySelectorAll('.m-screen');
    for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].addEventListener('click', function() {
            var targetScreen = this.getAttribute('data-screen');
            for (var j = 0; j < navBtns.length; j++) navBtns[j].classList.remove('active');
            this.classList.add('active');
            for (var k = 0; k < screens.length; k++) {
                screens[k].classList.remove('active');
                if (screens[k].id === 'screen-' + targetScreen) screens[k].classList.add('active');
            }
        });
    }
    
    // Catalog to Arena
    var moduleBtns = document.querySelectorAll('.m-module-btn[data-go="arena"]');
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
    var beginBtn = document.getElementById('mBeginQuestBtn');
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
    var mEnergy = document.getElementById('mEnergy');
    var mArenaEnergy = document.getElementById('mArenaEnergy');
    var mProfileEnergy = document.getElementById('mProfileEnergy');
    
    function updateEnergy() {
        if (mEnergy) mEnergy.textContent = currentEnergy;
        if (mArenaEnergy) mArenaEnergy.textContent = currentEnergy;
        if (mProfileEnergy) mProfileEnergy.textContent = currentEnergy;
    }
    
    var correctStreak = 0;
    var mArenaCombo = document.getElementById('mArenaCombo');
    function updateCombo() {
        if (mArenaCombo) mArenaCombo.textContent = correctStreak;
    }
    
    // MC
    var mcBtns = document.querySelectorAll('.m-option-btn[data-type="mc"]');
    var mArenaFeedback = document.getElementById('mArenaFeedback');
    var mQuestionMode = document.getElementById('mQuestionMode');
    
    for (var o = 0; o < mcBtns.length; o++) {
        mcBtns[o].addEventListener('click', function() {
            var isCorrect = this.getAttribute('data-correct') === 'true';
            for (var ob = 0; ob < mcBtns.length; ob++) { mcBtns[ob].style.pointerEvents = 'none'; mcBtns[ob].style.opacity = '0.5'; }
            if (isCorrect) {
                this.style.opacity = '1'; this.style.borderColor = '#D99B26'; this.style.background = 'rgba(217, 155, 38, 0.08)';
                if (mArenaFeedback) { mArenaFeedback.textContent = '✓ CORRECT'; mArenaFeedback.style.color = '#D99B26'; }
                correctStreak++;
                if (correctStreak >= 3 && currentEnergy < maxEnergy) { currentEnergy = Math.min(maxEnergy, currentEnergy + 2); updateEnergy(); if (mArenaFeedback) mArenaFeedback.textContent = '✓ CORRECT +2 MANA'; }
            } else {
                this.style.opacity = '1'; this.style.borderColor = '#C84B31'; this.style.background = 'rgba(200, 75, 49, 0.08)';
                if (mArenaFeedback) { mArenaFeedback.textContent = '✗ INCORRECT'; mArenaFeedback.style.color = '#C84B31'; }
                correctStreak = 0;
                currentEnergy = Math.max(0, currentEnergy - 5);
                updateEnergy();
            }
            updateCombo();
            setTimeout(nextQ, 1200);
        });
    }
    
    // Fill
    var mFillSubmit = document.getElementById('mFillSubmit');
    if (mFillSubmit) {
        mFillSubmit.addEventListener('click', function() {
            var inp = document.getElementById('mFillInput');
            if (inp.value.trim().toLowerCase() === 'def') {
                if (mArenaFeedback) { mArenaFeedback.textContent = '✓ CORRECT'; mArenaFeedback.style.color = '#D99B26'; }
                correctStreak++;
                if (correctStreak >= 3 && currentEnergy < maxEnergy) { currentEnergy = Math.min(maxEnergy, currentEnergy + 2); updateEnergy(); }
            } else {
                if (mArenaFeedback) { mArenaFeedback.textContent = '✗ INCORRECT'; mArenaFeedback.style.color = '#C84B31'; }
                correctStreak = 0;
                currentEnergy = Math.max(0, currentEnergy - 5);
                updateEnergy();
            }
            updateCombo();
            inp.disabled = true; mFillSubmit.disabled = true;
            setTimeout(nextQ, 1200);
        });
    }
    
    // Match
    var mMatchItems = document.querySelectorAll('.m-match-item');
    var mMatchDefs = document.querySelectorAll('.m-match-def');
    var mMatchCheck = document.getElementById('mMatchCheck');
    var selItem = null;
    var mMatches = {};
    for (var mi = 0; mi < mMatchItems.length; mi++) {
        mMatchItems[mi].addEventListener('click', function() {
            for (var x = 0; x < mMatchItems.length; x++) mMatchItems[x].classList.remove('selected');
            this.classList.add('selected');
            selItem = this.getAttribute('data-id');
        });
    }
    for (var md = 0; md < mMatchDefs.length; md++) {
        mMatchDefs[md].addEventListener('click', function() {
            if (!selItem) return;
            if (selItem === this.getAttribute('data-match')) {
                this.classList.add('matched');
                for (var x2 = 0; x2 < mMatchItems.length; x2++) if (mMatchItems[x2].getAttribute('data-id') === selItem) mMatchItems[x2].classList.add('matched');
                mMatches[selItem] = true;
            }
            selItem = null;
            for (var x3 = 0; x3 < mMatchItems.length; x3++) mMatchItems[x3].classList.remove('selected');
        });
    }
    if (mMatchCheck) {
        mMatchCheck.addEventListener('click', function() {
            if (Object.keys(mMatches).length === 4) {
                if (mArenaFeedback) { mArenaFeedback.textContent = '✓ ALL MATCHED'; mArenaFeedback.style.color = '#D99B26'; }
                correctStreak += 2;
                if (correctStreak >= 3 && currentEnergy < maxEnergy) { currentEnergy = Math.min(maxEnergy, currentEnergy + 2); updateEnergy(); }
            } else {
                if (mArenaFeedback) { mArenaFeedback.textContent = '✗ INCOMPLETE'; mArenaFeedback.style.color = '#C84B31'; }
                correctStreak = 0;
                currentEnergy = Math.max(0, currentEnergy - 3);
                updateEnergy();
            }
            updateCombo();
            setTimeout(nextQ, 1200);
        });
    }
    
    var qIdx = 0;
    var modes = ['mc','fill','match'];
    function nextQ() {
        for (var ob2 = 0; ob2 < mcBtns.length; ob2++) {
            mcBtns[ob2].style.pointerEvents = 'all';
            mcBtns[ob2].style.opacity = '1';
            mcBtns[ob2].style.borderColor = '#1A1918';
            mcBtns[ob2].style.background = 'transparent';
        }
        var finp = document.getElementById('mFillInput');
        if (finp) { finp.value = ''; finp.disabled = false; }
        if (document.getElementById('mFillSubmit')) document.getElementById('mFillSubmit').disabled = false;
        for (var mi2 = 0; mi2 < mMatchItems.length; mi2++) { mMatchItems[mi2].classList.remove('selected','matched'); }
        for (var md2 = 0; md2 < mMatchDefs.length; md2++) { mMatchDefs[md2].classList.remove('selected','matched'); }
        mMatches = {};
        if (mArenaFeedback) mArenaFeedback.textContent = '';
        
        qIdx = (qIdx + 1) % modes.length;
        document.querySelectorAll('.m-question-mode').forEach(function(m){ m.classList.remove('active'); });
        document.getElementById('m-mode-' + modes[qIdx]).classList.add('active');
        if (mQuestionMode) {
            if (modes[qIdx] === 'mc') mQuestionMode.textContent = 'MULTIPLE CHOICE';
            else if (modes[qIdx] === 'fill') mQuestionMode.textContent = 'FILL-IN-THE-BLANK';
            else mQuestionMode.textContent = 'MATCHING';
        }
    }
    
    // Shop
    var shopBtns = document.querySelectorAll('.m-shop-buy-btn');
    var mInventoryGrid = document.getElementById('mInventoryGrid');
    var mShopStars = document.getElementById('mShopStars');
    var mShopXp = document.getElementById('mShopXp');
    var mProfileStars = document.getElementById('mProfileStars');
    var mProfileXp = document.getElementById('mProfileXp');
    var mProfileBadges = document.getElementById('mProfileBadges');
    var mSpecialBadges = document.getElementById('mSpecialBadges');
    var stars = 42;
    var xp = 2847;
    var owned = [];
    function updateShop() {
        if (mShopStars) mShopStars.textContent = stars;
        if (mShopXp) mShopXp.textContent = xp;
        if (mProfileStars) mProfileStars.textContent = stars;
        if (mProfileXp) mProfileXp.textContent = xp;
        if (mProfileBadges) mProfileBadges.textContent = owned.length + 2;
    }
    for (var sb = 0; sb < shopBtns.length; sb++) {
        shopBtns[sb].addEventListener('click', function() {
            var cost = parseInt(this.getAttribute('data-cost'));
            var item = this.getAttribute('data-item');
            if (item === 'energy-refill') {
                if (xp >= cost) {
                    xp -= cost;
                    currentEnergy = maxEnergy;
                    updateEnergy();
                    updateShop();
                    alert('Refilled');
                } else alert('No XP');
            } else {
                if (stars >= cost) {
                    stars -= cost;
                    owned.push(item);
                    updateShop();
                    if (mInventoryGrid) {
                        var inv = document.createElement('div');
                        inv.className = 'm-inventory-item owned';
                        if (item === 'logic-badge') inv.textContent = '🛡 LOGIC';
                        else if (item === 'network-shield') inv.textContent = '🛡 NET';
                        mInventoryGrid.appendChild(inv);
                    }
                    if (mSpecialBadges && item === 'logic-badge') {
                        var b = document.createElement('div');
                        b.className = 'm-badge-item earned';
                        b.innerHTML = '<span>🛡</span> LOGIC MASTER';
                        mSpecialBadges.appendChild(b);
                    }
                    this.disabled = true;
                    this.textContent = 'OWNED';
                } else alert('No Stars');
            }
        });
    }
    
    // Calendar
    var cal = document.getElementById('mCalendarGrid');
    if (cal) {
        for (var c = 1; c <= 28; c++) {
            var d = document.createElement('div');
            d.className = 'calendar-day';
            if (c <= 21) { d.classList.add('active'); d.innerHTML = '<span>' + c + '</span><span>🔥</span>'; }
            else { d.classList.add('extinct'); d.innerHTML = '<span>' + c + '</span><span>🔥</span>'; }
            cal.appendChild(d);
        }
    }
    
    updateEnergy();
    updateCombo();
    updateShop();
});
