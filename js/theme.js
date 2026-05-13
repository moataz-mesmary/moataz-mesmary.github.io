/* theme.js — instant dark on home, light on other pages */
(function(){
    var KEY='me-theme';
    var path=window.location.pathname;
    var isHome=path==='/'||path===''||path.endsWith('/index.html')||path.endsWith('/');

    // Determine theme BEFORE DOM renders to avoid flash
    var saved=localStorage.getItem(KEY);
    var theme;
    if(saved==='light'||saved==='dark'){
        theme=saved; // user manually chose
    } else {
        theme=isHome?'dark':'light'; // page default
    }
    document.documentElement.setAttribute('data-theme',theme);

    function updateBtn(t){
        var b=document.getElementById('theme-toggle');
        if(!b)return;
        b.innerHTML=t==='dark'?'<i class="bi bi-sun-fill"></i>':'<i class="bi bi-moon-stars-fill"></i>';
        b.title=t==='dark'?'Switch to Light':'Switch to Dark';
    }

    window.toggleTheme=function(){
        var cur=document.documentElement.getAttribute('data-theme')||theme;
        var next=cur==='dark'?'light':'dark';
        localStorage.setItem(KEY,next);
        document.documentElement.setAttribute('data-theme',next);
        updateBtn(next);
    };

    document.addEventListener('DOMContentLoaded',function(){
        updateBtn(document.documentElement.getAttribute('data-theme'));
        // When navigating away from home, reset to auto so other pages use light default
        if(isHome){
            document.querySelectorAll('a[href]').forEach(function(a){
                a.addEventListener('click',function(){
                    var href=a.getAttribute('href')||'';
                    if(href&&!href.includes('index')&&!href.startsWith('#')&&href!=='/'&&href!==''){
                        localStorage.removeItem(KEY);
                    }
                });
            });
        }
    });
})();
