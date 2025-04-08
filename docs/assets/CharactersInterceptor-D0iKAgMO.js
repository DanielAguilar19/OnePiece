import{B as b,s as v,c as s,e as a,x as t,q as o,l as n,f as p,r as f,b as m,a8 as y}from"./index-B6NKHu9Y.js";var h=({dt:e})=>`
.p-card {
    background: ${e("card.background")};
    color: ${e("card.color")};
    box-shadow: ${e("card.shadow")};
    border-radius: ${e("card.border.radius")};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${e("card.caption.gap")};
}

.p-card-body {
    padding: ${e("card.body.padding")};
    display: flex;
    flex-direction: column;
    gap: ${e("card.body.gap")};
}

.p-card-title {
    font-size: ${e("card.title.font.size")};
    font-weight: ${e("card.title.font.weight")};
}

.p-card-subtitle {
    color: ${e("card.subtitle.color")};
}
`,g={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},k=b.extend({name:"card",style:h,classes:g}),B={name:"BaseCard",extends:v,style:k,provide:function(){return{$pcCard:this,$parentInstance:this}}},w={name:"Card",extends:B,inheritAttrs:!1};function C(e,l,i,r,c,d){return s(),a("div",t({class:e.cx("root")},e.ptmi("root")),[e.$slots.header?(s(),a("div",t({key:0,class:e.cx("header")},e.ptm("header")),[o(e.$slots,"header")],16)):n("",!0),p("div",t({class:e.cx("body")},e.ptm("body")),[e.$slots.title||e.$slots.subtitle?(s(),a("div",t({key:0,class:e.cx("caption")},e.ptm("caption")),[e.$slots.title?(s(),a("div",t({key:0,class:e.cx("title")},e.ptm("title")),[o(e.$slots,"title")],16)):n("",!0),e.$slots.subtitle?(s(),a("div",t({key:1,class:e.cx("subtitle")},e.ptm("subtitle")),[o(e.$slots,"subtitle")],16)):n("",!0)],16)):n("",!0),p("div",t({class:e.cx("content")},e.ptm("content")),[o(e.$slots,"content")],16),e.$slots.footer?(s(),a("div",t({key:1,class:e.cx("footer")},e.ptm("footer")),[o(e.$slots,"footer")],16)):n("",!0)],16)],16)}w.render=C;function O(e,l,i={threshold:.1}){const r=f(null),c=()=>{e.value&&(r.value=new IntersectionObserver(u=>{u.forEach($=>{$.isIntersecting&&l()})},i),r.value.observe(e.value))},d=()=>{r.value&&(r.value.disconnect(),r.value=null)};return m(()=>{c()}),y(()=>{d()}),{observer:r,cleanupObserver:d}}export{w as s,O as u};
