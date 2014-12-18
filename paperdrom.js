(function (glob) {
	'use strict';
	var paperdrom;

	paperdrom = {
		version: 'v0.0.3',
		geo: {
			dim: 3,
			xStep: (5 * 3.779527559 * 0.9345794392523364), // * 1.3 * 0.917596),
			yStep: (5 * 3.779527559 * 0.9345794392523364), // * 1.3 * 0.917596),
			xCount: 60,
			yCount: 70
		}
	};

	paperdrom.viewsvg = function (label) {
		var f, ser, str;

		f = document.getElementById(label);
		ser = new XMLSerializer();
		str = '<?xml version="1.0" standalone="no"?>\n' +
		'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
		'<!-- Created with paperdrom -->\n' +
		ser.serializeToString(f);
		window.open('data:image/svg+xml;base64,' + window.btoa(str), '_blank');
	};

	paperdrom.renderLines = function (root) {
		var i, e, label, h, w, svgns;

		h = this.geo.yStep * this.geo.yCount;
		w = this.geo.xStep * this.geo.xCount;
		svgns = 'http://www.w3.org/2000/svg';
		// xmlns = 'http://www.w3.org/XML/1998/namespace';
		for (i = 0; i <= this.geo.yCount; i += 1) {
			e = document.createElementNS(svgns, 'path');
			e.id = ('hline_' + i);
			e.setAttribute('d', 'm 0,' + (i * this.geo.xStep) + ', ' + w + ',0');
			e.setAttribute('style', 'stroke:#ddffee;stroke-width:0.3');
			root.insertBefore(e, root.firstChild);
		}
		if (this.dim === 2) {
			for (i = 0; i <= this.geo.xCount; i += 1) {
				e = document.createElementNS(svgns, 'path');
				e.id = ('vline_' + i);
				e.setAttribute('d', 'm ' + (i * this.geo.xStep) + ',0 0,' + h);
				e.setAttribute('style', 'stroke:#cceeff;stroke-width:0.3');
				root.insertBefore(e, root.firstChild);
			}
		} else {
			for (i = (-2 * this.geo.yCount); i < this.geo.yCount; i += 2) {
				e = document.createElementNS(svgns, 'path');
				e.id = ('lline_' + i);
				e.setAttribute('d', 'm 0,' + (i * this.geo.xStep) + ', ' + w + ',' + (2 * w));
				e.setAttribute('style', 'stroke:#cceeff;stroke-width:0.3');
				root.insertBefore(e, root.firstChild);
			}
			for (i = 0; i < (3 * this.geo.yCount); i += 2) {
				e = document.createElementNS(svgns, 'path');
				e.id = ('rline_' + i);
				e.setAttribute('d', 'm 0,' + (i * this.geo.xStep) + ', ' + w + ',' + (-2 * w));
				e.setAttribute('style', 'stroke:#cceeff;stroke-width:0.3');
				root.insertBefore(e, root.firstChild);
			}
			label = document.createTextNode('MineCraftPaper');
			e = document.createElementNS(svgns, 'text');
			e.setAttribute('x', 736);
			e.setAttribute('y', 68);
			e.setAttribute('fill', '#cceeff');
//			e.setAttribute("text-anchor", "end");
//			e.setAttributeNS(xmlns, "xml:space","preserve");
			e.setAttribute('text-anchor', 'middle');
			e.setAttribute('transform', 'rotate(270,736,68)');
			e.appendChild(label);
			root.insertBefore(e, root.firstChild);
		}
	};

	paperdrom.genAll = function () {
		var root;
		root = document.getElementById('lines');
		this.renderLines(root);
	};

	paperdrom.init = function () {
		this.genAll();
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = paperdrom;
	} else {
		glob.paperdrom = paperdrom;
	}
})(this);
