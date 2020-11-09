function putOnPage()
{
	var numbers = [];
	var count_elem = document.getElementById("count_elem").value;
	var max_num = document.getElementById("max_num").value;
	var box = document.getElementById("chose");
	numbers = getAllNumbers(max_num);
	numbers = shuffle(numbers, count_elem);
	document.getElementById("num").innerHTML = 'original mass ' + numbers.toString();
	if (box.checked) {
		document.getElementById("sort").innerHTML = 'heap sorted mass: ' + HeapSort(numbers).toString();	
	} else  {
		document.getElementById("sort").innerHTML = 'merge sorted mass: ' + MergeSort(numbers).toString();
	}
}

function getAllNumbers(max_num)
// create ordered mass from 0 to max_number
{
	var array = [];
	for (var i = 0; i <= max_num; i++) {
		array.push(i);
	}
	return array;	
}

function shuffle(array, count_elem)
// shuffle part of array
{
	var pool = [];
	for (var i = 0; i <= count_elem; i++){
		var randomNumber = array.splice(Math.floor(Math.random() * ((count_elem - i) - 1) + 1), 1);
		pool.push(randomNumber.pop());
	} 
	return pool;
}

function MergeSort(main_array)
{
	if (main_array.length > 1){
		var mlength = main_array.length;
		var part1 = main_array.splice(0, mlength/2);
		var part2 = main_array;
		console.log('part1 ' + part1);
		console.log('part2 ' + part2);
		part1 = MergeSort(part1);
		part2 = MergeSort(part2);
		var res = merge(part1, part1.length, part2, part2.length);
	} else {
		return main_array;
	}
	return res;
}

function merge(array1, size1, array2, size2)
{
	var res = [];
	var i = 0;
	var j = 0;
	while (true){
		console.log(i + ' ' + j);
		if ( i >= size1) {
			console.log('i >= size1');
			for (var j0 = j; j0 < size2; j0++) {
				res.push(array2[j0]);
			}
			break;
		}
		if ( j >= size2) {
			console.log('j >= size2');
			for (var i0 = i; i0 < size1; i0++){
				res.push(array1[i0]);
			}
			break;
		}
		//console.log('if ' + array[i] + ' < ' + array2[j]);
		if (array1[i] < array2[j]) {
			res.push(array1[i]);
			i++;
		} else {
			res.push(array2[j]);
			j++
		}
		console.log(res);
	}
	//console.log(res);
	return res;
}

var array1 = [1, 3, 4, 9, 12, 15];
var array2 = [2, 5, 7, 8, 11, 28];
//merge(one1, 1, one2, 1);
//document.getElementById("post").innerHTML = 'post ' + MergeSort(numbers).toString();
//merge(array1, array2);

function HeapSort(array)
{
	console.log('HeapSort');
	console.log(array);
	var result = [];
	var parent, left_child, right_child;
	var len = array.length;
	while (result.length < len) {
		for (i=array.length-1; i>0; i=i-2){
			if (i%2 == 0) {
				parent = (i - 2) / 2;
				left_child = i - 1;
				right_child = i;
			}
			if (i%2 ==1) {
				parent = (i - 1) / 2;
				left_child = i;
				right_child = parent * 2 + 2;
			}
			console.log(left_child, parent, right_child);
			console.log(array[left_child], array[parent], array[right_child]);

			if (array[parent] < array[right_child]) {
				console.log('switch parent and right child');
				[array[parent], array[right_child]] = [array[right_child], array[parent]];
			}
			if (array[parent] < array[left_child]) {
				console.log('switch parent and left child');
				[array[parent], array[left_child]] = [array[left_child], array[parent]];
			}
			if (array[0] < array[left_child]) {
				console.log('switch root and parent');
				[array[0], array[parent]] = [array[parent], array[0]];
			}
			console.log('i=' + i + ' /' + array);
		}
		result.push(array.shift());
	}
	return result;
}