import * as faceapi from "face-api.js";

export default function game(window, document, settings) {
    const imageUpload = document.getElementById('imageUpload');
    const video = document.getElementById('video');
    const videoContainer = document.querySelector('.video_container');
    const imageContainer = document.querySelector('.image_container');
    const startVideoButton = document.querySelector('.start_video');
    const header = document.querySelector('.main_header');
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
        if (settings.mode === 'diagnosis' || settings.mode === 'ira') {
            import('./diagnosis.js').then(mode => {
                header.innerText = mode.default.header;
                nameConvertor = mode.default.nameConvertor;
            });
        } else if (settings.mode === 'planeta') {
            import('./planeta.js').then(mode => {
                header.innerText = mode.default.header;
                nameConvertor = mode.default.nameConvertor;
            });
        }
    }

    let modelToLoad = "data";

    if (settings.modes.includes(settings.mode) && settings.mode !== 'default') {
        if (settings.mode === 'planeta') {
            modelToLoad = "planeta";
        } else if (settings.mode === 'ira') {
            modelToLoad = "ira";
        }
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
        imageUpload.addEventListener('change', async () => {
            if (image) {
                image.remove();
            }
            if (canvasImage) {
                canvasImage.remove();
            }
            image = await faceapi.bufferToImage(imageUpload.files[0])
            imageContainer.append(image)
            canvasImage = faceapi.createCanvasFromMedia(image)
            imageContainer.append(canvasImage)
            const displaySize = {width: image.width, height: image.height}
            faceapi.matchDimensions(canvasImage, displaySize);
            const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors().withAgeAndGender();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            drawRecognized(resizedDetections, canvasImage);
        })

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
                const box = found.detection.box
                const drawBox = new faceapi.draw.DrawBox(box, {label: nameConvertor.convert(result.label, found)})
                drawBox.draw(canvas)
            })
        }

        video.addEventListener('playing', () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            videoContainer.append(canvas);
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
        const res = await fetch("/models/" + name + ".json")
        return res.json();
    }

    async function startVideo() {
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
