var KEY = 'pms_';
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function today(){return new Date().toISOString().slice(0,10);}
function money(n){return 'Rs. '+Number(n).toLocaleString('en-US');}
function badge(status){var m={Confirmed:'ok',Completed:'in2',Paid:'ok',Pending:'wa',Cancelled:'no',Unpaid:'wa',Normal:'ok',High:'wa'};return '<span class="b '+(m[status]||'in2')+'">'+esc(status)+'</span>';}


var USERS=[
 {email:'patient@hospital.com',password:'Patient@123',role:'patient',name:'Nimal Perera'},
 {email:'admin@hospital.com',password:'Admin@123',role:'admin',name:'Admin Kumari'}
];

var DEFAULTS={
 doctors:[{id:1,name:'Dr. Silva',dept:'Cardiology',fee:3500},{id:2,name:'Dr. Fernando',dept:'ENT',fee:3000},{id:3,name:'Dr. Perera',dept:'General Medicine',fee:2500},{id:4,name:'Dr. Jayawardena',dept:'Pediatrics',fee:2800},{id:5,name:'Dr. Wickramasinghe',dept:'Dermatology',fee:3200}],
 appointments:[
  {id:'BK-1001',patient:'Nimal Perera',doctor:'Dr. Silva',dept:'Cardiology',date:'2026-11-20',time:'10:30',status:'Confirmed',reason:'Blood pressure follow-up',fee:3500,paid:false},
  {id:'BK-1002',patient:'Nimal Perera',doctor:'Dr. Fernando',dept:'ENT',date:'2026-11-28',time:'14:00',status:'Pending',reason:'Ear pain',fee:3000,paid:false},
  {id:'BK-0990',patient:'Nimal Perera',doctor:'Dr. Silva',dept:'Cardiology',date:'2026-10-02',time:'09:30',status:'Completed',reason:'Chest check',fee:3500,paid:true},
  {id:'BK-1003',patient:'Amaya Wijesinghe',doctor:'Dr. Perera',dept:'General Medicine',date:'2026-11-18',time:'09:00',status:'Pending',reason:'Fever',fee:2500,paid:false},
  {id:'BK-1004',patient:'Saman Gunawardena',doctor:'Dr. Jayawardena',dept:'Pediatrics',date:'2026-11-19',time:'11:00',status:'Confirmed',reason:'Child vaccination',fee:2800,paid:true},
  {id:'BK-1005',patient:'Kamala Jayasuriya',doctor:'Dr. Wickramasinghe',dept:'Dermatology',date:'2026-11-21',time:'15:00',status:'Pending',reason:'Skin rash',fee:3200,paid:false}],
 patients:[
  {id:'P-1042',name:'Nimal Perera',age:34,phone:'0771234567',registered:'2026-01-12'},
  {id:'P-1043',name:'Amaya Wijesinghe',age:28,phone:'0712345678',registered:'2026-09-30'},
  {id:'P-1044',name:'Saman Gunawardena',age:41,phone:'0753456789',registered:'2026-10-21'},
  {id:'P-1045',name:'Kamala Jayasuriya',age:52,phone:'0764567890',registered:'2026-11-13'},
  {id:'P-1046',name:'Ruwan Dias',age:19,phone:'0725678901',registered:'2026-11-14'}],
 payments:[
  {id:'RC-6001',patient:'Nimal Perera',date:'2026-10-02',desc:'Consultation - Cardiology',amount:3500,method:'Card',status:'Paid'},
  {id:'RC-6002',patient:'Nimal Perera',date:'2026-10-05',desc:'Laboratory tests',amount:4200,method:'Cash',status:'Paid'},
  {id:'RC-6003',patient:'Saman Gunawardena',date:'2026-11-10',desc:'Consultation - Pediatrics',amount:2800,method:'Card',status:'Paid'}],
 records:{
  history:['Hypertension diagnosed in 2024','Appendectomy in 2015','No known drug allergies','Non-smoker'],
  diagnoses:[{date:'2026-10-02',doctor:'Dr. Silva',dept:'Cardiology',diagnosis:'Mild hypertension',notes:'Lifestyle changes advised. Follow-up in 6 weeks.'},{date:'2026-03-14',doctor:'Dr. Perera',dept:'General Medicine',diagnosis:'Seasonal flu',notes:'Rest and fluids. Recovered fully.'}],
  prescriptions:[{date:'2026-10-02',doctor:'Dr. Silva',medicine:'Amlodipine',dose:'5mg once daily',duration:'3 months'},{date:'2026-10-02',doctor:'Dr. Silva',medicine:'Atorvastatin',dose:'10mg at night',duration:'3 months'}],
  labs:[{id:'LAB-301',date:'2026-10-05',test:'Full blood count',result:'Hemoglobin 14.2 g/dL',range:'13 - 17',status:'Normal'},{id:'LAB-302',date:'2026-10-05',test:'Lipid profile',result:'Cholesterol 5.8 mmol/L',range:'below 5.2',status:'High'},{id:'LAB-303',date:'2026-10-05',test:'Blood sugar (fasting)',result:'5.1 mmol/L',range:'3.9 - 5.5',status:'Normal'}]}
};
DEFAULTS.users=USERS;
DEFAULTS.recs={'Nimal Perera':DEFAULTS.records};
function getRec(n){return load('recs')[n]||{history:[],diagnoses:[],prescriptions:[],labs:[]};}
function saveRec(n,r){var a=load('recs');a[n]=r;save('recs',a);}
function load(name){
 try{var v=localStorage.getItem(KEY+name);if(v)return JSON.parse(v);}catch(e){}
 var d=JSON.parse(JSON.stringify(DEFAULTS[name]));
 try{localStorage.setItem(KEY+name,JSON.stringify(d));}catch(e){}
 return d;
}
function save(name,val){try{localStorage.setItem(KEY+name,JSON.stringify(val));}catch(e){}}
function getUser(){try{return JSON.parse(localStorage.getItem(KEY+'user'));}catch(e){return null;}}
function logout(){localStorage.removeItem(KEY+'user');location.hash='#login';}

