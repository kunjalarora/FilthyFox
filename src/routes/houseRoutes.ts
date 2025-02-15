import { Router } from 'express';
import prisma from '../../utils/prisma-client';

const router = Router();

router.get('/houses', async (req, res) => {
    try {
        const houses = await prisma.house.findMany({

        });
        res.json(houses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch house names' });
    }
});

export default router;
