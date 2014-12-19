
var fs = require('fs')

module.exports = function(env, callback) {
  _ = env.locals._;
  
  env.helpers.getCardData = getCardData;
  function getCardData(contents) {
    var ret = [];
    
    for(x in contents)
    {
      var item = contents[x];
      if(item.url) {
        ret.push({
          url: item.url,
          metadata: item.metadata,
          content: item.markdown
        });
      }
      else {
        ret.push.apply(ret, getCardData(item));
      }
    }
    // articles = _.values(contents[options.articles])
    // articles = articles.filter (art)->
    // art.intro?
    // .filter (art) ->
    // (not tags?) or _.intersection(tags, art.metadata.tags ? []).length > 0
    // articles.sort (a, b) -> b.date - a.date
    // return articles
    return ret;
  }
  
  return callback();
}
