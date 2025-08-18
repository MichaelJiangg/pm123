// DOM 元素
const tabButtons = document.querySelectorAll('.tab-btn');
const categorySecti ons = document.querySelectorAll('.category-section');
const siteCards = document.querySelectorAll('.site-card');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 为标签按钮添加事件监听
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            switchCategory(category, button);
        });
    });

    // 添加卡片悬停效果增强
    siteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 添加点击反馈效果
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
});

// 分类切换功能
function switchCategory(category, activeButton) {
    // 移除所有按钮的激活状态
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // 激活当前按钮
    activeButton.classList.add('active');

    // 显示/隐藏对应的分类内容
    categorySecti ons.forEach(section => {
        const sectionCategory = section.dataset.category;
        
        if (category === 'all' || sectionCategory === category) {
            section.classList.remove('hidden');
            // 添加淡入动画
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        } else {
            section.classList.add('hidden');
        }
    });


}





// 添加网站访问统计（本地存储）
function trackSiteVisit(siteName, siteUrl) {
    let visits = JSON.parse(localStorage.getItem('siteVisits') || '{}');
    visits[siteName] = (visits[siteName] || 0) + 1;
    localStorage.setItem('siteVisits', JSON.stringify(visits));
}

// 为所有网站卡片添加统计
document.addEventListener('DOMContentLoaded', function() {
    const siteCards = document.querySelectorAll('.site-card');
    
    siteCards.forEach(card => {
        card.addEventListener('click', function() {
            const siteName = this.querySelector('.site-name').textContent;
            const siteUrl = this.href;
            
            trackSiteVisit(siteName, siteUrl);
        });
    });
});

// 添加平滑滚动效果
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 主题切换功能（可选）
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// 加载保存的主题
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// 添加页面加载动画
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.site-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// 响应式菜单处理（移动端）
function handleMobileMenu() {
    const tabs = document.querySelector('.category-tabs');
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isSmallScreen) {
        tabs.style.flexDirection = 'column';
        tabs.style.gap = '10px';
    } else {
        tabs.style.flexDirection = 'row';
        tabs.style.gap = '15px';
    }
}

// 监听窗口大小变化
window.addEventListener('resize', handleMobileMenu);
document.addEventListener('DOMContentLoaded', handleMobileMenu);