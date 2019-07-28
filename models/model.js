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

  let home = (callback) => {
    let query = 'SELECT articles.title, articles.content, articles.created_at, users.user_name, users.id FROM articles INNER JOIN userarticles ON (articles.id = userarticles.article_id) INNER JOIN users ON (userarticles.user_id = users.id) ORDER BY articles.created_at DESC LIMIT 5 OFFSET 0';
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

  let postarticle = (cookies,info,callback) => {
    let query = 'INSERT INTO articles (title, content) VALUES ($1,$2) RETURNING id';
    let values = [info.title, info.content]
    dbPoolInstance.query(query,values,(error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        if( queryResult.rows.length > 0 ){
          let query = 'INSERT INTO userarticles (user_id, article_id) VALUES ($1,$2) RETURNING id';
          let values = [cookies.id, queryResult.rows[0].id]
          dbPoolInstance.query(query,values,(error, queryRes) => {
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
    let query = 'SELECT users.id, users.user_name, users.password, articles.title, articles.content FROM users INNER JOIN userarticles ON (users.id = userarticles.user_id) INNER JOIN articles on (userarticles.article_id = articles.id) WHERE users.id='+info.id;
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

  let register = (info,callback) => {
    console.log(info)
    let query = 'INSERT INTO users (user_name, password) SELECT $1,$2 WHERE NOT EXISTS (SELECT 1 FROM users WHERE user_name=$1) RETURNING *';
    let values = [info.user_name, info.password]
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

  let events = (info,callback) => {
    let query = 'SELECT * FROM events ORDER BY created_at'
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

  return {
    login,
    home,
    postarticle,
    profile,
    register,
    // events,
  };
};
