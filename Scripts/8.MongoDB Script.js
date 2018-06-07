db.getCollection('DRList').find({})

db.DRList.count(){},{$set : {"PlatformId":"1"}})
db.DRList.updateMany({},{$set : {"PlatformId":"1"}})

var myIds = new Array()
db.DRList.find({}).forEach(function(myDoc){myIds.push(myDoc.screenName)})
myIds
db.TblUserInfo.count()//569
db.TblUserInfo.count({"screen_name" : { $in: myIds}})//521


/// Actually, there is an equivalent of SQL's insert into ... select from in MongoDB. 
/// First, you convert multiple documents into an array of documents; then you insert the array into the target collection
/// db.subset.insert(db.full_set.find({date:"20120105"}).toArray())

/// Prepare FAccountSnapshot
db.FAccountSnapshot.drop();
db.createCollection( "FAccountSnapshot");
db.TblUserInfo.count();
db.TblUserInfo.copyTo("FAccountSnapshot");
db.FAccountSnapshot.remove({"screen_name" : { $nin: myIds}});
db.FAccountSnapshot.count();

/// Insert Columns
db.FAccountSnapshot.updateMany({},{$set : {"PlatformId":"1"}})
db.FAccountSnapshot.updateMany({}, {$currentDate : {"ETL_Date":{ $type: "timestamp" }}})

db.FAccountSnapshot.updateMany({}, {$currentDate : {"ETL_Date":{ $type: "timestamp" }}})

