function create_tree()
// creates an ordered tree from a given number of elements and element size
{
	var tree = []
	var numbers = [];
	//rows_num = prompt('Enter number of rows: ',3);
	//var count_elem = prompt('Enter count of elements: ', 12);
	var count_elem = document.getElementById("count_elem").value;
	var max_num = document.getElementById("max_num").value;
	//number = Math.floor(Math.random()*max_num) + 1;
	//if(numbers.includes(number)){
	//numbers.push(number)
	
	/*
	for (i=0; i<count_elem; i++){
		alert(variants.lenght);
		numbers.push(variants.pop(Math.floor(Math.random()*variants.lenght)+1));
	}*/
	
	numbers = getAllNumbers(max_num);
	//console.log(numbers);
	//numbers = [2,3,5,7,11,13,17,19,23,29,31,37,41];
	//count_elem = numbers.length-1;
	numbers = shuffle(numbers, count_elem);
	//numbers = [6,1,9,2,7,4,8,3,10,11,5,12,0];
	//numbers = [31,3,37,29,19,23,17,5,7,11,13,41,2];
	console.log(numbers);

	//tree = createBinaryTree(tree, numbers);
	//console.log(tree);
	var empty_array1 = [];
	var empty_array2 = [];
	var empty_array3 = [];
	document.getElementById("numbers").innerHTML= 'numbers: '+numbers.toString();
	
	tree = createBinaryTree([], numbers);

	document.getElementById("preorder").innerHTML= 'pre-order: '+preorder(tree,empty_array1).toString();
	document.getElementById("inorder").innerHTML= 'in-order: '+inorder(tree,empty_array2).toString();
	document.getElementById("postorder").innerHTML= 'post-order: '+postorder(tree,empty_array3).toString();

	var empty_array4 = [];
	var deep = 0;
	var weight = 0;
	result = spliceLayers([tree], empty_array4, deep, weight);
	console.log("________________________");
	console.log(result);
	document.getElementById("BFS").innerHTML = 'tree characters deep='+result[1]+' weight='+result[2];
	console.log(result[1], result[2]);

	drawTree(result)
	//document.getElementById("demo").value = forinput.toString();
	//console.log(max_num);

}

function getAllNumbers(max_num)
// create ordered mass from 0 to max_number
{
	var array = []; 
	for (var i=0; i <= max_num; i++){
		array.push(i);
	}
	return array;
}

function shuffle(array, count_elem)
// shuffle part of array
{
	var pool = [];
	for (var i = 0; i<=count_elem; i++){
		var randomNumber = array.splice(Math.floor(Math.random() * ((count_elem-i)-1) +1), 1);
		pool.push(randomNumber.pop());
		//console.log(array)
	}
	return pool;
}

function takeTreeDeep(tree)
{
	pass;
}

function takeTreeWight(tree)
{
	//for (i=0; i <= )
	pass;
}

function createBinaryTree(tree, array)
{
	console.log("\n");
	if (tree.length<1){
		var tree = [array.shift()];
	}
	//var tree = [8];
	var currentNode = tree;
	//array = [ 1, 6, 5, 10, 7, 11, 3, 2, 9]
	// example
	/*
	tree=[10, [8, [7], [6]], [1, [9]]];
	currentNode = tree[1];
	console.log("currentNode: "+ currentNode);
	console.log("Node: "+currentNode[0]);
	console.log("leftChild: "+currentNode[1]);
	*/

	while(array.length>0){
		//console.log("________________________");
		//console.log("THIS: "+tree.toString());
		console.log(currentNode);
		if (currentNode[0]>array[0]){
			// left branch 
			if (currentNode[1]){
			// left branch exists
				console.log(currentNode[0] + ">" + array[0] + "  leftChild exists ");
				console.log(currentNode);
				currentNode = currentNode[1];
				//break;
			}else{
			// left branch doesn't exist
				console.log(currentNode[0] + ">" + array[0] + " leftChild doesn exist ");
				currentNode[1] = [];
				currentNode[1].push(array[0]);
				array.shift();
				currentNode = tree;
			}
		}else{
		// right branch
			if (currentNode[2]){
			// both branches exists
				console.log(currentNode[0] + "<" + array[0] + " rightChild exists ");
				currentNode = currentNode[2]
			} else{
			// right branch doesn't exist
				console.log(currentNode[0] + ">" + array[0] + " rightChild doesn exist");
				currentNode[2] = []
				currentNode[2].push(array[0]);
				array.shift();
				currentNode = tree;
			}
		}
	}
	console.log("\n");
	return tree;
}

