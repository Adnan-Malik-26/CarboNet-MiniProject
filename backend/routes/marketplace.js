const express = require("express");
const router = express.Router();
const marketplace = require("../utils/connect");

// Buy credits endpoint
router.post("/buy", async (req, res) => {
    const { amount } = req.body;
    try {
        const tx = await marketplace.buyCredits({ value: ethers.utils.parseEther(amount) });
        await tx.wait();
        res.json({ success: true, txHash: tx.hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
