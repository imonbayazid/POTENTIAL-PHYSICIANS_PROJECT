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


inputFile <- "C:/Hachathon/UserWithLonfLatFiltered.json"
outFile <- "C:/Hachathon/GeoInfoFromLonLat.json"
userFrame<-stream_in(con = file(inputFile, open = "r"))


points = data.frame(
  lon = as.numeric(userFrame$lon) ,
  lat = as.numeric(userFrame$lat) ,
  addr = userFrame$geoAddress
  
)
points =  unique(points)
points = subset(points, is.na(lon)==FALSE  & is.na(lat)==FALSE)

i<-1
for(i in 1:nrow(points))
{
  if(is.numeric(points$lon[i]) & is.numeric(points$lat[i]))
  {
    lon <- points$lon[i]
    lat <- points$lat[i]
    addr <- points$addr[i]
    
	
    geo_inforamtion <- revgeocode( c(lon, lat), output = "more")
    geo_inforamtion$Lat = lat
    geo_inforamtion$Lon = lon
    geo_inforamtion$addr = addr
	
    is.data.frame(geo_inforamtion)
    stream_out(geo_inforamtion, con = file(outFile, open = "a+"),verbose = TRUE)

	
	
    i = i +1
  }
}
