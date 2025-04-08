import{a as y,d as g,r as a,o as S,b as x,c as u,e as f,f as i,F,g as w,w as C,v as E,h as I,i as n,j as v,t as d,u as b,_ as N,k}from"./index-B6NKHu9Y.js";import{u as B,s as L}from"./CharactersInterceptor-D0iKAgMO.js";const O={async GetFrutits(){try{return(await y.get("https://api.api-onepiece.com/v2/fruits/en")).data}catch(l){return console.error("Error fetching fruits: ",l),[]}}},T={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},A=["src"],D={class:"m-0"},p="one-piece-fruits",m=6,M=g({__name:"fruitCardComponent",setup(l){const r=a([]),s=a([]),h=a([]),c=a(new Set);S(async()=>{try{const e=sessionStorage.getItem(p);if(e)r.value=JSON.parse(e),console.log("Fruits loaded from sessionStorage"),s.value=r.value.slice(0,m),s.value.forEach(t=>{c.value.add(t.id)});else{const t=await O.GetFrutits();Array.isArray(t)?(r.value=t,sessionStorage.setItem(p,JSON.stringify(r.value)),console.log("Fruits fetched and saved to sessionStorage"),s.value=r.value.slice(0,m),s.value.forEach(o=>{c.value.add(o.id)})):(console.error("La respuesta no es un array:",t),r.value=[],s.value=[])}}catch(e){console.error("Error:",e),r.value=[],s.value=[]}}),x(()=>{var t;const e=document.createElement("div");e.style.width="100%",e.style.height="20px",(t=document.querySelector(".grid"))==null||t.appendChild(e),B(a(e),()=>{_()},{threshold:.1})});function _(){if(s.value.length>=r.value.length)return;const e=r.value.filter(t=>!c.value.has(t.id)).slice(0,6);e.length!==0&&(s.value=[...s.value,...e],e.forEach(t=>{c.value.add(t.id)}),console.log(`Loaded ${e.length} more fruits. Total: ${s.value.length}/${r.value.length}`))}return(e,t)=>(u(),f("div",null,[i("div",T,[(u(!0),f(F,null,w(s.value,o=>C((u(),I(b(L),{class:"card",key:o.id,style:{width:"25rem",overflow:"hidden"},ref_for:!0,ref_key:"fruitCardRefs",ref:h},{header:n(()=>[i("img",{src:o.filename,alt:"Fruit Image",class:"gif-container"},null,8,A)]),title:n(()=>[v(d(o.name),1)]),subtitle:n(()=>[v(d(o.type||"Sin Descripción Disponible"),1)]),content:n(()=>[i("p",D,d(o.roman_name||"Sin nombre."),1)]),footer:n(()=>t[0]||(t[0]=[i("div",{class:"flex gap-4 mt-1"},null,-1)])),_:2},1024)),[[E,o.filename]])),128))])]))}}),V=N(M,[["__scopeId","data-v-83b2763e"]]),R=g({__name:"FruitsView",setup(l){return(r,s)=>(u(),f("div",null,[s[0]||(s[0]=i("h1",{class:"mx-5 text-3xl"},"Lista de Frutas",-1)),k(V)]))}});export{R as default};
