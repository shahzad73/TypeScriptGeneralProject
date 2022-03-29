
const commons = {
    
    getDBErrorMessagesText: function(errors) {
        var objErrors = "";
        errors.forEach(obj=>{
            for (var name in obj.constraints) {
                objErrors = objErrors + "  " + obj.constraints[name];
            }                                           
        })
        return objErrors;
    }

}


export default commons;