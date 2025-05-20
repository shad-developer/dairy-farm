const FeedStockModel = require('../models/FeedStockModel');

module.exports.addFeedStock = async (req, res) => {
    try {
        const { feedType, purchaseWeight, purchasePrice, purchaseDate } = req.body;

        if (!feedType || !purchaseWeight || !purchasePrice || !purchaseDate) {
            return res.status(400).json({
                message: 'All Fields are required.',
            });
        }

        // Check if the feed type already exists
        let feedStock = await FeedStockModel.findOne({ feedType });

        if (feedStock) {
            // If feed type exists, update the stock and add to purchase history
            feedStock.currentStock += Number(purchaseWeight);
            feedStock.purchaseHistory.push({
                purchaseWeight,
                pricePerUnit:purchasePrice,
                purchaseDate,
            });
        } else {
            // Create new feed stock if it doesn't exist
            feedStock = new FeedStockModel({
                feedType,
                currentStock: Number(purchaseWeight),
                purchaseHistory: [
                    {
                        purchaseWeight,
                        pricePerUnit:purchasePrice,
                        purchaseDate,
                    },
                ],
            });
        }

        // Save to database
        const savedFeedStock = await feedStock.save();
        res.status(201).json({
            message: 'Feed stock added successfully.',
            feedStock: savedFeedStock,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while adding feed stock.',
            error: error.message,
        });
    }
};


module.exports.getFeedstock = async (req, res) => {
    try {
        const feedstocks = await FeedStockModel.find();
        res.status(200).json(feedstocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching feedstock.' });
    }
};




