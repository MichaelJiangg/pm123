// DOM 元素
const tabButtons = document.querySelectorAll('.tab-btn');
const categorySecti ons = document.querySelectorAll('.category-section');
const siteCards = document.querySelectorAll('.site-card');

// 编辑状态
let currentEditTarget = null;
let currentEditCategory = null;

// 数据版本
const DATA_VERSION = '1.2.1';

// 默认数据结构
let navigationData = {
    version: DATA_VERSION,
    categories: {
        personal: {
            name: '个人主页',
            icon: 'fas fa-user',
            items: [
                {
                    id: 'knowledge',
                    name: '知识主页',
                    desc: '个人知识库与学习记录',
                    url: 'https://qg27o4ipzn.feishu.cn/wiki/JdH0wbiGmi4DS9kpm2lcRj0hn8g',
                    icon: 'fas fa-book-open',
                    color: '#00C896'
                },
                {
                    id: 'weekly',
                    name: '每周工作',
                    desc: '工作计划与进度跟踪',
                    url: 'https://qg27o4ipzn.feishu.cn/wiki/PlL1wYwUdij7XKkSlRpcvX4inDe',
                    icon: 'fas fa-calendar-week',
                    color: '#3370FF'
                }
            ]
        },
        docs: {
            name: '需求文档',
            icon: 'fas fa-file-alt',
            items: [
                {
                    id: 'seaf-docs',
                    name: 'Seaf',
                    desc: '项目文档与知识库',
                    url: 'https://geelib.qihoo.net/geelib/knowledge/doc?spaceId=3333&docId=260707',
                    icon: 'fas fa-layer-group',
                    color: '#00C896'
                },
                {
                    id: 'qpaas-docs',
                    name: 'QPaaS',
                    desc: '平台即服务文档',
                    url: 'https://geelib.qihoo.net/geelib/knowledge/doc?spaceId=1626&docId=253043',
                    icon: 'fas fa-cubes',
                    color: '#3370FF'
                }
            ]
        },
        products: {
            name: '产品主页',
            icon: 'fas fa-cube',
            items: [
                {
                    id: 'seaf-user',
                    name: 'Seaf用户侧',
                    desc: '用户管理与服务平台',
                    url: 'http://10.236.19.13/login',
                    icon: 'fas fa-shield-alt',
                    color: '#7C3AED'
                },
                {
                    id: 'ai-platform',
                    name: 'AI应用智能搭建平台',
                    desc: '智能化AI应用开发平台',
                    url: 'http://11.121.243.127/',
                    icon: 'fas fa-robot',
                    color: '#FF6B35',
                    isNew: true
                },
                {
                    id: 'seaf-build',
                    name: '构建端',
                    desc: 'Seaf构建管理平台',
                    url: 'http://11.123.252.212:30080/',
                    icon: 'fas fa-tools',
                    color: '#10B981'
                },
                {
                    id: 'seaf-user-new',
                    name: '用户端',
                    desc: 'Seaf用户操作平台',
                    url: 'http://11.123.252.212:30080/seafUser',
                    icon: 'fas fa-users',
                    color: '#3B82F6'
                },
                {
                    id: 'seaf-management',
                    name: '管理端',
                    desc: 'Seaf系统管理平台',
                    url: 'http://11.123.252.212:30080/seafManagement',
                    icon: 'fas fa-cogs',
                    color: '#8B5CF6'
                }
            ]
        },
        design: {
            name: '设计稿',
            icon: 'fas fa-palette',
            items: [
                {
                    id: 'seaf-user-design',
                    name: 'Seaf 用户侧',
                    desc: 'AI智能体协作平台用户端设计',
                    url: 'https://www.figma.com/design/b5KIDpU2E7LOKoyRUu5nez/AI%E6%99%BA%E8%83%BD%E4%BD%93%E5%8D%8F%E4%BD%9C%E5%B9%B3%E5%8F%B0-%E7%94%A8%E6%88%B7%E4%BE%A7?node-id=1053-54283&p=f&t=BCjuD7HO0JUeVeZ7-0',
                    icon: 'fab fa-figma',
                    color: '#00C896'
                },
                {
                    id: 'seaf-builder-design',
                    name: 'Seaf构建侧',
                    desc: '构建者平台设计原型',
                    url: 'https://www.figma.com/design/RIhycrd4WBS8Qv7BaHeg4n/%E6%9E%84%E5%BB%BA%E8%80%85%E5%B9%B3%E5%8F%B0?node-id=0-1&t=jRuLf9AYIEzeFaU0-1',
                    icon: 'fab fa-figma',
                    color: '#3370FF'
                },
                {
                    id: 'seaf-admin-design',
                    name: 'Seaf 管理侧',
                    desc: '管理端界面设计方案',
                    url: 'https://mastergo.360zqaq.net/files/project/165912562415716?org_id=91063446405121',
                    icon: 'fas fa-pencil-ruler',
                    color: '#7C3AED'
                },
                {
                    id: 'qpaas-design',
                    name: 'QPaaS',
                    desc: 'QPaaS 设计方案原型',
                    url: 'https://www.figma.com/design/084hgsayMkPwlZ66oFjkGy/QPaaS-%E8%AE%BE%E8%AE%A1%E6%96%B9%E6%A1%88?node-id=725-7319&p=f&t=CGgwNqEalYTUsXIF-0',
                    icon: 'fab fa-figma',
                    color: '#F24E1E'
                }
            ]
        },
        entertainment: {
            name: '娱乐休闲',
            icon: 'fas fa-gamepad',
            items: [
                {
                    id: 'qihoo-bbs',
                    name: '360 人',
                    desc: '360内部社区论坛',
                    url: 'http://bbs.qihoo.net/',
                    icon: 'fas fa-users',
                    color: '#FF6B35'
                }
            ]
        }
    }
};

