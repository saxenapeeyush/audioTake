window.addEventListener('load',bindEvents);
function bindEvents() {
    recordingSetup();
    document.querySelector('#reset').disabled=true;
    document.querySelector('#recorder').addEventListener('click',recordAudio);
    document.querySelector('#stopRecording').addEventListener('click',stopRecording);
    document.querySelector('#reset').addEventListener('click',resetAll);
    // document.querySelector('#playAll').addEventListener('click',playAll);
}
let mic,recorder,soundFile,convertToBlob,SaveSound;
let status =0;
var formdata=new FormData();
function recordingSetup() {
    mic=new p5.AudioIn();
    recorder=new p5.SoundRecorder();
    soundFile=new p5.SoundFile();
    recorder.setInput(mic);
}
let countDown=(config.timeDelay)/1000;
function decrementCounter() {
    --countDown;
    if(countDown!=0){
    document.querySelector('#showCountDown').innerText=countDown;
    }
    }
function recordAudio() {
    document.querySelector('#reset').disabled=false;
    this.disabled=true;
    document.querySelector('#showCountDown').innerText=countDown;
    let newInterval=setInterval(()=> {
        decrementCounter();
    },1000);
    setTimeout(()=> {
        document.querySelector("#showCountDown").classList.add('d-none');
        clearInterval(newInterval);
        mic.start();
    recorder.record(soundFile);
    document.querySelector('#stopRecording').classList.remove('d-none');
    document.querySelector('#recorder').classList.add('d-none');
    },config.timeDelay);
}
function stopRecording() {
    mic.stop();
    recorder.stop();
    soundFile.play(); 
    document.querySelector('#stopRecording').classList.add('d-none');
    document.querySelector('#recorder').disabled=false;
    document.querySelector('#recorder').classList.remove('d-none');
}
// function playAll() {
//     var promise=firebase.database().ref('/sounds').set(soundFile.buffer);
//     promise.then((response)=> {
//         console.log(response);
//     }).catch(err=> {
//         console.log(err);
//     })
// }
function resetAll() {
    // recordingSetup();
    // mic.stop();
    // recorder.stop();
    // soundFile.play(); 
    window.location.reload();
    document.querySelector('#stopRecording').classList.add('d-none');
    document.querySelector('#recorder').classList.remove('d-none');
}