(function() {
	sigma.utils.pkg('sigma.parsers');

	sigma.parsers.huffman = function(encoder, sigmaInstance) {
		{
			let counter = 0;

			for(let node of encoder.next().value) {
				sigmaInstance.graph.addNode({
					id: node.id + '',
					x: counter * 10,
					y: 0,
					size: 1,
					label: (node.children[0] === ' ' ? 'space' : node.children[0]) + ': ' + node.weight
				});
				counter++;
			}
		}
		sigmaInstance.refresh();
	};

})();

/*var encoder = huff.encode('hallo!');
for(let step of encoder) {
	console.log(step);
}*/

var sig = new sigma();
sig.addRenderer({
	type: 'canvas',
	container: document.getElementById('graph-container')
});
sigma.parsers.huffman(huff.encode('hello'), sig);