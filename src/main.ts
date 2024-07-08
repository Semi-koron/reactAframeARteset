import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

const source = document.getElementById("source") as HTMLVideoElement;

console.log("test1");
let time = -1;
let camera: boolean = false;

const cameraSetting = () => {
  if (!camera) {
    camera = true;
    console.log("camera");
  }
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      source.srcObject = stream;
      source.addEventListener("loadeddata", createHandLandmarker);
      source.play();
    })
    .catch((error) => {
      console.log("Failed to access camera:", error);
    });
};

cameraSetting();

const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "CPU",
    },
    numHands: 2,
  });
  const videoChange = async () => {
    handLandmarker.setOptions({ runningMode: "VIDEO" }).then(() => {
      if (source.currentTime !== time) {
        const detections = handLandmarker.detectForVideo(source, time);
        time = source.currentTime;
        if (detections.landmarks.length > 0) {
          console.log(detections.landmarks[0]);
          for (let i = 0; i < 21; i++) {
            if (document.getElementById("point" + i) != null) {
              var changePoint: HTMLElement = document.getElementById(
                "point" + i
              )!;
              changePoint.setAttribute(
                "position",
                `${detections.landmarks[0][i].x * 4} ${
                  detections.landmarks[0][i].z * -4
                } ${detections.landmarks[0][i].y * 4}`
              );
            }
          }
        }
      }
    });
    requestAnimationFrame(() => {
      videoChange();
    });
  };
  videoChange();
};
