
(function(){
var $ = function(s){ return document.querySelector(s); };
var P = {
  overview:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  book:'M3.5 5h17v15h-17zM3.5 10h17M8 3v4M16 3v4',
  bookings:'M5 4h14v16H5zM9 9h6M9 13h6M9 17h3',
  membership:'M3 6h18v12H3zM3 10h18M7 15h3',
  tournaments:'M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 6h3v2a3 3 0 01-3 3M7 6H4v2a3 3 0 003 3',
  notifications:'M6 16v-5a6 6 0 0112 0v5l1.5 2h-15zM10 20a2 2 0 004 0',
  profile:'M12 4.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2zM5 20c1.4-3.8 4.2-5.6 7-5.6s5.6 1.8 7 5.6',
  clock:'M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM12 7.5V12l3 2',
  star:'M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6 6.7 19.5l1.1-6L3.4 9.3l6-.8z',
  users:'M9 4.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zM3 20c.6-3.5 3-5.4 6-5.4s5.4 1.9 6 5.4M17 6a2.5 2.5 0 010 5M17 14.6c2.6 0 4.4 1.6 5 4.4'
};
function ic(n){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+P[n]+'"/></svg>'; }
var NAV = [['overview','Overview'],['book','Book a Court'],['bookings','My Bookings'],['membership','Membership'],['tournaments','Tournaments'],['notifications','Notifications'],['profile','My Profile']];
function dd(n){ var x = new Date(); x.setDate(x.getDate()+n); return x; }
function fd(x){ return x.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'}); }
function ft(h){ return ((h%12)||12)+':00 '+(h<12?'AM':'PM'); }
var COURTS = {'Badminton':4,'Table Tennis':3}, RATE = {'Badminton':[300,400],'Table Tennis':[180,250]};
var S = {
  view:'overview', sport:'Badminton', court:1, day:0, slot:null, usePlan:true, tab:'Upcoming', hours:7, total:10, paused:false, name:'Kavya Reddy',
  email:'kavya@example.com', phone:'+91 90000 00000', pref:'Badminton', level:'Intermediate',
  bookings:[
    {id:1,sport:'Badminton',court:2,d:1,h:19,amt:0,st:'Upcoming',plan:1},
    {id:2,sport:'Table Tennis',court:1,d:3,h:6,amt:180,st:'Upcoming',plan:0},
    {id:3,sport:'Badminton',court:1,d:6,h:20,amt:0,st:'Upcoming',plan:1},
    {id:4,sport:'Badminton',court:3,d:-2,h:18,amt:0,st:'Completed',plan:1},
    {id:5,sport:'Table Tennis',court:2,d:-5,h:7,amt:180,st:'Completed',plan:0},
    {id:6,sport:'Badminton',court:2,d:-9,h:20,amt:0,st:'Completed',plan:1},
    {id:7,sport:'Badminton',court:4,d:-12,h:19,amt:400,st:'Cancelled',plan:0}],
  tourn:[
    {id:1,name:'Hyderabad Open Doubles',sport:'Badminton',d:12,fee:500,left:6,level:'Intermediate',reg:true},
    {id:2,name:'Monsoon Smash Singles',sport:'Badminton',d:20,fee:400,left:14,level:'All levels',reg:false},
    {id:3,name:'Rally Point TT League',sport:'Table Tennis',d:26,fee:300,left:9,level:'Beginner–Intermediate',reg:true},
    {id:4,name:'Members Mixed Mixer',sport:'Badminton',d:33,fee:250,left:20,level:'All levels',reg:false},
    {id:5,name:'Winter Cup Singles',sport:'Table Tennis',d:41,fee:350,left:12,level:'Advanced',reg:false},
    {id:6,name:'Corporate Challenge',sport:'Badminton',d:48,fee:600,left:4,level:'Intermediate',reg:false}],
  notes:[
    {id:1,t:'Booking confirmed',m:'Badminton Court 2 is yours tomorrow at 7:00 PM.',w:'2 hours ago',r:0},
    {id:2,t:'Tournament reminder',m:'Hyderabad Open Doubles starts in 12 days. Check your partner details.',w:'Yesterday',r:0},
    {id:3,t:'Plan hours running low',m:'You have 7 of 10 plan hours left. Renewal is in 24 days.',w:'2 days ago',r:0},
    {id:4,t:'Payment received',m:'₹3,000 for the Regular plan was received. Thank you!',w:'6 days ago',r:1},
    {id:5,t:'New: Member mixer',m:'Registrations are open for the Members Mixed Mixer.',w:'1 week ago',r:1}],
  pay:[['Regular plan — monthly',-6,3000],['Tournament entry — TT League',-14,300],['Regular plan — monthly',-36,3000]]
};
var up = function(){ return S.bookings.filter(function(b){ return b.st==='Upcoming'; }).sort(function(a,b){ return a.d-b.d||a.h-b.h; }); };
var unread = function(){ return S.notes.filter(function(n){ return !n.r; }).length; };
function chip(s){ return '<span class="chip '+(s==='Completed'?'done':s==='Cancelled'?'warn':'')+'">'+s+'</span>'; }
function hdr(t,p,extra){ return '<div class="page-head"><div><h2>'+t+'</h2><p>'+p+'</p></div>'+(extra||'')+'</div>'; }
function busy(d,h,c,sp){ return (d*5+h*3+c*7+(sp==='Badminton'?1:2))%4===0 || (d===0 && h<=new Date().getHours()); }
function toast(m){ var t=$('#toast'); t.textContent=m; t.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(function(){ t.classList.remove('show'); },2600); }
function note(t,m){ S.notes.unshift({id:Date.now(),t:t,m:m,w:'Just now',r:0}); }

var V = {
overview:function(){
  var h=new Date().getHours(), g=h<12?'Good morning':h<17?'Good afternoon':'Good evening', u=up(), wk=[3,5,4,6,2,5,4];
  return '<div class="welcome"><div><h2>'+g+', '+S.name.split(' ')[0]+'!</h2><p>You have '+u.length+' upcoming bookings and '+S.hours+' plan hours left this month. Ready for your next rally?</p></div><div class="btns"><button class="btn btn-secondary" data-a="go" data-v="book">Book a court</button><button class="btn btn-outline-light" data-a="go" data-v="tournaments">Join a tournament</button></div></div>'+
  '<div class="stats">'+[['book',u.length,'Upcoming bookings'],['clock',S.hours+'/'+S.total,'Plan hours left'],['membership',S.paused?'Paused':'Regular','Membership status'],['tournaments',S.tourn.filter(function(t){return t.reg;}).length,'Tournaments joined']].map(function(s){ return '<div class="stat"><span class="ic">'+ic(s[0])+'</span><div><strong>'+s[1]+'</strong><span>'+s[2]+'</span></div></div>'; }).join('')+'</div>'+
  '<div class="g2"><div class="card"><h3>Next bookings</h3>'+(u.length?'<ul class="rows">'+u.slice(0,3).map(function(b){ return '<li><span class="ic">'+ic('book')+'</span><div class="tx"><b>'+b.sport+' · Court '+b.court+'</b><small>'+fd(dd(b.d))+' · '+ft(b.h)+'</small></div>'+chip(b.st)+'</li>'; }).join('')+'</ul>':'<p class="empty">No upcoming bookings yet.</p>')+'</div>'+
  '<div class="card"><h3>Hours played <small>last 7 weeks</small></h3><div class="bars">'+wk.map(function(v,i){ return '<div><b>'+v+'</b><i style="height:'+v/7*100+'%"></i>W'+(i+1)+'</div>'; }).join('')+'</div></div></div>';
},
book:function(){
  var sp=S.sport, n=COURTS[sp], hrs=[], i, r=RATE[sp];
  for(i=6;i<=22;i++) hrs.push(i);
  var sel=S.slot, peak=sel>=17, price=sel?r[peak?1:0]:0, plan=S.usePlan&&S.hours>0&&!S.paused;
  return hdr('Book a court','Pick a sport, day and time. Member rates apply automatically.')+
  '<div class="book"><div class="card"><div class="pick"><div class="tabs">'+Object.keys(COURTS).map(function(k){ return '<button data-a="sport" data-v="'+k+'" class="'+(k===sp?'on':'')+'">'+k+'</button>'; }).join('')+'</div><select class="sel" data-a="court" aria-label="Court">'+Array.apply(null,Array(n)).map(function(_,j){ return '<option value="'+(j+1)+'"'+(S.court===j+1?' selected':'')+'>'+(sp==='Badminton'?'Court ':'Table ')+(j+1)+'</option>'; }).join('')+'</select></div>'+
  '<div class="days">'+[0,1,2,3,4,5,6].map(function(k){ var x=dd(k); return '<button data-a="day" data-v="'+k+'" class="'+(S.day===k?'on':'')+'"><span>'+x.toLocaleDateString('en-IN',{weekday:'short'})+'</span><b>'+x.getDate()+'</b><span>'+x.toLocaleDateString('en-IN',{month:'short'})+'</span></button>'; }).join('')+'</div>'+
  '<div class="slots">'+hrs.map(function(h){ return '<button class="slot'+(sel===h?' on':'')+'" data-a="slot" data-v="'+h+'"'+(busy(S.day,h,S.court,sp)?' disabled':'')+'>'+ft(h)+'</button>'; }).join('')+'</div><div class="legend"><span>Peak from 5 PM</span><span>Struck-through = booked</span></div></div>'+
  '<div class="card"><h3>Your booking</h3><dl class="sum"><div><dt>Sport</dt><dd>'+sp+'</dd></div><div><dt>Court</dt><dd>'+(sp==='Badminton'?'Court ':'Table ')+S.court+'</dd></div><div><dt>Date</dt><dd>'+fd(dd(S.day))+'</dd></div><div><dt>Time</dt><dd>'+(sel?ft(sel)+' – '+ft(sel+1):'Select a slot')+'</dd></div><div><dt>Member rate</dt><dd>'+(sel?'₹'+price+' / hr':'—')+'</dd></div></dl>'+
  '<label class="chk"><input type="checkbox" data-a="plan"'+(S.usePlan?' checked':'')+(S.paused||!S.hours?' disabled':'')+'> Use 1 plan hour ('+S.hours+' left)</label><div class="sum"><div><dt>Total</dt><dd class="total">₹'+(sel&&!plan?price:0)+'</dd></div></div><button class="btn btn-primary" style="width:100%" data-a="confirm"'+(sel?'':' disabled')+'>Confirm booking</button></div></div>';
},
bookings:function(){
  var l=S.bookings.filter(function(b){ return S.tab==='Past'?b.st==='Completed':S.tab==='Cancelled'?b.st==='Cancelled':b.st==='Upcoming'; }).sort(function(a,b){ return a.d-b.d; });
  return hdr('My bookings','Review, track and cancel your court slots.','<div class="tabs">'+['Upcoming','Past','Cancelled'].map(function(k){ return '<button data-a="tab" data-v="'+k+'" class="'+(k===S.tab?'on':'')+'">'+k+'</button>'; }).join('')+'</div>')+
  '<div class="card">'+(l.length?'<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Court</th><th>Date</th><th>Time</th><th>Paid</th><th>Status</th><th></th></tr></thead><tbody>'+l.map(function(b){ return '<tr><td><b>'+b.sport+'</b><br><small>'+(b.sport==='Badminton'?'Court ':'Table ')+b.court+'</small></td><td>'+fd(dd(b.d))+'</td><td>'+ft(b.h)+'</td><td>'+(b.plan?'Plan hour':'₹'+b.amt)+'</td><td>'+chip(b.st)+'</td><td>'+(b.st==='Upcoming'?'<button class="btn btn-outline btn-sm" data-a="cancel" data-v="'+b.id+'">Cancel</button>':'')+'</td></tr>'; }).join('')+'</tbody></table></div>':'<p class="empty">Nothing here yet. <a class="inline-link" href="#" data-a="go" data-v="book">Book a court</a></p>')+'</div>';
},
membership:function(){
  var used=S.total-S.hours;
  return hdr('Membership','Your plan, hours and billing in one place.','<a class="btn btn-outline btn-sm" href="../membership/membership.html#plans">Compare plans</a>')+
  '<div class="g2"><div class="card plan-hero"><span class="chip warn" style="align-self:flex-start">'+(S.paused?'Paused':'Active')+'</span><h3>Regular plan</h3><p style="margin:0;opacity:.85">₹3,000 / month · renews on '+fd(dd(24))+'</p><div class="meter"><i style="width:'+used/S.total*100+'%"></i></div><p style="margin:0">'+used+' of '+S.total+' hours used · '+S.hours+' left</p><div class="btns" style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap"><a class="btn btn-secondary btn-sm" href="../membership/membership.html#plans">Upgrade to Unlimited</a><button class="btn btn-outline-light btn-sm" data-a="pause">'+(S.paused?'Resume plan':'Pause plan')+'</button></div></div>'+
  '<div class="card"><h3>Your benefits</h3><ul class="perks-l"><li>10 court hours every month</li><li>Book 7 days ahead</li><li>Badminton and table tennis</li><li>2 free guest passes (1 left)</li><li>10% off coaching</li></ul></div></div>'+
  '<div class="card" style="margin-top:18px"><h3>Payment history</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Description</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>'+S.pay.map(function(p){ return '<tr><td>'+p[0]+'</td><td>'+fd(dd(p[1]))+'</td><td>₹'+p[2].toLocaleString('en-IN')+'</td><td><span class="chip">Paid</span></td></tr>'; }).join('')+'</tbody></table></div></div>';
},
tournaments:function(){
  return hdr('Tournaments','Compete, meet new partners and climb the ladder. '+S.tourn.filter(function(t){return t.reg;}).length+' registered.')+
  '<div class="g3">'+S.tourn.map(function(t){ return '<div class="card t-card"><div style="display:flex;justify-content:space-between;gap:8px"><span class="chip">'+t.sport+'</span>'+(t.reg?'<span class="chip warn">Registered</span>':'')+'</div><h4>'+t.name+'</h4><div class="meta"><span>'+fd(dd(t.d))+'</span><span>'+t.level+'</span><span>'+t.left+' spots left</span></div><p>Entry fee ₹'+t.fee+' · members get priority seeding.</p><button class="btn '+(t.reg?'btn-outline':'btn-primary')+' btn-sm" data-a="reg" data-v="'+t.id+'">'+(t.reg?'Withdraw':'Register now')+'</button></div>'; }).join('')+'</div>';
},
notifications:function(){
  return hdr('Notifications',unread()?unread()+' unread':'You are all caught up.',unread()?'<button class="btn btn-outline btn-sm" data-a="readall">Mark all as read</button>':'')+
  '<div class="card"><ul class="rows">'+S.notes.map(function(n){ return '<li class="'+(n.r?'read':'unread')+'" data-a="read" data-v="'+n.id+'"><span class="ic">'+ic('notifications')+'</span><div class="tx"><b>'+n.t+'</b><small>'+n.m+'</small></div><small>'+n.w+'</small></li>'; }).join('')+'</ul></div>';
},
profile:function(){
  var o=function(a,v){ return a.map(function(x){ return '<option'+(x===v?' selected':'')+'>'+x+'</option>'; }).join(''); };
  return hdr('My profile','Keep your details up to date for faster check-in.')+
  '<div class="prof"><div class="card prof-card"><span class="av">'+S.name[0]+'</span><h3 style="margin-bottom:4px">'+S.name+'</h3><p style="margin:0 0 12px;color:var(--text-soft)">Regular member</p><span class="chip">Member since 2026</span></div>'+
  '<form class="card form" id="pf"><label>Full name<input class="inp" name="name" value="'+S.name+'" required></label><label>Email<input class="inp" type="email" name="email" value="'+S.email+'" required></label><label>Phone<input class="inp" name="phone" value="'+S.phone+'"></label><label>Preferred sport<select class="sel" name="pref">'+o(['Badminton','Table Tennis','Both'],S.pref)+'</select></label><label class="full">Skill level<select class="sel" name="level">'+o(['Beginner','Intermediate','Advanced'],S.level)+'</select></label><div class="full"><button class="btn btn-primary" type="submit">Save changes</button></div></form></div>';
}};

function render(){
  $('#nav').innerHTML = NAV.map(function(n){ return '<button data-a="go" data-v="'+n[0]+'" class="'+(S.view===n[0]?'on':'')+'"'+(S.view===n[0]?' aria-current="page"':'')+'>'+ic(n[0])+'<span>'+n[1]+'</span>'+(n[0]==='notifications'&&unread()?'<span class="n">'+unread()+'</span>':'')+'</button>'; }).join('');
  $('#bell-n').textContent = unread()||'';
  $('#av').textContent = S.name[0]; $('#me-name').textContent = S.name.split(' ')[0];
  $('#view').innerHTML = V[S.view]();
}
function go(v){ S.view=v; render(); $('#view').scrollTop=0; closeSide(); }
function closeSide(){ $('#side').classList.remove('open'); $('#scrim').classList.remove('open'); }

document.addEventListener('click',function(e){
  var t=e.target.closest('[data-a]'); if(!t||t.tagName==='SELECT'||t.type==='checkbox') return;
  if(t.tagName==='A') e.preventDefault();
  var a=t.dataset.a, v=t.dataset.v, x;
  if(a==='go') return go(v);
  if(a==='sport'){ S.sport=v; S.court=1; S.slot=null; }
  else if(a==='day'){ S.day=+v; S.slot=null; }
  else if(a==='slot'){ S.slot=+v; }
  else if(a==='tab'){ S.tab=v; }
  else if(a==='confirm'){
    var plan=S.usePlan&&S.hours>0&&!S.paused, r=RATE[S.sport][S.slot>=17?1:0];
    S.bookings.push({id:Date.now(),sport:S.sport,court:S.court,d:S.day,h:S.slot,amt:plan?0:r,st:'Upcoming',plan:plan?1:0});
    if(plan) S.hours--; note('Booking confirmed',S.sport+' court '+S.court+' on '+fd(dd(S.day))+' at '+ft(S.slot)+'.');
    S.slot=null; S.tab='Upcoming'; toast('Booking confirmed!'); return go('bookings');
  }
  else if(a==='cancel'){ x=S.bookings.filter(function(b){ return b.id==v; })[0]; x.st='Cancelled'; if(x.plan) S.hours++; note('Booking cancelled','Your '+x.sport+' slot on '+fd(dd(x.d))+' was cancelled.'); toast('Booking cancelled'+(x.plan?' · plan hour refunded':'')); }
  else if(a==='reg'){ x=S.tourn.filter(function(b){ return b.id==v; })[0]; x.reg=!x.reg; x.left+=x.reg?-1:1; if(x.reg) note('Tournament registration',"You're in for "+x.name+'. Entry fee ₹'+x.fee+'.'); toast(x.reg?'Registered for '+x.name:'Registration withdrawn'); }
  else if(a==='pause'){ S.paused=!S.paused; toast(S.paused?'Plan paused':'Plan resumed'); }
  else if(a==='read'){ S.notes.forEach(function(n){ if(n.id==v) n.r=1; }); }
  else if(a==='readall'){ S.notes.forEach(function(n){ n.r=1; }); toast('All notifications marked as read'); }
  render();
});
document.addEventListener('change',function(e){
  var t=e.target; if(t.dataset.a==='court'){ S.court=+t.value; S.slot=null; render(); }
  if(t.dataset.a==='plan'){ S.usePlan=t.checked; render(); }
});
document.addEventListener('submit',function(e){
  e.preventDefault(); var f=new FormData(e.target);
  ['name','email','phone','pref','level'].forEach(function(k){ S[k]=f.get(k); });
  toast('Profile saved'); render();
});
$('#side-toggle').addEventListener('click',function(){ $('#side').classList.add('open'); $('#scrim').classList.add('open'); });
$('#scrim').addEventListener('click',closeSide);
$('#today').textContent = new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
render();
})();
