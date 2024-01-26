function paginate(perPage = 10, pageNumber = 1) {
    pageNumber = parseInt(pageNumber)
    console.log(pageNumber)
    pageNumber = (Number.isInteger(pageNumber)) ? pageNumber : 1;

    console.log(pageNumber)

    const skipItems = perPage * (pageNumber - 1);

    return { skipItems, perPage }

}

module.exports = { paginate }