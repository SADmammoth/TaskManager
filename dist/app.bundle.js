!function(e){function t(t){for(var r,o,i=t[0],s=t[1],c=t[2],u=0,p=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(m&&m(t);p.length;)p.shift()();return l.push.apply(l,c||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(l.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={0:0},l=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="./";var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var m=s;l.push([50,1]),n()}({21:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return r}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function r(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}}).call(this,n(49))},32:function(e,t,n){var r=n(33);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(35)(r,a);r.locals&&(e.exports=r.locals)},33:function(e,t,n){(e.exports=n(34)(!1)).push([e.i,".App {\r\n  text-align: center; }\r\n\r\n.App-logo {\r\n  animation: App-logo-spin infinite 20s linear;\r\n  height: 40vmin;\r\n  pointer-events: none; }\r\n\r\n.App-header {\r\n  background-color: #282c34;\r\n  min-height: 100vh;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: calc(10px + 2vmin);\r\n  color: white; }\r\n\r\n.App-link {\r\n  color: #61dafb; }\r\n\r\n@keyframes App-logo-spin {\r\n  from {\r\n    transform: rotate(0deg); }\r\n  to {\r\n    transform: rotate(360deg); } }\r\n\r\n.blinking {\r\n  animation: blink 1s infinite ease-in-out; }\r\n\r\n@keyframes blink {\r\n  from {\r\n    opacity: 0; }\r\n  to {\r\n    opacity: 1; } }\r\n\r\n.blinking {\r\n  animation: blink 2s infinite ease-in-out 1s; }\r\n\r\n@keyframes blink {\r\n  from {\r\n    opacity: 0; }\r\n  50% {\r\n    opacity: 1; }\r\n  to {\r\n    opacity: 0; } }\r\n",""])},50:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(18),o=n.n(l),i=n(8);class s extends a.a.Component{embedValidator(){}embedController(){}render(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.Helmet,null,a.a.createElement("meta",{charSet:"utf-8"}),a.a.createElement("title",null,"AddTask")),a.a.createElement("h1",null,"Hello"))}}class c extends a.a.Component{embedValidator(){}embedController(){}render(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.Helmet,null,a.a.createElement("meta",{charSet:"utf-8"}),a.a.createElement("title",null,"Home")),a.a.createElement("h1",null,"Home"))}}n(32);class m extends a.a.Component{embedValidator(){}embedController(){}render(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.Helmet,null,a.a.createElement("meta",{charSet:"utf-8"}),a.a.createElement("title",null,"404")),a.a.createElement("h1",null,"404"))}}var u=n(6),p=n(10),d=n(5),h=n.n(d);const f=n(37);function g(e){return a.a.createElement(a.a.Fragment,null,Object.keys(e.items).map(t=>a.a.createElement("li",{className:"nav-item",key:f.generate()},a.a.createElement(p.b,{to:e.items[t]},t))))}g.propTypes={items:h.a.objectOf(h.a.string)};class b{async start(e){let t=new Date;e(t);let n=6e4-1e3*t.getSeconds()-t.getMilliseconds();setTimeout(()=>{e(new Date),this.repeater=setInterval(()=>e(new Date),6e4)},n)}stop(){clearInterval(this.repeater)}}n(48);const E=new class{constructor(...e){if(1===e.length&&"object"==typeof e[0]){for(let t in e[0])this[t]=e[0][t];return Object.freeze(this)}for(let t in e)this[t]=e[t];return Object.freeze(this)}}({1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"});class y extends a.a.Component{constructor(e){super(e),this.update=this.update.bind(this),this.state={},this.minutesUpdater=new b}UNSAFE_componentWillMount(){this.minutesUpdater.start(this.update)}componentWillUnmount(){this.minutesUpdater.stop()}render(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"clock"},a.a.createElement("span",{key:"mth"+this.state.month},E[this.state.month+1]),a.a.createElement("span",{key:"d"+this.state.day},", ",this.state.day),a.a.createElement("br",null),a.a.createElement("span",{key:"h"+this.state.hours},this.state.hours.toString().padStart(2,"0")),a.a.createElement("span",{className:"blinking"},":"),a.a.createElement("span",{key:"m"+this.state.minutes},this.state.minutes.toString().padStart(2,"0"))))}update(e){this.setState({month:e.getMonth(),day:e.getDate(),hours:e.getHours(),minutes:e.getMinutes()})}}function v(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("header",null,a.a.createElement("div",{className:"logo"},a.a.createElement("img",{src:"",alt:"",title:""})),a.a.createElement("p",{className:"sitename"},"TaskManager"),a.a.createElement("nav",{className:"header-nav"},a.a.createElement("ul",null,a.a.createElement(g,{items:{Main:"/",AddTask:"/add"}}))),e.location&&"/404-error-page"!==e.location.pathname?a.a.createElement(y,null):""))}class k extends a.a.Component{render(){let e=Object(u.g)(v);return a.a.createElement(a.a.Fragment,null,a.a.createElement(p.a,null,a.a.createElement(e,null),a.a.createElement(u.d,null,a.a.createElement(u.b,{exact:!0,path:"/",component:c}),a.a.createElement(u.b,{path:"/add",component:s}),a.a.createElement(u.b,{path:"/404-error-page",component:m}),a.a.createElement(u.b,null,a.a.createElement(u.a,{to:"/404-error-page"})))))}}var w=k,x=n(21);o.a.render(a.a.createElement(w,null),document.getElementById("root")),x.a()}});
//# sourceMappingURL=app.bundle.js.map