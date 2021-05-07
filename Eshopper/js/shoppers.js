
const { MongoClient } = require("mongodb");
var fs = require('fs');
var formidable = require('formidable');
const { body,validationResult } = require('express-validator');


/**
 * constants
 */
const uri = "mongodb://localhost:27017/eshopper";

exports.addProduct = function(req, res){
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            // Error messages can be returned in an array using `errors.array()`.
            console.log("Error")
        }else {
            // Data from form is valid.
            console.log("Valid")
        }
    }


    //upload files
    var formData = new formidable.IncomingForm();
    formData.parse(req, async function (error, fields, files) {
        try{
            var htmlData = '';
            var fileArray = '';
            var fieldJson = '';
            var hexDatetime = Date.now().toString(16);
            for(var key in files){
                var file = files[key];
                if(file && file.name){
                    var extension = file.name.substr(file.name.lastIndexOf("."));
                    var nameWithoutExt = file.name.substr(0, file.name.lastIndexOf("."));
                    var newPath = "images/products/" + nameWithoutExt+"_"+hexDatetime + extension;
                    var ismainImage = key == 'mainImage';
                    fileArray += (fileArray?",":"")+"{\"image\":\""+newPath+"\",\"main-image\":"+ismainImage+"}";
                    htmlData += `<p>value for ${key} is ${newPath}</p>`;
                    fs.rename(file.path, newPath, function (errorRename) {
                        //console.log("File saved = " + newPath);
                    });
                }
            }
            fileArray = (fileArray?"\"images\":["+fileArray+"]":"");
            
            //Read other properties
            for (var key in fields) {
                let value = fields[key];
                fieldJson += (fieldJson?",":"")+"\""+key+"\":\""+value+"\"";
                htmlData += `<p>value for ${key} is ${value}</p>`;
            }
            var _data = "\"fields\":{"+fieldJson+"}"+(fileArray?",":"")+fileArray;
            if(_data){
                var jsonData = "{\"_id\":\""+hexDatetime+"\","+_data+"}";
                //console.log(jsonData);
                var db = new DBUtils(uri);
                await db.insertIntoProducts(jsonData);
                var count = await db.countRecords(DBUtils.productTable,'{}');
                htmlData += `<p>Total documents in products collection : ${count}.</p>`
            }
            res.send(htmlData);
        }catch(error){
            console.log("ERROR: "+error)
        }
    });
}



class DBUtils {
    static productTable = "products";
    constructor(uri) {
        try{
            this.client = new MongoClient(uri, { useUnifiedTopology: true });
            this.client.connect();
            this.db = this.client.db();
        }catch (error) {
            console.error("error:", error);
        }
    }

    async insertIntoProducts(data){
        try{
            await this.db.collection(DBUtils.productTable).insertOne(JSON.parse(data));
        } catch (error) {
            console.error("error:", error);
        }
    }

    async countRecords(tablename, data){
        try{
            var count = await this.db.collection(tablename).find({}).count();
            return count;
        } catch (error) {
            console.error("error:", error);
        }
    }

}