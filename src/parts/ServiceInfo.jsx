import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ServiceInfo() {
    const navigate = useNavigate();
    const {serviceId} = useParams();
    useEffect(() => {
        document.title = 'Service ' + serviceId;
    });

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="error"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
            <Typography>Service ID: {serviceId}</Typography>
        </React.Fragment>
    );
}