import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AlchPreview from './AlchPreview/AlchPreview.jsx';

import './App.css';

let headers = new Headers({
  "Accept"       : "application/json",
  "Content-Type" : "application/json",
  "User-Agent"   : "@MaldIncoming"
});

function Item_GE() {
  var id = 0;
  var name = "null";
  var icon = "null";
  var value_high = 0;
  var value_low = 0;
  var value_avg = 0;
  var high_alch = 0;
  var trade_limit = 0;
  var daily_profit = 0;
  var volume = 1;
};

function App() {
  const [count, setCount] = useState(0);
  const [data_GE, setGEData] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [itemVolumes, setItemVolumes] = useState([]);
  //const [itemName, setName] = useState("No Item Found");
  //const [itemIcon, setIcon] = useState('https://oldschool.runescape.wiki/images/Nature_rune.png');
  //const [highAlch, setHighAlch] = useState(0);
  //const [valueHigh, setValueHigh] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("LOADING TEXT GOES HERE");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [natureRune, setNatureRune] = useState(null);

  const [emblaRef] = useEmblaCarousel();

//ALL items: https://prices.runescape.wiki/api/v1/osrs/mapping
//For every item valued above Nature Runes' GE price (ID 561), determine the highest profit difference between avg buy price and High Alch price
//Additionally determine the best profit for high buy/sell volume items

//DO NOT Do a GET call on 'latest' per all 3700+ item IDs for the love of Guthix

//Get items using https://prices.runescape.wiki/api/v1/osrs/1h for hourly avg price

//TODO: Use https://prices.runescape.wiki/api/v1/osrs/6h to determine trade volume per item to give realistic results
//ITEM VOLUMES: https://oldschool.runescape.wiki/?title=Module:GEVolumes/data.json&action=raw&ctype=application%2Fjson


  // Fetch data on component mount (only once)
  useEffect(() => {
    Promise.all([
      fetch('https://prices.runescape.wiki/api/v1/osrs/latest', {
        method: "GET",
        headers: { "Alching-Today-portfolio": headers }
      }),
      fetch('https://prices.runescape.wiki/api/v1/osrs/mapping', {
        method: "GET",
        headers: { "Alching-Today-portfolio": headers }
      }),
      fetch('https://oldschool.runescape.wiki/?title=Module:GEVolumes/data.json&action=raw&ctype=application%2Fjson')
      ])
      .then((res) => Promise.all(res.map((response) => response.json())))
      .then(([latestData, mappingData, itemVolumesData]) => {
        setGEData(latestData);
        setAllItems(mappingData);
        setItemVolumes(itemVolumesData);

        //TODO: Display the cost of Nature Runes in one of the corners eventually
        const natureRuneData = getDatabaseItemByID(561, mappingData);
        console.log("Nature Rune Data:", natureRuneData);

        const itemArray = Init_GE_Data(latestData, mappingData, itemVolumesData);
        setNatureRune(natureRuneData);

        const sortedArray = SortByHighAlch(itemArray);

        if (sortedArray && sortedArray.length > 0) {

          for (let i = 0; i < 10; i++) { //Set the top 10 best items to alch to be displayed in the carousel
            if (sortedArray[i]) {
              setBestItems(prevBestItems => [...prevBestItems, sortedArray[i]]);
              console.log(sortedArray[i].name);
            }
          }
        }
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsPending(false);
      });
  }, []); // Runs once on mount

  function Init_GE_Data(latestData, mappingData, itemVolumesData) {
    const data_GE_ARRAY = [];

    //Get the current price of Nature Runes
    const natureRunePrice = latestData.data['561']?.high || 0;

    for (var i in latestData.data) {
      var itemInfo = new Item_GE();
      itemInfo.id = i;
      itemInfo.value_high = latestData.data[i].high;

      var currentItemInfo = getDatabaseItemByID(i, mappingData);
      if (currentItemInfo != null) {
        itemInfo.name = currentItemInfo.name;
        var iconName = currentItemInfo.icon
        if (iconName)
          iconName = iconName.replace(/ /g,"_");
        itemInfo.icon = 'https://oldschool.runescape.wiki/images/' + iconName;
        itemInfo.high_alch = currentItemInfo.highalch;
        itemInfo.trade_limit = currentItemInfo.limit;

        itemInfo.daily_profit = (itemInfo.high_alch - itemInfo.value_high - natureRunePrice) * itemInfo.trade_limit;
        itemInfo.volume = getVolumeForItem(itemInfo.name, itemVolumesData) || 1; 
      }
      data_GE_ARRAY.push(itemInfo);
    }
    console.log("Initialized data_GE_ARRAY:", data_GE_ARRAY);
    return data_GE_ARRAY;
  }

  function getDatabaseItemByID(id, mappingData) {
    for (var i in mappingData) {
      if (mappingData[i].id == id)
        return mappingData[i];
    }
  }

  function getVolumeForItem(name, itemVolumesData) {
      if (itemVolumesData[name])
        return itemVolumesData[name];
  }

  function SortByHighAlch(data_GE_ARRAY) {
    console.log("START SortByHighAlch()");
    
    // Sort by daily_profit in descending order (highest profit first)
    data_GE_ARRAY.sort((a, b) => b.daily_profit - a.daily_profit);

    console.log("SORTED by daily_profit:", JSON.stringify(data_GE_ARRAY));
    return data_GE_ARRAY;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-400 to-slate-800">
        <header>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {bestItems.map((currentItem, index) => (
              <div key={index} style={{ cursor: "pointer" }} className={"embla__slide"}>
                    <AlchPreview 
                      item={bestItems[index]}
                    />
                </div>
              ))}
            </div>
          </div>
          <div className="font-medium">{loadingStatus}</div>
        </header>
      </div>
    </>
  );
}

export default App;