// 调试函数 - 清除localStorage
function clearLocalStorage() {
    localStorage.removeItem('pm-navigation-data');
    console.log('localStorage已清除，刷新页面查看最新数据');
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('当前数据版本:', DATA_VERSION);
    console.log('默认数据包含的类别:', Object.keys(navigationData.categories));
    loadData();
    renderContent();
    
    // 为标签按钮添加事件监听
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            switchCategory(category, button);
        });
    });
});

// 数据持久化
function saveData() {
    localStorage.setItem('pm-navigation-data', JSON.stringify(navigationData));
}

function loadData() {
    const saved = localStorage.getItem('pm-navigation-data');
    if (saved) {
        const savedData = JSON.parse(saved);
        // 检查版本，如果版本不匹配则使用默认数据并保存
        if (savedData.version !== DATA_VERSION) {
            console.log('数据版本已更新，使用新的默认数据');
            // 清除旧数据，使用新的默认数据
            localStorage.removeItem('pm-navigation-data');
            saveData();
        } else {
            navigationData = savedData;
        }
    } else {
        // 首次访问，保存默认数据
        saveData();
    }
}

// 渲染内容
function renderContent() {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';
    
    Object.keys(navigationData.categories).forEach(categoryKey => {
        const category = navigationData.categories[categoryKey];
        const section = createCategorySection(categoryKey, category);
        mainContent.appendChild(section);
    });
    
    // 重新绑定事件
    bindEvents();
}

// 创建分类区域
function createCategorySection(categoryKey, category) {
    const section = document.createElement('section');
    section.className = 'category-section';
    section.dataset.category = categoryKey;
    
    section.innerHTML = `
        <div class="category-header">
            <h2 class="category-title">
                <i class="${category.icon}"></i>
                ${category.name}
            </h2>
            <div class="category-more">
                <button class="more-btn">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu">
                    <div class="dropdown-item" onclick="addItem('${categoryKey}')">
                        <i class="fas fa-plus"></i>
                        新建
                    </div>
                    <div class="dropdown-item" onclick="editCategory('${categoryKey}')">
                        <i class="fas fa-edit"></i>
                        编辑
                    </div>
                    <div class="dropdown-item delete" onclick="deleteCategory('${categoryKey}')">
                        <i class="fas fa-trash"></i>
                        删除
                    </div>
                </div>
            </div>
        </div>
        <div class="sites-grid">
            ${category.items.map(item => createSiteCard(item, categoryKey)).join('')}
        </div>
    `;
    
    return section;
}

