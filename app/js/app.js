//https://127.0.0.1:5000/app/widget.html

const legal_validator = "";
const application_id = "";

ZOHO.embeddedApp.on("PageLoad", entity => {
    // This is the information about the current record, if applicable.

    const entity_id = entity.EntityId;
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
        legal_validator =  data.data[0].Legal_Docs_Validator
        application_id =  data.data[0].id
    })
    
});
// Initialize Widget Connection
ZOHO.embeddedApp.init();

function update_widget()
{
    var config={
        Entity:"Applications1",
        APIData:{
              "id": application_id,
              "Legal_Docs_Validator": true
        },
        Trigger:["workflow"]
      }
      ZOHO.CRM.API.updateRecord(config)
      .then(function(data){
          console.log(data)
          alert("Successfully Updated!")
      })
}


function cancel_widget(){
    ZOHO.CRM.UI.Popup.close()
    .then(function(data){
        console.log(data)
    })
}

function complete_trigger(){
    if(legal_validator == true || legal_validator == 'true')
    {
        ZOHO.CRM.BLUEPRINT.proceed();
    }
    if(legal_validator == false || legal_validator == 'false')
    {
       alert("Legal Document is empty");
    }
    
}