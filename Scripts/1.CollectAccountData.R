rm(list=ls())

#sets your working directory
setwd("C:/Hachathon")

library(jsonlite)
library(gWidgets)
library(httr)
library(tcltk)
library(gWidgetstcltk)
library(rjson)
library(RJSONIO)
library(mongolite)

## options(guiToolkit="tcltk") 
consKey <- my_key
consSecret<- my_Secret
token<- my_token
tokenSecret<- my_tokenSecret


# start the authorisation process
myapp = oauth_app("twitter", key=consKey, secret=consSecret)

# sign using token and token secret
sig = sign_oauth1.0(myapp, token=token, token_secret=tokenSecret)

searchOn="Dr"
pageCount=300

userInfo=NULL


inputFile <- "C:/Hachathon/test.json"
#con  <- file(inputFile, open = "w")

cursor = -1
for(i in 1:pageCount)
{
  url<-paste("https://api.twitter.com/1.1/users/search.json?q=",searchOn,"&page=",i,"&count=25", sep = "")
  
  search_user <- GET(url, sig, accept_json())
  search_content <- content(search_user)
  search_content_toJson <- toJSON(search_content)
  search_content_toJson_fromJson_df <- jsonlite::fromJSON(search_content_toJson)
  nrow(search_content_toJson_fromJson_df)
  stream_out(search_content_toJson_fromJson_df, con = file(inputFile, open = "a+"),verbose = TRUE)
  Sys.sleep(3.0)

}
search_user

api_path = paste("https://api.twitter.com/1.1/users/search.json?q=",searchOn,"&page=",i,"&count=3",sep = "")

do {
  url_with_cursor = api_path + "&cursor=" + cursor
  response_dictionary = perform_http_get_request_for_url( url_with_cursor )
  cursor = response_dictionary[ 'next_cursor' ]
}
while ( cursor != 0 )
  
close(con)

temporaryFile <- "C:/Hachathon/DrList.json"
con  <- file(inputFile, open = "r")
con2 <- file(temporaryFile, open = "w")

TotalLine<-length(count.fields(inputFile))
lineCount <- 0
while (length(oneLine <- readLines(con, n = 1, warn = FALSE)) > 0) 
{
  lineCount <- lineCount + 1
  if(lineCount<TotalLine &&  validate(oneLine))
  {
    oneLine <- paste(oneLine, '\r')
    cat(oneLine, file = con2, sep = "\n") #spit the line back out
  }
} 

close(con)
close(con2)
