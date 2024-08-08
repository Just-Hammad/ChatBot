// public/widget.js
(function() {
    var script = document.createElement('script');
    script.src = 'https://your-domain.com/widget'; // URL of the widget page
    script.async = true;
    script.onload = function() {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://your-domain.com/widget';
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
  