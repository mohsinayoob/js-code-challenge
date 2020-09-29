// Problem 2
// Task: Implement a datasource connector to abstract away data retrieval and manipulation from the `ViewControllers`.  
// Your solution shall use only [Vanilla JavaScript](http://vanilla-js.com).  

class Datasource {
  async getPrices() {
    return fetch('https://static.ngnrs.io/test/prices').then(async response => {
      const json = await response.json();
      const prices = json.data ? json.data.prices : []
      return prices
    }).then(prices => {
      return Promise.all(prices.map((price) => this.castToPrice(price)));
    }).catch(error => {
      throw error
    })
  }

  castToPrice(price) {
    return {
      ...price,
      quote: () => this.quote(price.pair),
      mid: () => this.mid(price.sell, price.buy)
    }
  }

  mid(sell, buy) {
    // to calculate mid point/average of both the numbers
    return (sell + buy) / 2
  }

  quote(pair) {
    return pair.slice(-3)
  }
}

// for testing of the above Data source controller
let ds = new Datasource();
ds.getPrices()
  .then(prices => {
    prices.forEach(price => {
      console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
    });
  }).catch(error => {
    console.log(error);
  });