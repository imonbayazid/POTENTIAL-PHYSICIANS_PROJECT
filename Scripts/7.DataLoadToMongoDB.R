rm(list= ls())

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
library(mongolite)


#########Process FollowerList File
inputFile_Follow <- "C:/Hachathon/FollowerList.csv"
##Read csv file into DF
df_Follow <- read.csv(file =inputFile_Follow,sep = "," )

#df_Tweets
##Generate Json file
outFile_Follow <- "C:/Hachathon/FollowerList.json"
df_Follow[1039575:1039579,]
stream_out(df_Follow, con = file(outFile_Follow, open = "a+"),verbose = TRUE)

##Load into MongoDB
Followconn <- mongo(collection = "FollowersFinal1", db = "StageTwiData", url = "mongodb://127.0.0.1:27017", verbose = FALSE, options = ssl_options())
#Followconn$drop()
Followconn$count()
Followconn$import(file(outFile_Follow))
Followconn$count()

#########Process Tweets File
inputFile_Tweets <- "C:/Hachathon/TweetsFinal.csv"

##Read csv file into DF
df_Tweets <- read.csv(file =inputFile_Tweets,sep = "," )
##Convert Id to 'STR' format
df_Tweets$id = as.character(df_Tweets$id)
#df_Tweets
##Generate Json file
outFile_Tweets <- "C:/Hachathon/TweetsFinal.json"
stream_out(df_Tweets, con = file(outFile_Tweets, open = "a+"),verbose = TRUE)

##Load into MongoDB
twiconn <- mongo(collection = "TweetsFinal", db = "StageTwiData", url = "mongodb://127.0.0.1:27017", verbose = FALSE, options = ssl_options())
#twiconn$drop()
twiconn$count()
twiconn$import(file(outFile_Tweets))
twiconn$count()



########### Porcess Professional
inputFile_User <- "C:/Hachathon/UserWithLonfLatFiltered.json"
outFile_User <- "C:/Hachathon/DProfesional.json"
df <- stream_in(con = file(inputFile_User, open = "r" ))
df$PlatFormID = c(rep(1, nrow(df)))
df$PlatFormID
Mod_DF <- data.frame("PlatformId" = df$PlatFormID,
                     "id" = df$id, 
                     "id_str" = df$id_str, 
                     "name" = df$name, 
                     "screen_name" = df$screen_name,
                     "created_at" = df$created_at
                     
) 

Mod_DF
stream_out(Mod_DF, con = file(outFile_User, open = "a+"),verbose = TRUE)
#write_json(Mod_DF, outFile_User)

##Load into MongoDB
twiDRconn <- mongo(collection = "DProfessional", db = "StageTwiData", url = "mongodb://127.0.0.1:27017", verbose = FALSE, options = ssl_options())
twiDRconn$drop()
twiDRconn$count()
twiDRconn$import(file(outFile_User))
twiDRconn$count()
