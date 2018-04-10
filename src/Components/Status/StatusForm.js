import React from "react";

export default ({ addStatus, statusChanged }) => (
  <form onSubmit={addStatus} className="form-inline">
    <div className="form-group">
      <label htmlFor="status">Post message </label>
      <input id="status" className="form-control" onChange={statusChanged} />
    </div>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
);
