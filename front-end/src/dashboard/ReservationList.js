import React from "react";

function ReservationList({ reservations }) {
  // Maps reservations array to show each reservation's properties
  // Do not show reservations with a "finished" status
  const reservation = reservations.map((reservation, key) => {
    const showSeat =
      reservation.status === "booked" ? (
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
          <button className="btn btn-success">Seat</button>
        </a>
      ) : (
        "-"
      );
    if (reservation.status !== "finished") {
    return (
      <tbody key={key}>
        <tr>
          <th>{reservation.reservation_id}</th>
          <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td className="mr-0 pr-0">{reservation.mobile_number}</td>
          <td data-reservation-id-status={reservation.reservation_id}>
            {reservation.status}
          </td>
          <td>{showSeat}</td>
        </tr>
      </tbody>
    ) } else return null;
  })

  // Shows "No reservations found" if there is no reseravtion; otherwise, map reservations
  const list = reservation.length === 0 ? <h4>No reservations found</h4> : reservation

  return (
    <div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <td>Name</td>
            <td>Time</td>
            <td>People</td>
            <td>Phone</td>
            <td>Status</td>
            <td>Seating</td>
          </tr>
        </thead>
        {list}
      </table>
    </div>
  );
}

export default ReservationList;
