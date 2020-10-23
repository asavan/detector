"use strict";
import "./css/style.css";

import * as faceapi from "face-api.js";

const imageUpload = document.getElementById('imageUpload')

const nameConvertor = function() {
    const names = {
        'unknown': "Хер с горы",
        'petr' : "Петруччо",
        'serg' : "Серж",
        'sava' : "Чемонин",
        'lenya' : "Лёня",
        'chern' : "Не лох",
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
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

async function start(arr) {
    const container = document.createElement('div')
    console.log(arr);
    container.classList.add("image_container")
    document.body.append(container)
    // const labeledFaceDescriptors = await loadLabeledImages()
    const labeledFaceDescriptors = await loadLabeledImages2()
    // console.log(JSON.stringify(labeledFaceDescriptors));
    const faceMatcher = faceapi.FaceMatcher.fromJSON(labeledFaceDescriptors);
    // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    // console.log(JSON.stringify(faceMatcher.toJSON()))
    let image = null;
    let canvas = null;
    imageUpload.addEventListener('change', async () => {
        if (image) image.remove()
        if (canvas) canvas.remove()
        image = await faceapi.bufferToImage(imageUpload.files[0])
        container.append(image)
        canvas = faceapi.createCanvasFromMedia(image)
        container.append(canvas)
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
}


async function loadLabeledImages2() {
    const res = await fetch("/models/data.json")
    return res.json();
}

if (__USE_SERVICE_WORKERS__) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
    }
}
