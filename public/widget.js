// public/widget.js
(function() {
  var script = document.createElement('script');
  script.src = 'http://167.71.205.129/widget'; // Updated URL of the widget page
  script.async = true;
  script.onload = function() {
    var iframe = document.createElement('iframe');
    iframe.src = 'http://167.71.205.129/widget'; // Updated URL of the widget page
    iframe.width = '300';
    iframe.height = '400';
    iframe.style.border = 'none';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.zIndex = '9999';
    document.body.appendChild(iframe);
  };
  document.head.appendChild(script);
})();
