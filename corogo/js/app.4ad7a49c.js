!function(t){function e(e){for(var o,a,s=e[0],u=e[1],d=e[2],l=0,h=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&h.push(r[a][0]),r[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(t[o]=u[o]);for(c&&c(e);h.length;)h.shift()();return i.push.apply(i,d||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,s=1;s<n.length;s++){var u=n[s];0!==r[u]&&(o=!1)}o&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},r={0:0},i=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var d=0;d<s.length;d++)e(s[d]);var c=u;i.push([126,1]),n()}({101:function(t,e,n){},126:function(t,e,n){"use strict";n.r(e);n(50),n(87),n(100),n(101);var o=n(49),r=n(11),i=(n(71),n(103),n(2)),a=(n(104),n(107),n(108),n(109),n(110),n(112),n(78),n(118),n(119),n(120),n(122),n(124),n(125),function(t,e,n,o){return Math.sqrt(Math.pow(t-e,2)+Math.pow(n-o,2))});function s(t){return function(t){if(Array.isArray(t))return u(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function d(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var c=function(){function t(e,n,o,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var a=200/r;this.r=(10+15*Math.random())*a,this.r=this.r<5?5:this.r,this.pos={x:e,y:n},this.updating=!0,o&&(this.virus=!0,this.fill=o,this.r*=2),this.body=i.Bodies.circle(e,n,this.r/1.5),i.Body.setMass(this.body,3/a)}var e,n,o;return e=t,(n=[{key:"contagion",value:function(t){var e=this;t.forEach((function(t){a(t.body.position.x,e.body.position.x,t.body.position.y,e.body.position.y)<(e.r+t.r)/1.2&&e.virus&&!t.virus&&Math.random()>.7&&!e.updating&&(e.fill[3]>100&&window.sampler.triggerAttack(e.fill[2]),setTimeout((function(){t.virus=!0,t.mother=e,t.fill=[].concat(s(e.fill.slice(0,3)),[Math.abs(e.fill[3]-30)+10])}),Math.pow(2e3/e.fill[3],2)))}))}},{key:"changePos",value:function(){if(Math.random()>.5){this.updating=!0;var t={x:.03*(Math.random()-.5),y:.03*(Math.random()-.5)};i.Body.applyForce(this.body,this.body.position,t)}}},{key:"display",value:function(t){this.body.angularVelocity<.1&&(this.updating=!1),this.died&&i.Body.applyForce(this.body,this.body.position,{x:0,y:.01}),t.push(),t.translate(this.body.position.x,this.body.position.y),t.rotate(this.body.angle),t.fill(this.virus?this.fill:[255,255,255,3*this.r]),this.died?(t.fill(0),t.rect(0,0,2*this.r)):t.ellipse(0,0,2*this.r),t.stroke(255,3*this.r),t.pop(),t.push(),this.mother&&a(this.mother.body.position.x,this.body.position.x,this.mother.body.position.y,this.body.position.y)<3*this.r&&(t.strokeWeight(this.r/2),t.stroke(s(this.fill.slice(0,4))),t.line(this.body.position.x,this.body.position.y,this.mother.body.position.x,this.mother.body.position.y)),t.pop()}}])&&d(e.prototype,n),o&&d(e,o),t}(),l=function(t){var e=t,n=i.Engine.create();n.world.gravity.y=0,e.start=function(){e.loop(),i.Engine.run(n)},e.lastKey=localStorage.getItem("last-key")||"notok",e.thisKey="OK".concat(Date()),e.get=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.lastKey;return JSON.parse(localStorage.getItem(t))||[]},e.save=function(t,e){localStorage.setItem(e,JSON.stringify(t)),localStorage.setItem("last-key",e)};var o=!0,r=[],a=[],s=3,u=[],d={color:[120*Math.random(),120*Math.random(),120*Math.random(),255],r:80,text:"virus ".concat(s)},l=!1;e.setup=function(){var t,o,s,u,d;e.createCanvas(e.windowWidth,e.windowHeight),t=i.Bodies.rectangle(0,0,10,4e3,{isStatic:!0}),o=i.Bodies.rectangle(e.width,0,10,4e3,{isStatic:!0}),s=i.Bodies.rectangle(0,0,4e3,10,{isStatic:!0}),u=i.Bodies.rectangle(0,e.height,4e3,10,{isStatic:!0}),d=i.MouseConstraint.create(n,{constraint:{stiffness:.2,render:{visible:!1}}}),i.World.add(n.world,[t,o,s,u,d]),e.scaleRef=(e.width+e.height)/2,e.background(0),e.noStroke(),e.strokeCap(e.SQUARE),e.rectMode(e.CENTER),e.textAlign(e.CENTER),e.textSize(40);for(var l=0;l<230;l+=1)r[l]=new c(e.random(0,e.width),e.random(0,e.height),!1,1e3/(e.width+e.height)*230),i.World.add(n.world,r[l].body),a[l]={x:e.random(0,e.width),y:e.random(0,e.height)}},e.draw=function(){e.background(200,200,200),e.noFill(),r.forEach((function(t){t.updating||t.contagion(r,sampler),l&&t.changePos(),t.display(e)}))},e.addVirusMouse=function(){var t=new c(e.mouseX,e.mouseY,d.color,230);r.push(t),a.push({x:e.mouseX,y:e.mouseY}),i.World.add(n.world,t.body),setTimeout((function(){d.color=[120*Math.random(),120*Math.random(),120*Math.random(),255],d.text="virus ".concat(s)}),600)},e.handleTouchEnd=function(t){if(l=!0,t.preventDefault(),s>0)e.addVirusMouse(),s-=1;else{d.color=[100,100,100,100],d.r=40,d.text="",1;var n=0;r.forEach((function(t){Math.random()>.95&&t.virus&&!t.died&&(t.died=!0,window.sampler2.triggerAttack("C3"),n+=1)})),u.push(n),a=a.map((function(t){if(Math.random()>.98)return{ancient:{x:t.x,y:t.y},x:e.mouseX+e.random(-50,50),y:e.mouseY+e.random(-50,50)};if(Math.random()>.8){var n=t.x+e.random(-230,230),o=t.y+e.random(-230,230);return n=n<0?e.random(0,e.width):n,o=o<0?e.random(0,e.height):o,{ancient:{x:t.x,y:t.y},x:n,y:o}}return Math.random()>.5&&t.ancient?t.ancient:t}))}},e.keyPressed=function(){switch(e.keyCode){case 32:e.saveCapture();break;case 78:o?(e.noLoop(),o=!o):(e.loop(),o=!o)}},e.saveCapture=function(){e.pixelDensity()>1&&e.saveCanvas(document.querySelector("canvas"),"ok".concat(Date()),"png")},e.windowResized=function(){e.resizeCanvas(e.windowWidth,e.windowHeight)};window.addEventListener("touchstart",e.handleTouchEnd,{passive:!1}),window.addEventListener("touchend",(function(){l=!1}),{passive:!1}),window.addEventListener("mousedown",e.handleTouchEnd,{passive:!1}),window.addEventListener("mouseup",(function(){l=!1}),{passive:!1}),document.addEventListener("ontouchmove",(function(t){t.preventDefault()}),{passive:!1}),document.addEventListener("touchmove",(function(t){t.preventDefault()}),{passive:!1})},h=n(83),f=n.n(h),p=n(84),y=n.n(p),m=void 0;function v(t,e,n,o,r,i,a){try{var s=t[i](a),u=s.value}catch(t){return void n(t)}s.done?e(u):Promise.resolve(u).then(o,r)}function w(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var i=t.apply(e,n);function a(t){v(i,o,r,a,s,"next",t)}function s(t){v(i,o,r,a,s,"throw",t)}a(void 0)}))}}var g=new r.Sampler({E3:f.a},{onload:function(){m.isLoaded=!0}}).chain(new r.Volume(-14),r.Master),b=new r.Sampler({D3:y.a},{onload:function(){m.isLoaded=!0}}).chain(new r.Volume(-6),r.Master);window.sampler=g,window.sampler2=b,o.disableFriendlyErrors=!0,document.querySelector("html").addEventListener("click",w(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.start();case 2:new o(l).start();case 4:case"end":return t.stop()}}),t)}))),{once:!0})},83:function(t,e,n){t.exports=n.p+"src/sound/chasing.mp3"},84:function(t,e,n){t.exports=n.p+"src/sound/light.mp3"}});
//# sourceMappingURL=app.4ad7a49c.js.map