import{d as p,c as _,a as $,b as u,o as c,e as t,r as g,n as w,F as S,f as h,g as n,w as l,h as H,i as b,t as L,R as G,L as M,j as U,k as W,l as q,m as z}from"./vendor.a527ca77.js";const Y=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerpolicy&&(d.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?d.credentials="include":s.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(s){if(s.ep)return;s.ep=!0;const d=a(s);fetch(s.href,d)}};Y();const x={discomode:!1,discomode_callback:()=>{}};var f=(e,o)=>{const a=e.__vccOpts||e;for(const[i,s]of o)a[i]=s;return a};const D=p({name:"ButtonFour",data(){return{count:0,discomode:!1,mouseOver:!1}},mounted(){let e=this.$refs.button,o=e.getAnimations()[0],a=()=>{o.playState!="running"&&(o.play(),e.style.color=`hsl(${Math.random()*360},68%,58%)`)},i=d=>{var r;((r=document.activeElement)==null?void 0:r.tagName)==="IFRAME"&&(e.style.pointerEvents="all",window.removeEventListener("click",i),e.attributes.removeNamedItem("style"),e.classList.add("b4-disco"),x.discomode=!0,x.discomode_callback())},s=()=>{this.count+=1,this.count>3&&(alert("Woah Woah There, sloooww dooown.."),e.removeEventListener("click",a),o.removeEventListener("finish",s),this.discomode=!0,window.addEventListener("blur",i),e.style.pointerEvents="none")};this.$route.path==="/"&&(e.addEventListener("click",a),o.addEventListener("finish",s))}}),Q={id:"b4",ref:"button"},K=u("4 "),X={key:0,id:"thevideo",width:"560",height:"315",src:"https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=0"},J={key:1,class:"cover",style:{width:"565px",height:"300px",left:"0",transform:"translate(-50%,-14px)"}},Z={key:2,class:"cover",style:{width:"565px",height:"50px",left:"0",transform:"translate(-50%,-88px)"}},ee={key:3,class:"cover",style:{width:"100px",height:"50px",left:"0",transform:"translate(-100%,-50px)"}},te={key:4,class:"cover",style:{width:"265px",height:"50px",left:"0",transform:"translate(20px,-50px)"}};function oe(e,o,a,i,s,d){return c(),_("div",Q,[K,e.discomode?(c(),_("iframe",X)):$("",!0),e.discomode?(c(),_("div",J)):$("",!0),e.discomode?(c(),_("div",Z)):$("",!0),e.discomode?(c(),_("div",ee)):$("",!0),e.discomode?(c(),_("div",te)):$("",!0)],512)}var se=f(D,[["render",oe],["__scopeId","data-v-24027d51"]]);const ne=p({name:"VButton",props:{class:{type:String,default:""},ripple:{type:Boolean,default:!0},stateful:{type:Boolean,default:!1}},data(){return{statesHtml:null,currentState:0}},mounted(){this.statesHtml=this.$refs.states.children;let e=this.$refs.ctn;e.addEventListener("animationend",()=>{e.classList.remove("state-flip")}),this.cycleState(0,!0)},methods:{cycleState(e=null,o=!1){if(this.statesHtml!==null){this.currentState=e!==null?e:this.currentState+1,this.currentState>this.statesHtml.length-1&&(this.currentState=0),o||this.$emit("click");let a=this.$refs.ctn;a.classList.toggle("state-flip"),a.innerHTML=this.statesHtml[this.currentState].outerHTML}}}}),ae={class:"state-ctn",ref:"ctn"},re={style:{display:"none"},ref:"states"};function ie(e,o,a,i,s,d){return c(),_(S,null,[t("button",{class:w(e.$props.class+" vbutton"),onClick:o[0]||(o[0]=r=>e.cycleState())},[t("div",ae,[e.stateful?$("",!0):g(e.$slots,"default",{key:0})],512)],2),t("div",re,[g(e.$slots,"default")],512)],64)}var ce=f(ne,[["render",ie]]);const le=p({name:"NavGroup",components:{VButton:ce},methods:{toggleMenu(){this.$refs.navitems.classList.toggle("navbaritems-active")}}}),de={class:"grpnav"},ue=t("span",{class:"material-icons"},"menu",-1),_e=t("span",{class:"material-icons"},"close",-1);function he(e,o,a,i,s,d){const r=h("VButton");return c(),_("nav",de,[n(r,{class:"menu-button",stateful:!0,onClick:o[0]||(o[0]=m=>e.toggleMenu())},{default:l(()=>[ue,_e]),_:1}),t("div",null,[t("ul",{class:"navbar-items",ref:"navitems",style:H({justifySelf:e.align})},[g(e.$slots,"default")],4)])])}var pe=f(le,[["render",he]]);const fe=p({name:"NavItem"}),me={class:"navitem"};function ge(e,o,a,i,s,d){return c(),_("li",me,[g(e.$slots,"default")])}var j=f(fe,[["render",ge]]);const ve=p({name:"VLink",components:{NavItem:j},props:{href:{type:String,default:"/404"},class:{type:String,default:""}},data(){return{sameOrigin:this.sameOrigin_()}},methods:{sameOrigin_(){try{let e=new URL(this.href);return["http:","https:"].includes(e.protocol)?e.origin===window.location.origin:!1}catch{return!0}}}}),$e=t("div",{class:"link-underline"},null,-1),ye=["href"],be=t("div",{class:"link-underline"},null,-1);function ke(e,o,a,i,s,d){const r=h("router-link");return e.sameOrigin?(c(),b(r,{key:0,to:e.href,class:w(`${e.$props.class} link`)},{default:l(()=>[g(e.$slots,"default"),$e]),_:3},8,["to","class"])):(c(),_("a",{key:1,href:e.href,class:w(`${e.$props.class} link`)},[g(e.$slots,"default"),be],10,ye))}var T=f(ve,[["render",ke]]);const we=p({name:"NavLink",components:{VLink:T,NavItem:j},props:{href:{type:String,default:"/404"}}});function Se(e,o,a,i,s,d){const r=h("VLink"),m=h("NavItem");return c(),b(m,null,{default:l(()=>[n(r,{class:"nav-link",href:e.href},{default:l(()=>[g(e.$slots,"default")]),_:3},8,["href"])]),_:3})}var Le=f(we,[["render",Se]]);const Te=p({name:"NavText",components:{NavItem:j}}),Ne={class:"nav-text"};function Ce(e,o,a,i,s,d){const r=h("NavItem");return c(),b(r,null,{default:l(()=>[t("p",Ne,[g(e.$slots,"default")])]),_:3})}var xe=f(Te,[["render",Ce]]);const je=p({name:"NavTitle",components:{NavText:xe},props:{href:{type:String,default:"."}}});function Be(e,o,a,i,s,d){return c(),_("h1",{class:"nav-title",onClick:o[0]||(o[0]=r=>e.$router.push(e.href))},[g(e.$slots,"default")])}var Ie=f(je,[["render",Be]]);const He=p({name:"Header",components:{NavTitle:Ie,NavLink:Le,NavGroup:pe,ButtonFour:se},data(){return{observer:null}},mounted(){this.observer=new IntersectionObserver(([e])=>{e.target.classList.toggle("isnot-pinned",!(e.intersectionRatio<1)),e.target.classList.toggle("windowframe-shadow",e.intersectionRatio<1)},{threshold:[1]}),this.observer.observe(this.$refs.he)}}),Pe={class:"windowframe-shadow",ref:"he"},Ee={id:"header-items-container"},Ae=u("ultr"),Oe=u("2"),Ve=u("About"),Re=u("Projects"),Fe=u("Contact"),Ge=u("Others");function Me(e,o,a,i,s,d){const r=h("ButtonFour"),m=h("NavTitle"),v=h("NavLink"),C=h("NavGroup");return c(),_("header",Pe,[t("div",Ee,[n(m,{href:"/#home",id:"header-title"},{default:l(()=>[Ae,n(r),Oe]),_:1}),n(C,{style:{"margin-right":"0","margin-left":"auto","justify-self":"flex-end"}},{default:l(()=>[n(v,{href:"/#about"},{default:l(()=>[Ve]),_:1}),n(v,{href:"/#projects"},{default:l(()=>[Re]),_:1}),n(v,{href:"/#contact"},{default:l(()=>[Fe]),_:1}),n(v,{href:"/#others"},{default:l(()=>[Ge]),_:1})]),_:1})])],512)}var Ue=f(He,[["render",Me],["__scopeId","data-v-617ccdca"]]);const We=p({name:"SiteTitle"}),qe=u(" ultr"),ze=t("span",{class:"b4-color"},"4",-1),Ye=u("2 ");function De(e,o,a,i,s,d){return c(),_(S,null,[qe,ze,Ye],64)}var P=f(We,[["render",De]]);const Qe=p({name:"SocialRef",components:{VLink:T},props:{href:{type:String,defaut:""},icon:{type:String,defaut:""},name:{type:String,defaut:""},text:String}}),Ke={class:"social-ref"},Xe=["src","alt"],Je={key:0,class:"social-ref-text"};function Ze(e,o,a,i,s,d){const r=h("VLink");return c(),_("div",Ke,[t("img",{class:"social-ref-img",src:e.icon,alt:`logo of ${e.name}`},null,8,Xe),n(r,{href:e.href,class:"social-ref-link"},{default:l(()=>[u(L(e.name)+" "+L(e.text!==void 0?":":"")+" ",1),e.text!==void 0?(c(),_("span",Je,L(e.text),1)):$("",!0)]),_:1},8,["href"])])}var E=f(Qe,[["render",Ze]]);const et=p({name:"ContactList",components:{SocialRef:E}}),tt={id:"contact-list"};function ot(e,o,a,i,s,d){const r=h("SocialRef");return c(),_("ul",tt,[t("li",null,[n(r,{name:"Github",text:"ultraflame4",href:"https://github.com/ultraflame4",icon:"https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/github.svg"})]),t("li",null,[n(r,{name:"Instagram",text:"@ultraflame42",href:"https://www.instagram.com/ultraflame42/",icon:"https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/dark/instagram.svg"})]),t("li",null,[n(r,{name:"Reddit",text:"u/Ultraflame4",href:"https://www.reddit.com/user/Ultraflame4",icon:"https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/dark/reddit.svg"})]),t("li",null,[n(r,{name:"Email",text:"ultraflame4@gmail.com",href:"mailto:ultraflame4@gmail.com",icon:"https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/dark/gmail.svg"})])])}var A=f(et,[["render",ot]]);const st=p({name:"Footer",components:{ContactList:A,VLink:T,SiteTitle:P}}),nt={id:"footer"},at={id:"footer-ctn"},rt=t("small",{id:"copyright"},"\xA9 Copyright 2022, ultraflame4 All rights reserved.",-1),it={class:"footer-heading"},ct=u("Home"),lt=u("About"),dt=u("Projects"),ut=u("Contact"),_t=u("Others"),ht=t("p",{class:"footer-heading"},"Projects",-1),pt=u("All projects"),ft={class:"footer-left"},mt=t("p",{class:"footer-heading"},"Socials",-1);function gt(e,o,a,i,s,d){const r=h("SiteTitle"),m=h("VLink"),v=h("ContactList");return c(),_("footer",nt,[t("div",at,[rt,t("ul",null,[t("p",it,[n(r)]),n(m,{href:"/#about"},{default:l(()=>[ct]),_:1}),n(m,{href:"/#about"},{default:l(()=>[lt]),_:1}),n(m,{href:"/#projects"},{default:l(()=>[dt]),_:1}),n(m,{href:"/#contact"},{default:l(()=>[ut]),_:1}),n(m,{href:"/#others"},{default:l(()=>[_t]),_:1})]),t("ul",null,[ht,n(m,{href:"/projects"},{default:l(()=>[pt]),_:1})]),t("ul",ft,[mt,n(v)])])])}var vt=f(st,[["render",gt]]);const $t=p({setup(e){return(o,a)=>{const i=h("router-view");return c(),_(S,null,[n(Ue),n(i),n(vt)],64)}}});const yt=p({name:"SectionHeading"}),bt={class:"section-heading"};function kt(e,o,a,i,s,d){return c(),_("h2",bt,[g(e.$slots,"default")])}var wt=f(yt,[["render",kt]]);const St=p({name:"SectionGoTo",props:{href:{type:String,default:"."},brackets:{type:Boolean,default:!0}}}),Lt={key:0,class:"material-icons",style:{left:"-24px"}},Tt={key:1,class:"material-icons",style:{right:"-24px"}},Nt={key:2,class:"sect-goto-underline1"},Ct=t("div",{class:"sect-goto-underline"},null,-1);function xt(e,o,a,i,s,d){const r=h("router-link");return c(),b(r,{to:e.href,class:"sect-goto",title:`Go to ${e.href}`},{default:l(()=>[e.brackets?(c(),_("span",Lt,"keyboard_arrow_left")):$("",!0),g(e.$slots,"default"),e.brackets?(c(),_("span",Tt,"keyboard_arrow_right")):$("",!0),e.brackets?$("",!0):(c(),_("div",Nt)),Ct]),_:3},8,["to","title"])}var jt=f(St,[["render",xt]]);const Bt=p({name:"Card",props:{class:{type:String},href:{type:String,default:"."}}});function It(e,o,a,i,s,d){return c(),_("div",{class:w(`${e.$props.class} card`),onClick:o[0]||(o[0]=r=>e.$vroute(e.href))},[g(e.$slots,"default")],2)}var Ht=f(Bt,[["render",It]]);function Pt(){return[{name:"TiledImage",desc:"This program recreate a reference image using a set of images as pixels referred to as tiles.",image_url:"https://user-images.githubusercontent.com/34125174/147404436-d5be34b1-4816-4005-95b6-adffdaad8307.png",repo:"https://github.com/ultraflame4/TiledImage"},{name:"Better Console",desc:"Tis project aims to provide a better console for logging in python",repo:"https://github.com/ultraflame4/Better-Console-Python",image_url:"https://github.com/ultraflame4/Better-Console-python/raw/master/imgs/ezgif-3-e5e15d50dcf7.gif"},{name:"OnlineTicTacToe",desc:"A multiplayer capable tic tac toe game",repo:"https://github.com/ultraflame4/OnlineTicTacToe",web:"https://ultraflame4.github.io/OnlineTicTacToe",image_url:"https://user-images.githubusercontent.com/34125174/147404403-baa8daaf-3ec9-4cf7-bcf1-711ba28dca27.png"},{name:"DiscordBotClient",desc:`A client with a GUI interface for controlling discord bots.
 Allowing you to control a discord bot like how you normally use discord
 Features include sending messages, and more.`,repo:"https://github.com/ultraflame4/DiscordBotClient"},{name:"Minesweeper",desc:"A Minesweeper clone thrown together haphazardly in a couple of days. Written in html and javascript",repo:"https://github.com/ultraflame4/Minesweeper",web:"https://ultraflame4.github.io/Minesweeper"},{name:"Python Qt Browser",desc:`A custom browser written for fun using python and the PyQt5 library. 
Features include a built-in adblocker, multiple tabs support, and not being able to log into any google account.  \xAF\\_(\u30C4)_/\xAF`,repo:"https://github.com/ultraflame4/PythonQtBrowser"},{name:"Python BGario",desc:"An amateur remake of agario written in python in 2018",repo:"https://github.com/ultraflame4/Python-Bgario",image_url:"bgario.png"},{name:"Binosaur",desc:"Inspired by the chrome dino game, in this game, your goal is to gain as many points as possible by jumping over obstacles to survive. Written using Python and pygame",repo:"https://github.com/ultraflame4/Binosaur-game"},{name:"Rock Paper Scissors",desc:"Rock Paper Scissors written using python and pygame by a beginner in 2018",repo:"https://github.com/ultraflame4/Rock-Paper-Scissors"}]}var Et="/moon.webm";const B=new G;fetch("ricksubs.lrc").then(e=>{e.text().then(o=>{B.setLrc(M.parse(o))})});function y(e){let o=document.querySelector("#homeHeading");o&&(o.textContent=e)}function O(){return new Date().getTime()/1e3}let V=0;x.discomode_callback=()=>{setTimeout(()=>{y("DISCO TIME");let e=document.querySelector("#homeHeading");e&&(e.style.fontSize="96px")},0),setTimeout(()=>{y("NOW PLAYING:")},3e3),setTimeout(()=>{y("NEVER GONNA GIVE YOU UP")},6e3),setTimeout(()=>{y("BY:")},9e3),setTimeout(()=>{y("RICK ASTLEY")},12e3),V=O(),setTimeout(()=>{setInterval(()=>{let o=O()-V;B.timeUpdate(o),document.querySelector("#homeHeading")&&y(B.curLyric().content)},10)},18e3)};const At=p({name:"Home",components:{ContactList:A,SiteTitle:P,SocialRef:E,VLink:T,Card:Ht,SectionGoTo:jt,SectionHeading:wt},mounted(){window.addEventListener("load",()=>{})},methods:{getFeaturedProjects(){return Pt().slice(0,5)}}}),Ot={id:"bg-anim",src:Et,type:"video/webm",loop:"",autoplay:"",muted:"",ref:"anim"},Vt={id:"home"},Rt={id:"homeHeading",ref:"bigtext"},Ft=t("p",{style:{"animation-delay":"1s"}},"Welcome to my website!",-1),Gt=t("br",null,null,-1),Mt=t("small",null,"No.4 is looking kinda out of place.",-1),Ut=u("About"),Wt={id:"about"},qt=u(" ABOUT ME "),zt=t("p",null,"I'm an amateur self-taught programmer,",-1),Yt=t("p",null," learned programming at the age of 12, learning from various ",-1),Dt=t("p",null," youtube videos & online courses.",-1),Qt=t("br",null,null,-1),Kt=t("p",null,"Since then, I've dabbled in a bunch of stuff and have done a variety projects",-1),Xt=t("br",null,null,-1),Jt=t("p",null,"These are some of the projects I've worked on. ",-1),Zt=t("br",null,null,-1),eo=t("small",null,"Hopefully I'll finish them someday...",-1),to=u("Projects"),oo={id:"projects"},so=u("Projects"),no=t("p",null,"Here are some of the projects I've done.",-1),ao={id:"feature-projects-card-ctn"},ro={class:"absCenter",style:{"letter-spacing":"2px","mix-blend-mode":"difference",color:"white"}},io=t("br",null,null,-1),co=t("br",null,null,-1),lo=u("See all projects "),uo=t("span",{class:"material-icons absYcenter"},"arrow_right_alt",-1),_o=u("Contact"),ho={id:"contact"},po=u("Contact"),fo=t("p",null,"You can contact me at:",-1),mo=u("Others"),go={id:"others",style:{height:"500px"}},vo=u("Others"),$o=t("p",null,"There seems to be nothing here.",-1),yo=u("Why dont u check out the suspicous No.4 I was talking about "),bo=u("earlier"),ko=u(".");function wo(e,o,a,i,s,d){const r=h("SiteTitle"),m=h("SectionHeading"),v=h("SectionGoTo"),C=h("Card"),I=h("VLink"),F=h("ContactList");return c(),_("main",null,[t("video",Ot,null,512),t("section",Vt,[n(m,null,{default:l(()=>[n(r)]),_:1}),t("h1",Rt,"Hello!",512),Ft,Gt,Mt,n(v,{href:"/#about"},{default:l(()=>[Ut]),_:1})]),t("section",Wt,[n(m,null,{default:l(()=>[qt]),_:1}),zt,Yt,Dt,Qt,Kt,Xt,Jt,Zt,eo,n(v,{href:"/#projects"},{default:l(()=>[to]),_:1})]),t("section",oo,[n(m,null,{default:l(()=>[so]),_:1}),no,t("div",ao,[(c(!0),_(S,null,U(e.getFeaturedProjects(),k=>(c(),b(C,{class:"project-card",style:H(`background-image: url(${k.image_url});`),title:k.name,href:k.repo},{default:l(()=>[t("h3",ro,L(k.name),1)]),_:2},1032,["style","title","href"]))),256))]),io,co,n(I,{href:"/projects"},{default:l(()=>[lo,uo]),_:1}),n(v,{href:"/#contact"},{default:l(()=>[_o]),_:1})]),t("section",ho,[n(m,null,{default:l(()=>[po]),_:1}),fo,n(F),n(v,{href:"/#others"},{default:l(()=>[mo]),_:1})]),t("section",go,[n(m,null,{default:l(()=>[vo]),_:1}),$o,t("p",null,[yo,n(I,{href:"/#home",class:"inherit-txtsize"},{default:l(()=>[bo]),_:1}),ko])])])}var So=f(At,[["render",wo]]);const Lo=p({name:"Projects"});function To(e,o,a,i,s,d){return c(),_("main")}var No=f(Lo,[["render",To]]);const N=W({history:q(),routes:[{path:"/",component:So},{path:"/projects",component:No}],scrollBehavior(e,o,a){var i;if(e.hash){let s=document.querySelector(e.hash);s?(s.scrollIntoView({behavior:"smooth"}),setTimeout(()=>{s==null||s.scrollIntoView({behavior:"smooth"})},200)):(i=document.querySelector("#app"))==null||i.scrollTo(0,0)}}});N.beforeEach((e,o,a)=>{e.matched.length>0?a():(console.log(e),a({name:"404"}))});N.onError(e=>{console.log("E",e)});const R=z($t);R.use(N).mount("#app");R.config.globalProperties.$vroute=e=>{let o=new URL(e);o.origin!==location.origin?location.assign(o):N.push(e)};
