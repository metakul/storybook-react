import { Box, Paper, Typography } from "@mui/material";

const MemeInfo = () => {

  return (
    <Box sx={{ margin: "auto", paddingTop: "20px" }}>
      <Paper elevation={3} sx={{ overflowY: "auto", padding: "20px", borderRadius: "8px", height: "70vh" }}>
        <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
          Memecoin
        </Typography>
      </Paper>
    </Box>
  );
};

export default MemeInfo;