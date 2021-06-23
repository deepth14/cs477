// Fix the slow function to be asynchronous/non-blocking
function slow(callback) {
    for (let i = 0; i <= 5e8; i++) { }
    if (Math.random() > 0.5) {
        return callback("Error", null)
    }
    callback(null, { id: 12345 })
}

function exec(fn) {
    //fn = slow
    function callback(error, data) {
        if (!error) {
            return data;
        } else {
            return error
        }
    }
    let result = fn(callback);
    console.log(result);
    return {
        'done':function(fn){
            if( result!== 'error'){
                fn(result);
            }
            return this;
            },
            'fail':function(fn){
                if(result=== 'error'){
                    fn(result)
                }
                return this;
            }
        }
}

exec(slow).done(function (data) { console.log(data); })
    .fail(function (err) { console.log("Error: " + err); });