/* Notifications */
function notify(msg,type){
 type=type||'success';
 var box=document.getElementById('toast');if(!box)return;
 var t=document.createElement('div');t.className='toast '+type;t.textContent=msg;
 if(type==='error')t.setAttribute('role','alert');
 box.appendChild(t);setTimeout(function(){t.remove();},4500);
}


var user=getUser();
var LOGO="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI4IDI4Ij48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHJ4PSI4IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTEyIDZoNHY2aDZ2NGgtNnY2aC00di02SDZ2LTRoNnoiIGZpbGw9IiMxRDRFRDgiLz48L3N2Zz4K";
var PAGES={},TPL={},first=true;
var HOME={patient:'dashboard',admin:'admin/overview'};
var ALLOWED={patient:['dashboard','booking','records','payment'],admin:['admin']};
var TITLES={login:'Login',register:'Register',dashboard:'Patient Dashboard',booking:'Appointment Booking',records:'Medical Records',payment:'Online Payment',admin:'Administrator Dashboard'};
var LINKS={
 patient:[['Dashboard','dashboard'],['Appointments','booking'],['Medical Records','records'],['Lab Reports','records/labs'],['Prescriptions','records/prescriptions'],['Payments','payment']],
 admin:[['Overview','admin/overview'],['Patients','admin/patients'],['Doctors','admin/doctors'],['Appointments','admin/appointments'],['Medical Records','admin/records'],['Payments','admin/payments'],['Reports','admin/reports']]
};
function buildSidebar(cur){
 var sb=document.getElementById('sidebar');
 var html='<div class="lg"><img src="'+LOGO+'" alt="">MediCare</div><nav aria-label="Main navigation">';
 LINKS[user.role].forEach(function(l){var on=l[1]===cur;html+='<a href="#'+l[1]+'"'+(on?' class="on" aria-current="page"':'')+'>'+l[0]+'</a>';});
 sb.innerHTML=html+'</nav><button class="out" id="logoutBtn">Log out</button>';
 sb.classList.remove('open');
 document.getElementById('logoutBtn').onclick=logout;
 document.getElementById('who').textContent=user.name+' ('+user.role+')';
}
function route(){
 user=getUser();
 var parts=(location.hash.replace(/^#\/?/,'')||'login').split('/'),p=parts[0],sub=parts.slice(1).join('/');
 var auth=(p==='login'||p==='register');
 if(!user&&!auth){location.replace('#login');return;}
 if(user&&(auth||ALLOWED[user.role].indexOf(p)<0)){location.replace('#'+HOME[user.role]);return;}
 if(!PAGES[p]){location.replace('#login');return;}
 document.getElementById('authWrap').classList.toggle('hide',!auth);
 document.getElementById('appWrap').classList.toggle('hide',auth);
 document.querySelectorAll('[data-page]').forEach(function(s){
  var on=s.getAttribute('data-page')===p;s.classList.toggle('hide',!on);
  if(on){s.innerHTML=TPL[p];PAGES[p](sub);}
 });
 if(!auth){
  var cur=p==='admin'?'admin/'+(sub||'overview'):(p==='records'&&(sub==='labs'||sub==='prescriptions')?'records/'+sub:(p==='payment'?'payment':p));
  buildSidebar(cur);
 }
 document.title=TITLES[p]+' | MediCare Hospital';
 if(!first){var m=document.querySelector('#authWrap:not(.hide) [data-page]:not(.hide) main')||document.getElementById('main');m.focus({preventScroll:true});window.scrollTo(0,0);}
 first=false;
}

/* Accessible form validation */
function fieldError(id,msg,errId){
 var i=document.getElementById(id),e=document.getElementById(errId||id+'E');
 if(!i||!e)return !msg;
 if(msg){i.classList.add('bad');i.setAttribute('aria-invalid','true');e.textContent=msg;}
 else{i.classList.remove('bad');i.removeAttribute('aria-invalid');e.textContent='';}
 return !msg;
}

/* login pge*/
PAGES['login']=function(sub){
/* Login page: validates the form, checks the demo accounts, then opens the right dashboard */
var form=document.getElementById('loginForm');
var email=document.getElementById('email'),pw=document.getElementById('pw');
var remember=document.getElementById('remember'),show=document.getElementById('show');
var savedEmail=localStorage.getItem(KEY+'remember');
if(savedEmail){email.value=savedEmail;remember.checked=true;}

show.addEventListener('change',function(){pw.type=show.checked?'text':'password';});
document.getElementById('forgot').addEventListener('click',function(e){
 e.preventDefault();
 notify('Password reset is not available in this prototype.','info');
});

form.addEventListener('submit',function(e){
 e.preventDefault();
 var v=email.value.trim(),p=pw.value;
 var ok1=fieldError('email',!v?'Please enter your email or username.':(v.indexOf('@')>-1&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)?'Enter a valid email address.':''));
 var ok2=fieldError('pw',!p?'Please enter your password.':(p.length<8?'Password must be at least 8 characters.':''));
 if(!ok1||!ok2){(ok1?pw:email).focus();return;}
 var found=load('users').filter(function(u){return u.email===v.toLowerCase()&&u.password===p;})[0];
 if(!found){
  fieldError('pw','Incorrect email or password.');
  notify('Login failed. Check your details.','error');pw.focus();return;
 }
 if(remember.checked)localStorage.setItem(KEY+'remember',v);else localStorage.removeItem(KEY+'remember');
 localStorage.setItem(KEY+'user',JSON.stringify({name:found.name,role:found.role,email:found.email}));
 notify('Login successful. Redirecting...','success');
 setTimeout(function(){location.href=found.role==='admin'?'#admin/overview':'#dashboard';},1000);
});

};

/*register pge */
PAGES['register']=function(sub){
/* Patient registration: creates a login account and a patient record, then opens the login page */
document.getElementById('regForm').addEventListener('submit',function(e){
 e.preventDefault();
 function v(id){return document.getElementById(id).value.trim();}
 var users=load('users'),pts=load('patients');
 var n=v('rname'),em=v('remail').toLowerCase(),pw=document.getElementById('rpw').value;
 var r=[
  fieldError('rname',n.length<3?'Enter your full name.':(pts.some(function(p){return p.name.toLowerCase()===n.toLowerCase();})?'A patient with this name is already registered.':'')),
  fieldError('rage',(+v('rage')<0||+v('rage')>120||!v('rage'))?'Enter a valid age.':''),
  fieldError('rphone',/^0\d{9}$/.test(v('rphone'))?'':'Enter a 10-digit phone number starting with 0.'),
  fieldError('remail',!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)?'Enter a valid email address.':(users.some(function(u){return u.email===em;})?'This email is already registered.':'')),
  fieldError('rpw',pw.length<8?'Password must be at least 8 characters.':''),
  fieldError('rpw2',document.getElementById('rpw2').value!==pw?'Passwords do not match.':'')
 ];
 if(r.indexOf(false)>-1){notify('Please fix the highlighted fields.','error');var b=document.querySelector('.in.bad');if(b)b.focus();return;}
 var nums=pts.map(function(p){return +p.id.slice(2);});
 pts.push({id:'P-'+(Math.max.apply(null,nums)+1),name:n,age:+v('rage'),phone:v('rphone'),registered:today()});save('patients',pts);
 users.push({email:em,password:pw,role:'patient',name:n});save('users',users);
 notify('Registration successful. Redirecting to login...','success');
 setTimeout(function(){location.href='#login';},1200);
});

};


