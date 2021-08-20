"use strict";function calculateCoordinates(a,e,n,t){var l={},o=function(o){for(var r=a[o],s=r.length,c=new Float32Array(s),u=(e.find(function(a){return a.label===o}),n/65535),f=0;f<s;f++)c[f]=r[f]*u*t;l[o]=c};for(var r in a)o(r);return l}self.onmessage=function(a){a.data.close?close():self.postMessage(calculateCoordinates.apply(null,a.data))};
//# sourceMappingURL=calculateCoordinates.js.map
