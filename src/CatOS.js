import { useState, useEffect, useRef } from "react";

const T = {
  bg:"#ece4e7", card:"#faf7f8", cardBorder:"#e8dce0",
  rose:"#c45478", gold:"#c89830", teal:"#1a8a78",
  blue:"#3878b0", peach:"#d07840", violet:"#8a60b8",
  text:"#3a2a30", textMid:"#7a6068", textLight:"#a0909a",
  font:"'Outfit',sans-serif", accent:"'Plus Jakarta Sans',sans-serif",
};
const DOW=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MO=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FLORIDA=new Date(2026,5,28);
const DS={0:"rest",1:"home",2:"gym",3:"gym",4:"gym",5:"home",6:"gym"};
const EO=9,EC=20;
const QUOTES=["You're rebuilding from the inside out. Every rep counts.","Muscle is the organ of longevity.","Consistency beats intensity. You showed up.","Protein is your best friend right now.","Strong women lift each other — and heavy things.","Perimenopause isn't decline. It's a new strategy.","Your son is watching you prioritize yourself.","GLP-1 opened the door. Strength training walks you through it.","88oz of water. 110g of protein. One day at a time.","The woman on the other side of this is going to be unreal.","Rest days build muscle too.","Florida Cat is going to feel like a different person."];
const GR=["Upper A — Push","Lower A — Quads","Upper B — Pull","Lower B — Glutes & Hams"];
const ML={
  breakfast:[{name:"Hard Boiled Eggs (3) + Avocado",p:24,c:8,f:22,cal:330,hr:1},{name:"Brekki Bowl",p:18,c:32,f:12,cal:308,hr:1},{name:"Mush Overnight Oats",p:15,c:38,f:8,cal:280,hr:1},{name:"Protein Smoothie",p:30,c:20,f:6,cal:254,hr:0},{name:"Turkey Sausage + Egg Wrap",p:28,c:24,f:14,cal:338,hr:1},{name:"Greek Yogurt + Berries + Granola",p:20,c:35,f:8,cal:292,hr:0}],
  lunch:[{name:"Chicken + Rice Bowl",p:38,c:42,f:10,cal:410,hr:1},{name:"Mediterranean Salad + Chicken",p:34,c:18,f:16,cal:352,hr:1},{name:"Turkey Lettuce Wraps",p:30,c:12,f:14,cal:294,hr:1},{name:"Salmon + Quinoa Bowl",p:36,c:34,f:18,cal:442,hr:1},{name:"Burrito Bowl (no tortilla)",p:32,c:38,f:14,cal:406,hr:1},{name:"Tuna Salad + Crackers",p:28,c:22,f:12,cal:308,hr:0}],
  snack:[{name:"Protein Bar",p:20,c:22,f:8,cal:240,hr:0},{name:"Cottage Cheese + Fruit",p:16,c:18,f:4,cal:172,hr:0},{name:"Turkey Roll-Ups + Cheese",p:18,c:4,f:12,cal:196,hr:0},{name:"Apple + Almond Butter",p:6,c:28,f:16,cal:280,hr:0},{name:"Jerky + Almonds",p:18,c:8,f:14,cal:230,hr:0},{name:"Veggies + Hummus",p:6,c:16,f:8,cal:160,hr:0}],
  dinner:[{name:"Chicken Stir-Fry + Veggies",p:36,c:28,f:12,cal:364,hr:1},{name:"Salmon + Roasted Veggies",p:34,c:16,f:20,cal:380,hr:1},{name:"Turkey Meatballs + Zoodles",p:32,c:14,f:16,cal:328,hr:1},{name:"Shrimp Tacos (lettuce wrap)",p:28,c:12,f:14,cal:284,hr:1},{name:"Lean Beef + Sweet Potato",p:36,c:32,f:14,cal:396,hr:1},{name:"Egg Scramble + Turkey Sausage",p:30,c:8,f:18,cal:314,hr:0}],
};
const MEDS=[{id:1,name:"GLP-1 injection",time:"Weekly"},{id:2,name:"Supplements / Vitamins",time:"Morning"},{id:3,name:"Natural Vitality Calm",time:"Evening"}];
const MSESS=[{id:"breath",name:"Box Breathing",desc:"4-count inhale, hold, exhale, hold",icon:"🌬",color:T.blue,dm:5},{id:"body",name:"Body Scan",desc:"Progressive relaxation head to toe",icon:"🧘",color:T.violet,dm:10},{id:"gratitude",name:"Gratitude",desc:"Reflect on 3 things you're grateful for",icon:"🙏",color:T.gold,dm:5},{id:"calm",name:"Calm & Release",desc:"Let go of tension and thoughts",icon:"🌊",color:T.teal,dm:10},{id:"morning",name:"Morning Intention",desc:"Set your focus for the day",icon:"☀️",color:T.peach,dm:5},{id:"sleep",name:"Sleep Wind-Down",desc:"Gentle relaxation before bed",icon:"🌙",color:T.violet,dm:15}];

const init=()=>({
  waterOz:0,customChecks:{},morningChecks:{},workdayChecks:{},eveningChecks:{},prepChecks:{},medsChecks:{},
  selectedMeals:{breakfast:0,lunch:0,snack:0,dinner:0},
  goals:[{id:1,text:"Florida — June 28 🌴",progress:0,color:T.rose},{id:2,text:"Hit 135 lbs with muscle definition",progress:15,color:T.teal},{id:3,text:"Consistent morning routine streak",progress:40,color:T.gold},{id:4,text:"Protein 110g+ daily for 30 days",progress:20,color:T.peach}],
  brainDump:[],backlog:[{id:1,text:"Research collagen supplements",done:false},{id:2,text:"Update Hungryroot order",done:false}],
  schedule:{...DS},
  affirmations:["I am stronger than I was yesterday.","My body is capable of incredible things.","I deserve to feel confident and powerful.","Every healthy choice is an act of self-love.","I am building the body and life I want."],
  visionBoard:[{id:1,text:"Strong & confident in Florida",color:T.rose},{id:2,text:"Morning person energy",color:T.gold},{id:3,text:"Gym dates with my son forever",color:T.teal}],
  workoutPhase:1,workoutWeek:1,gymRotation:0,meditationLog:[],meditationStreak:0,customBlocks:[],
});

