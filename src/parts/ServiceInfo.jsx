import React from 'react';
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function ServiceInfo() {
    const {serviceId} = useParams();

    return (
        <React.Fragment>
            <Typography>Service ID: {serviceId}</Typography>
        </React.Fragment>
    );
}