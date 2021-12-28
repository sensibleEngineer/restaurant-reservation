import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function TableForm() {
  const history = useHistory();
  const initialForm = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState(null);

  const changeHandler = ({ target }) => {
    // Checks whether the 'table_name' property contains at least two characters.
    if (target.name === "table_name") {
      if (target.value.length < 2) {
        setError({ message: `Table name must be at least two characters.` });
      } else {
        setError(null);
      }
    }
    
    // Checks whether the 'capacity' property is at least one.
    if (target.name === "capacity") {
      if (target.value < 1) {
        setError({ message: `Capacity of the table must be at least one.` });
      } else {
        setError(null);
      }
    }
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // If there are no errors, saves the table and sends the user to dashboard
  const submitHandler = (event) => {
    event.preventDefault();
    if (formData.table_name.length > 1 && formData.capacity > 0) {
      createTable({
        ...formData,
        capacity: Number(formData.capacity),
      });
      history.push(`/dashboard`);
    }
  };

  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <label htmlFor="table_name">Table Name</label>
        <input
          required
          id="table_name"
          name="table_name"
          type="text"
          min="2"
          onChange={changeHandler}
          value={formData.table_name}
        />

        <label htmlFor="capacity">Table Capacity</label>
        <input
          required
          id="capacity"
          name="capacity"
          min="1"
          type="number"
          onChange={changeHandler}
          value={formData.capacity}
        />
        <button type="submit" className="btn btn-primary btn">
          Submit
        </button>
        <button
          className="btn btn-secondary btn ml-5"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TableForm;
