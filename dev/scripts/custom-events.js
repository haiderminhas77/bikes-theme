analytics.subscribe("select_item", async (event) => {
    window.dataLayer.push({
      "client_id": event.clientId,
      "event": "select_item",
      "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
      "ecommerce": {
         "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
          "currency": event.customData.currency,
          "value": event.customData.value,
          "item_list_name": event.customData.item_list_name,
          "affiliation": event.customData.affiliation,
          "items": [
              {
                  "item_list_name": event.customData.items[0].item_list_name,
                  "item_id": event.customData.items[0].item_id,
                  "item_name": event.customData.items[0].item_name,
                  "item_brand": event.customData.items[0].item_brand,
                  "item_category": event.customData.items[0].item_category,
                  "item_variant": event.customData.items[0].item_variant,
                  "affiliation": event.customData.items[0].affiliation,
                  "price": event.customData.items[0].price,
                  "currency": event.customData.items[0].currency,
                  "quantity": 1,
                  "discount": 0,
                  "index": event.customData.items[0].index
              }
          ]
      }
    });
});

analytics.subscribe("view_cart", async(event) => {
    window.dataLayer.push({
        "client_id": event.clientId,
        "event": "view_cart",
        "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
        "ecommerce": {
           "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
            "currency": event.customData.currency,
            "value": event.customData.value,
            "affiliation": event.customData.affiliation,
            "items": vvastifyData.cartItemsArray(event.customData.items)
        }
      });
})

analytics.subscribe("sign_up", async(event) => {
    window.dataLayer.push({
        "client_id": event.clientId,
        "event": "sign_up",
        "page_type": event.context.window.location.href.split('.com/')[1],
        "ecommerce": {
           "page_type": event.context.window.location.href.split('.com/')[1],
            "currency": event.customData.currency,
        }
      });
})

analytics.subscribe("quick_view_opened", async(event) => {
    window.dataLayer.push({
        "client_id": event.clientId,
        "event": "v_quick_view_opened",
        "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
        "ecommerce": {
            "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
            "currency": event.customData.currency,
            "value": event.customData.value,
            "item_list_name": event.customData.item_list_name,
            "affiliation": event.customData.affiliation,
            "items": [
                {
                    "item_list_name": event.customData.items[0].item_list_name,
                    "item_id": event.customData.items[0].item_id,
                    "item_name": event.customData.items[0].item_name,
                    "item_brand": event.customData.items[0].item_brand,
                    "item_category": event.customData.items[0].item_category,
                    "item_variant": event.customData.items[0].item_variant,
                    "affiliation": event.customData.items[0].affiliation,
                    "price": event.customData.items[0].price,
                    "currency": event.customData.items[0].currency,
                    "quantity": 1,
                    "discount": 0,
                    "index": event.customData.items[0].index
                }
            ]
        }
    })
})


analytics.subscribe("remove_from_cart", async(event) => {
    window.dataLayer.push({
      "clinet_id": event.clientId,
      "event": "v_remove_cart",
      "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
          "ecommerce": {
              "page_type": event.context.window.location.href.split('.com/')[1].split('/')[0],
              "currency": event.customData.currency,
              "value": event.customData.value,
              "affiliation": event.customData.affiliation,
              "items": [
                  {
                    "item_id": event.customData.items[0].item_id,
                    "item_name": event.customData.items[0].item_name,
                    "item_brand": event.customData.items[0].item_brand,
                    "item_category": event.customData.items[0].item_category,
                    "item_variant": event.customData.items[0].item_variant,
                    "item_size": event.customData.items[0].item_size,
                    "affiliation": event.customData.affiliation,
                    "price": event.customData.items[0].price,
                    "currency": event.customData.items[0].currency,
                    "quantity": event.customData.items[0].quantity
                  }
              ]
          }
    })
  })