const PERSIST_KEYS = ["goals","brainDump","backlog","schedule","affirmations","visionBoard","workoutPhase","workoutWeek","gymRotation","meditationLog","meditationStreak","customBlocks"];
const STORE_KEY = "catos-v2";
const td = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return init();
    const saved = JSON.parse(raw);
    const def = init();
    if (saved._date === td()) {
      // Same day — merge everything
      return { ...def, ...saved };
    }
    // New day — keep persistent data, reset daily checks
    const merged = { ...def };
    PERSIST_KEYS.forEach(k => { if (saved[k] !== undefined) merged[k] = saved[k]; });
    return merged;
  } catch { return init(); }
}

function saveState(state) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ ...state, _date: td() })); } catch {}
}
const Card=({children,style,glow})=><div style={{background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:16,padding:20,boxShadow:glow?`0 2px 20px ${glow}20`:"0 1px 4px rgba(60,30,40,0.04)",...style}}>{children}</div>;
const SL=({children,color:c=T.rose,icon:ic})=><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14}}>{ic&&<span style={{fontSize:14}}>{ic}</span>}<span style={{fontSize:11,fontWeight:700,color:c,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:T.accent}}>{children}</span></div>;

const CB=({checked,onChange,color:c=T.rose,label,sub,onEdit,onDelete})=>{
  const[ed,setEd]=useState(false);const[ev,setEv]=useState(label);
  return <div style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",opacity:checked?0.5:1,transition:"opacity 0.3s"}}>
    <div onClick={onChange} style={{width:22,height:22,borderRadius:7,flexShrink:0,border:`2px solid ${checked?c:T.cardBorder}`,background:checked?c+"18":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{checked&&<span style={{color:c,fontSize:13,fontWeight:700}}>✓</span>}</div>
    <div style={{flex:1}}>{ed?<div style={{display:"flex",gap:6}}>
      <input value={ev} onChange={e=>setEv(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){onEdit(ev);setEd(false);}if(e.key==="Escape")setEd(false);}} autoFocus style={{flex:1,background:T.bg,border:`1px solid ${c}40`,borderRadius:6,padding:"4px 8px",fontSize:13,fontFamily:T.font,color:T.text,outline:"none"}}/>
      <button onClick={()=>{onEdit(ev);setEd(false);}} style={{background:c,color:"#fff",border:"none",borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>Save</button>
    </div>:<div><span style={{fontSize:14,color:T.text,textDecoration:checked?"line-through":"none",fontFamily:T.font}}>{label}</span>{sub&&<div style={{fontSize:11,color:T.textLight,marginTop:1}}>{sub}</div>}</div>}</div>
    {(onEdit||onDelete)&&!ed&&<div style={{display:"flex",gap:4,flexShrink:0}}>
      {onEdit&&<button onClick={()=>{setEv(label);setEd(true);}} style={{background:"none",border:"none",color:T.textLight,cursor:"pointer",padding:"2px 4px"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>}
      {onDelete&&<button onClick={onDelete} style={{background:"none",border:"none",color:T.textLight,cursor:"pointer",padding:"2px 4px"}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg></button>}
    </div>}
  </div>;
};

const Ring=({pct,size:s=52,stroke:w=5,color:c=T.rose})=>{const r=(s-w)/2,ci=2*Math.PI*r;return <svg width={s} height={s} style={{transform:"rotate(-90deg)"}}><circle cx={s/2} cy={s/2} r={r} fill="none" stroke={T.cardBorder} strokeWidth={w}/><circle cx={s/2} cy={s/2} r={r} fill="none" stroke={c} strokeWidth={w} strokeDasharray={ci} strokeDashoffset={ci-(pct/100)*ci} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.6s ease"}}/></svg>;};
const Badge=({children,color:c=T.rose})=><span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,background:c+"15",color:c,fontSize:11,fontWeight:600,fontFamily:T.accent}}>{children}</span>;
const Btn=({children,onClick,color:c=T.rose,small,outline,style:sx})=><button onClick={onClick} style={{background:outline?"transparent":c,color:outline?c:"#fff",border:outline?`1.5px solid ${c}`:"none",borderRadius:10,padding:small?"6px 12px":"10px 20px",fontSize:small?12:13,fontWeight:600,cursor:"pointer",fontFamily:T.font,...sx}}>{children}</button>;

const MicInput=({value,onChange,onSubmit,placeholder,color:c=T.rose})=>{
  const[rec,setRec]=useState(false);const ref=useRef(null);
  const toggle=()=>{if(rec){ref.current?.stop();setRec(false);return;}const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;const r=new SR();r.continuous=false;r.interimResults=true;r.lang="en-US";r.onresult=e=>{let t="";for(let i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;onChange(t);};r.onerror=()=>setRec(false);r.onend=()=>setRec(false);r.start();ref.current=r;setRec(true);};
  return <div style={{display:"flex",gap:8,alignItems:"center"}}>
    <div style={{flex:1,position:"relative"}}>
      <input value={value} onChange={e=>onChange(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onSubmit()} placeholder={placeholder} style={{width:"100%",background:T.bg,border:`1px solid ${rec?c+"60":T.cardBorder}`,borderRadius:8,padding:"8px 40px 8px 12px",fontSize:13,fontFamily:T.font,color:T.text,outline:"none",boxSizing:"border-box"}}/>
      <button onClick={toggle} style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",width:28,height:28,borderRadius:14,background:rec?c+"18":"transparent",border:`1px solid ${rec?c:T.cardBorder}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={rec?c:T.textLight} strokeWidth="2" strokeLinecap="round"><rect x="9" y="1" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 01-14 0v-1"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      </button>
    </div>
    <Btn small color={c} onClick={onSubmit}>+</Btn>
  </div>;
};

const CBA=({onAdd})=>{const[v,setV]=useState("");const[r,setR]=useState("daily");const[open,setOpen]=useState(false);
  const go=()=>{if(v.trim()){onAdd(v.trim(),r);setV("");setOpen(false);}};
  if(!open)return <button onClick={()=>setOpen(true)} style={{marginTop:8,background:"none",border:`1.5px dashed ${T.cardBorder}`,borderRadius:10,padding:"10px 16px",color:T.textMid,fontSize:12,cursor:"pointer",fontFamily:T.font,width:"100%"}}>+ Add custom block</button>;
  return <div style={{marginTop:10,padding:14,background:T.bg,borderRadius:12,border:`1px solid ${T.cardBorder}`}}>
    <input value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="What do you want to track?" autoFocus style={{width:"100%",background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:8,padding:"8px 12px",fontSize:13,fontFamily:T.font,color:T.text,outline:"none",marginBottom:10,boxSizing:"border-box"}}/>
    <div style={{fontSize:11,color:T.textMid,marginBottom:6}}>Recurrence</div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{["daily","weekdays","weekends","one-time"].map(x=><div key={x} onClick={()=>setR(x)} style={{padding:"4px 10px",borderRadius:16,fontSize:11,fontWeight:600,cursor:"pointer",background:r===x?T.violet+"18":"transparent",border:`1px solid ${r===x?T.violet:T.cardBorder}`,color:r===x?T.violet:T.textMid,textTransform:"capitalize"}}>{x}</div>)}</div>
    <div style={{display:"flex",gap:8}}><Btn small color={T.violet} onClick={go}>Add</Btn><Btn small outline color={T.textLight} onClick={()=>setOpen(false)}>Cancel</Btn></div>
  </div>;
};

// Helpers
function useNow(ms=60000){const[n,setN]=useState(new Date());useEffect(()=>{const t=setInterval(()=>setN(new Date()),ms);return()=>clearInterval(t);},[ms]);return n;}
const dayType=s=>s[new Date().getDay()]||"rest";
const flDays=()=>Math.max(0,Math.ceil((FLORIDA-new Date())/86400000));
const fastSt=d=>{const h=d.getHours()+d.getMinutes()/60;if(h>=EO&&h<EC){const m=Math.round((EC-h)*60);return{open:true,label:"Eating Window Open",sub:`Closes in ${Math.floor(m/60)}h ${m%60}m`};}const m=Math.round(h<EO?(EO-h)*60:(24-h+EO)*60);return{open:false,label:"Fasting",sub:`Opens in ${Math.floor(m/60)}h ${m%60}m`};};
const pct=st=>{const ch=[st.morningChecks,st.workdayChecks,st.eveningChecks,st.prepChecks,st.medsChecks];const cn=[6,3,6,4,3];let t=0,d=0;ch.forEach((c,i)=>{t+=cn[i];d+=Object.values(c).filter(Boolean).length;});return t?Math.round(d/t*100):0;};

// Meditation Timer
function MedTimer({session:s,onClose,onDone}){
  const[mins,setMins]=useState(s.dm);const[run,setRun]=useState(false);const[sec,setSec]=useState(0);const[started,setStarted]=useState(false);const ref=useRef(null);const tot=mins*60;
  useEffect(()=>{if(run){ref.current=setInterval(()=>setSec(p=>{if(p+1>=tot){clearInterval(ref.current);setRun(false);onDone(s.id,mins);return tot;}return p+1;}),1000);}return()=>clearInterval(ref.current);},[run,tot]);
  const rm=tot-sec,rmi=Math.floor(rm/60),rse=rm%60,done=sec>=tot;
  return <div style={{position:"fixed",inset:0,background:"rgba(60,30,40,0.5)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{background:T.card,borderRadius:24,padding:32,maxWidth:340,width:"100%",textAlign:"center"}}>
      <div style={{fontSize:32,marginBottom:8}}>{s.icon}</div>
      <div style={{fontSize:18,fontWeight:600,color:T.text,marginBottom:4}}>{s.name}</div>
      <div style={{fontSize:12,color:T.textLight,marginBottom:24}}>{s.desc}</div>
      {!started?<div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20}}>{[5,10,15,20].map(m=><div key={m} onClick={()=>setMins(m)} style={{width:44,height:44,borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",background:mins===m?s.color+"18":"transparent",border:`2px solid ${mins===m?s.color:T.cardBorder}`,color:mins===m?s.color:T.textMid,fontSize:15,fontWeight:700,fontFamily:T.accent,cursor:"pointer"}}>{m}</div>)}</div>
        <Btn color={s.color} onClick={()=>{setStarted(true);setRun(true);}}>Begin</Btn>
        <div style={{marginTop:12}}><button onClick={onClose} style={{background:"none",border:"none",color:T.textLight,fontSize:12,cursor:"pointer"}}>Cancel</button></div>
      </div>:<div>
        <div style={{position:"relative",width:120,height:120,margin:"0 auto 20px"}}><Ring pct={tot?sec/tot*100:0} size={120} stroke={8} color={s.color}/><div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:28,fontWeight:700,color:done?s.color:T.text,fontFamily:T.accent}}>{done?"✓":`${rmi}:${String(rse).padStart(2,"0")}`}</div></div></div>
        {!done&&<div style={{display:"flex",gap:10,justifyContent:"center"}}><Btn small outline color={s.color} onClick={()=>setRun(!run)}>{run?"Pause":"Resume"}</Btn><Btn small outline color={T.textLight} onClick={()=>{clearInterval(ref.current);onClose();}}>End</Btn></div>}
        {done&&<div><div style={{fontSize:14,color:s.color,fontWeight:600,marginBottom:16}}>Beautiful. {mins} minutes of calm.</div><Btn color={s.color} onClick={onClose}>Done</Btn></div>}
      </div>}
    </div>
  </div>;
}

// TODAY TAB
function Today({st,set}){
  const n=useNow(30000);const dt=dayType(st.schedule);const fast=fastSt(n);const cp=pct(st);const q=QUOTES[n.getDate()%QUOTES.length];const aff=st.affirmations[n.getDate()%st.affirmations.length]||"";
  const tog=(s,k)=>set(p=>({...p,[s]:{...p[s],[k]:!p[s]?.[k]}}));
  const wp=Math.min(100,Math.round(st.waterOz/88*100));
  const wk=dt==="gym"?`Gym → ${GR[st.gymRotation%4]}`:dt==="home"?"Home → Bodyweight + Yoga":"Rest Day 🧘";
  const ms=st.selectedMeals;const tP=Object.entries(ms).reduce((s,[sl,i])=>s+(ML[sl]?.[i]?.p||0),0);const tC=Object.entries(ms).reduce((s,[sl,i])=>s+(ML[sl]?.[i]?.cal||0),0);
  const[blV,setBlV]=useState("");const addBl=()=>{if(blV.trim()){set(p=>({...p,backlog:[...p.backlog,{id:Date.now(),text:blV.trim(),done:false}]}));setBlV("");}};

  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card glow={T.rose}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{flex:1}}>
        <div style={{fontSize:11,color:T.textLight,fontFamily:T.accent,letterSpacing:"0.06em",textTransform:"uppercase"}}>{DOW[n.getDay()]} · {MO[n.getMonth()]} {n.getDate()}, {n.getFullYear()}</div>
        <h1 style={{fontSize:24,fontWeight:600,color:T.text,margin:"6px 0 2px",fontFamily:T.font}}>Good {n.getHours()<12?"morning":n.getHours()<17?"afternoon":"evening"}, Cat ☀️</h1>
        <div style={{fontSize:13,color:T.textMid,margin:"4px 0 10px",lineHeight:1.5}}>{dt==="gym"?`Gym day with your son — ${wk.split("→ ")[1]}`:dt==="home"?"Home workout — bodyweight + yoga":"Rest & prep day"}</div>
        <div style={{fontSize:13,color:T.rose,fontStyle:"italic"}}>"{q}"</div>
      </div>
      <div style={{textAlign:"center",flexShrink:0,marginLeft:16,position:"relative"}}><Ring pct={cp} size={56} color={T.rose}/><div style={{position:"absolute",top:13,left:0,right:0,textAlign:"center"}}><div style={{fontSize:15,fontWeight:700,color:T.rose,fontFamily:T.accent}}>{cp}%</div><div style={{fontSize:8,color:T.textLight}}>today</div></div></div>
    </div></Card>

    <Card style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:14,background:fast.open?"#f0faf6":T.card,borderColor:fast.open?T.teal+"40":T.cardBorder}}>
      <div style={{width:10,height:10,borderRadius:5,background:fast.open?T.teal:T.textLight,boxShadow:fast.open?`0 0 8px ${T.teal}60`:"none"}}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:fast.open?T.teal:T.textMid}}>{fast.label}</div><div style={{fontSize:11,color:T.textLight}}>{fast.sub} · 9AM–8PM</div></div><span style={{fontSize:11}}>{fast.open?"🟢":"🔴"}</span>
    </Card>

    {aff&&<Card style={{padding:"14px 20px",textAlign:"center",background:T.rose+"08",borderColor:T.rose+"20"}}><div style={{fontSize:13,color:T.rose,fontWeight:500,fontStyle:"italic"}}>✨ {aff}</div></Card>}

    <Card><SL icon="🌅" color={T.gold}>Morning Routine</SL>
      {[{k:"m1",l:"Let Luna out, feed Luna, start coffee ☕",s:"6:30 AM"},{k:"m2",l:"Water + sunlight",s:"6:30 AM"},{k:"m3",l:"Get ready",s:"6:45–8:05 AM"},{k:"m4",l:"Pack gym bag",s:"8:05 AM"},{k:"m5",l:"Grab gym bag + breakfast",s:"8:10 AM"},{k:"m6",l:"Out the door 🚗",s:"8:20 AM"}].map(i=><CB key={i.k} label={i.l} sub={i.s} color={T.gold} checked={!!st.morningChecks[i.k]} onChange={()=>tog("morningChecks",i.k)}/>)}
    </Card>

    <Card><SL icon="💼" color={T.peach}>Workday</SL>
      {[{k:"w1",l:"Break fast — breakfast at desk",s:"9:00 AM"},{k:"w2",l:"Lunch",s:"12:00 PM"},{k:"w3",l:"Afternoon snack",s:"3:00 PM"}].map(i=><CB key={i.k} label={i.l} sub={i.s} color={T.peach} checked={!!st.workdayChecks[i.k]} onChange={()=>tog("workdayChecks",i.k)}/>)}
    </Card>

    <Card><SL icon="💧" color={T.blue}>{"Water · "+st.waterOz+" / 88 oz"}</SL>
      <div style={{height:8,background:T.blue+"15",borderRadius:4,overflow:"hidden",marginBottom:14}}><div style={{height:"100%",width:`${wp}%`,background:T.blue,borderRadius:4,transition:"width 0.4s"}}/></div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{[{l:"Owala 24oz",o:24},{l:"Bottle 16.9oz",o:16.9},{l:"Glass 8oz",o:8},{l:"Undo",o:-8}].map(w=><Btn key={w.l} small outline={w.o<0} color={T.blue} onClick={()=>set(p=>({...p,waterOz:Math.max(0,p.waterOz+w.o)}))}>{w.l}</Btn>)}</div>
      <div style={{fontSize:11,color:T.textLight,marginTop:10}}>{wp>=100?"🎉 Goal hit!":`${Math.round(88-st.waterOz)}oz to go`}</div>
    </Card>

    <Card><SL icon="🍽" color={T.peach}>Nutrition Snapshot</SL>
      <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:10}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:T.teal,fontFamily:T.accent}}>{tP}g</div><div style={{fontSize:10,color:T.textLight}}>Protein</div></div>
        <div style={{flex:1}}><div style={{height:6,background:T.teal+"15",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,tP/120*100)}%`,background:T.teal,borderRadius:3}}/></div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:600,color:T.textMid,fontFamily:T.accent}}>{tC}</div><div style={{fontSize:10,color:T.textLight}}>cal</div></div>
      </div>
    </Card>

    <Card style={{background:dt==="rest"?T.card:dt==="gym"?"#f0faf6":"#faf5f0",borderColor:dt==="gym"?T.teal+"30":dt==="home"?T.gold+"30":T.cardBorder}}>
      <SL icon="🏋️" color={dt==="gym"?T.teal:dt==="home"?T.gold:T.textLight}>{dt==="gym"?"Gym with Son":dt==="home"?"Home Workout":"Rest Day"}</SL>
      <div style={{fontSize:15,fontWeight:600,color:T.text}}>{wk}</div>
      <div style={{fontSize:11,color:T.textLight,fontFamily:T.accent}}>Phase {st.workoutPhase} · Week {st.workoutWeek}</div>
    </Card>

    <Card><SL icon="🌙" color={T.violet}>Evening Routine</SL>
      {[{k:"e1",l:"Dinner — last meal before 8 PM",s:"7:15 PM"},{k:"e2",l:dt==="gym"?"Foam roll":"Stretch / mobility"},{k:"e3",l:"Skincare routine"},{k:"e4",l:"Light mask"},{k:"e5",l:n.getDay()===0||n.getDay()===6?"Vodkarita 🍹":"Calm + sparkling water",s:n.getDay()===0||n.getDay()===6?"Guilt-free":"Raspberry lemon"},{k:"e6",l:"Brain dump"}].map(i=><CB key={i.k} label={i.l} sub={i.s} color={T.violet} checked={!!st.eveningChecks[i.k]} onChange={()=>tog("eveningChecks",i.k)}/>)}
    </Card>

    <Card><SL icon="📦" color={T.rose}>Evening Prep</SL>
      {[{k:"p1",l:"Prep food for tomorrow"},{k:"p2",l:"Pack gym bag"},{k:"p3",l:"Lay out clothes"},{k:"p4",l:"Set alarm + charger"}].map(i=><CB key={i.k} label={i.l} color={T.rose} checked={!!st.prepChecks[i.k]} onChange={()=>tog("prepChecks",i.k)}/>)}
    </Card>

    <Card><SL icon="💊" color={T.violet}>Medications</SL>
      {MEDS.map(m=><CB key={m.id} label={m.name} sub={m.time} color={T.violet} checked={!!st.medsChecks[m.id]} onChange={()=>tog("medsChecks",m.id)}/>)}
    </Card>

    <Card><SL icon="📋" color={T.textMid}>Backlog</SL>
      {st.backlog.map(b=><CB key={b.id} label={b.text} color={T.rose} checked={b.done} onChange={()=>set(p=>({...p,backlog:p.backlog.map(x=>x.id===b.id?{...x,done:!x.done}:x)}))} onEdit={t=>set(p=>({...p,backlog:p.backlog.map(x=>x.id===b.id?{...x,text:t}:x)}))} onDelete={()=>set(p=>({...p,backlog:p.backlog.filter(x=>x.id!==b.id)}))}/>)}
      <MicInput value={blV} onChange={setBlV} onSubmit={addBl} placeholder="Add to backlog..." color={T.rose}/>
    </Card>

    <Card><SL icon="✚" color={T.violet}>Custom Blocks</SL>
      {st.customBlocks.length===0&&<div style={{fontSize:12,color:T.textLight,fontStyle:"italic",marginBottom:8}}>Add your own tasks or habits</div>}
      {st.customBlocks.map(b=><CB key={b.id} label={b.text} sub={b.rec!=="daily"?b.rec:undefined} color={T.violet} checked={!!st.customChecks?.[b.id]} onChange={()=>set(p=>({...p,customChecks:{...p.customChecks,[b.id]:!p.customChecks?.[b.id]}}))} onEdit={t=>set(p=>({...p,customBlocks:p.customBlocks.map(x=>x.id===b.id?{...x,text:t}:x)}))} onDelete={()=>set(p=>({...p,customBlocks:p.customBlocks.filter(x=>x.id!==b.id)}))}/>)}
      <CBA onAdd={(t,r)=>set(p=>({...p,customBlocks:[...p.customBlocks,{id:Date.now(),text:t,rec:r}]}))}/>
    </Card>
  </div>;
}

// WEEK TAB
function Week({st}){
  const n=new Date(),s=new Date(n);s.setDate(n.getDate()-n.getDay());
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card><SL icon="📅" color={T.rose}>This Week</SL>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>{DOW.map((d,i)=>{const dt=new Date(s);dt.setDate(s.getDate()+i);const isT=dt.toDateString()===n.toDateString();const tp=st.schedule[i]||"rest";const c=tp==="gym"?T.teal:tp==="home"?T.gold:T.textLight;
        return <div key={i} style={{textAlign:"center",padding:"12px 2px",borderRadius:12,background:isT?T.rose+"12":"transparent",border:isT?`2px solid ${T.rose}40`:"2px solid transparent"}}><div style={{fontSize:10,fontWeight:700,color:isT?T.rose:T.textMid,fontFamily:T.accent}}>{d}</div><div style={{fontSize:16,fontWeight:700,color:isT?T.rose:T.text,margin:"4px 0",fontFamily:T.accent}}>{dt.getDate()}</div><div style={{fontSize:9,fontWeight:700,color:c,textTransform:"uppercase",fontFamily:T.accent}}>{tp}</div></div>;})}</div>
    </Card>
    <Card><SL icon="💪" color={T.teal}>Workout Program</SL>
      <div style={{display:"flex",gap:10}}>{[1,2,3].map(p=><div key={p} style={{flex:1,padding:14,borderRadius:12,textAlign:"center",background:st.workoutPhase===p?T.teal+"12":T.bg,border:`1.5px solid ${st.workoutPhase===p?T.teal+"40":T.cardBorder}`}}><div style={{fontSize:12,fontWeight:700,color:st.workoutPhase===p?T.teal:T.textMid}}>Phase {p}</div><div style={{fontSize:10,color:T.textLight,marginTop:2}}>{p===1?"Foundation · 3×12":p===2?"Build · 4×8-10":"Define · 4×6-8"}</div></div>)}</div>
      <div style={{fontSize:11,color:T.textLight,marginTop:12,fontFamily:T.accent}}>Week {st.workoutWeek} of 4</div>
    </Card>
    <Card><SL icon="🔄" color={T.teal}>Gym Rotation</SL>
      {GR.map((w,i)=><div key={i} style={{padding:"10px 14px",borderRadius:10,marginBottom:6,background:st.gymRotation%4===i?T.teal+"10":"transparent",border:`1px solid ${st.gymRotation%4===i?T.teal+"30":"transparent"}`,display:"flex",alignItems:"center",gap:10}}><div style={{width:8,height:8,borderRadius:4,background:st.gymRotation%4===i?T.teal:T.cardBorder}}/><span style={{fontSize:13,color:T.text,flex:1}}>{w}</span>{st.gymRotation%4===i&&<Badge color={T.teal}>Next</Badge>}</div>)}
    </Card>
    <Card><SL icon="🎯" color={T.rose}>Goals</SL>
      {st.goals.map(g=><div key={g.id} style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}><Ring pct={g.progress} size={44} stroke={4} color={g.color}/><div><div style={{fontSize:13,fontWeight:500,color:T.text}}>{g.text}</div><div style={{fontSize:18,fontWeight:700,color:g.color,fontFamily:T.accent}}>{g.progress}%</div></div></div>)}
    </Card>
  </div>;
}

// MEALS TAB
function Meals({st,set}){
  const slots=["breakfast","lunch","snack","dinner"];const lb={breakfast:"🥚 Breakfast · 9AM",lunch:"🥗 Lunch · 12PM",snack:"🍎 Snack · 3PM",dinner:"🍽 Dinner · 7:15PM"};const cl={breakfast:T.gold,lunch:T.teal,snack:T.peach,dinner:T.violet};
  const tP=slots.reduce((s,sl)=>s+(ML[sl]?.[st.selectedMeals[sl]]?.p||0),0);const tC=slots.reduce((s,sl)=>s+(ML[sl]?.[st.selectedMeals[sl]]?.c||0),0);const tF=slots.reduce((s,sl)=>s+(ML[sl]?.[st.selectedMeals[sl]]?.f||0),0);const tCal=slots.reduce((s,sl)=>s+(ML[sl]?.[st.selectedMeals[sl]]?.cal||0),0);
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card glow={T.teal}><SL icon="📊" color={T.teal}>Daily Macros</SL>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:14}}>{[{l:"Protein",v:`${tP}g`,c:T.teal},{l:"Carbs",v:`${tC}g`,c:T.gold},{l:"Fat",v:`${tF}g`,c:T.peach},{l:"Calories",v:`${tCal}`,c:T.rose}].map((m,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontSize:20,fontWeight:700,color:m.c,fontFamily:T.accent}}>{m.v}</div><div style={{fontSize:10,color:T.textLight,textTransform:"uppercase"}}>{m.l}</div></div>)}</div>
      <div style={{height:6,background:T.teal+"15",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,tP/120*100)}%`,background:T.teal,borderRadius:3}}/></div>
      <div style={{fontSize:11,color:T.textLight,marginTop:6}}>{tP>=110?"🎉 Protein goal hit!":`${110-tP}g to go`}</div>
    </Card>
    {slots.map(slot=>{const ml=ML[slot],sel=st.selectedMeals[slot]||0;return <Card key={slot}><SL color={cl[slot]}>{lb[slot]}</SL>
      {ml.map((m,i)=><div key={i} onClick={()=>set(p=>({...p,selectedMeals:{...p.selectedMeals,[slot]:i}}))} style={{padding:"12px 14px",borderRadius:10,cursor:"pointer",background:sel===i?cl[slot]+"10":"transparent",border:`1.5px solid ${sel===i?cl[slot]+"40":T.cardBorder}`,display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
        <div style={{width:16,height:16,borderRadius:8,border:`2px solid ${sel===i?cl[slot]:T.cardBorder}`,background:sel===i?cl[slot]:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel===i&&<div style={{width:6,height:6,borderRadius:3,background:"#fff"}}/>}</div>
        <div style={{flex:1,fontSize:13,color:T.text,fontWeight:sel===i?600:400}}>{m.hr?<span style={{marginRight:6}}>🟣</span>:null}{m.name}</div>
        <div style={{display:"flex",gap:8,fontSize:11,fontFamily:T.accent,color:T.textLight}}><span style={{color:T.teal}}>{m.p}p</span><span>{m.c}c</span><span>{m.f}f</span><span style={{color:T.textMid}}>{m.cal}</span></div>
      </div>)}
    </Card>;})}
    <Card style={{background:"#f5f0fa",borderColor:T.violet+"30"}}><SL icon="🟣" color={T.violet}>Hungryroot Cheat Sheet</SL>
      <div style={{fontSize:12,color:T.textMid,lineHeight:1.8}}>{slots.map(sl=>{const hr=ML[sl].filter(m=>m.hr);return hr.length?<div key={sl} style={{marginBottom:4}}><span style={{fontWeight:600,textTransform:"capitalize"}}>{sl}:</span> {hr.map(m=>m.name).join(" · ")}</div>:null;})}</div>
    </Card>
  </div>;
}

// MORE TAB
function More({st,set}){
  const[di,setDi]=useState("");const[gi,setGi]=useState("");const[ai,setAi]=useState("");const[vi,setVi]=useState("");const[vc,setVc]=useState(T.rose);const[vu,setVu]=useState("");const[vuc,setVuc]=useState("");const fr=useRef(null);const[as,setAs]=useState(null);
  const addD=()=>{if(!di.trim())return;set(p=>({...p,brainDump:[{id:Date.now(),text:di.trim(),ts:new Date().toLocaleString()},...p.brainDump]}));setDi("");};
  const addG=()=>{if(!gi.trim())return;const cols=[T.rose,T.teal,T.gold,T.blue,T.violet,T.peach];set(p=>({...p,goals:[...p.goals,{id:Date.now(),text:gi.trim(),progress:0,color:cols[p.goals.length%cols.length]}]}));setGi("");};
  const addA=()=>{if(!ai.trim())return;set(p=>({...p,affirmations:[...p.affirmations,ai.trim()]}));setAi("");};
  const addV=()=>{if(!vi.trim())return;set(p=>({...p,visionBoard:[...p.visionBoard,{id:Date.now(),text:vi.trim(),color:vc}]}));setVi("");};
  const addVImg=()=>{if(!vu.trim())return;set(p=>({...p,visionBoard:[...p.visionBoard,{id:Date.now(),text:vuc.trim(),img:vu.trim(),color:T.rose}]}));setVu("");setVuc("");};

  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    {as&&<MedTimer session={as} onClose={()=>setAs(null)} onDone={(id,m)=>set(p=>({...p,meditationLog:[...p.meditationLog,{id:Date.now(),sid:id,mins:m}],meditationStreak:(p.meditationStreak||0)+1}))}/>}

    <Card glow={T.violet}><SL icon="🧘" color={T.violet}>Meditation</SL>
      <div style={{fontSize:12,color:T.textMid,marginBottom:16}}>Streak: <span style={{fontWeight:700,color:T.violet,fontFamily:T.accent}}>{st.meditationStreak||0}</span> sessions</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{MSESS.map(s=><div key={s.id} onClick={()=>setAs(s)} style={{padding:16,borderRadius:14,cursor:"pointer",background:s.color+"08",border:`1.5px solid ${s.color}25`}}>
        <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div><div style={{fontSize:13,fontWeight:600,color:T.text}}>{s.name}</div><div style={{fontSize:11,color:T.textLight,marginTop:2}}>{s.desc}</div><div style={{fontSize:10,color:s.color,fontFamily:T.accent,marginTop:6,fontWeight:600}}>{s.dm} min</div>
      </div>)}</div>
    </Card>

    <Card><SL icon="🎯" color={T.rose}>Vision Board</SL>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>{st.visionBoard.map(v=><div key={v.id} style={{borderRadius:14,background:v.img?"transparent":v.color+"12",border:`1.5px solid ${v.img?"transparent":v.color+"30"}`,position:"relative",minHeight:v.img?120:80,display:"flex",alignItems:"flex-end",justifyContent:"center",textAlign:"center",overflow:"hidden"}}>
        {v.img&&<img src={v.img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0,borderRadius:13}}/>}
        {v.img&&<div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)",borderRadius:13}}/>}
        {v.text&&<div style={{position:"relative",zIndex:1,padding:"12px 10px",fontSize:13,fontWeight:700,color:v.img?"#fff":v.color,lineHeight:1.4}}>{v.text}</div>}
        <button onClick={()=>set(p=>({...p,visionBoard:p.visionBoard.filter(x=>x.id!==v.id)}))} style={{position:"absolute",top:6,right:8,background:"rgba(0,0,0,0.3)",border:"none",color:"#fff",cursor:"pointer",width:22,height:22,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,fontSize:11}}>×</button>
      </div>)}</div>
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
        <input value={vi} onChange={e=>setVi(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addV()} placeholder="Add text card..." style={{flex:1,background:T.bg,border:`1px solid ${T.cardBorder}`,borderRadius:8,padding:"8px 12px",fontSize:13,fontFamily:T.font,color:T.text,outline:"none"}}/>
        <div style={{display:"flex",gap:3}}>{[T.rose,T.teal,T.gold,T.violet,T.blue].map(c=><div key={c} onClick={()=>setVc(c)} style={{width:18,height:18,borderRadius:9,background:c,cursor:"pointer",border:vc===c?`2px solid ${T.text}`:"2px solid transparent"}}/>)}</div>
        <Btn small onClick={addV}>+</Btn>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}><input value={vu} onChange={e=>setVu(e.target.value)} placeholder="Image URL..." style={{flex:1,background:T.bg,border:`1px solid ${T.cardBorder}`,borderRadius:8,padding:"8px 12px",fontSize:12,fontFamily:T.font,color:T.text,outline:"none"}}/><Btn small onClick={addVImg}>+</Btn></div>
      <input value={vuc} onChange={e=>setVuc(e.target.value)} placeholder="Caption (optional)" style={{width:"100%",background:T.bg,border:`1px solid ${T.cardBorder}`,borderRadius:8,padding:"8px 12px",fontSize:12,fontFamily:T.font,color:T.text,outline:"none",marginTop:6,boxSizing:"border-box"}}/>
    </Card>

    <Card><SL icon="🎯" color={T.rose}>Goals</SL>
      {st.goals.map(g=><div key={g.id} style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
        <Ring pct={g.progress} size={48} stroke={4} color={g.color}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:T.text}}>{g.text}</div><div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><span style={{fontSize:18,fontWeight:700,color:g.color,fontFamily:T.accent}}>{g.progress}%</span>
        <button onClick={()=>set(p=>({...p,goals:p.goals.map(x=>x.id===g.id?{...x,progress:Math.max(0,x.progress-5)}:x)}))} style={{background:T.bg,border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",color:T.textMid,fontSize:16}}>−</button>
        <button onClick={()=>set(p=>({...p,goals:p.goals.map(x=>x.id===g.id?{...x,progress:Math.min(100,x.progress+5)}:x)}))} style={{background:T.bg,border:"none",borderRadius:6,width:26,height:26,cursor:"pointer",color:T.textMid,fontSize:16}}>+</button>
        <button onClick={()=>set(p=>({...p,goals:p.goals.filter(x=>x.id!==g.id)}))} style={{background:"none",border:"none",color:T.textLight,cursor:"pointer",fontSize:14,marginLeft:"auto"}}>×</button></div></div>
      </div>)}
      <MicInput value={gi} onChange={setGi} onSubmit={addG} placeholder="Add a goal..." color={T.rose}/>
    </Card>

    <Card><SL icon="🧠" color={T.violet}>Brain Dump</SL>
      <MicInput value={di} onChange={setDi} onSubmit={addD} placeholder="What's on your mind..." color={T.violet}/>
      <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:8}}>{st.brainDump.map(b=><div key={b.id} style={{padding:12,background:T.bg,borderRadius:10,border:`1px solid ${T.cardBorder}`,display:"flex",gap:12,alignItems:"flex-start"}}>
        <div style={{flex:1}}><div style={{fontSize:10,color:T.textLight,fontFamily:T.accent,marginBottom:4}}>{b.ts}</div><div style={{fontSize:13,color:T.text,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{b.text}</div></div>
        <button onClick={()=>set(p=>({...p,brainDump:p.brainDump.filter(x=>x.id!==b.id)}))} style={{background:T.rose+"10",border:`1px solid ${T.rose}25`,borderRadius:8,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.rose,fontSize:14,flexShrink:0}}>×</button>
      </div>)}{st.brainDump.length===0&&<div style={{textAlign:"center",padding:20,color:T.textLight,fontSize:13,fontStyle:"italic"}}>Brain's clear ✨</div>}</div>
    </Card>

    <Card><SL icon="✨" color={T.rose}>Affirmations</SL>
      {st.affirmations.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderTop:i>0?`1px solid ${T.cardBorder}`:"none"}}><span style={{fontSize:13,color:T.rose}}>♡</span><span style={{flex:1,fontSize:13,color:T.text,fontStyle:"italic"}}>{a}</span><button onClick={()=>set(p=>({...p,affirmations:p.affirmations.filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:T.textLight,cursor:"pointer",fontSize:13}}>×</button></div>)}
      <MicInput value={ai} onChange={setAi} onSubmit={addA} placeholder="Add affirmation..." color={T.rose}/>
    </Card>
  </div>;
}

// SETTINGS TAB
function Settings({st,set}){
  const dts=["gym","home","rest"],dtc={gym:T.teal,home:T.gold,rest:T.textLight};
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card><SL icon="📅" color={T.rose}>Weekly Schedule</SL>
      <div style={{fontSize:12,color:T.textMid,marginBottom:14}}>Tap to cycle: gym → home → rest</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>{DOW.map((d,i)=>{const tp=st.schedule[i];return <div key={i} onClick={()=>{const nx=dts[(dts.indexOf(tp)+1)%3];set(p=>({...p,schedule:{...p.schedule,[i]:nx}}));}} style={{textAlign:"center",padding:"14px 2px",borderRadius:12,cursor:"pointer",border:`2px solid ${dtc[tp]}40`,background:dtc[tp]+"10"}}><div style={{fontSize:10,fontWeight:700,color:T.textMid,fontFamily:T.accent}}>{d}</div><div style={{fontSize:11,fontWeight:700,color:dtc[tp],marginTop:4,textTransform:"uppercase",fontFamily:T.accent}}>{tp}</div></div>;})}</div>
    </Card>
    <Card><SL icon="💪" color={T.teal}>Workout Program</SL>
      <div style={{display:"flex",gap:10,marginBottom:14}}>{[1,2,3].map(p=><Btn key={p} small color={T.teal} outline={st.workoutPhase!==p} onClick={()=>set(pp=>({...pp,workoutPhase:p,workoutWeek:1}))}>Phase {p}</Btn>)}</div>
      <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:12,color:T.textMid}}>Week:</span><Btn small outline color={T.teal} onClick={()=>set(p=>({...p,workoutWeek:Math.max(1,p.workoutWeek-1)}))}>−</Btn><span style={{fontSize:16,fontWeight:700,fontFamily:T.accent,color:T.teal}}>{st.workoutWeek}</span><Btn small outline color={T.teal} onClick={()=>set(p=>({...p,workoutWeek:Math.min(4,p.workoutWeek+1)}))}>+</Btn></div>
    </Card>
    <Card><SL icon="🔄" color={T.teal}>Gym Rotation</SL>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{GR.map((w,i)=><Btn key={i} small color={T.teal} outline={st.gymRotation%4!==i} onClick={()=>set(p=>({...p,gymRotation:i}))}>{w.split(" — ")[0]}</Btn>)}</div>
    </Card>
    <Card><SL icon="🔄" color={T.rose}>Reset</SL><Btn small outline color="#d04040" onClick={()=>{if(window.confirm("Reset all CatOS data? This can't be undone.")){localStorage.removeItem(STORE_KEY);set(init());}}}>Reset All Data</Btn></Card>
    <Card style={{background:T.rose+"06"}}><div style={{fontSize:12,color:T.textMid,lineHeight:1.6}}><span style={{fontWeight:700,color:T.rose}}>CatOS v2.0</span> — Built for Cat 🩷<br/>Soft Blush Edition<br/><span style={{fontFamily:T.accent,fontSize:11}}>Fasting: 9AM–8PM · Protein: 110-130g · Water: 88oz</span></div></Card>
  </div>;
}

