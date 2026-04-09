import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import backgroundVideo from './assets/Alching_BG.mp4';

import AlchPreview from './AlchPreview/AlchPreview.jsx';
import NatureRunePanel from './AlchPreview/NatureRunePanel.jsx';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './AlchPreview/CarouselButton.jsx';

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
  const [alchsPerHour, setAlchsPerHour] = useState(1000);
  const [loadingStatus, setLoadingStatus] = useState("LOADING TEXT GOES HERE");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [natureRune, setNatureRune] = useState(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, dragFree: true});
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

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

      const natureRunePrice = latestData.data['561']?.high || 180; //180 is the best price by NPCs while waiting to load
  
      // Set the Nature Rune data needed for the NatureRunePanel
      const completeNatureRuneData = {
        name: natureRuneData.name,
        icon: 'https://oldschool.runescape.wiki/images/' + natureRuneData.icon.replace(/ /g,"_"),
        value: natureRunePrice
      };
  
      console.log("Nature Rune Data:", completeNatureRuneData);
      setNatureRune(completeNatureRuneData);

      const itemArray = Init_GE_Data(latestData, mappingData, itemVolumesData);

      const sortedArray = SortByHighAlch(itemArray);

      if (sortedArray && sortedArray.length > 0) {

        for (let i = 0; i < 10; i++) { //Set the top 10 best items to alch to be displayed in the carousel
          if (sortedArray[i]) {
            sortedArray[i].index = i + 1; 
            setBestItems(prevBestItems => [...prevBestItems, sortedArray[i]]);
            console.log(sortedArray[i].name + " | index: " + sortedArray[i].index);
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
        var iconName = currentItemInfo.icon;
        if (iconName)
          iconName = iconName.replace(/ /g,"_");
        itemInfo.icon = 'https://oldschool.runescape.wiki/images/' + iconName;
        itemInfo.high_alch = currentItemInfo.highalch;
        itemInfo.trade_limit = currentItemInfo.limit;
        itemInfo.volume = getVolumeForItem(itemInfo.name, itemVolumesData) || 1; 
        itemInfo.daily_profit = (itemInfo.high_alch - itemInfo.value_high - natureRunePrice) * itemInfo.trade_limit;
        
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

  function getGEDataByID(id, latestData) {
    for (var i in latestData.data) {
      if (i == id)
        return latestData.data[i];
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

  function handleAlchsPerHourChange(e) {
    var alchsPerHour = Math.min(Math.max(e.target.value, 0), 1200); //Cap the input alchs per hour to 1200 because no one is having that APM and has to wait for game ticks
    setAlchsPerHour(alchsPerHour || 0);
}

  return (
    <>
    <div className="h-screen bg-gradient-to-b from-gray-400 to-slate-800">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm backdrop-brightness-50"></div>
      <video src={backgroundVideo} autoPlay loop muted/>
      <div className="content">
        <h1 className="text-4xl text-yellow-300 text-center font-bold mb-4 p-8">Here are 10 of the best items to consider high alching today:</h1>
        <div className="alch-carousel px-8">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {bestItems.map((currentItem, index) => (
              <div key={index} style={{ cursor: "pointer" }} className={"embla__slide"}>
                    <AlchPreview 
                      item={bestItems[index]} natureRuneCost={natureRune.value} alchsPerHour={alchsPerHour}
                    />
                </div>
              ))}
            </div>
          </div>
        </div>    

        <div className="embla__buttons">
          <PrevButton className="text-yellow-300" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton className="text-yellow-300" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="nature_rune_display">
          <NatureRunePanel natureRuneInfo={natureRune} alchsPerHour={alchsPerHour} onAlchsPerHourChange={handleAlchsPerHourChange} />
        </div>
        </div>
      </div>
    </>
  );
}

export default App;