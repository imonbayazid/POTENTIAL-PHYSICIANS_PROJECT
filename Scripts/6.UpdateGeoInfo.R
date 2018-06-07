rm(list=ls())
setwd("C:/Hachathon/")
library(twitteR)
library(sp)
library(raster)
library(dismo)
library(maps)
library(scales)
library(ggplot2)
library(jsonlite)
library(gWidgets)
library(httr)
library(tcltk)
library(gWidgetstcltk)
library(rjson)
library(RJSONIO)
library(mongolite)
library(ggmap)


inputFile <- "C:/Hachathon/GeoInfoFromLonLat.json"
userinputFile <- "C:/Hachathon/UserWithLonfLatFiltered.json"
df_GeoInfo<-stream_in(con = file(inputFile, open = "r"))
df_UserInfo<-stream_in(con = file(userinputFile, open = "r"))

outFileGeo = "C:/Hachathon/DGeoInfo.json"
outFileGeoUser = "C:/Hachathon/FGeoUserInfo.json"

df_GeoInfo_Refined = data.frame(
      "country" = df_GeoInfo$country,
      "administrative_area_level_1" = df_GeoInfo$administrative_area_level_1,
      "administrative_area_level_2" = df_GeoInfo$administrative_area_level_2,
      "locality" = df_GeoInfo$locality,
      "Address" = df_GeoInfo$address,
      "geoAddress" = df_GeoInfo$addr,
      "lat" = df_GeoInfo$Lat,
      "lon" = df_GeoInfo$Lon,
      "postal_code" = df_GeoInfo$postal_code
)

### Create ID Column 
id <- rownames(df_GeoInfo_Refined)
df_GeoInfo_Refined <- cbind(GeoId=id, df_GeoInfo_Refined)
df_GeoInfo_Refined

#df_GeoInfo_Refined$lat[1]
#df_GeoInfo_Refined$lon[1]
#df_GeoInfo_Refined$geoAddress[1]

#df_UserInfo$lat[1]
#df_UserInfo$lon[1]
#df_GeoInfo_Refined$geoAddress[1]

### Merge two data frame and this is the answer of what i assume you want   
merged_Data = merge(df_GeoInfo_Refined, df_UserInfo, by = c("lat","lon", "geoAddress"))#, all.y=TRUE)

df_Merged = data.frame(
  "GeoId" = merged_Data$GeoId,
  "UserId" = merged_Data$id_str
)



#####Out Json File
stream_out(df_GeoInfo_Refined, con = file(outFileGeo, open = "a+"),verbose = TRUE)
stream_out(df_Merged, con = file(outFileGeoUser, open = "a+"),verbose = TRUE)


##For issue Handle
write_json(df_GeoInfo_Refined, outFileGeo)
write_json(df_Merged, outFileGeoUser)

## Load into MongoDb
tconn <- mongo(collection = "DGeoInfo", db = "StageTwiData", url = "mongodb://127.0.0.1:27017", verbose = FALSE, options = ssl_options())
tconn$drop()
tconn$count()
tconn$import(file(outFileGeo))
tconn$count()

tuconn <- mongo(collection = "FGeoUserInfo", db = "StageTwiData", url = "mongodb://127.0.0.1:27017", verbose = FALSE, options = ssl_options())
tuconn$drop()
tuconn$count()
tuconn$import(file(outFileGeoUser))
tuconn$count()

