import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ActionButtonCellRenderer = ({ data, handleDelete }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to={`/editenrollment/${data.enrollmentId}`}>
                <Button color="info" style={{ margin: "2px" }}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
            </Link>
            <Button color="danger" style={{ margin: "2px" }} onClick={() => handleDelete(data.enrollmentId)}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
            </Button>
        </div>
    );
};

export default ActionButtonCellRenderer;