// 创建网站卡片
function createSiteCard(item, categoryKey) {
    const newBadge = item.isNew ? '<span class="new-badge">new</span>' : '';
    
    return `
        <div class="site-card-wrapper">
            <a href="${item.url}" target="_blank" class="site-card">
                <div class="site-icon">
                    <i class="${item.icon}" style="color: ${item.color};"></i>
                </div>
                <div class="site-info">
                    <h3 class="site-name">
                        ${item.name}
                        ${newBadge}
                    </h3>
                    <p class="site-desc">${item.desc}</p>
                </div>
            </a>
            <div class="card-more">
                <button class="more-btn">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu">
                    <div class="dropdown-item" onclick="editCard('${item.id}')">
                        <i class="fas fa-edit"></i>
                        编辑
                    </div>
                    <div class="dropdown-item delete" onclick="deleteCard('${item.id}')">
                        <i class="fas fa-trash"></i>
                        删除
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 绑定事件
function bindEvents() {
    const siteCards = document.querySelectorAll('.site-card');
    siteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 分类切换功能
function switchCategory(category, activeButton) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');

    const categorySecti ons = document.querySelectorAll('.category-section');
    categorySecti ons.forEach(section => {
        const sectionCategory = section.dataset.category;
        
        if (category === 'all' || sectionCategory === category) {
            section.classList.remove('hidden');
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



// 添加分类
function addCategory() {
    currentEditCategory = null;
    document.getElementById('categoryModalTitle').textContent = '添加分类';
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryIcon').value = 'fas fa-star';
    document.getElementById('categoryModal').style.display = 'block';
}

// 编辑分类
function editCategory(categoryKey) {
    currentEditCategory = categoryKey;
    const category = navigationData.categories[categoryKey];
    
    document.getElementById('categoryModalTitle').textContent = '编辑分类';
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryIcon').value = category.icon;
    document.getElementById('categoryModal').style.display = 'block';
}

// 删除分类
function deleteCategory(categoryKey) {
    if (confirm('确定要删除这个分类吗？删除后该分类下的所有内容都将丢失。')) {
        delete navigationData.categories[categoryKey];
        saveData();
        renderContent();
        updateCategoryTabs();
    }
}

// 添加项目
function addItem(categoryKey) {
    currentEditTarget = null;
    currentEditCategory = categoryKey;
    
    document.getElementById('modalTitle').textContent = '添加链接';
    document.getElementById('itemName').value = '';
    document.getElementById('itemDesc').value = '';
    document.getElementById('itemUrl').value = '';
    document.getElementById('itemIcon').value = 'fas fa-link';
    document.getElementById('itemColor').value = '#3370FF';
    document.getElementById('editModal').style.display = 'block';
}

// 编辑卡片
function editCard(itemId) {
    // 查找项目
    let foundItem = null;
    let foundCategory = null;
    
    Object.keys(navigationData.categories).forEach(categoryKey => {
        const category = navigationData.categories[categoryKey];
        const item = category.items.find(item => item.id === itemId);
        if (item) {
            foundItem = item;
            foundCategory = categoryKey;
        }
    });
    
    if (foundItem) {
        currentEditTarget = itemId;
        currentEditCategory = foundCategory;
        
        document.getElementById('modalTitle').textContent = '编辑链接';
        document.getElementById('itemName').value = foundItem.name;
        document.getElementById('itemDesc').value = foundItem.desc;
        document.getElementById('itemUrl').value = foundItem.url;
        document.getElementById('itemIcon').value = foundItem.icon;
        document.getElementById('itemColor').value = foundItem.color;
        document.getElementById('editModal').style.display = 'block';
    }
}

// 删除卡片
function deleteCard(itemId) {
    if (confirm('确定要删除这个链接吗？')) {
        Object.keys(navigationData.categories).forEach(categoryKey => {
            const category = navigationData.categories[categoryKey];
            category.items = category.items.filter(item => item.id !== itemId);
        });
        saveData();
        renderContent();
    }
}

// 关闭模态框
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

// 表单提交
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('itemName').value;
    const desc = document.getElementById('itemDesc').value;
    const url = document.getElementById('itemUrl').value;
    const icon = document.getElementById('itemIcon').value;
    const color = document.getElementById('itemColor').value;
    
    const itemData = {
        id: currentEditTarget || Date.now().toString(),
        name,
        desc,
        url,
        icon,
        color
    };
    
    if (currentEditTarget) {
        // 编辑现有项目
        const category = navigationData.categories[currentEditCategory];
        const itemIndex = category.items.findIndex(item => item.id === currentEditTarget);
        if (itemIndex !== -1) {
            category.items[itemIndex] = { ...category.items[itemIndex], ...itemData };
        }
    } else {
        // 添加新项目
        navigationData.categories[currentEditCategory].items.push(itemData);
    }
    
    saveData();
    renderContent();
    closeModal();
});

document.getElementById('categoryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('categoryName').value;
    const icon = document.getElementById('categoryIcon').value;
    
    if (currentEditCategory) {
        // 编辑现有分类
        navigationData.categories[currentEditCategory].name = name;
        navigationData.categories[currentEditCategory].icon = icon;
    } else {
        // 添加新分类
        const categoryKey = name.toLowerCase().replace(/\s+/g, '-');
        navigationData.categories[categoryKey] = {
            name,
            icon,
            items: []
        };
    }
    
    saveData();
    renderContent();
    updateCategoryTabs();
    closeCategoryModal();
});

// 更新分类标签
function updateCategoryTabs() {
    const categoryTabs = document.querySelector('.category-tabs');
    const addBtn = categoryTabs.querySelector('.add-category-btn');
    
    // 清除现有标签（除了全部和添加按钮）
    const existingTabs = categoryTabs.querySelectorAll('.tab-btn:not([data-category="all"])');
    existingTabs.forEach(tab => tab.remove());
    
    // 添加新标签
    Object.keys(navigationData.categories).forEach(categoryKey => {
        const category = navigationData.categories[categoryKey];
        const button = document.createElement('button');
        button.className = 'tab-btn';
        button.dataset.category = categoryKey;
        button.innerHTML = `
            <i class="${category.icon}"></i>
            ${category.name}
        `;
        button.addEventListener('click', () => {
            switchCategory(categoryKey, button);
        });
        categoryTabs.insertBefore(button, addBtn);
    });
}

// 网站访问统计
function trackSiteVisit(siteName, siteUrl) {
    let visits = JSON.parse(localStorage.getItem('siteVisits') || '{}');
    visits[siteName] = (visits[siteName] || 0) + 1;
    localStorage.setItem('siteVisits', JSON.stringify(visits));
}

// 点击外部关闭模态框
window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const categoryModal = document.getElementById('categoryModal');
    
    if (event.target === editModal) {
        closeModal();
    }
    if (event.target === categoryModal) {
        closeCategoryModal();
    }
}

// 页面加载动画
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

// 响应式菜单处理
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

window.addEventListener('resize', handleMobileMenu);
document.addEventListener('DOMContentLoaded', handleMobileMenu);