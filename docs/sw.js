!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){const t="cache-only-0.0.1";function r(e){return caches.open(t).then((function(n){return n.match(e,{ignoreSearch:!0}).then((function(e){return e||Promise.reject("request-not-in-cache")}))}))}function i(){const e=[{'revision':'91087884a42091c2400c817d315276aa','url':'1.9cbe3d94ad0d5a6065fa.min.js'},{'revision':'19143f59d999a4e65249a6fb4c0ca3a4','url':'images/face.svg'},{'revision':'d6425fd76528e0acf424a1749b97e389','url':'images/mask.png'},{'revision':'e32bd95f4a927f76eb1cb95de248f61c','url':'main.4d2aaf907dace69a30ba.min.css'},{'revision':'3b76152c07c393999bba2abf3fd59afa','url':'main.6c112e4a589430d961b7.min.js'},{'revision':'ee0e7af76a665159ffd08b91a7a9b661','url':'manifest.json'},{'revision':'c34648b1f6dcf740eedef0473f13f4e1','url':'models/age_gender_model-shard1'},{'revision':'d443abfd550a910c026d40cad6ea6000','url':'models/age_gender_model-weights_manifest.json'},{'revision':'cb5cfff6671c671c74640c87e52cbc2f','url':'models/data.json'},{'revision':'33ec63fec9fc41801930d44f4f4ea8f0','url':'models/face_expression_model-shard1'},{'revision':'1eee5a2eea5ea5652904a2af88333dc1','url':'models/face_expression_model-weights_manifest.json'},{'revision':'124304f06e07fcf928290ff776e96141','url':'models/face_landmark_68_model-shard1'},{'revision':'1d4029763003335bc6921aadeb58706a','url':'models/face_landmark_68_model-weights_manifest.json'},{'revision':'47047fee26557b55d985952bdfc6cba1','url':'models/face_landmark_68_tiny_model-shard1'},{'revision':'29ea9c5c0e59a3069f8999b4ba1bd173','url':'models/face_landmark_68_tiny_model-weights_manifest.json'},{'revision':'6ecdaf3ea10d4fd3792e485f971e8b96','url':'models/face_recognition_model-weights_manifest.json'},{'revision':'846e8dd4e6a7ed12a2c749324adf0e11','url':'models/mtcnn_model-shard1'},{'revision':'781bd744a5399d7cb0516d2a59a7c1c0','url':'models/mtcnn_model-weights_manifest.json'},{'revision':'b6d5e81e2506145360be5c4278067080','url':'models/ssd_mobilenetv1_model-shard2'},{'revision':'cd2d65ec62107ba72b8b8d5047011647','url':'models/ssd_mobilenetv1_model-weights_manifest.json'},{'revision':'2e48b20953b0c59df47459d0319843a0','url':'models/tiny_face_detector_model-shard1'},{'revision':'5bab50532388f5da9b4cd85b15adc11c','url':'models/tiny_face_detector_model-weights_manifest.json'}].map((e=>e.url));return caches.open(t).then((function(n){return n.addAll(["./",...e])}))}self.addEventListener("install",(function(e){e.waitUntil(i())})),self.addEventListener("install",(function(e){e.waitUntil(i().then((function(){return self.skipWaiting()})))})),self.addEventListener("fetch",(function(e){var n;e.respondWith((n=e.request,fetch(n).then((function(e){return e.ok?e:r(n)})).catch((function(){return r(n)}))))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(e!==t)return caches.delete(e)})))})).then((function(){return self.clients.claim()})))}))}]);