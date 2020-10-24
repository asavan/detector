"use strict";
import "./css/style.css";

import * as faceapi from "face-api.js";

const imageUpload = document.getElementById('imageUpload');
const video = document.getElementById('video');
const videoContainer = document.querySelector('.video_container');
const imageContainer = document.querySelector('.image_container');
const startVideoButton = document.querySelector('.start_video');

const nameConvertor = function() {
    const names = {
        'unknown': "Хер с горы",
        'petr' : "Петруччо",
        'serg' : "Серж",
        'sava' : "Чемонин",
        'lenya' : "Лёня",
        'chern' : "Не лох",
        'boys' : "ЧернRк",
        'glider' : "Шурик"
    };
    function convert(label) {
        const def = names[label];
        if (def) {
            return def;
        }
        return label;
    }
    return { convert: convert}
}();


Promise.all([
    loadLabeledImages2(),
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(start)

async function start(arr) {
    console.log(arr);
    // startVideo();
    // const labeledFaceDescriptors = await loadLabeledImages()
    const labeledFaceDescriptors = arr[0];
    const faceMatcher = faceapi.FaceMatcher.fromJSON(labeledFaceDescriptors);
    // console.log(JSON.stringify(labeledFaceDescriptors));
    // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    // console.log(JSON.stringify(faceMatcher.toJSON()))
    let image = null;
    let canvas = null;
    imageUpload.addEventListener('change', async () => {
        if (image) image.remove()
        if (canvas) canvas.remove()
        image = await faceapi.bufferToImage(imageUpload.files[0])
        imageContainer.append(image)
        canvas = faceapi.createCanvasFromMedia(image)
        imageContainer.append(canvas)
        const displaySize = { width: image.width, height: image.height }
        faceapi.matchDimensions(canvas, displaySize)
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box
            console.log(result.label);
            const drawBox = new faceapi.draw.DrawBox(box, { label: nameConvertor.convert(result.label) })
            drawBox.draw(canvas)
        })
    })

    startVideoButton.addEventListener('click', startVideo);

    video.addEventListener('playing', () => {
        const canvas = faceapi.createCanvasFromMedia(video)
        videoContainer.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            faceapi.draw.drawDetections(canvas, resizedDetections)
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

            const results = resizedDetections.map(d => {
                console.log(d);
                if(d) {
                    return faceMatcher.findBestMatch(d.descriptor);
                }


            });
            const filtered =  results.filter(x => x).reduce((all, folderContents) => all.concat(folderContents), []);
            if (!filtered) {
                return;
            }
            console.log(filtered);
            filtered.forEach((result, i) => {
                const box = resizedDetections[i].detection.box
                console.log(result.label);
                const drawBox = new faceapi.draw.DrawBox(box, { label: nameConvertor.convert(result.label) })
                drawBox.draw(canvas)
            })

        }, 500)
    })
}


async function loadLabeledImages2() {
    const res = await fetch("/models/data.json")
    return res.json();
}

async function startVideo() {
    console.log("Video start");
    const constraints = { audio: true, video: { width: 720, height: 560 } };

    try {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    } catch (e) {
        console.log(e);
    }
}


if (__USE_SERVICE_WORKERS__) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
    }
}
