(()=>{const n="cache-only-0.0.7";function e(e){return caches.open(n).then((function(n){return n.match(e,{ignoreSearch:!0}).then((function(n){return n||Promise.reject("request-not-in-cache")}))}))}self.addEventListener("install",(function(e){e.waitUntil(function(){const e=[{'revision':null,'url':'328.edfe5a9a6486e9d9dec3.min.js'},{'revision':null,'url':'352.3a3c6869f86c6ee240a5.min.js'},{'revision':null,'url':'387.aefa56770dd24ac76b80.min.js'},{'revision':null,'url':'483.87a4be7835d8719620fc.min.js'},{'revision':null,'url':'590.5004a6c505a36744a40a.min.js'},{'revision':null,'url':'833.c5be55c62d9166a638e5.min.js'},{'revision':null,'url':'967.8dce5fcbaa5c0d665821.min.js'},{'revision':'19143f59d999a4e65249a6fb4c0ca3a4','url':'images/face.svg'},{'revision':'d6425fd76528e0acf424a1749b97e389','url':'images/mask.png'},{'revision':null,'url':'main.6c10f58f9918818eba8b.min.css'},{'revision':null,'url':'main.6e27ab3d1612afc61c9a.min.js'},{'revision':'ee0e7af76a665159ffd08b91a7a9b661','url':'manifest.json'},{'revision':'c34648b1f6dcf740eedef0473f13f4e1','url':'models/age_gender_model-shard1'},{'revision':'d443abfd550a910c026d40cad6ea6000','url':'models/age_gender_model-weights_manifest.json'},{'revision':'9391e7c270c74eed24a3806daac7c166','url':'models/cat.json'},{'revision':'cb5cfff6671c671c74640c87e52cbc2f','url':'models/default.json'},{'revision':'33ec63fec9fc41801930d44f4f4ea8f0','url':'models/face_expression_model-shard1'},{'revision':'1eee5a2eea5ea5652904a2af88333dc1','url':'models/face_expression_model-weights_manifest.json'},{'revision':'124304f06e07fcf928290ff776e96141','url':'models/face_landmark_68_model-shard1'},{'revision':'1d4029763003335bc6921aadeb58706a','url':'models/face_landmark_68_model-weights_manifest.json'},{'revision':'47047fee26557b55d985952bdfc6cba1','url':'models/face_landmark_68_tiny_model-shard1'},{'revision':'29ea9c5c0e59a3069f8999b4ba1bd173','url':'models/face_landmark_68_tiny_model-weights_manifest.json'},{'revision':'cb6f0f62e7598d70acf76483185a962b','url':'models/face_recognition_model-shard1'},{'revision':'f2091ed03625f6e164a637c2326691c1','url':'models/face_recognition_model-shard2'},{'revision':'6ecdaf3ea10d4fd3792e485f971e8b96','url':'models/face_recognition_model-weights_manifest.json'},{'revision':'adfbbf2bfa4bb822cbe991724b2619e7','url':'models/fil.json'},{'revision':'747dcc9b485d970743d9ae380282dac6','url':'models/ira.json'},{'revision':'adfbbf2bfa4bb822cbe991724b2619e7','url':'models/max.json'},{'revision':'ef607c68a523af0f6eab19f21ad1c12e','url':'models/membrana.json'},{'revision':'bca29cf257ac945ab0f6878000c06ae4','url':'models/meshok.json'},{'revision':'7cd16067e94746eb306d8a20dfdc86e9','url':'models/planeta.json'},{'revision':'37ef238973ea93daac91f1914478c40b','url':'models/ssd_mobilenetv1_model-shard1'},{'revision':'b6d5e81e2506145360be5c4278067080','url':'models/ssd_mobilenetv1_model-shard2'},{'revision':'cd2d65ec62107ba72b8b8d5047011647','url':'models/ssd_mobilenetv1_model-weights_manifest.json'},{'revision':'2e48b20953b0c59df47459d0319843a0','url':'models/tiny_face_detector_model-shard1'},{'revision':'5bab50532388f5da9b4cd85b15adc11c','url':'models/tiny_face_detector_model-weights_manifest.json'},{'revision':'c80f2843d4b8682c37dfd48bebd0099c','url':'models/yandexlavka.json'}].map((n=>n.url));return caches.open(n).then((function(n){return n.addAll(["./",...e])}))}().then((function(){return self.skipWaiting()})))})),self.addEventListener("activated",(function(n){})),self.addEventListener("fetch",(function(n){var t;n.respondWith((t=n.request,fetch(t).then((function(n){return n.ok?n:e(t)})).catch((function(){return e(t)}))))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(e!==n)return caches.delete(e)})))})).then((function(){return self.clients.claim()})))}))})();