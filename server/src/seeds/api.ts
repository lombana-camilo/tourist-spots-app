import axios from "axios";
import config from "config";

const options = {
  method: "GET",
  url: "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary",
  params: {
    tr_longitude: "-69.543834",
    tr_latitude: "12.862497",
    bl_longitude: "-81.87557",
    bl_latitude: "-0.740952",
    currency: "USD",
    lunit: "km",
    lang: "en_US",
  },
  headers: {
    "X-RapidAPI-Key": config.get<string>("API_KEY"),
    "X-RapidAPI-Host": config.get<string>("API_HOST"),
  },
};

const filterData = async (admin: any) => {
  try {
    const { data } = await axios.request(options);
    const dataArray = data.data;
    const completeOnes = dataArray.filter((spot: any) => {
      return (
        spot.description?.length > 0 &&
        spot.location_string?.length > 0 &&
        spot.photo.images.original.url?.length > 0
      );
    });

    const filterArray = completeOnes.map((spot: any) => {
      return {
        title: spot.name,
        description: spot.description,
        location: spot.location_string,
        images: [{ url: spot.photo.images.original.url, filename: spot.name }],
        geometry: {
          type: "Point",
          coordinates: [Number(spot.longitude), Number(spot.latitude)],
        },
        reviews: [],
        user: admin,
      };
    });
    return filterArray;
  } catch (e) {
    console.log(e);
  }
};

export default filterData;
