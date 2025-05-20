const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    feedStock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedStock',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inventory', InventorySchema);
