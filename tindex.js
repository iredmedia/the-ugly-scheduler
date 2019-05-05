'use strict';

/* This algo needs improvement because:
 * 1. New users being added will throw everything out of wack.
 * 2. It should keep a stack of the users last time they did a task, thus making the oldest users (or not yet started) the first to go
 *
 */

const fs = require('fs');


function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNextThree() {
	// Push the first three to the end of the list, we'll fetch them after!
	f1.push(f1.shift());
	f2.push(f2.shift());
	f3.push(f3.shift());

	// Get the last three elements in the user list.
	return [
		f1.slice(f1.length - 3, f1.length)[0],
		f2.slice(f2.length - 3, f2.length)[0],
		f3.slice(f3.length - 3, f3.length)[0],
	]
}

function getTakerOuter() {
	return index % 3 + 1;
}

function getUserData() {
	var data = fs.readFileSync('data.json');  
	return JSON.parse(data);
}


function writeUserData(data) {
	fs.writeFileSync('output.json', JSON.stringify(data, null, 2));  
}

function getNextCandidates(untilDate) {
	var results = [];

	while(startDate < untilDate) {
		// get the next dataset and week
		var nextUsers = getNextThree();
		var takerOuterIndex = Math.floor(Math.random() * 3);

		var next3events = nextUsers.map(function(user, i) {
			return {
				'start': startDate.toISOString(), 
				'title': jsUcfirst(user.name) + ' (Floor: ' + user.floor + ')', 
				'user': user,
				'isTakerOuter': takerOuterIndex == i,
			}
		});
		
		results.push(...next3events);

		// Get the next indexes/dates
		startDate.setDate(startDate.getDate() + 7)	
		index++;
	}

	return results;
}

// Initial data
var startDate = new Date("05/06/2019"); // This is be set once, and never changed.
var endDate = new Date("07/06/2022"); // this value could be changed to show whichever date... could use endDate.setDate(startDate.getDate() + (7 * 7));
var index = 0;

var users = getUserData().users;

var f1 = users.filter(u => u.floor === 1);
var f2 = users.filter(u => u.floor === 2);
var f3 = users.filter(u => u.floor === 3);

writeUserData(getNextCandidates(endDate))
// console.log(getNextCandidates(endDate));