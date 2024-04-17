document.addEventListener("DOMContentLoaded", function () {
  const schedules = [
      { route: "Route 1", time: "09:00 AM", fare: "$10.00", availableSeats: 20 },
      { route: "Route 2", time: "10:30 AM", fare: "$12.50", availableSeats: 15 },
      { route: "Route 3", time: "12:00 PM", fare: "$9.75", availableSeats: 10 },
      { route: "Route 4", time: "02:00 PM", fare: "$15.00", availableSeats: 25 }
  ];

  function populateTable() {
      const tableBody = document.getElementById("scheduleTable");
      schedules.forEach((schedule, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${schedule.route}</td>
              <td>${schedule.time}</td>
              <td>${schedule.fare}</td>
              <td><button class="btn btn-primary book-btn" data-index="${index}">Book (${schedule.availableSeats} left)</button></td>
          `;
          tableBody.appendChild(row);
      });
  }

  function bookSeat(index) {
      if (schedules[index].availableSeats > 0) {
          schedules[index].availableSeats--;
          alert("Seat booked successfully!");
          updateAvailableSeats();
          generateTicket(index);
      } else {
          alert("Sorry, all seats on this bus are booked.");
      }
  }

  function updateAvailableSeats() {
      const buttons = document.querySelectorAll(".book-btn");
      buttons.forEach((button, index) => {
          button.textContent = `Book (${schedules[index].availableSeats} left)`;
      });
  }

  function generateTicket(index) {
      const ticket = `
          <div class="ticket">
              <h2>Ticket Information</h2>
              <p>Route: ${schedules[index].route}</p>
              <p>Departure Time: ${schedules[index].time}</p>
              <p>Fare Price: ${schedules[index].fare}</p>
          </div>
      `;
      document.body.insertAdjacentHTML("beforeend", ticket);
  }

  populateTable();

  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("book-btn")) {
          const index = event.target.getAttribute("data-index");
          bookSeat(index);
          return "booked";
      }
  });
});
