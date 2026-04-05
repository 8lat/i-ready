// Redirect everything to the maintenance page
if (window.location.pathname !== "/maintenance/" && window.location.pathname !== "/maintenance/index.html") {
    window.location.replace("/maintenance/"); 
}