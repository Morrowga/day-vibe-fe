import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingOverlay = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                zIndex: 9999,
            }}
        >
            <Box
                component="img"
                src="/images/G.png" 
                alt="Loading..."
                sx={{ width: 200, height: 145}}
            />

            <CircularProgress sx={{ color: "#053020", marginTop: 4 }} />
        </Box>
    );
};

export default LoadingOverlay;
