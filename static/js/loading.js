if (typeof (sessionStorage['waitCycle']) == 'undefined') {
    sessionStorage['waitCycle'] = 6;
}
else if (sessionStorage['waitCycle'] <= 0) {
    sessionStorage.removeItem('waitCycle');
    window.location.href = "/error";
}
else {
    sessionStorage['waitCycle'] = sessionStorage['waitCycle'] - 1;
}
