var huff = { };

(function(){
	'use strict';

	huff.encode = function*(data) {

		function getSmallestPairIndices(nodes) {
			var pair = [
				{ weight: Number.MAX_VALUE, index: 0 },
				{ weight: Number.MAX_VALUE, index: 0 }
			];

			for(let nodeIndex in nodes) {
				if(nodes.hasOwnProperty(nodeIndex)) {
					if(nodes[nodeIndex].weight <= pair[0].weight) {
						pair[1] = pair[0];
						pair[0] = {
							weight: nodes[nodeIndex].weight,
							index: nodeIndex
						};
					} else if(nodes[nodeIndex].weight <= pair[1].weight) {
						pair[1] = {
							weight: nodes[nodeIndex].weight,
							index: nodeIndex
						};
					}
				}
			}

			return [
				pair[0].index,
				pair[1].index
			];
		}

		// gets a list of all characters and their weight
		var symbols = { };
		for(let symbol of data) {
			if(symbols[symbol] === undefined)
				symbols[symbol] = 1;
			else
				symbols[symbol]++;
		}

		// reverse symbol table
		var tree = [ ];
		for(let symbol of Object.keys(symbols)) {
			if(symbols.hasOwnProperty(symbol)){
				tree.push({
					weight: symbols[symbol],
					children: symbol
				});
			}
		}

		// combine two nodes at a time to one until there is only one node left
		while(tree.length > 1) {
			let smallestPairIndices = getSmallestPairIndices(tree);
			let nodePair = [tree[smallestPairIndices[0]], tree[smallestPairIndices[1]]];
			tree.splice(smallestPairIndices[1], 1);
			tree.splice(smallestPairIndices[0], 1, {
				weight: nodePair[0].weight + nodePair[1].weight,
				children: nodePair
			});

			// yield after each node merge
			yield tree;
		}

		return tree;
	}

})(huff);