
const commons = {
    
    getDBErrorMessagesText: function(errors) {
        var objErrors = "";
        errors.forEach(obj=>{
            for (var name in obj.constraints) {
                objErrors = objErrors + "  " + obj.constraints[name];
            }                                           
        })
        return objErrors;
    },


    getCountryNamesJSON: function() {

        return [
            "Pakistan",
            "India",
            "Swisszerland"
        ]

    }

}


export default commons;