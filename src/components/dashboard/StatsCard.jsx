import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme, color }) => ({
  borderLeft: `4px solid ${theme.palette[color].main}`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatsCard = ({ icon, title, value, color = "primary", unit }) => {
  return (
    <StyledCard color={color}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: `${color}.light`,
              color: `${color}.contrastText`,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              <Typography variant="h4" component="div">
                {value}
              </Typography>
              {unit && (
                <Typography variant="body2" color="text.secondary">
                  {unit}
                </Typography>
              )}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default StatsCard;
