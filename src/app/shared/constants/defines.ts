export const JSON_PATHS = {
    PATIENTDETAILS: {
      AGE: '$.age',
      AREANAME: '$.areaName',
      FULLNAME: '$.fullName',
      GENDER: '$.gender',
      CITY:'$.nameEn',
      PATIENTCODE:'$.patientCode',
      IMAGEURL:'$.imageURL',
      PHONENUMBER:'$.phoneNumber',
      COUNTRYID:'$.countryId',
      CITYID:'$.cityId',
      AREAID:'$.areaId',
      ADDRESS:'$.address',
      BIRTHDATE:'$.birthDate',
     
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
       
      }, VACCINES: {
        ID: '$.vaccineId',
        NAME: '$.name',
        CODE: '$.vaccineCode',
      },
      CITY: {
        ID: '$.cityId',
        NAME: '$.nameEn',
        NAMEAR: '$.nameAr',
        COUNTRYID: '$.countryId',
        CODE: '$.countryCode',
      },
      AREA: {
        ID: '$.areaId',
        NAME: '$.nameEn',
        NAMEAR: '$.nameAr',
        CITYID: '$.cityId',
        CODE: '$.areaCode',
      },
      RESOURCES: {
        ID: '$.resourcesId',
        NAME: '$.name',
        USERID: '$.userId',
        Date: '$.creadtedDateTime',
        IMAGEURL: '$.imageUrl',
      }
}