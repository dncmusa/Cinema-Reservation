// GLOBAL DEĞİŞKENLER
const container = document.querySelector('.container')
const amount = document.querySelector('.amount')
const count = document.querySelector('.count')
const select = document.getElementById('movie')
const seats = document.querySelectorAll('.seat:not(.reserved)')

// GENEL FONKSİYONLAR
container.addEventListener('click', selectFunction)
getFromStorage()
calculate()

// KOLTUKLARI SEÇME FONKSİYONU
function selectFunction(event) {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('reserved')) {

        event.target.classList.toggle("selected")
        calculate()
    }
}

// FİLMLERİ DEĞİŞTİRME
select.addEventListener('change', function (e) {
    calculate()
})

// SEÇİLEN KOLTUKLARIN FİYAT HESAPLAMASI VE LOCAL STORAGE
function calculate() {
    const selectedSeats = container.querySelectorAll('.seat.selected')
    let selectedSeatCount = selectedSeats.length

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat)
    })

    seats.forEach(function (seat) {
        seatsArr.push(seat)
    })

    let selectedSeatsIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat)
    })

    console.log(selectedSeatsIndexs)

    amount.innerHTML = select.value * selectedSeatCount
    count.innerHTML = selectedSeatCount

    addStorage(selectedSeatsIndexs)
}

// LOCAL STORAGEDEN BİLGİLERİN ALINMASI VE ARAYÜZE YAZDIRILMASI
function getFromStorage() {
    const selectedSeatStorage = JSON.parse(localStorage.getItem('seats'))

    if (selectedSeatStorage != null && selectedSeatStorage.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeatStorage.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovie')

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

// BİLGİLERİ LOCAL STORAGE İÇERİSİNE EKLEME
function addStorage(add) {
    localStorage.setItem("seats", JSON.stringify(add))
    localStorage.setItem("selectedMovie", select.selectedIndex);
}