/// Delete Columns
db.FAccountSnapshot.updateMany({},{$unset : {"url":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"entities":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"status":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"is_translator":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"is_translation_enabled":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"protected":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"created_at":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"geo_enabled":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"verified":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"contributors_enabled":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_background_color":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_background_tile":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_image_url":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_image_url_https":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_banner_url":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_link_color":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_sidebar_border_color":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_sidebar_fill_color":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_text_color":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_use_background_image":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"default_profile_image":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_background_image_url":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"profile_background_image_url_https":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"notifications":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"translator_type":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"has_extended_profile":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"default_profile":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"following":""}})
db.FAccountSnapshot.updateMany({},{$unset : {"follow_request_sent":""}})

/// Prepare FUserActivity
db.FUserActivity.drop();
db.createCollection( "FUserActivity");

db.TweetsFinal.find({"screenName" : { $in: myIds}})
db.TweetsFinal.count()//1540286
db.TweetsFinal.count({"screenName" : { $in: myIds}})//1375458
db.TweetsFinal.count({"screenName" : { $nin: myIds}})//164828

db.FUserActivity.count();
db.TweetsFinal.copyTo("FUserActivity");
db.FUserActivity.remove({"screenName" : { $nin: myIds}});

db.FUserActivity.distinct("screenName")
db.FAccountSnapshot.distinct("screen_name")
/// Prepare FUserNetwork
db.FollowersFinal.count()

db.FollowersFinal.distinct("User")
db.FollowersFinal.find({"User" : { $in: myIds}})
/// db.users.insert({name: 'paulo'})
/// db.users.insert({name: 'patric'})
/// db.users.insert({name: 'pedro'})
/// db.users.find({name: /a/})  //like '%a%'  :::: out: paulo, patric
/// db.users.find({name: /^pa/}) //like 'pa%' :::: out: paulo, patric
/// db.users.find({name: /ro$/}) //like '%ro' :::: out: pedro

db.FollowersFinal.count({"User" : "drajoykumar"})
db.FollowersFinal.count({"User" : "drajoykumar", "Follower" : /^dr.*/} )

db.FollowersFinal.count({"Follower" : /^dr.*/} )

db.FollowersFinal.find({"User" : "drajoykumar", "Follower" : /^dr.*/} )
db.FollowersFinal.find({"User" : "drajoykumar", "Follower" : {$not : /^dr.*/}} )

db.FollowersFinal.count({"User" : { $nin: myIds} ,"Follower" : /^dr.*/} )
db.FollowersFinal.count({"Follower" : {$not : /^dr.*/}} )

db.getCollection('FollowersFinal').find({"Follower" : /.*dr.*/})


db.FUserNetwork.drop();
db.createCollection( "FUserNetwork");

db.FUserNetwork.count();
db.FollowersFinal.copyTo("FUserNetwork");
db.FUserNetwork.remove({"User" : { $nin: myIds}});
db.FUserNetwork.remove({"Follower" : {$not : /^dr.*/}});

db.FUserNetwork.distinct("User")
db.FUserNetwork.count()


db.FollowersFinal1.copyTo("FollowersFinal")

var myIds = new Array()
db.DProfessional.find({}).forEach(function(myDoc){myIds.push(myDoc.screen_name)})
myIds
db.FollowersFinal1.count();
db.FollowersFinal1.count({"User" : { $in: myIds}});//4580943
db.FollowersFinal1.count({"User" : { $nin: myIds}});//505156
db.FollowersFinal1.remove({"User" : { $nin: myIds}});
db.FollowersFinal1.count();//4580943

db.FollowersFinal1.count({"Follower" : {$not : /^dr.*/}});//4578732
db.FollowersFinal1.remove({"Follower" : {$not : /^dr.*/}});
db.FollowersFinal1.count();//2211

db.FollowersFinal1.copyTo("FUserNetwork")

/// Process FGeoUserInfo
var myuIds = new Array()
db.FAccountSnapshot.find({}).forEach(function(myDoc){myuIds.push(myDoc.id_str)})
myuIds

db.FGeoUserInfo.distinct("UserId")//804
db.FGeoUserInfo.distinct("GeoId")//410


db.FGeoUserInfo.count();//804
db.FGeoUserInfo.count({"UserId" : { $nin: myuIds}}); //367
db.FGeoUserInfo.count({"UserId" : { $in: myuIds}}); //437


db.FGeoUserInfo.remove({"UserId" : { $nin: myuIds}}); //367 removed

db.FGeoUserInfo.distinct("UserId")//437
db.FGeoUserInfo.distinct("GeoId")//242

db.FGeoUserInfo.find({"UserId" : { $nin: myuIds}});
db.FGeoUserInfo.find({"UserId" : { $in: myuIds}});

db.FGeoUserInfo.count({"UserId" : { $in: myuIds}});


db.FUserNetwork.drop();
db.createCollection( "FUserNetwork");

db.FUserNetwork.count();
db.FollowersFinal.copyTo("FUserNetwork");



/// Prepare DProfessional
var myIds = new Array()
db.FAccountSnapshot.find({}).forEach(function(myDoc){myIds.push(myDoc.screen_name)})
myIds

db.DProfessional.count();
db.DProfessional.remove({"screen_name" : { $nin: myIds}});
db.DProfessional.count(); //521
db.DProfessional.updateMany({},{$set : {"PlatformId":"1"}})

//Prepare Platform
db.createCollection( "DPlatForm")
db.DPlatForm.insertMany([
{ Id : "1", name : "Twitter"},
{ Id : "2", name : "Facebook"},
{ Id : "3", name : "LinkedIn"},
{ Id : "4", name : "YouTube"}
])

////Prepare ActivityStatus
db.createCollection( "DActivityStatus")
db.DActivityStatus.insertMany([
{ Status_Id : "1", Status_Desc : "0 to 15 Days Active", Status : "Active" },
{ Status_Id : "2", Status_Desc : "16 to 30 Days Active", Status : "Active" },
{ Status_Id : "3", Status_Desc : "31 to 45 Days Active", Status : "Active" },
{ Status_Id : "4", Status_Desc : "46 to 90 Days Active", Status : "Active" },
{ Status_Id : "5", Status_Desc : "91 to 120 Days Active", Status : "Dormant" },
{ Status_Id : "6", Status_Desc : "121 and Above Days Active", Status : "Churn" } 
])

/// 

db.createCollection( "testCol")
db.testCol.insertMany([
{ Status_Id : "1", Status_Desc : "0 to 15 Days Active", Status : "Active" },
{ Status_Id : "2", Status_Desc : "16 to 30 Days Active", Status : "Active" },
{ Status_Id : "3", Status_Desc : "31 to 45 Days Active", Status : "Active" },
{ Status_Id : "4", Status_Desc : "46 to 90 Days Active", Status : "Active" },
{ Status_Id : "5", Status_Desc : "91 to 120 Days Active", Status : "Dormant" },
{ Status_Id : "6", Status_Desc : "121 and Above Days Active", Status : "Churn" } 
])

db.testCol.updateMany({}, {$set : {"ETL_PDate": ETL_Date}})
db.testCol.find().forEach(function(element){
  element.ETL_Date = ISODate(element.ETL_Date);
  db.testCol.save(element);
})

db.testCol.updateMany({}, {$currentDate : {"ETL_Date":{ $type: "timestamp" }}})
var results =  new Array();
db.testCol.aggregate(
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { Status : "$Status" , "Status_Desc" : "$Status_Desc" },
                    LatestActivityDate: { $max: "$ETL_Date" }
                }} ,
             // Rename _id to group_id, so can use as find criteria
             { $project: {
                    _id: 0,
                    Status:'$Status',
                    Status_Desc:'$Status_Desc',
                    LatestActivityDate: '$LatestActivityDate'
              }}).forEach(function(match) {
            // Find matching documents per group and push onto results array
            results.push(db.testColAgg.findOne(match));
});   
          
    db.testCol.aggregate([
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { Status : "$Status" , "Status_Desc" : "$Status_Desc" },
                    LatestActivityDate: { $max: "$ETL_Date" }
                }}
                , { $out : "authors" }
         ] )

var results =  new Array();
var results = db.testCol.aggregate([
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { Status : "$Status" , "Status_Desc" : "$Status_Desc" },
                    LatestActivityDate: { $max: "$ETL_Date" }
                }}
                , { $out : "authors" }
         ] )
results                
db.createCollection( "testColAgg")  
db.testColAgg.drop()
db.testColAgg.insertMany(results.toArray())
////

