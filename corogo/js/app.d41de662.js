!function(t){function e(e){for(var n,a,s=e[0],c=e[1],l=e[2],d=0,h=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&h.push(r[a][0]),r[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);for(u&&u(e);h.length;)h.shift()();return i.push.apply(i,l||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],n=!0,s=1;s<o.length;s++){var c=o[s];0!==r[c]&&(n=!1)}n&&(i.splice(e--,1),t=a(a.s=o[0]))}return t}var n={},r={0:0},i=[];function a(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=n,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(o,n,function(e){return t[e]}.bind(null,n));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;i.push([127,1]),o()}({102:function(t,e,o){},127:function(t,e,o){"use strict";o.r(e);o(53),o(89),o(101),o(102);var n=o(52),r=o(15);o(75),o(50),o(106),o(51),o(108),o(109),o(110),o(81);function i(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function a(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?i(Object(o),!0).forEach((function(e){s(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function s(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c=function t(e){var o=t.synth,n=localStorage.getItem("last-key")||"notok",r="OK".concat(Date()),i=e,s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n;return JSON.parse(localStorage.getItem(t))||[]}(),c=0,l={x:0,y:0,r:30,fill:[1,1,1,1],increment:5,stop:-5},u=[a({},l)],d=function(){return s.length>0&&!1},h=!0;i.speed=.05,i.setup=function(){i.noLoop(),i.pixelDensity(1),i.createCanvas(100,100),i.background(255,255,100),i.noStroke()},i.draw=function(){d()&&(l=s[c]),l.x>=Math.abs(i.width-l.r-l.stop)?l.y+=l.increment:(o.triggerAttackRelease(i.constrain(Math.abs(l.fill[1]/l.fill[2])*l.increment+4*l.x-10*l.y,40,2e5),"1"),l.x+=l.increment),l.y>Math.abs(i.height-l.r-l.stop)&&(d()?l=s[c+=1]:(l.fill=[Math.floor(i.random(-700,300)),Math.floor(i.random(-255,100)),Math.floor(i.random(-500,500))],l.r+=6*Math.floor(5*Math.random()),l.x=-5,l.y=-5,u.push(a({},l)))),l.r>Math.abs(i.height-l.stop)&&(l.r=10,d()||(l.increment=Math.ceil(33*Math.ceil(33*Math.random())/l.r)),l.increment>3&&(l.stop+=(i.width/3*3-l.stop)*i.speed,l.stop>100*i.width&&(i.saveCapture(),setTimeout((function(){i.clear(),l={x:0,y:0,r:30,fill:0,increment:5,stop:-5},i.loop()}),1e4)))),i.fill(l.fill),i.rect(l.x,l.y,l.r)},i.keyPressed=function(){switch(i.keyCode){case 32:i.saveCapture();break;case 78:h?(i.noLoop(),h=!h):(i.loop(),h=!h)}},i.saveCapture=function(){var t,e;i.noLoop(),i.pixelDensity()>5&&(i.saveCanvas(document.querySelector("canvas"),"ok".concat(Date()),"png"),d()||(console.log(JSON.stringify(u)),t=u,e=r,localStorage.setItem(e,JSON.stringify(t)),localStorage.setItem("last-key",e)))}},l=function t(e){var o=e,n=t.synth,r=t.Tone;o.lastKey=localStorage.getItem("last-key")||"notok",o.thisKey="OK".concat(Date()),o.get=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.lastKey;return JSON.parse(localStorage.getItem(t))||[]},o.save=function(t,e){localStorage.setItem(e,JSON.stringify(t)),localStorage.setItem("last-key",e)};var i=!0,a={x:30,y:30,r:10,fill:[0,0,0,0]},s=new r.Sequence((function(t,e){a.fill=[Math.floor(o.random(-200,600)),Math.floor(o.random(-255,100)),Math.floor(o.random(-500,500))],a.r=Math.floor(5*Math.random())*o.scaleRef/15,a.x=o.width/2,a.y=e+100,n.triggerAttackRelease(e,"4n")}),[110,220,[55,220,[440,880,440]]]);o.setup=function(){o.pixelDensity(3),o.createCanvas(o.windowWidth,o.windowHeight),o.scaleRef=(o.width+o.height)/2,o.background(0),o.noStroke(),o.rectMode(o.CENTER),s.humanize=!0,s.probability=1,s.start(),r.Transport.loopEnd="1:0:0",r.Transport.loop=!0,r.Transport.bpm.value=70},o.draw=function(){a.r+=.5*(o.noise(a.fill[0],a.fill[3],a.fill[1])*o.scaleRef/2-a.r),o.fill(a.fill),a.y<o.height/2?o.rect(a.x,a.y,a.r):o.ellipse(a.x,a.y,a.r)},o.mousePressed=function(){a.x+=5,r.Transport.start()},o.keyPressed=function(){switch(o.keyCode){case 32:o.saveCapture();break;case 78:r.Transport.toggle(),i?(o.noLoop(),i=!i):(o.loop(),i=!i);break;case 65:r.Transport.clear(2);break;default:console.log(r.Transport),s.at(2,[220,o.random(220,480)]),console.log(s)}},o.saveCapture=function(){o.pixelDensity()>1&&o.saveCanvas(document.querySelector("canvas"),"ok".concat(Date()),"png")}},u=(o(111),o(2)),d=(o(112),o(113),o(114),o(115),o(83),o(121),o(122),o(124),o(126),function(t,e,o,n){return Math.sqrt(Math.pow(t-e,2)+Math.pow(o-n,2))});function h(t){return function(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function p(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var f=function(){function t(e,o,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=200/r;this.r=(10+15*Math.random())*i,this.r=this.r<5?5:this.r,this.pos={x:e,y:o},this.updating=!0,n&&(this.virus=!0,this.fill=n,this.r*=2),this.body=u.Bodies.circle(e,o,this.r/1.5),u.Body.setMass(this.body,3/i)}var e,o,n;return e=t,(o=[{key:"contagion",value:function(t){var e=this;t.forEach((function(t){d(t.body.position.x,e.body.position.x,t.body.position.y,e.body.position.y)<(e.r+t.r)/1.2&&e.virus&&!t.virus&&Math.random()>.5&&!e.updating&&setTimeout((function(){t.virus=!0,t.mother=e,t.fill=[].concat(h(e.fill.slice(0,3)),[Math.abs(e.fill[3]-30)+10])}),Math.pow(2e3/e.fill[3],2))}))}},{key:"changePos",value:function(){if(Math.random()>.5){this.updating=!0;var t={x:.03*(Math.random()-.5),y:.03*(Math.random()-.5)};u.Body.applyForce(this.body,this.body.position,t)}}},{key:"display",value:function(t){this.body.angularVelocity<.1&&(this.updating=!1),this.died&&u.Body.applyForce(this.body,this.body.position,{x:0,y:.01}),t.push(),t.translate(this.body.position.x,this.body.position.y),t.rotate(this.body.angle),t.fill(this.virus?this.fill:[255,255,255,3*this.r]),this.died&&t.fill(0),t.ellipse(0,0,2*this.r),t.stroke(255,3*this.r),t.pop(),t.push(),this.mother&&d(this.mother.body.position.x,this.body.position.x,this.mother.body.position.y,this.body.position.y)<3*this.r&&(t.strokeWeight(this.r/2),t.stroke(h(this.fill.slice(0,4))),t.line(this.body.position.x,this.body.position.y,this.mother.body.position.x,this.mother.body.position.y)),t.pop()}}])&&p(e.prototype,o),n&&p(e,n),t}(),y=u.Engine.create(),v=u.MouseConstraint.create(y,{constraint:{stiffness:.2,render:{visible:!1}}});y.world.gravity.y=0,u.World.add(y.world,v),u.Engine.run(y);var m=function(){"function"==typeof DeviceMotionEvent.requestPermission&&DeviceMotionEvent.requestPermission().then((function(t){"granted"===t&&window.addEventListener("deviceorientation",(function(t){y.world.gravity.y=t.beta/180,document.querySelector("p").innerHTML=t.alpha}))})).catch(console.error)},g=function t(e){var o=e,n=t.Tone;o.lastKey=localStorage.getItem("last-key")||"notok",o.thisKey="OK".concat(Date()),o.get=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.lastKey;return JSON.parse(localStorage.getItem(t))||[]},o.save=function(t,e){localStorage.setItem(e,JSON.stringify(t)),localStorage.setItem("last-key",e)};var r=!0,i=[],a=[],s=3,c=[],l={color:[120*Math.random(),120*Math.random(),120*Math.random(),255],r:80,text:"virus ".concat(s)},d=!1;o.setup=function(){o.createCanvas(o.windowWidth,o.windowHeight),o.scaleRef=(o.width+o.height)/2,o.background(0),o.noStroke(),o.rectMode(o.CENTER),o.textAlign(o.CENTER),o.textSize(40),o.strokeCap(o.SQUARE),document.querySelector("body").addEventListener("click",m,{once:!0}),window.addEventListener("touchstart",o.handleTouchEnd,{passive:!1}),window.addEventListener("touchend",(function(){d=!1}),{passive:!1}),window.addEventListener("mousedown",o.handleTouchEnd,{passive:!1}),window.addEventListener("mouseup",(function(){d=!1}),{passive:!1}),document.addEventListener("ontouchmove",(function(t){t.preventDefault()}),{passive:!1}),document.addEventListener("touchmove",(function(t){t.preventDefault()}),{passive:!1});var t=u.Bodies.rectangle(0,0,10,4e3,{isStatic:!0}),e=u.Bodies.rectangle(o.width,0,10,4e3,{isStatic:!0}),n=u.Bodies.rectangle(0,0,4e3,10,{isStatic:!0}),r=u.Bodies.rectangle(0,o.height,4e3,10,{isStatic:!0});u.World.add(y.world,[t,e,n,r]);for(var s=0;s<230;s+=1)i[s]=new f(o.random(0,o.width),o.random(0,o.height),!1,1e3/(o.width+o.height)*230),u.World.add(y.world,i[s].body),a[s]={x:o.random(0,o.width),y:o.random(0,o.height)}},o.draw=function(){o.background(200,200,200),o.noFill(),i.forEach((function(t,e){t.updating||t.contagion(i),d&&t.changePos(),t.display(o),t.virus}))},o.handleTouchEnd=function(t){if(d=!0,s>0){var e=new f(o.mouseX,o.mouseY,l.color,230);i.push(e),a.push({x:o.mouseX,y:o.mouseY}),u.World.add(y.world,e.body),s-=1,setTimeout((function(){l.color=[120*Math.random(),120*Math.random(),120*Math.random(),255],l.text="virus ".concat(s)}),600),a=a.map((function(t){return{x:t.x+o.random(-30,30),y:t.y+o.random(-30,30)}}))}else{l.color=[100,100,100,100],l.r=40,l.text="",1;var n=0;i.forEach((function(t){Math.random()>.95&&t.virus&&!t.died&&(t.died=!0,n+=1)})),c.push(n),a=a.map((function(t){if(Math.random()>.98)return{ancient:{x:t.x,y:t.y},x:o.mouseX+o.random(-50,50),y:o.mouseY+o.random(-50,50)};if(Math.random()>.8){var e=t.x+o.random(-230,230),n=t.y+o.random(-230,230);return e=e<0?o.random(0,o.width):e,n=n<0?o.random(0,o.height):n,{ancient:{x:t.x,y:t.y},x:e,y:n}}return Math.random()>.5&&t.ancient?t.ancient:t}))}},o.keyPressed=function(){switch(o.keyCode){case 32:o.saveCapture();break;case 78:n.Transport.toggle(),r?(o.noLoop(),r=!r):(o.loop(),r=!r)}},o.saveCapture=function(){o.pixelDensity()>1&&o.saveCanvas(document.querySelector("canvas"),"ok".concat(Date()),"png")},o.windowResized=function(){o.resizeCanvas(o.windowWidth,o.windowHeight)}};function b(t,e,o,n,r,i,a){try{var s=t[i](a),c=s.value}catch(t){return void o(t)}s.done?e(c):Promise.resolve(c).then(n,r)}function w(t){return function(){var e=this,o=arguments;return new Promise((function(n,r){var i=t.apply(e,o);function a(t){b(i,n,r,a,s,"next",t)}function s(t){b(i,n,r,a,s,"throw",t)}a(void 0)}))}}var x=new r.Distortion(.1),M=new r.Tremolo(5,.6).start(),k=new r.Synth({oscillator:{type:"sine",modulationType:"sawtooth",modulationIndex:6,harmonicity:1},envelope:{attack:.4,decay:.1,sustain:.8,release:1}}).chain(x,M,r.Master);c.synth=k,l.synth=k,l.Tone=r;new n(g);n.friendlyReport=!1,document.querySelector("body").addEventListener("click",w(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.start();case 2:console.log("audio is ready");case 3:case"end":return t.stop()}}),t)}))),{once:!0})}});
//# sourceMappingURL=app.d41de662.js.map