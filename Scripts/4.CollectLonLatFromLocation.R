rm(list=ls())
setwd("C:/Hachathon/")
library(twitteR)
library(sp)
library(raster)
library(dismo)
library(maps)
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


inputFile <- "C:/Hachathon/DrList.json"
#con  <- file(inputFile, open = "w")

userFrame<-stream_in(con = file(inputFile, open = "r"))
#userFrame$location[1]


locatedUsers <- !is.na(userFrame$location)  # Keep only users with location info
totalRowCount <-NROW(userFrame$location[locatedUsers])
locations <- geocode(userFrame$location[locatedUsers])  # Use amazing API to guess
userFrame$lon <- locations$lon
userFrame$lat <- locations$lat


outFile <- "C:/Hachathon/DrListWithLonLat.json"
stream_out(userFrame, con = file(outFile, open = "a+"),verbose = TRUE)

close(con)
close(con2)

