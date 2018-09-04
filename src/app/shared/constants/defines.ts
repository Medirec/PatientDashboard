export const JSON_PATHS = {
    PATIENTDETAILS: {
      AGE: '$.age',
      AREANAME: '$.areaName',
      FULLNAME: '$.fullName',
      GENDER: '$.gender',
      CITY:'$.nameEn',
      PATIENTCODE:'$.patientCode',
      IMAGEURL:'$.imageURL',
      PHONENUMBER:'$.phoneNumber'
     
    },
    PATIENTALLERGIES: {
        ALLERGYNAME: '$.name',
        ID: '$.allergiesId',
        USERID: '$.userId',
       
      }, PATIENTCONDITIONS: {
        NAME: '$.name',
        ID: '$.condationsId',
        USERID: '$.userId',
       
      }, PATIENTPRESSURE: {
        ID: '$.bloodPressureId',
        DATE: '$.date',
        DIASTOLIC: '$.diastolic',
        SYSTOLIC: '$.systolic',
        USERID: '$.userId',
       
      }, PATIENTBODY: {
        ID: '$.humanBodyId',
        DATE: '$.date',
        HEIGHT: '$.height',
        WEIGHT: '$.weight',
        USERID: '$.userId',
       
      }, PATIENTMEDICATION: {
        NAME: '$.name',
        ID: '$.medicationsId',
        USERID: '$.userId',
       
      }, PATIENTMEDICALDEVICE: {
        NAME: '$.name',
        ID: '$.medicalDevicesId',
        USERID: '$.userId',
       
      }, PATIENTCONTACTS: {
        ID: '$.contactId',
        EMAIL: '$.email',
        USERID: '$.userId',
        FULLNAME: '$.fullName',
        PHONENUMBER01: '$.phoneNumber01',
        PHONENUMBER02: '$.phoneNumber02',
        RELATION: '$.typeOfRelation',
       
      }
      , PATIENTIMMUNIZATION: {
        ID: '$.immunizationId',
        ADMINISTRATEDBY: '$.administratedBy',
        USERID: '$.userId',
        DATE: '$.dateGiven',
        NEXTDATE: '$.nextDoesDate',
        VACCINEID: '$.vaccineId',
        VACCINENAME:'$.vaccineName'
       
      }
}