/* Patient dashboard*/
PAGES['dashboard']=function(sub){
var appts=load('appointments').filter(function(a){return a.patient===user.name;});
var rec=getRec(user.name);
var me=load('patients').filter(function(p){return p.name===user.name;})[0]||{id:'-',age:'-',phone:'-'};
var pays=load('payments').filter(function(p){return p.patient===user.name;});
function rows(list,fn,cols,empty){return list.length?list.map(fn).join(''):'<tr><td colspan="'+cols+'">'+empty+'</td></tr>';}

document.getElementById('welcome').textContent='Welcome back, '+user.name.split(' ')[0];
document.getElementById('profileBox').innerHTML=
 [['Name',user.name],['Patient ID',me.id],['Age',me.age],['Phone',me.phone]].map(function(x){return '<div><span class="muted">'+x[0]+'</span><br><strong>'+esc(x[1])+'</strong></div>';}).join('');

var upcoming=appts.filter(function(a){return a.status==='Pending'||a.status==='Confirmed';});
var previous=appts.filter(function(a){return a.status==='Completed'||a.status==='Cancelled';});
document.getElementById('pstats').innerHTML=
 [[upcoming.length,'Upcoming appointments'],[rec.diagnoses.length,'Medical records'],[rec.labs.length,'Lab reports'],[rec.prescriptions.length,'Prescriptions']]
 .map(function(s){return '<div class="card"><div class="num">'+s[0]+'</div><div class="muted">'+s[1]+'</div></div>';}).join('');

document.getElementById('upcoming').innerHTML=rows(upcoming,function(a){return '<tr><td>'+esc(a.doctor)+'<br><span class="muted">'+esc(a.dept)+'</span></td><td>'+a.date+'</td><td>'+a.time+'</td><td>'+badge(a.status)+'</td></tr>';},4,'No upcoming appointments.');
document.getElementById('previous').innerHTML=rows(previous,function(a){return '<tr><td>'+esc(a.doctor)+'</td><td>'+a.date+'</td><td>'+badge(a.status)+'</td></tr>';},3,'No previous appointments.');
document.getElementById('summary').innerHTML=rec.history.map(function(h){return '<li>'+esc(h)+'</li>';}).join('')+(rec.diagnoses[0]?'<li>Latest diagnosis: '+esc(rec.diagnoses[0].diagnosis)+' ('+rec.diagnoses[0].date+')</li>':'<li>No medical records yet.</li>');
document.getElementById('labs').innerHTML=rows(rec.labs,function(l){return '<tr><td>'+esc(l.test)+'</td><td>'+l.date+'</td><td>'+badge(l.status)+'</td></tr>';},3,'No lab reports.');
document.getElementById('rx').innerHTML=rows(rec.prescriptions,function(p){return '<tr><td>'+esc(p.medicine)+'</td><td>'+esc(p.dose)+'</td><td>'+esc(p.duration)+'</td></tr>';},3,'No prescriptions.');
document.getElementById('pay').innerHTML=rows(pays,function(p){return '<tr><td>'+p.id+'</td><td>'+esc(p.desc)+'</td><td>'+money(p.amount)+'</td><td>'+badge(p.status)+'</td></tr>';},4,'No payments yet.');
};

