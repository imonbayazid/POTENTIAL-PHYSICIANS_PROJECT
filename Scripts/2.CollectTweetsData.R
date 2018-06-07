#installs TwitteR Package
install.packages('twitteR')

#loads TwitteR
require(twitteR)


#Create object of each of the 4
consumerKey= ''       # 'Consumer/API Key
consumerSecret= ''    #Consumer Secret
accessToken= ''       # Access Token
accessSecret= ''      #Access Secret

#connect to Twitter to access the API
setup_twitter_oauth(consumerKey,consumerSecret,accessToken,accessSecret)


# Read CSV into R
DrUserInfo <- read.csv(file="DrList.csv", header=TRUE) #, sep="|"

#conver type 
idNum <- c(1: nrow(DrUserInfo))
scrName = as.character(DrUserInfo$screenName)

#Create data frame
data <- data.frame(ID = idNum, screenName = scrName , stringsAsFactors = F)

#conver type
usernames <- as.list(data$screenName)

#Create blank data frame
tweets <- data.frame()

#Loop for generating Data
for(n in 1:length(usernames)){
  x <- lapply(usernames[n], function(x) userTimeline(x,n=3200,includeRts = TRUE)) #n=3200
  y1 <- lapply(x,function(x) twListToDF(x))
  tweets <- rbind(tweets,y1[[1]])
  print(n)
}

#Write data in CSV format
write.csv(tweets, 'TweetsFinal.csv', row.names=F)
