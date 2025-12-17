// 用户数据存储
let users = JSON.parse(localStorage.getItem('users')) || [];

// 注册表单提交
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // 验证密码匹配
        if (password !== confirmPassword) {
            alert('两次输入的密码不匹配！');
            return;
        }
        
        // 检查邮箱是否已注册
        if (users.some(user => user.email === email)) {
            alert('该邮箱已被注册！');
            return;
        }
        
        // 创建新用户
        const newUser = {
            id: Date.now(),
            username,
            email,
            password // 注意：实际应用中应该加密存储
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alert('注册成功！');
        window.location.href = 'index.html';
    });
}

// 登录表单提交
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // 验证用户
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            //alert('登录成功！');
            window.location.href = '../index.html';
        } else {
            alert('邮箱或密码错误！');
        }
    });
}

// 检查登录状态
function checkLogin() {
    return localStorage.getItem('currentUser') !== null;
}

// 获取当前用户
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// 登出
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth/login.html';
}
