ruleset io.picolabs.sensor_profile {
  meta {
    provides retrieveData, location, name, threshold, number
    shares __testing, retrieveData, location, name, threshold, number
  }
  global {
    __testing = { "queries":
      [ { "name": "__testing" }
      //, { "name": "entry", "args": [ "key" ] }
      ] , "events":
      [ //{ "domain": "d1", "type": "t1" }
      //, { "domain": "d2", "type": "t2", "attrs": [ "a1", "a2" ] }
      ]
    }
    
    location = function(){
      ent:location.defaultsTo("SLC")
    }
    name = function(){
      ent:name.defaultsTo("Marcelo")
    }
    threshold = function(){
      ent:threshold.defaultsTo(70)
    }
    number = function(){
      ent:number.defaultsTo("+18018089633")
    }
    retrieveData = function(){
      {
        "location": ent:location,
        "name": ent:name,
        "threshold": ent:threshold,
        "number": ent:number
      }
    }
  }
  
  rule profile_update{
    select when sensor profile_updated
    pre{
      location = event:attr("location")
      name = event:attr("name")
      threshold = event:attr("threshold")
      number = "+" + event:attr("number")
      valid = location != null && name != null && threshold != null && number != null
    }
    if valid then
      send_directive("Result", {"location": location, "name": name, "threshold": threshold, "number": number})
    
    fired{
      ent:location := location;
      ent:name := name;
      ent:threshold := threshold;
      ent:number := number;
    }else{
        send_directive("FailedResult", {"location": location, "name": name, "threshold": threshold, "number": number})
    }
  }
}