function getMinValue(array)
{
	var min = array[0];
	for (var i=1; i<array.length; i++){
		if (min>array[i]){
			min = array[i];
		}
	}
	return min;
}

function createHaffleBinaryTree(tree, dublicate)
{
	if (tree.length==0){
		for (i=0; i<dublicate.length; i++){
			tree.push([dublicate[i]]);
		}
	}
	if(dublicate.length>1){
		//console.log("________________________");
		//console.log(tree);
		//console.log(dublicate+" "+dublicate.length);
		var x1 = getMinValue(dublicate);
		var index = dublicate.indexOf(x1);
		var y1 = tree[index];
		//console.log("x1="+x1+" y1="+y1);
		//console.log("index"+index);
		dublicate.splice(index, 1);
		tree.splice(index, 1);
		//console.log(dublicate+" "+dublicate.length);
		var x2 = getMinValue(dublicate);
		var index = dublicate.indexOf(x2);
		var y2 = tree[index];
		//console.log("x2="+x2+" y2="+y2);
		//console.log("index"+index);
		dublicate.splice(index, 1);
		tree.splice(index, 1);
		//console.log(dublicate+" "+dublicate.length);
		dublicate.push(x1+x2);
		tree.push([x1+x2, y1, y2]);
		//console.log(dublicate+" "+dublicate.length);
		createHaffleBinaryTree(tree, dublicate);
	}else{
		return tree[0];
	}
	return tree[0];
}

function getRoot(tree)
{
	if (tree.length>=1){
		return tree[0];
	}
}

function getLeftChild(tree)
{
	if (tree.length>1){
		return tree[1];
	}
}

function getRightChild(tree)
{
	if (tree.length>2){
		return tree[2];
	}
}

function preorder(tree, mass)
{
	if (tree!=undefined){
		var root = getRoot(tree);
		mass.push(root);
		console.log(root);
		preorder(getLeftChild(tree), mass);
		preorder(getRightChild(tree), mass);
	}
	return mass;
}

function inorder(tree, mass)
{
	if (tree!=undefined){
		inorder(getLeftChild(tree), mass);
		var root = getRoot(tree);
		mass.push(root);
		console.log(root);
		inorder(getRightChild(tree), mass);
	}
	return mass;
}

function postorder(tree, mass)
{
	if (tree!=undefined){
		postorder(getLeftChild(tree), mass);
		postorder(getRightChild(tree), mass);
		var root = getRoot(tree);
		mass.push(root);
		console.log(root);
	}
	return mass;
}

function undefinedTest(array)
{
	var count = 0;
	for (i=0; i<array.length; i++){
		if (array[i]!=undefined){
			count++;
		}
	}
	if (count>0){
		return true;
	}
	return false; 
}

function BFS(queue, tour, level, local_weight)
{
	console.log("--------------------- level= "+level+" weight= "+ local_weight);
	nextLevelQueue = [];
	var max_weight = 0;
	if (tour.length!=level+1){
		tour.push([]);
	}
	console.log(queue.length, queue);
	for (i=0; i<queue.length; i++){
		if (queue[i]!=null){
			branch = queue[i];
			console.log(i, branch[0], branch[1], branch[2])
			if (branch.length>=1){
				tour[level].push(branch[0]);
				max_weight ++;
			} else{
				tour[level].push(null);
				nextLevelQueue.push(null, null);
			}
			nextLevelQueue.push(branch[1], branch[2]);

			//queue.splice(queue.indexOf(branch), 1);
		} else{
			tour[level].push(null);
			if (tour[level+1]){
				tour[level+1].push(null, null);
			} else{
				tour[level+1]=[null, null];
			}
		}
	}
	console.log(tour[level]);
	if (max_weight>local_weight){
		console.log("was changed");
		window.weight = max_weight;
		local_weight = max_weight;
	}
	console.log(nextLevelQueue.length, local_weight, undefinedTest(nextLevelQueue));
	if (undefinedTest(nextLevelQueue)){
		console.log(nextLevelQueue);
		BFS(nextLevelQueue, tour, level+1, local_weight);
	} 
	console.log("here level="+level+" weight="+local_weight);
	return [tour, tour.length-1, window.weight];
}

