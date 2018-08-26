import { MyRecordsModule } from './my-records.module';

describe('MyRecordsModule', () => {
  let myRecordsModule: MyRecordsModule;

  beforeEach(() => {
    myRecordsModule = new MyRecordsModule();
  });

  it('should create an instance', () => {
    expect(myRecordsModule).toBeTruthy();
  });
});
