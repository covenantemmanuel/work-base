const $ = (s) => document.querySelector(s);
const authCard = $('#authCard'), dashboard = $('#dashboard'), toast = $('#toast');
let isLogin = false, state = { user: null, users: [], messages: [] };

const notify = (m, err=false)=>{toast.textContent=m;toast.style.display='block';toast.style.background=err?'#ef4444':'#22c55e';setTimeout(()=>toast.style.display='none',1800)};
const validatePassword = (p)=> /[A-Z]/.test(p) && /\d/.test(p) && p.length>=8;

$('#switchAuth').onclick = ()=>{isLogin=!isLogin;$('#registerForm').classList.toggle('hidden',isLogin);$('#loginForm').classList.toggle('hidden',!isLogin);$('#authTitle').textContent=isLogin?'Welcome back':'Create account';$('#switchAuth').textContent=isLogin?'Need an account? Register':'Already have an account? Login';};
$('#togglePass').onclick=()=>{const i=$('#regPassword');i.type=i.type==='password'?'text':'password';};
$('#themeToggle').onclick=()=>document.body.classList.toggle('light');
$('#forgotBtn').onclick=()=>notify('Password reset link sent (integrate Firebase sendPasswordResetEmail)');

$('#registerForm').onsubmit=(e)=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(!validatePassword(d.password))return notify('Weak password',true);state.user={...d,id:crypto.randomUUID(),username:`${d.firstName.toLowerCase()}_${Math.random().toString(36).slice(2,8)}`,isPremium:false,role:'user',createdAt:new Date().toISOString(),lastLogin:new Date().toISOString()};state.users.push(state.user);localStorage.setItem('finverseUser',JSON.stringify(state.user));notify('Registered. Verify email via Firebase.');bootDashboard();};
$('#loginForm').onsubmit=(e)=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const user=JSON.parse(localStorage.getItem('finverseUser')||'null');if(user && user.email===d.email){state.user=user;notify('Logged in');bootDashboard();}else notify('Invalid credentials',true);};
$('#logoutBtn').onclick=()=>{localStorage.removeItem('finverseUser');state.user=null;dashboard.classList.add('hidden');authCard.classList.remove('hidden');$('#logoutBtn').classList.add('hidden');};

function bootDashboard(){authCard.classList.add('hidden');dashboard.classList.remove('hidden');$('#logoutBtn').classList.remove('hidden');renderStats();renderUsers();}
function renderStats(){const stats=[['Users',state.users.length],['Revenue','$49,920'],['Activities',1280],['Messages',state.messages.length]];$('#stats').innerHTML=stats.map(([k,v])=>`<div class="stat"><strong>${v}</strong><p>${k}</p></div>`).join('');}

[...document.querySelectorAll('.sidebar button')].forEach(b=>b.onclick=()=>{document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));$(`#view-${b.dataset.view}`).classList.remove('hidden');});
$('#chatForm').onsubmit=(e)=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));state.messages.push({text:d.message,time:new Date().toLocaleTimeString(),seen:false});$('#messages').innerHTML=state.messages.map(m=>`<p>${m.text} <small>${m.time}</small></p>`).join('');$('#messages').scrollTop=$('#messages').scrollHeight;e.target.reset();renderStats();};
$('#profileForm').onsubmit=(e)=>{e.preventDefault();notify('Profile updated (sync Firestore/Storage in backend)');};
function renderUsers(){const q=$('#userSearch').value?.toLowerCase()||'';$('#userList').innerHTML=state.users.filter(u=>`${u.firstName} ${u.lastName}`.toLowerCase().includes(q)).map(u=>`<li>${u.firstName} ${u.lastName} (${u.role}) <button onclick="alert('Suspend ${u.id}')">Suspend</button></li>`).join('')||'<li>No users yet</li>';}
$('#userSearch').oninput=renderUsers;

document.querySelectorAll('[data-plan]').forEach(btn=>btn.onclick=()=>{$('#billingStatus').textContent=`${btn.dataset.plan} plan initialized (hook to Paystack API verify).`;notify('Payment flow started');});

const existing=localStorage.getItem('finverseUser');if(existing){state.user=JSON.parse(existing);state.users=[state.user];bootDashboard();}
