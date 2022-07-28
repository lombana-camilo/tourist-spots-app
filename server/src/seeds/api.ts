import axios from "axios";
import config from "config";

const options = {
  method: "GET",
  url: "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary",
  params: {
    tr_longitude: "109.262909",
    tr_latitude: "12.346705",
    bl_longitude: "109.095887",
    bl_latitude: "12.113245",
    currency: "USD",
    limit: 30,
    lunit: "km",
    lang: "en_US",
  },
  headers: {
    "X-RapidAPI-Key": config.get<string>("API_KEY"),
    "X-RapidAPI-Host": config.get<string>("API_HOST"),
  },
};

const filterData = async () => {
  try {
    const { data } = await axios.request(options);
    const dataArray = data.data;
    const completeOnes = dataArray.filter((spot: any) => {
      return spot.description?.length > 0 && spot.location_string?.length > 0;
    });

    const filterArray = completeOnes.map((spot: any) => {
      return {
        title: spot.name,
        description: spot.description,
        location: spot.location_string,
      };
    });
    return filterArray;
  } catch (e) {
    console.log(e);
  }
};

export default filterData;
