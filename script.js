const btnCamera = document.getElementById("btnCamera");
const img = document.getElementById("photo");

btnCamera.addEventListener("click", () => {
    if (window.NativeApp) {
        window.NativeApp.postMessage(
            JSON.stringify({ action: "OPEN_CAMERA" })
        );
    } else if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
            JSON.stringify({ action: "OPEN_CAMERA" })
        );
    } else {
        openCameraInBrowser();
    }
});

window.onPhotoCaptured = function (base64) {
    img.src = "data:image/jpeg;base64," + base64;
};

function openCameraInBrowser() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";

    input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    input.click();
}
