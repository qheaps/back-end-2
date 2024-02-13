const houses = require(`./db.json`)
let globalID = 4

module.exports = {
    getHouses: (req, res) => res.status(200).send(houses),
    createHouses: (req, res) => {
        let {address, price, imageURL} = req.body
        let newHome = {
            id: globalID,
            address,
            price,
            imageURL
        }

        if (isNaN(price)) {
            res.status(400).send(`Input is not a number!`)
        } else {
            houses.push(newHome)
            res.status(200).send(houses)
            globalID++
        }

    },
    deleteHouse: (req, res) => {
        const {id} = req.params

        houses.splice(houses.findIndex(house => house.id === +id), 1)

        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const {type} = req.body
        const {id} = req.params

       let index = houses.findIndex(house => house.id === +id)

        if(houses[index].price - 10000 < 0 && type === `minus`){
            houses[index].price = 0
            res.status(200).send(houses)

         } else if(type === `plus`) {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if(type === `minus`) {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.status(400)
        }


    }

        
}