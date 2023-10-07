//https://127.0.0.1:5000/app/widget.html

ZOHO.embeddedApp.on("PageLoad", entity => {
    // This is the information about the current record, if applicable.

    let entity_id = entity.EntityId;
    console.log(entity)
    console.log("Entity ID:")
    console.log(entity_id)
    
    //Get Record
    ZOHO.CRM.API.getRecord({
    Entity: "Applications1", approved: "both", RecordID:entity_id
    })
    .then(function(data){
        console.log(data)
        console.log("Applications:");
        const legal_doc_link = data.data[0].Legal_Docs_Link
        document.getElementById("legal_doc").src = legal_doc_link
    })
  
});
// Initialize Widget Connection
ZOHO.embeddedApp.init();

function cancel_widget(){
    
    ZOHO.CRM.UI.Popup.close()
    .then(function(data){
        console.log(data)
    })
}

function complete_trigger(){
    ZOHO.CRM.BLUEPRINT.proceed();
}