var doc_to_remove = db.TblUserInfo.find({"screen_name" : { $nin: myIds}});
doc_to_remove.forEach(
doc_to_remove.count();
doc_to_remove.forEach(function(doc){
    db.FAccountSnapshot.remove(doc);
    db.FAccountSnapshot.update($pop : 
    update
});
db.FAccountSnapshot.count();


db.createCollection( "FLatestActivity")
//db.FLatestActivity.drop()
db.FUserActivity.aggregate([
        // Find documents with latest date for each group_id
        {$group: {
                _id : "$screenName" ,
                LatestActivityDate: { $max: "$TweetDate" }
            }}
            , { $out : "authorss" }
     ] )
            
db.FLatestActivity.updateMany({},{$set : {"PlatformId":"1"}})
db.FLatestActivity.updateMany({},{$set : {"ETL_Date":  $}})

db.authorss.copyTo("FLatestActivity")

db.FUserActivity.updateMany({},{$set : {"PlatformId":"1"}})
db.FUserNetwork.updateMany({},{$set : {"PlatformId":"1"}})



////////////////////
db.FUserActivity.count();//1375458
db.FUserActivity.updateMany({}, {$set : {"TweetDate": ETL_Date}})
db.FUserActivity.find().forEach(function(element){
  element.TweetDate = ISODate(element.created);
  db.FUserActivity.save(element);
})

db.FUserActivity.updateMany({},{$set : {"PlatformId":"1"}})
FAccountSnapshot

db.createCollection("FLatestActivityTmp")
db.FLatestActivity.copyTo("FLatestActivityTmp")

db.FLatestActivityTmp.updateMany({},{$unset : {"PlatformId":"1"}})

db.FLatestActivityTmp.find()
db.FUserActivity.updateMany({},{$set : {"PlatformId":"1"}})
db.FAccountSnapshot_OLD.find().forEach(
    function (newBook) {
        newBook.Last_Active_Date = db.FLatestActivityTmp.findOne( { "_id": newBook.screen_name } );
        db.FAccountSnapshot.insert(newBook);
    }
);
db.FAccountSnapshot_OLD.updateMany(ISODate(element.created)

db.FAccountSnapshot.aggregate([
    { "$lookup": { 
        "from": "FLatestActivity", 
        "localField": "screen_name", 
        "foreignField": "_Id", 
        "as": "FLatestActivity_Doc"
    }}, 
    { "$unwind": "$FLatestActivity_Doc" },
    { "$redact": { 
        "$cond": [
            { "$eq": [ "$PlatformId", "$FLatestActivity_Doc.PlatformId" ] }, 
            "$$KEEP", 
            "$$PRUNE"
        ]
    }}, 
    { "$project": { 
        "screen_name": 1 
        "PlatformId": 1 
        "Last_Active_Date": "$FLatestActivity_Doc.LatestActivityDate"
    }}
])
    
var results =  new Array();
db.FUserActivity.aggregate(
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { screenName : "$screenName" },
                    LatestActivityDate: { $max: "$TweetDate" }
                }} ,
             // Rename _id to group_id, so can use as find criteria
             { $project: {
                    _id: 0,
                    screenName:'$_id',
                    LatestActivityDate: '$LatestActivityDate'
              }}).forEach(function(match) {
            // Find matching documents per group and push onto results array
            results.push(db.FLatestActivity.findOne(match));
});   
        

   db.testCol.aggregate([
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { Status : "$Status" , "Status_Desc" : "$Status_Desc" },
                    LatestActivityDate: { $max: "$ETL_Date" }
                }}
                , { $out : "authors" }
         ] )
db.testCol.updateMany({}, {$set : {"ETL_PDate": ETL_Date}})
db.testCol.find().forEach(function(element){
  element.ETL_Date = ISODate(element.ETL_Date);
  db.testCol.save(element);
})

db.testCol.updateMany({}, {$currentDate : {"ETL_Date":{ $type: "timestamp" }}})
var results =  new Array();
db.testCol.aggregate(
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { Status : "$Status" , "Status_Desc" : "$Status_Desc" },
                    LatestActivityDate: { $max: "$ETL_Date" }
                }} ,
             // Rename _id to group_id, so can use as find criteria
             { $project: {
                    _id: 0,
                    Status:'$_id',
                    Status_Desc:'$Status_Desc',
                    LatestActivityDate: '$LatestActivityDate'
              }}).forEach(function(match) {
            // Find matching documents per group and push onto results array
            results.push(db.testColAgg.findOne(match));
});   
          
    db.testCol.aggregate([
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { Status : "$Status" , "Status_Desc" : "$Status_Desc" },
                    LatestActivityDate: { $max: "$ETL_Date" }
                }}
                , { $out : "authors" }
         ] )

var results =  new Array();
var results = db.testCol.aggregate([
            // Find documents with latest date for each group_id
            {$group: {
                    _id : { Status : "$Status" , "Status_Desc" : "$Status_Desc" },
                    LatestActivityDate: { $max: "$ETL_Date" }
                }}
                , { $out : "authors" }
         ] )
results                
db.createCollection( "testColAgg")  
db.testColAgg.drop()
db.testColAgg.insertMany(results.toArray())



