(()=>{const n="cache-only-0.0.7";function e(e){return caches.open(n).then((function(n){return n.match(e,{ignoreSearch:!0}).then((function(n){return n||Promise.reject("request-not-in-cache")}))}))}self.addEventListener("install",(function(e){e.waitUntil(function(){const e=[{'revision':null,'url':'328.edfe5a9a6486e9d9dec3.min.js'},{'revision':null,'url':'352.3a3c6869f86c6ee240a5.min.js'},{'revision':null,'url':'387.aefa56770dd24ac76b80.min.js'},{'revision':null,'url':'483.4498ff7f07ef6a7538aa.min.js'},{'revision':null,'url':'590.5004a6c505a36744a40a.min.js'},{'revision':null,'url':'833.c5be55c62d9166a638e5.min.js'},{'revision':null,'url':'967.8dce5fcbaa5c0d665821.min.js'},{'revision':'19143f59d999a4e65249a6fb4c0ca3a4','url':'images/face.svg'},{'revision':'d6425fd76528e0acf424a1749b97e389','url':'images/mask.png'},{'revision':null,'url':'main.6c70689d4f117899c8a8.min.js'},{'revision':null,'url':'main.d54533aec2da6ec9ab9b.min.css'},{'revision':'ee0e7af76a665159ffd08b91a7a9b661','url':'manifest.json'},{'revision':'c70a78ad4a96f37f772264457a846209','url':'models/age_gender_model-weights_manifest.json'},{'revision':'c34648b1f6dcf740eedef0473f13f4e1','url':'models/age_gender_model.bin'},{'revision':'cbef7a46dac11ef2611c60e4dc05e0e2','url':'models/cat.json'},{'revision':'1e7d9a8ed83027e715a41f9331da0a4b','url':'models/default.json'},{'revision':'5a06a890387a7999578e6cb172d39c62','url':'models/face_expression_model-weights_manifest.json'},{'revision':'33ec63fec9fc41801930d44f4f4ea8f0','url':'models/face_expression_model.bin'},{'revision':'5d083f3f330b61925025ec8d81361db7','url':'models/face_landmark_68_model-weights_manifest.json'},{'revision':'124304f06e07fcf928290ff776e96141','url':'models/face_landmark_68_model.bin'},{'revision':'ae8a09f24ac26b863bc9b1d025e71d14','url':'models/face_landmark_68_tiny_model-weights_manifest.json'},{'revision':'47047fee26557b55d985952bdfc6cba1','url':'models/face_landmark_68_tiny_model.bin'},{'revision':'1b056fd5dd4ddc1b83edc726a32c973e','url':'models/face_recognition_model-weights_manifest.json'},{'revision':'adfbbf2bfa4bb822cbe991724b2619e7','url':'models/fil.json'},{'revision':'8b13e846591c314bf2dca860653849a0','url':'models/ira.json'},{'revision':'cd87d392b2cb874c8c3022f0ed62e554','url':'models/max.json'},{'revision':'856be1e35d0f3119d5be23ad8a24b8bd','url':'models/membrana.json'},{'revision':'6648f79f19eb04f6146756becd92d6ff','url':'models/meshok.json'},{'revision':'4320bb43d34863a5236ad24d52315f9f','url':'models/planeta.json'},{'revision':'be22e29927986a0254adc18e2012a69b','url':'models/ssd_mobilenetv1_model-weights_manifest.json'},{'revision':'862f9faaeb421d87a569666df52b84d2','url':'models/tiny_face_detector_model-weights_manifest.json'},{'revision':'2e48b20953b0c59df47459d0319843a0','url':'models/tiny_face_detector_model.bin'},{'revision':'e5b2358186eb8b3f7d4bcc41890f3a35','url':'models/yandexlavka.json'}].map((n=>n.url));return caches.open(n).then((function(n){return n.addAll(["./",...e])}))}().then((function(){return self.skipWaiting()})))})),self.addEventListener("activated",(function(n){})),self.addEventListener("fetch",(function(n){var t;n.respondWith((t=n.request,fetch(t).then((function(n){return n.ok?n:e(t)})).catch((function(){return e(t)}))))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(e!==n)return caches.delete(e)})))})).then((function(){return self.clients.claim()})))}))})();