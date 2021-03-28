// import * as faceapi from "@vladmandic/face-api";
import * as faceapi from '@vladmandic/face-api';

export default function game(window, document, settings) {
    const imageUpload = document.getElementById('imageUpload');
    const video = document.getElementById('video');
    const videoContainer = document.querySelector('.video_container');
    const imageContainer = document.querySelector('.image_container');
    const startVideoButton = document.querySelector('.start_video');
    const header = document.querySelector('.main_header');
    const footer = document.querySelector('footer');
    const processing = document.querySelector('.processing');
    let timer = null;

    let nameConvertor = function () {
        const names = {
            'unknown': "Хер с горы",
            'petr': "Петруччо",
            'serg': "Серж",
            'sava': "Чемонин",
            'lenya': "Лёня",
            'chern': "Не лох",
            'boys': "ЧернRк",
            'glider': "Шурик"
        };

        function convert(label, found) {
            const def = names[label];
            if (def) {
                if (found && found.gender === 'female' && label === 'unknown') {
                    return "Незнакомка";
                }
                return def;
            }
            return label;
        }

        return {convert: convert}
    }();

    if (settings.modes.includes(settings.mode) && settings.mode !== 'default') {
        let moduleTexts = null;
        if (settings.mode === 'diagnosis' || settings.mode === 'ira') {
            moduleTexts = import('./translations/diagnosis.js');
        } else if (settings.mode === 'planeta') {
            moduleTexts = import('./translations/planeta.js');
        } else if (settings.mode === 'max') {
            moduleTexts = import('./translations/max.js');
        } else if (settings.mode === 'cat') {
            moduleTexts = import('./translations/cat.js');
        } else if (settings.mode === 'meshok') {
            moduleTexts = import('./translations/meshok.mjs');
        } else if (settings.mode === 'yandexlavka') {
            moduleTexts = import('./translations/yandexlavka.mjs');
        }
        if (moduleTexts) {
            moduleTexts.then(mode => {
                header.innerText = mode.default.header;
                nameConvertor = mode.default.nameConvertor;
            });
        }
    }

    let modelToLoad = "default";
    if (settings.modes.includes(settings.mode)) {
        modelToLoad = settings.mode;
    }

    Promise.all([
        loadLabeledImages2(modelToLoad),
        // faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ageGenderNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        // faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(start)

    async function start(arr) {
        const faceMatcher = faceapi.FaceMatcher.fromJSON(arr[0]);
        let image = null;
        let canvasImage = null;
        let canvasVideo = null;
        imageUpload.addEventListener('click', () => {
            videoContainer.classList.remove("hidden");
            footer.classList.add("hidden");
        });
        imageUpload.addEventListener('change', async () => {
            processing.classList.remove("hidden");
            if (image) {
                image.remove();
            }
            if (canvasImage) {
                canvasImage.remove();
            }
            image = await faceapi.bufferToImage(imageUpload.files[0]);
            imageContainer.append(image);
            canvasImage = faceapi.createCanvasFromMedia(image);
            imageContainer.append(canvasImage);
            const displaySize = {width: image.width, height: image.height}
            faceapi.matchDimensions(canvasImage, displaySize);
            const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors().withAgeAndGender();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            processing.classList.add("hidden");
            requestAnimationFrame(() => {
                drawRecognized(resizedDetections, canvasImage);
            });
        });

        startVideoButton.addEventListener('click', startVideo);

        function drawRecognized(resizedDetections, canvas) {
            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
            results.forEach((result, i) => {
                if (resizedDetections.length > 7) {
                    if (result.label === 'unknown') {
                        return;
                    }
                }
                const found = resizedDetections[i];
                const label = nameConvertor.convert(result.label, found);
                if (label !== 'unknown') {
                    const drawBox = new faceapi.draw.DrawBox(found.detection.box, {label: label});
                    drawBox.draw(canvas);
                }
            })
        }

        video.addEventListener('playing', () => {
            if (canvasVideo) {
                canvasVideo.remove();
            }
            const canvas = faceapi.createCanvasFromMedia(video);
            videoContainer.append(canvas);
            canvasVideo = canvas;
            const displaySize = {
                width: video.getBoundingClientRect().width,
                height: video.getBoundingClientRect().height
            }
            faceapi.matchDimensions(canvas, displaySize);
            if (timer) {
                clearInterval(timer);
            }
            timer = setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors().withAgeAndGender();
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                // faceapi.draw.drawDetections(canvas, resizedDetections)
                // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
                drawRecognized(resizedDetections, canvas);

            }, 300);
        })
    }


    async function loadLabeledImages2(name) {
        try {
            const res = await fetch("/models/" + name + ".json")
            return res.json();
        } catch (e) {
            const res = await fetch("/models/default.json")
            return res.json();
        }
    }

    async function startVideo() {
        videoContainer.classList.remove("hidden");
        footer.classList.add("hidden");
        if (timer) {
            clearInterval(timer);
        }
        const constraints = {video: true};

        try {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (mediaStream) {
                    video.srcObject = mediaStream;
                    // video.onloadedmetadata = function (e) {
                    //     video.play();
                    // };
                })
                .catch(function (err) {
                    console.log(err.name + ": " + err.message);
                });
        } catch (e) {
            console.log(e);
        }
    }
}