// MAIN
const TABS=[{key:"today",label:"Today",icon:"☀️"},{key:"week",label:"Week",icon:"📅"},{key:"meals",label:"Meals",icon:"🍽"},{key:"more",label:"More",icon:"✦"},{key:"settings",label:"Settings",icon:"⚙️"}];

export default function CatOS(){
  const[tab,setTab]=useState("today");
  const[st,_set]=useState(loadState);
  const set=fn=>{_set(p=>{const n=typeof fn==="function"?fn(p):fn;saveState(n);return n;});};

  return <div style={{minHeight:"100vh",background:T.bg,fontFamily:T.font,color:T.text,display:"flex",flexDirection:"column"}}>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet"/>
    <div style={{padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.cardBorder}`,background:T.card,position:"sticky",top:0,zIndex:100}}>
      <span style={{fontSize:18,fontWeight:700,fontFamily:T.accent,background:`linear-gradient(135deg,${T.rose},#c4928a)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CatOS</span>
      <div style={{display:"flex",alignItems:"center",gap:14}}><div style={{textAlign:"right"}}><div style={{fontSize:11,color:T.rose,fontWeight:600,fontFamily:T.accent}}>🌴 {flDays()} days</div><div style={{fontSize:9,color:T.textLight}}>Florida</div></div><span style={{fontSize:14}}>🐶</span></div>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:"16px 16px 100px",maxWidth:600,margin:"0 auto",width:"100%"}}>
      {tab==="today"&&<Today st={st} set={set}/>}
      {tab==="week"&&<Week st={st}/>}
      {tab==="meals"&&<Meals st={st} set={set}/>}
      {tab==="more"&&<More st={st} set={set}/>}
      {tab==="settings"&&<Settings st={st} set={set}/>}
    </div>
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:T.card,borderTop:`1px solid ${T.cardBorder}`,display:"flex",justifyContent:"center",padding:"8px 0 12px",boxShadow:"0 -2px 12px rgba(60,30,40,0.06)"}}>
      <div style={{display:"flex",maxWidth:600,width:"100%"}}>{TABS.map(t=><div key={t.key} onClick={()=>setTab(t.key)} style={{flex:1,textAlign:"center",padding:"6px 0",cursor:"pointer",color:tab===t.key?T.rose:T.textLight}}><div style={{fontSize:16}}>{t.icon}</div><div style={{fontSize:9,fontWeight:600,marginTop:2,fontFamily:T.accent}}>{t.label}</div></div>)}</div>
    </div>
    <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}::placeholder{color:${T.textLight}}textarea::placeholder{color:${T.textLight}}body{margin:0;background:${T.bg}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
  </div>;
}
