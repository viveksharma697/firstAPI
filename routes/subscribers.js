const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber.name)
})
// creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        // 201 for determining the server is running properly
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        // error 400 for the bad data entered by the user
        res.status(400).json({ message: err.message })
    }
})
// updating one
router.patch('/', (req, res) => {

})
// deleting one
router.delete('/:id', (req, res) => {

})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            // error 404 for the data not found
            return res.status(404).json({ message: 'cannot find the subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}


module.exports = router