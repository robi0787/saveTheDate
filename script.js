const $form = document.getElementById('container')
const $year = document.getElementById('years')
const $month = document.getElementById('months')
const $day = document.getElementById('days')

const $button = document.querySelector('.generate-timer-btn')
const $resetButton = document.querySelector('.reset-timer-btn')
const $titleField = document.querySelector('.title-input')

let newDate = new Date()

// Create Month Data
const months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `Decemeber`
]

//Add Function for years in the form

function yearSelection(firstYear){
    let yearsArray = []

    firstYear = newDate.getFullYear()

    for (let i = firstYear; i <= firstYear + 100; i++) {
       yearsArray.push(`<option value="${i}">${i}</option>`)     
    }
    $year.innerHTML = yearsArray.join('')
}
yearSelection()

// Display Month data
function monthSelection(){
    let monthsArray = []

    for (let i = 0; i < months.length; i++) {
        monthsArray.push(`<option value="${months[i]}">${months[i]}</option>`)    
    }
    $month.innerHTML = monthsArray.join('')
}
monthSelection()

// Display Day data 
// Ensure days correct to the month with if statement
$month.addEventListener('change', daySelection)
daySelection()

function daySelection() {
    let dayMonth = $month.options[$month.selectedIndex].text
    let daysArray = []
    
        if (dayMonth === 'April' || dayMonth === 'June' || dayMonth === 'September' || dayMonth === 'November') {
            amountOfDays = 30
        }
        else if (dayMonth === 'February') {
            amountOfDays = 28
        }
        else {
            amountOfDays = 31
        }
        for (let i = 1; i <= amountOfDays; i++){
            daysArray.push(`<option value="${i}">${i}</option>`)
         }
         $day.innerHTML = daysArray.join('')
     }


let currentMonth, currentDay, currentYear, timer
let timerActive = false
const $timeReturn = document.querySelector('.time-return')

const $days = document.querySelector('.days')
const $hours = document.querySelector('.hours')
const $minutes = document.querySelector('.minutes')
const $seconds = document.querySelector('.seconds')


// Store in local storage
$button.onclick = function(){createTimer()}
function createTimer() {
		currentMonth = $month.value 
		currentDay = $day.value
		currentYear = $year.value 

		window.localStorage.setItem('currentMonth', currentMonth)
		window.localStorage.setItem('currentDay', currentDay)
		window.localStorage.setItem('currentYear', currentYear)

		clearInterval(timer)
		displayTimer()
	
		displayTitle()
		hideForm()
}

$resetButton.onclick = function() {resetTimer()}
function resetTimer() {
	timerActive = false
	// clear local storage
	window.localStorage.clear()
	// clear out fields in form
	$day.value = null
	$month.value = null
	$year.value = null
	$titleField.value = null
	
	// reset timer values to 0
	$days.innerHTML = `0`
	$hours.innerHTML = `0`
	$minutes.innerHTML = `0`
	$seconds.innerHTML = `0`
	document.querySelector('.title').innerHTML = null
	
	// display timer form
	document.querySelector('#form').classList.remove('d-none')
	// hide reset button
	document.querySelector('.reset-timer-btn').classList.add("d-none")
}

// Add the title in local storage
function displayTitle() {
	let title = $titleField.value
	window.localStorage.setItem('title', title)
	document.querySelector('.title').innerHTML = title	
}

 
function hideForm() {
    // Hide form
	document.querySelector('#form').classList.add('d-none')
    // display reset button
	document.querySelector('.reset-timer-btn').classList.remove("d-none")
}


function displayTimer() {
	if (timerActive) {
    clearInterval(timer) 
    date = new Date()
    const countDownDate = new Date(`${currentMonth}/${currentDay}/${currentYear}`).getTime()

    let timeLeft = countDownDate - date.getTime()

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
    
	$days.innerHTML = `${days}`
	$hours.innerHTML = `${hours}`
	$minutes.innerHTML = `${minutes}`
	$seconds.innerHTML = `${seconds}`
    timer = setInterval(displayTimer, 1000)
	}
}

function startTimer() {
    let savedMonth = window.localStorage.getItem('currentMonth')
    let savedDay = window.localStorage.getItem('currentDay')
    let savedYear = window.localStorage.getItem('currentYear')
	let title = window.localStorage.getItem('title')

    if (savedMonth && savedDay && savedYear && title) {
        $month.value = savedMonth
        $day.value = savedDay
        $year.value = savedYear
		document.querySelector('.title-input').value = title
		document.querySelector('.title').innerHTML = title
		timerActive = true
        createTimer()
    }
    return
}
startTimer()