/* Appointment booking */
PAGES['booking']=function(sub){
var doctors=load('doctors');
var dept=document.getElementById('dept'),doctor=document.getElementById('doctor'),date=document.getElementById('date');
var slotsBox=document.getElementById('slots'),phone=document.getElementById('pphone'),reason=document.getElementById('reason');
var TIMES=['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30'];
var selectedTime='';
document.getElementById('pname').value=user.name;
date.min=today();

var depts=[];doctors.forEach(function(d){if(depts.indexOf(d.dept)<0)depts.push(d.dept);});
dept.innerHTML='<option value="">Select department</option>'+depts.map(function(d){return '<option>'+esc(d)+'</option>';}).join('');
function fillDoctors(){
 var list=doctors.filter(function(d){return d.dept===dept.value;});
 doctor.innerHTML='<option value="">Select doctor</option>'+list.map(function(d){return '<option value="'+d.id+'">'+esc(d.name)+' ('+money(d.fee)+')</option>';}).join('');
 doctor.disabled=!dept.value;
}
function chosenDoctor(){return doctors.filter(function(d){return String(d.id)===doctor.value;})[0];}

function drawSlots(){
 var d=chosenDoctor();
 var booked=load('appointments').filter(function(a){return d&&a.doctor===d.name&&a.date===date.value&&a.status!=='Cancelled';}).map(function(a){return a.time;});
 if(booked.indexOf(selectedTime)>-1)selectedTime='';
 slotsBox.innerHTML=TIMES.map(function(t){
  var b=booked.indexOf(t)>-1;
  return '<button type="button" class="slot" data-t="'+t+'" aria-pressed="'+(t===selectedTime)+'"'+(b?' disabled':'')+'>'+t+(b?' (booked)':'')+'</button>';
 }).join('');
 summary();
}
function summary(){
 var d=chosenDoctor();
 document.getElementById('bsum').innerHTML=
  '<p>Patient: <strong>'+esc(user.name)+'</strong></p><p>Department: <strong>'+esc(dept.value||'-')+'</strong></p><p>Doctor: <strong>'+(d?esc(d.name):'-')+'</strong></p><p>Date: <strong>'+(date.value||'-')+'</strong></p><p>Time: <strong>'+(selectedTime||'-')+'</strong></p><p style="margin-top:8px">Fee: <strong>'+(d?money(d.fee):'-')+'</strong></p>';
}
dept.addEventListener('change',function(){fillDoctors();drawSlots();});
doctor.addEventListener('change',drawSlots);
date.addEventListener('change',drawSlots);
slotsBox.addEventListener('click',function(e){
 var b=e.target.closest('.slot');if(!b||b.disabled)return;
 selectedTime=b.getAttribute('data-t');fieldError('timeE','','timeE');document.getElementById('timeE').textContent='';drawSlots();
 var again=slotsBox.querySelector('[data-t="'+selectedTime+'"]');if(again)again.focus();
});

document.getElementById('bookForm').addEventListener('submit',function(e){
 e.preventDefault();
 var d=chosenDoctor();
 var r=[
  fieldError('dept',dept.value?'':'Please select a department.'),
  fieldError('doctor',d?'':'Please select a doctor.'),
  fieldError('date',!date.value?'Please select a date.':(date.value<today()?'Date cannot be in the past.':'')),
  fieldError('pphone',/^0\d{9}$/.test(phone.value.trim())?'':'Enter a 10-digit phone number starting with 0.','phoneE'),
  fieldError('reason',reason.value.trim().length<5?'Please describe your reason (at least 5 characters).':'')
 ];
 var timeOk=!!selectedTime;
 document.getElementById('timeE').textContent=timeOk?'':'Please choose a time slot.';
 if(r.indexOf(false)>-1||!timeOk){
  notify('Please fix the highlighted fields.','error');
  var bad=document.querySelector('.in.bad');if(bad)bad.focus();return;
 }
 var list=load('appointments');
 var id='BK-'+String(Date.now()).slice(-5);
 list.push({id:id,patient:user.name,doctor:d.name,dept:d.dept,date:date.value,time:selectedTime,status:'Pending',reason:reason.value.trim(),fee:d.fee,paid:false});
 save('appointments',list);
 notify('Booking confirmed. Reference '+id,'success');
 var done=document.getElementById('bdone');done.classList.remove('hide');
 done.innerHTML='<p class="b ok">Booking '+id+' saved (Pending approval)</p><p style="margin:10px 0"><a class="btn full" href="#payment/'+id+'">Pay now</a></p><p><a class="lnk" href="#dashboard">Back to dashboard</a></p>';
 selectedTime='';reason.value='';date.value='';dept.value='';fillDoctors();drawSlots();
});
fillDoctors();drawSlots();
};


