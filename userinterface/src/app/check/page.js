"use client";

import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";

export default function Check() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                p: 4,
                bgcolor: "#f5f5f5",
                minHeight: "100vh",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: 700,
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Add New Address
                </Typography>

                <Grid container spacing={2}>


                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Address Type</InputLabel>
                            <Select label="Address Type">
                                <MenuItem value="Home">🏠 Home</MenuItem>
                                <MenuItem value="Office">🏢 Office</MenuItem>
                                <MenuItem value="Other">📍 Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="House / Flat No."
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Area / Colony"
                            fullWidth
                        />
                    </Grid>



                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="City"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="State"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Pincode"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Latitude"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Longitude"
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, }}>
                        <TextField
                            label="Landmark"
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Full Address"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: "none",
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            Save Address
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}