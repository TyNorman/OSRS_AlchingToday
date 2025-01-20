import React, { useState } from 'react';
import './AlchPreview.css';

//ALL items: https://prices.runescape.wiki/api/v1/osrs/mapping
//For every item valued above Nature Runes' GE price (ID 561), determine the highest profit difference between avg buy price and High Alch price
//Additionally determine the best profit for high buy/sell volume items

//DO NOT Do a GET call on 'latest' per all 3700+ item IDs for the love of Guthix

//Get items using https://prices.runescape.wiki/api/v1/osrs/1h for hourly avg price

///{data_GE ? <div>{JSON.stringify(data_GE)}</div> : <div>Loading...</div>}

//ALGORITHM TIME
//Pair data_GE to allItems to cross reference GE sell values to high alch values
//Sort in descending order from highest diff of alch value - sell value
//For now just return the #1 item, eventually list like top 10

let headers = new Headers({
  "Accept"       : "application/json",
  "Content-Type" : "application/json",
  "User-Agent"   : "@MaldIncoming"
});

function Item_GE() {
  var id = 0;
  var name = "null";
  var value_high = 0;
  var value_low = 0;
  var value_avg = 0;
  var high_alch = 0;
  var trade_limit = 0;
}

var runeNature = null;

export default function AlchPreview() {
  const [data_GE, setData] = useState(null); //JSON data for all GE items
  const [allItems, setAllItems] = useState(null); //JSON data for all OSRS items, Item Mapping from https://prices.runescape.wiki/api/v1/osrs/mapping, used to get GE trade volumes and alch prices

  const [runeNature, setRuneNature] = useState(null); //Nature Rune data, profit determined by GE price of Nature Runes
  const [bestItem, setBestItem] = useState(null); //Alch target based on specified criteria
  const [itemName, setName] = useState("No Item Found");
  const [itemIcon, setIcon] = useState('https://oldschool.runescape.wiki/images/Nature_rune.png');
  const [highAlch, setHighAlch] = useState(0);
  const [value_GE_Avg, setGEAvg] = useState(0);

  var data_GE_Array = [];
  var itemID = 0;

  function getGEItemByID(id) { //Note that the Latest GE data uses item IDs for keys
    return data_GE.data[id];
  }
  function getDatabaseItemByID(id) { //Note that the Latest GE data uses item IDs for keys
    for (var i in allItems) {
      if (allItems[i].id == id)
        return allItems[i];
    }
  }

  function handleClick() {
    initItems();

    fetch('https://prices.runescape.wiki/api/v1/osrs/latest', {
      method: "GET",
      headers: {
        "Alching-Today-portfolio": headers
      },
    })
  .then(response => response.json())
  .then(data => setData(data))
  .then(PopulateInfo())
  .catch(error => console.error(error));

  console.log(data_GE);
}

  function PopulateInfo() {
    if (data_GE != null) {
      //First get the GE value of nature runes since 1 is used per alch
      setRuneNature(getDatabaseItemByID(561));
      if (runeNature != null) {
        console.log("Nats: " + JSON.stringify(runeNature));
        setItemInfo(561);
      }

      //Next arrange ALL GE items from highest value to lowest
      //DO NOT sort the data_GE.data, this will assign new IDs that are incorrect


      for (var i in data_GE.data) {
        //TODO:
        //DO NOT just push existing data, indexes = item IDs so sorting it will throw everything out of whack
        //Just create a new GE object and push it
       // data_Array.push(data_GE.data[i]);

       //NOTE: Currently this can include unobtainable items, if they can be detected (ex. 0 GE price) it'd be best to exclude them.


       var itemInfo = new Item_GE();
       itemInfo.id = i; //Note that GE item list is in item ID order
       itemInfo.value_high = data_GE.data[i].high;
       itemInfo.value_low = data_GE.data[i].low;
       itemInfo.value_avg = Math.floor((data_GE.data[i].high + data_GE.data[i].low) / 2);
       var itemDatabaseInfo = getDatabaseItemByID(i);
       if (itemDatabaseInfo != null) { //Note that some of these results can be null
        itemInfo.name = itemDatabaseInfo.name;
        itemInfo.high_alch = itemDatabaseInfo.highalch;
        itemInfo.trade_limit = itemDatabaseInfo.limit;
       }
       data_GE_Array.push(itemInfo);
      }

      //data_GE_Array.sort((b, a) => a.high_alch - b.high_alch); //Sort by high alch values


      //data_GE_Array.sort((b, a) => (a.high_alch - a.value_avg) - (b.high_alch - b.value_avg)); //Sort by alch minus avg GE value

      //Complex Sorting
      data_GE_Array.sort((b,a) => {
        if ((a.high_alch) > (b.high_alch))
          return 1;
        else
          return -1;

      });

      //console.log(data_Array);
      //setData(data_Array.sort((b, a) => a.high - b.high));

      console.log("SORTED: " + JSON.stringify(data_GE_Array));

      DEBUG_ShowProfits();
    }
  }

  function DEBUG_ShowProfits() {
    for (var i in data_GE_Array) {
      console.log(data_GE_Array[i]);
      console.log("PROFIT: " + (data_GE_Array[i].high_alch - data_GE_Array[i].value_avg));
    }
  }

  function initItems() {

    fetch('https://prices.runescape.wiki/api/v1/osrs/mapping', {
      method: "GET",
      headers: {
        "Alching-Today-portfolio": headers
      },
    })
    .then(response => response.json())
    .then(data => setAllItems(data))
    .catch(error => console.error(error));
  }

  function setItemInfo(id) { //Determine the item name, icon, associated info
    if (data_GE != null) {
      //itemID = Object.keys(data_GE.data)[id];
          //console.log(data_GE);
      for (var i in allItems) {
          if (allItems[i].id === id)
          {
            console.log('ItemName: ' + allItems[i].name);
            setName(allItems[i].name);

            var iconName = allItems[i].icon.replace(/ /g,"_");
            console.log("iconName: " + iconName);
            setIcon('https://oldschool.runescape.wiki/images/' + iconName);

            setHighAlch(allItems[i].highalch);

            //Set the item's GE info
            var item_GE = getGEItemByID(id);
            console.log("GE Info: " + item_GE);
            setGEAvg(Math.floor((item_GE.high + item_GE.low) / 2));

            console.log(allItems[i].highalch);
            break;
          }
      }
    }
  }

  return (
    <div>
      <div>{itemName}</div>
      
      <div><img className='Icon'
      src= {itemIcon}
      alt="new"
      />
      </div>
      <div className="text-3xl bg-orange-500">GE Value: {value_GE_Avg}</div>
      <div>High Alch: {highAlch}</div>
      <button onClick={handleClick}>Get Data</button>
    </div>
  );
}