/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  // `dbPoolInstance` is accessible within this function scope
  let login = (info,callback) => {
    let query = 'SELECT id, user_name, password FROM users WHERE user_name=$1 AND password=$2';
    let values = [info.username,info.password]
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows[0]);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let postevent = (info,cookies,callback) => {
    //insert statement here to update event table
    let query = 'INSERT INTO eventinfo (event_name,start_date,end_date,duration,event_route,event_description,start_time) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id';
    let values = [info.event_name,info.start_date,info.end_date,info.duration,info.event_route,info.event_description,info.start_time]
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          let secondQuery = 'INSERT INTO userevents (user_id, event_id) VALUES ($1,$2) RETURNING id'
          let secondValues = [cookies.id,queryResult.rows[0].id]
          dbPoolInstance.query(secondQuery,secondValues,(error, queryRes) => {
            if( error ){
              callback(error, null);
            }else{
              if( queryRes.rows.length > 0 ){
                callback(null, queryResult.rows);
              }else{
                callback(null, null);
              }
            }
          })
        }else{
          callback(null, null);
        }
      }
    });
  };

  let profile = (info,callback) => {
    // SELECT users.id, users.user_name, users.password, articles.title, articles.content FROM users LEFT OUTER JOIN userarticles ON (users.id = userarticles.user_id) LEFT OUTER JOIN articles on (userarticles.article_id = articles.id) WHERE users.id=+info.id;
    // SELECT users.id, users.user_name, users.password, articles.title, articles.content FROM users INNER JOIN userarticles ON (users.id = userarticles.user_id) INNER JOIN articles on (userarticles.article_id = articles.id) WHERE users.id='+info.id
    let query = 'SELECT users.profile_pic,users.about, users.id, users.user_name, users.password, eventinfo.id AS eid, eventinfo.event_name, eventinfo.event_description, eventinfo.created_at, eventinfo.start_date FROM users LEFT OUTER JOIN signups ON (users.id = signups.user_id) LEFT OUTER JOIN eventinfo on (signups.event_id = eventinfo.id) WHERE users.id='+info.id;
    dbPoolInstance.query(query,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }
      }
    });
  };

  let register = (info,callback) => {
    var newFilePath = ''
    if (info.file){
      newFilePath = info.file.path.replace('public/', '');
    }
    let query = 'INSERT INTO users (user_name, password, profile_pic, about) SELECT $1,$2,$3,$4 WHERE NOT EXISTS (SELECT * FROM users WHERE user_name=$1) RETURNING *';
    let values = [info.body.user_name, info.body.password, newFilePath, info.body.about]
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows[0]);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let eventpage = (info,cookies,callback) => {
    // eventinfo.id AS eid,eventinfo.event_name,eventinfo.start_date,eventinfo.end_date,eventinfo.duration,eventinfo.event_route,eventinfo.event_description,eventinfo.created_at,users.id AS uid,users.user_name,userevents.user_id AS ueuid,userevents.event_id AS ueeid
    let query = 'SELECT *, eventinfo.id AS eid,eventinfo.created_at AS e_created_at FROM eventinfo LEFT OUTER JOIN userevents ON (eventinfo.id = userevents.event_id) LEFT OUTER JOIN users ON (userevents.user_id = users.id) WHERE eventinfo.id='+info
    dbPoolInstance.query(query,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          let nextQuery = 'SELECT * FROM users INNER JOIN signups ON (users.id = signups.user_id) WHERE signups.event_id='+queryResult.rows[0].eid
          dbPoolInstance.query(nextQuery,(errr,result)=>{
            if (errr){
              callback(errr,null)
            }else{
              let commentQuery = 'SELECT * FROM users INNER JOIN comments ON (users.id=comments.user_id) WHERE comments.event_id=$1 ORDER BY comments.created_at DESC'
              let value = [queryResult.rows[0].eid]
              dbPoolInstance.query(commentQuery,value,(errrr,commentResult)=>{
                if (errrr){
                  callback(errrr,null)
                }else{
                  if (cookies.id){
                    let secondQuery = 'SELECT * FROM signups WHERE user_id=$1 AND event_id=$2'
                    let values = [cookies.id,queryResult.rows[0].eid]
                    dbPoolInstance.query(secondQuery,values,(err, queryRes) => {
                      if( err ){
                        callback(error, null);
                      }else{
                        if (queryRes.rows === null){
                            var fillerArray = []
                        }else {
                          var fillerArray = queryRes.rows
                        }
                          var dataSet = {
                            queryResult: queryResult.rows,
                            queryRes: fillerArray,
                            result:result.rows,
                            commentResult:commentResult.rows
                          }
                          callback(null, dataSet)
                      }
                    });
                  }else{
                    var fillerArray = []
                    var dataSet = {
                      queryResult: queryResult.rows,
                      queryRes: fillerArray,
                      result:result.rows,
                      commentResult:commentResult.rows
                    }
                    callback(null, dataSet);
                  }
                }
              })
            }
          })
        }
      }
    });
  }

  let allevents = (info,callback) => {
    let query = 'SELECT * FROM eventinfo INNER JOIN userevents ON (eventinfo.id = userevents.event_id) INNER JOIN users ON (userevents.user_id = users.id) WHERE eventinfo.start_date::date > (SELECT NOW()::date) ORDER BY eventinfo.start_date DESC'
    dbPoolInstance.query(query,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let signup = (info,callback) => {
    let data = JSON.parse(info.data)
    // 'INSERT INTO userevents (user_id,event_id) VALUES ($1,$2) RETURNING *'
    let query = data.status
    let values = [data.cookies.id, data.data.eid]
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let addcomment = (info,callback) => {
    let data = JSON.parse(info.data)
    let query = 'INSERT INTO comments (user_id, event_id, comment) VALUES ($1,$2,$3)'
    let values = [data.cookies, data.data, data.comment]
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);
        }else{
          callback(null, null);
        }
      }
    });
  };

  let posteventphotos = (info, callback) => {

    for (var i = 0; i < info.file.length; i++){
      var newFilePath = info.file[i].path.replace('public/', '');
      let query = 'INSERT INTO eventphotos (event_id,event_photos) VALUES ($1,$2)'
      let values = [info.body.eid, newFilePath]
      dbPoolInstance.query(query,values,(error, queryResult) => {

      });
    }
    callback(null,null)
  }

  let getgallery = (info, callback)=>{
    let query = 'SELECT * FROM eventphotos WHERE event_id='+info
    dbPoolInstance.query(query,(error, queryResult)=>{
      if (queryResult.rows.length > 0){
        callback(null, queryResult.rows)
      }else {
        var fillerArray = []
        callback(null, fillerArray)
      }
    })
  }

  let editevent = (info, callback)=>{
    let query = 'SELECT * FROM eventinfo WHERE id='+info
    dbPoolInstance.query(query,(error, queryResult)=>{
      callback(null, queryResult.rows)
    })
  }

  let updateevent = (info,id, callback)=>{
    let query = 'UPDATE ONLY eventinfo SET event_name=$1,start_date=$2,end_date=$3,duration=$4,event_route=$5,event_description=$6,start_time=$7 WHERE id=$8'
    let values = [info.event_name,info.start_date,info.end_date,info.duration,info.event_route,info.event_description,info.start_time,id]
    dbPoolInstance.query(query,values,(error, queryResult)=>{
      callback(null, null)
    })
  }

  let editprofile = (info, callback)=>{
    let query = 'SELECT * from users WHERE id='+info
    dbPoolInstance.query(query,(error,result)=>{
      callback(null,result.rows)
    })
  }

  let updateprofile = (info,id, callback)=>{
    let query = 'UPDATE ONLY users SET about=$1 WHERE id=$2'
    let values = [info.about,id]
    dbPoolInstance.query(query,values,(error,result)=>{
      callback(null,null)
    })
  }

  let updateprofilephoto = (info,id,callback) => {
    var newFilePath = ''
    if (info.file){
      newFilePath = info.file.path.replace('public/', '');
    }
    let query = 'UPDATE ONLY users SET profile_pic=$1 WHERE id=$2';
    let values = [newFilePath, id]
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        callback(null, null);
      }
    });
  };

  let getpastcreatedevents = (info,callback) =>{
    let query = 'SELECT eventinfo.created_at, eventinfo.event_name, eventinfo.id FROM eventinfo INNER JOIN userevents ON (eventinfo.id=userevents.event_id) WHERE user_id='+info.id
    dbPoolInstance.query(query,(error,result)=>{
      callback(null,result.rows)
    })
  }

  let userpage = (info,callback) =>{
    let query = 'SELECT user_name, profile_pic, about FROM users WHERE id='+info
    dbPoolInstance.query(query,(error,result)=>{
      callback(null,result.rows)
    })
  }

  let getuserevents = (info, callback)=>{
    let query = 'SELECT eventinfo.id, eventinfo.event_name, eventinfo.event_description FROM eventinfo INNER JOIN signups ON (eventinfo.id=signups.event_id) WHERE signups.user_id='+info
    dbPoolInstance.query(query,(error,result)=>{
      callback(null,result.rows)
    })
  }

  return {
    login,
    profile,
    register,
    postevent,
    eventpage,
    allevents,
    signup,
    addcomment,
    posteventphotos,
    getgallery,
    editevent,
    updateevent,
    editprofile,
    updateprofile,
    updateprofilephoto,
    getpastcreatedevents,
    userpage,
    getuserevents,
  };
};
