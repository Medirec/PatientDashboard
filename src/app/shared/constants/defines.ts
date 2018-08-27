export const JSON_PATHS = {
    PATIENTDETAILS: {
      AGE: '$.age',
      AREANAME: '$.areaName',
      FULLNAME: '$.fullName',
      GENDER: '$.gender',
      CITY:'$.nameEn',
      PATIENTCODE:'$.patientCode'
     
    },
    PATIENTALLERGIES: {
        ALLERGYNAME: '$.name',
        ID: '$.allergiesId',
        USERID: '$.userId',
       
      }, PATIENTCONDITIONS: {
        NAME: '$.name',
        ID: '$.conditionsId',
        USERID: '$.userId',
       
      }, PATIENTPRESSURE: {
        ID: '$.bloodPressureId',
        DATE: '$.date',
        DIASTOLIC: '$.diastolic',
        SYSTOLIC: '$.systolic',
        USERID: '$.userId',
       
      }
}