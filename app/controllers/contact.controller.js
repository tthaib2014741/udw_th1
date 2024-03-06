const ContactService = require("../services/contact.services");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        
        return res.status(200).send({ message: "Contact created successfully", createdContact: document });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
};
exports.findAll = async (req, res, next) => {
    let documents =[];
    
    try {
        const contactService = new ContactService(MongoDB.client);
        const {name} =req.query;
        if(name){
            documents = await contactService.findByName(name);
        }else{
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
    return res.send(documents);
};
exports.findOne = async (req, res, next) => {

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(400, "Name can not be empty"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Data  to update can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(400, "Contact not found"));
        }
        return res.status(200).send({ message: "Contact updated successfully", updatedContact: document });

    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
   
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(400, "Contact not found"));
        }
        return res.send({ message: "Contact deleted successfully" });

    } catch (error) {
        return next(new ApiError(500, 
            `Could not delete contact with id=${req.params.id}`));
    }
   
};
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);

    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));

    }
   
};

// exports.deleteAll =(req, res) =>{
//     res.send({ message :"deleteAll handler"});
// };
exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.deleteAll();
        return res.send({
            message:`${documents} contacts were deleted successfully`,
        });

    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));

    }
   
};
// exports.findAllFavorite =(req, res) =>{
//     res.send({ message :"findAllFavorite handler"});
// };
