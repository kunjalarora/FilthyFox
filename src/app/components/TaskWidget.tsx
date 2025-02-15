"use client";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";

const cards = [
  {
    id: 1,
    title: "Plants",
    description: "Plants are essential for all life.",
  },
  {
    id: 2,
    title: "Animals",
    description: "Animals are a part of nature.",
  },
  {
    id: 3,
    title: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
	{
    id: 4,
    title: "Plants",
    description: "Plants are essential for all life.",
  },
  {
    id: 5,
    title: "Animals",
    description: "Animals are a part of nature.",
  },
  {
    id: 6,
    title: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
];

export default function TaskWidget() {
	const [open, setOpen] = useState(false);
	
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
				maxHeight: "95%",
    		overflowY: "auto"
      }}
    >
      {cards.map((card) => (
        <Card key={card.id}>
          <CardActionArea onClick={() => console.log("Boo!")}>
            <CardContent sx={{ height: "100%", textAlign: "left" }}>
              <Typography fontWeight={600}>{card.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