function spliceLayers(queue, tour, level, local_weight)
{
	console.log("--------------------- level= "+level+" weight= "+ local_weight);
	nextLevelQueue = [];
	var max_weight = 0;
	while (tour.length!=level+2){
		tour.push([]);
	}
	console.log(queue.length, queue);
	for (i=0; i<queue.length; i++){
		if (queue[0]!=undefined){
			var branch = queue[0];
			queue.splice(queue.indexOf(branch), 1);
			if (queue==0 & level==0){
				tour[level][i] = [getRoot(branch)];
			} else{
				tour[level][i] = (getRoot(branch));
			}
			var leftChild = getLeftChild(branch);
			var rightChild = getRightChild(branch);
			nextLevelQueue.push(leftChild, rightChild);
			max_weight++;
		} else{
			tour[level] = (undefined);
			tour[level+1][i*2] = (undefined);
			tour[level+1][i*2+1] = (undefined);
		}

	}
	console.log(tour[level]);
	if (max_weight>local_weight){
		console.log("was changed");
		window.weight = max_weight;
		local_weight = max_weight;
	}
	console.log(nextLevelQueue.length, local_weight, undefinedTest(nextLevelQueue));
	if (undefinedTest(nextLevelQueue)){
		console.log(nextLevelQueue);
		BFS(nextLevelQueue, tour, level+1, local_weight);
	} 
	console.log("here level="+level+" weight="+local_weight);
	return [tour, tour.length, window.weight];
}

function computeValue(level, elem_num, field_x, field_y, radius)
{
	var count_elems = 2**level;
	var place_for_1_on_level = (field_x / count_elems);
	var x = place_for_1_on_level * (elem_num + 1) - place_for_1_on_level / 2;
	var y = level * (2*radius+radius) + radius + 10;
	//console.log("computeValue " + count_elems + " " + place_for_1_on_level + " " + x + y);
	return [x, y];
}

function parentNum(elem_num){
	console.log("parent " + elem_num + " " + elem_num%2);
	switch(elem_num%2){
		case 0: 
			var parent_num = (elem_num/2);
			console.log("parent1 " + elem_num + parent_num);
			break;
		case 1: 
			var parent_num = (elem_num/2 - 0.5);
			console.log("parent1 " + elem_num + parent_num);
			break;
		default: var parent_num = 0;
	}
	return parent_num;
}

function drawTree(result)
{
	console.log("\n"+"\n"+"let's drawing tree")
	var canvas = document.getElementById('c1');
	var ctx = canvas.getContext('2d');

	tour = result[0];
	deep = result[1];
	weight = result[2];
	if (deep>5){
		console.log("less radius");
		var radius = 10;
	} else{
		var radius = 20;
	}
	var field_x = (2**deep) * (radius/2 + 1) + 100;
	document.getElementById("c1").width = field_x;
	var field_y = (2 * radius) * weight + radius * 10;
	document.getElementById("c1").height = field_y;

	//var g = new Graph();
	//g.addNode(root);
	console.log(tour.length, field_x, 2**deep, radius+1);
	for (var level=0; level<deep; level++){
		console.log("------level-"+level+"----");
		if (undefinedTest(tour[level])){
			for (var elem_num=0; elem_num<tour[level].length; elem_num++){
				console.log("level="+level+" elem_num="+elem_num);
				//ctx.fillStyle = 'lightgrey';	
				ctx.beginPath();
				if (tour[level][elem_num]!=undefined || level==0){
					xy = computeValue(level, elem_num, field_x, field_y, radius);
					x = xy[0];
					y = xy[1];
					console.log("level=" + level + " x=" + x + " y="+y)
					ctx.arc(x, y, radius, 0, Math.PI * 2, true);
					ctx.font = '10px serif';
					ctx.fillText(tour[level][elem_num], x-4, y+4);
					if (level>0){
						ctx.moveTo(x, y - radius);
						var xy = computeValue(level - 1, parentNum(elem_num) , field_x, field_y, radius);
						ctx.lineTo(xy[0], xy[1] + radius);
					}
				}
			ctx.stroke();	
			}
		}
	}
}