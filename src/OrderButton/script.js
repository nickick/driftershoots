export default function () {
  var scriptURL =
    'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]
    ).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'qz04df-yv.myshopify.com',
      storefrontAccessToken: '8bc37fa2c3ad70d0be61a6ee84e874a9',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      ui.createComponent('product', {
        id: '9012413333762',
        node: document.getElementById('product-component-1746888498629'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          product: {
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': 'calc(25% - 20px)',
                  'margin-left': '20px',
                  'margin-bottom': '50px',
                },
              },
            },
            buttonDestination: 'checkout',
            text: {
              button: 'Buy now',
            },
          },
          productSet: {
            styles: {
              products: {
                '@media (min-width: 601px)': {
                  'margin-left': '-20px',
                },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0px',
                  'margin-bottom': '0px',
                },
              },
            },
            text: {
              button: 'Add to cart',
            },
          },
          option: {},
          cart: {
            text: {
              total: 'Subtotal',
              button: 'Checkout',
            },
            popup: false,
          },
          toggle: {},
        },
      });
    });
  }
}
