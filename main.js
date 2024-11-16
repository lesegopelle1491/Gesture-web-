async function loadGestureRecognizer() {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest'
  );
  const recognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: './gesture_recognizer.task',
    },
    numHands: 1,
  });

  const video = document.getElementById('camera');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  video.onloadeddata = async () => {
    while (true) {
      const results = recognizer.recognizeForVideo(video, Date.now());
      if (results.gestures.length > 0) {
        console.log('Detected gesture:', results.gestures[0].categories[0].categoryName);
      }
      await new Promise(requestAnimationFrame);
    }
  };
}

loadGestureRecognizer();