/* Medical records*/
PAGES['records']=function(sub){
var rec=getRec(user.name);
var me=load('patients').filter(function(p){return p.name===user.name;})[0]||{id:'-',age:'-'};
document.getElementById('pinfo').innerHTML='<strong>'+esc(user.name)+'</strong> &middot; '+me.id+' &middot; Age '+me.age+'';
var TABS=[['overview','Overview'],['history','History'],['diagnoses','Diagnoses'],['prescriptions','Prescriptions'],['labs','Lab reports']];
var tabsBox=document.getElementById('tabs'),panel=document.getElementById('panel');
var current=TABS.some(function(t){return t[0]===sub;})?sub:'overview';

function table(head,rows){return '<div class="tw"><table><thead><tr>'+head.map(function(h){return '<th>'+h+'</th>';}).join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div>';}
var VIEWS={
 overview:function(){var d=rec.diagnoses[0];if(!d)return '<h2>Overview</h2><p>No medical records yet. Records appear here after your visits.</p>';return '<h2>Overview</h2><p>Latest diagnosis: <strong>'+esc(d.diagnosis)+'</strong> by '+esc(d.doctor)+' ('+esc(d.dept)+') on '+d.date+'.</p><p class="muted" style="margin-top:6px">'+esc(d.notes)+'</p><p style="margin-top:10px">'+rec.diagnoses.length+' diagnoses &middot; '+rec.prescriptions.length+' prescriptions &middot; '+rec.labs.length+' lab reports</p>';},
 history:function(){return '<h2>Medical history</h2><ul>'+rec.history.map(function(h){return '<li>'+esc(h)+'</li>';}).join('')+'</ul>';},
 diagnoses:function(){return '<h2>Previous diagnoses</h2>'+table(['Date','Doctor','Department','Diagnosis','Notes'],rec.diagnoses.map(function(d){return '<tr><td>'+d.date+'</td><td>'+esc(d.doctor)+'</td><td>'+esc(d.dept)+'</td><td>'+esc(d.diagnosis)+'</td><td>'+esc(d.notes)+'</td></tr>';}).join(''));},
 prescriptions:function(){return '<h2>Prescriptions</h2>'+table(['Date','Doctor','Medicine','Dose','Duration'],rec.prescriptions.map(function(p){return '<tr><td>'+p.date+'</td><td>'+esc(p.doctor)+'</td><td>'+esc(p.medicine)+'</td><td>'+esc(p.dose)+'</td><td>'+esc(p.duration)+'</td></tr>';}).join(''));},
 labs:function(){return '<h2>Laboratory reports</h2>'+table(['Date','Test','Result','Normal range','Status','Report'],rec.labs.map(function(l){return '<tr><td>'+l.date+'</td><td>'+esc(l.test)+'</td><td>'+esc(l.result)+'</td><td>'+esc(l.range)+'</td><td>'+badge(l.status)+'</td><td><button class="btn sm o" data-lab="'+l.id+'" aria-label="Download report: '+esc(l.test)+'">Download</button></td></tr>';}).join(''));}
};
function draw(){
 tabsBox.innerHTML=TABS.map(function(t){var s=t[0]===current;return '<button class="tab" role="tab" id="tab-'+t[0]+'" aria-selected="'+s+'" aria-controls="panel" tabindex="'+(s?0:-1)+'" data-k="'+t[0]+'">'+t[1]+'</button>';}).join('');
 panel.setAttribute('aria-labelledby','tab-'+current);
 panel.innerHTML=VIEWS[current]();
}
tabsBox.addEventListener('click',function(e){var b=e.target.closest('.tab');if(!b)return;current=b.getAttribute('data-k');draw();document.getElementById('tab-'+current).focus();});
tabsBox.addEventListener('keydown',function(e){
 var i=TABS.map(function(t){return t[0];}).indexOf(current);
 if(e.key==='ArrowRight')i=(i+1)%TABS.length;else if(e.key==='ArrowLeft')i=(i+TABS.length-1)%TABS.length;else return;
 e.preventDefault();current=TABS[i][0];draw();document.getElementById('tab-'+current).focus();
});
panel.addEventListener('click',function(e){
 var b=e.target.closest('[data-lab]');if(!b)return;
 var l=rec.labs.filter(function(x){return x.id===b.getAttribute('data-lab');})[0];
 var text='MediCare Hospital - Laboratory report (sample data)\nPatient: '+user.name+'\nTest: '+l.test+'\nDate: '+l.date+'\nResult: '+l.result+'\nNormal range: '+l.range+'\nStatus: '+l.status+'\n';
 var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download=l.id+'-report.txt';a.click();
 notify('Report downloaded.','success');
});
draw();
};

/* Online payment (prototype)*/
PAGES['payment']=function(sub){
var SERVICE=150;
var sel=document.getElementById('appt');
var qid=sub||null;
function unpaid(){return load('appointments').filter(function(a){return a.patient===user.name&&!a.paid&&a.status!=='Cancelled';});}
function method(){return document.querySelector('input[name=pm]:checked').value;}

function fillAppts(preselect){
 var list=unpaid();
 sel.innerHTML='<option value="">Select appointment</option>'+list.map(function(a){return '<option value="'+a.id+'">'+a.id+' - '+esc(a.doctor)+' - '+a.date+'</option>';}).join('');
 if(preselect)sel.value=preselect;
 document.getElementById('payBtn').disabled=!list.length;
 if(!list.length)document.getElementById('details').innerHTML='You have no unpaid appointments. <a class="lnk" href="#booking">Book one</a>.';
 details();
}
function current(){return unpaid().filter(function(a){return a.id===sel.value;})[0];}
function details(){
 var a=current();
 if(a)document.getElementById('details').innerHTML='<p>Patient: <strong>'+esc(user.name)+'</strong></p><p>'+esc(a.doctor)+' ('+esc(a.dept)+') on '+a.date+' at '+a.time+'</p>';
 else if(unpaid().length)document.getElementById('details').textContent='';
 document.getElementById('psum').innerHTML=a?'<table><tr><td>Consultation fee</td><td>'+money(a.fee)+'</td></tr><tr><td>Service charge</td><td>'+money(SERVICE)+'</td></tr><tr><td><strong>Total</strong></td><td><strong>'+money(a.fee+SERVICE)+'</strong></td></tr><tr><td>Method</td><td>'+esc(method())+'</td></tr></table>':'<p class="muted">Select an appointment to see the total.</p>';
}
function history(){
 var p=load('payments').filter(function(x){return x.patient===user.name;});
 document.getElementById('hist').innerHTML=p.length?p.map(function(x){return '<tr><td>'+x.id+'</td><td>'+x.date+'</td><td>'+esc(x.desc)+'</td><td>'+money(x.amount)+'</td><td>'+esc(x.method)+'</td></tr>';}).join(''):'<tr><td colspan="5">No payments yet.</td></tr>';
}
sel.addEventListener('change',details);
document.querySelectorAll('input[name=pm]').forEach(function(r){r.addEventListener('change',function(){
 document.querySelectorAll('.pm').forEach(function(l){l.classList.toggle('sel',l.querySelector('input').checked);});
 document.getElementById('cardBox').classList.toggle('hide',method()!=='Card');details();
});});
document.getElementById('cnum').addEventListener('input',function(e){e.target.value=e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 ');});
document.getElementById('cexp').addEventListener('input',function(e){var v=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=v.length>2?v.slice(0,2)+'/'+v.slice(2):v;});
document.getElementById('ccvv').addEventListener('input',function(e){e.target.value=e.target.value.replace(/\D/g,'');});

function expiryError(v){
 var m=/^(\d{2})\/(\d{2})$/.exec(v);if(!m)return 'Enter expiry as MM/YY.';
 var mm=+m[1],yy=2000+ +m[2];if(mm<1||mm>12)return 'Month must be 01 to 12.';
 var now=new Date();if(yy<now.getFullYear()||(yy===now.getFullYear()&&mm<now.getMonth()+1))return 'This card has expired.';return '';
}
document.getElementById('payForm').addEventListener('submit',function(e){
 e.preventDefault();
 var a=current();
 var r=[fieldError('appt',a?'':'Please select an appointment.')];
 var card=method()==='Card';
 if(card){
  r.push(fieldError('cname',document.getElementById('cname').value.trim().length<3?'Enter the name on the card.':''));
  r.push(fieldError('cnum',document.getElementById('cnum').value.replace(/\s/g,'').length!==16?'Enter a 16-digit card number.':''));
  r.push(fieldError('cexp',expiryError(document.getElementById('cexp').value)));
  r.push(fieldError('ccvv',/^\d{3}$/.test(document.getElementById('ccvv').value)?'':'Enter the 3-digit CVV.'));
 }
 if(r.indexOf(false)>-1){notify('Payment not completed. Please check the form.','error');var b=document.querySelector('.in.bad');if(b)b.focus();return;}
 var all=load('appointments');
 all.forEach(function(x){if(x.id===a.id)x.paid=true;});save('appointments',all);
 var pays=load('payments');var rid='RC-'+String(Date.now()).slice(-5);
 pays.push({id:rid,patient:user.name,date:today(),desc:'Consultation - '+a.dept,amount:a.fee+SERVICE,method:method()==='Card'?'Card':method(),status:'Paid'});save('payments',pays);
 notify('Payment successful. Receipt '+rid,'success');
 var done=document.getElementById('pdone');done.classList.remove('hide');
 done.innerHTML='<p class="b ok">Paid '+money(a.fee+SERVICE)+' - Receipt '+rid+'</p>';
 document.getElementById('payForm').reset();document.getElementById('cardBox').classList.remove('hide');
 document.querySelectorAll('.pm').forEach(function(l,i){l.classList.toggle('sel',i===0);});
 fillAppts('');history();
});
fillAppts(qid);history();
};

/* Administrator dashboard*/
PAGES['admin']=function(sub){
var SECTIONS=['overview','patients','doctors','appointments','records','payments','reports'];
function $(id){return document.getElementById(id);}
function rows(list,fn,cols,empty){return list.length?list.map(fn).join(''):'<tr><td colspan="'+cols+'">'+empty+'</td></tr>';}

function showSection(){
 var h=sub;if(SECTIONS.indexOf(h)<0)h='overview';
 document.querySelectorAll('[data-sec]').forEach(function(s){s.classList.toggle('hide',s.id!==h);});
 var sb=$('sidebar');if(sb)sb.classList.remove('open');
}
function statCards(box,items){$(box).innerHTML=items.map(function(s){return '<div class="card"><div class="num">'+s[0]+'</div><div class="muted">'+s[1]+'</div></div>';}).join('');}

function drawOverview(){
 var p=load('patients'),d=load('doctors'),a=load('appointments');
 statCards('stats',[[p.length,'Registered patients'],[d.length,'Doctors'],[a.length,'Total appointments'],[a.filter(function(x){return x.status==='Pending';}).length,'Pending appointments']]);
 var recent=p.slice().sort(function(x,y){return y.registered.localeCompare(x.registered);}).slice(0,4);
 $('recent').innerHTML=rows(recent,function(x){return '<tr><td>'+x.id+'</td><td>'+esc(x.name)+'</td><td>'+x.registered+'</td></tr>';},3,'No patients.');
 var by={};a.forEach(function(x){by[x.dept]=(by[x.dept]||0)+1;});
 var keys=Object.keys(by),max=Math.max.apply(null,keys.map(function(k){return by[k];}).concat([1]));
 $('chart').innerHTML='<div class="bars">'+keys.map(function(k){return '<div class="bar" style="height:'+Math.round(by[k]/max*100)+'%" title="'+esc(k)+': '+by[k]+'"></div>';}).join('')+'</div><div class="barl">'+keys.map(function(k){return '<span>'+esc(k)+'</span>';}).join('')+'</div>';
 $('chartTxt').textContent=keys.map(function(k){return k+': '+by[k];}).join(' | ');
}
function drawPatients(){
 var q=$('psearch').value.toLowerCase();
 var list=load('patients').filter(function(x){return (x.name+' '+x.id).toLowerCase().indexOf(q)>-1;});
 $('ptable').innerHTML=rows(list,function(x){return '<tr><td>'+x.id+'</td><td>'+esc(x.name)+'</td><td>'+x.age+'</td><td>'+esc(x.phone)+'</td><td>'+x.registered+'</td></tr>';},5,'No matching patients.');
}
function drawDoctors(){
 $('dtable').innerHTML=rows(load('doctors'),function(x){return '<tr><td>'+esc(x.name)+'</td><td>'+esc(x.dept)+'</td><td>'+money(x.fee)+'</td><td><button class="btn sm red" data-del="'+x.id+'" aria-label="Remove '+esc(x.name)+'">Remove</button></td></tr>';},4,'No doctors.');
}
function drawAppts(){
 var q=$('asearch').value.toLowerCase(),f=$('afilter').value;
 var list=load('appointments').filter(function(x){return (x.id+' '+x.patient+' '+x.doctor).toLowerCase().indexOf(q)>-1&&(!f||x.status===f);});
 $('atable').innerHTML=rows(list,function(x){
  var act=x.status==='Pending'?'<button class="btn sm" data-ap="'+x.id+'" aria-label="Approve appointment '+x.id+' for '+esc(x.patient)+'">Approve</button> ':'';
  if(x.status==='Pending'||x.status==='Confirmed')act+='<button class="btn sm red" data-ca="'+x.id+'" aria-label="Cancel appointment '+x.id+'">Cancel</button>';
  return '<tr><td>'+x.id+'</td><td>'+esc(x.patient)+'</td><td>'+esc(x.doctor)+'</td><td>'+x.date+'</td><td>'+x.time+'</td><td>'+badge(x.status)+'</td><td>'+(act||'-')+'</td></tr>';
 },7,'No matching appointments.');
}
function drawPayments(){
 var p=load('payments');
 $('rev').textContent='Total revenue: '+money(p.reduce(function(s,x){return s+x.amount;},0))+' from '+p.length+' payments';
 $('paytable').innerHTML=rows(p,function(x){return '<tr><td>'+x.id+'</td><td>'+esc(x.patient)+'</td><td>'+x.date+'</td><td>'+esc(x.desc)+'</td><td>'+money(x.amount)+'</td><td>'+esc(x.method)+'</td></tr>';},6,'No payments.');
}
function drawReports(){
 var a=load('appointments'),p=load('payments');
 statCards('rstats',[[a.length,'Appointments'],[load('patients').length,'Patients'],[money(p.reduce(function(s,x){return s+x.amount;},0)),'Revenue'],[a.filter(function(x){return !x.paid&&x.status!=='Cancelled';}).length,'Unpaid appointments']]);
 $('rstatus').innerHTML=['Pending','Confirmed','Completed','Cancelled'].map(function(s){return '<tr><td>'+badge(s)+'</td><td>'+a.filter(function(x){return x.status===s;}).length+'</td></tr>';}).join('');
}
function drawRecords(){
 var sel=$('rpat'),cur=sel.value;
 sel.innerHTML=load('patients').map(function(p){return '<option>'+esc(p.name)+'</option>';}).join('');if(cur)sel.value=cur;
 var r=getRec(sel.value);
 function tb(t,h,rs,c){return '<div class="card"><h2>'+t+'</h2><div class="tw"><table><thead><tr>'+h.map(function(x){return '<th>'+x+'</th>';}).join('')+'</tr></thead><tbody>'+rows(rs,function(x){return '<tr>'+x.map(function(c){return '<td>'+c+'</td>';}).join('')+'</tr>';},h.length,'None recorded.')+'</tbody></table></div></div>';}
 $('rview').innerHTML=tb('Diagnoses',['Date','Doctor','Diagnosis','Notes'],r.diagnoses.map(function(d){return [d.date,esc(d.doctor),esc(d.diagnosis),esc(d.notes)];}))+tb('Prescriptions',['Date','Medicine','Dose','Duration'],r.prescriptions.map(function(p){return [p.date,esc(p.medicine),esc(p.dose),esc(p.duration)];}))+tb('Lab reports',['Date','Test','Result','Range','Status'],r.labs.map(function(l){return [l.date,esc(l.test),esc(l.result),esc(l.range),badge(l.status)];}));
}
function drawAll(){drawRecords();drawOverview();drawPatients();drawDoctors();drawAppts();drawPayments();drawReports();}

function setStatus(id,status){var l=load('appointments');l.forEach(function(x){if(x.id===id)x.status=status;});save('appointments',l);drawAll();}
$('atable').addEventListener('click',function(e){
 var a=e.target.closest('[data-ap]'),c=e.target.closest('[data-ca]');
 if(a){setStatus(a.getAttribute('data-ap'),'Confirmed');notify('Appointment approved.','success');}
 if(c&&confirm('Cancel this appointment?')){setStatus(c.getAttribute('data-ca'),'Cancelled');notify('Appointment cancelled.','info');}
});
$('dtable').addEventListener('click',function(e){
 var b=e.target.closest('[data-del]');if(!b||!confirm('Remove this doctor?'))return;
 save('doctors',load('doctors').filter(function(x){return String(x.id)!==b.getAttribute('data-del');}));drawAll();notify('Doctor removed.','info');
});
$('docForm').addEventListener('submit',function(e){
 e.preventDefault();
 var n=$('dn').value.trim(),d=$('dd').value.trim(),f=$('df').value;
 var r=[fieldError('dn',n.length<3?'Enter the doctor name.':''),fieldError('dd',d.length<3?'Enter the department.':''),fieldError('df',(f===''||+f<0)?'Enter a valid fee.':'')];
 if(r.indexOf(false)>-1){notify('Please fix the highlighted fields.','error');return;}
 var l=load('doctors');l.push({id:Date.now(),name:n,dept:d,fee:+f});save('doctors',l);
 $('docForm').reset();drawAll();notify('Doctor added.','success');
});
$('rpat').addEventListener('change',drawRecords);
function addRec(form,checks,make,key,msg){$(form).addEventListener('submit',function(e){e.preventDefault();
 var n=$('rpat').value;if(!n){notify('Select a patient first.','error');return;}
 var r=checks.map(function(c){return fieldError(c[0],$(c[0]).value.trim()?'':c[1]);});
 if(r.indexOf(false)>-1){notify('Please fix the highlighted fields.','error');return;}
 var rec=getRec(n);rec[key].unshift(make());saveRec(n,rec);$(form).reset();drawRecords();notify(msg+' for '+n+'.','success');});}
addRec('labForm',[['lt','Enter the test name.'],['lr','Enter the result.'],['lg','Enter the normal range.']],function(){return {id:'LAB-'+String(Date.now()).slice(-5),date:today(),test:$('lt').value.trim(),result:$('lr').value.trim(),range:$('lg').value.trim(),status:$('ls').value};},'labs','Lab report added');
addRec('rxForm',[['rm','Enter the medicine.'],['rd','Enter the dose.'],['ru','Enter the duration.']],function(){return {date:today(),doctor:'Admin',medicine:$('rm').value.trim(),dose:$('rd').value.trim(),duration:$('ru').value.trim()};},'prescriptions','Prescription added');
$('psearch').addEventListener('input',drawPatients);
$('asearch').addEventListener('input',drawAppts);
$('afilter').addEventListener('change',drawAppts);
drawAll();showSection();
};

/* Start */
document.querySelectorAll('[data-page]').forEach(function(s){TPL[s.getAttribute('data-page')]=s.innerHTML;});
document.getElementById('menuBtn').onclick=function(){var o=document.getElementById('sidebar').classList.toggle('open');this.setAttribute('aria-expanded',o);};
document.getElementById('skip').onclick=function(e){e.preventDefault();(document.querySelector('#authWrap:not(.hide) [data-page]:not(.hide) main')||document.getElementById('main')).focus();};
window.addEventListener('hashchange',route);
route();
