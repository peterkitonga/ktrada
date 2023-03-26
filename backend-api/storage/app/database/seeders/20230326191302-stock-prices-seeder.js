'use strict';

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const response = await fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols=GOOG,AAPL,AMZN,MSFT');
    const { quoteResponse } = await response.json();
    const stockPricesData = [];

    for (const quote of quoteResponse.result) {
      stockPricesData.push({
        companyName: quote.shortName,
        tickerSymbol: quote.symbol,
        currentPrice: quote.regularMarketPrice,
        changePercent: quote.regularMarketChangePercent,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('stock_prices', stockPricesData);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('stock_prices', null, {});
  },
};
