setTimeout(function () {
    const expired_tip_a = document.getElementById("expired_tip_a");
    expired_tip_a.style.display = "block";
}, 60 * 1000);

document.getElementById("expired_tip_a").addEventListener("click", function () {
    const expired_tip_div = document.getElementById("expired_tip_d");
    expired_tip_div.classList.remove("status-major");
    expired_tip_div.classList.add("status-minor");
    const expired_tip_span = document.getElementById("expired_tip_s");
    expired_tip_span.innerHTML = "努力刷新中，请坐和放宽";
});
