function paginate(totalItem, perPage = 10, pageNumber = 1) {
    pageNumber = parseInt(pageNumber)

    pageNumber = (Number.isInteger(pageNumber)) ? pageNumber : 1;

    const skipItems = perPage * (pageNumber - 1);


    let maxPage = 1
    if (totalItem > 0) {
        maxPage = Math.ceil((totalItem / perPage))
    }
    let nextPage = (pageNumber + 1 <= maxPage) ? pageNumber + 1 : null;
    let prePage = (pageNumber - 1 >= 1) ? pageNumber - 1 : null;

    return {
        pageDetails: {
            total: totalItem,
            perPage: perPage,
            currentPage: pageNumber,
            nextPage: nextPage,
            prePage: prePage
        },
        skipItems: skipItems,
        perPage: perPage
    }
}

module.exports = { paginate }