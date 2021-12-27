import{o as c,c as l,a as k,d as N,r as _,b as d,F as g,e as o,t as b,p as m,f as h,g as P,h as y,i as x,j as w,w as I,k as $,l as V,m as O,n as M}from"./vendor.3b58d5bf.js";const R=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}};R();var u=(e,t)=>{const n=e.__vccOpts||e;for(const[i,r]of t)n[i]=r;return n};const z={name:"Footer"},F={id:"TheFoot"},G=k('<small data-v-a7c7ff52> \xA9 Copyright 2021 <a href="mailto://ultraflame4@gmail.com" data-v-a7c7ff52>ultraflame4@gmail.com</a> | Website: <a href="https://ultraflame4.github.io" data-v-a7c7ff52>https://ultraflame4.github.io</a> | Email: <a href="mailto://ultraflame4@gmail.com" data-v-a7c7ff52>ultraflame4@gmail.com</a> | Github: <a href="https://github.com/ultraflame4/" data-v-a7c7ff52>https://github.com/ultraflame4/</a> | Contact: <a href="https://github.com/ultraflame4/#contact" data-v-a7c7ff52>https://github.com/ultraflame4/#contact</a></small>',1),W=[G];function D(e,t,n,i,r,a){return c(),l("footer",F,W)}var Q=u(z,[["render",D],["__scopeId","data-v-a7c7ff52"]]);const U=N({setup(e){return(t,n)=>{const i=_("router-view");return c(),l(g,null,[d(i),d(Q)],64)}}});const Z={name:"NavHeaderPageLink",props:["title","link"],methods:{scrollto(e){window.location.assign(e)}}},E={class:"navbaritem-container"};function q(e,t,n,i,r,a){return c(),l("div",E,[o("button",{onClick:t[0]||(t[0]=s=>a.scrollto(n.link))},[o("h5",null,b(n.title),1)])])}var J=u(Z,[["render",q],["__scopeId","data-v-70df09a8"]]);const K={name:"Header",components:{NavHeaderPageLink:J}},X=e=>(m("data-v-5de99bfc"),e=e(),h(),e),Y={id:"nav-header"},ee=X(()=>o("h4",{id:"title"},[o("a",{href:"/"},"ultr42")],-1)),te={id:"items"};function oe(e,t,n,i,r,a){const s=_("NavHeaderPageLink");return c(),l("div",Y,[ee,o("div",te,[d(s,{title:"Home",link:"/#home"}),d(s,{title:"About",link:"/#about"}),d(s,{title:"Projects",link:"/#projects-view"}),d(s,{title:"Contact",link:"/#contact"}),d(s,{title:"Others",link:"/#others"})])])}var C=u(K,[["render",oe],["__scopeId","data-v-5de99bfc"]]);const ne={name:"SlideshowItem",props:["url","text"],methods:{formatText(e){return ae(e)}}};function ae(e){var t,n,i,r;return n=/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,t=e.replace(n,'<a href="$1" target="_blank">$1</a>'),i=/(^|[^\/])(www\.[\S]+(\b|$))/gim,t=t.replace(i,'$1<a href="http://$2" target="_blank">$2</a>'),r=/(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim,t=t.replace(r,'<a href="mailto:$1">$1</a>'),t}const re=["src","alt"],se=["innerHTML"],ie={class:"slot-container"};function ce(e,t,n,i,r,a){return c(),l("div",null,[o("img",{src:n.url,alt:n.text},null,8,re),o("p",{innerHTML:a.formatText(n.text)},null,8,se),o("div",ie,[P(e.$slots,"default",{},void 0,!0)])])}var S=u(ne,[["render",ce],["__scopeId","data-v-78b0811d"]]);const le={name:"SliderSnapButtons",props:["index"],mounted(){this.$refs.snapbutton.dataset.index=this.index},methods:{setSelected(e=!1){this.$refs.snapbutton.dataset.s=e},scrollToHere(){this.$parent.scrollToIndex(this.index)},getTooltip(){return"Go to page/slide "+this.index}}},de=e=>(m("data-v-35344bef"),e=e(),h(),e),_e=de(()=>o("path",{d:"M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"},null,-1));function ue(e,t,n,i,r,a){return c(),l("svg",{ref:"snapbutton",xmlns:"http://www.w3.org/2000/svg",width:"10px",height:"10px",viewBox:"0 0 24 24","data-s":"false",onClick:t[0]||(t[0]=s=>a.scrollToHere(!0))},[o("title",null,b(a.getTooltip()),1),_e],512)}var pe=u(le,[["render",ue],["__scopeId","data-v-35344bef"]]);const me={name:"SlideShow",components:{SliderSnapButtons:pe,SlideshowItem:S},props:{enableOverlay:Boolean},data:function(){return{currentIndex:0,slideshowLoop:null}},created(){this.slideshowLoop=setInterval(()=>this.slideShowLoop(),7e3)},beforeUnmount(){clearInterval(this.slideshowLoop)},mounted(){this.updateSnapButtons()},methods:{getSlidesCount(){return Array.isArray(this.$slots.default()[0].children)?this.$slots.default()[0].children.length:0},slideShowLoop(){this.currentIndex==this.getSlidesCount()-1?this.scrollToIndex(0):this.scrollToIndex(this.currentIndex+1)},scrollNext(e=!1){let t=e?-1:1;this.scrollToIndex(this.currentIndex+t),this.updateSnapButtons()},scrollToIndex(e){e>=this.getSlidesCount()?e=0:e<0&&(e=this.getSlidesCount()-1),this.$refs.slideshow.scroll({left:this.$refs.slideshow.offsetWidth*e,behavior:"smooth"}),this.currentIndex=e,this.updateSnapButtons()},updateSnapButtons(){let e=this.$refs.snapbuttons.children;for(var t=0;t<e.length;t++){var n=e[t];n.dataset.index==this.currentIndex?n.dataset.s="true":n.dataset.s="false"}}}},T=e=>(m("data-v-f3b719aa"),e=e(),h(),e),he={id:"container"},fe={class:"slides-container",ref:"slideshow"},ve={key:0,class:"slides-overlay"},ge=T(()=>o("svg",{xmlns:"http://www.w3.org/2000/svg",width:"76",height:"72",viewBox:"0 0 24 24",style:{fill:"rgba(255, 255, 255, 1)"}},[o("path",{d:"M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"})],-1)),be=[ge],we=T(()=>o("svg",{xmlns:"http://www.w3.org/2000/svg",width:"76",height:"72",viewBox:"0 0 24 24",style:{fill:"rgba(255, 255, 255, 1)"}},[o("path",{d:"M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"})],-1)),$e=[we],ye={id:"slidersnap-buttons",ref:"snapbuttons"};function xe(e,t,n,i,r,a){const s=_("SliderSnapButtons");return c(),l("div",he,[o("div",fe,[P(e.$slots,"default",{},void 0,!0)],512),n.enableOverlay?(c(),l("div",ve)):y("",!0),o("button",{class:"arrows",id:"arrow-l",onClick:t[0]||(t[0]=p=>a.scrollNext(!0)),title:"Go to previous page"},be),o("button",{class:"arrows",id:"arrow-r",onClick:t[1]||(t[1]=p=>a.scrollNext()),title:"Go to next page"},$e),o("div",ye,[(c(!0),l(g,null,x(a.getSlidesCount(),p=>(c(),w(s,{index:p-1},null,8,["index"]))),256))],512)])}var B=u(me,[["render",xe],["__scopeId","data-v-f3b719aa"]]);const Ie={name:"HomeBanner",components:{SlideshowItem:S,SlideShow:B},methods:{scrolldowb(){window.location.replace("/#projects-view")},getImages(){return[{url:"./tiledimage0.png",text:"Image generated by TiledImage project. Image made of many minecraft block textures. Original image from https://wallpapercave.com/wp/wp2077533.jpg"},{url:"./onlinetictactoe.png",text:"OnlineTicTacToe Project. A Multiplayer TicTacToe"},{url:"./bgario.png",text:"Python Bgario. an Agario inspired game created in python."},{url:"./minesweeper.png",text:"Minesweeper. Created using css, html and javascript"}]}}},L=e=>(m("data-v-fa2110ca"),e=e(),h(),e),Se={id:"container"},ke=L(()=>o("div",{id:"banner-title"},[o("h1",null,"ultr42"),o("p",null,"A cool site for my projects and other cool stuff")],-1)),Pe=L(()=>o("svg",{xmlns:"http://www.w3.org/2000/svg",width:"128",height:"128",viewBox:"0 0 24 24"},[o("path",{d:"m18.707 12.707-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z"})],-1)),Ce=[Pe];function Te(e,t,n,i,r,a){const s=_("SlideshowItem"),p=_("SlideShow");return c(),l("div",Se,[d(p,{"enable-overlay":"true"},{default:I(()=>[(c(!0),l(g,null,x(a.getImages(),f=>(c(),w(s,{url:f.url,text:f.text},null,8,["url","text"]))),256))]),_:1}),ke,o("div",{id:"scroll-link",title:"Scroll down. There is more below",onClick:t[0]||(t[0]=f=>a.scrolldowb())},Ce)])}var Be=u(Ie,[["render",Te],["__scopeId","data-v-fa2110ca"]]);const Le={name:"PViewItemLink",props:{iconName:{default:"",type:Object},text:String,url:String},methods:{getIconUrl(e){switch(e){case"github":return"/public/Github-Mark-64px.png";default:return""}},open(e){window.open(e)}},mounted(){this.$refs.plink.dataset.type=this.iconName}},Ae=["src"];function He(e,t,n,i,r,a){return c(),l("button",{class:"pview-link",ref:"plink",onClick:t[0]||(t[0]=s=>a.open(n.url))},[n.iconName.length>0?(c(),l("img",{key:0,src:a.getIconUrl(n.iconName)},null,8,Ae)):y("",!0),o("p",null,b(n.text),1)],512)}var je=u(Le,[["render",He],["__scopeId","data-v-462b48e9"]]);const Ne={name:"PViewItem",components:{PViewItemLink:je},props:{title:String,desc:String,repo:{default:"",type:String},web:{default:"",type:String}}},Ve={class:"pview-item-container"},Oe={class:"pview-item"},Me={class:"pview-title"},Re={class:"pview-desc"},ze={class:"pview-links-ctn"};function Fe(e,t,n,i,r,a){const s=_("PViewItemLink");return c(),l("div",Ve,[o("div",Oe,[o("h4",Me,b(n.title),1),o("p",Re,b(n.desc),1),o("div",ze,[n.web.length>0?(c(),w(s,{key:0,"icon-name":"web",text:"Goto website",url:n.web},null,8,["url"])):y("",!0),n.repo.length>0?(c(),w(s,{key:1,"icon-name":"github",text:"Visit the github repository",url:n.repo},null,8,["url"])):y("",!0)])])])}var Ge=u(Ne,[["render",Fe],["__scopeId","data-v-4eb69321"]]);function We(){return[{name:"OnlineTicTacToe",desc:"A multiplayer capable tic tac toe. game",repo:"https://github.com/ultraflame4/OnlineTicTacToe",web:"https://ultraflame4.github.io/OnlineTicTacToe",image_url:"https://user-images.githubusercontent.com/34125174/147404403-baa8daaf-3ec9-4cf7-bcf1-711ba28dca27.png"},{name:"TiledImage",desc:"This program recreate a reference image using a set of images as pixels referred to as tiles",image_url:"https://user-images.githubusercontent.com/34125174/147404436-d5be34b1-4816-4005-95b6-adffdaad8307.png",repo:"https://github.com/ultraflame4/TiledImage"},{name:"Better Console",desc:"Tis project aims to provide a better console for logging in python",repo:"https://github.com/ultraflame4/Better-Console-Python",image_url:"https://github.com/ultraflame4/Better-Console-python/raw/master/imgs/ezgif-3-e5e15d50dcf7.gif"},{name:"DiscordBotClient",desc:"A client for discord bots.",repo:"https://github.com/ultraflame4/DiscordBotClient"},{name:"Minesweeper",desc:"A Minesweeper clone thrown together haphazardly in a couple of days. Written in html and javascript",image_url:"./minesweeper.png",repo:"https://github.com/ultraflame4/Minesweeper",web:"https://ultraflame4.github.io/Minesweeper"},{name:"Python Qt Browser",desc:"A custom browser written for fun using python and the PyQt5 library. Features include a built-in adblocker, multiple tabs support, and not being able to log into any google account.  \xAF\\_(\u30C4)_/\xAF",repo:"https://github.com/ultraflame4/PythonQtBrowser"},{name:"Python BGario",desc:"An amateur remake of agario written in python in 2018",repo:"https://github.com/ultraflame4/Python-Bgario",image_url:"./bgario.png"},{name:"Binosaur",desc:"Inspired by the chrome dino game, in this game, your goal is to gain as many points as possible by jumping over obstacles to survive. Written using Python and pygame",repo:"https://github.com/ultraflame4/Binosaur-game"},{name:"Rock Paper Scissors",desc:"Rock Paper Scissors written using python and pygame by a beginner in 2018",repo:"https://github.com/ultraflame4/Rock-Paper-Scissors"}]}const De={name:"ProjectsView",components:{PViewItem:Ge,SlideshowItem:S,SlideShow:B},methods:{getProjectList(){return We().slice(0,5)}}},Qe=e=>(m("data-v-1eae45b5"),e=e(),h(),e),Ue={id:"projects-view"},Ze={id:"pview-slideshow-ctn"},Ee=Qe(()=>o("div",{id:"pview-layer"},[o("h1",null,"Projects"),o("br"),o("p",null,"The best of my projects")],-1));function qe(e,t,n,i,r,a){const s=_("PViewItem"),p=_("SlideshowItem"),f=_("SlideShow");return c(),l("div",Ue,[o("div",Ze,[d(f,{"enable-overlay":"true"},{default:I(()=>[(c(!0),l(g,null,x(a.getProjectList(),v=>(c(),w(p,{url:v.image_url,text:""},{default:I(()=>[d(s,{title:v.name,desc:v.desc,repo:v.repo,web:v.web},null,8,["title","desc","repo","web"])]),_:2},1032,["url"]))),256))]),_:1})]),Ee])}var Je=u(De,[["render",qe],["__scopeId","data-v-1eae45b5"]]);const Ke={name:"ContactItem",props:["img","text","url"],methods:{open(){window.open(this.url)}}},Xe=["src"];function Ye(e,t,n,i,r,a){return c(),l("div",{class:"ci-ctn",onClick:t[0]||(t[0]=s=>a.open())},[o("img",{src:n.img},null,8,Xe),o("h4",null,b(n.text),1)])}var et=u(Ke,[["render",Ye],["__scopeId","data-v-0fa454e9"]]);const tt={name:"Contact",components:{ContactItem:et}},ot=e=>(m("data-v-1715555b"),e=e(),h(),e),nt={id:"contact"},at=ot(()=>o("h1",null," Contact ",-1)),rt={id:"contacts-ctn"};function st(e,t,n,i,r,a){const s=_("ContactItem");return c(),l("div",nt,[at,o("div",rt,[d(s,{img:"./glyph-logo_May2016.png",text:"@ultraflame42",url:"https://www.instagram.com/ultraflame42/"}),d(s,{img:"./Reddit_Mark_OnDark.png",text:"u/Ultraflame4",url:"https://www.reddit.com/user/Ultraflame4"}),d(s,{img:"./GitHub-Mark-64px.png",text:"ultraflame42",url:"https://github.com/ultraflame4/"})])])}var it=u(tt,[["render",st],["__scopeId","data-v-1715555b"]]);const ct={name:"About"},A=e=>(m("data-v-23d363a4"),e=e(),h(),e),lt={id:"about"},dt=A(()=>o("h1",null," About Me ",-1)),_t=A(()=>o("p",null,[$(" Im an amateur teen programmer who started programming in ~2018-2019. "),o("br"),$(" I started programming because i wanted to create cool stuff, and let others interact and play with it "),o("br"),$(" I've since then ,learned alot and used a wider variety of programming languages. "),o("br"),o("br"),$(" Programming languages I've used: Python, C# (unity), JavaScript, Typescript "),o("br"),o("br"),$(" Languages I rarely use : C++, Java ")],-1)),ut=[dt,_t];function pt(e,t,n,i,r,a){return c(),l("div",lt,ut)}var mt=u(ct,[["render",pt],["__scopeId","data-v-23d363a4"]]);const ht={name:"Others"},ft={id:"others"},vt=k('<h1 data-v-6beb82bc> Others </h1><div class="content-ctn" data-v-6beb82bc><p data-v-6beb82bc> Wow such empty ! <br data-v-6beb82bc> (\uFF61\u2022\u0301\uFE3F\u2022\u0300\uFF61) <br data-v-6beb82bc> Am i all alone here? <br data-v-6beb82bc> I&#39;m scared... <br data-v-6beb82bc> Would you stay here with me owo ? <br data-v-6beb82bc> Wait..are you leaving?. Please don&#39;t.. I&#39;m scared... <br data-v-6beb82bc> Please.. I beg you.. don&#39;t leave me here alone.. <br data-v-6beb82bc><br data-v-6beb82bc><br data-v-6beb82bc><a href="./r" data-v-6beb82bc><b style="letter-spacing:3px;font-weight:bolder;font-size:20px;" data-v-6beb82bc>D\u0335\u033E\u033F\u0358\u033E\u0343\u034B\u0354\u0323\u0320\u032F\u0326\u0317o\u0335\u035D\u035D\u0305\u035D\u0350\u0323\u0327\u0321\u0327\u034D\u0318\u033C\u035AN\u0334\u0343\u0315\u0305\u0342\u0344\u0307\u031E\u031E\u031D\u0316\u0355\u0354\u0328\u0320\u0323&#39;\u0335\u0307\u035D\u030B\u0357\u030C\u0352\u0302\u0315\u034A\u0345\u034D\u0321\u0317\u0353\u0324t\u0335\u0343\u030A\u0358\u034C\u0315\u032A\u0322 \u0337\u035D\u0314\u0300\u0301\u0311\u033F\u0342\u032C\u031E\u2558\u0337\u0312\u032D\u0316\u032D\u033B\u033Ae\u0338\u0343\u0311\u030E\u033F\u033E\u0343\u0311\u0307\u0303\u0354\u0333\u0349a\u0334\u0300\u0306\u034C\u0356\u0331\u0323\u0333\u032C\u0316\u0356\u0354\u032Ev\u0336\u0315\u0312\u0308\u0344\u0315\u030D\u030E\u0317\u0321\u0328\u0322\u0345\u0324e\u0338\u0351\u0303\u034E\u0345\u0330</b></a></p></div>',2),gt=[vt];function bt(e,t,n,i,r,a){return c(),l("div",ft,gt)}var wt=u(ht,[["render",bt],["__scopeId","data-v-6beb82bc"]]);const $t={name:"Home",components:{Others:wt,About:mt,Contact:it,ProjectsView:Je,HomeBanner:Be,NavHeader:C}};function yt(e,t,n,i,r,a){const s=_("HomeBanner"),p=_("NavHeader"),f=_("About"),v=_("ProjectsView"),H=_("Contact"),j=_("Others");return c(),l(g,null,[d(s),d(p),d(f),d(v),d(H),d(j)],64)}var xt=u($t,[["render",yt]]);function It(){let e=document.getElementById("dancing_guy");e!=null&&(e.textContent==="<( ' v ' <)-"?e.textContent="-(> ' v ' )>":e.textContent="<( ' v ' <)-")}let St=setInterval(It,300);const kt={name:"RouteR",components:{Header:C},unmounted(){clearInterval(St)}},Pt=e=>(m("data-v-4ed1838b"),e=e(),h(),e),Ct=Pt(()=>o("div",{id:"contents"},[o("iframe",{id:"video",style:{height:"100vh",width:"100vw"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:"",frameborder:"0",src:"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",title:"YouTube video player"}),o("div",{id:"dance-ctn"},[o("h1",{id:"dancing_guy",style:{"font-size":"128px",background:"white",padding:"8px",width:"fit-content"}}," \\( ' v ' )/ ")])],-1));function Tt(e,t,n,i,r,a){const s=_("Header");return c(),l(g,null,[d(s),Ct],64)}var Bt=u(kt,[["render",Tt],["__scopeId","data-v-4ed1838b"]]);const Lt=V({history:O(),routes:[{path:"/",name:"Home",component:xt},{path:"/r",name:"Rock",component:Bt}],scrollBehavior(e,t,n){var i;if(e.hash){let r=document.querySelector(e.hash);r?r.scrollIntoView({behavior:"smooth"}):(console.log("D"),(i=document.querySelector("#app"))==null||i.scrollTo(0,0))}}});M(U).use(Lt).mount("#app");
