import{a as V}from"./axios-L6U4YIEh.js";import{h as x,_ as b,o as a,c as i,E as $,G as C,e,m as S,r as p,a as r,w as d,b as u,W as F,C as _,D as h,A as k,z as f,F as O,x as D}from"./index-Kc8cdeaF.js";import{c as w}from"./cartStore-vbYV3YKm.js";import{c as E}from"./confirmOrderDataStore-vqL-A-4f.js";import{T as I}from"./ToastComponent-f3p7ZQNb.js";var P={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_API:"potoro",BASE_URL:"/VueMission1/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:R,VITE_API:B}=P,L={data(){return{orderID:"",checkoutData:""}},methods:{...x(E,["storeData"]),getOrder(){const t=`${R}/api/${B}/order/${this.orderID.trim()}`;V.get(t).then(s=>{this.isLoading=!1,s.data.order&&Object.keys(s.data.order).length>0?(this.checkoutData=s.data.order,this.storeData(this.checkoutData),this.$router.push({path:"/checkorder",query:{data:JSON.stringify(this.checkoutData)}}).catch(()=>{this.$emit("showFailedToast",{message:"Order not found. Please enter the correct Order Number.",bgClass:"bg-danger"})})):this.$emit("showFailedToast",{message:"Order not found. Please enter the correct Order Number.",bgClass:"bg-danger"})}).catch(()=>{this.$emit("showFailedToast",{message:"An error occurred. Please try again.",bgClass:"bg-danger"})})}}},N={class:"input-group"};function z(t,s,g,v,o,l){return a(),i("div",N,[$(e("input",{"onUpdate:modelValue":s[0]||(s[0]=c=>o.orderID=c),type:"text",class:"form-control",placeholder:"Search Your Order","aria-label":"Order Number","aria-describedby":"button-addon2"},null,512),[[C,o.orderID,void 0,{trim:!0}]]),e("button",{onClick:s[1]||(s[1]=(...c)=>l.getOrder&&l.getOrder(...c)),class:"btn btn-outline-secondary",type:"button",id:"button-addon2"}," Search ")])}const A=b(L,[["render",z]]);var U={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_API:"potoro",BASE_URL:"/VueMission1/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:M}=U,j={props:["basePath"],data(){return{isFrontView:!0,message:"",type:""}},components:{SearchBarComponent:A,ToastComponent:I},computed:{...S(w,["cart"])},methods:{handleShowToast(t){this.$emit("showFailedToast",t),this.message=t.message,this.type=t.bgClass,this.$refs.TToast.showToast()},...x(w,["getCart"]),logOut(){const t=`${M}/logout`;V.post(t).then(()=>{this.clearCookies("hexVueToken"),this.$router.push("/login")}).catch(()=>{})},clearCookies(t){document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`}},mounted(){this.isFrontView=this.basePath==="#/",this.isFrontView&&this.getCart()}},G={class:"toast-container"},J={class:"navbar navbar-expand-lg fixed-top",style:{"background-color":"#504152",padding:"0.5rem 1rem"}},q=e("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[e("span",{class:"navbar-toggler-icon"})],-1),K={class:"collapse navbar-collapse",id:"navbarSupportedContent"},W={key:0,class:"navbar-nav mr-auto"},Y={class:"nav-item"},H={class:"navbar-nav mx-auto"},Q={class:"nav-item me-4"},X={key:0,class:"nav-item me-4"},Z={class:"nav-item me-4"},ee={class:"navbar-nav mr-auto"},te={class:"nav-item"},oe={class:"position-relative"},se={class:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",style:{transform:"translate(-50%, -50%)"}},ae=e("span",{class:"visually-hidden"},"unread messages",-1),ne={class:"nav-item me-4"};function re(t,s,g,v,o,l){const c=p("ToastComponent"),n=p("router-link"),T=p("SearchBarComponent");return a(),i(O,null,[e("div",G,[r(c,{ref:"TToast",message:o.message,bgClass:o.type},null,8,["message","bgClass"])]),e("nav",J,[r(n,{class:"navbar-brand p-2",style:F({color:(o.isFrontView,"#f4f4f4"),fontSize:"24px"}),to:"/"},{default:d(()=>[u("Bookstore")]),_:1},8,["style"]),q,e("div",K,[o.isFrontView?(a(),i("ul",W,[e("li",Y,[r(T,{onShowFailedToast:l.handleShowToast},null,8,["onShowFailedToast"])])])):_("",!0),e("ul",H,[e("li",Q,[r(n,{to:o.isFrontView?"/products":"/admin/products",class:h(["nav-link",{"active-nav-link":t.$route.path==="/products"||t.$route.path==="/admin/products"}]),style:{color:"#eae0d5","font-size":"18px"}},{default:d(()=>[u("Products")]),_:1},8,["to","class"])]),o.isFrontView?_("",!0):(a(),i("li",X,[r(n,{to:"/admin/order",class:h(["nav-link",{"active-nav-link":t.$route.path==="/admin/order"}]),style:{color:"#eae0d5","font-size":"18px"}},{default:d(()=>[u("Orders")]),_:1},8,["class"])])),e("li",Z,[r(n,{to:o.isFrontView?"/about":"/admin/coupon",class:h(["nav-link",{"active-nav-link":t.$route.path==="/about"||t.$route.path==="/admin/coupon"}]),style:{color:"#eae0d5","font-size":"18px"}},{default:d(()=>[u(k(o.isFrontView?"About":"Coupon"),1)]),_:1},8,["to","class"])])]),e("ul",ee,[e("li",te,[o.isFrontView?(a(),f(n,{key:0,class:"btn pe-5",to:"/cart"},{default:d(()=>{var m,y;return[e("div",oe,[e("i",{class:h(["bi",((m=t.cart)==null?void 0:m.length)>0?"bi-cart-fill":"bi-cart"]),style:{color:"#eae0d5",fontSize:"24px"}},null,2),e("span",se,[u(k((y=t.cart)==null?void 0:y.length)+" ",1),ae])])]}),_:1})):_("",!0)]),e("li",ne,[o.isFrontView?(a(),f(n,{key:0,class:"nav-link",style:{color:"#eae0d5","font-size":"18px"},to:"/login"},{default:d(()=>[u("Log in")]),_:1})):(a(),i("button",{key:1,class:"nav-link btn",style:{color:"#eae0d5","font-size":"18px","background-color":"transparent"},onClick:s[0]||(s[0]=(...m)=>l.logOut&&l.logOut(...m))}," Log Out "))])])])])],64)}const $e=b(j,[["render",re]]),ie={props:["basePath"],data(){return{isFrontView:!1}},mounted(){this.basePath==="#/"&&(this.isFrontView=!0)}},le={class:"py-3",style:{"background-color":"#504152"}},ce={class:"container"},de={key:0},ue={class:"d-flex align-items-center justify-content-between text-white mb-md-7 mb-4"},pe={class:"d-flex list-unstyled mb-0 h4"},me={href:"#",class:"mx-3",style:{color:"#f4f4f4"}},he={href:"#",class:"mx-3",style:{color:"#f4f4f4"}},_e={href:"#",class:"ms-3",style:{color:"#f4f4f4"}},fe=D('<div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white"><div class="mb-md-0 mb-1"><p class="mb-0"><a href="tel:+02-3456-7890" style="color:#f4f4f4;text-decoration:none;">02-3456-7890</a></p><p class="mb-0"><a href="mailto:service@mail.com" style="color:#f4f4f4;text-decoration:none;">service@mail.com</a></p></div><p class="mb-0">© 2020 LOGO All Rights Reserved.</p></div>',1),be={key:1,class:"text-white"},ge=e("p",{class:"text-center"}," This website is for personal portfolio use only and will not be used for commercial purposes. ",-1),ve=[ge];function ye(t,s,g,v,o,l){const c=p("router-link"),n=p("font-awesome-icon");return a(),i("div",le,[e("div",ce,[this.isFrontView?(a(),i("div",de,[e("div",ue,[o.isFrontView?(a(),f(c,{key:0,class:"h4",style:{color:"#f4f4f4"},to:"/"},{default:d(()=>[u("BOOKS")]),_:1})):_("",!0),e("ul",pe,[e("li",null,[e("a",me,[r(n,{icon:["fab","facebook"]})])]),e("li",null,[e("a",he,[r(n,{icon:["fab","instagram"]})])]),e("li",null,[e("a",_e,[r(n,{icon:["fab","line"]})])])])]),fe])):(a(),i("div",be,ve))])])}const Ce=b(ie,[["render",ye]]);export{Ce as F,$e as N};
