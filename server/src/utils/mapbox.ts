import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding"
import config from "config"

const mapBoxToken = config.get<string>("mapBoxToken")

export const geoCoder = mbxGeocoding({accessToken:mapBoxToken})
