function search() {
	var sortedMass = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13];
	document.getElementById("sortedmass").innerHTML = 'mass: ' + sortedMass.toString();
	var findNum = document.getElementById("findNum").value;
	document.getElementById("findedNum").innerHTML = 'finded element: ' + findNum.toString();
	//var box = document.getElementById("option").value;
	document.getElementById("BarierResult").innerHTML = 'barier search: ' + barier(sortedMass, findNum).toString();
	document.getElementById("BinaryResult").innerHTML = 'binary search: ' + BinarySearch(sortedMass, findNum).toString();
}

function BinarySearch(arr, f) 
{
	console.log('binary');
	var barier1 = 0;
	var barier2 = arr.length;
	console.log(barier1 + ' ' + barier2);
	if (f > barier1 & barier2 > f)
	{
		var currentElem = barier1 + Math.floor((barier2 - barier1) / 2);
		while (barier1 <= barier2)
		{
			currentElem = barier1 + Math.floor((barier2 - barier1) / 2);
			console.log(arr[barier1] + ' ' + arr[currentElem] + ' ' + arr[barier2-1]);
			if (arr[barier1] == f) {
				return barier1;
			}
			if (arr[barier2] == f) {
				return barier2;
			}
			if (arr[currentElem] != f)
			{
				if (arr[currentElem] < f) {
					barier1 = currentElem;
				}
				if (arr[currentElem] > f) {
					barier2 = currentElem;
				}
			} else {
				return currentElem;
			}
		}
		// console.log(currentElem);
	}
	return 'not found';
}

function barier(arr, f)
{
	console.log('barier');
	var position = 0;
	if (arr[arr.length - 1] != f) 
	{
		console.log("in if");
		arr[arr.length - 1] = f;
		for (; arr[position] != f; position++);
	} else {
		console.log("else");
		return arr.length;
	}
	return position < arr.length-1 ? position : 0; 
}