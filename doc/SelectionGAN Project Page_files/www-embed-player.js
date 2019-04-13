(function(){var m;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
function ba(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
var ca="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},da;
if("function"==typeof Object.setPrototypeOf)da=Object.setPrototypeOf;else{var ea;a:{var fa={na:!0},ha={};try{ha.__proto__=fa;ea=ha.na;break a}catch(a){}ea=!1}da=ea?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ia=da;
function n(a,b){a.prototype=ca(b.prototype);a.prototype.constructor=a;if(ia)ia(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.A=b.prototype}
var ja="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ka="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;
function la(a,b){if(b){for(var c=ka,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];f in c||(c[f]={});c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ja(c,d,{configurable:!0,writable:!0,value:f})}}
function ma(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
la("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=ma(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,h=Math.max(0,Math.min(c|0,d.length)),g=0;g<f&&h<e;)if(d[h++]!=b[g++])return!1;return g>=f}});
la("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=ma(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
function oa(){oa=function(){};
ka.Symbol||(ka.Symbol=pa)}
function qa(a,b){this.b=a;ja(this,"description",{configurable:!0,writable:!0,value:b})}
qa.prototype.toString=function(){return this.b};
var pa=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new qa("jscomp_symbol_"+(c||"")+"_"+b++,c)}
var b=0;return a}();
function ra(){oa();var a=ka.Symbol.iterator;a||(a=ka.Symbol.iterator=ka.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&ja(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return sa(aa(this))}});
ra=function(){}}
function sa(a){ra();a={next:a};a[ka.Symbol.iterator]=function(){return this};
return a}
function ta(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var ua="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)ta(d,e)&&(a[e]=d[e])}return a};
la("Object.assign",function(a){return a||ua});
la("WeakMap",function(a){function b(g){this.b=(h+=Math.random()+1).toString();if(g){g=ba(g);for(var k;!(k=g.next()).done;)k=k.value,this.set(k[0],k[1])}}
function c(){}
function d(g){if(!ta(g,f)){var k=new c;ja(g,f,{value:k})}}
function e(g){var k=Object[g];k&&(Object[g]=function(l){if(l instanceof c)return l;d(l);return k(l)})}
if(function(){if(!a||!Object.seal)return!1;try{var g=Object.seal({}),k=Object.seal({}),l=new a([[g,2],[k,3]]);if(2!=l.get(g)||3!=l.get(k))return!1;l["delete"](g);l.set(k,4);return!l.has(g)&&4==l.get(k)}catch(q){return!1}}())return a;
var f="$jscomp_hidden_"+Math.random();e("freeze");e("preventExtensions");e("seal");var h=0;b.prototype.set=function(g,k){d(g);if(!ta(g,f))throw Error("WeakMap key fail: "+g);g[f][this.b]=k;return this};
b.prototype.get=function(g){return ta(g,f)?g[f][this.b]:void 0};
b.prototype.has=function(g){return ta(g,f)&&ta(g[f],this.b)};
b.prototype["delete"]=function(g){return ta(g,f)&&ta(g[f],this.b)?delete g[f][this.b]:!1};
return b});
la("Map",function(a){function b(){var g={};return g.previous=g.next=g.head=g}
function c(g,k){var l=g.b;return sa(function(){if(l){for(;l.head!=g.b;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(g,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++h,f.set(k,l)):l="p_"+k;var q=g.f[l];if(q&&ta(g.f,l))for(var t=0;t<q.length;t++){var w=q[t];if(k!==k&&w.key!==w.key||k===w.key)return{id:l,list:q,index:t,o:w}}return{id:l,list:q,index:-1,o:void 0}}
function e(g){this.f={};this.b=b();this.size=0;if(g){g=ba(g);for(var k;!(k=g.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var g=Object.seal({x:4}),k=new a(ba([[g,"s"]]));if("s"!=k.get(g)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),q=l.next();if(q.done||q.value[0]!=g||"s"!=q.value[1])return!1;q=l.next();return q.done||4!=q.value[0].x||"t"!=q.value[1]||!l.next().done?!1:!0}catch(t){return!1}}())return a;
ra();var f=new WeakMap;e.prototype.set=function(g,k){g=0===g?0:g;var l=d(this,g);l.list||(l.list=this.f[l.id]=[]);l.o?l.o.value=k:(l.o={next:this.b,previous:this.b.previous,head:this.b,key:g,value:k},l.list.push(l.o),this.b.previous.next=l.o,this.b.previous=l.o,this.size++);return this};
e.prototype["delete"]=function(g){g=d(this,g);return g.o&&g.list?(g.list.splice(g.index,1),g.list.length||delete this.f[g.id],g.o.previous.next=g.o.next,g.o.next.previous=g.o.previous,g.o.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.f={};this.b=this.b.previous=b();this.size=0};
e.prototype.has=function(g){return!!d(this,g).o};
e.prototype.get=function(g){return(g=d(this,g).o)&&g.value};
e.prototype.entries=function(){return c(this,function(g){return[g.key,g.value]})};
e.prototype.keys=function(){return c(this,function(g){return g.key})};
e.prototype.values=function(){return c(this,function(g){return g.value})};
e.prototype.forEach=function(g,k){for(var l=this.entries(),q;!(q=l.next()).done;)q=q.value,g.call(k,q[1],q[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var h=0;return e});
la("Set",function(a){function b(c){this.b=new Map;if(c){c=ba(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.b.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(ba([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(h){return!1}}())return a;
ra();b.prototype.add=function(c){c=0===c?0:c;this.b.set(c,c);this.size=this.b.size;return this};
b.prototype["delete"]=function(c){c=this.b["delete"](c);this.size=this.b.size;return c};
b.prototype.clear=function(){this.b.clear();this.size=0};
b.prototype.has=function(c){return this.b.has(c)};
b.prototype.entries=function(){return this.b.entries()};
b.prototype.values=function(){return this.b.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.b.forEach(function(f){return c.call(d,f,f,e)})};
return b});
la("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});
la("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==ma(this,b,"includes").indexOf(b,c||0)}});
(function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);
e=ca(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}})();
var r=this;function u(a){return void 0!==a}
function v(a){return"string"==typeof a}
function x(a,b,c){a=a.split(".");c=c||r;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&u(b)?c[d]=b:c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}}
var va=/^[\w+/_-]+[=]{0,2}$/,wa=null;function y(a,b){for(var c=a.split("."),d=b||r,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
function xa(){}
function ya(a){a.ba=void 0;a.getInstance=function(){return a.ba?a.ba:a.ba=new a}}
function za(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function Aa(a){return"array"==za(a)}
function Ba(a){var b=za(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function Ca(a){return"function"==za(a)}
function Da(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
var Ea="closure_uid_"+(1E9*Math.random()>>>0),Fa=0;function Ga(a,b,c){return a.call.apply(a.bind,arguments)}
function Ha(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function z(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?z=Ga:z=Ha;return z.apply(null,arguments)}
function Ia(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
var A=Date.now||function(){return+new Date};
function Ja(a,b){x(a,b,void 0)}
function B(a,b){function c(){}
c.prototype=b.prototype;a.A=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.jb=function(d,e,f){for(var h=Array(arguments.length-2),g=2;g<arguments.length;g++)h[g-2]=arguments[g];return b.prototype[e].apply(d,h)}}
;var C=window;function D(a){if(Error.captureStackTrace)Error.captureStackTrace(this,D);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
B(D,Error);D.prototype.name="CustomError";var La=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if(v(a))return v(b)&&1==b.length?a.indexOf(b,0):-1;
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},E=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=v(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ma=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f=v(a)?a.split(""):a,h=0;h<c;h++)if(h in f){var g=f[h];
b.call(void 0,g,h,a)&&(d[e++]=g)}return d},Na=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e=v(a)?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},Oa=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
E(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function Pa(a,b){a:{var c=a.length;for(var d=v(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:v(a)?a.charAt(c):a[c]}
function Qa(a,b){var c=La(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
function Ra(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Sa(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Ba(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var h=0;h<f;h++)a[e+h]=d[h]}else a.push(d)}}
;var Ta=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function Ua(a,b){if(b)a=a.replace(Va,"&amp;").replace(Wa,"&lt;").replace(Xa,"&gt;").replace(Ya,"&quot;").replace(Za,"&#39;").replace($a,"&#0;");else{if(!ab.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Va,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Wa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Xa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(Ya,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Za,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace($a,"&#0;"))}return a}
var Va=/&/g,Wa=/</g,Xa=/>/g,Ya=/"/g,Za=/'/g,$a=/\x00/g,ab=/[\x00&<>"']/;function bb(a){return a=Ua(a,void 0)}
function cb(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var db;a:{var eb=r.navigator;if(eb){var fb=eb.userAgent;if(fb){db=fb;break a}}db=""}function F(a){return-1!=db.indexOf(a)}
;function gb(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function hb(a,b){var c=Ba(b),d=c?b:arguments;for(c=c?0:1;c<d.length;c++){if(null==a)return;a=a[d[c]]}return a}
function ib(a){var b=jb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function kb(a){for(var b in a)return!1;return!0}
function lb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function mb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0}
function nb(a){var b={},c;for(c in a)b[c]=a[c];return b}
function ob(a){var b=za(a);if("object"==b||"array"==b){if(Ca(a.clone))return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=ob(a[c]);return b}return a}
var pb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function qb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<pb.length;f++)c=pb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var rb=F("Opera"),sb=F("Trident")||F("MSIE"),tb=F("Edge"),ub=F("Gecko")&&!(-1!=db.toLowerCase().indexOf("webkit")&&!F("Edge"))&&!(F("Trident")||F("MSIE"))&&!F("Edge"),vb=-1!=db.toLowerCase().indexOf("webkit")&&!F("Edge");function wb(){var a=r.document;return a?a.documentMode:void 0}
var xb;a:{var yb="",zb=function(){var a=db;if(ub)return/rv:([^\);]+)(\)|;)/.exec(a);if(tb)return/Edge\/([\d\.]+)/.exec(a);if(sb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(vb)return/WebKit\/(\S+)/.exec(a);if(rb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
zb&&(yb=zb?zb[1]:"");if(sb){var Ab=wb();if(null!=Ab&&Ab>parseFloat(yb)){xb=String(Ab);break a}}xb=yb}var Bb=xb,Db;var Eb=r.document;Db=Eb&&sb?wb()||("CSS1Compat"==Eb.compatMode?parseInt(Bb,10):5):void 0;var Fb=null,Gb=null;function Hb(a){this.b=a||{cookie:""}}
m=Hb.prototype;m.isEnabled=function(){return navigator.cookieEnabled};
m.set=function(a,b,c,d,e,f){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');u(c)||(c=-1);e=e?";domain="+e:"";d=d?";path="+d:"";f=f?";secure":"";c=0>c?"":0==c?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(A()+1E3*c)).toUTCString();this.b.cookie=a+"="+b+e+d+c+f};
m.get=function(a,b){for(var c=a+"=",d=(this.b.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Ta(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
m.remove=function(a,b,c){var d=u(this.get(a));this.set(a,"",0,b,c);return d};
m.isEmpty=function(){return!this.b.cookie};
m.clear=function(){for(var a=(this.b.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=Ta(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var Ib=new Hb("undefined"==typeof document?null:document);function Jb(a){var b=y("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if(v(a))return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(f){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||r.$googDebugFname||b}catch(f){e="Not available",c=!0}return!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:(b=a.message,null==b&&(a.constructor&&a.constructor instanceof
Function?(a.constructor.name?b=a.constructor.name:(b=a.constructor,Kb[b]?b=Kb[b]:(b=String(b),Kb[b]||(c=/function\s+([^\(]+)/m.exec(b),Kb[b]=c?c[1]:"[Anonymous]"),b=Kb[b])),b='Unknown Error of type "'+b+'"'):b="Unknown Error of unknown type"),{message:b,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:a.stack||"Not available"})}
var Kb={};function Lb(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;var Mb=!sb||9<=Number(Db);function Nb(){this.b="";this.f=Ob}
Nb.prototype.J=!0;Nb.prototype.I=function(){return this.b.toString()};
Nb.prototype.aa=!0;Nb.prototype.X=function(){return 1};
function Pb(a){if(a instanceof Nb&&a.constructor===Nb&&a.f===Ob)return a.b;za(a);return"type_error:TrustedResourceUrl"}
var Ob={};function G(){this.b="";this.f=Qb}
G.prototype.J=!0;G.prototype.I=function(){return this.b.toString()};
G.prototype.aa=!0;G.prototype.X=function(){return 1};
function Rb(a){if(a instanceof G&&a.constructor===G&&a.f===Qb)return a.b;za(a);return"type_error:SafeUrl"}
var Sb=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;function Tb(a){if(a instanceof G)return a;a="object"==typeof a&&a.J?a.I():String(a);Sb.test(a)||(a="about:invalid#zClosurez");return Ub(a)}
var Qb={};function Ub(a){var b=new G;b.b=a;return b}
Ub("about:blank");function Vb(){this.b="";this.g=Wb;this.f=null}
Vb.prototype.aa=!0;Vb.prototype.X=function(){return this.f};
Vb.prototype.J=!0;Vb.prototype.I=function(){return this.b.toString()};
var Wb={};function Xb(a,b){var c=new Vb;c.b=a;c.f=b;return c}
Xb("<!DOCTYPE html>",0);Xb("",0);Xb("<br>",0);function Yb(a,b){var c=b instanceof G?b:Tb(b);a.href=Rb(c)}
function Zb(a,b){a.src=Pb(b);if(null===wa)b:{var c=r.document;if((c=c.querySelector&&c.querySelector("script[nonce]"))&&(c=c.nonce||c.getAttribute("nonce"))&&va.test(c)){wa=c;break b}wa=""}c=wa;c&&a.setAttribute("nonce",c)}
;function $b(a,b){this.x=u(a)?a:0;this.y=u(b)?b:0}
m=$b.prototype;m.clone=function(){return new $b(this.x,this.y)};
m.equals=function(a){return a instanceof $b&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
m.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
m.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
m.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function ac(a,b){this.width=a;this.height=b}
m=ac.prototype;m.clone=function(){return new ac(this.width,this.height)};
m.aspectRatio=function(){return this.width/this.height};
m.isEmpty=function(){return!(this.width*this.height)};
m.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
m.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
m.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function bc(a){var b=document;return v(a)?b.getElementById(a):a}
function cc(a,b){gb(b,function(c,d){c&&"object"==typeof c&&c.J&&(c=c.I());"style"==d?a.style.cssText=c:"class"==d?a.className=c:"for"==d?a.htmlFor=c:dc.hasOwnProperty(d)?a.setAttribute(dc[d],c):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,c):a[d]=c})}
var dc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function ec(a,b,c){var d=arguments,e=document,f=String(d[0]),h=d[1];if(!Mb&&h&&(h.name||h.type)){f=["<",f];h.name&&f.push(' name="',bb(h.name),'"');if(h.type){f.push(' type="',bb(h.type),'"');var g={};qb(g,h);delete g.type;h=g}f.push(">");f=f.join("")}f=e.createElement(f);h&&(v(h)?f.className=h:Aa(h)?f.className=h.join(" "):cc(f,h));2<d.length&&fc(e,f,d);return f}
function fc(a,b,c){function d(h){h&&b.appendChild(v(h)?a.createTextNode(h):h)}
for(var e=2;e<c.length;e++){var f=c[e];!Ba(f)||Da(f)&&0<f.nodeType?d(f):E(gc(f)?Ra(f):f,d)}}
function gc(a){if(a&&"number"==typeof a.length){if(Da(a))return"function"==typeof a.item||"string"==typeof a.item;if(Ca(a))return"function"==typeof a.item}return!1}
function hc(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function ic(a){jc();var b=new Nb;b.b=a;return b}
var jc=xa;function kc(a){var b=lc;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function mc(){var a=[];kc(function(b){a.push(b)});
return a}
var lc={Va:"allow-forms",Wa:"allow-modals",Xa:"allow-orientation-lock",Ya:"allow-pointer-lock",Za:"allow-popups",ab:"allow-popups-to-escape-sandbox",bb:"allow-presentation",cb:"allow-same-origin",eb:"allow-scripts",fb:"allow-top-navigation",gb:"allow-top-navigation-by-user-activation"},nc=Lb(function(){return mc()});
function oc(){var a=document.createElement("IFRAME").sandbox,b=a&&a.supports;if(!b)return{};var c={};E(nc(),function(d){b.call(a,d)&&(c[d]=!0)});
return c}
;function pc(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var qc=(new Date).getTime();function rc(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a&&"app"!==a)throw Error("Invalid URI scheme in origin: "+a);c="";var d=b.indexOf(":");if(-1!=d){var e=
b.substring(d+1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;function sc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;q=l=0}
function b(t){for(var w=h,p=0;64>p;p+=4)w[p/4]=t[p]<<24|t[p+1]<<16|t[p+2]<<8|t[p+3];for(p=16;80>p;p++)t=w[p-3]^w[p-8]^w[p-14]^w[p-16],w[p]=(t<<1|t>>>31)&4294967295;t=e[0];var H=e[1],V=e[2],na=e[3],tc=e[4];for(p=0;80>p;p++){if(40>p)if(20>p){var Ka=na^H&(V^na);var Cb=1518500249}else Ka=H^V^na,Cb=1859775393;else 60>p?(Ka=H&V|na&(H|V),Cb=2400959708):(Ka=H^V^na,Cb=3395469782);Ka=((t<<5|t>>>27)&4294967295)+Ka+tc+Cb+w[p]&4294967295;tc=na;na=V;V=(H<<30|H>>>2)&4294967295;H=t;t=Ka}e[0]=e[0]+t&4294967295;e[1]=
e[1]+H&4294967295;e[2]=e[2]+V&4294967295;e[3]=e[3]+na&4294967295;e[4]=e[4]+tc&4294967295}
function c(t,w){if("string"===typeof t){t=unescape(encodeURIComponent(t));for(var p=[],H=0,V=t.length;H<V;++H)p.push(t.charCodeAt(H));t=p}w||(w=t.length);p=0;if(0==l)for(;p+64<w;)b(t.slice(p,p+64)),p+=64,q+=64;for(;p<w;)if(f[l++]=t[p++],q++,64==l)for(l=0,b(f);p+64<w;)b(t.slice(p,p+64)),p+=64,q+=64}
function d(){var t=[],w=8*q;56>l?c(g,56-l):c(g,64-(l-56));for(var p=63;56<=p;p--)f[p]=w&255,w>>>=8;b(f);for(p=w=0;5>p;p++)for(var H=24;0<=H;H-=8)t[w++]=e[p]>>H&255;return t}
for(var e=[],f=[],h=[],g=[128],k=1;64>k;++k)g[k]=0;var l,q;a();return{reset:a,update:c,digest:d,qa:function(){for(var t=d(),w="",p=0;p<t.length;p++)w+="0123456789ABCDEF".charAt(Math.floor(t[p]/16))+"0123456789ABCDEF".charAt(t[p]%16);return w}}}
;function uc(a,b,c){var d=[],e=[];if(1==(Aa(c)?2:1))return e=[b,a],E(d,function(g){e.push(g)}),vc(e.join(" "));
var f=[],h=[];E(c,function(g){h.push(g.key);f.push(g.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];E(d,function(g){e.push(g)});
a=vc(e.join(" "));a=[c,a];0==h.length||a.push(h.join(""));return a.join("_")}
function vc(a){var b=sc();b.update(a);return b.qa().toLowerCase()}
;function wc(a){var b=rc(String(r.location.href)),c=r.__OVERRIDE_SID;null==c&&(c=(new Hb(document)).get("SID"));if(c&&(b=(c=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:"))?r.__SAPISID:r.__APISID,null==b&&(b=(new Hb(document)).get(c?"SAPISID":"APISID")),b)){c=c?"SAPISIDHASH":"APISIDHASH";var d=String(r.location.href);return d&&b&&c?[c,uc(rc(d),b,a||null)].join(" "):null}return null}
;function xc(a,b){this.g=a;this.h=b;this.f=0;this.b=null}
xc.prototype.get=function(){if(0<this.f){this.f--;var a=this.b;this.b=a.next;a.next=null}else a=this.g();return a};
function yc(a,b){a.h(b);100>a.f&&(a.f++,b.next=a.b,a.b=b)}
;function zc(a){r.setTimeout(function(){throw a;},0)}
var Ac;
function Bc(){var a=r.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!F("Presto")&&(a=function(){var e=document.createElement("IFRAME");e.style.display="none";e.src="";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.write("");e.close();var h="callImmediate"+Math.random(),g="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=z(function(k){if(("*"==g||k.origin==g)&&k.data==
h)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(h,g)}}});
if("undefined"!==typeof a&&!F("Trident")&&!F("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(u(c.next)){c=c.next;var e=c.ea;c.ea=null;e()}};
return function(e){d.next={ea:e};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(e){var f=document.createElement("SCRIPT");
f.onreadystatechange=function(){f.onreadystatechange=null;f.parentNode.removeChild(f);f=null;e();e=null};
document.documentElement.appendChild(f)}:function(e){r.setTimeout(e,0)}}
;function Cc(){this.f=this.b=null}
var Ec=new xc(function(){return new Dc},function(a){a.reset()});
Cc.prototype.add=function(a,b){var c=Ec.get();c.set(a,b);this.f?this.f.next=c:this.b=c;this.f=c};
Cc.prototype.remove=function(){var a=null;this.b&&(a=this.b,this.b=this.b.next,this.b||(this.f=null),a.next=null);return a};
function Dc(){this.next=this.scope=this.b=null}
Dc.prototype.set=function(a,b){this.b=a;this.scope=b;this.next=null};
Dc.prototype.reset=function(){this.next=this.scope=this.b=null};function Fc(a,b){Gc||Hc();Ic||(Gc(),Ic=!0);Jc.add(a,b)}
var Gc;function Hc(){if(r.Promise&&r.Promise.resolve){var a=r.Promise.resolve(void 0);Gc=function(){a.then(Kc)}}else Gc=function(){var b=Kc;
!Ca(r.setImmediate)||r.Window&&r.Window.prototype&&!F("Edge")&&r.Window.prototype.setImmediate==r.setImmediate?(Ac||(Ac=Bc()),Ac(b)):r.setImmediate(b)}}
var Ic=!1,Jc=new Cc;function Kc(){for(var a;a=Jc.remove();){try{a.b.call(a.scope)}catch(b){zc(b)}yc(Ec,a)}Ic=!1}
;function Lc(){this.f=-1}
;function Mc(){this.f=64;this.b=[];this.j=[];this.u=[];this.h=[];this.h[0]=128;for(var a=1;a<this.f;++a)this.h[a]=0;this.i=this.g=0;this.reset()}
B(Mc,Lc);Mc.prototype.reset=function(){this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.b[4]=3285377520;this.i=this.g=0};
function Nc(a,b,c){c||(c=0);var d=a.u;if(v(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.b[0];c=a.b[1];var h=a.b[2],g=a.b[3],k=a.b[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=g^c&(h^g);var l=1518500249}else f=c^h^g,l=1859775393;else 60>e?(f=c&h|g&(c|h),l=2400959708):(f=c^h^g,l=
3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=g;g=h;h=(c<<30|c>>>2)&4294967295;c=b;b=f}a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+c&4294967295;a.b[2]=a.b[2]+h&4294967295;a.b[3]=a.b[3]+g&4294967295;a.b[4]=a.b[4]+k&4294967295}
Mc.prototype.update=function(a,b){if(null!=a){u(b)||(b=a.length);for(var c=b-this.f,d=0,e=this.j,f=this.g;d<b;){if(0==f)for(;d<=c;)Nc(this,a,d),d+=this.f;if(v(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.f){Nc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.f){Nc(this,e);f=0;break}}this.g=f;this.i+=b}};
Mc.prototype.digest=function(){var a=[],b=8*this.i;56>this.g?this.update(this.h,56-this.g):this.update(this.h,this.f-(this.g-56));for(var c=this.f-1;56<=c;c--)this.j[c]=b&255,b/=256;Nc(this,this.j);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.b[c]>>d&255,++b;return a};function I(){this.f=this.f;this.u=this.u}
I.prototype.f=!1;I.prototype.dispose=function(){this.f||(this.f=!0,this.l())};
function Oc(a,b){a.f?u(void 0)?b.call(void 0):b():(a.u||(a.u=[]),a.u.push(u(void 0)?z(b,void 0):b))}
I.prototype.l=function(){if(this.u)for(;this.u.length;)this.u.shift()()};
function Pc(a){a&&"function"==typeof a.dispose&&a.dispose()}
function Qc(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];Ba(d)?Qc.apply(null,d):Pc(d)}}
;function Rc(a){if(a.classList)return a.classList;a=a.className;return v(a)&&a.match(/\S+/g)||[]}
function Sc(a,b){if(a.classList)var c=a.classList.contains(b);else c=Rc(a),c=0<=La(c,b);return c}
function Tc(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):Sc(a,"inverted-hdpi")&&(a.className=Ma(Rc(a),function(b){return"inverted-hdpi"!=b}).join(" "))}
;var Uc="StopIteration"in r?r.StopIteration:{message:"StopIteration",stack:""};function Vc(){}
Vc.prototype.next=function(){throw Uc;};
Vc.prototype.F=function(){return this};
function Wc(a){if(a instanceof Vc)return a;if("function"==typeof a.F)return a.F(!1);if(Ba(a)){var b=0,c=new Vc;c.next=function(){for(;;){if(b>=a.length)throw Uc;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function Xc(a,b){if(Ba(a))try{E(a,b,void 0)}catch(c){if(c!==Uc)throw c;}else{a=Wc(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==Uc)throw c;}}}
function Yc(a){if(Ba(a))return Ra(a);a=Wc(a);var b=[];Xc(a,function(c){b.push(c)});
return b}
;function Zc(a,b){this.g={};this.b=[];this.h=this.f=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof Zc)for(c=$c(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function $c(a){ad(a);return a.b.concat()}
m=Zc.prototype;m.equals=function(a,b){if(this===a)return!0;if(this.f!=a.f)return!1;var c=b||bd;ad(this);for(var d,e=0;d=this.b[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function bd(a,b){return a===b}
m.isEmpty=function(){return 0==this.f};
m.clear=function(){this.g={};this.h=this.f=this.b.length=0};
m.remove=function(a){return Object.prototype.hasOwnProperty.call(this.g,a)?(delete this.g[a],this.f--,this.h++,this.b.length>2*this.f&&ad(this),!0):!1};
function ad(a){if(a.f!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.g,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.f!=a.b.length){var e={};for(c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
m.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.g,a)?this.g[a]:b};
m.set=function(a,b){Object.prototype.hasOwnProperty.call(this.g,a)||(this.f++,this.b.push(a),this.h++);this.g[a]=b};
m.forEach=function(a,b){for(var c=$c(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
m.clone=function(){return new Zc(this)};
m.F=function(a){ad(this);var b=0,c=this.h,d=this,e=new Vc;e.next=function(){if(c!=d.h)throw Error("The map has changed since the iterator was created");if(b>=d.b.length)throw Uc;var f=d.b[b++];return a?f:d.g[f]};
return e};function cd(a){var b=[];dd(new ed,a,b);return b.join("")}
function ed(){}
function dd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(Aa(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),dd(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),fd(d,c),c.push(":"),dd(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":fd(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var gd={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},hd=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function fd(a,b){b.push('"',a.replace(hd,function(c){var d=gd[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).substr(1),gd[c]=d);return d}),'"')}
;function id(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}}
;function J(a){this.b=0;this.u=void 0;this.h=this.f=this.g=null;this.i=this.j=!1;if(a!=xa)try{var b=this;a.call(void 0,function(c){jd(b,2,c)},function(c){jd(b,3,c)})}catch(c){jd(this,3,c)}}
function kd(){this.next=this.context=this.onRejected=this.f=this.b=null;this.g=!1}
kd.prototype.reset=function(){this.context=this.onRejected=this.f=this.b=null;this.g=!1};
var ld=new xc(function(){return new kd},function(a){a.reset()});
function md(a,b,c){var d=ld.get();d.f=a;d.onRejected=b;d.context=c;return d}
function nd(a){return new J(function(b,c){c(a)})}
J.prototype.then=function(a,b,c){return od(this,Ca(a)?a:null,Ca(b)?b:null,c)};
J.prototype.$goog_Thenable=!0;function pd(a,b){return od(a,null,b,void 0)}
J.prototype.cancel=function(a){0==this.b&&Fc(function(){var b=new qd(a);rd(this,b)},this)};
function rd(a,b){if(0==a.b)if(a.g){var c=a.g;if(c.f){for(var d=0,e=null,f=null,h=c.f;h&&(h.g||(d++,h.b==a&&(e=h),!(e&&1<d)));h=h.next)e||(f=h);e&&(0==c.b&&1==d?rd(c,b):(f?(d=f,d.next==c.h&&(c.h=d),d.next=d.next.next):sd(c),td(c,e,3,b)))}a.g=null}else jd(a,3,b)}
function ud(a,b){a.f||2!=a.b&&3!=a.b||vd(a);a.h?a.h.next=b:a.f=b;a.h=b}
function od(a,b,c,d){var e=md(null,null,null);e.b=new J(function(f,h){e.f=b?function(g){try{var k=b.call(d,g);f(k)}catch(l){h(l)}}:f;
e.onRejected=c?function(g){try{var k=c.call(d,g);!u(k)&&g instanceof qd?h(g):f(k)}catch(l){h(l)}}:h});
e.b.g=a;ud(a,e);return e.b}
J.prototype.w=function(a){this.b=0;jd(this,2,a)};
J.prototype.B=function(a){this.b=0;jd(this,3,a)};
function jd(a,b,c){if(0==a.b){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.b=1;a:{var d=c,e=a.w,f=a.B;if(d instanceof J){ud(d,md(e||xa,f||null,a));var h=!0}else if(id(d))d.then(e,f,a),h=!0;else{if(Da(d))try{var g=d.then;if(Ca(g)){wd(d,g,e,f,a);h=!0;break a}}catch(k){f.call(a,k);h=!0;break a}h=!1}}h||(a.u=c,a.b=b,a.g=null,vd(a),3!=b||c instanceof qd||xd(a,c))}}
function wd(a,b,c,d,e){function f(k){g||(g=!0,d.call(e,k))}
function h(k){g||(g=!0,c.call(e,k))}
var g=!1;try{b.call(a,h,f)}catch(k){f(k)}}
function vd(a){a.j||(a.j=!0,Fc(a.m,a))}
function sd(a){var b=null;a.f&&(b=a.f,a.f=b.next,b.next=null);a.f||(a.h=null);return b}
J.prototype.m=function(){for(var a;a=sd(this);)td(this,a,this.b,this.u);this.j=!1};
function td(a,b,c,d){if(3==c&&b.onRejected&&!b.g)for(;a&&a.i;a=a.g)a.i=!1;if(b.b)b.b.g=null,yd(b,c,d);else try{b.g?b.f.call(b.context):yd(b,c,d)}catch(e){zd.call(null,e)}yc(ld,b)}
function yd(a,b,c){2==b?a.f.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function xd(a,b){a.i=!0;Fc(function(){a.i&&zd.call(null,b)})}
var zd=zc;function qd(a){D.call(this,a)}
B(qd,D);qd.prototype.name="cancel";function K(a){I.call(this);this.j=1;this.h=[];this.i=0;this.b=[];this.g={};this.m=!!a}
B(K,I);m=K.prototype;m.subscribe=function(a,b,c){var d=this.g[a];d||(d=this.g[a]=[]);var e=this.j;this.b[e]=a;this.b[e+1]=b;this.b[e+2]=c;this.j=e+3;d.push(e);return e};
function Ad(a,b,c,d){if(b=a.g[b]){var e=a.b;(b=Pa(b,function(f){return e[f+1]==c&&e[f+2]==d}))&&a.L(b)}}
m.L=function(a){var b=this.b[a];if(b){var c=this.g[b];0!=this.i?(this.h.push(a),this.b[a+1]=xa):(c&&Qa(c,a),delete this.b[a],delete this.b[a+1],delete this.b[a+2])}return!!b};
m.K=function(a,b){var c=this.g[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.m)for(e=0;e<c.length;e++){var h=c[e];Bd(this.b[h+1],this.b[h+2],d)}else{this.i++;try{for(e=0,f=c.length;e<f;e++)h=c[e],this.b[h+1].apply(this.b[h+2],d)}finally{if(this.i--,0<this.h.length&&0==this.i)for(;c=this.h.pop();)this.L(c)}}return 0!=e}return!1};
function Bd(a,b,c){Fc(function(){a.apply(b,c)})}
m.clear=function(a){if(a){var b=this.g[a];b&&(E(b,this.L,this),delete this.g[a])}else this.b.length=0,this.g={}};
m.l=function(){K.A.l.call(this);this.clear();this.h.length=0};function Cd(a){this.b=a}
Cd.prototype.set=function(a,b){u(b)?this.b.set(a,cd(b)):this.b.remove(a)};
Cd.prototype.get=function(a){try{var b=this.b.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Cd.prototype.remove=function(a){this.b.remove(a)};function Dd(a){this.b=a}
B(Dd,Cd);function Ed(a){this.data=a}
function Fd(a){return!u(a)||a instanceof Ed?a:new Ed(a)}
Dd.prototype.set=function(a,b){Dd.A.set.call(this,a,Fd(b))};
Dd.prototype.f=function(a){a=Dd.A.get.call(this,a);if(!u(a)||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Dd.prototype.get=function(a){if(a=this.f(a)){if(a=a.data,!u(a))throw"Storage: Invalid value was encountered";}else a=void 0;return a};function Gd(a){this.b=a}
B(Gd,Dd);Gd.prototype.set=function(a,b,c){if(b=Fd(b)){if(c){if(c<A()){Gd.prototype.remove.call(this,a);return}b.expiration=c}b.creation=A()}Gd.A.set.call(this,a,b)};
Gd.prototype.f=function(a){var b=Gd.A.f.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<A()||c&&c>A())Gd.prototype.remove.call(this,a);else return b}};function Hd(){}
;function Id(){}
B(Id,Hd);Id.prototype.clear=function(){var a=Yc(this.F(!0)),b=this;E(a,function(c){b.remove(c)})};function Jd(a){this.b=a}
B(Jd,Id);m=Jd.prototype;m.isAvailable=function(){if(!this.b)return!1;try{return this.b.setItem("__sak","1"),this.b.removeItem("__sak"),!0}catch(a){return!1}};
m.set=function(a,b){try{this.b.setItem(a,b)}catch(c){if(0==this.b.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
m.get=function(a){a=this.b.getItem(a);if(!v(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.b.removeItem(a)};
m.F=function(a){var b=0,c=this.b,d=new Vc;d.next=function(){if(b>=c.length)throw Uc;var e=c.key(b++);if(a)return e;e=c.getItem(e);if(!v(e))throw"Storage mechanism: Invalid value was encountered";return e};
return d};
m.clear=function(){this.b.clear()};
m.key=function(a){return this.b.key(a)};function Kd(){var a=null;try{a=window.localStorage||null}catch(b){}this.b=a}
B(Kd,Jd);function Ld(a,b){this.f=a;this.b=null;if(sb&&!(9<=Number(Db))){Md||(Md=new Zc);this.b=Md.get(a);this.b||(b?this.b=document.getElementById(b):(this.b=document.createElement("userdata"),this.b.addBehavior("#default#userData"),document.body.appendChild(this.b)),Md.set(a,this.b));try{this.b.load(this.f)}catch(c){this.b=null}}}
B(Ld,Id);var Nd={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},Md=null;function Od(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return Nd[b]})}
m=Ld.prototype;m.isAvailable=function(){return!!this.b};
m.set=function(a,b){this.b.setAttribute(Od(a),b);Pd(this)};
m.get=function(a){a=this.b.getAttribute(Od(a));if(!v(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
m.remove=function(a){this.b.removeAttribute(Od(a));Pd(this)};
m.F=function(a){var b=0,c=this.b.XMLDocument.documentElement.attributes,d=new Vc;d.next=function(){if(b>=c.length)throw Uc;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if(!v(e))throw"Storage mechanism: Invalid value was encountered";return e};
return d};
m.clear=function(){for(var a=this.b.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);Pd(this)};
function Pd(a){try{a.b.save(a.f)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function Qd(a,b){this.f=a;this.b=b+"::"}
B(Qd,Id);Qd.prototype.set=function(a,b){this.f.set(this.b+a,b)};
Qd.prototype.get=function(a){return this.f.get(this.b+a)};
Qd.prototype.remove=function(a){this.f.remove(this.b+a)};
Qd.prototype.F=function(a){var b=this.f.F(!0),c=this,d=new Vc;d.next=function(){for(var e=b.next();e.substr(0,c.b.length)!=c.b;)e=b.next();return a?e.substr(c.b.length):c.f.get(e)};
return d};var Rd=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function L(a){return a?decodeURI(a):a}
function M(a,b){return b.match(Rd)[a]||null}
function Sd(a,b,c){if(Aa(b))for(var d=0;d<b.length;d++)Sd(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function Td(a){var b=[],c;for(c in a)Sd(c,a[c],b);return b.join("&")}
function Ud(a,b){var c=Td(b);if(c){var d=a.indexOf("#");0>d&&(d=a.length);var e=a.indexOf("?");if(0>e||e>d){e=d;var f=""}else f=a.substring(e+1,d);d=[a.substr(0,e),f,a.substr(d)];e=d[1];d[1]=c?e?e+"&"+c:c:e;c=d[0]+(d[1]?"?"+d[1]:"")+d[2]}else c=a;return c}
var Vd=/#|$/;function Wd(a,b){var c=a.search(Vd);a:{var d=0;for(var e=b.length;0<=(d=a.indexOf(b,d))&&d<c;){var f=a.charCodeAt(d-1);if(38==f||63==f)if(f=a.charCodeAt(d+e),!f||61==f||38==f||35==f)break a;d+=e+1}d=-1}if(0>d)return null;e=a.indexOf("&",d);if(0>e||e>c)e=c;d+=b.length+1;return decodeURIComponent(a.substr(d,e-d).replace(/\+/g," "))}
;function Xd(){this.f=[];this.b=-1}
Xd.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.f[a]!=b&&(this.f[a]=b,this.b=-1)};
Xd.prototype.get=function(a){return!!this.f[a]};
function Yd(a){-1==a.b&&(a.b=Oa(a.f,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.b}
;function Zd(a,b){if(1<b.length)a[b[0]]=b[1];else{var c=b[0],d;for(d in c)a[d]=c[d]}}
var N=window.performance&&window.performance.timing&&window.performance.now?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};var $d=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};x("yt.config_",$d,void 0);function O(a){Zd($d,arguments)}
function P(a,b){return a in $d?$d[a]:b}
function ae(a){return P(a,void 0)}
function be(){return P("PLAYER_CONFIG",{})}
;function ce(){var a=de;y("yt.ads.biscotti.getId_")||x("yt.ads.biscotti.getId_",a,void 0)}
function ee(a){x("yt.ads.biscotti.lastId_",a,void 0)}
;function fe(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Q(b)}}:a}
function Q(a,b,c,d,e){var f=y("yt.logging.errors.log");f?f(a,b,c,d,e):(f=P("ERRORS",[]),f.push([a,b,c,d,e]),O("ERRORS",f))}
function ge(a){Q(a,"WARNING",void 0,void 0,void 0)}
;function he(){var a=ie(),b=[];gb(a,function(c,d){var e=encodeURIComponent(String(d)),f;Aa(c)?f=c:f=[c];E(f,function(h){""==h?b.push(e):b.push(e+"="+encodeURIComponent(String(h)))})});
return b.join("&")}
function je(a){"?"==a.charAt(0)&&(a=a.substr(1));a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length)try{var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),h=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?Aa(b[f])?Sa(b[f],h):b[f]=[b[f],h]:b[f]=h}catch(k){var g=Error("Error decoding URL component");g.params="key: "+e[0]+", value: "+e[1];"q"==e[0]?ge(g):Q(g)}}return b}
function ke(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=je(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);return Ud(a,e)+d}
;function ie(a){var b=le;a=void 0===a?y("yt.ads.biscotti.lastId_")||"":a;b=Object.assign(me(b),ne(b));b.ca_type="image";a&&(b.bid=a);return b}
function me(a){var b={};b.dt=qc;b.flash="0";a:{try{var c=a.b.top.location.href}catch(f){a=2;break a}a=c?c===a.f.location.href?0:1:2}b=(b.frm=a,b);b.u_tz=-(new Date).getTimezoneOffset();var d=void 0===d?C:d;try{var e=d.history.length}catch(f){e=0}b.u_his=e;b.u_java=!!C.navigator&&"unknown"!==typeof C.navigator.javaEnabled&&!!C.navigator.javaEnabled&&C.navigator.javaEnabled();C.screen&&(b.u_h=C.screen.height,b.u_w=C.screen.width,b.u_ah=C.screen.availHeight,b.u_aw=C.screen.availWidth,b.u_cd=C.screen.colorDepth);
C.navigator&&C.navigator.plugins&&(b.u_nplug=C.navigator.plugins.length);C.navigator&&C.navigator.mimeTypes&&(b.u_nmime=C.navigator.mimeTypes.length);return b}
function ne(a){var b=a.b;try{var c=b.screenX;var d=b.screenY}catch(t){}try{var e=b.outerWidth;var f=b.outerHeight}catch(t){}try{var h=b.innerWidth;var g=b.innerHeight}catch(t){}b=[b.screenLeft,b.screenTop,c,d,b.screen?b.screen.availWidth:void 0,b.screen?b.screen.availTop:void 0,e,f,h,g];c=a.b.top;try{var k=(c||window).document,l="CSS1Compat"==k.compatMode?k.documentElement:k.body;var q=(new ac(l.clientWidth,l.clientHeight)).round()}catch(t){q=new ac(-12245933,-12245933)}k=q;q={};l=new Xd;r.SVGElement&&
r.document.createElementNS&&l.set(0);c=oc();c["allow-top-navigation-by-user-activation"]&&l.set(1);c["allow-popups-to-escape-sandbox"]&&l.set(2);r.crypto&&r.crypto.subtle&&l.set(3);l=Yd(l);q.bc=l;q.bih=k.height;q.biw=k.width;q.brdim=b.join();a=a.f;return q.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[a.visibilityState||a.webkitVisibilityState||a.mozVisibilityState||""]||0,q.wgl=!!C.WebGLRenderingContext,q}
var le=new function(){var a=window.document;this.b=window;this.f=a};
x("yt.ads_.signals_.getAdSignalsString",function(){return he()},void 0);A();function oe(a,b){var c=R(a);return void 0===c&&void 0!==b?b:Number(c||0)}
function R(a){return P("EXPERIMENT_FLAGS",{})[a]}
;var pe=u(XMLHttpRequest)?function(){return new XMLHttpRequest}:u(ActiveXObject)?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function qe(){if(!pe)return null;var a=pe();return"open"in a?a:null}
function re(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function S(a,b){Ca(a)&&(a=fe(a));return window.setTimeout(a,b)}
function T(a){window.clearTimeout(a)}
;var se={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},te="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" "),
ue=!1;
function ve(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=M(1,a),e=L(M(3,a));d&&e?(d=c,c=a.match(Rd),d=d.match(Rd),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?L(M(3,c))==e&&(Number(M(4,c))||null)==(Number(M(4,a))||null):!0;d=!!R("web_ajax_ignore_global_headers_if_set");for(var f in se)e=P(se[f]),!e||!c&&!we(a,f)||d&&void 0!==b[f]||(b[f]=e);if(c||we(a,"X-YouTube-Utc-Offset"))b["X-YouTube-Utc-Offset"]=-(new Date).getTimezoneOffset();(R("pass_biscotti_id_in_header_ajax")||R("pass_biscotti_id_in_header_ajax_tv"))&&(c||
we(a,"X-YouTube-Ad-Signals"))&&(b["X-YouTube-Ad-Signals"]=he());return b}
function xe(a){var b=window.location.search,c=L(M(3,a)),d=L(M(5,a));d=(c=c&&c.endsWith("youtube.com"))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=je(b),f={};E(te,function(h){e[h]&&(f[h]=e[h])});
return ke(a,f||{},!1)}
function we(a,b){var c=P("CORS_HEADER_WHITELIST")||{},d=L(M(3,a));return d?(c=c[d])?0<=La(c,b):!1:!0}
function ye(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=ze(a,b);var d=Ae(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(h){if(!e){e=!0;f&&T(f);var g=h.ok,k=function(l){l=l||{};var q=b.context||r;g?b.onSuccess&&b.onSuccess.call(q,l,h):b.onError&&b.onError.call(q,l,h);b.ca&&b.ca.call(q,l,h)};
"JSON"==(b.format||"JSON")&&(g||400<=h.status&&500>h.status)?h.json().then(k,function(){k(null)}):k(null)}});
b.ga&&0<b.timeout&&(f=S(function(){e||(e=!0,T(f),b.ga.call(b.context||r))},b.timeout))}else Be(a,b)}
function Be(a,b){var c=b.format||"JSON";a=ze(a,b);var d=Ae(a,b),e=!1,f,h=Ce(a,function(g){if(!e){e=!0;f&&T(f);var k=re(g),l=null,q=400<=g.status&&500>g.status,t=500<=g.status&&600>g.status;if(k||q||t)l=De(c,g,b.lb);if(k)a:if(g&&204==g.status)k=!0;else{switch(c){case "XML":k=0==parseInt(l&&l.return_code,10);break a;case "RAW":k=!0;break a}k=!!l}l=l||{};q=b.context||r;k?b.onSuccess&&b.onSuccess.call(q,g,l):b.onError&&b.onError.call(q,g,l);b.ca&&b.ca.call(q,g,l)}},b.method,d,b.headers,b.responseType,
b.withCredentials);
b.M&&0<b.timeout&&(f=S(function(){e||(e=!0,h.abort(),T(f),b.M.call(b.context||r,h))},b.timeout));
return h}
function ze(a,b){b.va&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=P("XSRF_FIELD_NAME",void 0),d=b.Ua;d&&(d[c]&&delete d[c],a=ke(a,d||{},!0));return a}
function Ae(a,b){var c=P("XSRF_FIELD_NAME",void 0),d=P("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.C,h=ae("XSRF_FIELD_NAME"),g;b.headers&&(g=b.headers["Content-Type"]);b.mb||L(M(3,a))&&!b.withCredentials&&L(M(3,a))!=document.location.hostname||"POST"!=b.method||g&&"application/x-www-form-urlencoded"!=g||b.C&&b.C[h]||(f||(f={}),f[c]=d);f&&v(e)&&(e=je(e),qb(e,f),e=b.ha&&"JSON"==b.ha?JSON.stringify(e):Td(e));f=e||f&&!kb(f);!ue&&f&&"POST"!=b.method&&(ue=!0,Q(Error("AJAX request with postData should use POST")));
return e}
function De(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=JSON.parse(a));break;case "XML":if(b=(b=b.responseXML)?Ee(b):null)d={},E(b.getElementsByTagName("*"),function(e){d[e.tagName]=Fe(e)})}c&&Ge(d);
return d}
function Ge(a){if(Da(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=Xb(a[b],null);a[c]=d}else Ge(a[b])}}
function Ee(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function Fe(a){var b="";E(a.childNodes,function(c){b+=c.nodeValue});
return b}
function He(a,b){b.method="POST";b.C||(b.C={});Be(a,b)}
function Ce(a,b,c,d,e,f,h){function g(){4==(k&&"readyState"in k?k.readyState:0)&&b&&fe(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=qe();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",g,!1):k.onreadystatechange=g;R("debug_forward_web_query_parameters")&&(a=xe(a));k.open(c,a,!0);f&&(k.responseType=f);h&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=ve(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;var Ie={},Je=0;
function Ke(a,b,c,d,e){e=void 0===e?"":e;a&&(c&&(c=db,c=!(c&&0<=c.toLowerCase().indexOf("cobalt"))),c?a&&(a instanceof G||(a="object"==typeof a&&a.J?a.I():String(a),Sb.test(a)||(a="about:invalid#zClosurez"),a=Ub(a)),b=Rb(a).toString(),"about:invalid#zClosurez"===b?a="":(b instanceof Vb?a=b:(d="object"==typeof b,a=null,d&&b.aa&&(a=b.X()),b=Ua(d&&b.J?b.I():String(b)),a=Xb(b,a)),a instanceof Vb&&a.constructor===Vb&&a.g===Wb?a=a.b:(za(a),a="type_error:SafeHtml"),a=encodeURIComponent(String(cd(a.toString())))),/^[\s\xa0]*$/.test(a)||
(a=ec("IFRAME",{src:'javascript:"<body><img src=\\""+'+a+'+"\\"></body>"',style:"display:none"}),(9==a.nodeType?a:a.ownerDocument||a.document).body.appendChild(a))):e?Ce(a,b,"POST",e,d):P("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)||d?Ce(a,b,"GET","",d):((d=$d.EXPERIMENT_FLAGS)&&d.web_use_beacon_api_for_ad_click_server_pings&&-1!=L(M(5,a)).indexOf("/aclk")&&"1"===Wd(a,"ae")&&"1"===Wd(a,"act")?Le(a)?(b&&b(),d=!0):d=!1:d=!1,d||Me(a,b)))}
function Le(a,b){try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,void 0===b?"":b))return!0}catch(c){}return!1}
function Me(a,b){var c=new Image,d=""+Je++;Ie[d]=c;c.onload=c.onerror=function(){b&&Ie[d]&&b();delete Ie[d]};
c.src=a}
;var Ne={},Oe=0;
function Pe(a,b,c,d,e,f){f=f||{};f.name=c||P("INNERTUBE_CONTEXT_CLIENT_NAME",1);f.version=d||P("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0);b=void 0===b?"ERROR":b;e=void 0===e?!1:e;b=void 0===b?"ERROR":b;e=window&&window.yterr||(void 0===e?!1:e)||!1;if(!(!a||!e||5<=Oe||(e=a.stacktrace,d=a.columnNumber,a.hasOwnProperty("params")&&(c=String(JSON.stringify(a.params)),f.params=c.substr(0,500)),a=Jb(a),e=e||a.stack,c=a.lineNumber.toString(),isNaN(c)||isNaN(d)||(c=c+":"+d),R("console_log_js_exceptions")&&(d=
[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Params: "+JSON.stringify(a.params)),d.push("File name: "+a.fileName),d.push("Line number: "+c),d.push("Level: "+b),"params"in f&&d.push("Error Params: "+f.params),d.push("Stacktrace: "+e)),window.yterr&&Ca(window.yterr)&&window.yterr(a),Ne[a.message]||0<=e.indexOf("/YouTubeCenter.js")||0<=e.indexOf("/mytube.js")))){b={Ua:{a:"logerror",t:"jserror",type:a.name,msg:a.message.substr(0,250),line:c,level:b,"client.name":f.name},
C:{url:P("PAGE_NAME",window.location.href),file:a.fileName},method:"POST"};f.version&&(b["client.version"]=f.version);e&&(b.C.stack=e);for(var h in f)b.C["client."+h]=f[h];if(h=P("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(var g in h)b.C[g]=h[g];Be(P("ECATCHER_REPORT_HOST","")+"/error_204",b);Ne[a.message]=!0;Oe++}}
;var Qe=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};x("yt.msgs_",Qe,void 0);function Re(a){Zd(Qe,arguments)}
;function Se(a){a&&(a.dataset?a.dataset[Te("loaded")]="true":a.setAttribute("data-loaded","true"))}
function Ue(a,b){return a?a.dataset?a.dataset[Te(b)]:a.getAttribute("data-"+b):null}
var Ve={};function Te(a){return Ve[a]||(Ve[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var We=y("ytPubsubPubsubInstance")||new K;K.prototype.subscribe=K.prototype.subscribe;K.prototype.unsubscribeByKey=K.prototype.L;K.prototype.publish=K.prototype.K;K.prototype.clear=K.prototype.clear;x("ytPubsubPubsubInstance",We,void 0);var Xe=y("ytPubsubPubsubSubscribedKeys")||{};x("ytPubsubPubsubSubscribedKeys",Xe,void 0);var Ye=y("ytPubsubPubsubTopicToKeys")||{};x("ytPubsubPubsubTopicToKeys",Ye,void 0);var Ze=y("ytPubsubPubsubIsSynchronous")||{};x("ytPubsubPubsubIsSynchronous",Ze,void 0);
function $e(a,b){var c=af();if(c){var d=c.subscribe(a,function(){var e=arguments;var f=function(){Xe[d]&&b.apply(window,e)};
try{Ze[a]?f():S(f,0)}catch(h){Q(h)}},void 0);
Xe[d]=!0;Ye[a]||(Ye[a]=[]);Ye[a].push(d);return d}return 0}
function bf(a){var b=af();b&&("number"==typeof a?a=[a]:v(a)&&(a=[parseInt(a,10)]),E(a,function(c){b.unsubscribeByKey(c);delete Xe[c]}))}
function cf(a,b){var c=af();c&&c.publish.apply(c,arguments)}
function df(a){var b=af();if(b)if(b.clear(a),a)ef(a);else for(var c in Ye)ef(c)}
function af(){return y("ytPubsubPubsubInstance")}
function ef(a){Ye[a]&&(a=Ye[a],E(a,function(b){Xe[b]&&delete Xe[b]}),a.length=0)}
;var ff=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,gf=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function hf(a,b,c){c=void 0===c?null:c;if(window.spf){c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(ff,""),c=c.replace(gf,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else jf(a,b,c)}
function jf(a,b,c){c=void 0===c?null:c;var d=kf(a),e=document.getElementById(d),f=e&&Ue(e,"loaded"),h=e&&!f;f?b&&b():(b&&(f=$e(d,b),b=""+(b[Ea]||(b[Ea]=++Fa)),lf[b]=f),h||(e=mf(a,d,function(){Ue(e,"loaded")||(Se(e),cf(d),S(Ia(df,d),0))},c)))}
function mf(a,b,c,d){d=void 0===d?null:d;var e=document.createElement("SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);Zb(e,ic(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function nf(a){a=kf(a);var b=document.getElementById(a);b&&(df(a),b.parentNode.removeChild(b))}
function of(a,b){if(a&&b){var c=""+(b[Ea]||(b[Ea]=++Fa));(c=lf[c])&&bf(c)}}
function kf(a){var b=document.createElement("a");Yb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+cb(a)}
var lf={};function pf(){}
function qf(a,b){return rf(a,1,b)}
;function sf(){}
n(sf,pf);function rf(a,b,c){isNaN(c)&&(c=void 0);var d=y("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):S(a,c||0)}
function tf(a){if(!isNaN(a)){var b=y("yt.scheduler.instance.cancelJob");b?b(a):T(a)}}
sf.prototype.start=function(){var a=y("yt.scheduler.instance.start");a&&a()};
sf.prototype.pause=function(){var a=y("yt.scheduler.instance.pause");a&&a()};
ya(sf);sf.getInstance();var uf=[],vf=!1;function wf(){if("1"!=hb(be(),"args","privembed")){var a=function(){vf=!0;"google_ad_status"in window?O("DCLKSTAT",1):O("DCLKSTAT",2)};
hf("//static.doubleclick.net/instream/ad_status.js",a);uf.push(qf(function(){vf||"google_ad_status"in window||(of("//static.doubleclick.net/instream/ad_status.js",a),vf=!0,O("DCLKSTAT",3))},5E3))}}
function xf(){return parseInt(P("DCLKSTAT",0),10)}
;function yf(){this.f=!1;this.b=null}
yf.prototype.initialize=function(a,b,c,d,e){var f=this;b?(this.f=!0,hf(b,function(){f.f=!1;if(window.botguard)zf(f,c,d);else{nf(b);var h=Error("Unable to load Botguard");h.params="from "+b;ge(h)}},e)):a&&(eval(a),window.botguard?zf(this,c,d):ge(Error("Unable to load Botguard from JS")))};
function zf(a,b,c){try{a.b=new botguard.bg(b)}catch(d){ge(d)}c&&c(b)}
yf.prototype.dispose=function(){this.b=null};var Af=new yf,Bf=!1,Cf=0,Df="";function Ef(a){R("botguard_periodic_refresh")?Cf=N():R("botguard_always_refresh")&&(Df=a)}
function Ff(a){if(a){if(Af.f)return!1;if(R("botguard_periodic_refresh"))return 72E5<N()-Cf;if(R("botguard_always_refresh"))return Df!=a}else return!1;return!Bf}
function Gf(){return!!Af.b}
function Hf(a){a=void 0===a?{}:a;a=void 0===a?{}:a;return Af.b?Af.b.invoke(void 0,void 0,a):null}
;var If=0;x("ytDomDomGetNextId",y("ytDomDomGetNextId")||function(){return++If},void 0);var Jf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function Kf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;if(a=a||window.event){this.event=a;for(var b in a)b in Jf||(this[b]=a[b]);(b=a.target||a.srcElement)&&3==b.nodeType&&(b=b.parentNode);this.target=b;if(b=a.relatedTarget)try{b=b.nodeName?b:null}catch(c){b=null}else"mouseover"==this.type?
b=a.fromElement:"mouseout"==this.type&&(b=a.toElement);this.relatedTarget=b;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.b=a.pageX;this.f=a.pageY}}
function Lf(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.b=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.f=a.clientY+b}}
Kf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
Kf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
Kf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var jb=y("ytEventsEventsListeners")||{};x("ytEventsEventsListeners",jb,void 0);var Mf=y("ytEventsEventsCounter")||{count:0};x("ytEventsEventsCounter",Mf,void 0);
function Nf(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return ib(function(e){var f="boolean"==typeof e[4]&&e[4]==!!d,h=Da(e[4])&&Da(d)&&mb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||h)})}
var Of=Lb(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function U(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=Nf(a,b,c,d);if(e)return e;e=++Mf.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var h=f?function(g){g=new Kf(g);if(!hc(g.relatedTarget,function(k){return k==a}))return g.currentTarget=a,g.type=b,c.call(a,g)}:function(g){g=new Kf(g);
g.currentTarget=a;return c.call(a,g)};
h=fe(h);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),Of()||"boolean"==typeof d?a.addEventListener(b,h,d):a.addEventListener(b,h,!!d.capture)):a.attachEvent("on"+b,h);jb[e]=[a,b,c,h,d];return e}
function Pf(a){a&&("string"==typeof a&&(a=[a]),E(a,function(b){if(b in jb){var c=jb[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?Of()||"boolean"==typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete jb[b]}}))}
;function Qf(a){this.w=a;this.b=null;this.i=0;this.m=null;this.j=0;this.g=[];for(a=0;4>a;a++)this.g.push(0);this.h=0;this.D=U(window,"mousemove",z(this.G,this));a=z(this.B,this);Ca(a)&&(a=fe(a));this.H=window.setInterval(a,25)}
B(Qf,I);Qf.prototype.G=function(a){u(a.b)||Lf(a);var b=a.b;u(a.f)||Lf(a);this.b=new $b(b,a.f)};
Qf.prototype.B=function(){if(this.b){var a=N();if(0!=this.i){var b=this.m,c=this.b,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.i);this.g[this.h]=.5<Math.abs((d-this.j)/this.j)?1:0;for(c=b=0;4>c;c++)b+=this.g[c]||0;3<=b&&this.w();this.j=d}this.i=a;this.m=this.b;this.h=(this.h+1)%4}};
Qf.prototype.l=function(){window.clearInterval(this.H);Pf(this.D)};var Rf={};
function Sf(a){var b=void 0===a?{}:a;a=void 0===b.wa?!0:b.wa;b=void 0===b.Ja?!1:b.Ja;if(null==y("_lact",window)){var c=parseInt(P("LACT"),10);c=isFinite(c)?A()-Math.max(c,0):-1;x("_lact",c,window);x("_fact",c,window);-1==c&&Tf();U(document,"keydown",Tf);U(document,"keyup",Tf);U(document,"mousedown",Tf);U(document,"mouseup",Tf);a&&(b?U(window,"touchmove",function(){Uf("touchmove",200)},{passive:!0}):(U(window,"resize",function(){Uf("resize",200)}),U(window,"scroll",function(){Uf("scroll",200)})));
new Qf(function(){Uf("mouse",100)});
U(document,"touchstart",Tf,{passive:!0});U(document,"touchend",Tf,{passive:!0})}}
function Uf(a,b){Rf[a]||(Rf[a]=!0,qf(function(){Tf();Rf[a]=!1},b))}
function Tf(){null==y("_lact",window)&&Sf();var a=A();x("_lact",a,window);-1==y("_fact",window)&&x("_fact",a,window);(a=y("ytglobal.ytUtilActivityCallback_"))&&a()}
function Vf(){var a=y("_lact",window);return null==a?-1:Math.max(A()-a,0)}
;var Wf=Math.pow(2,16)-1,Xf=null,Yf=0,Zf={log_event:"events",log_interaction:"interactions"},$f=Object.create(null);$f.log_event="GENERIC_EVENT_LOGGING";$f.log_interaction="INTERACTION_LOGGING";var ag=new Set(["log_event"]),bg={},cg=0,dg=0,W=y("ytLoggingTransportLogPayloadsQueue_")||{};x("ytLoggingTransportLogPayloadsQueue_",W,void 0);var eg=y("ytLoggingTransportTokensToCttTargetIds_")||{};x("ytLoggingTransportTokensToCttTargetIds_",eg,void 0);var fg=y("ytLoggingTransportDispatchedStats_")||{};
x("ytLoggingTransportDispatchedStats_",fg,void 0);x("ytytLoggingTransportCapturedTime_",y("ytLoggingTransportCapturedTime_")||{},void 0);function gg(){T(cg);T(dg);dg=0;if(!kb(W)){for(var a in W){var b=bg[a];b&&(hg(a,b),delete W[a])}kb(W)||ig()}}
function ig(){R("web_gel_timeout_cap")&&!dg&&(dg=S(gg,3E4));T(cg);cg=S(gg,P("LOGGING_BATCH_TIMEOUT",oe("web_gel_debounce_ms",1E4)))}
function jg(a,b){b=void 0===b?"":b;W[a]=W[a]||{};W[a][b]=W[a][b]||[];return W[a][b]}
function hg(a,b){var c=Zf[a],d=fg[a]||{};fg[a]=d;var e=Math.round(N());for(l in W[a]){var f=ob,h=b.b;h={client:{hl:h.Ca,gl:h.Ba,clientName:h.za,clientVersion:h.Aa}};var g=window.devicePixelRatio;g&&1!=g&&(h.client.screenDensityFloat=String(g));P("DELEGATED_SESSION_ID")&&!R("pageid_as_header_web")&&(h.user={onBehalfOfUser:P("DELEGATED_SESSION_ID")});f=f({context:h});f[c]=jg(a,l);d.dispatchedEventCount=d.dispatchedEventCount||0;d.dispatchedEventCount+=f[c].length;if(h=eg[l])a:{var k=l;if(h.videoId)g=
"VIDEO";else if(h.playlistId)g="PLAYLIST";else break a;f.credentialTransferTokenTargetId=h;f.context=f.context||{};f.context.user=f.context.user||{};f.context.user.credentialTransferTokens=[{token:k,scope:g}]}delete eg[l];f.requestTimeMs=e;if(h=ae("EVENT_ID"))g=(P("BATCH_CLIENT_COUNTER",void 0)||0)+1,g>Wf&&(g=1),O("BATCH_CLIENT_COUNTER",g),h={serializedEventId:h,clientCounter:g},f.serializedClientEventId=h,Xf&&Yf&&R("log_gel_rtt_web")&&(f.previousBatchInfo={serializedClientEventId:Xf,roundtripMs:Yf}),
Xf=h,Yf=0;kg(b,a,f,{retry:ag.has(a),onSuccess:z(lg,this,N())})}if(d.previousDispatchMs){c=e-d.previousDispatchMs;var l=d.diffCount||0;d.averageTimeBetweenDispatchesMs=l?(d.averageTimeBetweenDispatchesMs*l+c)/(l+1):c;d.diffCount=l+1}d.previousDispatchMs=e}
function lg(a){Yf=Math.round(N()-a)}
;function mg(a,b,c,d,e){var f={};f.eventTimeMs=Math.round(d||N());f[a]=b;f.context={lastActivityMs:String(d?-1:Vf())};e?(a={},e.videoId?a.videoId=e.videoId:e.playlistId&&(a.playlistId=e.playlistId),eg[e.token]=a,e=jg("log_event",e.token)):e=jg("log_event");e.push(f);c&&(bg.log_event=new c);e.length>=(oe("web_logging_max_batch")||20)?gg():ig()}
;function ng(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||P("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.ib||P("AUTHORIZATION"))||(a?b="Bearer "+y("gapi.auth.getToken")().hb:b=wc([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=P("SESSION_INDEX",0),R("pageid_as_header_web")&&(d["X-Goog-PageId"]=P("DELEGATED_SESSION_ID")));return d}
function og(a){a=Object.assign({},a);delete a.Authorization;var b=wc();if(b){var c=new Mc;c.update(P("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();Ba(b);if(!Fb)for(Fb={},Gb={},c=0;65>c;c++)Fb[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c),Gb[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(c);c=Gb;for(var d=[],e=0;e<b.length;e+=3){var f=b[e],h=e+1<b.length,g=h?b[e+1]:0,k=e+2<b.length,l=k?b[e+2]:0,q=f>>2;f=(f&3)<<4|g>>4;g=(g&15)<<
2|l>>6;l&=63;k||(l=64,h||(g=64));d.push(c[q],c[f],c[g],c[l])}a.hash=d.join("")}return a}
;function pg(a,b,c,d){Ib.set(""+a,b,c,"/",void 0===d?"youtube.com":d,!1)}
;function qg(){var a=new Kd;(a=a.isAvailable()?new Qd(a,"yt.innertube"):null)||(a=new Ld("yt.innertube"),a=a.isAvailable()?a:null);this.b=a?new Gd(a):null;this.f=document.domain||window.location.hostname}
qg.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.b)try{this.b.set(a,b,A()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(cd(b))}catch(f){return}else e=escape(b);pg(a,e,c,this.f)};
qg.prototype.get=function(a,b){var c=void 0,d=!this.b;if(!d)try{c=this.b.get(a)}catch(e){d=!0}if(d&&(c=Ib.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
qg.prototype.remove=function(a){this.b&&this.b.remove(a);var b=this.f;Ib.remove(""+a,"/",void 0===b?"youtube.com":b)};var rg=new qg;function sg(a,b,c,d){if(d)return null;d=rg.get("nextId",!0)||1;var e=rg.get("requests",!0)||{};e[d]={method:a,request:b,authState:og(c),requestTime:Math.round(N())};rg.set("nextId",d+1,86400,!0);rg.set("requests",e,86400,!0);return d}
function tg(a){var b=rg.get("requests",!0)||{};delete b[a];rg.set("requests",b,86400,!0)}
function ug(a){var b=rg.get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(N())-d.requestTime)){var e=d.authState,f=og(ng(!1));mb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(N())),kg(a,d.method,e,{}));delete b[c]}}rg.set("requests",b,86400,!0)}}
;function vg(a){var b=this;this.b=a||{xa:ae("INNERTUBE_API_KEY"),ya:ae("INNERTUBE_API_VERSION"),za:P("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),Aa:ae("INNERTUBE_CONTEXT_CLIENT_VERSION"),Ca:ae("INNERTUBE_CONTEXT_HL"),Ba:ae("INNERTUBE_CONTEXT_GL"),Da:ae("INNERTUBE_HOST_OVERRIDE")||"",Ea:!!P("INNERTUBE_USE_THIRD_PARTY_AUTH",!1)};rf(function(){ug(b)},0,5E3)}
function kg(a,b,c,d){!P("VISITOR_DATA")&&.01>Math.random()&&Q(Error("Missing VISITOR_DATA when sending innertube request."),"WARNING");var e={headers:{"Content-Type":"application/json"},method:"POST",C:c,ha:"JSON",M:function(){d.M()},
ga:d.M,onSuccess:function(w,p){if(d.onSuccess)d.onSuccess(p)},
fa:function(w){if(d.onSuccess)d.onSuccess(w)},
onError:function(w,p){if(d.onError)d.onError(p)},
nb:function(w){if(d.onError)d.onError(w)},
timeout:d.timeout,withCredentials:!0},f="",h=a.b.Da;h&&(f=h);h=a.b.Ea||!1;var g=ng(h,f,d);Object.assign(e.headers,g);e.headers.Authorization&&!f&&(e.headers["x-origin"]=window.location.origin);var k=""+f+("/youtubei/"+a.b.ya+"/"+b)+"?alt=json&key="+a.b.xa,l;if(d.retry&&R("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=f&&(l=sg(b,c,g,h))){var q=e.onSuccess,t=e.fa;e.onSuccess=function(w,p){tg(l);q(w,p)};
c.fa=function(w,p){tg(l);t(w,p)}}try{R("use_fetch_for_op_xhr")?ye(k,e):He(k,e)}catch(w){if("InvalidAccessError"==w)l&&(tg(l),l=0),Q(Error("An extension is blocking network request."),"WARNING");
else throw w;}l&&rf(function(){ug(a)},0,5E3)}
;var wg=A().toString();
function xg(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;16>a;a++){b=A();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(256*Math.random())}if(wg)for(a=1,b=0;b<wg.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^wg.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var yg=y("ytLoggingTimeDocumentNonce_")||xg();x("ytLoggingTimeDocumentNonce_",yg,void 0);function zg(a){this.b=a}
function Ag(a){var b={};void 0!==a.b.trackingParams?b.trackingParams=a.b.trackingParams:(b.veType=a.b.veType,null!=a.b.veCounter&&(b.veCounter=a.b.veCounter),null!=a.b.elementIndex&&(b.elementIndex=a.b.elementIndex));void 0!==a.b.dataElement&&(b.dataElement=Ag(a.b.dataElement));void 0!==a.b.youtubeData&&(b.youtubeData=a.b.youtubeData);return b}
zg.prototype.toString=function(){return JSON.stringify(Ag(this))};
var Bg=1;function Cg(a){a=void 0===a?0:a;return 0==a?"client-screen-nonce":"client-screen-nonce."+a}
function Dg(a){a=void 0===a?0:a;return 0==a?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function Eg(a){return P(Dg(void 0===a?0:a),void 0)}
x("yt_logging_screen.getRootVeType",Eg,void 0);function Fg(){var a=Eg(0),b;a?b=new zg({veType:a,youtubeData:void 0}):b=null;return b}
function Gg(a){a=void 0===a?0:a;var b=P(Cg(a));b||0!=a||(b=P("EVENT_ID"));return b?b:null}
x("yt_logging_screen.getCurrentCsn",Gg,void 0);function Hg(a,b,c){c=void 0===c?0:c;if(a!==P(Cg(c))||b!==P(Dg(c)))O(Cg(c),a),O(Dg(c),b),0==c&&(b=function(){setTimeout(function(){a&&mg("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:yg,clientScreenNonce:a},vg)},0)},"requestAnimationFrame"in window?window.requestAnimationFrame(b):b())}
x("yt_logging_screen.setCurrentScreen",Hg,void 0);function Ig(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=P("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){d=a;var e=P("VALID_SESSION_TEMPDATA_DOMAINS",[]),f=L(M(3,window.location.href));f&&e.push(f);f=L(M(3,d));if(0<=La(e,f)||!f&&0==d.lastIndexOf("/",0))if(R("autoescape_tempdata_url")&&(e=document.createElement("a"),Yb(e,d),d=e.href),d){f=d.match(Rd);d=f[5];e=f[6];f=f[7];var h="";d&&(h+=d);e&&(h+="?"+e);f&&(h+="#"+f);d=h;e=d.indexOf("#");if(d=0>e?d:d.substr(0,e)){if(b.itct||b.ved)b.csn=b.csn||Gg();if(g){var g=
parseInt(g,10);isFinite(g)&&0<g&&(d="ST-"+cb(d).toString(36),b=b?Td(b):"",pg(d,b,g||5))}else g="ST-"+cb(d).toString(36),b=b?Td(b):"",pg(g,b,5)}}}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var k=void 0===k?{}:k;var l=void 0===l?"":l;var q=void 0===q?window:q;c=q.location;a=Ud(a,k)+l;a=a instanceof G?a:Tb(a);c.href=Rb(a)}return!0}
;function Jg(a,b,c){a={csn:a,parentVe:Ag(b),childVes:Na(c,function(d){return Ag(d)})};
c=ba(c);for(b=c.next();!b.done;b=c.next())b=Ag(b.value),(kb(b)||!b.trackingParams&&!b.veType)&&Pe(Error("Child VE logged with no data"),"WARNING");mg("visualElementAttached",a,vg,void 0,void 0)}
;function Kg(a){a=a||{};var b={enablejsapi:1},c={};this.url=a.url||"";this.args=a.args||nb(b);this.assets=a.assets||{};this.attrs=a.attrs||nb(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Kg.prototype.clone=function(){var a=new Kg,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==za(c)?a[b]=nb(c):a[b]=c}return a};function Lg(){I.call(this);this.b=[]}
n(Lg,I);Lg.prototype.l=function(){for(;this.b.length;){var a=this.b.pop();a.target.removeEventListener(a.name,a.kb)}I.prototype.l.call(this)};var Mg=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Ng(a){a=a||"";if(window.spf){var b=a.match(Mg);spf.style.load(a,b?b[1]:"",void 0)}else Og(a)}
function Og(a){var b=Pg(a),c=document.getElementById(b),d=c&&Ue(c,"loaded");d||c&&!d||(c=Qg(a,b,function(){Ue(c,"loaded")||(Se(c),cf(b),S(Ia(df,b),0))}))}
function Qg(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=ic(a);d.rel="stylesheet";d.href=Pb(a).toString();(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function Pg(a){var b=document.createElement("A");a=Ub(a);Yb(b,a);b=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+cb(b)}
;function Rg(a,b){I.call(this);this.j=this.S=a;this.D=b;this.m=!1;this.api={};this.P=this.B=null;this.G=new K;Oc(this,Ia(Pc,this.G));this.h={};this.N=this.R=this.g=this.W=this.b=null;this.H=!1;this.i=this.w=null;this.T={};this.la=["onReady"];this.V=null;this.da=NaN;this.O={};Sg(this);this.U("WATCH_LATER_VIDEO_ADDED",this.Ga.bind(this));this.U("WATCH_LATER_VIDEO_REMOVED",this.Ha.bind(this));this.U("onAdAnnounce",this.oa.bind(this));this.ma=new Lg(this);Oc(this,Ia(Pc,this.ma))}
n(Rg,I);m=Rg.prototype;m.getId=function(){return this.D};
m.loadNewVideoConfig=function(a){if(!this.f){a instanceof Kg||(a=new Kg(a));this.W=a;this.b=a.clone();this.g=this.b.attrs.id||this.g;"video-player"==this.g&&(this.g=this.D,this.b.attrs.id=this.D);this.j.id==this.g&&(this.g+="-player",this.b.attrs.id=this.g);this.b.args.enablejsapi="1";this.b.args.playerapiid=this.D;this.R||(this.R=Tg(this,this.b.args.jsapicallback||"onYouTubePlayerReady"));this.b.args.jsapicallback=null;if(a=this.b.attrs.width)this.j.style.width=pc(Number(a)||a);if(a=this.b.attrs.height)this.j.style.height=
pc(Number(a)||a);Ug(this);this.m&&Vg(this)}};
m.sa=function(){return this.W};
function Vg(a){a.b.loaded||(a.b.loaded=!0,"0"!=a.b.args.autoplay?a.api.loadVideoByPlayerVars(a.b.args):a.api.cueVideoByPlayerVars(a.b.args))}
function Wg(a){var b=!0,c=Xg(a);c&&a.b&&(a=a.b,b=Ue(c,"version")==a.assets.js);return b&&!!y("yt.player.Application.create")}
function Ug(a){if(!a.f&&!a.H){var b=Wg(a);if(b&&"html5"==(Xg(a)?"html5":null))a.N="html5",a.m||Yg(a);else if(Zg(a),a.N="html5",b&&a.i)a.S.appendChild(a.i),Yg(a);else{a.b.loaded=!0;var c=!1;a.w=function(){c=!0;var d=a.b.clone();y("yt.player.Application.create")(a.S,d);Yg(a)};
a.H=!0;b?a.w():(hf(a.b.assets.js,a.w),Ng(a.b.assets.css),$g(a)&&!c&&x("yt.player.Application.create",null,void 0))}}}
function Xg(a){var b=bc(a.g);!b&&a.j&&a.j.querySelector&&(b=a.j.querySelector("#"+a.g));return b}
function Yg(a){if(!a.f){var b=Xg(a),c=!1;b&&b.getApiInterface&&b.getApiInterface()&&(c=!0);c?(a.H=!1,b.isNotServable&&b.isNotServable(a.b.args.video_id)||ah(a)):a.da=S(function(){Yg(a)},50)}}
function ah(a){Sg(a);a.m=!0;var b=Xg(a);b.addEventListener&&(a.B=bh(a,b,"addEventListener"));b.removeEventListener&&(a.P=bh(a,b,"removeEventListener"));var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=0;d<c.length;d++){var e=c[d];a.api[e]||(a.api[e]=bh(a,b,e))}for(var f in a.h)a.B(f,a.h[f]);Vg(a);a.R&&a.R(a.api);a.G.K("onReady",a.api)}
function bh(a,b,c){var d=b[c];return function(){try{return a.V=null,d.apply(b,arguments)}catch(e){"sendAbandonmentPing"!=c&&(e.message+=" ("+c+")",a.V=e,ge(e))}}}
function Sg(a){a.m=!1;if(a.P)for(var b in a.h)a.P(b,a.h[b]);for(var c in a.O)T(parseInt(c,10));a.O={};a.B=null;a.P=null;for(var d in a.api)a.api[d]=null;a.api.addEventListener=a.U.bind(a);a.api.removeEventListener=a.La.bind(a);a.api.destroy=a.dispose.bind(a);a.api.getLastError=a.ta.bind(a);a.api.getPlayerType=a.ua.bind(a);a.api.getCurrentVideoConfig=a.sa.bind(a);a.api.loadNewVideoConfig=a.loadNewVideoConfig.bind(a);a.api.isReady=a.Fa.bind(a)}
m.Fa=function(){return this.m};
m.U=function(a,b){var c=this,d=Tg(this,b);if(d){if(!(0<=La(this.la,a)||this.h[a])){var e=ch(this,a);this.B&&this.B(a,e)}this.G.subscribe(a,d);"onReady"==a&&this.m&&S(function(){d(c.api)},0)}};
m.La=function(a,b){if(!this.f){var c=Tg(this,b);c&&Ad(this.G,a,c)}};
function Tg(a,b){var c=b;if("string"==typeof b){if(a.T[b])return a.T[b];c=function(){var d=y(b);d&&d.apply(r,arguments)};
a.T[b]=c}return c?c:null}
function ch(a,b){var c="ytPlayer"+b+a.D;a.h[b]=c;r[c]=function(d){var e=S(function(){if(!a.f){a.G.K(b,d);var f=a.O,h=String(e);h in f&&delete f[h]}},0);
lb(a.O,String(e))};
return c}
m.oa=function(a){cf("a11y-announce",a)};
m.Ga=function(a){cf("WATCH_LATER_VIDEO_ADDED",a)};
m.Ha=function(a){cf("WATCH_LATER_VIDEO_REMOVED",a)};
m.ua=function(){return this.N||(Xg(this)?"html5":null)};
m.ta=function(){return this.V};
function Zg(a){a.cancel();Sg(a);a.N=null;a.b&&(a.b.loaded=!1);var b=Xg(a);b&&(Wg(a)||!$g(a)?a.i=b:(b&&b.destroy&&b.destroy(),a.i=null));for(a=a.S;b=a.firstChild;)a.removeChild(b)}
m.cancel=function(){this.w&&of(this.b.assets.js,this.w);T(this.da);this.H=!1};
m.l=function(){Zg(this);if(this.i&&this.b&&this.i.destroy)try{this.i.destroy()}catch(b){Q(b)}this.T=null;for(var a in this.h)r[this.h[a]]=null;this.W=this.b=this.api=null;delete this.S;delete this.j;I.prototype.l.call(this)};
function $g(a){return a.b&&a.b.args&&a.b.args.fflags?-1!=a.b.args.fflags.indexOf("player_destroy_old_version=true"):!1}
;var dh={},eh="player_uid_"+(1E9*Math.random()>>>0);function fh(a){var b="player";b=v(b)?bc(b):b;var c=eh+"_"+(b[Ea]||(b[Ea]=++Fa)),d=dh[c];if(d)return d.loadNewVideoConfig(a),d.api;d=new Rg(b,c);dh[c]=d;cf("player-added",d.api);Oc(d,Ia(gh,d));S(function(){d.loadNewVideoConfig(a)},0);
return d.api}
function gh(a){delete dh[a.getId()]}
;function hh(a,b,c){var d=vg;P("ytLoggingEventsDefaultDisabled",!1)&&vg==vg&&(d=null);mg(a,b,d,c,void 0)}
;var ih=y("ytLoggingLatencyUsageStats_")||{};x("ytLoggingLatencyUsageStats_",ih,void 0);var jh=0;function kh(a){ih[a]=ih[a]||{count:0};var b=ih[a];b.count++;b.time=N();jh||(jh=rf(lh,0,5E3));if(5<b.count){if(6==b.count&&1>1E5*Math.random()){b=0==a.indexOf("info")?"WARNING":"ERROR";var c=Error("CSI data exceeded logging limit with key");c.params=a;Pe(c,b)}return!0}return!1}
function lh(){var a=N(),b;for(b in ih)6E4<a-ih[b].time&&delete ih[b];jh=0}
;function mh(a,b){this.version=a;this.args=b}
;function nh(a){this.topic=a}
nh.prototype.toString=function(){return this.topic};var oh=y("ytPubsub2Pubsub2Instance")||new K;K.prototype.subscribe=K.prototype.subscribe;K.prototype.unsubscribeByKey=K.prototype.L;K.prototype.publish=K.prototype.K;K.prototype.clear=K.prototype.clear;x("ytPubsub2Pubsub2Instance",oh,void 0);x("ytPubsub2Pubsub2SubscribedKeys",y("ytPubsub2Pubsub2SubscribedKeys")||{},void 0);x("ytPubsub2Pubsub2TopicToKeys",y("ytPubsub2Pubsub2TopicToKeys")||{},void 0);x("ytPubsub2Pubsub2IsAsync",y("ytPubsub2Pubsub2IsAsync")||{},void 0);
x("ytPubsub2Pubsub2SkipSubKey",null,void 0);function ph(a,b){var c=y("ytPubsub2Pubsub2Instance");c&&c.publish.call(c,a.toString(),a,b)}
;var X=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};function qh(){var a=P("TIMING_TICK_EXPIRATION");a||(a={},O("TIMING_TICK_EXPIRATION",a));return a}
function rh(){var a=qh(),b;for(b in a)tf(a[b]);O("TIMING_TICK_EXPIRATION",{})}
;function sh(a,b){mh.call(this,1,arguments)}
n(sh,mh);function th(a,b){mh.call(this,1,arguments)}
n(th,mh);var uh=new nh("aft-recorded"),vh=new nh("timing-sent");var wh={vc:!0},Y={},xh=(Y.ad_allowed="adTypesAllowed",Y.yt_abt="adBreakType",Y.ad_cpn="adClientPlaybackNonce",Y.ad_docid="adVideoId",Y.yt_ad_an="adNetworks",Y.ad_at="adType",Y.browse_id="browseId",Y.p="httpProtocol",Y.t="transportProtocol",Y.cpn="clientPlaybackNonce",Y.csn="clientScreenNonce",Y.docid="videoId",Y.is_continuation="isContinuation",Y.is_nav="isNavigation",Y.b_p="kabukiInfo.browseParams",Y.is_prefetch="kabukiInfo.isPrefetch",Y.is_secondary_nav="kabukiInfo.isSecondaryNav",Y.prev_browse_id=
"kabukiInfo.prevBrowseId",Y.query_source="kabukiInfo.querySource",Y.voz_type="kabukiInfo.vozType",Y.yt_lt="loadType",Y.yt_ad="isMonetized",Y.nr="webInfo.navigationReason",Y.ncnp="webInfo.nonPreloadedNodeCount",Y.paused="playerInfo.isPausedOnLoad",Y.yt_pt="playerType",Y.fmt="playerInfo.itag",Y.yt_pl="watchInfo.isPlaylist",Y.yt_pre="playerInfo.preloadType",Y.yt_ad_pr="prerollAllowed",Y.pa="previousAction",Y.yt_red="isRedSubscriber",Y.st="serverTimeMs",Y.aq="tvInfo.appQuality",Y.br_trs="tvInfo.bedrockTriggerState",
Y.label="tvInfo.label",Y.is_mdx="tvInfo.isMdx",Y.preloaded="tvInfo.isPreloaded",Y.query="unpluggedInfo.query",Y.upg_chip_ids_string="unpluggedInfo.upgChipIdsString",Y.yt_vst="videoStreamType",Y.vph="viewportHeight",Y.vpw="viewportWidth",Y.yt_vis="isVisible",Y),yh="ap c cver cbrand cmodel ei srt yt_fss yt_li plid vpil vpni vpst yt_eil vpni2 vpil2 icrc icrt pa GetBrowse_rid GetPlayer_rid GetSearch_rid GetWatchNext_rid cmt d_vpct d_vpnfi d_vpni pc pfa pfeh pftr prerender psc rc start tcrt tcrc ssr vpr vps yt_abt yt_fn yt_fs yt_pft yt_pre yt_pt yt_pvis yt_ref yt_sts".split(" "),
zh="isContinuation isNavigation kabukiInfo.isPrefetch kabukiInfo.isSecondaryNav isMonetized playerInfo.isPausedOnLoad prerollAllowed isRedSubscriber tvInfo.isMdx tvInfo.isPreloaded isVisible watchInfo.isPlaylist".split(" "),Ah={},Bh=(Ah.pa="LATENCY_ACTION_",Ah.yt_pt="LATENCY_PLAYER_",Ah.yt_vst="VIDEO_STREAM_TYPE_",Ah),Ch=!1;
function Dh(){var a=Eh().info.yt_lt="hot_bg";Fh().info_yt_lt=a;if(Gh())if("yt_lt"in xh){var b=xh.yt_lt;0<=La(zh,b)&&(a=!!a);"yt_lt"in Bh&&(a=Bh.yt_lt+a.toUpperCase());var c=a;if(Gh()){a={};b=b.split(".");for(var d=a,e=0;e<b.length-1;e++)d[b[e]]=d[b[e]]||{},d=d[b[e]];d[b[b.length-1]]=c;c=Hh();b=Object.keys(a).join("");kh("info_"+b+"_"+c)||(a.clientActionNonce=c,hh("latencyActionInfo",a))}}else 0<=La(yh,"yt_lt")||Q(Error("Unknown label yt_lt logged with GEL CSI."))}
function Ih(){var a=Jh();if(a.aft)return a.aft;for(var b=P("TIMING_AFT_KEYS",["ol"]),c=b.length,d=0;d<c;d++){var e=a[b[d]];if(e)return e}return NaN}
z(X.clearResourceTimings||X.webkitClearResourceTimings||X.mozClearResourceTimings||X.msClearResourceTimings||X.oClearResourceTimings||xa,X);function Hh(){var a=Eh().nonce;a||(a=xg(),Eh().nonce=a);return a}
function Jh(){return Eh().tick}
function Fh(){var a=Eh();"gel"in a||(a.gel={});return a.gel}
function Eh(){var a;(a=y("ytcsi.data_"))||(a={tick:{},info:{}},Ja("ytcsi.data_",a));return a}
function Kh(){var a=Jh(),b=a.pbr,c=a.vc;a=a.pbs;return b&&c&&a&&b<c&&c<a&&1==Eh().info.yt_pvis}
function Gh(){return!!R("csi_on_gel")||!!Eh().useGel}
function Lh(){rh();if(!Gh()){var a=Jh(),b=Eh().info,c=a._start;for(f in a)if(0==f.lastIndexOf("_",0)&&Aa(a[f])){var d=f.slice(1);if(d in wh){var e=Na(a[f],function(l){return Math.round(l-c)});
b["all_"+d]=e.join()}delete a[f]}e=P("CSI_SERVICE_NAME","youtube");var f={v:2,s:e,action:P("TIMING_ACTION",void 0)};d=Dh.srt;void 0!==a.srt&&delete b.srt;if(b.h5jse){var h=window.location.protocol+y("ytplayer.config.assets.js");(h=X.getEntriesByName?X.getEntriesByName(h)[0]:null)?b.h5jse=Math.round(b.h5jse-h.responseEnd):delete b.h5jse}a.aft=Ih();Kh()&&"youtube"==e&&(Dh(),e=a.vc,h=a.pbs,delete a.aft,b.aft=Math.round(h-e));for(var g in b)"_"!=g.charAt(0)&&(f[g]=b[g]);a.ps=N();g={};e=[];for(var k in a)"_"!=
k.charAt(0)&&(h=Math.round(a[k]-c),g[k]=h,e.push(k+"."+h));f.rt=e.join(",");(a=y("ytdebug.logTiming"))&&a(f,g);Mh(f,!!b.ap);ph(vh,new th(g.aft+(d||0),void 0))}}
function Mh(a,b){if(R("debug_csi_data")){var c=y("yt.timing.csiData");c||(c=[],x("yt.timing.csiData",c,void 0));c.push({page:location.href,time:new Date,args:a})}c="";for(var d in a)c+="&"+d+"="+a[d];d="/csi_204?"+c.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b){var e=void 0===e?"":e;Le(d,e)||Ke(d,void 0,void 0,void 0,e)}else Ke(d);Ja("yt.timing.pingSent_",!0)}
;function Nh(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}
function Oh(a,b,c){v(a)&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});b=/\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);a.videoId=b&&b[2]?b[2]:null;return Ph(a)}
function Ph(a,b,c){if(Da(a)){b=["endSeconds","startSeconds","mediaContentUrl","suggestedQuality","videoId"];c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}return{videoId:a,startSeconds:b,suggestedQuality:c}}
function Qh(a,b,c,d){if(Da(a)&&!Aa(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};v(a)&&16==a.length?b.list="PL"+a:b.playlist=a;return b}
;function Rh(a){I.call(this);this.b=a;this.b.subscribe("command",this.ia,this);this.g={};this.i=!1}
B(Rh,I);m=Rh.prototype;m.start=function(){this.i||this.f||(this.i=!0,Sh(this.b,"RECEIVING"))};
m.ia=function(a,b,c){if(this.i&&!this.f){var d=b||{};switch(a){case "addEventListener":v(d.event)&&(a=d.event,a in this.g||(c=z(this.Na,this,a),this.g[a]=c,this.addEventListener(a,c)));break;case "removeEventListener":v(d.event)&&Th(this,d.event);break;default:this.h.isReady()&&this.h.isExternalMethodAvailable(a,c||null)&&(b=Uh(a,b||{}),c=this.h.handleExternalCall(a,b,c||null),(c=Vh(a,c))&&this.i&&!this.f&&Sh(this.b,a,c))}}};
m.Na=function(a,b){this.i&&!this.f&&Sh(this.b,a,this.Y(a,b))};
m.Y=function(a,b){if(null!=b)return{value:b}};
function Th(a,b){b in a.g&&(a.removeEventListener(b,a.g[b]),delete a.g[b])}
m.l=function(){var a=this.b;a.f||Ad(a.b,"command",this.ia,this);this.b=null;for(var b in this.g)Th(this,b);Rh.A.l.call(this)};function Wh(a,b){Rh.call(this,b);this.h=a;this.start()}
B(Wh,Rh);Wh.prototype.addEventListener=function(a,b){this.h.addEventListener(a,b)};
Wh.prototype.removeEventListener=function(a,b){this.h.removeEventListener(a,b)};
function Uh(a,b){switch(a){case "loadVideoById":return b=Ph(b),[b];case "cueVideoById":return b=Ph(b),[b];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return b=Qh(b),[b];case "cuePlaylist":return b=Qh(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];
case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey]}return[]}
function Vh(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
Wh.prototype.Y=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return Wh.A.Y.call(this,a,b)};
Wh.prototype.l=function(){Wh.A.l.call(this);delete this.h};function Xh(a,b,c,d){I.call(this);this.g=b||null;this.w="*";this.h=c||null;this.sessionId=null;this.channel=d||null;this.D=!!a;this.m=z(this.B,this);window.addEventListener("message",this.m)}
n(Xh,I);Xh.prototype.B=function(a){if(!("*"!=this.h&&a.origin!=this.h||this.g&&a.source!=this.g)&&v(a.data)){try{var b=JSON.parse(a.data)}catch(c){return}if(!(null==b||this.D&&(this.sessionId&&this.sessionId!=b.id||this.channel&&this.channel!=b.channel))&&b)switch(b.event){case "listening":"null"!=a.origin&&(this.h=this.w=a.origin);this.g=a.source;this.sessionId=b.id;this.b&&(this.b(),this.b=null);break;case "command":this.i&&(!this.j||0<=La(this.j,b.func))&&this.i(b.func,b.args,a.origin)}}};
Xh.prototype.sendMessage=function(a,b){var c=b||this.g;if(c){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var d=cd(a);c.postMessage(d,this.w)}catch(e){Q(e,"WARNING")}}};
Xh.prototype.l=function(){window.removeEventListener("message",this.m);I.prototype.l.call(this)};function Yh(a,b,c){Xh.call(this,a,b,c||P("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname,"widget");this.j=this.b=this.i=null}
n(Yh,Xh);function Zh(){var a=this.f=new Yh(!!P("WIDGET_ID_ENFORCE")),b=z(this.Ka,this);a.i=b;a.j=null;this.f.channel="widget";if(a=P("WIDGET_ID"))this.f.sessionId=a;this.h=[];this.j=!1;this.i={}}
m=Zh.prototype;m.Ka=function(a,b,c){"addEventListener"==a&&b?(a=b[0],this.i[a]||"onReady"==a||(this.addEventListener(a,$h(this,a)),this.i[a]=!0)):this.ka(a,b,c)};
m.ka=function(){};
function $h(a,b){return z(function(c){this.sendMessage(b,c)},a)}
m.addEventListener=function(){};
m.ra=function(){this.j=!0;this.sendMessage("initialDelivery",this.Z());this.sendMessage("onReady");E(this.h,this.ja,this);this.h=[]};
m.Z=function(){return null};
function ai(a,b){a.sendMessage("infoDelivery",b)}
m.ja=function(a){this.j?this.f.sendMessage(a):this.h.push(a)};
m.sendMessage=function(a,b){this.ja({event:a,info:void 0==b?null:b})};
m.dispose=function(){this.f=null};function bi(a){Zh.call(this);this.b=a;this.g=[];this.addEventListener("onReady",z(this.Ia,this));this.addEventListener("onVideoProgress",z(this.Ra,this));this.addEventListener("onVolumeChange",z(this.Sa,this));this.addEventListener("onApiChange",z(this.Ma,this));this.addEventListener("onPlaybackQualityChange",z(this.Oa,this));this.addEventListener("onPlaybackRateChange",z(this.Pa,this));this.addEventListener("onStateChange",z(this.Qa,this));this.addEventListener("onWebglSettingsChanged",z(this.Ta,
this))}
B(bi,Zh);m=bi.prototype;m.ka=function(a,b,c){if(this.b.isExternalMethodAvailable(a,c)){b=b||[];if(0<b.length&&Nh(a)){var d=b;if(Da(d[0])&&!Aa(d[0]))d=d[0];else{var e={};switch(a){case "loadVideoById":case "cueVideoById":e=Ph.apply(window,d);break;case "loadVideoByUrl":case "cueVideoByUrl":e=Oh.apply(window,d);break;case "loadPlaylist":case "cuePlaylist":e=Qh.apply(window,d)}d=e}b.length=1;b[0]=d}this.b.handleExternalCall(a,b,c);Nh(a)&&ai(this,this.Z())}};
m.Ia=function(){var a=z(this.ra,this);this.f.b=a};
m.addEventListener=function(a,b){this.g.push({eventType:a,listener:b});this.b.addEventListener(a,b)};
m.Z=function(){if(!this.b)return null;var a=this.b.getApiInterface();Qa(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c],f=e;if(0==f.search("get")||0==f.search("is")){f=e;var h=0;0==f.search("get")?h=3:0==f.search("is")&&(h=2);f=f.charAt(h).toLowerCase()+f.substr(h+1);try{var g=this.b[e]();b[f]=g}catch(k){}}}b.videoData=this.b.getVideoData();b.currentTimeLastUpdated_=A()/1E3;return b};
m.Qa=function(a){a={playerState:a,currentTime:this.b.getCurrentTime(),duration:this.b.getDuration(),videoData:this.b.getVideoData(),videoStartBytes:0,videoBytesTotal:this.b.getVideoBytesTotal(),videoLoadedFraction:this.b.getVideoLoadedFraction(),playbackQuality:this.b.getPlaybackQuality(),availableQualityLevels:this.b.getAvailableQualityLevels(),currentTimeLastUpdated_:A()/1E3,playbackRate:this.b.getPlaybackRate(),mediaReferenceTime:this.b.getMediaReferenceTime()};this.b.getVideoUrl&&(a.videoUrl=
this.b.getVideoUrl());this.b.getVideoContentRect&&(a.videoContentRect=this.b.getVideoContentRect());this.b.getProgressState&&(a.progressState=this.b.getProgressState());this.b.getPlaylist&&(a.playlist=this.b.getPlaylist());this.b.getPlaylistIndex&&(a.playlistIndex=this.b.getPlaylistIndex());this.b.getStoryboardFormat&&(a.storyboardFormat=this.b.getStoryboardFormat());ai(this,a)};
m.Oa=function(a){ai(this,{playbackQuality:a})};
m.Pa=function(a){ai(this,{playbackRate:a})};
m.Ma=function(){for(var a=this.b.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.b.getOptions(e);b[e]={options:f};for(var h=0,g=f.length;h<g;h++){var k=f[h],l=this.b.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
m.Sa=function(){ai(this,{muted:this.b.isMuted(),volume:this.b.getVolume()})};
m.Ra=function(a){a={currentTime:a,videoBytesLoaded:this.b.getVideoBytesLoaded(),videoLoadedFraction:this.b.getVideoLoadedFraction(),currentTimeLastUpdated_:A()/1E3,playbackRate:this.b.getPlaybackRate(),mediaReferenceTime:this.b.getMediaReferenceTime()};this.b.getProgressState&&(a.progressState=this.b.getProgressState());ai(this,a)};
m.Ta=function(){var a={sphericalProperties:this.b.getSphericalProperties()};ai(this,a)};
m.dispose=function(){bi.A.dispose.call(this);for(var a=0;a<this.g.length;a++){var b=this.g[a];this.b.removeEventListener(b.eventType,b.listener)}this.g=[]};function ci(a){a=void 0===a?!1:a;I.call(this);this.b=new K(a);Oc(this,Ia(Pc,this.b))}
B(ci,I);ci.prototype.subscribe=function(a,b,c){return this.f?0:this.b.subscribe(a,b,c)};
ci.prototype.i=function(a,b){this.f||this.b.K.apply(this.b,arguments)};function di(a,b,c){ci.call(this);this.g=a;this.h=b;this.j=c}
B(di,ci);function Sh(a,b,c){if(!a.f){var d=a.g;d.f||a.h!=d.b||(a={id:a.j,command:b},c&&(a.data=c),d.b.postMessage(cd(a),d.h))}}
di.prototype.l=function(){this.h=this.g=null;di.A.l.call(this)};function ei(a,b,c){I.call(this);this.b=a;this.h=c;this.i=U(window,"message",z(this.j,this));this.g=new di(this,a,b);Oc(this,Ia(Pc,this.g))}
B(ei,I);ei.prototype.j=function(a){var b;if(b=!this.f)if(b=a.origin==this.h)a:{b=this.b;do{b:{var c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(b=a.data,v(b))){try{b=JSON.parse(b)}catch(d){return}b.command&&(c=this.g,c.f||c.i("command",b.command,b.data,a.origin))}};
ei.prototype.l=function(){Pf(this.i);this.b=null;ei.A.l.call(this)};function fi(){var a=nb(gi),b;return pd(new J(function(c,d){a.onSuccess=function(e){re(e)?c(e):d(new hi("Request failed, status="+e.status,"net.badstatus",e))};
a.onError=function(e){d(new hi("Unknown request error","net.unknown",e))};
a.M=function(e){d(new hi("Request timed out","net.timeout",e))};
b=Be("//googleads.g.doubleclick.net/pagead/id",a)}),function(c){c instanceof qd&&b.abort();
return nd(c)})}
function hi(a,b){D.call(this,a+", errorCode="+b);this.errorCode=b;this.name="PromiseAjaxError"}
n(hi,D);function ii(){this.f=0;this.b=null}
ii.prototype.then=function(a,b,c){return 1===this.f&&a?(a=a.call(c,this.b),id(a)?a:ji(a)):2===this.f&&b?(a=b.call(c,this.b),id(a)?a:ki(a)):this};
ii.prototype.getValue=function(){return this.b};
ii.prototype.$goog_Thenable=!0;function ki(a){var b=new ii;a=void 0===a?null:a;b.f=2;b.b=void 0===a?null:a;return b}
function ji(a){var b=new ii;a=void 0===a?null:a;b.f=1;b.b=void 0===a?null:a;return b}
;function li(a){D.call(this,a.message||a.description||a.name);this.isMissing=a instanceof mi;this.isTimeout=a instanceof hi&&"net.timeout"==a.errorCode;this.isCanceled=a instanceof qd}
n(li,D);li.prototype.name="BiscottiError";function mi(){D.call(this,"Biscotti ID is missing from server")}
n(mi,D);mi.prototype.name="BiscottiMissingError";var gi={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},ni=null;function de(){if("1"===hb(be(),"args","privembed"))return nd(Error("Biscotti ID is not available in private embed mode"));ni||(ni=pd(fi().then(oi),function(a){return pi(2,a)}));
return ni}
function oi(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new mi;a=JSON.parse(a.substr(4));if(1<(a.type||1))throw new mi;a=a.id;ee(a);ni=ji(a);qi(18E5,2);return a}
function pi(a,b){var c=new li(b);ee("");ni=ki(c);0<a&&qi(12E4,a-1);throw c;}
function qi(a,b){S(function(){pd(fi().then(oi,function(c){return pi(b,c)}),xa)},a)}
function ri(){try{var a=y("yt.ads.biscotti.getId_");return a?a():de()}catch(b){return nd(b)}}
;function si(a){if("1"!==hb(be(),"args","privembed")){a&&ce();try{ri().then(function(b){R("pass_biscotti_id_in_header_ajax_tv")||R("pass_biscotti_id_in_header_ajax")||(b=ie(b),b.bsq=ti++,He("//www.youtube.com/ad_data_204",{va:!1,C:b,withCredentials:!0}))},function(){}),S(si,18E5)}catch(b){Q(b)}}}
var ti=0;var Z=y("ytglobal.prefsUserPrefsPrefs_")||{};x("ytglobal.prefsUserPrefsPrefs_",Z,void 0);function ui(){this.b=P("ALT_PREF_COOKIE_NAME","PREF");var a=Ib.get(""+this.b,void 0);if(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Z[d]=c.toString())}}}
m=ui.prototype;m.get=function(a,b){vi(a);wi(a);var c=void 0!==Z[a]?Z[a].toString():null;return null!=c?c:b?b:""};
m.set=function(a,b){vi(a);wi(a);if(null==b)throw Error("ExpectedNotNull");Z[a]=b.toString()};
m.remove=function(a){vi(a);wi(a);delete Z[a]};
m.save=function(){pg(this.b,this.dump(),63072E3)};
m.clear=function(){for(var a in Z)delete Z[a]};
m.dump=function(){var a=[],b;for(b in Z)a.push(b+"="+encodeURIComponent(String(Z[b])));return a.join("&")};
function wi(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function vi(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function xi(a){a=void 0!==Z[a]?Z[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
ya(ui);var yi=null,zi=null,Ai=null,Bi={};function Ci(a){var b=a.id;a=a.ve_type;var c=Bg++;a=new zg({veType:a,veCounter:c,elementIndex:void 0,dataElement:void 0,youtubeData:void 0});Bi[b]=a;b=Gg();c=Fg();b&&c&&Jg(b,c,[a])}
function Di(a){var b=a.csn;a=a.root_ve_type;if(b&&a&&(Hg(b,a),a=Fg()))for(var c in Bi){var d=Bi[c];d&&Jg(b,a,[d])}}
function Ei(a){Bi[a.id]=new zg({trackingParams:a.tracking_params})}
function Fi(a){var b=Gg();a=Bi[a.id];b&&a&&mg("visualElementGestured",{csn:b,ve:Ag(a),gestureType:"INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK"},vg,void 0,void 0)}
function Gi(a){a=a.ids;var b=Gg();if(b)for(var c=0;c<a.length;c++){var d=Bi[a[c]];d&&mg("visualElementShown",{csn:b,ve:Ag(d),eventType:1},vg,void 0,void 0)}}
;x("yt.setConfig",O,void 0);x("yt.config.set",O,void 0);x("yt.setMsg",Re,void 0);x("yt.msgs.set",Re,void 0);x("yt.logging.errors.log",Pe,void 0);
x("writeEmbed",function(){var a=P("PLAYER_CONFIG",void 0);si(!0);"gvn"==a.args.ps&&(document.body.style.backgroundColor="transparent");var b=document.referrer,c=P("POST_MESSAGE_ORIGIN");window!=window.top&&b&&b!=document.URL&&(a.args.loaderUrl=b);P("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");yi=a=fh(a);a.addEventListener("onScreenChanged",Di);a.addEventListener("onLogClientVeCreated",Ci);a.addEventListener("onLogServerVeCreated",Ei);a.addEventListener("onLogVeClicked",Fi);a.addEventListener("onLogVesShown",
Gi);b=P("POST_MESSAGE_ID","player");P("ENABLE_JS_API")?Ai=new bi(a):P("ENABLE_POST_API")&&v(b)&&v(c)&&(zi=new ei(window.parent,b,c),Ai=new Wh(a,zi.g));c=ae("BG_P");Ff(c)&&(P("BG_I")||P("BG_IU"))&&(Bf=!0,Af.initialize(P("BG_I",null),P("BG_IU",null),c,Ef,void 0));wf()},void 0);
x("yt.www.watch.ads.restrictioncookie.spr",function(a){Ke(a+"mac_204?action_fcts=1");return!0},void 0);
var Hi=fe(function(){var a="ol";X.mark&&(0==a.lastIndexOf("mark_",0)||(a="mark_"+a),X.mark(a));a=Jh();var b=N();a.ol&&(a._ol=a._ol||[a.ol],a._ol.push(b));a.ol=b;a=qh();if(b=a.ol)tf(b),a.ol=0;Fh().tick_ol=void 0;N();Gh()?(a=Hh(),kh("tick_ol_"+a)||hh("latencyActionTicked",{tickName:"ol",clientActionNonce:a},void 0),a=!0):a=!1;if(a=!a)a=!y("yt.timing.pingSent_");if(a&&(b=P("TIMING_ACTION",void 0),a=Jh(),y("ytglobal.timingready_")&&b&&a._start&&(b=Ih()))){Ch||(ph(uh,new sh(Math.round(b-a._start),void 0)),
Ch=!0);b=!0;var c=P("TIMING_WAIT",[]);if(c.length)for(var d=0,e=c.length;d<e;++d)if(!(c[d]in a)){b=!1;break}b&&Lh()}a=ui.getInstance();c=!!((xi("f"+(Math.floor(119/31)+1))||0)&67108864);b=1<window.devicePixelRatio;document.body&&Sc(document.body,"exp-invert-logo")&&(b&&!Sc(document.body,"inverted-hdpi")?(d=document.body,d.classList?d.classList.add("inverted-hdpi"):Sc(d,"inverted-hdpi")||(d.className+=0<d.className.length?" inverted-hdpi":"inverted-hdpi")):!b&&Sc(document.body,"inverted-hdpi")&&Tc());
c!=b&&(c="f"+(Math.floor(119/31)+1),d=xi(c)||0,d=b?d|67108864:d&-67108865,0==d?delete Z[c]:(b=d.toString(16),Z[c]=b.toString()),a.save())}),Ii=fe(function(){var a=yi;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();P("PL_ATT")&&Af.dispose();a=0;for(var b=uf.length;a<b;a++)tf(uf[a]);uf.length=0;nf("//static.doubleclick.net/instream/ad_status.js");vf=!1;O("DCLKSTAT",0);Qc(Ai,zi);if(a=yi)a.removeEventListener("onScreenChanged",Di),a.removeEventListener("onLogClientVeCreated",Ci),a.removeEventListener("onLogServerVeCreated",Ei),a.removeEventListener("onLogVeClicked",Fi),a.removeEventListener("onLogVesShown",Gi),a.destroy();Bi={}});
window.addEventListener?(window.addEventListener("load",Hi),window.addEventListener("unload",Ii)):window.attachEvent&&(window.attachEvent("onload",Hi),window.attachEvent("onunload",Ii));Ja("yt.abuse.player.botguardInitialized",y("yt.abuse.player.botguardInitialized")||Gf);Ja("yt.abuse.player.invokeBotguard",y("yt.abuse.player.invokeBotguard")||Hf);Ja("yt.abuse.dclkstatus.checkDclkStatus",y("yt.abuse.dclkstatus.checkDclkStatus")||xf);
Ja("yt.player.exports.navigate",y("yt.player.exports.navigate")||Ig);Ja("yt.util.activity.init",y("yt.util.activity.init")||Sf);Ja("yt.util.activity.getTimeSinceActive",y("yt.util.activity.getTimeSinceActive")||Vf);Ja("yt.util.activity.setTimestamp",y("yt.util.activity.setTimestamp")||Tf);}).call(this);
